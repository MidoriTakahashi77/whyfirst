'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function LandingPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleStart = () => {
    router.push('/why')
  }

  const steps = [
    {
      number: '01',
      title: 'Whyを言語化',
      description: '解決したい課題と届けたい価値を整理する',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
    {
      number: '02',
      title: '直感で選ぶ',
      description: '形容詞・色・動き・形を感覚的に選択する',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </svg>
      ),
    },
    {
      number: '03',
      title: '画像から抽出',
      description: '好きな画像からカラーパレットを作成する',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
          />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'デザイン生成',
      description: '統一感のあるUIテンプレートを出力する',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen text-[#171717] overflow-hidden relative">
      {/* Base background color */}
      <div className="fixed inset-0 bg-[#FAFAFA]" style={{ zIndex: -2 }} />

      {/* Subtle grid background with parallax */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #171717 1px, transparent 1px), linear-gradient(to bottom, #171717 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transform: `translateY(${scrollY * 0.1}px)`,
          opacity: 0.03,
          zIndex: -1,
        }}
      />

      {/* Animated gradient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(23, 23, 23, 0.02), transparent 40%)`,
          transition: 'background 0.3s ease',
          zIndex: -1,
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {['a', 'b', 'c', 'd', 'e', 'f'].map((id, i) => (
          <div
            key={id}
            className="absolute w-2 h-2 rounded-full bg-[#171717]/5 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div
            className={`flex items-center gap-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <div className="relative w-8 h-8 rounded-lg bg-[#171717] flex items-center justify-center overflow-hidden group cursor-pointer">
              <span className="text-white text-sm font-semibold relative z-10 transition-transform duration-300 group-hover:scale-110">
                W
              </span>
            </div>
            <span className="text-lg tracking-tight font-medium">Whyfirst</span>
          </div>
          <button
            type="button"
            className={`text-sm text-[#737373] hover:text-[#171717] transition-all duration-700 hover:translate-x-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            ログイン
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section ref={heroRef} className="max-w-6xl mx-auto px-6 pt-20 pb-32">
          <div>
            {/* Main Copy */}
            <div className="max-w-3xl">
              <p
                className={`text-[#737373] text-lg mb-6 tracking-wide transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '200ms' }}
              >
                作れる時代だから、
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] mb-8 font-bold tracking-tight">
                <span
                  className={`inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: '400ms' }}
                >
                  「なぜ作るか」が
                </span>
                <br />
                <span
                  className={`inline-block text-[#737373] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: '600ms' }}
                >
                  問われている。
                </span>
              </h1>

              {/* Tagline */}
              <div
                className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <div className="relative inline-block">
                  <p className="text-3xl md:text-4xl tracking-tight font-semibold">Why First.</p>
                  <div
                    className={`absolute -bottom-2 left-0 h-1 bg-[#171717] rounded-full transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`}
                    style={{ transitionDelay: '1200ms' }}
                  />
                </div>
              </div>
            </div>

            {/* Sub Copy */}
            <div
              className={`max-w-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1000ms' }}
            >
              <p className="text-lg text-[#525252] leading-relaxed mb-12">
                課題を深掘りし、あなたの直感で選ぶ。
                <br />
                ブレないデザインが、ここから生まれる。
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1200ms' }}
            >
              <button
                type="button"
                onClick={handleStart}
                className="group relative px-8 py-4 rounded-xl text-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] bg-[#171717] text-white font-medium"
                style={{ boxShadow: '0 8px 30px rgba(23, 23, 23, 0.25)' }}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative z-10 flex items-center gap-3">
                  無料で始める
                  <svg
                    className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className={`mt-20 flex justify-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '2000ms' }}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce-slow">
              <span className="text-xs text-[#A3A3A3] tracking-widest">SCROLL</span>
              <svg
                className="w-4 h-4 text-[#A3A3A3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`h-px bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent transition-all duration-[1500ms] ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
            style={{ transitionDelay: '1400ms' }}
          />
        </div>

        {/* How it Works Section */}
        <section className="max-w-6xl mx-auto px-6 py-32">
          <div>
            {/* Section Header */}
            <div
              className={`flex items-center gap-4 mb-16 transition-all duration-1000 ${scrollY > 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] animate-pulse-slow">
                <svg
                  className="w-5 h-5 text-[#737373]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Whyfirstとは？</h2>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <article
                  key={step.number}
                  className={`group relative p-8 rounded-2xl bg-white border border-[#E5E5E5] transition-all duration-700 hover:border-[#171717]/30 hover:shadow-xl hover:shadow-[#171717]/5 cursor-default ${scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#171717]/5 to-transparent transition-opacity duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-0'}`}
                  />

                  <div className="relative flex items-start justify-between mb-6">
                    <span className="text-sm text-[#A3A3A3] tracking-widest transition-all duration-300 group-hover:text-[#171717] font-mono">
                      {step.number}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl transition-all duration-500 ${activeStep === index ? 'bg-[#171717] text-white scale-110 rotate-3' : 'bg-[#F5F5F5] text-[#737373]'}`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="relative text-xl mb-3 font-semibold transition-all duration-300 group-hover:translate-x-1">
                    {step.title}
                  </h3>
                  <p className="relative text-[#737373] leading-relaxed transition-all duration-300 group-hover:text-[#525252]">
                    {step.description}
                  </p>

                  <div
                    className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-[#171717] to-[#737373] rounded-full transition-all duration-500 ${activeStep === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                  />

                  <div
                    className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#171717]/10 rounded-tr-lg transition-all duration-500 ${activeStep === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="max-w-6xl mx-auto px-6 pb-32 relative z-20">
          <div
            className={`relative rounded-3xl bg-[#E8E8E8] text-[#171717] p-12 md:p-16 transition-all duration-1000 ${scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.05] rounded-3xl overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #171717 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Gradient orbs - more visible */}
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, #D4D4D4 0%, transparent 70%)',
                opacity: 0.6,
              }}
            />
            <div
              className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, #C4C4C4 0%, transparent 70%)',
                opacity: 0.5,
                animationDelay: '2s',
              }}
            />

            <div className="relative z-10 max-w-2xl">
              <p
                className={`text-[#737373] text-sm uppercase tracking-widest mb-6 transition-all duration-700 ${scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '100ms' }}
              >
                Why it matters
              </p>
              <h2 className="text-3xl md:text-4xl leading-snug mb-8 font-semibold">
                <span
                  className={`inline-block text-[#171717] transition-all duration-700 ${scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  AIがデザインを生成できる時代。
                </span>
                <br />
                <span className="text-[#525252]">
                  <span
                    className={`inline-block transition-all duration-700 ${scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    でも「何を作るか」は、
                  </span>
                  <br />
                  <span
                    className={`inline-block transition-all duration-700 ${scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    あなたにしか決められない。
                  </span>
                </span>
              </h2>
              <p
                className={`text-[#525252] text-lg leading-relaxed mb-10 transition-all duration-700 ${scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '500ms' }}
              >
                Whyfirstは、課題と価値から始めることで、
                <br />
                あなたの直感とプロダクトの本質が一致した
                <br />
                デザインを導き出します。
              </p>
              <button
                type="button"
                onClick={handleStart}
                className={`group flex items-center gap-3 px-6 py-3 rounded-xl text-base transition-all duration-500 hover:scale-105 active:scale-95 bg-[#171717] text-white font-medium ${scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '600ms', boxShadow: '0 4px 14px rgba(23, 23, 23, 0.25)' }}
              >
                無料で始める
                <svg
                  className="w-4 h-4 transition-all duration-500 group-hover:translate-x-2 group-hover:-rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>

            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-[#171717]/10 animate-spin-slow" />
            <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full border border-[#171717]/10 animate-spin-slow-reverse" />
            <div className="absolute right-10 bottom-10 w-40 h-40 rounded-full border border-[#171717]/5 animate-pulse-slow" />
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          className={`max-w-6xl mx-auto px-6 pb-32 text-center transition-all duration-1000 ${scrollY > 900 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h2 className="text-3xl md:text-4xl mb-6 font-semibold">さあ、始めよう。</h2>
          <p className="text-[#737373] text-lg mb-10">あなたのWhyを、形にする時間です。</p>
          <button
            type="button"
            onClick={handleStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-[#171717] text-white font-medium"
            style={{ boxShadow: '0 8px 30px rgba(23, 23, 23, 0.3)' }}
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">無料で始める</span>
            <svg
              className="relative z-10 w-5 h-5 transition-all duration-500 group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-6 h-6 rounded-md bg-[#171717] flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <span className="text-white text-xs font-semibold">W</span>
              </div>
              <span className="text-sm text-[#737373] transition-colors duration-300 group-hover:text-[#171717]">
                Whyfirst
              </span>
            </div>
            <p className="text-sm text-[#A3A3A3]">© 2024 Whyfirst. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
