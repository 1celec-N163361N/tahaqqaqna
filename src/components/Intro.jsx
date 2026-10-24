import React, { useState } from 'react'
import { Btn, Icon } from './ui'
import { BrandMark } from './Stepper'
import poster from '../assets/video_poster.jpg'

export default function Intro({ onStart, onReview }) {
  const [vErr, setVErr] = useState(false)

  return (
    <section className="intro">
      <div className="intro-head">
        <span className="ph-eyebrow">
          <span className="sq" />
          العرض التعريفي
        </span>
        <h1 className="page-title">إصدار الهوية الوطنية لأول مرة… عن بُعد</h1>
        <p className="page-sub">
          فيديو تعريفي قصير يشرح الفكرة في ٣٤ ثانية — ثم تبدأ الرحلة خطوة بخطوة.
        </p>
      </div>

      <div className="intro-media">
        <video
          className="intro-video"
          src={`${import.meta.env.BASE_URL}tahaqqaqna_explainer.mp4`}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          onError={() => setVErr(true)}
        />
        {vErr && (
          <div className="intro-vmiss">
            <Icon name="info" size={15} />
            <span>
              ضع ملف <code>tahaqqaqna_explainer.mp4</code> في نفس مجلد هذا الملف لتشغيل الفيديو.
            </span>
          </div>
        )}
      </div>

      <div className="intro-actions">
        <Btn onClick={onStart}>
          ابدأ الرحلة
          <Icon name="chev" size={14} />
        </Btn>
        <Btn variant="ghost" onClick={onReview}>
          <Icon name="grid" size={13} />
          لوحة المراجع البشري
        </Btn>
        <span className="intro-note">
          <BrandMark size={15} />
          نموذج تجريبي — جميع الخطوات محاكاة
        </span>
      </div>

      <ul className="intro-cards">
        {HIGHLIGHTS.map((h) => (
          <li className="icard" key={h.title}>
            <span className="icard-ico">
              <Icon name={h.icon} size={16} />
            </span>
            <h3 className="icard-title">{h.title}</h3>
            <p className="icard-text">{h.text}</p>
          </li>
        ))}
      </ul>

      <div className="intro-path">
        <span className="intro-path-label">مسار الرحلة</span>
        <ol className="intro-path-list">
          {PATH.map((p, i) => (
            <li key={p}>
              <span className="ipl-n">{i + 1}</span>
              {p}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const HIGHLIGHTS = [
  {
    icon: 'camera',
    title: 'لقطة حيّة تحت الطلب',
    text: 'تحدٍّ عشوائي للحركة يمنع الصور الثابتة ومقاطع الفيديو المعاد تشغيلها.'
  },
  {
    icon: 'shield',
    title: 'مطابقة السجل المدني',
    text: 'مقارنة آلية للبيانات والصورة مع السجل الرسمي قبل الإصدار.'
  },
  {
    icon: 'sparkle',
    title: 'درجة ثقة قابلة للتفسير',
    text: 'درجة مركّبة مع أسباب واضحة لكل قرار — لا صندوق أسود.'
  },
  {
    icon: 'users',
    title: 'مراجعة بشرية عند الحاجة',
    text: 'لوحة مراجع للحالات الحدّية والاستثناءات، بقرار موثّق.'
  }
]

const PATH = ['التحقق من مقدم الطلب', 'اختيار النمط', 'الموافقة والاستعداد', 'صورة الهوية', 'التحقق الحيوي', 'تأكيد البيانات', 'نتيجة التحقق']
