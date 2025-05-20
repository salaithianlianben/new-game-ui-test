// import React from 'react'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

// const language_options = [
//   {
//     icon: "my-icon.png",
//     label: "Myanmar",
//     value: "my",
//   },
//   {
//     icon: "en-icon.png",
//     label: "English",
//     value: "en",
//   },
//   {
//     icon: "th-icon.png",
//     label: "Thailand",
//     value: "th",
//   },
//   {
//     icon: "zh-icon.png",
//     label: "Chinese",
//     value: "zh",
//   },
// ] ;

// const LanguageDropdown = () => {
//   return (
//      <DropdownMenu >
//               <DropdownMenuTrigger asChild>
//                 <img
//                   alt="myanmar"
//                   src={`/icons/my-icon.png`}
//                   className="h-5 w-6 rounded-full object-cover"
//                 />
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="ml-28 md:ml-48 mt-2 w-56 bg-secondary">
//                 <DropdownMenuGroup>
//                   {language_options.map((lang, idx) => (
//                     <DropdownMenuItem
//                       key={idx}
//                       className="hover:bg-black"
//                     //   onClick={() => onSelectLanguage(lang.value)}
//                     >
//                       <div className="flex flex-row justify-between w-full">
//                         <span>{lang.label}</span>
//                         <img
//                           alt={lang.value}
//                           src={`/icons/${lang.icon}`}
//                           className="h-5 w-6"
//                         />
//                       </div>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//   )
// }

// export default LanguageDropdown


import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '../ui/dropdown-menu';

const language_options = [
  {
    icon: 'my-icon.png',
    label: 'Myanmar',
    value: 'my',
  },
  {
    icon: 'en-icon.png',
    label: 'English',
    value: 'en',
  },
  {
    icon: 'th-icon.png',
    label: 'Thailand',
    value: 'th',
  },
  {
    icon: 'zh-icon.png',
    label: 'Chinese',
    value: 'zh',
  },
];

const LanguageDropdown = () => {
  // Track selected language locally for UI update
  const [selectedLang, setSelectedLang] = useState(language_options[0]);

  const onSelectLanguage = (value: string) => {
    const selected = language_options.find((lang) => lang.value === value);
    if (selected) {
      setSelectedLang(selected);
      // Add any language switching logic here
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-1 hover:bg-primary/10 transition-colors">
          <img
            alt={selectedLang.value}
            src={`/icons/${selectedLang.icon}`}
            className="h-5 w-6 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-primary">{selectedLang.label}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-secondary p-1 shadow-md border border-primary/20">
        <DropdownMenuGroup className='space-y-0.5'>
          {language_options.map((lang) => (
            <DropdownMenuItem
              key={lang.value}
              className={`flex items-center justify-between rounded-sm px-3 py-1.5 text-sm cursor-pointer
                hover:bg-primary/10
                ${selectedLang.value === lang.value ? 'bg-primary/10  text-primary' : 'text-white'}
              `}
              onClick={() => onSelectLanguage(lang.value)}
            >
              <span>{lang.label}</span>
              <img
                alt={lang.value}
                src={`/icons/${lang.icon}`}
                className="h-5 w-6 rounded-full object-cover"
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
