import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../components/AuthGuard";
import HomeLayout from "../components/layout/HomeLayout";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import ProfileView from "../pages/profile";
import PromotionView from "../pages/promotions";
import RegisterPage from "../pages/register";
import Contact from "../pages/contacts";
import VideoAds from "../pages/video-ads";
import HotGamesView from "../pages/hot-games";
import GameTypeView from "../pages/game-type";
import { AuthProvider } from "../context/AuthContext";
import AppLayout from "../components/layout/AppLayout";
import CardGameView from "../pages/card-game";
import TableGameView from "../pages/table-game";
import BingoGameView from "../pages/bingo-game";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <AuthGuard>
          <AppLayout />
        </AuthGuard>
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <HomeLayout>
            <HomePage />
          </HomeLayout>
        ),
      },
      {
        path: "game-type/:id",
        element: (
          <HomeLayout>
            <GameTypeView />
          </HomeLayout>
        ),
      },
      {
        path: "hot-games",
        element: (
          <HomeLayout>
            <HotGamesView />
          </HomeLayout>
        ),
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
        path: "video-ads",
        element: <VideoAds />,
      },
      {
        path: "contacts",
        element: <Contact />
      },
      {
        path: "card-games",
        element: <CardGameView />
      },
      {
        path: "table-games",
        element: <TableGameView />
      },
      {
        path: "bingo-games",
        element: <BingoGameView />
      }
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
