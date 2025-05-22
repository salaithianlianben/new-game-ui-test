
import React, { useState } from 'react';
import cHome from "../../../public/icons/cHome.png";
import card from "../../../public/icons/cCard.png";
import cSlot from "../../../public/icons/cSlot.png";
import cFishing from "../../../public/icons/cFishing.png";
import cCasino from "../../../public/icons/cCasino.png";
import cSport from "../../../public/icons/cSport.png";
import { HeartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

const gameCategories = [
  { id: 0, name: "Home", icon: cHome, link: "/" },
  { id: 1, name: "Card", icon: card, link: "/" },
  { id: 2, name: "Slot", icon: cSlot, link: "/" },
  { id: 3, name: "Fishing", icon: cFishing, link: "/" },
  { id: 4, name: "Casino", icon: cCasino, link: "/" },
  { id: 5, name: "Table", icon: cCasino, link: "/" },
  { id: 16, name: "Bingo", icon: cSport, link: "/" },
];

const GameCategoriesLg = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const goToLink= (link:string)=>{
    return navigate(link);
  }
  return (
    <nav className="hidden lg:block px-5 py-2.5" role="tablist" aria-label="Game categories">
      <div className="lg:flex space-x-2 rounded-md py-2 px-6 bg-black backdrop-blur-lg">
         
           <Tabs defaultValue={selected.toString()} className="w-max">
                <TabsList className=""> 
      {gameCategories.map((item) => {
        const isSelected = selected === item.id;
        return ( <TabsTrigger
        onClick={()=>goToLink('/games')}
                    value={item.id.toString()}
                    className="transition-all px-6 text-[15px] ease-in-out duration-150"
                  >
                   {item.name}
                  </TabsTrigger>)
                  
              
       
        
       })}
        </TabsList>
               </Tabs>

       <div className="cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 bg-primaryGradient text-black font-semibold py-2 px-5 rounded-md  flex items-center gap-2">
          <HeartIcon/>
          <p>Game Logs</p>
         </div>
      </div>
    </nav>
  );
};

export default GameCategoriesLg;

