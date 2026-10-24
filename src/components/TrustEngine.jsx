import React from 'react'
import { WEIGHTS, WMAX, THRESHOLD } from '../data'
import { Badge, Card, CardHead, Dial, Icon } from './ui'

export default function TrustEngine({ evidence, onToggle }) {
  const raw = WEIGHTS.reduce((sum, e) => sum + (evidence[e.key] ? e.w : 0), 0)
  const pct = Math.round((raw / WMAX) * 100)
  const missing = WEIGHTS.filter((e) => !evidence[e.key] && e.key !== 'social')
  const hardBlock = !evidence.liveness
  const accept = !hardBlock && pct >= THRESHOLD
  const tone = accept ? '#12784e' : '#b07a14'

  return (
    <Card>
      <CardHead
        title="محرك الثقة التكيّفي"
        sub="لا يوجد قرار واحد «قبول أو رفض» — بل سلسلة أدلة موزونة، والناتج يُقسم على 125."
        aside={<Badge tone="neutral">{raw} من {WMAX} نقطة</Badge>}
      />

      <div className="engine">
        <Dial value={pct} tone={tone} />

        <div>
          <div className="evidence">
            {WEIGHTS.map((e) => {
              const on = evidence[e.key]
              return (
                <div className="ev" key={e.key}>
                  <div className="ev-name">
                    <span className="ev-pip" style={{ background: on ? e.color : '#dbe7e1' }} />
                    {e.name}
                  </div>
                  <div className="ev-weight num">{e.w}</div>
                  <div className="ev-status">
                    {on ? <Badge>متوفر</Badge> : <Badge tone="warn">ناقص</Badge>}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="foot-row" style={{ marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-400)' }}>الحد الأدنى للقبول: {THRESHOLD}%</span>
            <span style={{ fontSize: 12, color: 'var(--ink-400)' }}>المجموع الأقصى: {WMAX} نقطة</span>
          </div>
        </div>
      </div>

      <div className={`verdict ${accept ? 'accept' : 'review'}`}>
        <span className="verdict-ic">
          <Icon name={accept ? 'check' : 'alert'} size={17} stroke={2.4} />
        </span>
        <div>
          <b>{accept ? 'تُصدر الهوية تلقائيًا' : 'يُحوَّل الطلب إلى مراجعة بشرية'}</b>
          <p>
            {accept
              ? `اجتازت الحالة حد القبول ${THRESHOLD}% مع وجود دليل الحياة — لا حاجة لتدخل بشري.`
              : hardBlock
              ? 'غياب دليل الحياة (الجلسة الحيّة) يفرض مراجعة بشرية مهما كان المجموع — قاعدة أمنية لا تُتجاوَز.'
              : `المجموع ${pct}% أقل من حد القبول. الأدلة الناقصة: ${missing.map((m) => m.name).join('، ')}.`}
          </p>
        </div>
      </div>

      <div className="rule" />

      <div style={{ marginBottom: 10 }}>
        <b style={{ fontSize: 13.5 }}>جرّب المحرك</b>
        <p style={{ fontSize: 12, color: 'var(--ink-400)', marginTop: 2 }}>
          أزل أي دليل وشاهد كيف يتغيّر القرار — دون أن «ينكسر» النظام في أي حالة.
        </p>
      </div>
      <div className="chips">
        {WEIGHTS.map((e) => (
          <button
            key={e.key}
            className={`chip ${evidence[e.key] ? 'on' : ''}`}
            onClick={() => onToggle(e.key)}
          >
            <span className="sq" />
            {e.name}
          </button>
        ))}
      </div>

      <div className="note" style={{ marginTop: 16 }}>
        <b>لماذا لا ينكسر النظام؟</b> لا يحتوي المحرك أي شرط على الملامح أو اللون أو العمر. القرار دالة جمع
        فقط: كل دليل يضيف وزنه. لا توجد «حالة وسطى» لا يعرفها النظام — لأن كل حالة هي مجموع، لا فرع في شجرة.
      </div>
    </Card>
  )
}
