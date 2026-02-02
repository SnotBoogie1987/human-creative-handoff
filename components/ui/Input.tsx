import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-2 text-sm font-regular text-light-text"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-4
            bg-transparent
            border-3 ${error ? 'border-red-500' : 'border-lime-green'}
            text-light-text
            font-mono font-regular
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-lime-green'}
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            rounded
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 font-mono">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400 font-mono">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-2 text-sm font-regular text-light-text"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={4}
          className={`
            w-full px-4 py-4
            bg-transparent
            border-3 ${error ? 'border-red-500' : 'border-lime-green'}
            text-light-text
            font-mono font-regular
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-lime-green'}
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            resize-vertical
            rounded
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 font-mono">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400 font-mono">{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
