import { getMe } from "../../services/userService";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import { translations } from "../../configs/translations";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {

  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["ME"],
    queryFn: getMe,
  });

  return (
    <Card className="w-full bg-secondary p-4">
      {isLoading ? (
        <Skeleton className="w-full h-9 bg-secondary" />
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center space-y-3">
          <div className="rounded-full border border-white px-6 py-4 bg-secondary shadow flex items-center justify-center">
            <span className="font-bold text-lg sm:text-xl">
              {user?.name ? user?.name.charAt(0).toUpperCase() : "-"}
            </span>
          </div>
          <div className="flex flex-col space-y-1 justify-center items-center">
            <span className="text-xl font-bold">{user?.name}</span>
            <span className="text-sm text-gray-200">{user?.user_name}</span>
          </div>
          <div className="bg-primary border border-active px-4 py-1 rounded-md flex flex-row space-x-2 items-center justify-center">
            <img src="/icons/coin.png" className="h-4 w-4" />
            <p className="font-bold">{user?.balance + " MMK"}</p>
          </div>
          <div className="flex flex-row space-x-7 justify-center items-center w-full pt-4">
            <Button
              onClick={() => navigate('/profile')}
              className="w-full sm:w-auto space-x-2 px-4 sm:px-5 border border-active text-active hover:bg-active hover:text-black font-bold"
            >
              <PiHandDeposit />
              {translations.deposit[language]}
            </Button>
            <Button
              onClick={() => navigate('/profile')}
              className="w-full sm:w-auto px-4 sm:px-5 border border-active text-active hover:bg-active hover:text-black font-bold"
            >
              <PiHandWithdraw />
              {translations.withdraw[language]}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserInfo;
