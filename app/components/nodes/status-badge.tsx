export default function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "active"
      ? "bg-green-500/10 text-green-400"
      : "bg-slate-500/10 text-slate-400";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}
