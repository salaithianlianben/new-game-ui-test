import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "../../components/ui/select";

const gameWallets = [
  { value: "jili", label: "JILI Wallet" },
  { value: "pgsoft", label: "PGSoft Wallet" },
  { value: "spadegaming", label: "Spadegaming Wallet" },
  { value: "pragmatic", label: "Pragmatic Play Wallet" },
];

const amountOptions = [5000, 10000, 20000, 50000, 100000];

const TransferView = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [transferFrom, setTransferFrom] = useState<string>("");
  const [transferTo, setTransferTo] = useState<string>("");

  const isFormValid = transferFrom && transferTo && amount && transferFrom !== transferTo;

  const handleSubmit = () => {
    if (!isFormValid) {
       return;
    }

    console.log({
      from: transferFrom,
      to: transferTo,
      amount,
    });

   };

  return (
    <div className="!bg-primary/10 px-4 md:px-10 pt-10 pb-32 h-full overflow-y-scroll text-sm">
       <div className="my-6 flex flex-col md:flex-row gap-2 md:gap-4">
        <p className="md:basis-1/5 font-medium">Transfer From *</p>
        <div className="md:basis-4/5 w-full">
          <Select onValueChange={setTransferFrom}>
            <SelectTrigger className="w-full bg-primary/10 border border-primary">
              <SelectValue placeholder="Select game wallet" />
            </SelectTrigger>
            <SelectContent className="z-10 bg-black border border-primary">
              {gameWallets.map(wallet => (
                <SelectItem
                  key={wallet.value}
                  value={wallet.value}
                  className="hover:bg-primary/10"
                >
                  {wallet.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

       <div className="my-6 flex flex-col md:flex-row gap-2 md:gap-4">
        <p className="md:basis-1/5 font-medium">Transfer To *</p>
        <div className="md:basis-4/5 w-full">
          <Select onValueChange={setTransferTo}>
            <SelectTrigger className="w-full bg-primary/10 border border-primary">
              <SelectValue placeholder="Select game wallet" />
            </SelectTrigger>
            <SelectContent className="z-10 bg-black border border-primary">
              {gameWallets.map(wallet => (
                <SelectItem
                  key={wallet.value}
                  value={wallet.value}
                  className="hover:bg-primary/10"
                >
                  {wallet.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

       <div className="my-6 flex flex-col md:flex-row gap-2 md:gap-4">
        <p className="md:basis-1/5 font-medium">Amount *</p>
        <div className="md:basis-4/5 w-full">
          <Input
            type="number"
            value={amount ?? ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-primary/10 border border-primary"
            placeholder="Minimum: 3000"
            min={3000}
          />

          <div className="flex flex-wrap gap-3 mt-6">
            {amountOptions.map((value) => (
              <Button
                key={value}
                onClick={() => setAmount(value)}
                className="!font-normal text-sm h-max py-2 px-4 bg-primary/10 border border-primary"
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      </div>

       <div className="mt-10 flex justify-center">
        <Button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className="py-2 px-8 text-base text-black bg-primaryGradient disabled:opacity-50"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default TransferView;
