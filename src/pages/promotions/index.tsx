import { Skeleton } from "../../components/ui/skeleton";
import { fetchBanners } from "../../services/bannerService";
import { fetchPromotions } from "../../services/promotionService";
import { useQuery } from "@tanstack/react-query";

const PromotionView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_BANNERS"],
    queryFn: fetchBanners,
  });

  return (
    <div className="p-5 space-y-5">
      {isLoading ? (
        <div className="space-y-5">
          <Skeleton className="w-full h-30 bg-secondary" />
          <Skeleton className="w-full h-30 bg-secondary" />
          <Skeleton className="w-full h-30 bg-secondary" />
          <Skeleton className="w-full h-30 bg-secondary" />
          <Skeleton className="w-full h-30 bg-secondary" />
        </div>
      ) : data ? (
        data.promotions.map((p, idx) => (
          <div key={idx} className="w-full h-[300px]">
            <img src={p.img} className="h-full w-full object-cover" />
          </div>
        ))
      ) : (
        <div>
          <span className="text-gray-500">No promotion records</span>
        </div>
      )}
    </div>
  );
};

export default PromotionView;
