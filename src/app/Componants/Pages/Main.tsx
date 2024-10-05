import AddEvent from "../Buttons/AddEvent";
import EventListContainerClient from "../Containers/EventList/EventListContainerClient";

const Main = () => {
  return (
    <div className="bg-violet-100 min-h-screen p-4">
      <AddEvent />
      <EventListContainerClient />
    </div>
  );
};

export default Main;
