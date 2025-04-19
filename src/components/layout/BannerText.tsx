
import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "../../services/bannerService";

const BannerText = () => {
  const { data } = useQuery({
    queryKey: ["GET_BANNERS"],
    queryFn: fetchBanners,
  });
  
  return data ? (
    <div className="overflow-x-hidden w-full bg-secondary">
      <div className="py-3 animate-marquee whitespace-nowrap">
        {/* {data.banner_text.map((d, idx) => ( */}
          <span>
            {data.banner_text.text}
          </span>
        {/* ))} */}
      </div>
    </div>
  ) : null;
};

export default BannerText;
