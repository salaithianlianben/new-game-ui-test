import { useState } from "react";
import HomeGames from "../../components/layout/HomeGames";
import SideBar from "../../components/navigation/SideBar";
import TopNav from "../../components/navigation/TopNav";
import Banners from "../../components/widgets/Banners";
import { Button } from "../../components/ui/button";
import Ads from "../../components/widgets/Ads";
import GameCategoriesLg from "../../components/widgets/GameCategoriesLg";
import BannerText from "../../components/layout/BannerText";
import DailyBoard from "../../components/widgets/DailyBoard";

const HomePage = () => {
  
  return (
    <div className="">
      <GameCategoriesLg/>
        <Ads/>
      <Banners />
      <div className="p-4">
        <BannerText/>
      </div>
      <DailyBoard/>
      <HomeGames />
    </div>
  );
};

export default HomePage;
