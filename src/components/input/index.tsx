import { Eye, EyeSlash } from "iconsax-react";
import React from "react";

interface InputProps {
  textLabel: string;
  placeholder: string;
  hasEye: boolean;
  value: string;
  checkPass:boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({
  textLabel,
  placeholder,
  hasEye,
  checkPass,
  value,
  setValue,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className=" w-[280px] sm:w-[420px]  relative flex items-start flex-col">
      <label className="text-[14px] font-medium">{textLabel}</label>
      <input
        type={showPassword ? "password" : "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={ `w-full py-3 px-4 outline-none border ${checkPass ? 'border-red-500' : 'border-[#E5E7EB]'} rounded-lg`}
      />
      {hasEye && (
        <p className="text-[14px] font-medium text-[#C2C2C2]">
          Must be 8 characters long, Uppercase inclusive
        </p>
      )}
      {hasEye &&
        (showPassword ? (
          <Eye
            size="24"
            color="#464F54"
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <EyeSlash
            size="24"
            color="#464F54"
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        ))}
    </div>
  );
};

export default Input;
