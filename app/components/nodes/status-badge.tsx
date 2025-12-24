"use client";

type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const normalized = status.toLowerCase();

  const styles =
    normalized === "active"
      ? "bg-green-600/20 text-green-400 border-green-600/30"
      : normalized === "stale"
      ? "bg-red-600/20 text-red-400 border-red-600/30"
      : "bg-slate-600/20 text-slate-400 border-slate-600/30";

  return (
    <span
      className={`
        inline-flex items-center rounded-full
        border px-3 py-0.5
        text-xs font-medium capitalize
        ${styles}
      `}
    >
      {status}
    </span>
  );
}
