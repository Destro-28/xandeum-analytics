type StatCardProps = {
  title: string
  value: React.ReactNode
  footer?: React.ReactNode
}

export function StatCard({ title, value, footer }: StatCardProps) {
  return (
    <div
      className="
        flex h-52.5 w-50 flex-col items-center justify-center
        rounded-2xl
        border border-slate-700/40
        bg-linear-to-b from-slate-900 to-slate-950
        p-5
      "
    >
      <span className="text-sm font-medium text-slate-400">
        {title}
      </span>

      <div className="mt-3 text-[54px] font-bold leading-none">
        {value}
      </div>

      {footer && (
        <div className="mt-3 text-center text-xs font-light text-slate-400">
          {footer}
        </div>
      )}
    </div>
  )
}
