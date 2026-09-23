export default function Logo({ size = 36, withWord = true, className = '' }) {
  const uid = `fm${size}`
  return (
    <span className={`brand-logo ${className}`.trim()} style={{ '--logo-size': `${size}px` }}>
      <svg
        className="brand-logo__mark"
        width={size}
        height={size}
        viewBox="0 0 72 72"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-velvet`} x1="12" y1="8" x2="60" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff4d6d" />
            <stop offset="0.4" stopColor="#c41e3a" />
            <stop offset="1" stopColor="#5a0a16" />
          </linearGradient>
          <linearGradient id={`${uid}-gold`} x1="8" y1="60" x2="64" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff1c9" />
            <stop offset="0.45" stopColor="#e8c87a" />
            <stop offset="1" stopColor="#9a7428" />
          </linearGradient>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="40%" r="55%">
            <stop stopColor="#ff2d55" stopOpacity="0.35" />
            <stop offset="1" stopColor="#1a050c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="36" cy="36" r="34" fill={`url(#${uid}-glow)`} />
        <circle cx="36" cy="36" r="31.5" stroke={`url(#${uid}-gold)`} strokeWidth="1.4" />
        <circle cx="36" cy="36" r="27.5" stroke={`url(#${uid}-gold)`} strokeWidth="0.6" opacity="0.55" />
        <path
          d="M36 14c-2.2 4.8-8.5 8.2-8.5 14.2 0 4.6 3.6 7.4 8.5 11.2 4.9-3.8 8.5-6.6 8.5-11.2C44.5 22.2 38.2 18.8 36 14z"
          fill={`url(#${uid}-velvet)`}
        />
        <path
          d="M22 46.5c4.2-3.2 8.8-4.8 14-4.8s9.8 1.6 14 4.8"
          stroke={`url(#${uid}-gold)`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M26.5 42.2c2.8-1.5 6-2.3 9.5-2.3s6.7.8 9.5 2.3"
          stroke={`url(#${uid}-gold)`}
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.7"
          fill="none"
        />
        <circle cx="36" cy="52.5" r="1.6" fill={`url(#${uid}-gold)`} />
      </svg>
      {withWord ? (
        <span className="brand-logo__word" aria-label="FatalMed">
          <span className="brand-logo__fatal">Fatal</span>
          <span className="brand-logo__med">Med</span>
        </span>
      ) : null}
    </span>
  )
}
