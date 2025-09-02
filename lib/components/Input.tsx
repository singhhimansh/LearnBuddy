"use client";

import { InputHTMLAttributes } from "react";
import { applyStyles, cn } from "../utils/common";
import { ClassValue } from "clsx";

const baseStyles = {
  label: "floating-label",
  input: "input",
};


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  placeholder: string;
  floatingLabel?: boolean;
  className?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: React.ReactNode | string;
  sx?: Partial<Record<keyof typeof baseStyles, ClassValue>>;
}

// handle adornment later
// addormet => label=> input, input=> grow
// floating=> label=>  floating-label , input=> input

export default function Input({
  label,
  type,
  placeholder,
  startAdornment,
  endAdornment,
  floatingLabel=true,
  sx,
  ...props
}: InputProps) {
  const styles = applyStyles(baseStyles)(sx);
  return (
    <label className={styles.label}>
      {startAdornment}

      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
      {endAdornment}
    </label>
  );
}
