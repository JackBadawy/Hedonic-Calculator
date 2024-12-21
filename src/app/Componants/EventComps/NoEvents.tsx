import Image from "next/image";

const NoEvents = () => {
  return (
    <div className="flex items-center justify-center min-h-80 w-full">
      <Image
        src={"../../img/noItems.svg"}
        width={"100"}
        height={"100"}
        alt=""
        unoptimized
      />
      <p className="text-hpal-500 text-2xl font-bold">No events added yet.</p>
    </div>
  );
};
export default NoEvents;
