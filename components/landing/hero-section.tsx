'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/why')
  }

  return (
    <section className="text-center max-w-2xl mx-auto mb-16">
      <p className="text-xl md:text-2xl mb-4 text-[#171717]">
        作れる時代だから、「なぜ作るか」が問われている。
      </p>
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-[#171717]">Why First.</h1>
      <p className="text-lg text-[#737373] mb-8">
        課題を深掘りし、あなたの直感で選ぶ。
        <br />
        ブレないデザインが、ここから生まれる。
      </p>
      <Button size="lg" onClick={handleStart}>
        はじめる
      </Button>
    </section>
  )
}
