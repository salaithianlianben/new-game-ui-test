import { useQuery } from "@tanstack/react-query";
import { fetchPoneWineReport } from "../../services/reportService";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { PoneWineReport } from "../../@types/ponewine-report";

const PoneWineReportTable = () => {
    const { data = [], isLoading } = useQuery({
        queryKey: ['GET_PONE_WINE_REPORT'],
        queryFn: fetchPoneWineReport
    });

    const columns: ColumnDef<PoneWineReport>[] = [
        {
          accessorKey: "",
          header: "No.",
          cell: ({ row }) => row.index + 1,
        },
        {
          header: "Bet Amount",
          cell: ({ row }) =>
           row.original.total_bet_amount
        },
        {
          header: "Winning Number",
          cell: ({ row }) => row.original.win_number,
        },
        {
          header: "Win/Loss",
          cell: ({ row }) => row.original.win_lose_amt,
        },
      ];
      return (
        <div>
          <DataTable data={data} columns={columns} loading={isLoading}/>
        </div>
      );
}

export default PoneWineReportTable;

