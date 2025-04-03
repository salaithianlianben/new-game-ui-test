import { useAuth } from "../context/AuthContext";
import {  ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useNavigate();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router("/login");
  //   }
  // }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Unauthorized access</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
