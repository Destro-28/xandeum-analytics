"use client";

import { useEffect, useState } from "react";

type Props = {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
};

function getColor(value: number) {
  if (value < 50) return "#E10404";   // Low
  if (value < 75) return "#D9D90E";   // Medium
  return "#22C55E";                   // High
}

export function ConfidenceRing({
  value,
  size = 96,
  strokeWidth = 8,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 850; // 0.85s, snappy

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      // easeOutCubic
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      setProgress(eased * value);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const offset =
    circumference - (progress / 100) * circumference;

  const color = getColor(value);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Center value */}
      <span className="absolute text-lg font-semibold text-slate-200">
        {Math.round(progress)}
      </span>
    </div>
  );
}
