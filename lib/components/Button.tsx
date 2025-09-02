"use client";
import { ButtonHTMLAttributes } from "react";
import { applyStyles, cn } from "../utils/common";
import { ClassValue } from "clsx";

const baseStyles = {
  button: "btn btn-xs sm:btn-sm md:btn-md rounded-lg",
  label: "",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  label?: string;
  variant?: "primary" | "outline" | "neutral";
  sx?: Partial<Record<keyof typeof baseStyles, ClassValue>>;
};

export default function Button({
  className,
  isLoading,
  label,
  onClick,
  variant = "primary",
  disabled,
  sx = {},
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "btn-primary",
    outline: "btn-outline",
    neutral: "btn-link",
  };
  const styles = applyStyles(baseStyles)({
    ...sx,
    button: cn(sx.button, variantStyles[variant]),
  });

  return (
    <button
      className={styles.button}
      {...props}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}
      {<span className={styles.label}>{label}</span>}
    </button>
  );
}
