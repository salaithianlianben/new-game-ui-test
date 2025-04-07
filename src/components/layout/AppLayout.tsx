import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="bg-background text-white">
      <div className="space-y-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
