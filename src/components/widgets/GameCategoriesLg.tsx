
import React, { useState } from 'react';
import cHome from "../../../public/icons/cHome.png";
import card from "../../../public/icons/cCard.png";
import cSlot from "../../../public/icons/cSlot.png";
import cFishing from "../../../public/icons/cFishing.png";
import cCasino from "../../../public/icons/cCasino.png";
import cSport from "../../../public/icons/cSport.png";

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

  return (
    <nav className="hidden lg:flex space-x-6" role="tablist" aria-label="Game categories">
      {gameCategories.map((item) => {
        const isSelected = selected === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            aria-current={isSelected ? 'true' : undefined}
            className={`
              flex items-center gap-3 border-b-2 px-6 py-3
              text-base font-semibold
              transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              ${
                isSelected
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-transparent text-muted-foreground hover:border-primary hover:text-primary'
              }
            `}
            role="tab"
          >
            <img src={item.icon} alt={`${item.name} icon`} className="w-8 h-8" />
            <span>{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default GameCategoriesLg;

