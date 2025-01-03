export const generatePdfProofOfConcept = () => {
  const pdfContent = [
    "%PDF-1.0\n%âãÏÓ\n",
    "1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n\n",
    "2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n\n",
    "3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/Resources << /Font << /F1 4 0 R >> >>\n/MediaBox [0 0 612 792]\n/Contents 5 0 R\n>>\nendobj\n\n",
    "4 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n",
    "5 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Hello, World!) Tj\nET\nendstream\nendobj\n\n",
    "xref\n0 6\n0000000000 65535 f\n0000000018 00000 n\n0000000077 00000 n\n0000000142 00000 n\n0000000289 00000 n\n0000000377 00000 n\n",
    "trailer\n<<\n/Size 6\n/Root 1 0 R\n>>\nstartxref\n478\n%%EOF\n",
  ].join("");

  const pdfData = new Uint8Array(
    pdfContent.split("").map((char) => char.charCodeAt(0)),
  );

  const blob = new Blob([pdfData], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "test-file.pdf";
  link.click();
  URL.revokeObjectURL(url);
};
