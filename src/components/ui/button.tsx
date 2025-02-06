import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
/*
TODO:
[]make the button longers so that it takes up the full width of the form
[]change the text size of the button to be bigger and more prominent
*/
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-stone-300",
  {
    variants: {
      variant: {
        default: "text-white bg-pink-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-500 dark:focus:ring-pink-500 ",
        destructive:
          "bg-red-500 text-stone-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90",
        outline:
          "border border-stone-200 bg-pink-300 shadow-sm hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50",
        secondary:
          "bg-stone-100 text-stone-900 shadow-sm hover:bg-stone-100/80 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-800/80",
        ghost: "hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-50",
        link: "text-stone-900 underline-offset-4 hover:underline dark:text-stone-50",
      },
      size: {
        default: "h-9 px-8 py-8",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
