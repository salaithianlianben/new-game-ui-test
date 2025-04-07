import { useQuery } from "@tanstack/react-query";
import { GiftIcon, HomeIcon, UserIcon } from "lucide-react";
import { ReactNode } from "react";
import { RiAdvertisementLine } from "react-icons/ri";
import { Skeleton } from "../ui/skeleton";
import UserInfo from "./UserInfo";
import { fetchContractInformation } from "../../services/contactService";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";

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

  const isHomeActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/hot-games") ||
    location.pathname.startsWith("/game-type");

  const { data: contact, isLoading: isLoadingContact } = useQuery({
    queryKey: ["GET_CONTACT_INFO"],
    queryFn: fetchContractInformation,
  });

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
  ] as SideMenuItem[];

  return (
    <div
      className={`hidden border-r bg-muted/40 lg:block border-gray-800 ${className}`}
    >
      <div className="flex flex-col gap-2 justify-between h-full">
        <div className="flex h-[60px] items-center px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="">Super Bonus</span>
          </Link>
        </div>
        <div className="p-5">
          <UserInfo />
        </div>
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
        <div className="mb-7">
          {isLoadingContact ? (
            <div className="flex flex-row items-center justify-center w-full space-x-4">
              <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
              <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
              <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center w-full space-x-4">
              {contact?.map((c, idx) => (
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
        </div>
      </div>
    </div>
  );
};

export default SideBar;
