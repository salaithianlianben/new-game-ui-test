// import React from 'react';
// import { Outlet, Link, useLocation } from 'react-router-dom';
// import {
//     CreditCard,
//     ArrowDownCircle,
//     ArrowUpCircle,
//     Repeat,
//     Clock,
//     User,
//     Banknote,
//     Lock,
// } from 'lucide-react';

// const navItems = [
//     { title: 'Deposit', link: '/deposit', icon: <ArrowDownCircle size={20} /> },
//     { title: 'Withdrawal', link: '/withdrawl', icon: <ArrowUpCircle size={20} /> },
//     { title: 'Transfer', link: '/transfer', icon: <Repeat size={20} /> },
//     { title: 'History', link: '/history', icon: <Clock size={20} /> },
//     { title: 'Profile', link: '/profile', icon: <User size={20} /> },
//     { title: 'Banking Detail', link: '/banking-details', icon: <Banknote size={20} /> },
//     { title: 'Change Password', link: '/change-password', icon: <Lock size={20} /> },
// ];

// const AccountLayout = () => {
//     const location = useLocation();



//     return (
//         <div className="flex  items-stretch fixed top-[4rem] lg:top-[6.6rem] left-0 right-0 bottom-0">
//             <div className="hidden lg:flex basis-1/5 bg-black overflow-y-scroll  flex-col py-6">
//                 {navItems.map(({ title, link, icon }) => {
//                     const isActive = location.pathname === '/account' + link;
//                     return (
//                         <Link
//                             to={'/account' + link}
//                             key={title}
//                             className="px-2 xl:px-6 py-2 cursor-pointer"
//                         >
//                             <p
//                                 className={`flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-200
//             ${isActive
//                                         ? 'bg-primary/10 font-semibold text-primary'
//                                         : 'text-white hover:bg-primary/10 hover:text-primary'
//                                     }
//           `}
//                             >
//                                 <span>{icon}</span>
//                                 <span>{title}</span>
//                             </p>
//                         </Link>
//                     );
//                 })}
//             </div>


//             <div className="basis-full lg:basis-4/5  h-screen bg-transparent overflow-y-scroll  ">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default AccountLayout;

import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
  Clock,
  User,
  Banknote,
  Lock,
} from 'lucide-react';

const navItems = [
  { title: 'Deposit', link: '/deposit', icon: <ArrowDownCircle size={20} /> },
  { title: 'Withdrawal', link: '/withdrawl', icon: <ArrowUpCircle size={20} /> },
  { title: 'Transfer', link: '/transfer', icon: <Repeat size={20} /> },
  { title: 'History', link: '/history', icon: <Clock size={20} /> },
  { title: 'Profile', link: '/profile', icon: <User size={20} /> },
  { title: 'Banking Detail', link: '/banking-details', icon: <Banknote size={20} /> },
  { title: 'Change Password', link: '/change-password', icon: <Lock size={20} /> },
];

const AccountLayout = () => {
  const location = useLocation();

  return (
    <div className="flex items-stretch fixed top-[4rem] lg:top-[6.6rem] left-0 right-0 bottom-0">
      {/* Sidebar */}
      <div className="hidden lg:flex basis-1/5 bg-black overflow-y-scroll flex-col py-6">
        {navItems.map(({ title, link, icon }) => {
          const fullPath = '/account' + link;
          const isActive = location.pathname === fullPath;

          return (
            <Link
              to={fullPath}
              key={title}
              className="px-2 xl:px-6 py-2 cursor-pointer"
            >
              <p
                className={`flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-200
                  ${isActive
                    ? 'bg-primary/10 border border-primary  text-primary'
                    : 'text-white hover:bg-primary/10 hover:text-primary'}
                `}
              >
                <span>{icon}</span>
                <span>{title}</span>
              </p>
            </Link>
          );
        })}
      </div>

      {/* Content area */}
      <div className="basis-full lg:basis-4/5 h-screen bg-transparent overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
