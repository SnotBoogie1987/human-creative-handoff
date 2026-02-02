/**
 * Honeypot Field Component
 *
 * A hidden form field used to detect bot submissions.
 * Bots typically fill all fields, while humans won't see or interact with this field.
 *
 * Usage:
 * ```tsx
 * import { HoneypotField } from '@/components/ui/HoneypotField'
 *
 * export function MyForm() {
 *   const [honeypot, setHoneypot] = useState('')
 *
 *   const handleSubmit = async (e) => {
 *     e.preventDefault()
 *     // Pass honeypot value to server action
 *     await submitForm(data, honeypot)
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <HoneypotField value={honeypot} onChange={setHoneypot} />
 *       // Other form fields...
 *     </form>
 *   )
 * }
 * ```
 */

interface HoneypotFieldProps {
  value: string
  onChange: (value: string) => void
  name?: string
}

export function HoneypotField({
  value,
  onChange,
  name = 'website_url',
}: HoneypotFieldProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <label htmlFor={name}>
        Please leave this field empty (spam protection)
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  )
}

/**
 * Hook for managing honeypot state
 *
 * Usage:
 * ```tsx
 * import { useHoneypot } from '@/components/ui/HoneypotField'
 *
 * export function MyForm() {
 *   const { honeypot, setHoneypot, HoneypotInput } = useHoneypot()
 *
 *   return (
 *     <form>
 *       <HoneypotInput />
 *       // Other fields...
 *     </form>
 *   )
 * }
 * ```
 */
export function useHoneypot(name = 'website_url') {
  const [honeypot, setHoneypot] = React.useState('')

  const HoneypotInput = React.useCallback(
    () => <HoneypotField value={honeypot} onChange={setHoneypot} name={name} />,
    [honeypot, name]
  )

  return {
    honeypot,
    setHoneypot,
    HoneypotInput,
  }
}

import React from 'react'
