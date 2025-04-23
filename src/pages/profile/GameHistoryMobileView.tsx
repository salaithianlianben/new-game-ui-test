import { Accordion, AccordionContent } from "@radix-ui/react-accordion";
import { AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { PlayHistory } from "../../@types/play-history";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { Skeleton } from "../../components/ui/skeleton";

interface GameHistoryMobileViewProps {
  data: PlayHistory[];
  loading?: boolean;
}

const GameHistoryMobileView = ({ data, loading }: GameHistoryMobileViewProps) => {
  return (
    <div className="space-y-2">
      {loading ? <div className="space-y-4">
        <Skeleton className="w-full h-[50px] rounded-[10px]"/>
        <Skeleton className="w-full h-[50px] rounded-[10px]"/>
        <Skeleton className="w-full h-[50px] rounded-[10px]"/>
        <Skeleton className="w-full h-[50px] rounded-[10px]"/>
        <Skeleton className="w-full h-[50px] rounded-[10px]"/>
        <Skeleton className="w-full h-[50px] rounded-[10px]"/>
      </div> : data.length > 0 ? (
        data.map((history, idx) => (
          <Accordion
            type="single"
            collapsible
            key={idx}
            className="bg-secondary px-4 py-1 rounded-lg border shadow"
          >
            <AccordionItem value={idx.toString()}>
              <AccordionTrigger>
                <div className="flex flex-row items-center justify-between w-full">
                  <div>{history.product}</div>
                  <div>
                    {differenceInMinutes(
                      parseISO(history.to_date),
                      parseISO(history.from_date)
                    ) + " mins"}
                  </div>
                  <div>
                    {format(parseISO(history.from_date), "dd MMM yyyy")}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 grid-rows-3 gap-y-1 gap-x-5 text-sm border-t pt-3">
                  <div>Play Count</div>
                  <div>: {history.total_count}</div>
                  <div>Bet Amount</div>
                  <div>: {history.total_bet_amount}</div>
                  <div>Win/Loss Amount</div>
                  <div>: {history.total_payount_amount}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      ) : (
        <div className="text-center text-gray-500 py-4">No game history.</div>
      )}
    </div>
  );
};

export default GameHistoryMobileView;
