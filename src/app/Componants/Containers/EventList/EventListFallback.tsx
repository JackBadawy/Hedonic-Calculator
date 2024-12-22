import LoadingSpinner from "../../Auth/LoadingSpinner";
import { monoton } from "../../Nav/HNav";

const EventListFallback: React.FC = () => {
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className={`loader ${monoton.className}`}></div>
    </div>
  );
};
export default EventListFallback;
