import { BellIcon } from 'lucide-react'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

const Notifications = () => {
 const tabItems = [
  {
    value: "tab1",
    label: "Latest News",
    data: [
      { date: "2025-05-20", text: "Version 2.0 is live with new features!" },
      { date: "2025-05-18", text: "Maintenance scheduled for May 22." },
      { date: "2025-05-15", text: "Now supporting mobile login with OTP." },
      { date: "2025-05-12", text: "Dark mode released based on user votes." },
      { date: "2025-05-10", text: "New blog section launched." },
    ],
  },
  {
    value: "tab2",
    label: "Event",
    data: [
      { date: "2025-05-17", text: "Join the Lucky Draw Event now!" },
      { date: "2025-05-10", text: "Eid Festival Tournament announced." },
      { date: "2025-05-05", text: "Mother’s Day Challenge – Win Free Coins!" },
      { date: "2025-04-28", text: "Flash Event: 24h rewards race." },
      { date: "2025-04-20", text: "Daily Spin event extended by 7 days." },
    ],
  },
  {
    value: "tab3",
    label: "Bonus",
    data: [
      { date: "2025-05-16", text: "Weekend Bonus – 20% extra credits!" },
      { date: "2025-05-09", text: "Daily login bonus doubled this week." },
      { date: "2025-05-03", text: "Get 15% bonus on your first top-up." },
      { date: "2025-04-29", text: "Loyalty bonus updated with new tiers." },
      { date: "2025-04-21", text: "Special Ramadan bonus now active." },
    ],
  },
  {
    value: "tab4",
    label: "Referral",
    data: [
      { date: "2025-05-08", text: "Refer a friend and earn 5000 MMK." },
      { date: "2025-05-01", text: "Top referrer of the month wins a prize!" },
      { date: "2025-04-25", text: "New referral leaderboard system launched." },
      { date: "2025-04-15", text: "Invite 3 friends to unlock Gold Badge." },
      { date: "2025-04-10", text: "Referral bonus increased for May." },
    ],
  },
];



  return (
    <div>
      
       <Dialog>
  <DialogTrigger>
    <div className="p-1 rounded-full border-2 border-primary/80" >
              <BellIcon size={20} />
       </div>
  </DialogTrigger>
  <DialogContent className='max-h-[450px] overflow-y-scroll !rounded-2xl'>
    <DialogHeader>
      {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
      <DialogDescription >
         <Tabs defaultValue="tab1" className="w-full">
  <TabsList>
    {tabItems.map((item)=>{
    return  <TabsTrigger className='basis-1/4' value={item.value}>{item.label}</TabsTrigger>
   })}
  </TabsList>
  {tabItems.map((tab) => (
    <TabsContent key={tab.value} value={tab.value}>
      <div className="space-y-4 p-4">
        {tab.data.map((item, index) => (
          <div key={index} className="bg-black border border-primary/20 rounded-md p-3 shadow-sm text-left">
            <p className="text-sm text-primary">{item.date}</p>
            <p className="text-base text-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </TabsContent>
  ))}
</Tabs>

      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Notifications

