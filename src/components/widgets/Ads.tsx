 
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";

const Ads = () => {
  const imgs = [
    "https://file.32828a.com/images/BOSSIBET_MMK/9b04f8c247eb18f7db140ded45c13085_4494634.jpg",
    "https://file.32828a.com/images/BOSSIBET_MMK/55b1f2193a4e242ba279ea4bd84b3120_5619476.jpg",
    "https://file.32828a.com/images/BOSSIBET_MMK/ab7a485ebe75b6dd7243ad719f23c7de_4173976.jpg",
  ];

  const [showDialog, setShowDialog] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<number[]>(new Array(imgs.length).fill(0));
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });


   useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Update progress bar for current slide
  const updateProgress = useCallback(() => {
    setProgress((prev) =>
      prev.map((_, i) => (i === activeIndex ? 0 : 100))
    );

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) =>
        prev.map((val, i) =>
          i === activeIndex ? Math.min(val + 2, 100) : val
        )
      );
    }, 60);
  }, [activeIndex]);

  useEffect(() => {
    updateProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, updateProgress]);

  // Close dialog handler
  const onCloseDialog = () => setShowDialog(false);

  return (
    <Dialog open={showDialog} onOpenChange={onCloseDialog}>
      <DialogContent className="p-4 max-w-lg w-full">
        <div className="w-full relative">
          <Carousel
            opts={{ loop: true }}
  plugins={[autoplay as any]}
            className="relative w-full"
            setApi={setEmblaApi}
          >
            <CarouselContent>
              {imgs.map((item, index) => (
                <CarouselItem key={index}>
                  <img
                    src={item}
                    alt={`Ad ${index}`}
                    className="w-full h-[220px] object-cover rounded-md"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

           

            {/* Progress Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 w-full max-w-[220px] px-4">
              {progress.map((value, i) => (
                <div
                  key={i}
                  className="w-full h-[5px] bg-black  overflow-hidden"
                >
                  <div
                    className="h-full bg-primaryGradient transition-all duration-75"
                    style={{ width: `${value}%` }}
                  />
                </div>
              ))}
            </div>
          </Carousel>

          {/* Close Button */}
          <DialogClose className=" mt-6 flex justify-center w-full">
            <Button className="w-max ">OK</Button>
          </DialogClose>

          {/* Checkbox */}
          <div className="flex justify-center items-center gap-3 mt-4">
            <Checkbox id="closeToday" />
            <label htmlFor="closeToday" className="select-none cursor-pointer">
              Close Today
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Ads;
