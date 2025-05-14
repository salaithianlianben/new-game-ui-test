import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const language_options = [
  {
    icon: "my-icon.png",
    label: "Myanmar",
    value: "my",
  },
  {
    icon: "en-icon.png",
    label: "English",
    value: "en",
  },
  {
    icon: "th-icon.png",
    label: "Thailand",
    value: "th",
  },
  {
    icon: "zh-icon.png",
    label: "Chinese",
    value: "zh",
  },
] ;

const LanguageDropdown = () => {
  return (
     <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <img
                  alt="myanmar"
                  src={`/icons/my-icon.png`}
                  className="h-5 w-6 rounded-full object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-28 md:ml-48 mt-2 w-56 bg-secondary">
                <DropdownMenuGroup>
                  {language_options.map((lang, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      className="hover:bg-black"
                    //   onClick={() => onSelectLanguage(lang.value)}
                    >
                      <div className="flex flex-row justify-between w-full">
                        <span>{lang.label}</span>
                        <img
                          alt={lang.value}
                          src={`/icons/${lang.icon}`}
                          className="h-5 w-6"
                        />
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
  )
}

export default LanguageDropdown
