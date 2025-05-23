import React from "react";
import { Button } from "../ui/button";
import SideBar from "./SideBar";
import logo from "/images/logo.png";
import coin from "/images/topNavCoin.svg";
import {
  BellIcon,
  CoinsIcon,
  EllipsisVertical,
  RefreshCcw,
  RotateCwIcon,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageDropdown from "../widgets/LanguageDropdown";
import Notifications from "../widgets/Notifications";
const TopNav = () => {
  const userMenuItems = [
    {
      id: 1,
      name: "Deposit",
      link: "/account/deposit",
    },
    {
      id: 2,
      name: "Withdraw",
      link: "/account/withdrawl",
    },
    {
      id: 3,
      name: "History",
      link: "/account/history",
    },
    {
      id: 4,
      name: "Profile",
      link: "/account/profile",
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const goTo = (link: string) => {
    navigate(link);
  };

  return (
    <div className="cursor-pointer py-3 px-2 sm:px-5 flex justify-between items-center bg-black">
      <div onClick={() => goTo("/")}>
        <img src={logo} className="w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] xl:w-[80px] xl:h-[80px] object-contain" />
      </div>
      <div>
        <div className="flex items-center gap-2 md:gap-4 ">
          <Button
            onClick={() => goTo("/login")}
            className="!text-xs text-white font-medium bg-black border border-[#EDCE7E] !px-2 xl:!px-6 lg:!px-6"
          >
            LOGIN
          </Button>
          <Button
            onClick={() => goTo("/register")}
            className="!px-2 xl:!px-4 lg:!px-4 !text-xs text-black font-medium bg-activeGradient  border border-white"
          >
            JOIN NOW
          </Button>
          {/* <div className="hidden lg:flex gap-3">
        <div className="flex items-center gap-1 ">
        <p className='font-semibold'>Welcome</p>
        <p className='text-primary font-semibold'>devtestabc</p>
      </div>
      
       <Button className='!px-6 text-base text-black font-bold bg-primaryGradient  border border-primaryGradient rounded-full'>
        Balance: 5000MMK
      </Button>
      <Button className='!px-6 text-base text-black font-bold bg-primaryGradient  border border-primaryGradient rounded-full'>
        PROFILE
      </Button>
      </div> */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1">
              <p className="font-semibold">Welcome</p>
              <p className="text-primary font-semibold">devtestabc</p>
            </div>

            <button
              className="flex items-center space-x-2 rounded-md border border-primary/20 bg-primary/5 px-5 py-1.5 text-sm font-bold text-primary hover:bg-primary/10 transition-colors"
              type="button"
            >
              <CoinsIcon />
              <span> 5000 MMK</span>
            </button>

            <button
              className="flex items-center space-x-2 rounded-md border border-primary/20 bg-primary/5 px-5 py-1.5 text-sm font-bold text-primary hover:bg-primary/10 transition-colors"
              type="button"
            >
              <User />
              <span>PROFILE</span>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <Notifications />
            <SideBar />
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-end gap-4 mt-4">
          {userMenuItems.map((item) => {
            return (
              <div
                className="flex item-center gap-1"
                onClick={() => goTo(item.link)}
                key={item.id}
              >
                <p className="hover:text-primary font-semibold uppercase">
                  {item.name}
                </p>
                <EllipsisVertical />
              </div>
            );
          })}
          <LanguageDropdown />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
