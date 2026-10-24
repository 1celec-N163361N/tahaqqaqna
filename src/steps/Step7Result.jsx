import React from 'react'
import { THRESHOLD, WEIGHTS, WMAX } from '../data'
import { Badge, Btn, Card, CardHead, Icon } from '../components/ui'
import TrustEngine from '../components/TrustEngine'

const TIMELINE = [
  ['تم تقديم الطلب', 'اكتملت تجريبيًا'],
  ['تم التحقق من ولي الأمر', 'عبر نفاذ'],
  ['اكتمل التحقق المرئي', 'مطابقة الوجه وفحص الحيوية'],
  ['تم التحقق من البيانات', 'السجل المدني ورمز OTP'],
  ['تم اعتماد الإصدار', 'قرار محرك الثقة']
]

export default function Step7Result({ evidence, onToggle, dependent, delivery, onDelivery, onOpenReview }) {
  const raw = WEIGHTS.reduce((s, e) => s + (evidence[e.key] ? e.w : 0), 0)
  const pct = Math.round((raw / WMAX) * 100)
  const accept = evidence.liveness && pct >= THRESHOLD

  return (
    <div>
      <TrustEngine evidence={evidence} onToggle={onToggle} />

      {accept ? (
        <>
          <div className="hero-success">
            <span className="tag">نتيجة تجريبية</span>
            <h2>تم اعتماد إصدار الهوية</h2>
            <p>اكتملت مراحل التجربة، ويمكنك الآن تجربة طلب توصيل النسخة المادية عبر سبل.</p>
            <div className="ref num">رقم الطلب: TQ-2026-00419</div>
          </div>

          <div className="trio">
            <div className="trio-item">
              <span>اكتمال التحقق والمراجعة</span>
              <span className="c"><Icon name="check" size={12} stroke={3} /></span>
            </div>
            <div className="trio-item">
              <span>اعتماد الإصدار التجريبي</span>
              <span className="c"><Icon name="check" size={12} stroke={3} /></span>
            </div>
            <div className="trio-item">
              <span>طلب توصيل النسخة المادية</span>
              <span className={`c ${delivery ? '' : 'off'}`}>
                {delivery ? <Icon name="check" size={12} stroke={3} /> : '○'}
              </span>
            </div>
          </div>

          <Card>
            <CardHead
              title="طلب التوصيل عبر سبل"
              sub="عنوان تجريبي فقط — لا يتم تنفيذ طلب توصيل ولا دفع حقيقي."
              aside={<Badge tone="neutral">تجريبي</Badge>}
            />
            <div className="fields">
              <div className="field"><div><div className="k">المدينة</div><div className="v">الرياض</div></div><span className="ok"><Icon name="check" size={11} stroke={3} /></span></div>
              <div className="field"><div><div className="k">الحي</div><div className="v">النخيل</div></div><span className="ok"><Icon name="check" size={11} stroke={3} /></span></div>
              <div className="field"><div><div className="k">الشارع</div><div className="v">طريق الملك فهد</div></div><span className="ok"><Icon name="check" size={11} stroke={3} /></span></div>
              <div className="field"><div><div className="k">رقم المبنى</div><div className="v">4821</div></div><span className="ok"><Icon name="check" size={11} stroke={3} /></span></div>
            </div>
            <div className="foot-row" style={{ marginTop: 16 }}>
              <span style={{ fontSize: 12, color: 'var(--ink-400)' }}>التابع: {dependent.name}</span>
              <Btn size="sm" onClick={onDelivery}>
                {delivery ? '✓ تم تسجيل طلب التوصيل' : 'محاكاة تحديث التوصيل'}
              </Btn>
            </div>
          </Card>

          <Card>
            <CardHead title="حالة الطلب" aside={<Badge tone="neutral"><span className="num">TQ-2026-00419</span></Badge>} />
            <div className="timeline">
              {TIMELINE.map(([t, s]) => (
                <div className="tl" key={t}>
                  <span className="tl-dot"><Icon name="check" size={10} stroke={3.2} /></span>
                  <b>{t}</b>
                  <span>{s}</span>
                </div>
              ))}
              <div className={`tl ${delivery ? '' : 'pending'}`}>
                <span className="tl-dot">{delivery ? <Icon name="check" size={10} stroke={3.2} /> : '○'}</span>
                <b>{delivery ? 'جاري التوصيل' : 'بانتظار التوصيل'}</b>
                <span>{delivery ? 'حُدّد موعد التوصيل' : 'لم يُطلب بعد'}</span>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <Card>
          <CardHead
            title="مسار المراجعة البشرية"
            sub="الحالة محوّلة لموظف مراجعة، وليست مرفوضة — للمواطن حق استكمال الأدلة."
            aside={<Badge tone="warn">مراجعة</Badge>}
          />
          <div className="g3">
            <div className="tile">
              <span className="tile-ic"><Icon name="alert" size={16} /></span>
              <div><b>1. التحويل</b><p>تصل الحالة للوحة المراجع مع سبب واضح ودليل ناقص محدد.</p></div>
            </div>
            <div className="tile">
              <span className="tile-ic"><Icon name="doc" size={16} /></span>
              <div><b>2. القرار</b><p>موافقة أو رفض مع تسجيل السبب في سجل التدقيق.</p></div>
            </div>
            <div className="tile">
              <span className="tile-ic"><Icon name="users" size={16} /></span>
              <div><b>3. الإشعار</b><p>يصل المواطن إشعار بالنتيجة وإمكانية إعادة المحاولة.</p></div>
            </div>
          </div>
          <div className="foot-row" style={{ marginTop: 18 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-400)' }}>
              هذا المسار هو ما يخفض الحاجة للمراجعة الحضورية من 100 موظف إلى 20.
            </span>
            <Btn onClick={onOpenReview}>فتح لوحة المراجع</Btn>
          </div>
        </Card>
      )}
    </div>
  )
}
