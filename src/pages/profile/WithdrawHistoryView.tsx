import { useQuery } from "@tanstack/react-query";
import TransactionMobileView from "./TransactionMobileView";
import TransactionTable from "./TransactionTable";
import { fetchWithdrawHistory } from "../../services/walletService";

const DepositHistoryView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_WITHDRAW_HISTORY"],
    queryFn: fetchWithdrawHistory,
  });
  return (
    <div>
      <div className="hidden md:block">
        <TransactionTable data={data ?? []} type="withdraw" loading={isLoading}/>
      </div>
      <div className="block md:hidden">
        <TransactionMobileView data={data ?? []} type="withdraw" loading={isLoading} />
      </div>
    </div>
  );
};

export default DepositHistoryView;
