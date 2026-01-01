'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSessionStore } from '@/lib/store/session-store'
import { Phase1Selection } from './phase1-selection'
import { Phase2MainSelect } from './phase2-main-select'
import { Phase3ColorExtraction } from './phase3-color-extraction'

type Phase = 1 | 2 | 3

export function ImagePhaseManager() {
  const router = useRouter()
  const goToStep = useSessionStore((state) => state.goToStep)
  const [phase, setPhase] = useState<Phase>(1)

  const handlePhase1Complete = () => {
    setPhase(2)
  }

  const handlePhase2Complete = () => {
    setPhase(3)
  }

  const handlePhase3Complete = () => {
    goToStep('moodboard')
    router.push('/moodboard')
  }

  const handleBack = () => {
    goToStep('space')
    router.push('/space')
  }

  const handleBackToPhase1 = () => {
    setPhase(1)
  }

  const handleBackToPhase2 = () => {
    setPhase(2)
  }

  switch (phase) {
    case 1:
      return <Phase1Selection onComplete={handlePhase1Complete} onBack={handleBack} />
    case 2:
      return <Phase2MainSelect onBack={handleBackToPhase1} onComplete={handlePhase2Complete} />
    case 3:
      return <Phase3ColorExtraction onBack={handleBackToPhase2} onComplete={handlePhase3Complete} />
  }
}
