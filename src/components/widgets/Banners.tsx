import { useState, useEffect, useCallback, useRef } from "react";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";

const Banners = () => {
  const data = [
    "https://file.32828a.com/images/BOSSIBET_MMK/9b04f8c247eb18f7db140ded45c13085_4494634.jpg",
    "https://file.32828a.com/images/BOSSIBET_MMK/55b1f2193a4e242ba279ea4bd84b3120_5619476.jpg",
    "https://file.32828a.com/images/BOSSIBET_MMK/ab7a485ebe75b6dd7243ad719f23c7de_4173976.jpg",
    "https://file.32828a.com/images/BOSSIBET_MMK/9757266aace997a437246fbd0f280e03_4437096.jpg",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<number[]>(
    new Array(data.length).fill(0)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });

  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

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

  const updateProgress = useCallback(() => {
    setProgress((prev) => prev.map((_, i) => (i === activeIndex ? 0 : 100)));

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) =>
        prev.map((val, i) => (i === activeIndex ? Math.min(val + 2, 100) : val))
      );
    }, 60);
  }, [activeIndex]);

  useEffect(() => {
    updateProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, updateProgress]);

  return (
    <div className="w-full relative px-2 lg:px-4">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay as any]}
        className="relative w-full"
        setApi={setEmblaApi}
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index}>
              <img
                src={item}
                alt={`Banner ${index}`}
                className="bg-contain rounded-md w-full h-[140px] md:h-[390px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute z-10 bottom-[50%] right-14 left-14">
          <CarouselPrevious className="bg-transparent border-2 border-white w-6 h-6 sm:w-10 sm:h-10 z-10" />
          <CarouselNext className="bg-transparent border-2 border-white w-6 h-6 sm:w-10 sm:h-10" />
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-2 w-full max-w-[220px] px-4">
          {progress.map((value, i) => (
            <div key={i} className="w-full h-[5px] bg-black  overflow-hidden">
              <div
                className="h-full bg-activeGradient transition-all duration-75"
                style={{ width: `${value}%` }}
              />
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default Banners;
