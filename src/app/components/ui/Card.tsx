import { ReactNode } from "react";
import clsx from "clsx"; // optional helper for conditional classes

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={clsx("bg-white shadow rounded-lg", className)}>
      {children}
    </div>
  );
}
