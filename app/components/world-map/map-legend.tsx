"use client";

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}

export default function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 rounded-lg bg-slate-800/90 p-3 text-xs text-slate-200 backdrop-blur">
      <div className="mb-1 font-medium">Confidence Tier</div>

      <div className="space-y-1">
        <LegendItem color="#22C55E" label="High" />
        <LegendItem color="#F59E0B" label="Medium" />
        <LegendItem color="#EF4444" label="Low" />
        <LegendItem color="#9CA3AF" label="Inactive" />
      </div>
    </div>
  );
}
