export function Logo() {
  return (
    <span className="flex items-center gap-2 text-ink">
      <svg viewBox="0 0 32 32" className="size-7 text-accent" aria-hidden="true">
        <circle cx="16" cy="16" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.25" />
        <polyline
          points="3.5,17 10,17 13,10.5 17.5,22 20.5,14.5 28.5,14.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-semibold tracking-tight">CoinPulse</span>
    </span>
  )
}
