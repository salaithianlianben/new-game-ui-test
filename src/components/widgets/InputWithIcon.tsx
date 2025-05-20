// import React, { ReactNode } from "react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";

// interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   icon?: ReactNode;
//   label?: string;
//   id?: string;
// }

// export const InputWithIcon: React.FC<InputWithIconProps> = ({
//   icon,
//   label = "Label",
//   id = "input",
//   type = "text",
//   placeholder = "",
//   ...props
// }) => {
//   return (
//     <div className="grid w-full max-w-sm items-center gap-1.5">
//       <Label htmlFor={id}>{label}</Label>
//       <div className="flex flex-row items-center w-full rounded-full bg-primary/50">
//         {icon && (
//           <div className="bg-blue-200 px-2 rounded-l-full h-full">
//             {icon}
//           </div>
//         )}
//         <Input
//           id={id}
//           type={type}
//           placeholder={placeholder}
//           className={`bg-primary/50 !rounded-[0px]`}
//           {...props}
//         />
//       </div>
//     </div>
//   );
// };

import React, { ReactNode } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
  id?: string;
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  label,
  id = "input",
  type = "text",
  placeholder = "",
  ...props
}) => {
  return (
    <div className="grid w-full items-start gap-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="flex items-center w-full rounded-md bg-gray-200 text-black overflow-hidden h-10">
        {icon && (
          <div className="flex items-center text-gray-800 justify-center px-3 bg-primaryGradient h-full">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-full"
          {...props}
        />
      </div>
    </div>
  );
};
