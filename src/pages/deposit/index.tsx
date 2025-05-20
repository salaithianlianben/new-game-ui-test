import React, { useState } from 'react'
import kbzpay from '../../../public/images/kbzP.png'
import kbzB from '../../../public/images/kbzB.png'
import ayaBank from '../../../public/images/ayaBank.png'
import cbB from '../../../public/images/cb.png'
import cbPay from '../../../public/images/cbPay.png'
import wave from '../../../public/images/wave.png'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

const DepositView = () => {
  const banks = [
    {id:1,img:kbzpay,name:'User ABC',phone:'0912345689'},
        {id:2,img:kbzB,name:'User ABC',phone:'0912345689'},
 {id:3,img:ayaBank,name:'User ABC',phone:'0912345689'},
        {id:4,img:cbB,name:'User ABC',phone:'0912345689'}, 
        {id:5,img:cbPay,name:'User ABC',phone:'0912345689'},
        {id:6,img:wave,name:'User ABC',phone:'0912345689'},
  ]
  const [selectedValue,setSelectedValue]=useState<number|null>(null);
return (
    <div className='!bg-primary/10 px-10 pt-10 pb-32 h-full overflow-y-scroll'>
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
        <p className='basis-full sm:basis-1/5'>Deposit To</p>
        <div className="flex flex-wrap gap-4 basis-full sm:basis-4/5 ">
          {banks.map((item)=>{
            return <img key={item.id} src={item.img} className='w-[80px] h-[70px] rounded-2xl object-contain ' />
          })}
        </div>
      </div>
      <div className="my-8 flex flex-wrap sm:flex-nowrap items-center gap-4">
        <p className=' basis-full sm:basis-1/5'>Bank Account *</p>
        <div className="space-y-1">
         <p>DAW YIN HLA (KP11)</p>
         <p>09444746800</p>
        </div>
      </div>
       <div className="my-8 flex flex-wrap sm:flex-nowrap gap-4">
        <p className='basis-full sm:basis-1/5'>Amount *</p>
        <div className='basis-full sm:basis-4/5'>
          <Input value={selectedValue!} 
          onChange={(e)=>setSelectedValue(Number(e.target.value))}
           className='w-full bg-primary/10 border border-primary' placeholder='Minimum: 5000/ Maximum : 5000000' />
          <p className='font-semibold text-lg my-6'>! Min/Max Limit: 50 / 50000</p>
          <div className="flex items-center gap-4 flex-wrap">
            {[5000,10000,20000,50000,100000].map((item,id)=>{
              return <Button onClick={()=>setSelectedValue(item)} key={id} className='!font-normal text-sm h-max rounded-md py-2 px-4 bg-primary/10 border border-primary'>
                {item}
              </Button>
            })}
          </div>
        </div>
      </div>
        <div className="my-8 flex flex-wrap sm:flex-nowrap items-center gap-4">
        <p className=' basis-full sm:basis-1/5'>Receipt *</p>
        <div className="space-y-1  basis-full sm:basis-4/5">
            <Input className="!w-full bg-primary/10 border border-primary !text-white !placeholder-white file:text-white file:bg-transparent file:border-0 file:cursor-pointer"
    type='file' />
        </div>
      </div>
      <Button className='flex items-center justify-center py-1 px-8 text-base text-black mx-auto'>Submit</Button>
    </div>
  )
}

export default DepositView
