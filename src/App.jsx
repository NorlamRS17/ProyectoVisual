import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Menu } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/** Marivson DC — Landing cinematográfica Preset C (Señal Brutalista) */

// --- NAVBAR ---
function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0.1, rootMargin: '-80px 0px 0px 0px' }
    )
    const hero = document.getElementById('hero')
    if (hero) obs.observe(hero)
    return () => hero && obs.unobserve(hero)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-[2rem] transition-all duration-300 ${
        scrolled ? 'bg-blanco/60 backdrop-blur-xl border border-papel/50 text-negro' : 'bg-transparent text-white'
      }`}
    >
      <div className="flex items-center justify-between gap-8 max-w-5xl">
        <a href="#" className="font-sans font-bold text-lg tracking-tight hover:-translate-y-0.5 transition-transform">
          Marivson DC
        </a>
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
          <Menu className="w-6 h-6" />
        </button>
        <div className={`${mobileOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-4 md:gap-8`}>
          <a href="#caracteristicas" className="hover:-translate-y-0.5 transition-transform text-sm">Características</a>
          <a href="#filosofia" className="hover:-translate-y-0.5 transition-transform text-sm">Filosofía</a>
          <a href="#protocolo" className="hover:-translate-y-0.5 transition-transform text-sm">Proceso</a>
          <a href="#explorar" className="inline-flex items-center gap-2 px-5 py-2.5 bg-rojo text-white rounded-[2rem] font-medium text-sm overflow-hidden group hover:scale-[1.03] transition-transform duration-300" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            <span>Explorar colección</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </nav>
  )
}

// --- HERO ---
function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-end justify-start overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/60 to-transparent" />
      <div ref={contentRef} className="relative z-10 px-6 md:px-12 pb-[20vh] max-w-4xl">
        <h1 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white mb-4">
          Eleva el
        </h1>
        <p className="font-serif italic text-5xl md:text-8xl lg:text-9xl text-white leading-none mb-8" style={{ letterSpacing: '-0.02em' }}>
          estilo diario.
        </p>
        <a
          href="#explorar"
          className="inline-flex items-center gap-2 px-8 py-4 bg-rojo text-white rounded-[2rem] font-medium overflow-hidden group hover:scale-[1.03] transition-transform duration-300"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        >
          Explorar colección
          <ChevronRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}

// --- CARACTERÍSTICAS ---
function BarajadorCard({ items }) {
  const [stack, setStack] = useState(items)
  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-32 flex items-center justify-center">
      {stack.map((item, i) => (
        <div
          key={item}
          className="absolute w-full max-w-[200px] px-4 py-2 bg-papel/80 border border-papel rounded-xl font-mono text-sm text-negro text-center"
          style={{
            transform: `translateY(${(i - 1) * 12}px) scale(${1 - i * 0.08})`,
            zIndex: 3 - i,
            opacity: 1 - i * 0.2,
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

function TypewriterCard({ messages }) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const msg = messages[idx]
    if (charIdx > msg.length) return
    if (charIdx === msg.length) {
      const t = setTimeout(() => {
        setIdx((i) => (i + 1) % messages.length)
        setCharIdx(0)
      }, 1500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setText(msg.slice(0, charIdx + 1))
      setCharIdx((c) => c + 1)
    }, 80)
    return () => clearTimeout(t)
  }, [charIdx, idx, messages])

  return (
    <div className="font-mono text-sm text-negro min-h-[120px]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-rojo font-medium">Feed en Vivo</span>
        <span className="w-2 h-2 rounded-full bg-rojo animate-pulse" />
      </div>
      <p className="text-negro">{text}<span className="inline-block w-2 h-4 bg-rojo ml-0.5 animate-pulse" /></p>
    </div>
  )
}

function CursorCard({ labels }) {
  const [active, setActive] = useState(null)
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

  useEffect(() => {
    const seq = [0, 1, 2, 3]
    let i = 0
    const id = setInterval(() => {
      setActive(seq[i % 4])
      i++
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {days.map((d, i) => (
          <button
            key={d}
            onClick={() => setActive(i)}
            className={`w-10 h-10 rounded-xl font-mono text-sm font-bold transition-all ${
              active === i ? 'bg-rojo text-white scale-95' : 'bg-papel/80 text-negro'
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <p className="font-mono text-xs text-negro/70">{labels[active ?? 0]}</p>
    </div>
  )
}

function Caracteristicas() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const props1 = ['Calidad premium', 'Materiales seleccionados', 'Acabados impecables']
  const props2 = ['Una prenda, múltiples ocasiones. Versatilidad sin esfuerzo.', 'De oficina a calle. Diseño que se adapta.', 'Menos armario, más estilo.']
  const props3 = ['Elige tu día', 'Define tu look', 'Comunica quién eres', 'Identidad propia']

  return (
    <section id="caracteristicas" ref={sectionRef} className="py-24 px-6 bg-blanco">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-negro mb-16 text-center">
          Características
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="bg-blanco border border-papel rounded-[2rem] p-8 shadow-lg"
          >
            <h3 className="font-sans font-bold text-lg text-negro mb-2">Calidad que perdura</h3>
            <p className="text-negro/70 text-sm mb-6">Materiales seleccionados, acabados impecables.</p>
            <BarajadorCard items={props1} />
          </div>
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="bg-blanco border border-papel rounded-[2rem] p-8 shadow-lg"
          >
            <h3 className="font-sans font-bold text-lg text-negro mb-2">Versatilidad sin esfuerzo</h3>
            <p className="text-negro/70 text-sm mb-6">Una prenda, múltiples ocasiones.</p>
            <TypewriterCard messages={props2} />
          </div>
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="bg-blanco border border-papel rounded-[2rem] p-8 shadow-lg"
          >
            <h3 className="font-sans font-bold text-lg text-negro mb-2">Identidad propia</h3>
            <p className="text-negro/70 text-sm mb-6">Diseños que comunican quién eres.</p>
            <CursorCard labels={props3} />
          </div>
        </div>
      </div>
    </section>
  )
}

