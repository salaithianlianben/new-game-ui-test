import {
  fetchAllGamesByProviderAndType,
  fetchGameProductsByGameType,
  fetchGameUrl,
} from "../../services/gameService";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import TopTabSkeleton from "./components/TopTabSkeleton";
import TabsLayout from "../../components/layout/TabsLayout";
import GameListSkeleton from "../../components/GameListSkeleton";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Game } from "../../@types/game";
import { isEmpty } from "lodash";

const GameTypeView = () => {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    rtl: false,
    slides: { perView: "auto" },
  });
  const params = useParams();
  const { id } = params;
  const [searchParams] = useSearchParams();
  const router = useNavigate();

  const providerFromUrl = searchParams.get("provider");

  const [tabValue, setTabValue] = useState<number | undefined | null>(
    providerFromUrl ? Number(providerFromUrl) : null
  );
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_GAMES", id, tabValue],
    queryFn: () =>
      fetchAllGamesByProviderAndType({
        game_type_id: Number(id ?? 0),
        provider_id: Number(tabValue ?? 0),
      }),
    enabled: !!id && !!tabValue,
  });

  const { data: gameProducts, isLoading: isLoadingGameProducts } = useQuery({
    queryKey: ["GET_GAME_PRODUCTS_BY_GAME_TYPE", id],
    queryFn: () => fetchGameProductsByGameType(Number(id ?? 0)),
    enabled: !!id,
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

  const handleTabClick = (providerId: number) => {
    setTabValue(providerId);
    router(`/game-type/${id}?provider=${providerId}`);
  };

  const filterData =
    data?.filter((g) =>
      g.name.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? [];

  const handleStartPlay = async (game: Game) => {
    await getGameUrl(game);
  };

  useEffect(() => {
    if (gameProducts && gameProducts.products.length > 0 && isEmpty(tabValue)) {
      const firstProviderId = gameProducts.products[0].id;
      setTabValue(firstProviderId);
      router(`/game-type/${id}?provider=${firstProviderId}`);
    }
  }, [gameProducts, tabValue, id, router]);

  return (
    <TabsLayout
      searchValue={searchValue}
      onChangeInput={(v) => setSearchValue(v)}
    >
      <div className="slider-container max-w-[100vw] lg:max-w-[80w] px-4 space-y-4">
        <div className="max-w-[100vw] lg:max-w-[80w] ">
          {isLoadingGameProducts ? (
            <TopTabSkeleton />
          ) : (
            <div
              className="max-w-[100vw] lg:max-w-[75vw]  text-green-400 overflow-x-auto no-scrollbar keen-slider"
              ref={sliderRef}
            >
              {gameProducts?.products.map((p, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(p.id)}
                  className={`min-w-max  max-w-max keen-slider__slide text-sm flex items-center gap-2 px-3 text-nowrap text-center py-2 rounded-lg hover:shadow-lg hover:border hover:border-active ${
                    tabValue === p.id
                      ? "bg-secondary"
                      : "bg-transparent hover:bg-secondary"
                  }`}
                >
                  <span>{`${p.name}`}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-5 gap-y-8 grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 max-w-[100vw] lg:max-w-[80vw]">
          {isLoading || isFetching ? (
            <GameListSkeleton />
          ) : filterData.length > 0 ? (
            filterData?.map((game, idx) => (
              <button
                key={idx}
                className="h-[150px] w-full rounded-md hover:shadow-lg space-y-2"
                onClick={() => handleStartPlay(game)}
              >
                <img
                  src={game.img}
                  className="h-[90%] w-full object-cover rounded-md"
                />
                <span className="line-clamp-1 text-xs">{game.name}</span>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
               No games available
            </p>
          )}
        </div>
      </div>
    </TabsLayout>
  );
};

export default GameTypeView;