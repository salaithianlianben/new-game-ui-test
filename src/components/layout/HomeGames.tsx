import React from "react";
import cHome from "../../../public/icons/cHome.png";
import card from "../../../public/icons/cCard.png";
import cSlot from "../../../public/icons/cSlot.png";
import cFishing from "../../../public/icons/cFishing.png";
import cCasino from "../../../public/icons/cCasino.png";
import cSport from "../../../public/icons/cSport.png";
import { Button } from "../ui/button";
const HomeGames = () => {
  const gameCategories = [
    { id: 0, name: "Home", icon: cHome, link: "/" },

    { id: 1, name: "Card", icon: card, link: "/" },
    { id: 2, name: "Slot", icon: cSlot, link: "/" },
    { id: 3, name: "Fishing", icon: cFishing, link: "/" },
    { id: 4, name: "Casino", icon: cCasino, link: "/" },
    { id: 5, name: "Table", icon: cCasino, link: "/" },
    { id: 16, name: "Bingo", icon: cSport, link: "/" },
  ];

  return (
    <div>
      <div className="pt-2 px-5 styled-scroll overflow-x-scroll flex justify-between lg:justify-center items-center bg-primary-radial bg-primary-radial-alt gap-8 lg:gap-16">
        {gameCategories.map((item) => {
          return (
            <div
              key={item.id}
              className={
                item.id === 0 ? " border-b-4 border-secondary pb-1" : "pb-2"
              }
            >
              <img
                className="w-8 h-8 mx-auto"
                src={item.icon}
                alt={item.name}
              />
              <p className="mt-0.5 text-nowrap">{item.name}</p>
            </div>
          );
        })}
      </div>
      <div className="items-center flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:w-[70%] w-full">
          {gameCategories.splice(1, 6).map((item) => {
            return (
              <div
                key={item.id}
                className="cursor-pointer basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 px-5 py-3 relative group"
              >
                <h1 className="uppercase font-bold text-secondaryGradient">
                  {item.name}
                </h1>
                <img
                  src="https://mogame-bucket.s3.ap-southeast-1.amazonaws.com/GameFile/MakerProjectFile/JILI/102/icon.png"
                  className="w-full h-auto rounded-sm group-hover:scale-105 transition-all duration-300 ease-in-out"
                />
                <Button className="absolute bottom-[14%] left-[15%] bg-secondary-gradient border-secondaryGradient group-hover:scale-105 !text-black hover:shadow-2xl">
                  PLAY NOW
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeGames;
