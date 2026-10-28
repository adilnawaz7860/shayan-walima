"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WEDDING_START = new Date("2026-12-06T19:00:00+05:30");
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.336984840274!2d83.58417867517728!3d25.59371617745788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991ff007b7f18fd%3A0xd81a71424eade9a!2sTHE%20EDEN%20PALACE!5e0!3m2!1sen!2sin!4v1793170387855!5m2!1sen!2sin";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=The+Eden+Palace+Shekhpura+Ghazipur";
const MUSIC_SRC = "/music.mp3";
const AUTOPLAY_MS = 9000;
const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

type Lang = "en" | "ur";
type Stage = "seal" | "lang" | "story";

const T = {
  en: {
    labels: ["Invitation", "Save the date", "The families", "Walima", "Blessings"],
    coverTitle: "Dawat-e-Walima",
    seal: "Tap the seal to open",
    sealAria: "Open the invitation",
    invitationFor: "Invitation for",
    weddingOf: "The Walima of",
    n1: "Shayan",
    n2: "Iqra",
    and: "and",
    saveDate: "Save the date",
    month: "December",
    year: "2026",
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    dayLine: "Sunday, the 6th of December",
    units: ["Days", "Hours", "Mins", "Secs"],
    mark: "Mark it with joy, إن شاء الله",
    trans: "In the name of Allah, the Most Gracious, the Most Merciful",
    request: "Request the pleasure of your gracious presence to shower your blessings on the occasion of the Walima of",
    groomName: "Shayan Nafees",
    groomRel: "S/O Late Nafees Ahmad",
    groomPlace: "Chandan Shaheed, Ghazipur",
    with: "with",
    brideName: "Iqra Hasan",
    brideRel: "D/O Jb. Shamsul Hasan",
    bridePlace: "Andhaun, Ghazipur",
    receptionTitle: "Walima Reception",
    dateLabel: "Date",
    dateValue: "Sunday, 6 December 2026",
    timeLabel: "Dinner",
    timeValue: "7:00 PM onwards",
    venueLabel: "Venue",
    venueName: "Eden Palace",
    venuePlace: "Shekhpura, Ghazipur",
    mapTitle: "Map of Eden Palace, Shekhpura, Ghazipur",
    mapBtn: "Open in Google Maps",
    dua: "May Allah (SWT) bless this union with love, mercy and barakah.",
    thanks: "Your esteemed presence and heartfelt duas are the greatest blessings we could receive.",
    sign: "With love, Shayan & Iqra",
    again: "Watch again",
    other: "اردو",
    otherLang: "ur" as Lang,
    prev: "Previous slide",
    next: "Next slide",
    goTo: "Go to slide",
    musicOn: "Mute music",
    musicOff: "Play music",
    switchAria: "Switch to Urdu",
  },
  ur: {
    labels: ["دعوت نامہ", "تاریخ", "خاندان", "تقریب", "دعائیں"],
    coverTitle: "دعوتِ ولیمہ",
    seal: "کھولنے کے لیے مہر پر ٹیپ کریں",
    sealAria: "دعوت نامہ کھولیں",
    invitationFor: "دعوت نامہ برائے",
    weddingOf: "ولیمہ",
    n1: "شایان",
    n2: "اقراء",
    and: "اور",
    saveDate: "تاریخ یاد رکھیں",
    month: "دسمبر",
    year: "۲۰۲۶",
    weekdays: ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"],
    dayLine: "اتوار، ۶ دسمبر",
    units: ["دن", "گھنٹے", "منٹ", "سیکنڈ"],
    mark: "خوشی کے ساتھ یاد رکھیے، إن شاء الله",
    trans: "اللہ کے نام سے جو نہایت مہربان، بہت رحم کرنے والا ہے",
    request: "آپ کی گراں قدر شرکت اور دعاؤں کے طلبگار ہیں، ولیمے کی اس مبارک تقریب میں",
    groomName: "شایان نفیس",
    groomRel: "ولد مرحوم نفیس احمد",
    groomPlace: "چندن شہید، غازی پور",
    with: "کے ساتھ",
    brideName: "اقراء حسن",
    brideRel: "دختر جناب شمس الحسن",
    bridePlace: "اندھاؤں، غازی پور",
    receptionTitle: "تقریبِ ولیمہ",
    dateLabel: "تاریخ",
    dateValue: "اتوار، ۶ دسمبر ۲۰۲۶",
    timeLabel: "کھانا",
    timeValue: "شام ۷:۰۰ بجے سے",
    venueLabel: "مقام",
    venueName: "ایڈن پیلس",
    venuePlace: "شیخ پورہ، غازی پور",
    mapTitle: "ایڈن پیلس، شیخ پورہ، غازی پور کا نقشہ",
    mapBtn: "گوگل میپس میں کھولیں",
    dua: "اللہ تعالیٰ اس رشتے کو محبت، رحمت اور برکت عطا فرمائے۔",
    thanks: "آپ کی تشریف آوری اور دعائیں ہمارے لیے سب سے بڑی نعمت ہیں۔",
    sign: "محبت کے ساتھ، شایان اور اقراء",
    again: "دوبارہ دیکھیں",
    other: "English",
    otherLang: "en" as Lang,
    prev: "پچھلی سلائیڈ",
    next: "اگلی سلائیڈ",
    goTo: "سلائیڈ پر جائیں",
    musicOn: "موسیقی بند کریں",
    musicOff: "موسیقی چلائیں",
    switchAria: "Switch to English",
  },
} as const;

