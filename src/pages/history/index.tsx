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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const reportTypes = [
  { label: 'All Transactions', value: 'all' },
  { label: 'Deposits', value: 'deposit' },
  { label: 'Withdrawals', value: 'withdrawal' },
  { label: 'Transfers', value: 'transfer' },
];

// Dummy data
const dummyData = [
  { id: 1, type: 'deposit', amount: 100, date: '2024-05-01' },
  { id: 2, type: 'withdrawal', amount: 50, date: '2024-05-02' },
  { id: 3, type: 'transfer', amount: 75, date: '2024-05-03' },
  { id: 4, type: 'deposit', amount: 200, date: '2024-05-04' },
  { id: 5, type: 'withdrawal', amount: 20, date: '2024-05-05' },
  { id: 6, type: 'transfer', amount: 80, date: '2024-05-06' },
];

const ITEMS_PER_PAGE = 3;

const HistoryView = () => {
  const [reportType, setReportType] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);

  const paginatedData = dummyData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className='!bg-primary/10 px-4 md:px-10 pt-10 pb-32 h-full overflow-y-scroll'>
  <div className="container max-w-screen-lg mx-auto">
     <div className="my-8 flex flex-col md:flex-row gap-4">
      <p className='md:basis-1/5'>Report Type *</p>
      <div className='md:basis-4/5 w-full'>
        <Select onValueChange={setReportType}>
          <SelectTrigger className='w-full bg-primary/10 border border-primary'>
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent className='z-10 bg-black border border-primary'>
            {reportTypes.map((type) => (
              <SelectItem
                key={type.value}
                value={type.value}
                className='hover:bg-primary/10'
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

     <div className="my-8 flex flex-col md:flex-row gap-4">
      <p className='md:basis-1/5'>Date *</p>
      <div className='md:basis-4/5 w-full flex flex-col sm:flex-row gap-4'>
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="From"
          className='w-full bg-primary/10 border border-primary px-3 py-2 rounded-md text-white'
        />
        <div className="flex items-center">To</div>
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="To"
          className='w-full bg-primary/10 border border-primary px-3 py-2 rounded-md text-white'
        />
      </div>
    </div>

     <Button className='flex items-center justify-center py-2 px-8 text-base text-black mx-auto'>
      Submit
    </Button>

     <div className="mt-10 rounded-xl overflow-x-auto border border-primary/50">
      <Table className="min-w-full bg-black/20 text-white">
        <TableHeader className="bg-primary/10">
          <TableRow>
            <TableHead className="p-3 border-b border-primary/50">ID</TableHead>
            <TableHead className="p-3 border-b border-primary/50">Type</TableHead>
            <TableHead className="p-3 border-b border-primary/50">Amount</TableHead>
            <TableHead className="p-3 border-b border-primary/50">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id} className="hover:bg-primary/5">
              <TableCell className="p-3 border-b border-primary/10">{item.id}</TableCell>
              <TableCell className="p-3 border-b border-primary/10 capitalize">{item.type}</TableCell>
              <TableCell className="p-3 border-b border-primary/10">${item.amount}</TableCell>
              <TableCell className="p-3 border-b border-primary/10">{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
     <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
      <Button
        variant="outline"
        className={`border border-white text-white px-4 py-2 h-max text-sm !font-normal rounded-md transition-colors ${
          currentPage !== 1 ? 'hover:bg-primary/10' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        Previous
      </Button>
      {[1, 2].map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          className="text-white rounded-md py-1.5 h-max !text-base !font-normal"
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        className={`border border-white text-white px-4 py-2 h-max text-sm !font-normal rounded-md transition-colors ${
          currentPage !== totalPages ? 'hover:bg-primary/10' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </Button>
    </div>
  </div>
</div>

  );
};

export default HistoryView;
