import { Outlet } from "react-router-dom";
import SideBar from "../navigation/SideBar";
import TopNav from "../navigation/TopNav";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-secondary text-white">
      <TopNav/>
         <Outlet />
     </div>
  );
};

export default AppLayout;
