const EventListContainerFallback: React.FC = () => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Events</h2>
      <div className="animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-violet-200 p-4 rounded-lg shadow-md mb-4"
          >
            <div className="h-5 bg-violet-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-violet-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListContainerFallback;
