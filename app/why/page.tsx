'use client'

import { useState } from 'react'
import { StepLayout, StepMain } from '@/components/steps'
import { WhyConfirmation } from '@/components/steps/why/why-confirmation'
import { WhyForm } from '@/components/steps/why/why-form'

export default function WhyPage() {
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <StepLayout>
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
        <span className="text-xl font-bold text-[#171717]">Whyfirst</span>
        <span className="text-sm text-[#737373]">1 / 7</span>
      </header>
      <StepMain>
        {showConfirmation ? (
          <WhyConfirmation onEdit={() => setShowConfirmation(false)} />
        ) : (
          <>
            <div className="text-center mb-12">
              <p className="text-sm tracking-widest text-[#737373] mb-2">STEP 01</p>
              <h1 className="text-xl md:text-3xl font-bold text-[#171717] mb-3">
                あなたのWhyを言語化する
              </h1>
              <p className="text-[#737373]">
                4つの質問に答えて、プロダクトの本質を明確にしましょう
              </p>
            </div>
            <WhyForm onConfirm={() => setShowConfirmation(true)} />
          </>
        )}
      </StepMain>
    </StepLayout>
  )
}
