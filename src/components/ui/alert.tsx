import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AlertProps {
  children: ReactNode;
  className?: string;
}

export const Alert = ({ children, className }: AlertProps) => {
  return <div className={cn("p-4 bg-destructive text-destructive-foreground rounded", className)}>{children}</div>;
};
