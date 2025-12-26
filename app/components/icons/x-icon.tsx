type XIconProps = {
  size?: number
  className?: string
}

export default function XIcon({
  size = 20,
  className,
}: XIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2H21.553L14.392 10.163L22.845 22H16.207L11.02 14.787L4.78 22H1.47L9.13 13.237L1.021 2H7.829L12.513 8.607L18.244 2ZM17.086 20.035H18.92L6.836 3.902H4.87L17.086 20.035Z" />
    </svg>
  )
}
