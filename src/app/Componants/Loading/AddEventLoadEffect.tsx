import { monoton } from "../Nav/HNav";

const AddEventLoadEffect = () => {
  return (
    <div className="absolute h-full w-full z-20">
      <div className="updPulse absolute flex items-start justify-center h-full w-full backdrop-blur-sm -m-3 rounded-lg bg-hpal-500 bg-opacity-15"></div>
      <div
        className={
          "absolute left-0 right-0 w-fit ml-auto mr-auto mt-[8vh] p-3 text-hpal-500 text-6xl font-extrabold rounded-xl bg-hpal-100 bg-opacity-30 " +
          monoton.className
        }
      >
        <p className="updEffect p-4">Updating</p>
      </div>
    </div>
  );
};

export default AddEventLoadEffect;
