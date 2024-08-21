import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Arrow from "../../../public/icons/arrow.svg";

import { cn } from "@/lib/utils/helpers";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-lp-400 text-primary-foreground hover:bg-lp-300",
        outline:
          "border border-indigo-400 bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-neutral-700 text-secondary-foreground hover:bg-neutral-600",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 rounded-md px-4 py-2",
        fit: "h-fit w-fit rounded-md p-0.5 px-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-15 rounded-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: boolean;
  reverse?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, children, reverse, ...props }, ref) => {
    return (
      <button
        className={`${cn(buttonVariants({ variant, size, className }))}`}
        ref={ref}
        {...props}
      >
        {icon && reverse && (
          <div className="pr-2">
            <Arrow width={16} height={16} transform={"rotate(180)"} />
          </div>
        )}
        {children}
        {icon && !reverse && (
          <div className="pl-2">
            <Arrow width={16} height={16} />
          </div>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
