export function Penguin({ className = "h-10 w-10", scarf = true }: { className?: string; scarf?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="32" cy="36" rx="20" ry="24" fill="var(--navy)" />
      <ellipse cx="32" cy="40" rx="13" ry="17" fill="var(--beige)" />
      <circle cx="26" cy="26" r="2.4" fill="var(--navy)" />
      <circle cx="38" cy="26" r="2.4" fill="var(--navy)" />
      <path d="M29 31 L35 31 L32 35 Z" fill="var(--caramel)" />
      {scarf && <path d="M16 42 Q32 50 48 42 L48 46 Q32 54 16 46 Z" fill="var(--caramel)" />}
      <ellipse cx="24" cy="60" rx="5" ry="2.5" fill="var(--caramel)" />
      <ellipse cx="40" cy="60" rx="5" ry="2.5" fill="var(--caramel)" />
    </svg>
  );
}
