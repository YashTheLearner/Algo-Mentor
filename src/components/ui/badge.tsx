import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "success" | "warning" | "error";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const variants = {
  default: "bg-primary/15 text-primary border border-primary/30",
  success: "bg-success/15 text-success border border-success/30",
  warning: "bg-warning/15 text-warning border border-warning/30",
  error: "bg-error/15 text-error border border-error/30",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}