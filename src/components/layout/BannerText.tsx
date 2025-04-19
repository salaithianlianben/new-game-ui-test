
import { useQuery } from "@tanstack/react-query";
import { fetchBannerText } from "../../services/bannerService";

const BannerText = () => {
  const { data = [] } = useQuery({
    queryKey: ["BANNER_TEXT"],
    queryFn: fetchBannerText,
  });
  
  return data.length > 0 ? (
    <div className="overflow-x-hidden w-full bg-secondary">
      <div className="py-3 animate-marquee whitespace-nowrap">
        {data.map((d, idx) => (
          <span className="" key={idx}>
            {d.text}
          </span>
        ))}
      </div>
    </div>
  ) : null;
};

export default BannerText;
