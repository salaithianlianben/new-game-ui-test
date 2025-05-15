import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent } from "../../components/ui/dialog";
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

const Ads = () => {
    const [showDialog,setShowDialog]=useState(true);
  const onCloseDialog = ()=>{
    return setShowDialog(false);
   }
   const [selected,setSelected]=useState(0);
   const imgs = [
    "https://file.32828a.com/images/BOSSIBET_MMK/9b04f8c247eb18f7db140ded45c13085_4494634.jpg",
    "https://file.32828a.com/images/BOSSIBET_MMK/55b1f2193a4e242ba279ea4bd84b3120_5619476.jpg","https://file.32828a.com/images/BOSSIBET_MMK/ab7a485ebe75b6dd7243ad719f23c7de_4173976.jpg"
   ]
  return (
    <Dialog  open={showDialog} onOpenChange={onCloseDialog}>
        <DialogContent className="p-8">
          
            <img
              src={imgs[selected]}
              className="h-[220px] w-full object-cover"
            />
            <div className="cursor-pointer flex items-center gap-2 w-[300px] justify-center mx-auto">
                {[1,2,3].map((_,index)=>{
                    return <div className={`basis-1/3 h-2  rounded-md ${selected===index ? 'bg-primaryGradient' : 'bg-gray-600'}`}  key={index} onClick={()=>setSelected(index)}>

                    </div>
                })}
            </div>
            <DialogClose className='w-full'>
                <Button className='w-full'>
              OK
            </Button>
            </DialogClose>
             <div className="flex justify-center items-center gap-3">
                <Checkbox/>
            <p>Close Today</p>
         </div>
         </DialogContent>
       </Dialog>
  )
}

export default Ads
