import { useAuth } from "../context/AuthContext";
import TopNav from "./navigation/TopNav";
import Loading from "./ui/loading";
import SideBar from "./navigation/SideBar";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthProviderProps) => {
  const location = useLocation();
  // const router = useNavigate();
  const {  isLoading } = useAuth();

  const isAuthRoute =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  // useEffect(() => {
  //   if (!isLoading && user && isAuthRoute) {
  //     router("/");
  //   }
  //   console.log(isEmpty(localStorage.getItem("token")) && !isAuthRoute);
  //   if (isEmpty(localStorage.getItem("token")) && !isAuthRoute)
  //     router("/login");
  // }, [user, isLoading, isAuthRoute, router]);

  return (
    <Loading loading={isLoading}>
      {isAuthRoute ? (
        <main className="min-h-screen w-full">
          <div className="h-full w-full">{children}</div>
        </main>
      ) : (
        <main className="bg-background text-white grid min-h-screen w-full lg:grid-cols-[20%_1fr]">
          <SideBar className="h-screen sticky top-0" />
          <div className="flex flex-col h-screen">
            <TopNav className="sticky top-0 z-10" />
            <div className="flex-1 overflow-y-auto w-full h-full">
              {children}
            </div>
          </div>
        </main>
      )}
    </Loading>
  );
};

export default AuthGuard;
