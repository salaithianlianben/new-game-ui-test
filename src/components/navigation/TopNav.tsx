import { Sheet, SheetTrigger, SheetContent } from "../../components/ui/sheet";
import { Button } from "../ui/button";
import {
  ContactIcon,
  GiftIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// import SearchGames from "../widgets/SearchGames";
// import MobileSearchGames from "../widgets/MobileSearchGames";
import { useLanguage } from "../../context/LanguageContext";
import { Language } from "../../@types/language";
// import { useQuery } from "@tanstack/react-query";
// import { fetchContractInformation } from "../../services/contactService";
import { translations } from "../../configs/translations";
import {
  RiAddCircleFill,
  RiAddCircleLine,
  RiAdvertisementLine,
} from "react-icons/ri";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import UserInfo from "./UserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/userService";
// import { fetchBanners } from "../../services/bannerService";

interface SideMenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface TopNavProps {
  className?: string;
}

interface LangOptions {
  label: string;
  value: Language;
  icon: string;
}

const language_options = [
  {
    icon: "my-icon.png",
    label: "Myanmar",
    value: "my",
  },
  {
    icon: "en-icon.png",
    label: "English",
    value: "en",
  },
  {
    icon: "th-icon.png",
    label: "Thailand",
    value: "th",
  },
  {
    icon: "zh-icon.png",
    label: "Chinese",
    value: "zh",
  },
] as LangOptions[];

const TopNav = ({ className }: TopNavProps) => {
  const { language, setLanguage } = useLanguage();
  const router = useNavigate();
  const location = useLocation();

  const [showDialog, setShowDialog] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Control sheet state

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

  const onSelectLanguage = (value: Language) => {
    setLanguage(value);
  };

  const { data: user } = useQuery({
    queryKey: ["ME"],
    queryFn: getMe,
  });

  const handleLogout = () => {
    localStorage.clear();
    router("/login");
  };

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6 border-gray-800">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[4/5] sm:max-w-xs">
          <div className="flex flex-col gap-2 justify-between h-full">
            <div className="flex h-[60px] items-center px-6">
              <a href="/" className="flex items-center gap-2 font-semibold">
                <div className="flex flex-row space-x-3 items-center">
                  <img
                    src={"/images/logo.jpg"}
                    className="h-[30px] w-[30px] rounded-full object-contain"
                  />
                  <span className="">Pone Wine 22x</span>
                </div>
              </a>
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
                    <div
                      key={idx}
                      // href={item.path}
                      className={`flex items-center gap-3 rounded px-3 py-2 ${
                        isActive
                          ? "bg-secondary text-active"
                          : "text-gray hover:text-active hover:bg-secondary"
                      }`}
                      onClick={() => {
                        router(item.path);
                        setIsSheetOpen(false);
                      }} // Close the sheet on click
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  );
                })}
              </nav>
            </div>
            <div className="px-4 my-5">
              <div
                className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 hover:bg-secondary hover:text-active"
                onClick={() => setShowDialog(true)}
              >
                <LogOutIcon className="h-5 w-5" />
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
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      {c.name === "Viber" && (
                        <img
                          src={"/icons/viber.png"}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      {c.name === "Telegram" && (
                        <img
                          src={"/icons/telegram.png"}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div> */}
          </div>
        </SheetContent>
      </Sheet>
      <div
        className={`flex w-full flex-row justify-between items-center ${className}`}
      >
        <div>
          {/* <SearchGames /> */}
          <img
            src={"/images/logo.jpg"}
            className="h-[30px] w-[30px] rounded-full object-contain"
          />
        </div>

        <div className="space-x-4 flex flex-row items-center">
          <div className="block lg:hidden">
            <RiAddCircleLine className="h-8 w-8 text-gray-300" onClick={()=> router('/profile')}/>
          </div>
          <div>
            {user && (
              <div
                className="block lg:hidden"
                onClick={() => router("/profile")}
              >
                <p className="font-bold">{user.name}</p>
                <div className="flex flex-row space-x-1">
                  <img
                    src={"/icons/coin.png"}
                    className="h-4 w-4 object-contain"
                  />
                  <p className="text-sm">{user.balance}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  alt="myanmar"
                  src={`/icons/${language}-icon.png`}
                  className="h-5 w-6 rounded-full object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-secondary">
                <DropdownMenuGroup>
                  {language_options.map((lang, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      className="hover:border hover:border-active"
                      onClick={() => onSelectLanguage(lang.value)}
                    >
                      <div className="flex flex-row justify-between w-full">
                        <span>{lang.label}</span>
                        <img
                          alt={lang.value}
                          src={`/icons/${lang.icon}`}
                          className="h-5 w-6"
                        />
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <div>
            <button
              className="bg-secondary rounded-md p-2"
              onClick={() => setShowDialog(true)}
            >
              <LogOutIcon className="h-5 w-5 text-gray-200" />
            </button>
          </div> */}
        </div>
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
    </header>
  );
};

export default TopNav;
