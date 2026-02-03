import React from 'react'
import Link from 'next/link'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'outline' | 'solid'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'outline',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-mono font-regular
    text-body
    tracking-wide
    transition-all duration-300 ease-in-out
    border-3
    ${fullWidth ? 'w-full' : 'w-full md:w-cta-button'}
    h-cta-button-mobile md:h-cta-button
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variantStyles = {
    outline: `
      bg-transparent
      border-primary
      text-primary
      hover:bg-primary
      hover:text-text-light
      disabled:hover:bg-transparent
      disabled:hover:text-primary
    `,
    solid: `
      bg-primary
      border-primary
      text-text-light
      hover:bg-transparent
      hover:text-primary
      disabled:hover:bg-primary
      disabled:hover:text-text-light
    `,
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

  // If href is provided, render as Link
  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    )
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  )
}
