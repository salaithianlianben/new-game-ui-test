import { useMutation, useQuery } from "@tanstack/react-query";
import TabsLayout from "../../components/layout/TabsLayout";
import {
  fetchGameProductsByGameType,
  fetchGameUrl,
  fetchHotGames,
} from "../../services/gameService";
import { fetchGameType } from "../../services/gameTypeServices";
import { useEffect, useState } from "react";
import { GameProduct } from "../../@types/game-product";
import GameListSkeleton from "../../components/GameListSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/userService";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";
import toast from "react-hot-toast";
import { Game } from "../../@types/game";
import { fetchCardGames } from "../../services/cardGameService";
import { fetchBingoGames } from "../../services/bingoGameService";
import { fetchTableGames } from "../../services/tableGameService";
import { CardGame } from "../../@types/card-game";

const HomePage = () => {
  const router = useNavigate();
  const { language } = useLanguage();

  const [isLoading, setIsLoading] = useState(true);
  const [gameProducts, setGameProducts] = useState<GameProduct[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { data: user } = useQuery({
    queryKey: ["ME"],
    queryFn: getMe,
  });

  const { data: game_types, isLoading: isLoadingGameTypes } = useQuery({
    queryKey: ["GET_GAME_TYPES"],
    queryFn: fetchGameType,
  });

  const { data: hotgames = [], isLoading: isLoadingHotgames } = useQuery({
    queryKey: ["GET_HOT_GAMES"],
    queryFn: fetchHotGames,
  });

  const { data: card_games = [], isLoading: isLoadingCardGames } = useQuery({
    queryKey: ["GET_CARD_GAMES"],
    queryFn: fetchCardGames,
  });

  const { data: bingo_games = [], isLoading: isLoadingBingoGames } = useQuery({
    queryKey: ["GET_BINGO_GAMES"],
    queryFn: fetchBingoGames,
  });

  const { data: table_games =[], isLoading: isLoadingTableGames } = useQuery({
    queryKey: ["GET_TABLE_GAMES"],
    queryFn: fetchTableGames,
  });

  const filteredGameProducts = gameProducts.map((game) => ({
    ...game,
    products: game.products?.filter((product) =>
      product.name?.toLowerCase().includes(searchValue.toLowerCase())
    ),
  }));

  const handleClickGame = (v: "shan" | "ponewine") => {
    let url = undefined;
    if (v === "ponewine") {
      url = "https://ponewine20x.netlify.app/";
    } else {
      if (v === "shan") {
        url = "https://goldendragon7.pro/";
      }
    }
    window.open(`${url}?user_name=${user?.user_name}&balance=${user?.balance}`);
  };

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

  const handleStartPlay = async (game: Game) => {
    await getGameUrl(game);
  };

  const handleStartPlays = async (game: CardGame) => {
      await getGameUrl({
        code: game.code,
        provider_code: game.product_code,
        type_id: game.game_type_id,
      });
    };

  useEffect(() => {
    const fetchGameProducts = async () => {
      if (game_types) {
        const allGameProducts = await Promise.all(
          game_types.map((t) => fetchGameProductsByGameType(t.id))
        );
        setGameProducts(allGameProducts.flat());
        setIsLoading(false);
      }
    };
    fetchGameProducts();
  }, [game_types, isLoadingGameTypes]);

  return (
    <TabsLayout
      searchValue={searchValue}
      onChangeInput={(v) => setSearchValue(v)}
    >
      <div className="space-y-5 px-5 pb-10">
        <div className="space-y-3">
          <div className="inline-flex flex-row space-x-3 bg-black w-auto">
            <div className="bg-active w-[5px]" />
            <div className="p-1 pr-3">
              <span>{translations.burmese_games[language]}</span>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            {/* <div
              className="cursor-pointer"
              onClick={() => handleClickGame("shan")}
            >
              <img
                src={"/images/shan.jpg"}
                alt={"Shan"}
                className="object-contain w-full h-[100px] md:h-[200px] rounded-lg"
              />
            </div> */}
            <div
              className="cursor-pointer"
              onClick={() => handleClickGame("ponewine")}
            >
              <img
                src={"/images/ponewine.jpg"}
                alt={"Shan Game"}
                className="object-contain w-full h-[100px] md:h-[200px] rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="inline-flex flex-row space-x-3 bg-black w-auto">
            <div className="bg-active w-[5px]" />
            <div className="p-1 pr-3">
              <span>{translations.hot_games[language]}</span>
            </div>
          </div>
          {isLoadingHotgames ? (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              <GameListSkeleton />
            </div>
          ) : (
            <Carousel className=" max-w-[100vw] lg:max-w-[80vw] ">
              <CarouselContent>
                {hotgames?.map((gp, idx) => (
                  <CarouselItem
                    key={idx}
                    className=" basis-1/3 sm:basis-1/5 md:basis-1/5 lg:basis-1/6  cursor-pointer space-y-2"
                    onClick={() => handleStartPlay(gp)}
                  >
                    <div>
                      <img
                        src={gp.img}
                        alt={gp.name}
                        className="object-contain w-full h-[100px] md:h-[200px] rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-center font-bold">{gp.name}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -top-[25%] sm:-top-[15%] right-[7%] sm:right-[5%] md:right-[3%] ">
                <CarouselPrevious className="!border-white !border-2" />
                <CarouselNext className="-left-2 !border-white !border-2" />
              </div>
            </Carousel>
          )}
        </div>

        {isLoading || isLoadingGameTypes ? (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
            <GameListSkeleton />
          </div>
        ) : (
          filteredGameProducts.map((g, idx) => (
            <div className="space-y-3 relative" key={idx}>
              <div>
                <div className="inline-flex flex-row space-x-3 bg-black w-auto">
                  <div className="bg-active w-[5px]" />
                  <div className="p-1 pr-3">
                    <span>{g.name}</span>
                  </div>
                </div>
              </div>
              {/* className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full" */}
              {g.products.length > 0 ? (
                <>
                  <Carousel className=" max-w-[100vw] lg:max-w-[80vw] ">
                    <CarouselContent>
                      {g.products?.map((gp, idx) => (
                        <CarouselItem
                          key={idx}
                          className=" basis-1/3 sm:basis-1/5 md:basis-1/5 lg:basis-1/6  cursor-pointer space-y-2"
                          onClick={() =>
                            router(`game-type/${g.id}?provider=${gp.id}`)
                          }
                        >
                          <div>
                            <img
                              src={gp.imgUrl}
                              alt={gp.name}
                              className="object-contain w-full h-[100px] md:h-[200px] rounded-lg"
                            />
                          </div>
                          <p className="text-xs text-center font-bold">
                            {gp.name}
                          </p>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute -top-[25%] sm:-top-[15%] right-[7%] sm:right-[5%] md:right-[3%] ">
                      <CarouselPrevious className="!border-white !border-2" />
                      <CarouselNext className="-left-2 !border-white !border-2" />
                    </div>
                  </Carousel>
                </>
              ) : (
                <div className="text-sm text-gray-500">
                  {translations.no_game_available[language]}
                </div>
              )}
            </div>
          ))
        )}

        <div className="space-y-3">
          <div className="inline-flex flex-row space-x-3 bg-black w-auto">
            <div className="bg-active w-[5px]" />
            <div className="p-1 pr-3">
              <span>Card Games</span>
            </div>
          </div>
          {isLoadingCardGames ? (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              <GameListSkeleton />
            </div>
          ) : (
            <Carousel className=" max-w-[100vw] lg:max-w-[80vw] ">
              <CarouselContent>
                {card_games.map((gp, idx) => (
                  <CarouselItem
                    key={idx}
                    className=" basis-1/3 sm:basis-1/5 md:basis-1/5 lg:basis-1/6  cursor-pointer space-y-2"
                    onClick={() => handleStartPlays(gp)}
                  >
                    <div>
                      <img
                        src={gp.image_url}
                        alt={gp.name}
                        className="object-contain w-full h-[100px] md:h-[200px] rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-center font-bold">{gp.name}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -top-[25%] sm:-top-[15%] right-[7%] sm:right-[5%] md:right-[3%] ">
                <CarouselPrevious className="!border-white !border-2" />
                <CarouselNext className="-left-2 !border-white !border-2" />
              </div>
            </Carousel>
          )}
        </div>

        <div className="space-y-3">
          <div className="inline-flex flex-row space-x-3 bg-black w-auto">
            <div className="bg-active w-[5px]" />
            <div className="p-1 pr-3">
              <span>Table Games</span>
            </div>
          </div>
          {isLoadingTableGames ? (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              <GameListSkeleton />
            </div>
          ) : (
            <Carousel className=" max-w-[100vw] lg:max-w-[80vw] ">
              <CarouselContent>
                {table_games.map((gp, idx) => (
                  <CarouselItem
                    key={idx}
                    className=" basis-1/3 sm:basis-1/5 md:basis-1/5 lg:basis-1/6  cursor-pointer space-y-2"
                    onClick={() => handleStartPlays(gp)}
                  >
                    <div>
                      <img
                        src={gp.image_url}
                        alt={gp.name}
                        className="object-contain w-full h-[100px] md:h-[200px] rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-center font-bold">{gp.name}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -top-[25%] sm:-top-[15%] right-[7%] sm:right-[5%] md:right-[3%] ">
                <CarouselPrevious className="!border-white !border-2" />
                <CarouselNext className="-left-2 !border-white !border-2" />
              </div>
            </Carousel>
          )}
        </div>

        <div className="space-y-3">
          <div className="inline-flex flex-row space-x-3 bg-black w-auto">
            <div className="bg-active w-[5px]" />
            <div className="p-1 pr-3">
              <span>Bingo Games</span>
            </div>
          </div>
          {isLoadingBingoGames ? (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              <GameListSkeleton />
            </div>
          ) : (
            <Carousel className=" max-w-[100vw] lg:max-w-[80vw] ">
              <CarouselContent>
                {bingo_games.map((gp, idx) => (
                  <CarouselItem
                    key={idx}
                    className=" basis-1/3 sm:basis-1/5 md:basis-1/5 lg:basis-1/6  cursor-pointer space-y-2"
                    onClick={() => handleStartPlays(gp)}
                  >
                    <div>
                      <img
                        src={gp.image_url}
                        alt={gp.name}
                        className="object-contain w-full h-[100px] md:h-[200px] rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-center font-bold">{gp.name}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -top-[25%] sm:-top-[15%] right-[7%] sm:right-[5%] md:right-[3%] ">
                <CarouselPrevious className="!border-white !border-2" />
                <CarouselNext className="-left-2 !border-white !border-2" />
              </div>
            </Carousel>
          )}
        </div>
      </div>
      <></>
    </TabsLayout>
  );
};

export default HomePage;
