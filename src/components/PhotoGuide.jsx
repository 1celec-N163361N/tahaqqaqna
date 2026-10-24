import React, { useEffect } from 'react'
import { Btn, Icon } from './ui'

const RULES = [
  { icon: 'camera', t: 'انظري إلى عدسة الكاميرا' },
  { icon: 'users', t: 'الطرحة على حدود الوجه' },
  { icon: 'alert', t: 'تعبير محايد بلا ابتسامة' },
  { icon: 'sun', t: 'خلفية فاتحة وإضاءة متوازنة' }
]

export default function PhotoGuide({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="gmodal" role="dialog" aria-modal="true" aria-label="كيف تجهّز صورتك" onClick={onClose}>
      <div className="gmodal-card" onClick={(e) => e.stopPropagation()}>
        <header className="gmodal-head">
          <div>
            <h3>كيف تجهّز صورتك؟</h3>
            <p>عشر ثوانٍ توضّح الاشتراطات — كما يُقال لك في مركز الأحوال المدنية.</p>
          </div>
          <button className="gmodal-x" onClick={onClose} aria-label="إغلاق">
            <Icon name="close" size={15} stroke={2.2} />
          </button>
        </header>

        <div className="gmodal-video">
          <video
            src="./tahaqqaqna_photo_guide.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
          />
        </div>

        <ul className="gmodal-chips">
          {RULES.map((r) => (
            <li key={r.t}>
              <Icon name={r.icon} size={13} />
              {r.t}
            </li>
          ))}
        </ul>

        <div className="gmodal-foot">
          <span className="gmodal-note">
            <Icon name="info" size={12} />
            الفيديو إرشادي — لا يُرسل أي شيء إلى أي جهة.
          </span>
          <Btn size="sm" onClick={onClose}>
            <Icon name="check" size={13} stroke={2.4} />
            ابدأ التصوير
          </Btn>
        </div>
      </div>
    </div>
  )
}
