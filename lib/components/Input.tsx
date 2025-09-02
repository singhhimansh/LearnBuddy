"use client";

import { InputHTMLAttributes } from "react";
import { applyStyles, cn } from "../utils/common";
import { ClassValue } from "clsx";

const baseStyles = {
  label: "floating-label",
  input: "input w-full",
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
  required,
  floatingLabel = true,
  sx,
  error,
  ...props
}: InputProps) {
  const styles = applyStyles(baseStyles)(sx);
  return (
    <div className="flex flex-col justify-start">
      <label className={styles.label}>
        {startAdornment}

        <span>{label}{ required ? " *" : ""}</span>
        <input
          type={type}
          placeholder={placeholder + (required ? " *" : "")}
          required={required}
          className={styles.input}
          {...props}
        />
        {endAdornment}
      </label>
      {error && <p className="pl-3 mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
