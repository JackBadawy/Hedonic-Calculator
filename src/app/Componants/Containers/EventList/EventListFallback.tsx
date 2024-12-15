import LoadingSpinner from "../../Auth/LoadingSpinner";

const EventListFallback: React.FC = () => {
  return (
    <div className="mt-4">
      <LoadingSpinner fillClass="fill-hpal-500" sizeClass="2xl" />
    </div>
  );
};
export default EventListFallback;
