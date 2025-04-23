import TabSkeleton from "../../components/skeletons/tabSekeleton";
import { Input } from "../../components/ui/input";
import Tabs from "../../components/ui/custom_tabs";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { fetchGameType } from "../../services/gameTypeServices";
import { GameType } from "../../@types/gametype";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";

interface TabsLayoutProps {
  children: React.ReactNode;
  searchValue?: string;
  onChangeInput?: (v: string) => void;
}



const TabsLayout = ({
  children,
  searchValue = "",
  onChangeInput,
}: TabsLayoutProps) => {
  const { language } = useLanguage();
  const staticTabs = [
    {
      label: translations.all[language],
      route: "/",
    },
    {
      label: translations.hot_games[language],
      route: "/hot-games",
    },
  ];

  const anotherStaticTabs = [
    {
      label: 'Card Game',
      route: "/card-games",
    },
    {
      label: 'Table Game',
      route: "/table-games",
    },
    {
      label: 'Bingo Game',
      route: "/bingo-games",
    },
  ]
  const { data  =[], isLoading } = useQuery({
    queryKey: ["GET_GAME_TYPES"],
    queryFn: fetchGameType,
  });

  const dynamicTabs = data.map((gameType: GameType) => ({
    label: gameType.name,
    route: `/game-type/${gameType.id}`,
  }));

  const tabs = [...staticTabs, ...(dynamicTabs || []), ...anotherStaticTabs ];

  return (
    <div className="h-full w-full space-y-2">
      <div className="flex flex-row justify-between px-3">
        <div className="w-4/5 hidden md:block">
          {isLoading ? (
            <TabSkeleton />
          ) : (
            <Tabs tabs={tabs} initialActiveIndex={0} />
          )}
        </div>
        <div className="w-full md:w-2/6 lg:w-1/5 mb-5 lg:mb-0"> 
          <div className="flex flex-row space-x-2 items-center border border-input px-5 rounded-full bg-secondary mt-4">
            <SearchIcon className="h-4 w-4" />
            <Input
              placeholder={translations.search[language]}
              className="appearance-none bg-secondary"
              value={searchValue}
              onChange={(e) => onChangeInput?.(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default TabsLayout;
