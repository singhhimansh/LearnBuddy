import { ClassValue } from "clsx";
import { cn } from "../utils/common";

export default function Badge({
  label,
  variant="ghost",
  className,
}: {
  label: string;
  variant?:
    | "outline"
    | "ghost"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  className?: ClassValue;
}) {
  const variantStyles = {
    outline: "badge-outline",
    ghost: "badge-ghost",
    primary: "badge-primary",
    secondary: "badge-secondary",
    accent: "badge-accent",
    info: "badge-info",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
  };
  return <span className={cn(`badge badge-soft`, variantStyles[variant] ,className)}>{label}</span>;
}
