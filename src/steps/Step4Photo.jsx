import React, { useRef } from 'react'
import { Badge, Btn, Card, CardHead, Icon, Portrait } from '../components/ui'

const PENDING = [
  'الأبعاد والدقة',
  'الصيغة وحجم الملف',
  'توازن الإضاءة',
  'موضع الوجه داخل الإطار',
  'الالتزام بالاشتراطات الرسمية'
]

export default function Step4Photo({ photoSrc, photo, photoOk, photoChecks, onPick, onSample, onCheck, onNext, onBack }) {
  const fileRef = useRef(null)

  return (
    <Card>
      <CardHead
        title="صورة الهوية الوطنية"
        sub="ارفع صورة حديثة للمتقدّم وفق الاشتراطات الرسمية المعتمدة."
        aside={
          <Btn variant="soft" size="sm" onClick={() => onCheck('guide')}>
            <Icon name="info" size={14} />
            شاهد كيف تجهّز صورتك
          </Btn>
        }
      />

      <div className="g4">
        <div>
          <div className="dropzone" onClick={() => fileRef.current?.click()}>
            <Portrait src={photoSrc || photo} />
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onPick(URL.createObjectURL(f))
            }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <Btn variant="ghost" size="sm" onClick={() => fileRef.current?.click()}>
              رفع صورة
            </Btn>
            <Btn variant="ghost" size="sm" onClick={onSample}>
              استخدام صورة تجريبية
            </Btn>
          </div>
        </div>

        <div>
          <b style={{ fontSize: 14 }}>فحص تجريبي للجودة</b>
          <p style={{ fontSize: 12, color: 'var(--ink-400)', margin: '4px 0 12px' }}>
            يُحاكي هذا الفحص الإضاءة والوضوح والإطار، ولا يُعد اعتمادًا رسميًا.
          </p>
          <Btn className="btn-block" onClick={onCheck}>
            <Icon name="sparkle" size={14} />
            فحص الصورة
          </Btn>

          <div className="checklist">
            {photoChecks
              ? photoChecks.map((c, i) => (
                  <div className={`check ${c.ok ? '' : 'bad'}`} key={i}>
                    <span className="b">
                      <Icon name={c.ok ? 'check' : 'alert'} size={10} stroke={3} />
                    </span>
                    <span>{c.t}</span>
                  </div>
                ))
              : PENDING.map((t) => (
                  <div className="check" key={t} style={{ color: 'var(--ink-400)' }}>
                    <span
                      className="b"
                      style={{ background: 'var(--surface-3)', color: 'var(--ink-300)' }}
                    >
                      •
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
          </div>

          {photoOk && (
            <div className="hintbox ok" style={{ marginTop: 14 }}>
              <span className="ic">
                <Icon name="check" size={14} stroke={2.4} />
              </span>
              <span>تم تجهيز الصورة والتحقق منها بنجاح.</span>
            </div>
          )}
        </div>
      </div>

      <div className="rule" />

      <div className="foot-row">
        <button className="linkish" onClick={onBack}>رجوع</button>
        <Btn onClick={onNext} disabled={!photoOk}>
          متابعة إلى التحقق المرئي
        </Btn>
      </div>
    </Card>
  )
}
