import FilterSideMenu from "../navigation/FilterSideMenu";
import Banners from "../widgets/Banners";
import BannerText from "./BannerText";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
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
    </div>
  );
};

export default HomeLayout;
