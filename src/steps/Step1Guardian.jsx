import React from 'react'
import { Badge, Btn, Card, CardHead, Icon } from '../components/ui'

export default function Step1Guardian({ evidence, onApprove, onExpire, onNext }) {
  return (
    <Card>
      <CardHead
        title="التحقق من ولي الأمر"
        sub="للمتابعة، سجّل الدخول عبر أبشر وأكّد هويتك باستخدام نفاذ."
        aside={<Badge tone="info">الخطوة 1 من 7</Badge>}
      />

      <div className="note" style={{ marginBottom: 20 }}>
        لا تطلب هذه الصفحة اسم مستخدم أو كلمة مرور حكومية فعلية — جميع الخطوات محاكاة ولا تُرسل بيانات حقيقية.
      </div>

      <div className="g2">
        <div className="nafath">
          <span className="shield">
            <Icon name="shield" size={26} stroke={1.5} />
          </span>
          <div className="nafath-kicker">تطبيق نفاذ</div>
          <h3>اختر الرقم المطابق</h3>
          <div className="nafath-code num">24</div>
          <div className="code-row">
            {[63, 24, 17].map((v) => (
              <button
                key={v}
                className={`code-btn num ${v === 24 ? 'match' : ''}`}
                onClick={() => onApprove(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="nafath-side">
          <div style={{ fontSize: 12.5, color: 'var(--ink-500)' }}>طلب تحقق عبر نفاذ</div>
          <div className="big num">24</div>
          <p style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 8, maxWidth: 300 }}>
            امنح تطبيق نفاذ على جهازك واختر الرقم المطابق لإكمال التحقق من هوية ولي الأمر.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            <Btn onClick={() => onApprove(24)}>
              <Icon name="shield" size={14} />
              محاكاة الموافقة
            </Btn>
            <Btn variant="ghost" onClick={onExpire}>
              محاكاة انتهاء الطلب
            </Btn>
          </div>
        </div>
      </div>

      <div className="rule" />

      <div className="foot-row">
        <span style={{ fontSize: 12.5, color: evidence.nafath ? 'var(--em-700)' : 'var(--ink-400)' }}>
          {evidence.nafath ? '✓ تم التحقق من ولي الأمر عبر نفاذ' : 'بانتظار الموافقة من تطبيق نفاذ'}
        </span>
        <Btn onClick={onNext} disabled={!evidence.nafath}>
          التالي
        </Btn>
      </div>
    </Card>
  )
}
