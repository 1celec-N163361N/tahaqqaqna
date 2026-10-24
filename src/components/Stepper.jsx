import React from 'react'
import { STEPS, THRESHOLD, WEIGHTS, WMAX } from '../data'
import { Icon } from './ui'
import brandLogo from '../assets/logo.png'

export function BrandMark({ size = 26 }) {
  return <img className="brand-logo" src={brandLogo} alt="شعار تحققنا" style={{ height: size }} />
}

export default function Rail({ current, evidence, view, onReview }) {
  const raw = WEIGHTS.reduce((s, e) => s + (evidence[e.key] ? e.w : 0), 0)
  const pct = Math.round((raw / WMAX) * 100)
  const tick = Math.round((THRESHOLD / 100) * 100)

  return (
    <aside className="rail">
      <div className="rail-brand">
        <span className="logo">
          <BrandMark size={32} />
        </span>
        <div>
          <div className="rb-name">تحققنا</div>
          <div className="rb-sub">منصة التحقق الرقمي</div>
        </div>
      </div>

      <div className="rail-sec">مسار الرحلة</div>

      <ol className="rsteps">
        {STEPS.map((s) => {
          const cls = s.n < current ? 'done' : s.n === current ? 'on' : ''
          return (
            <li className={`rstep ${cls}`} key={s.key}>
              <span className="rs-n">
                {s.n < current ? <Icon name="check" size={11} stroke={3} /> : s.n}
              </span>
              {s.label}
            </li>
          )
        })}
      </ol>

      <div className="rail-score">
        <div className="rs-top">
          <span>درجة الثقة التراكمية</span>
          <b className="num">{pct}%</b>
        </div>
        <div className="rs-bar">
          <i style={{ width: `${pct}%` }} />
          <span className="rs-tick" style={{ insetInlineStart: `${tick}%` }} />
        </div>
        <div className="rs-foot">
          <span className="num">{raw} / {WMAX} نقطة</span>
          <span>حد القبول {THRESHOLD}%</span>
        </div>
      </div>

      <div className="rail-foot">
        <button
          className={`rail-link ${view === 'review' ? 'on' : ''}`}
          onClick={onReview}
        >
          <Icon name="grid" size={13} />
          {view === 'review' ? 'العودة إلى الرحلة' : 'لوحة المراجع البشري'}
        </button>
        <div className="rail-ver">نموذج تجريبي · v2.0 · 2026</div>
      </div>
    </aside>
  )
}
