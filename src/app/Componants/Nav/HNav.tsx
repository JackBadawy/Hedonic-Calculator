import LogoutBtn from "../Buttons/LogoutBtn";

const HNav = () => {
  return (
    <>
      <div className="text-hpal-500 flex justify-between">
        <h1 className="text-3xl">Hedonic Calculator</h1>
        <div className="  font-bold flex items-center gap-2">
          <p className="text-lg">TestUser:</p>
          <LogoutBtn />
        </div>
      </div>
      <hr className="border-0 bg-hpal-500 h-[2px] mx-[-16px] my-4 text-hpal-500" />
    </>
  );
};

export default HNav;
