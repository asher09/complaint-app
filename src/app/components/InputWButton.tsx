"use client";
import React from "react";


interface ButtonProps {
  //input props
  //buttonprops
  buttonText: string;
  onButtonClick?: () => void;

}

export function Button({ buttonText, onButtonClick }: ButtonProps) {

  return (
    <div>
        <button
            className="bg-[#303030] text-[#a9e084] font-Pretendard font-medium w-full sm:w-auto px-6 sm:px-15 py-3 cursor-pointer rounded-[7px] transition hover:border-1 hover:text-[#303030] hover:bg-[#a9e084]"
            type="button"
            onClick={onButtonClick}
        >{buttonText}</button>  
    </div>
  );
}

interface InputProps {
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input ({ placeholder, onChange }: InputProps) {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                className= "w-full text-white bg-[#202020] border border-[#424647] rounded-[4px]  px-3 py-4 font-poppins text-[14px] focus:outline-none mb-1"
            />
        </div>
    )
}