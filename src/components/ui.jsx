import React, { useEffect, useState } from 'react'

/* ---------- icons ---------- */
const PATHS = {
  check: <polyline points="5 13 9.5 17.5 19 7" />,
  alert: <><path d="M12 8v5" /><circle cx="12" cy="17" r="1" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="8" r="1" /></>,
  shield: <path d="M12 3l7 3v6c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z" />,
  camera: <><rect x="2.5" y="6.5" width="13" height="11" rx="2.2" /><circle cx="9" cy="12" r="3" /><path d="M15.5 10.5L21 8v8l-5.5-2.5" /></>,
  image: <><rect x="3" y="4.5" width="18" height="15" rx="2.2" /><circle cx="8.5" cy="10" r="1.6" /><path d="M3.5 17l5-3.4 3.6 2 3.6-2.6 4.8 3.6" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M2.8 20c0-3.4 2.8-5.4 6.2-5.4s6.2 2 6.2 5.4" /><path d="M16.4 5.2a3.2 3.2 0 010 5.8M18 14.8c2 .7 3.4 2.4 3.4 5.2" /></>,
  doc: <><path d="M6 3h7l5 5v13H6z" /><path d="M13 3v5h5" /><path d="M9 13h6M9 17h4" /></>,
  home: <><path d="M3 10.5L12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5" /></>,
  refresh: <><path d="M3.5 12a8.5 8.5 0 102.6-6.1" /><path d="M3.5 4.5v5h5" /></>,
  wifiOff: <><path d="M2 2l20 20" /><path d="M8.5 15.5a5 5 0 017 0" /><path d="M5 12a10 10 0 013.5-2.4" /><path d="M19 12a10 10 0 00-3.5-2.4" /><path d="M2 8.8A15 15 0 016 6.4" /><circle cx="12" cy="19" r="1" /></>,
  spark: <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.2" /><path d="M8 10.5V7.5a4 4 0 018 0v3" /></>,
  close: <><path d="M6 6l12 12M18 6L6 18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></>,
  sparkle: <><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z" /><path d="M18.5 15.5l.7 1.9 1.8.6-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.6z" /></>,
  chev: <path d="M15 5.5L8.5 12l6.5 6.5" />,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.6" /></>
}

export function Icon({ name, size = 16, stroke = 1.8, className = '', style }) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  )
}

/* ---------- button ---------- */
export function Btn({ variant = 'primary', size = '', className = '', children, ...rest }) {
  const v = { primary: 'btn-primary', soft: 'btn-soft', ghost: 'btn-ghost', danger: 'btn-danger' }[variant]
  return (
    <button className={`btn ${v} ${size ? 'btn-' + size : ''} ${className}`} {...rest}>
      {children}
    </button>
  )
}

/* ---------- badge ---------- */
export function Badge({ tone = '', children }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

/* ---------- card ---------- */
export function Card({ children, className = '', style }) {
  return (
    <section className={`card ${className}`} style={style}>
      {children}
    </section>
  )
}

export function CardHead({ title, sub, aside }) {
  return (
    <header className="card-head">
      <div>
        <h2 className="card-title">{title}</h2>
        {sub && <p className="card-sub">{sub}</p>}
      </div>
      {aside}
    </header>
  )
}

/* ---------- animated dial ---------- */
export function Dial({ value, tone = '#12784e', label = 'درجة الثقة' }) {
  const R = 54
  const C = 2 * Math.PI * R
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setShown(value), 80)
    return () => clearTimeout(t)
  }, [value])
  return (
    <div className="dial">
      <svg width="190" height="190" viewBox="0 0 140 140" aria-hidden="true">
        <circle cx="70" cy="70" r={R} fill="none" stroke="#eef4f0" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={R}
          fill="none"
          stroke={tone}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(C * shown) / 100} ${C}`}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dasharray .95s cubic-bezier(.22,.8,.24,1)' }}
        />
      </svg>
      <div className="dial-center">
        <b className="num" style={{ color: tone }}>{value}%</b>
        <span>{label}</span>
      </div>
    </div>
  )
}

/* ---------- portrait ---------- */
export function Portrait({ src, alt = 'صورة المتقدم' }) {
  return <img className="portrait" src={src} alt={alt} />
}

/* ---------- field ---------- */
export function Field({ k, v }) {
  return (
    <div className="field">
      <div>
        <div className="k">{k}</div>
        <div className="v">{v}</div>
      </div>
      <span className="ok"><Icon name="check" size={11} stroke={3} /></span>
    </div>
  )
}
