import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group cursor-pointer";

    const variants = {
      default:
        "bg-gradient-to-r from-gold via-amber-500 to-gold text-primary-foreground shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/50 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
      outline:
        "border-2 border-gold/50 bg-transparent text-gold hover:bg-gold/10 hover:border-gold hover:shadow-lg hover:shadow-gold/20 backdrop-blur-sm",
      ghost: "text-gold hover:bg-gold/10 hover:text-gold-dark",
      link: "text-gold underline-offset-4 hover:underline hover:text-gold-dark",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5 text-sm",
      sm: "h-9 rounded-md px-4 text-xs",
      lg: "h-13 rounded-lg px-10 text-base",
      icon: "h-11 w-11",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
