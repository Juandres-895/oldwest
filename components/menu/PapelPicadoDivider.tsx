const FLAG_COLORS = ['#E0447B', '#17A2A0', '#F2B705', '#4F9E47', '#E0447B']

export function PapelPicadoDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
    >
      {FLAG_COLORS.map((color, i) => (
        <svg key={i} width="16" height="12" viewBox="0 0 16 12" style={{ opacity: 0.9 }}>
          <path d="M0 0 H16 L8 12 Z" fill={color} />
          <circle cx="8" cy="3.2" r="1.1" fill="rgba(0,0,0,0.25)" />
        </svg>
      ))}
    </div>
  )
}
