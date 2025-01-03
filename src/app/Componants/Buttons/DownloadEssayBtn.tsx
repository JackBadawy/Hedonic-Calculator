import { generatePdfProofOfConcept } from "@/app/Utilities/PdfUtils";

const DownloadEssayBtn = () => {
  return <button onClick={generatePdfProofOfConcept}>Download Essay</button>;
};
export default DownloadEssayBtn;
