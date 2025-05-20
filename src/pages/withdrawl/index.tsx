import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '../../components/ui/select'

const WithdrawlView = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  return (
    <div className='!bg-primary/10 px-10 pt-10 pb-32 h-full overflow-y-scroll'>
      <div className='my-8 flex flex-wrap sm:flex-nowrap items-center gap-4'>
        <p className='basis-full sm:basis-1/5'>Bank Account *</p>
        <div className='basis-full sm:basis-4/5'>
          <Select>
            <SelectTrigger className='w-full bg-primary/10 border border-primary'>
              <SelectValue placeholder='Select bank account' />
            </SelectTrigger>
            <SelectContent className='z-10 bg-black border border-primary'>
              <SelectItem className='hover:bg-primary/10' value='kbz'>KBZ Bank - 0123456789</SelectItem>
              <SelectItem className='hover:bg-primary/10' value='cb'>CB Bank - 9876543210</SelectItem>
              <SelectItem className='hover:bg-primary/10' value='aya'>AYA Bank - 1234987654</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='my-8 flex flex-wrap sm:flex-nowrap items-center gap-4'>
        <p className='basis-full sm:basis-1/5'>Bank Account Name *</p>
        <div className='basis-full sm:basis-4/5'>
          <Input className='w-full bg-primary/10 border border-primary' placeholder='Enter account name' />
        </div>
      </div>

      <div className='my-8 flex flex-wrap sm:flex-nowrap items-center gap-4'>
        <p className='basis-full sm:basis-1/5'>Bank Account Number *</p>
        <div className='basis-full sm:basis-4/5'>
          <Input className='w-full bg-primary/10 border border-primary' placeholder='Enter account number' />
        </div>
      </div>

      <div className='my-8 flex flex-wrap sm:flex-nowrap gap-4'>
        <p className='basis-full sm:basis-1/5'>Amount *</p>
        <div className='basis-full sm:basis-4/5'>
          <Input
            value={selectedValue ?? ''}
            onChange={(e) => setSelectedValue(Number(e.target.value))}
            className='w-full bg-primary/10 border border-primary'
            placeholder='Minimum: 3000'
          />
          <p className='font-semibold text-lg my-6'>! Min/Max Limit: 3000 / 50000</p>
          <div className='flex items-center gap-4 flex-wrap'>
            {[5000, 10000, 20000, 50000, 100000].map((item, id) => (
              <Button
                key={id}
                onClick={() => setSelectedValue(item)}
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
  )
}

export default WithdrawlView
