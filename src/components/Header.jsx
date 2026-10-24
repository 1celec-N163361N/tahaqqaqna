import React from 'react'
import { STEPS } from '../data'
import { Icon } from './ui'

export default function Header({ scenario, onScenario, onReview, onReset, onNetDrop, reviewOpen, current, view }) {
  const step = STEPS[Math.min(Math.max(current, 1), 7) - 1]

  return (
    <>
      <div className="notice">
        <span>
          <span className="dot" />
          خدمة حكومية مقترحة — نموذج تجريبي للمسابقة، وليس خدمة رسمية
        </span>
        <span className="right">إصدار أول هوية · المسار الثاني</span>
      </div>

      <header className="topbar">
        <nav className="crumbs" aria-label="مسار التنقل">
          <span>الرئيسية</span>
          <Icon name="chev" size={13} />
          <span>الأحوال المدنية</span>
          <Icon name="chev" size={13} />
          <span>إصدار أول هوية</span>
          <Icon name="chev" size={13} />
          <b>{view === 'review' ? 'لوحة المراجع' : view === 'intro' ? 'المقدمة' : step.label}</b>
        </nav>

        <div className="tb-actions">
          <select
            className="ctl"
            value={scenario}
            onChange={(e) => onScenario(e.target.value)}
            aria-label="سيناريو العرض"
          >
            <option value="success">نجاح الرحلة</option>
            <option value="photo">مشكلة بالصورة</option>
            <option value="face">عدم مطابقة الوجه</option>
          </select>

          <button className="tbtn" onClick={onNetDrop} title="محاكاة انقطاع الشبكة">
            <Icon name="wifiOff" size={13} />
            انقطاع
          </button>

          <button className={`tbtn ${reviewOpen ? 'on' : ''}`} onClick={onReview}>
            <Icon name="grid" size={13} />
            {reviewOpen ? 'الرحلة' : 'المراجع'}
          </button>

          <button className="tbtn tbtn-accent" onClick={onReset}>
            <Icon name="refresh" size={13} />
            إعادة
          </button>
        </div>
      </header>
    </>
  )
}
