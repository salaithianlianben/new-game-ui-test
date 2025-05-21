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
import DepositView from "../pages/deposit";
import WithdrawlView from "../pages/withdrawl";
import TransferView from "../pages/transfer";
import HistoryView from "../pages/history";
import BankingDetails from "../pages/banking-details";
import ChangePasswordView from "../pages/change-password";
import AccountLayout from "../components/layout/AccountLayout";
import GamesView from "../pages/games";

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
       {
        path: "games",
        element: <GamesView />,
      },
      {
        path: "account",
        element: <AccountLayout />,
        children: [
          {
            path: "deposit",
            element: <DepositView />,
          },
          {
            path: "withdrawl",
            element: <WithdrawlView />,
          },
          {
            path: "transfer",
            element: <TransferView />,
          },
          {
            path: "history",
            element: <HistoryView />,
          },
          {
            path: "profile",
            element: <ProfileView />,
          },
          {
            path: "banking-details",
            element: <BankingDetails />,
          },
          {
            path: "change-password",
            element: <ChangePasswordView />,
          },
        ],
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
