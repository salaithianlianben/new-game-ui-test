import React, { useState } from 'react'
import cHome from "../../../public/icons/cHome.png";
import card from "../../../public/icons/cCard.png";
import cSlot from "../../../public/icons/cSlot.png";
import cFishing from "../../../public/icons/cFishing.png";
import cCasino from "../../../public/icons/cCasino.png";
import cSport from "../../../public/icons/cSport.png";

const GameCategoriesLg = () => {
     const gameCategories = [
        { id: 0, name: "Home", icon: cHome, link: "/" },
    
        { id: 1, name: "Card", icon: card, link: "/" },
        { id: 2, name: "Slot", icon: cSlot, link: "/" },
        { id: 3, name: "Fishing", icon: cFishing, link: "/" },
        { id: 4, name: "Casino", icon: cCasino, link: "/" },
        { id: 5, name: "Table", icon: cCasino, link: "/" },
        { id: 16, name: "Bingo", icon: cSport, link: "/" },
      ];
      const [selected,setSelected]=useState(0);
  return (
    <div className='hidden lg:flex items-center pt-2 cursor-pointer'>
      {gameCategories.map((item)=>{
        return <div  onClick={()=>setSelected(item.id)} className={`flex pb-2 px-6 border-b-4  items-center gap-2 hover:border-primary ${selected===item.id ? 'border-primary':'border-transparent'} transition-all ease-in-out duration-300`}>
            <img className='w-8 h-8' src={item.icon} />
            <p className='font-medium text-base'> {item.name}</p>
        </div>
      })}
    </div>
  )
}

export default GameCategoriesLg
