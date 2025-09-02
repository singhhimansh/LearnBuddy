"use client";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  label?: string;
};

export default function Button({
  className,
  isLoading,
  label,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button className="btn btn-xs sm:btn-sm md:btn-md rounded-lg" {...props}
    disabled={isLoading}
    onClick={onClick}
    >
      {isLoading && <span className="loading loading-spinner loading-sm"></span>}
      {label}
    </button>
  );
}
