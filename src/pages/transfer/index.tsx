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

const TransferView = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [transferFrom, setTransferFrom] = useState<string>("");
  const [transferTo, setTransferTo] = useState<string>("");

  return (
    <div className='!bg-primary/10 px-10 pt-10 pb-32 h-full overflow-y-scroll'>
       <div className="my-8 flex gap-4">
        <p className='basis-1/5'>Transfer From *</p>
        <div className='basis-4/5'>
          <Select onValueChange={setTransferFrom}>
            <SelectTrigger className='w-full bg-primary/10 border border-primary'>
              <SelectValue placeholder="Select game wallet" />
            </SelectTrigger>
            <SelectContent className='z-10 bg-black border border-primary'>
              {gameWallets.map(wallet => (
                <SelectItem
                  key={wallet.value}
                  value={wallet.value}
                  className='hover:bg-primary/10'
                >
                  {wallet.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
        <div className="my-8 flex gap-4">
        <p className='basis-1/5'>Transfer To *</p>
        <div className='basis-4/5'>
          <Select onValueChange={setTransferTo}>
            <SelectTrigger className='w-full bg-primary/10 border border-primary'>
              <SelectValue placeholder="Select game wallet" />
            </SelectTrigger>
            <SelectContent className='z-10 bg-black border border-primary'>
              {gameWallets.map(wallet => (
                <SelectItem
                  key={wallet.value}
                  value={wallet.value}
                  className='hover:bg-primary/10'
                >
                  {wallet.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

       <div className="my-8 flex gap-4">
        <p className='basis-1/5'>Amount *</p>
        <div className='basis-4/5'>
          <Input
            value={selectedValue ?? ''}
            onChange={(e) => setSelectedValue(Number(e.target.value))}
            className='w-full bg-primary/10 border border-primary'
            placeholder='Minimum: 3000'
          />
          <div className="flex items-center my-8 gap-4 flex-wrap">
            {[5000, 10000, 20000, 50000, 100000].map((item, id) => (
              <Button
                onClick={() => setSelectedValue(item)}
                key={id}
                className='!font-normal text-sm h-max rounded-md py-2 px-4 bg-primary/10 border border-primary'
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>

       <Button className='flex items-center justify-center py-1 px-8 text-base text-black mx-auto'>
        Submit
      </Button>
    </div>
  );
};

export default TransferView;
