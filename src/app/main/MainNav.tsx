import LogoutBtn from "../Componants/Buttons/LogoutBtn";

const MainNav = () => {
  return (
    <>
      <div className="flex justify-end">
        <div className="text-hpal-500  font-bold flex items-center gap-2">
          <p className="text-lg">TestUser:</p>
          <LogoutBtn />
        </div>
      </div>
      <hr className="border-0 bg-hpal-500 h-[2px] mx-[-16px] my-4 text-hpal-500" />
    </>
  );
};

export default MainNav;
