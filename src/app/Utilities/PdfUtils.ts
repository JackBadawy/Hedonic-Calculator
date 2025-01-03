import { essayContent as essayText } from "./essayContent";
const PAGE_CONFIG = {
  width: 612,
  height: 792,
  margin: {
    top: 72,
    right: 72,
    bottom: 72,
    left: 72,
  },
  lineHeight: 14,
  fontSize: 12,
  charsPerLine: 80,
};

function preparePdfContent() {
  const paragraphs = essayText.split(/\n\n+/);
  const lines: string[] = [];

  paragraphs.forEach((paragraph) => {
    const words = paragraph.trim().split(/\s+/);
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + " " + word).length <= PAGE_CONFIG.charsPerLine) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }
    lines.push("");
  });

  const linesPerPage = Math.floor(
    (PAGE_CONFIG.height - PAGE_CONFIG.margin.top - PAGE_CONFIG.margin.bottom) /
      PAGE_CONFIG.lineHeight,
  );

  const pages = [];
  let currentPage: Array<string> = [];

  lines.forEach((line) => {
    if (currentPage.length >= linesPerPage) {
      pages.push(currentPage);
      currentPage = [];
    }
    currentPage.push(line);
  });

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
}

export function generatePDF() {
  const pages = preparePdfContent();
  const objects: string[] = [];
  const objectOffsets: number[] = [0];

  objects.push("%PDF-1.7\n%\xFF\xFF\xFF\xFF\n");

  const catalogObj = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  objectOffsets[1] = objects.join("").length;
  objects.push(catalogObj);

  const pagesObj = `2 0 obj\n<< /Type /Pages /Kids [${pages
    .map((_, i) => `${i * 2 + 3} 0 R`)
    .join(" ")}] /Count ${pages.length} >>\nendobj\n`;
  objectOffsets[2] = objects.join("").length;
  objects.push(pagesObj);

  const fontObjNum = 3 + pages.length * 2;

  pages.forEach((pageLines, pageNum) => {
    const pageObjNum = pageNum * 2 + 3;
    const contentObjNum = pageObjNum + 1;

    objectOffsets[pageObjNum] = objects.join("").length;
    const pageObj =
      `${pageObjNum} 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n` +
      `/Resources << /Font << /F1 ${fontObjNum} 0 R >> >>\n` +
      `/MediaBox [0 0 ${PAGE_CONFIG.width} ${PAGE_CONFIG.height}]\n` +
      `/Contents ${contentObjNum} 0 R\n>>\nendobj\n`;
    objects.push(pageObj);

    const content = `BT\n/F1 ${PAGE_CONFIG.fontSize} Tf\n${PAGE_CONFIG.margin.left} ${
      PAGE_CONFIG.height - PAGE_CONFIG.margin.top
    } Td\n${pageLines
      .map(
        (line) =>
          `(${line.replace(/\(/g, "\\(").replace(/\)/g, "\\)")}) Tj\n0 -${PAGE_CONFIG.lineHeight} Td\n`,
      )
      .join("")}ET`;

    objectOffsets[contentObjNum] = objects.join("").length;
    const contentObj = `${contentObjNum} 0 obj\n<<\n/Length ${content.length}\n>>\nstream\n${content}\nendstream\nendobj\n`;
    objects.push(contentObj);
  });

  objectOffsets[fontObjNum] = objects.join("").length;
  const fontObj = `${fontObjNum} 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n`;
  objects.push(fontObj);

  const xrefOffset = objects.join("").length;
  objects.push("xref\n");
  objects.push(`0 ${fontObjNum + 1}\n`);
  objects.push("0000000000 65535 f \n");

  for (let i = 1; i <= fontObjNum; i++) {
    objects.push(`${objectOffsets[i].toString().padStart(10, "0")} 00000 n \n`);
  }

  objects.push("trailer\n");
  objects.push(`<<\n/Size ${fontObjNum + 1}\n/Root 1 0 R\n>>\n`);
  objects.push("startxref\n");
  objects.push(`${xrefOffset}\n`);
  objects.push("%%EOF");

  const pdfContent = objects.join("");
  const pdfData = new Uint8Array(
    pdfContent.split("").map((char) => char.charCodeAt(0)),
  );

  const blob = new Blob([pdfData], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bentham-essay.pdf";
  link.click();
  URL.revokeObjectURL(url);
}