const URDU_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const num = (n: number | string, lang: Lang) =>
  lang === "ur" ? String(n).replace(/\d/g, (d) => URDU_DIGITS[Number(d)]) : String(n);

/* December 2026 starts on a Tuesday (index 2 with Sunday first). */
const DEC_OFFSET = 2;
const DEC_DAYS = 31;
const WEDDING_DAY = 6;

function useCountdown() {
  const [left, setLeft] = useState<number[] | null>(null);
  useEffect(() => {
    const tick = () => {
      const s = Math.max(0, Math.floor((WEDDING_START.getTime() - Date.now()) / 1000));
      setLeft([Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

/* A hand-built leafy sprig; used in the corners and on the seal. */
function Sprig({ className }: { className?: string }) {
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const y = 270 - i * 27;
    const side = i % 2 === 0 ? -1 : 1;
    const size = 34 - i * 2.2;
    return { y, side, size };
  });
  return (
    <svg className={className} viewBox="0 0 200 300" aria-hidden="true">
      <path d="M100 300 C 96 210, 108 110, 100 14" fill="none" stroke="currentColor" strokeWidth="2" opacity=".75" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${100 + l.side * 2} ${l.y}) rotate(${l.side * 52})`}>
          <ellipse cx={l.side * l.size * 0.55} cy="0" rx={l.size * 0.6} ry={l.size * 0.22} fill="currentColor" opacity={0.55 - i * 0.02} />
        </g>
      ))}
      <ellipse cx="100" cy="12" rx="6" ry="16" fill="currentColor" opacity=".6" />
    </svg>
  );
}

function Leaves() {
  return (
    <div className="leaves" aria-hidden="true">
      <Sprig className="sp tl" />
      <Sprig className="sp tr" />
      <Sprig className="sp bl" />
      <Sprig className="sp br" />
    </div>
  );
}

export default function Slideshow() {
  const [stage, setStage] = useState<Stage>("seal");
  const [cover, setCover] = useState(true);
  const [opening, setOpening] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const touchX = useRef<number | null>(null);
  const left = useCountdown();

  const t = T[lang];
  const count = t.labels.length;
  const last = count - 1;
  const go = useCallback((i: number) => setIndex(Math.min(last, Math.max(0, i))), [last]);
  const goManual = (i: number) => {
    setAuto(false);
    go(i);
  };

  const openSeal = () => {
    if (opening) return;
    setOpening(true);
    setStage("lang");
    setTimeout(() => setCover(false), 2000);
    const a = audioRef.current;
    if (a) {
      a.volume = 0.5;
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else {
      a.pause();
      setPlaying(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setAuto(true);
  };

  /* Autoplay: advance until the last slide; stops for good once the guest takes over. */
  useEffect(() => {
    if (stage !== "story" || !auto || index >= last) return;
    const id = setTimeout(() => setIndex((i) => Math.min(last, i + 1)), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [stage, auto, index, last]);

  useEffect(() => {
    if (stage !== "story") return;
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)) goManual(index + 1);
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) goManual(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, index]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || stage !== "story") return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) goManual(index + (dx < 0 ? 1 : -1));
  };

  const cls = (i: number) => (i === index ? "slide active" : i < index ? "slide before" : "slide after");
  const dark = stage === "story" && index === last;
  const fmt = (v: number | undefined, i: number) =>
    v === undefined ? "--" : num(i === 0 ? v : String(v).padStart(2, "0"), lang);

  return (
    <main
      className={`show ${lang === "ur" ? "ur" : ""} ${dark ? "dark" : ""}`}
      dir={lang === "ur" ? "rtl" : "ltr"}
      lang={lang}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Walima invitation"
    >
      {/* Instrumental only. Put a Hindi instrumental track at public/music.mp3. */}
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" onError={() => setHasMusic(false)} />

      <Leaves />
      {dark && (
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                width: `${5 + (i % 4) * 3}px`,
                height: `${5 + (i % 4) * 3}px`,
                animationDuration: `${12 + (i % 5) * 3}s`,
                animationDelay: `${-(i * 1.7)}s`,
              }}
            />
          ))}
        </div>
      )}

      {cover && (
        <div className={`cover ${opening ? "opening" : ""}`}>
          <div className="door l" aria-hidden="true"><Sprig className="sp tl" /><Sprig className="sp bl" /></div>
          <div className="door r" aria-hidden="true"><Sprig className="sp tr" /><Sprig className="sp br" /></div>
          <h1 className="cover-title">{T.en.coverTitle}</h1>
          <button className="seal" onClick={openSeal} disabled={opening} aria-label={T.en.sealAria}>
            <span className="half l"><Sprig className="seal-sprig" /></span>
            <span className="half r"><Sprig className="seal-sprig" /></span>
          </button>
          <p className="hint">{T.en.seal}</p>
        </div>
      )}

      {stage === "lang" && (
        <section className="stage lang-stage" aria-label="Choose language">
          <p className="pick" dir="ltr">Please select your language</p>
          <p className="pick urdu-line" lang="ur" dir="rtl">اپنی زبان منتخب کریں۔</p>
          <div className="langs">
            <button className="pill" onClick={() => { setLang("en"); setStage("story"); }}>English</button>
            <button className="pill urdu-btn" lang="ur" onClick={() => { setLang("ur"); setStage("story"); }}>اردو</button>
          </div>
        </section>
      )}

      {stage === "story" && (
        <>
          <section className={cls(0)} aria-hidden={index !== 0} aria-label={t.labels[0]}>
            <p className="eyebrow">{t.invitationFor}</p>
            <p className="serif-sm">{t.weddingOf}</p>
            <h1 className="names">
              <span>{t.n1}</span>
              <span className="and">{t.and}</span>
              <span>{t.n2}</span>
            </h1>
          </section>

          <section className={cls(1)} aria-hidden={index !== 1} aria-label={t.labels[1]}>
            <p className="eyebrow">{t.saveDate}</p>
            <h2 className="serif-md">{t.month}<br />{t.year}</h2>
            <div className="cal" role="table" aria-label={`${t.month} ${t.year}`}>
              {t.weekdays.map((d) => (
                <span key={d} className="wd" role="columnheader">{d}</span>
              ))}
              {Array.from({ length: DEC_OFFSET }, (_, i) => <span key={`b${i}`} />)}
              {Array.from({ length: DEC_DAYS }, (_, i) => (
                <span key={i} role="cell" className={i + 1 === WEDDING_DAY ? "d on" : "d"} aria-current={i + 1 === WEDDING_DAY ? "date" : undefined}>
                  {num(i + 1, lang)}
                </span>
              ))}
            </div>
            <p className="serif-sm">{t.dayLine}</p>
            <ul className="count" dir="ltr">
              {t.units.map((u, i) => (
                <li key={u}>
                  <b>{fmt(left?.[i], i)}</b>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
            <p className="mark">{t.mark}</p>
          </section>

          <section className={cls(2)} aria-hidden={index !== 2} aria-label={t.labels[2]}>
            <p className="arabic" lang="ar" dir="rtl">{BISMILLAH}</p>
            <p className="trans">{t.trans}</p>
            <div className="orn" />
            <p className="request">{t.request}</p>
            <h2 className="serif-md">{t.groomName}</h2>
            <p className="rel">{t.groomRel}<br />{t.groomPlace}</p>
            <p className="with">{t.with}</p>
            <h2 className="serif-md">{t.brideName}</h2>
            <p className="rel">{t.brideRel}<br />{t.bridePlace}</p>
          </section>

          <section className={cls(3)} aria-hidden={index !== 3} aria-label={t.labels[3]}>
            <h2 className="serif-md">{t.receptionTitle}</h2>
            <div className="orn" />
            <div className="facts">
              <div><span className="k">{t.dateLabel}</span><span className="v">{t.dateValue}</span></div>
              <div><span className="k">{t.timeLabel}</span><span className="v">{t.timeValue}</span></div>
              <div><span className="k">{t.venueLabel}</span><span className="v">{t.venueName}<br /><small>{t.venuePlace}</small></span></div>
            </div>
            <div className="map">
              {index === 3 && (
                <iframe title={t.mapTitle} src={MAP_SRC} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
              )}
            </div>
            <a className="pill" href={MAP_LINK} target="_blank" rel="noopener noreferrer" tabIndex={index === 3 ? 0 : -1}>{t.mapBtn}</a>
          </section>

          <section className={cls(4)} aria-hidden={index !== 4} aria-label={t.labels[4]}>
            <p className="arabic" lang="ar" dir="rtl">{BISMILLAH}</p>
            <p className="closing">{t.dua}</p>
            <div className="orn" />
            <p className="closing small">{t.thanks}</p>
            <p className="sign">{t.sign}</p>
            <button className="pill" onClick={restart} tabIndex={index === 4 ? 0 : -1}>{t.again}</button>
          </section>

          <nav className="controls" dir="ltr" aria-label="Slides">
            <button className="arrow" onClick={() => goManual(index - 1)} disabled={index === 0} aria-label={t.prev}>&#8592;</button>
            <div className="dots">
              {t.labels.map((label, i) => (
                <button
                  key={label}
                  className={i === index ? "dot on" : "dot"}
                  onClick={() => goManual(i)}
                  aria-label={`${t.goTo} ${i + 1}: ${label}`}
                  aria-current={i === index}
                />
              ))}
            </div>
            <button className="arrow" onClick={() => goManual(index + 1)} disabled={index === last} aria-label={t.next}>&#8594;</button>
          </nav>
        </>
      )}

      {stage !== "seal" && !cover && (
        <div className="corner" dir="ltr">
          {stage === "story" && (
            <button className="round urdu-btn" lang={t.otherLang} onClick={() => setLang(t.otherLang)} aria-label={t.switchAria}>
              {t.other}
            </button>
          )}
          {hasMusic && (
            <button className="round" onClick={toggleMusic} aria-label={playing ? t.musicOn : t.musicOff} aria-pressed={playing}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                {playing ? (
                  <path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
                ) : (
                  <path d="M3 10v4h4l5 4V6L7 10H3zm14.6 2 2.4-2.4-1.4-1.4-2.4 2.4-2.4-2.4-1.4 1.4 2.4 2.4-2.4 2.4 1.4 1.4 2.4-2.4 2.4 2.4 1.4-1.4z" />
                )}
              </svg>
            </button>
          )}
        </div>
      )}
    </main>
  );
}
