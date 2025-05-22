import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "../../services/bannerService";
import img from "/images/loyalty.png";

const BannerText = () => {
  const { data } = useQuery({
    queryKey: ["GET_BANNERS"],
    queryFn: fetchBanners,
  });

  return (
    <div className="bg-black w-full overflow-hidden rounded-md">
      <div className="flex items-center space-x-2 border rounded-md border-primary/20 bg-primary/5 px-5 py-0.5 text-[15px] font-bold text-white hover:bg-primary/10 transition-colors">
        <img
          src={img}
          className="w-10 h-10 z-10 shrink-0"
          alt="icon"
        />
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {/* Replace this with `data.banner_text.map(...)` if needed */}
            <span className="mr-10 inline-block">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
              pariatur consequatur ullam ad maiores blanditiis! Accusantium
              vitae esse voluptates possimus doloremque libero!
              Reprehenderit hic porro veniam maxime sunt molestias molestiae.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerText;
