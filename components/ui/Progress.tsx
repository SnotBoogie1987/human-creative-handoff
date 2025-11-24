import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number // 0-100
  label?: string
  className?: string
}

export function Progress({ value, label, className }: ProgressProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-mono text-white">{label}</span>
          <span className="text-sm font-mono text-gray-400">{clampedValue}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-lime-green transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
