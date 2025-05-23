'use client';

import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

const bankOptions = [
  { label: 'KBZ Bank', value: 'kbz' },
  { label: 'AYA Bank', value: 'aya' },
  { label: 'CB Bank', value: 'cb' },
  { label: 'UAB Bank', value: 'uab' },
  { label: 'Yoma Bank', value: 'yoma' },
];

const BankingDetails = () => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState<string | null>(null);

  const [bankRecords, setBankRecords] = useState([
    {
      bank: 'KBZ Bank',
      accountName: 'John Doe',
      accountNumber: '1234567890',
    },
    {
      bank: 'AYA Bank',
      accountName: 'Jane Smith',
      accountNumber: '9876543210',
    },
    {
      bank: 'CB Bank',
      accountName: 'Emily Johnson',
      accountNumber: '5551234567',
    },
  ]);

  const handleSubmit = () => {
  
  };

  return (
    <div className='!bg-primary/10 px-4 sm:px-6 md:px-10 pt-10 pb-32 h-full overflow-y-auto space-y-8'>

       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <p className='w-full md:w-1/5'>Bank Name *</p>
        <div className='w-full md:w-4/5'>
          <Select value={bankName ?? ''} onValueChange={setBankName}>
            <SelectTrigger className='w-full bg-primary/10 border border-primary rounded-md'>
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent className='z-10 bg-black border border-primary rounded-md'>
              {bankOptions.map((bank) => (
                <SelectItem
                  key={bank.value}
                  value={bank.value}
                  className='hover:bg-primary/10'
                >
                  {bank.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <p className='w-full md:w-1/5'>Bank Account Name *</p>
        <Input
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder='Enter account holder name'
          className='w-full md:w-4/5 bg-primary/10 border border-primary rounded-md'
        />
      </div>

       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <p className='w-full md:w-1/5'>Bank Account Number *</p>
        <Input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder='Enter account number'
          className='w-full md:w-4/5 bg-primary/10 border border-primary rounded-md'
        />
      </div>

       <Button onClick={handleSubmit} className='mt-6 mx-auto block text-black px-8'>
        Submit
      </Button>

       <div className='mt-10 rounded-xl overflow-x-auto border border-primary'>
        <Table className='min-w-[600px] bg-black/20 text-white'>
          <TableHeader className='bg-primary/20 text-white'>
            <TableRow>
              <TableHead className='text-white'>Bank Name</TableHead>
              <TableHead className='text-white'>Account Name</TableHead>
              <TableHead className='text-white'>Account Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bankRecords.map((item, idx) => (
              <TableRow key={idx} className='hover:bg-primary/10'>
                <TableCell>{item.bank}</TableCell>
                <TableCell>{item.accountName}</TableCell>
                <TableCell>{item.accountNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BankingDetails;
