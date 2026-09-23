import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { PROFILES } from './data'
import { CITY_IDS, LANGS, UI, formatPrices } from './i18n'
import Logo from './Logo'
import './App.css'

const AGE_KEY = 'fatalmed_age_ok'
const LANG_KEY = 'fatalmed_lang'
const AUDIO_SRC = '/audio/bg.mp3'

function detectLang() {
  const saved = localStorage.getItem(LANG_KEY)
  if (saved && UI[saved]) return saved
  const nav = (navigator.language || 'pt').toLowerCase()
  if (nav.startsWith('es')) return 'es'
  if (nav.startsWith('en')) return 'en'
  return 'pt'
}

function waLink(phone, msg) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
}

function LangSwitch({ lang, onChange }) {
  return (
    <div className="lang" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          className={lang === l.id ? 'lang__btn lang__btn--on' : 'lang__btn'}
          onClick={() => onChange(l.id)}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

function AgeGate({ t, lang, onLang, onConfirm }) {
  return (
    <div className="gate">
      <div className="gate__lang">
        <LangSwitch lang={lang} onChange={onLang} />
      </div>
      <div className="gate__panel">
        <Logo size={52} className="gate__logo" />
        <p className="gate__eyebrow">{t.gateEyebrow}</p>
        <p className="gate__copy">{t.gateCopy}</p>
        <div className="gate__actions">
          <button type="button" className="btn btn--solid" onClick={onConfirm}>
            {t.gateEnter}
          </button>
          <a className="btn btn--ghost" href="https://www.google.com">
            {t.gateExit}
          </a>
        </div>
      </div>
    </div>
  )
}

function ProfileCard({ profile, index, lang, t, cityLabel }) {
  const tags = profile.tags[lang] || profile.tags.pt
  const vibe = profile.vibe[lang] || profile.vibe.pt
  const prices = formatPrices(profile.priceUsd)
  return (
    <article className="card" data-card style={{ '--i': index }}>
      <div className="card__media">
        <img
          src={profile.photo}
          alt={profile.name}
          loading="lazy"
          style={{ objectPosition: profile.focus || 'center 20%' }}
        />
        <div className="card__veil" />
        <span className="card__city">{cityLabel}</span>
        <span className="card__age-badge">18+</span>
      </div>
      <div className="card__body">
        <div className="card__title-row">
          <h3>
            {profile.name} <span>· {profile.age}</span>
          </h3>
          <span className="card__height">{profile.height}</span>
        </div>
        <p className="card__vibe">{vibe}</p>
        <div className="card__price">
          <strong>
            {prices.usd}
            <span> / {t.hour}</span>
          </strong>
          <span>{prices.brl}</span>
          <span>{prices.pyg}</span>
        </div>
        <ul className="card__tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a
          className="btn btn--wa"
          href={waLink(profile.whatsapp, t.waMsg(profile.name, cityLabel))}
          target="_blank"
          rel="noreferrer"
        >
          {t.waCta}
        </a>
      </div>
    </article>
  )
}

export default function App() {
  const [allowed, setAllowed] = useState(false)
  const [lang, setLang] = useState('pt')
  const [city, setCity] = useState('todas')
  const [q, setQ] = useState('')
  const [musicOn, setMusicOn] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)
  const gridRef = useRef(null)

  const t = UI[lang]
  const cities = CITY_IDS.map((id) => ({ id, label: t.cities[id] }))

  useEffect(() => {
    setLang(detectLang())
    if (sessionStorage.getItem(AGE_KEY) === '1') setAllowed(true)
  }, [])

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    const htmlLang = LANGS.find((l) => l.id === lang)?.html || 'pt-BR'
    document.documentElement.lang = htmlLang
    document.title =
      lang === 'en'
        ? 'FatalMed — CDE · Foz · Border'
        : lang === 'es'
          ? 'FatalMed — CDE · Foz · Frontera'
          : 'FatalMed — CDE · Foz · Fronteira'
  }, [lang])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.loop = true
    el.volume = 0.55
    el.muted = muted
  }, [muted])

  const startMusic = () => {
    const el = audioRef.current
    if (!el) return
    el.loop = true
    el.volume = 0.55
    el.muted = false
    setMuted(false)
    const tryPlay = () => {
      el.play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false))
    }
    if (el.readyState >= 2) tryPlay()
    else {
      el.load()
      el.addEventListener('canplay', tryPlay, { once: true })
      tryPlay()
    }
  }

  const confirmAge = () => {
    sessionStorage.setItem(AGE_KEY, '1')
    startMusic()
    setAllowed(true)
  }

  const toggleMusic = () => {
    const el = audioRef.current
    if (!el) return
    if (!musicOn || el.paused) {
      startMusic()
      return
    }
    setMuted((m) => {
      el.muted = !m
      return !m
    })
  }

  const filtered = useMemo(() => {
    return PROFILES.filter((p) => {
      const cityOk = city === 'todas' || p.city === city
      const query = q.trim().toLowerCase()
      const tags = (p.tags[lang] || p.tags.pt).join(' ')
      const cityLabel = t.cities[p.city]
      const qOk =
        !query ||
        p.name.toLowerCase().includes(query) ||
        cityLabel.toLowerCase().includes(query) ||
        tags.toLowerCase().includes(query)
      return cityOk && qOk
    })
  }, [city, q, lang, t])

  useEffect(() => {
    if (!allowed || !gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-card]')
    if (!cards.length) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    gsap.fromTo(
      cards,
      { y: 28, opacity: 0, rotateX: 8 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform',
      }
    )
  }, [allowed, filtered, lang])

  const resultLabel = filtered.length === 1 ? t.results : t.resultsPlural
  const musicLabel = !musicOn ? '▶ Música' : muted ? '♪ Off' : '♪ On'

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        loop
        playsInline
      />

      {!allowed ? (
        <AgeGate t={t} lang={lang} onLang={setLang} onConfirm={confirmAge} />
      ) : (
        <div className="page">
          <div className="atmos" aria-hidden="true" />

          <button
            type="button"
            className={`music__btn ${musicOn && !muted ? 'music__btn--on' : ''}`}
            onClick={toggleMusic}
          >
            {musicLabel}
          </button>

          <header className="top">
            <a className="top__brand" href="#topo">
              <Logo size={34} />
            </a>
            <nav className="top__nav">
              <a href="#lista">{t.navProfiles}</a>
              <a href="#cidades">{t.navCities}</a>
              <a href="#aviso">{t.navNotice}</a>
            </nav>
            <LangSwitch lang={lang} onChange={setLang} />
          </header>

          <main id="topo">
            <section className="hero">
              <p className="hero__kicker">{t.heroKicker}</p>
              <div className="hero__brand">
                <Logo size={64} className="hero__logo" />
              </div>
              <p className="hero__lead">
                {t.heroLeadBefore}{' '}
                <strong>Ciudad del Este</strong>, <strong>Foz do Iguaçu</strong>,
                Puerto Iguazú & Hernandarias. {t.heroLeadAfter}
              </p>
              <div className="hero__meta">
                <span>
                  {PROFILES.length} {t.metaProfiles}
                </span>
                <span>{t.metaUpdated}</span>
                <span>18+</span>
              </div>
            </section>

            <section className="filters" id="cidades">
              <div className="filters__cities" role="tablist">
                {cities.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={city === c.id}
                    className={city === c.id ? 'chip chip--on' : 'chip'}
                    onClick={() => setCity(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <label className="search">
                <span className="sr-only">Search</span>
                <input
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </label>
            </section>

            <section className="grid-wrap" id="lista">
              <div className="grid-head">
                <h2>{t.gridTitle}</h2>
                <p>
                  {filtered.length} {resultLabel}
                  {city !== 'todas' ? ` · ${t.cities[city]}` : ''}
                </p>
              </div>

              {filtered.length === 0 ? (
                <p className="empty">{t.empty}</p>
              ) : (
                <div className="grid" ref={gridRef}>
                  {filtered.map((p, i) => (
                    <ProfileCard
                      key={p.id}
                      profile={p}
                      index={i}
                      lang={lang}
                      t={t}
                      cityLabel={t.cities[p.city]}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="notice" id="aviso">
              <h2>{t.noticeTitle}</h2>
              <ul>
                {t.noticeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </main>

          <footer className="foot">
            <Logo size={28} />
            <span>{t.footRegion}</span>
            <span>© {new Date().getFullYear()}</span>
          </footer>
        </div>
      )}
    </>
  )
}
