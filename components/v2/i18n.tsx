'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'ru' | 'kk' | 'en';
const KEY = 'md_lang';

const DICT: Record<string, Record<Lang, string>> = {
  // header / nav
  'nav.flats': { ru: 'Квартиры', kk: 'Пәтерлер', en: 'Apartments' },
  'nav.how': { ru: 'Как это работает', kk: 'Қалай жұмыс істейді', en: 'How it works' },
  'nav.calc': { ru: 'Калькулятор', kk: 'Калькулятор', en: 'Calculator' },
  'nav.about': { ru: 'О компании', kk: 'Компания туралы', en: 'About' },
  'nav.investors': { ru: 'Инвесторам', kk: 'Инвесторларға', en: 'Investors' },
  'nav.login': { ru: 'Войти', kk: 'Кіру', en: 'Sign in' },
  'nav.cabinet': { ru: 'Кабинет', kk: 'Кабинет', en: 'Account' },
  'nav.limit': { ru: 'Узнать мой лимит', kk: 'Лимитімді білу', en: 'Check my limit' },
  'nav.home': { ru: 'Главная', kk: 'Басты', en: 'Home' },
  'nav.calcShort': { ru: 'Расчёт', kk: 'Есеп', en: 'Calc' },
  'nav.profile': { ru: 'Профиль', kk: 'Профиль', en: 'Profile' },
  // hero
  'hero.badge': { ru: 'Аренда с выкупом · Казахстан', kk: 'Сатып алу құқығымен жалға алу · Қазақстан', en: 'Rent-to-own · Kazakhstan' },
  'hero.h1a': { ru: 'Квартира в собственность', kk: 'Пәтер меншікке', en: 'Own your apartment' },
  'hero.h1b': { ru: 'без ипотеки', kk: 'ипотекасыз', en: 'without a mortgage' },
  'hero.p': { ru: 'Живите в своей квартире уже сегодня и выкупайте её постепенно. Без подтверждения дохода, взнос от 30%, срок до 30 лет, платёж снижается со временем.', kk: 'Пәтеріңізде бүгіннен бастап тұрыңыз және оны біртіндеп сатып алыңыз. Табысты растаусыз, бастапқы жарна 30%-дан, мерзімі 30 жылға дейін, төлем уақыт өте азаяды.', en: 'Move in today and buy it out step by step. No income proof, 30% down, up to 30 years, payments go down over time.' },
  'hero.cta': { ru: 'Узнать мой лимит за 2 минуты', kk: '2 минутта лимитімді білу', en: 'Check my limit in 2 minutes' },
  'hero.cta2': { ru: 'Смотреть квартиры', kk: 'Пәтерлерді қарау', en: 'Browse apartments' },
  'hero.f1': { ru: 'Без справок о доходах', kk: 'Табыс анықтамасыз', en: 'No income proof' },
  'hero.f2': { ru: 'Взнос от 30%', kk: 'Жарна 30%-дан', en: '30% down' },
  'hero.f3': { ru: 'Срок до 30 лет', kk: '30 жылға дейін', en: 'Up to 30 years' },
  'hero.card': { ru: 'Предварительное одобрение', kk: 'Алдын ала мақұлдау', en: 'Pre-approval' },
  'hero.min': { ru: '2 минуты', kk: '2 минут', en: '2 minutes' },
  'hero.upto': { ru: 'Доступны квартиры до', kk: 'Қолжетімді пәтерлер', en: 'Apartments up to' },
  'hero.monthly': { ru: 'Платёж в месяц', kk: 'Айлық төлем', en: 'Monthly payment' },
  'hero.down': { ru: 'Первый взнос', kk: 'Бастапқы жарна', en: 'Down payment' },
  'hero.calc': { ru: 'Рассчитать мой лимит', kk: 'Лимитімді есептеу', en: 'Calculate my limit' },
  'hero.example': { ru: 'Пример расчёта. Ваш лимит зависит от взноса и срока.', kk: 'Есеп мысалы. Лимит жарна мен мерзімге байланысты.', en: 'Example. Your limit depends on down payment and term.' },
  // sections
  'how.h': { ru: 'Как это работает', kk: 'Қалай жұмыс істейді', en: 'How it works' },
  'how.p': { ru: 'Четыре шага от заявки до ключей. Всё онлайн, договор подписываете в офисе MD.', kk: 'Өтінімнен кілтке дейін төрт қадам. Бәрі онлайн, шартқа MD кеңсесінде қол қоясыз.', en: 'Four steps from application to keys. All online, contract signed at MD office.' },
  'calc.h': { ru: 'Посчитайте платёж', kk: 'Төлемді есептеңіз', en: 'Calculate your payment' },
  'calc.p': { ru: 'Честные цифры без скрытых комиссий. Аренда снижается каждые треть срока.', kk: 'Жасырын комиссиясыз нақты сандар. Жалдау ақысы мерзімнің әр үштен бірінде азаяды.', en: 'Honest numbers, no hidden fees. Rent drops every third of the term.' },
  'calc.full': { ru: 'Полный график по месяцам', kk: 'Айлар бойынша толық кесте', en: 'Full monthly schedule' },
  'catalog.h': { ru: 'Квартиры в аренду с выкупом', kk: 'Сатып алу құқығымен жалға пәтерлер', en: 'Rent-to-own apartments' },
  'catalog.p': { ru: 'На каждой карточке ваш ориентировочный платёж при взносе 30% и сроке 30 лет.', kk: 'Әр карточкада 30% жарна және 30 жыл мерзімдегі болжамды төлем.', en: 'Each card shows your estimated payment at 30% down and 30 years.' },
  'catalog.all': { ru: 'Все квартиры', kk: 'Барлық пәтерлер', en: 'All apartments' },
  'faq.h': { ru: 'Частые вопросы', kk: 'Жиі қойылатын сұрақтар', en: 'FAQ' },
  'faq.p': { ru: 'Не нашли ответ? Напишите нам, отвечаем в рабочее время.', kk: 'Жауап таппадыңыз ба? Бізге жазыңыз.', en: "Didn't find an answer? Write to us." },
  'faq.ask': { ru: 'Задать вопрос', kk: 'Сұрақ қою', en: 'Ask a question' },
  'cta.h': { ru: 'Узнайте свой лимит сегодня', kk: 'Лимитіңізді бүгін біліңіз', en: 'Check your limit today' },
  'cta.p': { ru: 'Пять вопросов, никаких документов. Результат сразу на экране.', kk: 'Бес сұрақ, құжатсыз. Нәтиже бірден экранда.', en: 'Five questions, no documents. Instant result.' },
  'cta.btn': { ru: 'Начать', kk: 'Бастау', en: 'Start' },
  // minicalc
  'mc.price': { ru: 'Стоимость квартиры', kk: 'Пәтер құны', en: 'Apartment price' },
  'mc.down': { ru: 'Первый взнос', kk: 'Бастапқы жарна', en: 'Down payment' },
  'mc.term': { ru: 'Срок выкупа', kk: 'Сатып алу мерзімі', en: 'Buyout term' },
  'mc.months': { ru: 'месяцев', kk: 'ай', en: 'months' },
  'mc.years': { ru: 'лет', kk: 'жыл', en: 'yrs' },
  'mc.toBuy': { ru: 'К выкупу', kk: 'Сатып алуға', en: 'To buy out' },
  'mc.own': { ru: 'В собственность', kk: 'Меншікке', en: 'To equity' },
  'mc.rentTotal': { ru: 'Аренда за срок', kk: 'Мерзімдегі жалдау', en: 'Total rent' },
  'mc.your': { ru: 'Ваш платёж в месяц', kk: 'Айлық төлеміңіз', en: 'Your monthly payment' },
  'mc.cascade': { ru: 'снижается каскадом', kk: 'сатылап азаяды', en: 'steps down' },
  'mc.first': { ru: 'в первые', kk: 'алғашқы', en: 'for the first' },
  'mc.schedule': { ru: 'График по месяцам', kk: 'Айлық кесте', en: 'Monthly schedule' },
  'mc.approve': { ru: 'Получить одобрение', kk: 'Мақұлдау алу', en: 'Get pre-approved' },
  'mc.lead': { ru: 'Оставить заявку с этими условиями', kk: 'Осы шарттармен өтінім қалдыру', en: 'Apply with these terms' },
  'mc.mln': { ru: 'млн', kk: 'млн', en: 'M' },
  // onboarding
  'st.home': { ru: 'На главную', kk: 'Басты бетке', en: 'Home' },
  'st.step': { ru: 'Шаг', kk: 'Қадам', en: 'Step' },
  'st.of': { ru: 'из', kk: '/', en: 'of' },
  'st.city.h': { ru: 'В каком городе ищете квартиру?', kk: 'Қай қалада пәтер іздейсіз?', en: 'Which city are you looking in?' },
  'st.city.p': { ru: 'Мы работаем по всему Казахстану, начиная с крупных городов.', kk: 'Біз бүкіл Қазақстан бойынша жұмыс істейміз.', en: 'We work across Kazakhstan, starting with major cities.' },
  'st.budget.h': { ru: 'Сколько вы готовы платить в месяц?', kk: 'Айына қанша төлеуге дайынсыз?', en: 'How much can you pay monthly?' },
  'st.budget.p': { ru: 'Аренда плюс выкуп. Сумма со временем будет только снижаться.', kk: 'Жалдау және сатып алу. Сома уақыт өте азаяды.', en: 'Rent plus buyout. The amount only goes down over time.' },
  'st.down.h': { ru: 'Сколько есть на первый взнос?', kk: 'Бастапқы жарнаға қанша бар?', en: 'How much do you have for a down payment?' },
  'st.down.p': { ru: 'Минимум 30% от стоимости квартиры. Чем больше взнос, тем выше лимит.', kk: 'Пәтер құнының кемінде 30%. Жарна көп болса, лимит жоғары.', en: 'At least 30% of the price. A bigger down payment means a higher limit.' },
  'st.term.h': { ru: 'На какой срок?', kk: 'Қанша мерзімге?', en: 'For how long?' },
  'st.term.p': { ru: 'Чем дольше срок, тем ниже платёж. Досрочный выкуп возможен в любой момент.', kk: 'Мерзім ұзақ болса, төлем төмен. Мерзімінен бұрын сатып алуға болады.', en: 'Longer term, lower payment. Early buyout anytime.' },
  'st.other': { ru: 'Другая сумма', kk: 'Басқа сома', en: 'Other amount' },
  'st.years': { ru: 'лет', kk: 'жыл', en: 'years' },
  'st.prelim': { ru: 'Предварительно вам доступны квартиры до', kk: 'Алдын ала сізге қолжетімді пәтерлер', en: 'Preliminary, apartments available up to' },
  'st.from': { ru: 'платёж от', kk: 'төлем', en: 'payment from' },
  'st.back': { ru: 'Назад', kk: 'Артқа', en: 'Back' },
  'st.next': { ru: 'Далее', kk: 'Әрі қарай', en: 'Next' },
  'st.result': { ru: 'Показать результат', kk: 'Нәтижені көрсету', en: 'Show result' },
  'st.approved': { ru: 'Предварительное одобрение', kk: 'Алдын ала мақұлдау', en: 'Pre-approval' },
  'st.youUpTo': { ru: 'вам доступны квартиры в', kk: 'сізге қолжетімді пәтерлер:', en: 'apartments available to you in' },
  'st.monthly': { ru: 'Платёж в месяц', kk: 'Айлық төлем', en: 'Monthly payment' },
  'st.downL': { ru: 'Первый взнос', kk: 'Бастапқы жарна', en: 'Down payment' },
  'st.termL': { ru: 'Срок', kk: 'Мерзім', en: 'Term' },
  'st.sent': { ru: 'Заявка отправлена. Менеджер MD свяжется с вами и подберёт квартиру под лимит.', kk: 'Өтінім жіберілді. MD менеджері сізбен хабарласады.', en: 'Request sent. An MD manager will contact you.' },
  'st.get': { ru: 'Получить подборку квартир под лимит', kk: 'Лимитке сай пәтерлер таңдауын алу', en: 'Get apartments matching your limit' },
  'st.getP': { ru: 'Оставьте номер, менеджер пришлёт варианты и ответит на вопросы. Без звонков без вашего согласия.', kk: 'Нөміріңізді қалдырыңыз, менеджер нұсқаларды жібереді.', en: 'Leave your number, a manager will send options. No calls without your consent.' },
  'st.name': { ru: 'Ваше имя', kk: 'Атыңыз', en: 'Your name' },
  'st.send': { ru: 'Отправить', kk: 'Жіберу', en: 'Send' },
  'st.sending': { ru: 'Отправка…', kk: 'Жіберілуде…', en: 'Sending…' },
  'st.fail': { ru: 'Не удалось отправить, попробуйте ещё раз.', kk: 'Жіберілмеді, қайталап көріңіз.', en: 'Failed to send, try again.' },
  'st.schedule': { ru: 'Полный график платежей', kk: 'Толық төлем кестесі', en: 'Full payment schedule' },
  'st.flats': { ru: 'Смотреть квартиры до', kk: 'Пәтерлерді қарау', en: 'See apartments up to' },
  'st.recalc': { ru: 'Пересчитать', kk: 'Қайта есептеу', en: 'Recalculate' },
  'st.fit': { ru: 'Квартиры под ваш лимит', kk: 'Лимитіңізге сай пәтерлер', en: 'Apartments within your limit' },
  'st.upTo': { ru: 'До', kk: 'Дейін', en: 'Up to' },
  'st.after': { ru: 'Через', kk: '', en: 'After' },
  'st.yearsPay': { ru: 'лет платёж', kk: 'жылдан кейін төлем', en: 'years payment' },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const C = createContext<Ctx>({ lang: 'ru', setLang: () => {}, t: k => DICT[k]?.ru ?? k });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru');
  useEffect(() => { try { const l = localStorage.getItem(KEY) as Lang; if (l && ['ru', 'kk', 'en'].includes(l)) setLangState(l); } catch {} }, []);
  const setLang = (l: Lang) => { setLangState(l); try { localStorage.setItem(KEY, l); document.documentElement.lang = l; } catch {} };
  const t = (k: string) => DICT[k]?.[lang] ?? DICT[k]?.ru ?? k;
  return <C.Provider value={{ lang, setLang, t }}>{children}</C.Provider>;
}
export const useT = () => useContext(C);

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useT();
  return (
    <div className={`inline-flex p-0.5 rounded-lg bg-slate-100 text-xs font-semibold ${className}`}>
      {(['ru', 'kk', 'en'] as Lang[]).map(l => (
        <button key={l} type="button" onClick={() => setLang(l)} className={`px-2 h-7 rounded-md uppercase ${lang === l ? 'bg-white text-ink shadow-sm' : 'text-ink-3'}`}>{l === 'kk' ? 'қз' : l}</button>
      ))}
    </div>
  );
}
