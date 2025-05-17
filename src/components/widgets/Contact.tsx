import React from 'react'
import contact from '/images/contact.svg';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import fb from '/images/fb.svg';
import viber from '/images/viber.svg';
import tele from '/images/tele.svg';
import line from '/images/line.svg';
import { Button } from '../ui/button';
import gmail from '/images/gmail.svg';
import phone from '/images/phone.png';
import livechat from '/images/livechat.png';

const Contact = () => {
  const socials = [
    { id: 1, img: fb, link: '/' }, { id: 2, img: viber, link: '/' },
    { id: 3, img: tele, link: '/' },
    { id: 4, img: line, link: '/' },

  ]
  return (
    <Dialog>
      <DialogTrigger>
        <div className='z-20 bg-blueGradient p-2 rounded-[13px] tex-center w-max fixed bottom-4 left-4 '>
          <img src={contact} className='w-8 h-8' />
        </div>
      </DialogTrigger>
      <DialogContent className='p-0 '>
        <DialogHeader >
          <DialogTitle className='!rounded-t-2xl p-4 text-center !bg-greenGradient !text-white' >ကျွန်ုပ်တို့ကိုမည်သို့ဆက်သွယ်ချင်သလဲ</DialogTitle>
          <DialogDescription className='bg-[#F0F0ED] !rounded-b-2xl p-4'>
            <div className='bg-white rounded-lg p-2 flex items-center justify-evenly'>
              {socials.map((item) => {
                return <div className='p-2 rounded-md' key={item.id}>
                  <img src={item.img} className='cursor-pointer w-[40px] h-[40px]' />
                </div>
              })}
            </div>
            <div className="my-4 bg-white rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img src={gmail} className='cursor-pointer w-[40px] h-[40px]' />
                <h1 className='font-semibold text-black'>v64011179@gmail.com</h1>
              </div>
              <Button className='text-sm font-medium h-max py-0.5 rounded-sm'>
                Copy
              </Button>
            </div>
            <div className="my-4 bg-white rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img src={livechat} className='cursor-pointer w-[40px] h-[40px]' />
                <h1 className='font-semibold text-black'>Live Chat</h1>
              </div>

            </div>
            <div className="my-4 bg-white rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img src={phone} className='cursor-pointer w-[40px] h-[40px]' />
                <h1 className='font-semibold text-black'>Phone</h1>
              </div>
              <h1 className='font-semibold !text-black'>09123456890</h1>
            </div>

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Contact
