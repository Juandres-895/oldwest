'use client'

import { forwardRef } from 'react'
import { buttonVariants, type ButtonVariant } from './buttonStyles'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, isLoading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants(variant, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
