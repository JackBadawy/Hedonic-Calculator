import { generatePDF } from "@/app/Utilities/PdfUtils";

const DownloadEssayBtn = () => {
  return (
    <button
      className="bg-hpal-400 hover:bg-hpal-300 transition-colors p-3 rounded-xl"
      onClick={generatePDF}
    >
      Download Essay
    </button>
  );
};
export default DownloadEssayBtn;
