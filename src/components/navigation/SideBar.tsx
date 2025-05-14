import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { AlignJustifyIcon, BanknoteArrowDownIcon, CircleUserRoundIcon, DiamondIcon, GemIcon, HeadsetIcon, HouseIcon, ShieldIcon, UserPlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SlotIcon from '../icons/SlotIcon'
import LiveCasinoIcon from '../icons/LiveCasinoIcon'
import FishingIcon from '../icons/FishingIcon'
import TableIcon from '../icons/TableIcon'
import RegisterIcon from '../icons/RegisterIcon'
import LoginIcon from '../icons/LoginIcon'
import LanguageDropdown from '../widgets/LanguageDropdown'
 const SideBar = () => {
  const items = [
    {id:1,name:'Home',icon:<HouseIcon/>,link:'/'},
        {id:2,name:'Join Now',icon:<RegisterIcon className='w-6 h-6' />,link:'/'},
    {id:3,name:'Login',icon:<LoginIcon  className='w-6 h-6' />,link:'/'},
      // {id:4,name:'My Profile',icon:<CircleUserRoundIcon/>,link:'/'},
        {id:5,name:'Cash In / Out',icon:<BanknoteArrowDownIcon/>,link:'/'},
    {id:6,name:'Card Game',icon:<DiamondIcon/>,link:'/'},
    {id:7,name:'Slot',icon:<SlotIcon className='w-6 h-6' />,link:'/'},
    {id:8,name:'Fishing',icon:<FishingIcon className='w-6 h-6'  />,link:'/'},
    {id:9,name:'Live casino',icon:<LiveCasinoIcon className='w-6 h-6' />,link:'/'},
    {id:10,name:'Table',icon:<TableIcon className='w-6 h-6' />,link:'/'},
        {id:14,name:'Bingo',icon:<TableIcon className='w-6 h-6' />,link:'/'},
      {id:12,name:'Promotion',icon:<GemIcon/>,link:'/'},
    {id:13,name:'Contact Us',icon:<HeadsetIcon/>,link:'/'},

  ]
  const navigate = useNavigate();
  const goToLink =(link:string)=>{
    navigate(link);
  }
  return (
    <div>
      <Sheet>
  <SheetTrigger>
    <AlignJustifyIcon/>
  </SheetTrigger>
  <SheetContent >
    <SheetHeader>
      <SheetTitle >
        LOGO
      <div className="my-5">
        <LanguageDropdown/>
      </div>

      </SheetTitle>
      <SheetDescription className=''>
       <div className="flex flex-col space-y-4">
        {items.map((item)=>{
          return <div onClick={()=>goToLink(item.link)} key={item.id} className='flex items-center gap-3'>
            {item.icon}
            <p className='text-[15px] sm:text-base'>{item.name}</p>
          </div>
        })}
        

       </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

    </div>
  )
}

export default SideBar
