import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "../@types/user";
import { getMe, signIn as apiSignIn } from "../services/userService";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  signIn: ({
    user_name,
    password,
  }: {
    user_name: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      
      // First check if token exists in localStorage
      const token = localStorage.getItem("token");
      
      if (!token) {
        // If no token exists, no need to call API
        setUser(null);
        setIsLoading(false);
        // router("/login");
        return;
      }
      
      try {
        const savedUser = await getMe();
        if (savedUser) {
          setUser(savedUser);
        } else {
          // If getMe() doesn't return a user despite having a token
          // Token might be invalid or expired
          logout();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // API call failed, likely due to auth issues
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signIn = async ({
    user_name,
    password,
  }: {
    user_name: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const { user: authUser, token } = await apiSignIn({ user_name, password });
      localStorage.setItem("token", token);
      setUser(authUser);
      router("/dashboard"); // Or wherever you want to redirect after login
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};