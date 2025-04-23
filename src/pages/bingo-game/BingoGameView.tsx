import { fetchBingoGames } from "../../services/bingoGameService";
import { Game } from "../../@types/game";
import GameListSkeleton from "../../components/GameListSkeleton";
import TabsLayout from "../../components/layout/TabsLayout";
import { translations } from "../../configs/translations";
import { fetchGameUrl, fetchHotGames } from "../../services/gameService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLanguage } from "../../context/LanguageContext";
import { BingoGame } from "../../@types/bingo";

const BingoGameView = () => {
  const [searchValue, setSearchValue] = useState("");
  const { language } = useLanguage();

  const { data = [], isLoading } = useQuery({
    queryKey: ["GET_BINGO_GAMES"],
    queryFn: fetchBingoGames,
  });

  const { mutateAsync: getGameUrl } = useMutation({
    mutationFn: fetchGameUrl,
    onSuccess: (data) => {
      window.open(data.Url);
    },
    onError: (error) => {
      toast(error.message, {
        style: {
          backgroundColor: "bg-red-200",
        },
      });
    },
  });

  const filterData =
    data?.filter((g) =>
      g.name.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? [];

  const handleStartPlay = async (game: BingoGame) => {
    await getGameUrl({
        code: game.code,
        provider_code: game.product_code,
        type_id: game.game_type_id
    });
  };

  return (
    <TabsLayout
      searchValue={searchValue}
      onChangeInput={(v) => setSearchValue(v)}
    >
      <div className="px-5">
        <div className="grid gap-5 gap-y-8 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
          {isLoading ? (
            <GameListSkeleton />
          ) : filterData.length > 0 ? (
            filterData.map((game, idx) => (
              <button
                key={idx}
                className="h-[150px] w-full rounded-md hover:shadow-lg space-y-2"
                onClick={() => handleStartPlay(game)}
              >
                <img
                  src={game.image_url}
                  className="h-[90%] w-full object-contain rounded-md"
                />
                <span className="line-clamp-1 text-xs">{game.name}</span>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              {translations.no_game_available[language]}
            </p>
          )}
        </div>
      </div>
    </TabsLayout>
  );
};

export default BingoGameView;
