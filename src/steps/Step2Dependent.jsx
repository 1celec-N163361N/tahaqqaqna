import React, { useState } from 'react'
import { DEPENDENTS } from '../data'
import { Badge, Btn, Card, CardHead, Icon } from '../components/ui'

export default function Step2Dependent({ selected, onSelect, onConfirm, onBack }) {
  const [verifying, setVerifying] = useState(false)

  /* الاختيار وحده لا يُثبت شيئًا — الدليل يُسجَّل فقط بعد مطابقة السجل المدني */
  const confirm = () => {
    if (!selected || verifying) return
    setVerifying(true)
    setTimeout(() => {
      onConfirm()
      setVerifying(false)
    }, 900)
  }

  return (
    <Card>
      <CardHead
        title="لمن ترغب بإصدار الهوية؟"
        sub="اختر التابع من قائمة التابعين المرتبطين بحساب ولي الأمر في أبشر."
        aside={<Badge tone="info">الخطوة 2 من 7</Badge>}
      />

      <div className="g3">
        {DEPENDENTS.map((d) => (
          <button
            key={d.id}
            className={`dep ${selected === d.id ? 'on' : ''}`}
            onClick={() => !verifying && onSelect(d.id)}
            disabled={verifying}
          >
            <span className="dep-tick">
              <Icon name="check" size={11} stroke={3} />
            </span>
            <div className="dep-top">
              <div className="avatar">{d.name.charAt(0)}</div>
              <div>
                <div className="dep-name">{d.name}</div>
                <div className="dep-rel">{d.relation} — {d.gender}</div>
              </div>
            </div>
            <div className="dep-meta">
              <span>تاريخ الميلاد: {d.birth}</span>
              <span>رقم السجل: {d.nid}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="note" style={{ marginTop: 18 }}>
        يُرجى التأكد من اختيار التابع الصحيح قبل المتابعة — لا يمكن تعديل التابع بعد إصدار الهوية.
      </div>

      {verifying && (
        <div className="verify-strip">
          <span className="spin-s" />
          <span>جارٍ مطابقة بيانات التابع مع سجل الأحوال المدنية…</span>
        </div>
      )}

      <div className="rule" />

      <div className="foot-row">
        <button className="linkish" onClick={onBack} disabled={verifying}>
          رجوع
        </button>
        <Btn onClick={confirm} disabled={!selected || verifying}>
          {verifying ? (
            <>
              <span className="spin-s" />
              جارٍ المطابقة…
            </>
          ) : (
            <>
              تأكيد الاختيار والمطابقة
              <Icon name="check" size={13} stroke={2.4} />
            </>
          )}
        </Btn>
      </div>
    </Card>
  )
}
