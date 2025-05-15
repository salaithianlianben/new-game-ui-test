
import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "../../services/bannerService";
import img from '/images/loyalty.png';

const BannerText = () => {
  const { data } = useQuery({
    queryKey: ["GET_BANNERS"],
    queryFn: fetchBanners,
  });
  
  return  (
    <div className=" overflow-x-hidden w-full text-black/80 font-semibold bg-primaryGradient flex items-center gap-2 border-y-2 boder-l-5 rounded-md border-[#DFAA44]">
      <img src={img} className="w-10 h-10 z-10 bg-primaryGradient"  />
      <div className=" py-1 animate-marquee whitespace-nowrap ">
        {/* {data.banner_text.map((d, idx) => ( */}
          <span>
            {<span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est pariatur consequatur ullam ad maiores blanditiis! Accusantium vitae esse voluptates possimus doloremque libero! Reprehenderit hic porro veniam maxime sunt molestias molestiae.</span>}
          </span>
        {/* ))} */}
      </div>
    </div>
  ) ;
};

export default BannerText;
