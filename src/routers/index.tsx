import { createBrowserRouter } from "react-router-dom";
// import AuthGuard from "../components/AuthGuard";
import HomeLayout from "../components/layout/HomeLayout";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import ProfileView from "../pages/profile";
import PromotionView from "../pages/promotions";
import RegisterPage from "../pages/register";
import Contact from "../pages/contacts";
import HotGamesView from "../pages/hot-games";
import { AuthProvider } from "../context/AuthContext";
import AppLayout from "../components/layout/AppLayout";
import CardGameView from "../pages/card-game";
import TableGameView from "../pages/table-game";
import BingoGameView from "../pages/bingo-game";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout />
      // <AuthProvider>
      //    <AuthGuard>

      //   </AuthGuard>
      //  </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "hot-games",
        element: <HotGamesView />,
      },
      {
        path: "profile",
        element: <ProfileView />,
      },
      {
        path: "promotions",
        element: <PromotionView />,
      },
      {
        path: "contacts",
        element: <Contact />,
      },
      {
        path: "card-games",
        element: <CardGameView />,
      },
      {
        path: "table-games",
        element: <TableGameView />,
      },
      {
        path: "bingo-games",
        element: <BingoGameView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default routers;
