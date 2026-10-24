import React from 'react'
import { Btn, Icon } from './ui'

export function captureHint(m) {
  if (m.light < 40)
    return { tone: 'warn', msg: `الإضاءة منخفضة (${m.light}%) — وجّه وجهك نحو مصدر ضوء أو أضئ الغرفة. السبب هنا الإضاءة، لا المسافة.` }
  if (m.light > 88)
    return { tone: 'warn', msg: `الإضاءة زائدة (${m.light}%) — قد تُفقد ملامح الوجه. ابتعد عن الضوء المباشر أو أطفئ أحد المصابيح.` }
  if (m.dist < 38) return { tone: 'warn', msg: 'أنت بعيد عن الكاميرا — اقترب حتى يمتلئ الإطار بوجهك.' }
  if (m.dist > 86) return { tone: 'warn', msg: 'أنت قريب جدًا — ابتعد قليلًا حتى يظهر كامل الوجه دون قصّ.' }
  if (m.stab < 45) return { tone: 'warn', msg: 'الجهاز يهتز — ثبّت الجوال أو استند على سطح. الاهتزاز يمنع قراءة نقاط الوجه.' }
  return { tone: 'ok', msg: 'كل شيء جاهز — الإضاءة والمسافة والثبات في النطاق المطلوب. ابدأ التحدي.' }
}

function Meter({ label, value, lo, hi }) {
  const ok = value >= lo && value <= hi
  const color = ok ? '#17945f' : value < lo ? '#c08a22' : '#c0392f'
  return (
    <div className="meter">
      <div className="meter-top">
        <span>{label}</span>
        <b className="num">{value}%</b>
      </div>
      <div className="meter-bar">
        <i style={{ width: `${Math.max(4, value)}%`, background: color }} />
      </div>
    </div>
  )
}

export function CaptureAssistant({ metrics, onSimBad, onSimGood }) {
  const hint = captureHint(metrics)
  return (
    <div>
      <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 10 }}>مساعد التصوير الذكي</div>
      <Meter label="الإضاءة" value={metrics.light} lo={40} hi={88} />
      <Meter label="المسافة" value={metrics.dist} lo={38} hi={86} />
      <Meter label="الثبات" value={metrics.stab} lo={45} hi={100} />
      <div className={`hintbox ${hint.tone}`} style={{ marginTop: 12 }}>
        <span className="ic">
          <Icon name={hint.tone === 'ok' ? 'check' : 'alert'} size={14} stroke={2.4} />
        </span>
        <span>{hint.msg}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <Btn variant="ghost" size="sm" onClick={onSimBad}>
          محاكاة ظرف سيئ
        </Btn>
        <Btn variant="soft" size="sm" onClick={onSimGood}>
          تحسين تلقائي
        </Btn>
      </div>
    </div>
  )
}

export function CameraPanel({ videoRef, active, simulated, onStart, onSim, good }) {
  const mode = active ? 'live' : simulated ? 'sim' : 'idle'

  return (
    <div className="camera">
      <div className="camera-head">
        <div className="camera-name">
          <span className={`led ${mode}`} />
          كاميرا التحقق
        </div>
        <span className={`camera-tag ${mode}`}>
          {active ? 'بث مباشر' : simulated ? 'وضع المحاكاة' : 'غير مشغّلة'}
        </span>
      </div>

      <div className={`camera-stage ${mode}`}>
        <video ref={videoRef} autoPlay playsInline muted className={active ? 'on' : ''} />

        {!active && (
          <div className="camera-idle">
            <span className="camera-idle-ic">
              <Icon name="camera" size={23} stroke={1.5} />
            </span>
            <b>{simulated ? 'وضع المحاكاة مفعّل' : 'الكاميرا غير مشغّلة'}</b>
            <p>
              {simulated
                ? 'بث تمثيلي — لا تُستخدم كاميرا حقيقية'
                : 'لن يبدأ التحقق قبل منح إذن الكاميرا'}
            </p>
            <div className="camera-actions">
              <Btn size="sm" onClick={onStart}>
                <Icon name="camera" size={14} />
                تشغيل الكاميرا
              </Btn>
              {!simulated && (
                <button className="linkish" onClick={onSim}>
                  تجربة وضع المحاكاة
                </button>
              )}
            </div>
          </div>
        )}

        {active && (
          <>
            <div className="camera-guide">
              <span className={`face-oval ${good ? 'good' : ''}`} />
            </div>
            <span className="camera-live">
              <i />
              مباشر
            </span>
            <span className="cbr tl" />
            <span className="cbr tr" />
            <span className="cbr bl" />
            <span className="cbr br" />
          </>
        )}
      </div>

      <div className="camera-foot">
        <Icon name="lock" size={12} />
        <span>تُستخرج القياسات محليًا داخل المتصفح، ويُحذف الفيديو بعد انتهاء التحقق.</span>
      </div>
    </div>
  )
}
