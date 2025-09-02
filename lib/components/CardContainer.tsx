import { cn } from "../utils/common";

export default function CardContainer({ children ,className}: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("card w-full bg-base-200 shadow-sm ",className)}>
      <div className="card-body">{children}</div>
    </div>
  );
}
