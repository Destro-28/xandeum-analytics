type LogoProps = {
  size?: number
  className?: string
}

export default function XandeumLogo({
  size = 40,
  className,
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100" // ← match your Figma viewBox
      fill="currentColor"
      className={className}
      role="img"
      aria-label="Xandeum Logo"
    >
      {/* PASTE FIGMA PATH(S) HERE */}
      <path d="..." />
    </svg>
  )
}
