import React from 'react'
import { Button } from '../ui/button'
import SideBar from './SideBar'
import coin from '/images/topNavCoin.svg'
import { CoinsIcon, RotateCwIcon } from 'lucide-react'
const TopNav = () => {
  return (
    <div className='cursor-pointer py-3 px-5 flex justify-between items-center bg-black'>
      <h1 className='text-2xl font-extrabold'>LOGO</h1>
      <div className="flex items-center gap-2 md:gap-4 lg:gap-8">
        <Button className='text-sm text-white font-medium bg-black border border-[#EDCE7E] !px-8'>
        LOGIN
      </Button>
      <Button className='!px-6 text-sm text-black font-medium bg-activeGradient  border border-white'>
        JOIN NOW
      </Button>
      <div className="flex items-center gap-4">
        <img src='https://storage.googleapis.com/ace-my/Material/g02/images/userInfo/avatar.jpg?v=1.18.1' className='w-10 h-10 rounded-full' />
        <div>
          <p className='-mb-2 font-semibold text-lg'>testDev</p>
          <small>ID #93245</small>
        </div>
        <div className='bg-primaryGradient flex items-center gap-3 p-0.5 rounded-lg'>
 <div className="flex items-center gap-2 bg-white rounded-lg py-0.5 px-2">
          <img src={coin} className='w-4 h-4' />
  <div className='w-[100px]'>
            <p className='text-base text-black font-semibold'>0.00</p>
</div>
          <RotateCwIcon  size={18} className='text-secondary' />
        </div>
        <div className="pr-2"><CoinsIcon/></div>
        </div>
       
      </div>
      <SideBar/>
      </div>
    </div>
  )
}

export default TopNav
