'use client'

import { useRouter } from 'next/navigation'
import { StepLayout, StepMain } from '@/components/steps'
import { MoodSelector } from '@/components/steps/mood/mood-selector'
import { SelectedMoods } from '@/components/steps/mood/selected-moods'
import { useSessionStore } from '@/lib/store/session-store'

export default function MoodPage() {
  const router = useRouter()
  const goToStep = useSessionStore((state) => state.goToStep)

  const handleNext = () => {
    goToStep('colour')
    router.push('/colour')
  }

  return (
    <StepLayout>
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
        <span className="text-xl font-bold text-[#171717]">Whyfirst</span>
        <span className="text-sm text-[#737373]">2 / 7</span>
      </header>
      <div className="flex-1 flex">
        <StepMain className="flex-1">
          <div className="text-center mb-12">
            <p className="text-sm tracking-widest text-[#737373] mb-2">STEP 02</p>
            <h1 className="text-xl md:text-3xl font-bold text-[#171717] mb-3">Moodを選ぶ</h1>
            <p className="text-[#737373]">プロダクトの印象を表す形容詞を選んでください</p>
          </div>
          <MoodSelector onNext={handleNext} />
        </StepMain>

        {/* Side panel - desktop only */}
        <aside className="hidden lg:block w-64 border-l border-[#E5E5E5] p-6">
          <h3 className="text-sm font-medium text-[#737373] mb-4">選択中のMood</h3>
          <SelectedMoods />
        </aside>
      </div>
    </StepLayout>
  )
}
