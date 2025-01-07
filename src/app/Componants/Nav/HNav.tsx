import { useAuth } from "@/app/Contexts/AuthContext";
import LogoutBtn from "../Buttons/LogoutBtn";
import { Monoton } from "next/font/google";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const monoton = Monoton({ subsets: ["latin"], weight: ["400"] });

const HNav = () => {
  const { username } = useAuth();
  const [pathName, setPathName] = useState<string>(usePathname());

  return (
    <div className="w-full py-1 mb-5">
      <div className="mt-1 flex flex-col gap-0.5 mb-0.5 justify-center">
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500 " />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500 " />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500 " />
      </div>
      <div className="bg-hpal-500 py-2">
        <hr className="border-0 bg-hpal-200 h-1 text-hpal-200" />
        <div className="my-1 text-hpal-200 flex items-center justify-between p-2 px-4">
          <h1
            className={
              monoton.className +
              " text-[32px] sm:text-4xl md:text-[40px] lg:text-5xl"
            }
          >
            Hedonic Calculator
          </h1>
          <div className="ml-4 transition-all font-bold flex items-center gap-2">
            {pathName === "/main" && username ? (
              <>
                <p className="hidden sm:block text-lg select-none">
                  {username}:
                </p>
                <LogoutBtn />
              </>
            ) : null}
          </div>
        </div>
        <hr className="border-0 bg-hpal-200 h-1 text-hpal-200" />
      </div>
      <div className="flex flex-col gap-0.5 mt-0.5 justify-center">
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500" />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500" />
        <hr className="border-0 bg-hpal-500 h-1 text-hpal-500" />
      </div>
    </div>
  );
};

export default HNav;
