import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { FilterIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGameType } from "../../services/gameTypeServices";
import { GameType } from "../../@types/gametype";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";

const FilterSideMenu = () => {
  const router = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: gameTypes } = useQuery({
    queryKey: ["GET_GAME_TYPES"],
    queryFn: fetchGameType,
  });

  const tabs = [
    {
      label: translations.all[language],
      route: "/",
      id: "all",
    },
    {
      label: translations.hot_games[language],
      route: "/hot-games",
      id: "hot-games"
    },
    ...(gameTypes?.map((gameType: GameType) => ({
      label: gameType.name,
      route: `/game-type/${gameType.id}`,
      id: gameType.id.toString(),
    })) || []),
  ];

  const handleTabClick = (tab: (typeof tabs)[number]) => {
    router(tab.route);
    setActiveTab(tab.id);
    setIsOpen(false);
  };

  useEffect(() => {
    const computeActiveTab = () => {
      if (location.pathname === "/") return "all";

      const match = location.pathname.match(/^\/game-type\/(\d+)$/);
      return match ? match[1] : null;
    };

    setActiveTab(computeActiveTab());
  }, [location, gameTypes]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-active p-3 cursor-pointer rounded-full text-secondary fixed bottom-4 right-4 z-[99]"
        >
          <FilterIcon size={14} />
        </button>
      </SheetTrigger>
      <SheetContent className="px-0 py-0">
        <SheetHeader className="relative h-full">
          <SheetTitle className="text-left px-4">
            <p className="text-active mt-3">Filter By</p>
          </SheetTitle>
          <SheetDescription>
            <div className="px-4 mt-5">
              <div className="mt-5 bg-secondary p-3 rounded-2xl">
                {tabs.map((tab, idx) => (
                  <div
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={`
                      ${activeTab === tab.id ? "text-active" : "text-zinc-400"}
                      ${idx === tabs.length - 1 ? "border-b-0" : "border-b-2"}
                      hover:text-active py-3 flex items-center gap-2 border-black cursor-pointer transition-all ease-in-out duration-200
                    `}
                  >
                    <p>{tab.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSideMenu;
