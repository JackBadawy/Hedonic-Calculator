import Image from "next/image";

const NoEvents = () => {
  return (
    <div className="select-none flex flex-col gap-5 items-center justify-center min-h-80 w-full opacity-50">
      <Image
        src={"/noItems.svg"}
        width={"250"}
        height={"250"}
        alt=""
        style={{ fill: "#011638" }}
        unoptimized
      />
      <div className="text-center text-hpal-500">
        <p className="select-none text-2xl font-bold">No events added yet.</p>
        <p>start creating events by clicking on &apos;Add Event&apos;</p>
      </div>
    </div>
  );
};
export default NoEvents;
