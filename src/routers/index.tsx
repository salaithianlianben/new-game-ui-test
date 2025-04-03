import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../components/AuthGuard";
import HomeLayout from "../components/layout/HomeLayout";
import HomePage from "../pages/home";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <></>
      </AuthGuard>
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
    ],
  },
]);

export default routers;
