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
    text-lg md:text-xl
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
      border-lime-green
      text-lime-green
      hover:bg-lime-green
      hover:text-dark-text
      disabled:hover:bg-transparent
      disabled:hover:text-lime-green
    `,
    solid: `
      bg-lime-green
      border-lime-green
      text-dark-text
      hover:bg-transparent
      hover:text-lime-green
      disabled:hover:bg-lime-green
      disabled:hover:text-dark-text
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
