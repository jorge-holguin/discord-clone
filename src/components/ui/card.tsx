import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={cn("bg-card p-4 rounded shadow", className)}>{children}</div>;
};
