import React from "react";
import winner from "../../../public/images/winner.png";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDownCircleIcon, ChevronDownIcon, User } from "lucide-react";

("use client");

const DailyBoard: React.FC = () => {
  return (
    <div className="px-2 xl:px-20">
      <Card className="overflow-hidden bg-black xl:max-w-4xl mx-auto border-primary rounded-2xl shadow-sm">
        <CardHeader className="p-3 lg:p-6 xl:p-6">
          <CardTitle className="text-center">
              <button
            className="mb-2 flex items-center justify-center mx-auto space-x-1 rounded-md border border-primary/20 bg-primary/5 px-2 py-1 text-[13px] font-bold text-primary hover:bg-primary/10 transition-colors"
            type="button"
          >
            <User size={18} />
            <span>Win Amount</span>
          </button>
           <div className="flex items-center justify-between px-2">
             <div className="">
              <span className="text-base lg:text-lg font-semibold">Daily Board</span>
            <span className="ml-2 text-base  lg:text-lg  text-muted-foreground font-normal">
              {new Date().toLocaleTimeString()}
            </span>
             </div>
            <p className="flex items-center gap-0.5 animate-bounce text-[13px]  text-primary duration-[3000]">Scroll Down <ArrowDownCircleIcon size={18} /> </p>
           </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 h-[150px] lg:h-[250px] overflow-y-scroll px-3 lg:px-6 xl:px-6">
        
          {[1, 2, 3, 4, 5, 6, 8, 9, 0].map((item) => (
            <Card
              key={item}
              className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 border border-primary/20 bg-primary/5 rounded-xl cursor-pointer  text-primary hover:bg-primary/10 transition-colors "
            >
              <div className="flex items-center gap-3">
                <img
                  src={winner}
                  alt="winner"
                  className="rounded-md object-cover w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]"
                />
                <p className="text-sm sm:text-lg font-semibold">
                  Dragon Gold 6888
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <p className="text-sm sm:text-lg text-primary/60">@htoo</p>
                <p className="text-sm sm:text-base font-semibold text-primary">
                  80,000 Ks
                </p>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyBoard;
