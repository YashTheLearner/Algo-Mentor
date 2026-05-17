import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-hover border border-primary",

  secondary:
    "bg-panel text-foreground border border-border hover:bg-surface",

  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface",

  ghost:
    "bg-transparent text-muted hover:bg-surface hover:text-foreground",
};

const sizes = {
  sm: "h-9 px-3 text-sm rounded-md",
  md: "h-11 px-4 text-sm rounded-md",
  lg: "h-12 px-5 text-base rounded-lg",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}