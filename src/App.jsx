import React, { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Stepper from './components/Stepper'
import ReviewConsole from './components/ReviewConsole'
import Intro from './components/Intro'
import { Btn, Card, Icon } from './components/ui'
import { CHALLENGES, EMPTY_EVIDENCE, DEPENDENTS } from './data'
import Step1Guardian from './steps/Step1Guardian'
import Step2Dependent from './steps/Step2Dependent'
import Step3Consent from './steps/Step3Consent'
import Step4Photo from './steps/Step4Photo'
import Step5Liveness from './steps/Step5Liveness'
import Step6Confirm from './steps/Step6Confirm'
import Step7Result from './steps/Step7Result'

const KEY = 'tq_react_v3'

const INIT = {
  step: 1,
  scenario: 'success',
  dependent: null,
  consent: false,
  photoSrc: null,
  photoOk: false,
  photoChecks: null,
  livenessOk: false,
  a11y: 'none',
  challenge: CHALLENGES[0],
  otpOk: false,
  evidence: { ...EMPTY_EVIDENCE },
  delivery: false,
  metrics: { light: 72, dist: 64, stab: 81, locked: false }
}

const clamp = (v) => Math.max(0, Math.min(100, Math.round(v)))
const rnd = (a, b) => Math.random() * (b - a) + a

/* demo deep-link: ?step=7 or ?view=review — lets the judges jump straight to any screen */
const QS = new URLSearchParams(window.location.search)
const QSTEP = Number(QS.get('step'))
const QVIEW = QS.get('view')
const DEMO = QSTEP >= 1 && QSTEP <= 7

function seed() {
  if (!DEMO) return INIT
  return {
    ...INIT,
    step: QSTEP,
    dependent: 'renad',
    consent: true,
    photoOk: QSTEP >= 5,
    livenessOk: QSTEP >= 6,
    otpOk: QSTEP >= 6,
    evidence: {
      nafath: QSTEP >= 2,
      civil: QSTEP >= 3,
      photo: QSTEP >= 5,
      liveness: QSTEP >= 6
    }
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
function persist(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {}
}

export default function App() {
  const savedRef = useRef(load())
  const [state, setState] = useState(seed)
  const [resume, setResume] = useState(() => {
    if (DEMO) return null
    const s = savedRef.current
    return s && s.step > 1 ? s : null
  })
  const [view, setView] = useState(() => {
    if (QVIEW === 'review') return 'review'
    if (QSTEP || QVIEW) return 'flow'
    return 'intro'
  })
  const [toastMsg, setToastMsg] = useState('')
  const [offline, setOffline] = useState(null)
  const toastTimer = useRef(null)

  const toast = (m) => {
    setToastMsg(m)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(''), 2900)
  }

  const set = (patch) => setState((s) => ({ ...s, ...patch }))

  useEffect(() => {
    if (!resume && !DEMO) persist(state)
  }, [state, resume])

  /* drift of capture metrics */
  useEffect(() => {
    if (state.step !== 5 || resume) return
    const id = setInterval(() => {
      setState((s) => {
        if (s.metrics.locked) return s
        return {
          ...s,
          metrics: {
            light: clamp(s.metrics.light + rnd(-3, 3)),
            dist: clamp(s.metrics.dist + rnd(-2, 2)),
            stab: clamp(s.metrics.stab + rnd(-3, 3)),
            locked: false
          }
        }
      })
    }, 1400)
    return () => clearInterval(id)
  }, [state.step, resume])

  const go = (n) => {
    const patch = { step: n }
    if (n === 5) patch.challenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]
    set(patch)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const approveNafath = (v) => {
    if (v === 24) {
      set({ evidence: { ...state.evidence, nafath: true } })
      toast('تم التحقق من ولي الأمر عبر نفاذ')
    } else {
      toast('الرقم غير مطابق — حاول مرة أخرى')
    }
  }

  /* الاختيار لا يمنح أي دليل — مجرد تحديد هوية التابع */
  const selectDependent = (id) => {
    if (id === state.dependent) return
    set({ dependent: id, evidence: { ...state.evidence, civil: false } })
  }

  /* دليل السجل المدني يُسجَّل بعد المطابقة فقط */
  const confirmDependent = () => {
    setState((s) => ({
      ...s,
      step: 3,
      evidence: { ...s.evidence, civil: true }
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
    toast('تمت مطابقة السجل المدني — بيانات التابع مطابقة')
  }

  const checkPhoto = () => {
    const fail = state.scenario === 'photo'
    const checks = fail
      ? [
          { ok: false, t: 'ملامح الوجه غير واضحة — الإضاءة غير متوازنة على نصف الوجه' },
          { ok: true, t: 'أبعاد الصورة مناسبة' },
          { ok: false, t: 'الوجه مائل عن الوضع المستقيم — اجعل رأسك مستقيمًا وأعد التصوير' },
          { ok: true, t: 'الوجه في وسط الإطار' },
          { ok: false, t: 'الصورة مهزوزة — ثبّت الجوال وأعد التصوير' }
        ]
      : null
    set({
      photoChecks: checks,
      photoOk: !fail,
      evidence: { ...state.evidence, photo: !fail }
    })
    toast(fail ? 'الصورة غير مطابقة للاشتراطات' : 'تم تجهيز الصورة والتحقق منها بنجاح')
  }

  const doneLiveness = () => {
    if (state.scenario === 'face') {
      toast('تعذر إتمام المطابقة — ملامح الوجه لا تطابق الصورة المرفوعة')
      return
    }
    set({ livenessOk: true, evidence: { ...state.evidence, liveness: true } })
    toast('تم تنفيذ الحركة — دليل الحياة مكتمل')
  }

  const verifyOtp = (code) => {
    if (code === '4821') {
      set({ otpOk: true })
      toast('تم التحقق من الرمز')
    } else {
      toast('الرمز غير صحيح — الرمز التجريبي 4821')
    }
  }

  const toggleEvidence = (k) => {
    set({ evidence: { ...state.evidence, [k]: !state.evidence[k] } })
  }

  const reset = () => {
    const scn = state.scenario
    setState({ ...INIT, scenario: scn, evidence: { ...EMPTY_EVIDENCE } })
    setView('flow')
    try {
      localStorage.removeItem(KEY)
    } catch {}
    toast('أُعيدت التجربة — السيناريو محفوظ')
    window.scrollTo({ top: 0 })
  }

  const netDrop = () => {
    const at = state.step
    setOffline('drop')
    setTimeout(() => setOffline('back'), 2100)
    setTimeout(() => {
      setOffline(null)
      toast(`استُؤنفت الرحلة من الخطوة ${at} — بلا إعادة نفاذ`)
    }, 3500)
  }

  const dependent = DEPENDENTS.find((d) => d.id === state.dependent) || DEPENDENTS[2]

  const steps = [
    <Step1Guardian
      key="s1"
      evidence={state.evidence}
      onApprove={approveNafath}
      onExpire={() => toast('انتهت صلاحية طلب التحقق. يرجى إعادة الإرسال.')}
      onNext={() => go(2)}
    />,
    <Step2Dependent
      key="s2"
      selected={state.dependent}
      onSelect={selectDependent}
      onConfirm={confirmDependent}
      onBack={() => go(1)}
    />,
    <Step3Consent
      key="s3"
      consent={state.consent}
      onConsent={(v) => set({ consent: v })}
      onNext={() => go(4)}
      onBack={() => go(2)}
    />,
    <Step4Photo
      key="s4"
      photoSrc={state.photoSrc}
      photo={dependent.photo}
      photoOk={state.photoOk}
      photoChecks={state.photoChecks}
      onPick={(url) =>
        set({ photoSrc: url, photoOk: false, photoChecks: null, evidence: { ...state.evidence, photo: false } })
      }
      onSample={() =>
        set({ photoSrc: null, photoOk: false, photoChecks: null, evidence: { ...state.evidence, photo: false } })
      }
      onCheck={checkPhoto}
      onNext={() => go(5)}
      onBack={() => go(3)}
    />,
    <Step5Liveness
      key="s5"
      challenge={state.challenge}
      a11y={state.a11y}
      onA11y={(id) => set({ a11y: id })}
      livenessOk={state.livenessOk}
      onDone={doneLiveness}
      onNext={() => go(6)}
      onBack={() => go(4)}
      metrics={state.metrics}
      onSimBad={() => {
        set({ metrics: { light: 26, dist: 88, stab: 38, locked: true } })
        toast('ظرف سيئ — لاحظ كيف يحدد المساعد السبب بدقة')
      }}
      onSimGood={() => {
        set({ metrics: { light: 76, dist: 62, stab: 88, locked: true } })
        toast('الظرف الآن مناسب — يمكن تنفيذ التحدي')
      }}
      toast={toast}
    />,
    <Step6Confirm
      key="s6"
      dependent={dependent}
      photoSrc={state.photoSrc}
      otpOk={state.otpOk}
      onSendOtp={() => toast('الرمز التجريبي: 4821')}
      onVerify={verifyOtp}
      onNext={() => go(7)}
      onBack={() => go(5)}
    />,
    <Step7Result
      key="s7"
      evidence={state.evidence}
      onToggle={toggleEvidence}
      dependent={dependent}
      delivery={state.delivery}
      onDelivery={() => {
        set({ delivery: true })
        toast('تم تسجيل طلب التوصيل تجريبيًا')
      }}
      onOpenReview={() => setView('review')}
    />
  ]

  return (
    <div className="app">
      <Stepper
        current={view === 'intro' ? 0 : state.step}
        evidence={state.evidence}
        view={view}
        onReview={() => setView(view === 'review' ? 'flow' : 'review')}
      />

      <div className="workspace">
        <Header
          scenario={state.scenario}
          onScenario={(v) => {
            set({ scenario: v })
            toast('تم اختيار السيناريو — يُطبَّق على الخطوات القادمة')
          }}
          onReview={() => setView(view === 'review' ? 'flow' : 'review')}
          onReset={reset}
          onNetDrop={netDrop}
          reviewOpen={view === 'review'}
          current={state.step}
          view={view}
          onCrumb={(t) => {
            if (t === 'start') {
              setView('flow')
              go(1)
              toast('رجعت إلى بداية الخدمة')
            } else {
              setView('intro')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        />

        <main className="page">
          {resume ? (
            <Card>
              <div className="resume">
                <div>
                  <b>لديك جلسة غير مكتملة</b>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-400)', marginTop: 2 }}>
                    توقفت عند الخطوة {resume.step} — كل الأدلة محفوظة.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 9 }}>
                  <Btn
                    size="sm"
                    onClick={() => {
                      setState({ ...INIT, ...resume })
                      setResume(null)
                    }}
                  >
                    استئناف من الخطوة {resume.step}
                  </Btn>
                  <Btn
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      try {
                        localStorage.removeItem(KEY)
                      } catch {}
                      setState(INIT)
                      setResume(null)
                    }}
                  >
                    بدء جديد
                  </Btn>
                </div>
              </div>
            </Card>
          ) : view === 'review' ? (
            <ReviewConsole
              onBack={() => setView('flow')}
              onDecide={(v) => toast(v === 'ok' ? 'تمت الموافقة — أُرسل إشعار للمواطن' : 'تم الرفض — سُجّل السبب')}
            />
          ) : view === 'intro' ? (
            <Intro onStart={() => setView('flow')} onReview={() => setView('review')} />
          ) : (
            <>
              <header className="page-head">
                <div>
                  <div className="ph-eyebrow">
                    <span className="sq" />
                    رحلة موثّقة بالأدلة
                  </div>
                  <h1 className="page-title">إصدار الهوية الوطنية لأول مرة عن بُعد</h1>
                  <p className="page-sub">
                    لا قرار واحد، بل سلسلة أدلة موزونة — قابلة للتفسير والتدقيق.
                  </p>
                </div>
                <div className="ph-meta">
                  <div className="meta-item">
                    <span>رقم الجلسة</span>
                    <b className="num">TQ-2026-00419</b>
                  </div>
                  <div className="meta-item">
                    <span>الخطوة</span>
                    <b className="num">{state.step} / 7</b>
                  </div>
                  <div className="meta-item">
                    <span>حد القبول</span>
                    <b className="num">75%</b>
                  </div>
                </div>
              </header>

              {steps[state.step - 1]}
            </>
          )}
        </main>

        <footer className="page-foot">
          <b>تحققنا</b> — نموذج تجريبي ضمن المسابقة · 2026
          <br />
          جميع الخطوات محاكاة، ولا تُرسل بيانات حقيقية إلى أي جهة.
        </footer>
      </div>

      {offline && (
        <div className="overlay">
          <div className="modal">
            {offline === 'drop' ? (
              <>
                <div className="spinner" />
                <h3>انقطع الاتصال</h3>
                <p>تم حفظ تقدمك تلقائيًا. لا تُلغى الرحلة — سنستأنف من نفس الخطوة.</p>
              </>
            ) : (
              <>
                <div className="checkmark">
                  <Icon name="check" size={22} stroke={2.6} />
                </div>
                <h3>عاد الاتصال</h3>
                <p>استئناف تلقائي من الخطوة {state.step} — بلا إعادة نفاذ.</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className={`toast ${toastMsg ? 'on' : ''}`}>{toastMsg}</div>
    </div>
  )
}
