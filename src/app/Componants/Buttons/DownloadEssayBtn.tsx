import { generatePDF } from "@/app/Utilities/PdfUtils";

const DownloadEssayBtn = () => {
  return <button onClick={generatePDF}>Download Essay</button>;
};
export default DownloadEssayBtn;
