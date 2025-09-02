import { ClassValue } from "clsx";
import { cn } from "../utils/common";

export default function Badge({
  label,
  variant="outline",
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
  return <span className={cn(`badge badge-${variant}`, className)}>{label}</span>;
}
