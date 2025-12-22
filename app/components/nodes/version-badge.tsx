type Props = {
  version: string | null;
};

export default function VersionBadge({ version }: Props) {
  return (
    <span
      title={version || "Unknown"}
      className="
        inline-flex max-w-50
        items-center rounded-full
        bg-slate-700/60
        px-3 py-1
        text-xs font-medium
        text-slate-200
        ring-1 ring-inset ring-slate-600
        truncate
      "
    >
      {version || "—"}
    </span>
  );
}
