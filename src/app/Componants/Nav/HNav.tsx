import LogoutBtn from "../Buttons/LogoutBtn";

const HNav = () => {
  return (
    <div className="w-screen my-4">
      <div className="flex flex-col gap-0.5 mb-0.5 justify-center">
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500 " />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500 " />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500 " />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500 " />
      </div>
      <div className="bg-hpal-500 py-2">
        <hr className="border-0 bg-hpal-200 h-1 text-hpal-200" />
        <div className="my-1 text-hpal-200 flex items-center justify-between p-2">
          <h1 className="text-6xl">Hedonic Calculator</h1>
          <div className="  font-bold flex items-center gap-2">
            <p className="text-lg">TestUser:</p>
            <LogoutBtn />
          </div>
        </div>
        <hr className="border-0 bg-hpal-200 h-1 text-hpal-200" />
      </div>
      <div className="flex flex-col gap-0.5 mt-0.5 justify-center">
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500" />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500" />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500" />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500" />
      </div>
    </div>
  );
};

export default HNav;
