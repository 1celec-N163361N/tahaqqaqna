import React from 'react'
import { DEPENDENTS } from '../data'
import { Badge, Btn, Card, CardHead, Icon } from '../components/ui'

export default function Step2Dependent({ selected, onSelect, onNext, onBack }) {
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
            onClick={() => onSelect(d.id)}
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

      <div className="rule" />

      <div className="foot-row">
        <button className="linkish" onClick={onBack}>رجوع</button>
        <Btn onClick={onNext} disabled={!selected}>
          تأكيد الاختيار والمتابعة
        </Btn>
      </div>
    </Card>
  )
}
