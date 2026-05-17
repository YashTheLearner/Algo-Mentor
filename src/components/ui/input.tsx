import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";