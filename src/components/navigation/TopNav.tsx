import React from 'react'
import { Button } from '../ui/button'
import SideBar from './SideBar'

const TopNav = () => {
  return (
    <div className='py-3 px-5 flex justify-between items-center bg-primary-radial bg-primary-radial-alt'>
      <h1 className='text-2xl font-extrabold'>LOGO</h1>
      <div className="flex items-center gap-2 md:gap-4 lg:gap-8">
        <Button>
        LOGIN
      </Button>
      <Button className='bg-secondary-gradient border-secondaryGradient'>
        JOIN NOW
      </Button>
      <SideBar/>
      </div>
    </div>
  )
}

export default TopNav