// --- FILOSOFÍA ---
function Filosofia() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="filosofia" ref={sectionRef} className="relative py-32 px-6 bg-negro overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=60"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center" ref={textRef}>
        <p className="text-white/70 text-lg md:text-xl mb-8">
          La mayoría de la moda se enfoca en: tendencias efímeras y producción masiva.
        </p>
        <p className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
          Nosotros nos enfocamos en:{' '}
          <span className="text-rojo">prenda con propósito.</span>
        </p>
      </div>
    </section>
  )
}

// --- PROTOCOLO ---
function Protocolo() {
  const steps = [
    { n: '01', title: 'Explora', desc: 'Navega la colección. Cada pieza está diseñada para durar.' },
    { n: '02', title: 'Descubre', desc: 'Encuentra tu fit. Cortes que se adaptan a tu cuerpo.' },
    { n: '03', title: 'Viste', desc: 'Tu día, tu estilo. Sin complicaciones.' },
  ]

  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: true,
        })
        if (i > 0) {
          gsap.to(cardsRef.current[i - 1], {
            scale: 0.9,
            filter: 'blur(20px)',
            opacity: 0.5,
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top top', scrub: true },
          })
        }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="protocolo" className="relative">
      {steps.map((step, i) => (
        <div
          key={step.n}
          ref={(el) => (cardsRef.current[i] = el)}
          className="min-h-[100dvh] flex items-center justify-center px-6 bg-blanco relative"
        >
          <div className="max-w-2xl text-center">
            <span className="font-mono text-rojo text-sm mb-4 block">{step.n}</span>
            <h3 className="font-sans font-bold text-4xl md:text-5xl text-negro mb-6">{step.title}</h3>
            <p className="text-negro/70 text-lg">{step.desc}</p>
          </div>
          {/* Animación SVG por tarjeta */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {i === 0 && (
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#E63B2E" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'spin 20s linear infinite' }} />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#E63B2E" strokeWidth="1" strokeDasharray="3 3" style={{ animation: 'spin 15s linear infinite reverse' }} />
                <circle cx="100" cy="100" r="40" fill="none" stroke="#E63B2E" strokeWidth="1" strokeDasharray="2 2" style={{ animation: 'spin 10s linear infinite' }} />
              </svg>
            )}
            {i === 1 && (
              <svg className="absolute top-1/2 left-0 w-full h-1 opacity-20" viewBox="0 0 400 4">
                <line x1="0" y1="2" x2="400" y2="2" stroke="#E63B2E" strokeWidth="2" strokeDasharray="8 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
                </line>
              </svg>
            )}
            {i === 2 && (
              <svg className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-16 opacity-15" viewBox="0 0 256 64">
                <path d="M0,32 Q32,8 64,32 T128,32 T192,32 T256,32" fill="none" stroke="#E63B2E" strokeWidth="2" strokeDasharray="128" strokeDashoffset="128">
                  <animate attributeName="stroke-dashoffset" from="128" to="0" dur="1.5s" repeatCount="indefinite" fill="freeze" />
                </path>
              </svg>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}

// --- EXPLORAR (CTA) ---
function Explorar() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="explorar" ref={ref} className="py-32 px-6 bg-papel">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-negro mb-6">
          Explorar colección
        </h2>
        <p className="text-negro/70 text-lg mb-10">
          Descubre las piezas que definen tu día a día.
        </p>
        <a
          href="#hero"
          className="inline-flex items-center gap-2 px-10 py-5 bg-rojo text-white rounded-[2rem] font-bold text-lg overflow-hidden hover:scale-[1.03] transition-transform duration-300"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        >
          Ver colección
          <ChevronRight className="w-6 h-6" />
        </a>
      </div>
    </section>
  )
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-negro text-white rounded-t-[4rem] px-8 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-sans font-bold text-xl mb-2">Marivson DC</p>
          <p className="text-white/70 text-sm">Prendas que elevan tu día a día.</p>
        </div>
        <div>
          <p className="font-mono text-xs text-white/50 mb-4">NAVEGACIÓN</p>
          <a href="#caracteristicas" className="block text-sm text-white/80 hover:text-white mb-2">Características</a>
          <a href="#filosofia" className="block text-sm text-white/80 hover:text-white mb-2">Filosofía</a>
          <a href="#protocolo" className="block text-sm text-white/80 hover:text-white">Proceso</a>
        </div>
        <div>
          <p className="font-mono text-xs text-white/50 mb-4">ESTADO</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-sm">Sistema Operativo</span>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-white/50 text-sm">© Marivson DC. Solo visualización.</p>
      </div>
    </footer>
  )
}

// --- APP ---
export default function App() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Caracteristicas />
        <Filosofia />
        <Protocolo />
        <Explorar />
      </main>
      <Footer />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
