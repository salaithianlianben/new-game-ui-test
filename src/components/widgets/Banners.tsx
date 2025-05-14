import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "../../services/bannerService";

const Banners = () => {
 const data = [
"https://file.32828a.com/images/BOSSIBET_MMK/9b04f8c247eb18f7db140ded45c13085_4494634.jpg","https://file.32828a.com/images/BOSSIBET_MMK/55b1f2193a4e242ba279ea4bd84b3120_5619476.jpg","https://file.32828a.com/images/BOSSIBET_MMK/ab7a485ebe75b6dd7243ad719f23c7de_4173976.jpg","https://file.32828a.com/images/BOSSIBET_MMK/9757266aace997a437246fbd0f280e03_4437096.jpg", 
 ]

  return  (
    <div className="w-full relative">
      <Carousel opts={{ loop: true }} className="relative w-full">
        <CarouselContent>
          {data.map((item, index) => {
            return (
              <CarouselItem key={index}>
                <img
                  src={item}
                  className="bg-contain w-full h-[140px] md:h-[390px]"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute z-10 bottom-[50%] right-14 left-14">
          <CarouselPrevious className="bg-transparent border-2 border-white w-6 h-6 sm:w-10 sm:h-10 z-10" />
          <CarouselNext className="bg-transparent border-2 border-white w-6 h-6  sm:w-10 sm:h-10" />
        </div>
      </Carousel>
    </div>
  ) ;
};

export default Banners;
