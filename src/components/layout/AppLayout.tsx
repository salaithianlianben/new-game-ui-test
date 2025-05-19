import { Outlet } from "react-router-dom";
import TopNav from "../navigation/TopNav";
import Contact from "../widgets/Contact";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-secondary text-white">
      <TopNav />
      <Outlet />
      <Contact />
    </div>
  );
};

export default AppLayout;
