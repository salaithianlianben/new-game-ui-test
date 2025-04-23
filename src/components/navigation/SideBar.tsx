// import { useQuery } from "@tanstack/react-query";
import { ContactIcon, GiftIcon, HomeIcon, LogOutIcon, UserIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { RiAdvertisementLine } from "react-icons/ri";
// import { Skeleton } from "../ui/skeleton";
import UserInfo from "./UserInfo";
// import { fetchContractInformation } from "../../services/contactService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
// import { fetchBanners } from "../../services/bannerService";

interface SideMenuItem {
  label: string;
  path: string;
  icon: ReactNode;
}

interface SideMenuProps {
  className?: string;
}

const SideBar = ({ className }: SideMenuProps) => {
  const location = useLocation();
  const { language } = useLanguage();
  const router = useNavigate();
  const [ showDialog, setShowDialog ] = useState(false);

  const isHomeActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/hot-games") ||
    location.pathname.startsWith("/game-type");

  const sideMenuItems = [
    {
      label: translations.home[language],
      path: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      label: translations.videoAds[language],
      path: "/video-ads",
      icon: <RiAdvertisementLine className="h-5 w-5" />,
    },
    {
      label: translations.promotions[language],
      path: "/promotions",
      icon: <GiftIcon className="h-5 w-5" />,
    },
    {
      label: translations.account[language],
      path: "/profile",
      icon: <UserIcon className="h-5 w-5" />,
    },
    // {
    //   label: translations.contacts[language],
    //   path: "/contacts",
    //   icon: <ContactIcon className="h-5 w-5" />,
    // },
  ] as SideMenuItem[];

  const handleLogout = () => {
    localStorage.clear();
    router("/login");
  };

  return (
    <div
      className={`hidden border-r bg-muted/40 lg:block border-gray-800 ${className}`}
    >
      <div className="flex flex-col gap-2 justify-between h-full">
        <div className="flex h-[60px] items-center px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="flex flex-row space-x-3 items-center">
              <img
                src={"/images/logo.jpg"}
                className="h-[30px] w-[30px] rounded-full object-contain"
              />
              <span className="">Pone Wine 22x</span>
            </div>
          </Link>
        </div>
        {/* <div className="p-5">
          <UserInfo />
        </div> */}
        <div className="flex-grow">
          <nav className="grid items-start px-4 text-sm font-medium space-y-2">
            {sideMenuItems.map((item, idx) => {
              const isActive =
                item.path === "/"
                  ? isHomeActive
                  : location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-3 rounded px-3 py-2 ${
                    isActive
                      ? "bg-secondary text-active"
                      : "text-gray hover:text-active hover:bg-secondary"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="px-4 my-5">
          <div className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 hover:bg-secondary hover:text-active" onClick={()=> setShowDialog(true)}>
            <LogOutIcon className="h-5 w-5"/>
            {translations.logout[language]}
          </div>
        </div>
        {/* <div className="mb-7">
          {isLoading ? (
            <div className="flex flex-row items-center justify-center w-full space-x-4">
              <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
              <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
              <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center w-full space-x-4">
              {data?.contacts?.map((c, idx) => (
                <a key={idx} href={c.value} target="_blank">
                  {c.name === "Facebook" && (
                    <img
                      src={"/icons/facebook.png"}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  {c.name === "Viber" && (
                    <img
                      src={"/icons/viber.png"}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  {c.name === "Telegram" && (
                    <img
                      src={"/icons/telegram.png"}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                </a>
              ))}
            </div>
          )}
        </div> */}
      </div>
      <Dialog
        open={showDialog}
        onOpenChange={(isOpen) => !isOpen && setShowDialog(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span>Are you sure you would like to log out?</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-row justify-end items-center space-x-3">
              <Button
                type="button"
                className="border border-active hover:bg-secondary"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-active text-black hover:text-white hover:bg-secondary hover:border hover:border-active"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SideBar;
