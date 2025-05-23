import React, { useState } from "react";
import cHome from "../../../public/icons/cHome.png";
import card from "../../../public/icons/cCard.png";
import cSlot from "../../../public/icons/cSlot.png";
import cFishing from "../../../public/icons/cFishing.png";
import cCasino from "../../../public/icons/cCasino.png";
import cSport from "../../../public/icons/cSport.png";
import { Button } from "../ui/button";
import { ArrowRightIcon, ClubIcon, SparklesIcon, ThumbsUpIcon, TrophyIcon, UserIcon } from "lucide-react";
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
  const [selected,setSelected]=useState(gameCategories[0].id);

  return (
    <div className=" xl:px-20">
     <div className="sticky bg-secondary top-0 left-0 right-0 pt-2 lg:px-5 styled-scroll overflow-x-scroll flex justify-between lg:justify-center items-center bg-primary-radial bg-primary-radial-alt lg:gap-16 lg:hidden">
  {gameCategories.map((item) => {
    return (
      <div
        key={item.id}
        className={`
          ${item.id === selected ? "border-b-4 border-primary/80 bg-primary/10 pb-1" : "pb-2"} 
          pt-2
          flex flex-col items-center
          basis-[80px] sm:basis-[100px] flex-shrink-0
          lg:basis-[14.28%] h-[70px]  justify-center
        `}
        onClick={() => setSelected(item.id)}
      >
        
        <img className="w-8 h-8 mx-auto" src={item.icon} alt={item.name} />
        <p className="mt-0.5 text-nowrap">{item.name}</p>
      </div>
    );
  })}
</div>
<div className="px-5">
      <DemoGameGrid title="Most Popular" icon={<TrophyIcon/>} iconBg="#D4B374" />
      <DemoGameGrid title="Recent Big Wins" icon={<ThumbsUpIcon/>} iconBg="#A675FB" />
    <DemoGameGrid title="Slot Games" icon={<SparklesIcon/>} iconBg="#3A6BFF" />
      <DemoGameGrid title="Live Casino Games" icon={<ClubIcon/>} iconBg="#FF00C2" />
      </div>
    </div>
  );
};

export default HomeGames;

interface Props  {
  title:string;
  icon:any;
  iconBg:string;
}
const DemoGameGrid = ({title,icon,iconBg}:Props)=>{
  const imgs = [
    'https://storage.googleapis.com/ace-my/Game/110/1100100009.webp',
    'https://storage.googleapis.com/ace-my/Game/101/1010200032.webp',
    'https://storage.googleapis.com/ace-my/Game/101/1010100110.webp',
    'https://storage.googleapis.com/ace-my/Game/106/1060100018.webp',
    'https://storage.googleapis.com/ace-my/Game/101/1010100026.webp',
    'https://storage.googleapis.com/ace-my/Game/108/1080100411.webp',
    'https://storage.googleapis.com/ace-my/Game/110/1100100009.webp',
    'https://storage.googleapis.com/ace-my/Game/101/1010200032.webp',
    'https://storage.googleapis.com/ace-my/Game/101/1010100110.webp',
    'https://storage.googleapis.com/ace-my/Game/106/1060100018.webp',
    'https://storage.googleapis.com/ace-my/Game/101/1010100026.webp',
    'https://storage.googleapis.com/ace-my/Game/108/1080100411.webp'
  ]
  return (<div className="pt-8 cursor-pointer">
    <div className="flex justify-between items-center ">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1 rounded-md" style={{background:iconBg}}>{icon}</div>
      <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <p className="text-white/60">See All <ArrowRightIcon size={16} className="inline" /></p>
    </div>
    <div className="flex items-center gap-2 sm:gap-5 gamesStyledScroll overflow-x-scroll">
      {imgs.map((item,index)=>{
         return <div
  key={index}
   className="mb-2 w-[35%] sm:w-[25%] md:w-[20%] lg:w-[16.66%] shrink-0 p-2 rounded-md bg-primary/10 border border-primary"
>
  <img src={item} className="w-full h-auto rounded-md" />
  <div className="rounded-b-md">
    <div
      className="flex  mt-2 justify-center mx-auto items-center rounded-md border border-primary/20 bg-activeGradient px-4 py-1 w-max text-sm font-semibold text-black hover:bg-primary/20 transition-colors select-none"
      
       
    >
      +3456
    </div>
  </div>
</div>
      })}
    </div>
    
  </div>)
}
