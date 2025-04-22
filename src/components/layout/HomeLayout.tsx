import { useEffect, useState } from "react";
import FilterSideMenu from "../navigation/FilterSideMenu";
import Banners from "../widgets/Banners";
import BannerText from "./BannerText";
import { Dialog, DialogContent } from "../ui/dialog";
import { fetchBanners } from "../../services/bannerService";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { CircleDollarSign, Wallet } from "lucide-react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const { data } = useQuery({
    queryKey: ["GET_BANNERS"],
    queryFn: fetchBanners,
  });

  const onCloseDialog = () => {
    setShowDialog(false);
    localStorage.setItem("after_login", "TRUE");
  };

  useEffect(() => {
    if (localStorage.getItem("after_login") === null) {
      setShowDialog(true);
    }
  }, []);

  return (
    <div className="bg-background text-white">
      <FilterSideMenu />
      <div className="space-y-3">
        <div>
          <Banners />
          <BannerText />
        </div>
        {children}
      </div>
      <Dialog open={showDialog} onOpenChange={onCloseDialog}>
        <DialogContent>
          {data && data.ads_banner && (
            <img
              src={data.ads_banner.img}
              className="h-[200px] w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeLayout;
