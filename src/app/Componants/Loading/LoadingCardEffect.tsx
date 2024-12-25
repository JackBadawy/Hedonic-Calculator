import { monoton } from "../Nav/HNav";

const LoadingCardEffect = () => {
  return (
    <div className="backdrop-blur-[2px] absolute -m-4 z-20 h-full w-full flex items-center justify-center">
      <div className={"rounded-xl bg-hpal-300 p-3" + " " + monoton.className}>
        <p className="text-center text-4xl skewLoad">Deleting</p>
      </div>
    </div>
  );
};
export default LoadingCardEffect;
