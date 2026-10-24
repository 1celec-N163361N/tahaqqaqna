import React, { useRef, useState } from 'react'
import { ACCESSIBILITY, ACCESSIBILITY_CHALLENGE } from '../data'
import { Badge, Btn, Card, CardHead, Icon } from '../components/ui'
import { CameraPanel, CaptureAssistant } from '../components/Capture'

export default function Step5Liveness({
  challenge,
  a11y,
  onA11y,
  livenessOk,
  onDone,
  onNext,
  onBack,
  metrics,
  onSimBad,
  onSimGood,
  toast
}) {
  const videoRef = useRef(null)
  const [camOn, setCamOn] = useState(false)
  const [simulated, setSimulated] = useState(false)

  const alt = ACCESSIBILITY_CHALLENGE[a11y]
  const title = alt ? alt.title : challenge.title
  const hint = alt ? alt.hint : challenge.hint
  const good = metrics.light >= 40 && metrics.light <= 88 && metrics.stab >= 45

  const startCam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      if (videoRef.current) videoRef.current.srcObject = stream
      setCamOn(true)
      toast('الكاميرا تعمل — راجع مساعد التصوير')
    } catch {
      setSimulated(true)
      toast('تعذر تشغيل الكاميرا — يعمل وضع المحاكاة بدلًا منها')
    }
  }

  return (
    <Card>
      <CardHead
        title="التحقق من الوجه"
        sub="سنحاكي مطابقة وجه المتقدم بالصورة المرفوعة، وفحص الحيوية عبر الكاميرا."
        aside={<Badge tone="info">الخطوة 5 من 7</Badge>}
      />

      <div className="g5">
        <div>
          <CameraPanel
            videoRef={videoRef}
            active={camOn}
            simulated={simulated}
            onStart={startCam}
            onSim={() => {
              setSimulated(true)
              toast('وضع المحاكاة مفعّل')
            }}
            good={good}
          />
          <Btn
            className="btn-block"
            variant={livenessOk ? 'soft' : 'primary'}
            style={{ marginTop: 10 }}
            onClick={onDone}
          >
            {livenessOk ? (
              <>
                <Icon name="check" size={14} stroke={2.6} /> تم تنفيذ الحركة
              </>
            ) : (
              'تم تنفيذ الحركة'
            )}
          </Btn>
        </div>

        <div>
          <div className="challenge">
            <div className="k">التحدي الحركي — محاولة 1 من 3</div>
            <div className="t">{title}</div>
            <div className="h">{hint}</div>
            <div className="progress">
              <i style={{ width: livenessOk ? '100%' : '35%' }} />
            </div>
          </div>

          <CaptureAssistant metrics={metrics} onSimBad={onSimBad} onSimGood={onSimGood} />
        </div>
      </div>

      <div className="rule" />

      <div className="foot-row" style={{ marginBottom: 12 }}>
        <div>
          <b style={{ fontSize: 13.5 }}>وضع الوصولية</b>
          <p style={{ fontSize: 12, color: 'var(--ink-400)', marginTop: 2 }}>
            تحديات بديلة تناسب القدرات المختلفة — لا يُستثنى أحد من الخدمة.
          </p>
        </div>
        {a11y !== 'none' && <Badge>مفعّل: {ACCESSIBILITY.find((a) => a.id === a11y)?.desc}</Badge>}
      </div>

      <div className="a11y">
        {ACCESSIBILITY.map((a) => (
          <button
            key={a.id}
            className={a11y === a.id ? 'on' : ''}
            onClick={() => onA11y(a.id)}
            title={a.desc}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="rule" />

      <div className="foot-row">
        <button className="linkish" onClick={onBack}>رجوع</button>
        <Btn onClick={onNext} disabled={!livenessOk}>
          متابعة إلى تأكيد البيانات
        </Btn>
      </div>
    </Card>
  )
}
