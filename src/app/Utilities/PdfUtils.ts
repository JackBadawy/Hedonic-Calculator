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
  titleFontSize: 18,
  chapterFontSize: 14,
  charsPerLine: 80,
};

function preparePdfContent() {
  const paragraphs = essayText.split(/\n\n+/);
  const pages: string[][] = [[]];
  let currentPage = 0;
  let yPosition = PAGE_CONFIG.height - PAGE_CONFIG.margin.top;

  function startNewPage() {
    currentPage++;
    pages[currentPage] = [];
    yPosition = PAGE_CONFIG.height - PAGE_CONFIG.margin.top;
    return yPosition;
  }

  function addToCurrentPage(line: string) {
    pages[currentPage].push(line);
  }

  function wrapText(text: string, maxChars: number) {
    const words = text.trim().split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + " " + word).length <= maxChars) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);
    return lines;
  }

  paragraphs.forEach((paragraph, index) => {
    if (yPosition <= PAGE_CONFIG.margin.bottom + PAGE_CONFIG.lineHeight * 2) {
      yPosition = startNewPage();
    }

    addToCurrentPage("BT");

    if (index === 0) {
      addToCurrentPage(`/F1 ${PAGE_CONFIG.titleFontSize} Tf`);
      const titleLines = wrapText(paragraph, PAGE_CONFIG.charsPerLine);
      titleLines.forEach((line, lineIndex) => {
        addToCurrentPage(`${PAGE_CONFIG.margin.left} ${yPosition} Td`);
        addToCurrentPage(
          `(${line.replace(/\(/g, "\\(").replace(/\)/g, "\\)")}) Tj`,
        );
        yPosition -= PAGE_CONFIG.lineHeight * 1.5;
        if (lineIndex < titleLines.length - 1) {
          addToCurrentPage(`0 -${PAGE_CONFIG.lineHeight * 1.5} Td`);
        }
      });
      addToCurrentPage("ET");
      yPosition -= PAGE_CONFIG.lineHeight;
    } else if (index === 1) {
      addToCurrentPage(`/F1 ${PAGE_CONFIG.fontSize} Tf`);
      addToCurrentPage(`${PAGE_CONFIG.margin.left} ${yPosition} Td`);
      addToCurrentPage(
        `(${paragraph.replace(/\(/g, "\\(").replace(/\)/g, "\\)")}) Tj`,
      );
      yPosition -= PAGE_CONFIG.lineHeight * 2;
      addToCurrentPage("ET");
    } else if (paragraph.trim().startsWith("Chapter")) {
      yPosition -= PAGE_CONFIG.lineHeight * 2;

      if (yPosition <= PAGE_CONFIG.margin.bottom + PAGE_CONFIG.lineHeight * 2) {
        yPosition = startNewPage();
      }

      addToCurrentPage(`/F1 ${PAGE_CONFIG.chapterFontSize} Tf`);
      addToCurrentPage(`${PAGE_CONFIG.margin.left} ${yPosition} Td`);
      addToCurrentPage(
        `(${paragraph.replace(/\(/g, "\\(").replace(/\)/g, "\\)")}) Tj`,
      );
      yPosition -= PAGE_CONFIG.lineHeight * 2;
      addToCurrentPage("ET");
    } else {
      const words = paragraph.trim().split(/\s+/);
      let currentLine = "";

      addToCurrentPage(`/F1 ${PAGE_CONFIG.fontSize} Tf`);
      addToCurrentPage(`${PAGE_CONFIG.margin.left} ${yPosition} Td`);

      words.forEach((word) => {
        if ((currentLine + " " + word).length <= PAGE_CONFIG.charsPerLine) {
          currentLine += (currentLine ? " " : "") + word;
        } else {
          addToCurrentPage(
            `(${currentLine.replace(/\(/g, "\\(").replace(/\)/g, "\\)")}) Tj`,
          );
          yPosition -= PAGE_CONFIG.lineHeight;

          if (yPosition <= PAGE_CONFIG.margin.bottom + PAGE_CONFIG.lineHeight) {
            addToCurrentPage("ET");
            yPosition = startNewPage();
            addToCurrentPage("BT");
            addToCurrentPage(`/F1 ${PAGE_CONFIG.fontSize} Tf`);
            addToCurrentPage(`${PAGE_CONFIG.margin.left} ${yPosition} Td`);
          } else {
            addToCurrentPage(`0 -${PAGE_CONFIG.lineHeight} Td`);
          }

          currentLine = word;
        }
      });

      if (currentLine) {
        addToCurrentPage(
          `(${currentLine.replace(/\(/g, "\\(").replace(/\)/g, "\\)")}) Tj`,
        );
        yPosition -= PAGE_CONFIG.lineHeight * 1.5;
      }

      addToCurrentPage("ET");
    }
  });

  return pages.map((pageContent) => pageContent.join("\n"));
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

  pages.forEach((pageContent, pageNum) => {
    const pageObjNum = pageNum * 2 + 3;
    const contentObjNum = pageObjNum + 1;

    objectOffsets[pageObjNum] = objects.join("").length;
    const pageObj =
      `${pageObjNum} 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n` +
      `/Resources << /Font << /F1 ${fontObjNum} 0 R >> >>\n` +
      `/MediaBox [0 0 ${PAGE_CONFIG.width} ${PAGE_CONFIG.height}]\n` +
      `/Contents ${contentObjNum} 0 R\n>>\nendobj\n`;
    objects.push(pageObj);

    objectOffsets[contentObjNum] = objects.join("").length;
    const contentObj = `${contentObjNum} 0 obj\n<<\n/Length ${pageContent.length}\n>>\nstream\n${pageContent}\nendstream\nendobj\n`;
    objects.push(contentObj);
  });

  objectOffsets[fontObjNum] = objects.join("").length;
  const fontObj = `${fontObjNum} 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica-Bold\n>>\nendobj\n`;
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
