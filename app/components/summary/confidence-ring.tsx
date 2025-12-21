type ConfidenceRingProps = {
  value: number
}

export function ConfidenceRing({ value }: ConfidenceRingProps) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex h-30 w-30 items-center justify-center">
      <svg className="absolute h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#22c55e"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <span className="text-[40px] font-bold text-slate-900">
        {value}
      </span>
    </div>
  )
}
