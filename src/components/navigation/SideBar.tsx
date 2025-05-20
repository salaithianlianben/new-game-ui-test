
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import {
  AlignJustifyIcon,
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
  Clock,
  Banknote,
  Lock,
  User,
  LayoutGridIcon,
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import LanguageDropdown from '../widgets/LanguageDropdown'
import { Button } from '../ui/button'

const SideBar = () => {
  const items = [
    { id: 1, name: 'Home', icon: <LayoutGridIcon size={20} />, link: '/' },
    { id: 2, name: 'Deposit', icon: <ArrowDownCircle size={20} />, link: '/account/deposit' },
    { id: 3, name: 'Withdrawal', icon: <ArrowUpCircle size={20} />, link: '/account/withdrawl' },
    { id: 4, name: 'Transfer', icon: <Repeat size={20} />, link: '/account/transfer' },
    { id: 5, name: 'History', icon: <Clock size={20} />, link: '/account/history' },
    { id: 6, name: 'Profile', icon: <User size={20} />, link: '/account/profile' },
    { id: 7, name: 'Banking Detail', icon: <Banknote size={20} />, link: '/account/banking-details' },
    { id: 8, name: 'Change Password', icon: <Lock size={20} />, link: '/account/change-password' },
  ]

  const navigate = useNavigate()
  const location = useLocation()

  const goToLink = (link: string) => {
    navigate(link)
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger className="bg-primaryGradient text-black p-1.5 rounded-md">
          <AlignJustifyIcon size={28} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              LOGO
              <div className="mt-5">
                <LanguageDropdown />
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className="flex flex-col space-y-2 cursor-pointer">
                {items.map((item) => {
                  const isActive = location.pathname === item.link
                  return (
                    <div
                      onClick={() => goToLink(item.link)}
                      key={item.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-primary/10 border border-primary'
                          : 'hover:bg-primary/10'
                      }`}
                    >
                      {item.icon}
                      <p className="text-[15px] sm:text-base">{item.name}</p>
                    </div>
                  )
                })}
                <Button className=" !mt-8 !px-6 text-base text-black font-bold bg-primaryGradient border border-primaryGradient rounded-full">
                  Logout
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SideBar
