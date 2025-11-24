import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    success: 'bg-lime-green/10 text-lime-green border-lime-green',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500',
    info: 'bg-blue-500/10 text-blue-500 border-blue-500',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-mono font-bold border rounded-full',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
