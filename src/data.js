import idFemale from './assets/id_female.jpg'
import idMale from './assets/id_male.jpg'

export const STEPS = [
  { n: 1, key: 'guardian', label: 'التحقق من ولي الأمر' },
  { n: 2, key: 'dependent', label: 'اختيار التابع' },
  { n: 3, key: 'consent', label: 'الموافقة والاستعداد' },
  { n: 4, key: 'photo', label: 'صورة الهوية' },
  { n: 5, key: 'liveness', label: 'التحقق المرئي' },
  { n: 6, key: 'confirm', label: 'تأكيد البيانات' },
  { n: 7, key: 'result', label: 'نتيجة التحقق' }
]

export const WEIGHTS = [
  { key: 'nafath', w: 40, name: 'تحقق نفاذ من ولي الأمر', color: '#0a4d33' },
  { key: 'civil', w: 27, name: 'مطابقة السجل المدني', color: '#12784e' },
  { key: 'photo', w: 20, name: 'صورة مطابقة للاشتراطات', color: '#17945f' },
  { key: 'liveness', w: 25, name: 'جلسة حيّة بتحديات حركية', color: '#3cb07c' }
]

export const WMAX = 112
export const THRESHOLD = 75

export const DEPENDENTS = [
  { id: 'lama', name: 'لمى عبدالله الشهري', relation: 'ابنة', gender: 'أنثى', birth: '2015-01-28', nid: '891••••••10', photo: idFemale },
  { id: 'faisal', name: 'فيصل عبدالله الشهري', relation: 'ابن', gender: 'ذكر', birth: '2012-09-02', nid: '657••••••10', photo: idMale },
  { id: 'renad', name: 'ريناد عبدالله الشهري', relation: 'ابنة', gender: 'أنثى', birth: '2014-04-15', nid: '234••••••10', photo: idFemale }
]

export const PHOTO_SAMPLES = { female: idFemale, male: idMale }

export const CHALLENGES = [
  { id: 'blink', title: 'ارمش مرتين', hint: 'رمشة واضحة وبطيئة، ثم انتظر' },
  { id: 'turn', title: 'أدر رأسك يمينًا', hint: 'ببطء، دون تحريك الكتفين' },
  { id: 'mouth', title: 'افتح فمك', hint: 'افتح ثم أغلق ببطء' },
  { id: 'near', title: 'اقترب من الكاميرا', hint: 'اقترب حتى يمتلئ الإطار ثم ارجع' }
]

export const ACCESSIBILITY = [
  { id: 'none', label: 'الوضع القياسي', desc: 'التحديات الحركية المعتادة' },
  { id: 'motor', label: 'حركة محدودة', desc: 'تحديات صوتية بدل الحركية' },
  { id: 'blind', label: 'إعاقة بصرية', desc: 'إرشاد صوتي ونطق أرقام' },
  { id: 'deaf', label: 'إعاقة سمعية', desc: 'إرشاد مرئي مكتوب فقط' },
  { id: 'cog', label: 'صعوبات تعلّم', desc: 'تحدٍّ واحد بسيط ووقت أطول' }
]

export const ACCESSIBILITY_CHALLENGE = {
  motor: { title: 'انطق الأرقام: ٤ ٨ ٢ ١', hint: 'تحدٍّ صوتي بدل الحركة — يكفي وضوح الصوت' },
  blind: { title: 'استمع ثم انطق الأرقام', hint: 'سيُقرأ الرقم صوتيًا، وتردده بصوت واضح' },
  deaf: { title: 'ارمش مرتين', hint: 'إرشاد مرئي مكتوب — لا يوجد تنبيه صوتي' },
  cog: { title: 'انظر للكاميرا فقط', hint: 'تحدٍّ واحد بسيط، والوقت المتاح ضعف المدة' }
}

export const REVIEW_CASES = [
  {
    id: 'TQ-2026-00421',
    name: 'ريناد عبدالله الشهري',
    photo: idFemale,
    score: 68,
    missing: ['liveness'],
    reason: 'لم يكتمل التحدي الحركي — توقف التسجيل قبل نهايته',
    hint: 'لا يمكن الحكم على مطابقة الوجه بدون الجلسة الحيّة — أعِد الجلسة مع المتقدم.'
  },
  {
    id: 'TQ-2026-00422',
    name: 'فيصل عبدالله الشهري',
    photo: idMale,
    score: 61,
    missing: ['civil'],
    reason: 'تعارض في تاريخ الميلاد بين الوثيقة والسجل المدني (فرق يوم واحد)',
    hint: 'راجع الوثيقة المرفقة يدويًا — إن كان تاريخها صحيحًا فوثّق التعارض وأعد التصحيح.'
  },
  {
    id: 'TQ-2026-00423',
    name: 'لمى عبدالله الشهري',
    photo: idFemale,
    score: 72,
    missing: ['photo'],
    reason: 'الصورة غير مقبولة: الوجه مائل عن الوضع المستقيم — راجع وضوح الملامح قبل القرار',
    hint: 'إن كانت الملامح واضحة ويمكن مطابقتها، يمكنك الموافقة مع تسجيل سبب «مطابقة بعد المراجعة اليدوية».'
  }
]

export const EMPTY_EVIDENCE = {
  nafath: false,
  civil: false,
  photo: false,
  liveness: false
}
