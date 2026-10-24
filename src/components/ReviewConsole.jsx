import React, { useState } from 'react'
import { REVIEW_CASES, WEIGHTS } from '../data'
import { Badge, Btn, Card, CardHead, Icon } from './ui'

const STATS = [
  { value: '34', label: 'حالة محوّلة اليوم' },
  { value: '2.1', label: 'متوسط زمن المراجعة (دقيقة)' },
  { value: '20', label: 'موظفًا مطلوبًا بدل 100' },
  { value: '71%', label: 'حالات تُحسم آليًا' }
]

const REASONS = [
  'السبب: مطابقة بعد المراجعة اليدوية',
  'السبب: دليل ناقص قابل للاستكمال',
  'السبب: تعارض في البيانات',
  'السبب: اشتباه تزوير'
]

export default function ReviewConsole({ onBack, onDecide }) {
  const [done, setDone] = useState({})

  const decide = (id, verdict) => {
    setDone((d) => ({ ...d, [id]: verdict }))
    onDecide?.(verdict)
  }

  return (
    <div style={{ paddingTop: 22 }}>
      <Card>
        <CardHead
          title="لوحة المراجع البشري"
          sub="الحالات المحوّلة آليًا مع درجة الثقة والدليل الناقص وسبب التحويل وإجراء واضح."
          aside={
            <Btn variant="ghost" size="sm" onClick={onBack}>
              رجوع للرحلة
            </Btn>
          }
        />

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <b className="num">{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {REVIEW_CASES.map((c) => (
          <div className={`case ${done[c.id] ? 'done' : ''}`} key={c.id}>
            <div className="case-top">
              <div className="case-who">
                {c.photo ? (
                  <img className="avatar-img" src={c.photo} alt="" />
                ) : (
                  <div className="avatar">{c.name.charAt(0)}</div>
                )}
                <div>
                  <b>{c.name}</b>
                  <span className="num">{c.id}</span>
                </div>
              </div>
              <div className="case-score">
                <b className="num">{c.score}%</b>
                <span>درجة الثقة</span>
              </div>
            </div>

            <div className="evchips">
              {WEIGHTS.map((w) => {
                const miss = c.missing.includes(w.key)
                return (
                  <span className={`evchip ${miss ? 'miss' : ''}`} key={w.key}>
                    {w.name}
                    {miss ? ' — ناقص' : ''}
                  </span>
                )
              })}
            </div>

            <div className="reason">
              <b>سبب التحويل:</b> {c.reason}
            </div>

            {c.hint && (
              <div className="case-hint">
                <Icon name="info" size={13} />
                <span>
                  <b>المطلوب منك:</b> {c.hint}
                </span>
              </div>
            )}

            <div className="case-actions">
              <select aria-label="سبب القرار">
                {REASONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <Btn size="sm" onClick={() => decide(c.id, 'ok')} disabled={!!done[c.id]}>
                <Icon name="check" size={13} stroke={2.6} />
                موافقة
              </Btn>
              <Btn variant="danger" size="sm" onClick={() => decide(c.id, 'no')} disabled={!!done[c.id]}>
                رفض
              </Btn>
              {done[c.id] && (
                <Badge tone={done[c.id] === 'ok' ? '' : 'bad'}>
                  {done[c.id] === 'ok' ? 'تمت الموافقة' : 'تم الرفض'}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
