

import { Eye, EyeOff } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type PasswordToggleProps={
    isEyeOpen:boolean,
    setIsEyeOpen:Dispatch<SetStateAction<boolean>>

}

function PasswordToggle({isEyeOpen, setIsEyeOpen}:PasswordToggleProps) {
  return (
    <span
      onClick={() => setIsEyeOpen(!isEyeOpen)}
      className="absolute inline-block right-[8px] cursor-pointer top-[33px]"
    >
      {isEyeOpen ? (
        <Eye className="inline-block" />
      ) : (
        <EyeOff className="inline-block" />
      )}
    </span>
  );
}

export default PasswordToggle;
