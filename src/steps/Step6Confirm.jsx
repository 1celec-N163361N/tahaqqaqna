import React, { useState } from 'react'
import { Badge, Btn, Card, CardHead, Field, Icon, Portrait } from '../components/ui'

const DEMO_CODE = '4821'

export default function Step6Confirm({ dependent, photoSrc, otpOk, onSendOtp, onVerify, onNext, onBack }) {
  const [code, setCode] = useState(DEMO_CODE)

  return (
    <Card>
      <CardHead
        title="تأكيد البيانات"
        sub="راجع البيانات المستخرجة من السجل المدني وطابقها مع الوثيقة قبل الإصدار."
        aside={<Badge>مستخرجة من السجل المدني</Badge>}
      />

      <div className="idgrid">
        <div className="idphoto">
          <Portrait src={photoSrc || dependent.photo} />
        </div>
        <div>
          <div className="fields">
            <Field k="الاسم الرباعي" v={dependent.name} />
            <Field k="رقم الهوية الوطنية" v={dependent.nid} />
            <Field k="تاريخ الميلاد" v={dependent.birth} />
            <Field k="الجنس" v={dependent.gender} />
            <Field k="صلة القرابة" v={dependent.relation} />
            <Field k="رقم الجوال" v="05•••••123" />
          </div>
          <div className="note" style={{ marginTop: 14 }}>
            الأيقونة ✓ تعني أن الحقل طابق السجل المدني آليًا. أي حقل غير مطابق يظهر بعلامة تحذير ويُحوَّل الطلب
            للمراجعة — ولا يُرفض تلقائيًا.
          </div>
        </div>
      </div>

      <div className="rule" />

      <div className="otp">
        <div className="foot-row" style={{ marginBottom: 14 }}>
          <div>
            <b style={{ fontSize: 14.5 }}>رمز التحقق (OTP)</b>
            <p style={{ fontSize: 12, color: 'var(--ink-400)', marginTop: 2 }}>
              أُرسل رمز من 4 أرقام إلى جوال ولي الأمر 05•••••123
            </p>
          </div>
          <Btn
            variant="ghost"
            size="sm"
            onClick={() => {
              setCode(DEMO_CODE)
              onSendOtp()
            }}
          >
            <Icon name="lock" size={13} />
            إرسال الرمز
          </Btn>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <input
            className="num"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={code}
            disabled={otpOk}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            aria-label="رمز التحقق"
          />
          <Btn size="sm" disabled={otpOk || code.length < 4} onClick={() => onVerify(code)}>
            تحقق
          </Btn>
          {otpOk && <Badge>تم التحقق</Badge>}
        </div>
        <p style={{ fontSize: 11.5, color: 'var(--ink-400)', marginTop: 10 }}>
          الرمز مُعبّأ تلقائيًا للتجربة — اضغط «تحقق» للمتابعة.
        </p>
      </div>

      <div className="rule" />

      <div className="foot-row">
        <button className="linkish" onClick={onBack}>رجوع</button>
        <Btn onClick={onNext} disabled={!otpOk}>
          إصدار النتيجة
        </Btn>
      </div>
    </Card>
  )
}
