import React from 'react'
import { Badge, Btn, Card, CardHead, Icon } from '../components/ui'

export default function Step3Consent({ consent, onConsent, onNext, onBack }) {
  return (
    <Card>
      <CardHead
        title="الموافقة والاستعداد"
        sub="سنستخدم صورة التابع والكاميرا لإكمال خطوات التحقق المرئي بشكل تجريبي."
        aside={<Badge tone="info">الخطوة 3 من 7</Badge>}
      />

      <div className="g2" style={{ marginBottom: 18 }}>
        <div className="tile">
          <span className="tile-ic">
            <Icon name="image" size={17} />
          </span>
          <div>
            <b>صورة شخصية جاهزة</b>
            <p>استعد لصورة واضحة للمتقدّم بخلفية فاتحة ووجه كامل.</p>
          </div>
        </div>
        <div className="tile">
          <span className="tile-ic">
            <Icon name="sun" size={17} />
          </span>
          <div>
            <b>إضاءة مناسبة</b>
            <p>تأكد من إضاءة متوازية وغير مظلمة قبل بدء التحقق.</p>
          </div>
        </div>
      </div>

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(e) => onConsent(e.target.checked)} />
        <span>
          أوافق على استخدام الصورة والكاميرا لأغراض التحقق التجريبي ضمن هذه التجربة، وأقرّ بأن الخدمة محاكاة
          وليست خدمة رسمية.
        </span>
      </label>

      <div className="rule" />

      <div className="foot-row">
        <button className="linkish" onClick={onBack}>رجوع</button>
        <Btn onClick={onNext} disabled={!consent}>
          متابعة إلى الصورة
        </Btn>
      </div>
    </Card>
  )
}
