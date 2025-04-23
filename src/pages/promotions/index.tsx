import { Skeleton } from "../../components/ui/skeleton";
import { fetchBanners } from "../../services/bannerService";
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
      ) : data && data.promotions.length > 0 ? (
        data.promotions.map((p, idx) => (
          <div key={idx} className="w-full space-y-3">
            <img src={p.img} className="h-full w-full object-contain" />
            <div>
              <p>{p.title}</p>
              <p className="text-sm">{p.description}</p>
            </div>
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
