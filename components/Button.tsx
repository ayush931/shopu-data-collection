import React from "react";

type ButtonProps = {
  children?: React.ReactNode,
  onClick?: () => void,
  className?: string,
  type?: "submit" | "reset" | "button"
}

function Button({ children, onClick, className, type }: ButtonProps) {
  return (
    <button type={type} className={`py-2 rounded-md w-full transition text-white font-[500] ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;