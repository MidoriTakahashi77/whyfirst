'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSessionStore } from '@/lib/store/session-store'

interface WhyConfirmationProps {
  onEdit: () => void
}

export function WhyConfirmation({ onEdit }: WhyConfirmationProps) {
  const router = useRouter()
  const session = useSessionStore((state) => state.session)
  const goToStep = useSessionStore((state) => state.goToStep)
  const why = session?.why

  const handleConfirm = () => {
    goToStep('mood')
    router.push('/mood')
  }

  if (!why) return null

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-[#F5F5F5] rounded-lg p-8 space-y-4 text-center">
        <p className="text-lg text-[#171717]">
          「<span className="font-medium">{why.who}</span>」は
        </p>
        <p className="text-lg text-[#171717]">
          「<span className="font-medium">{why.problem}</span>」
        </p>
        <p className="text-[#737373]">という課題を抱えている。</p>

        <p className="text-lg text-[#171717] pt-4">このプロダクトは</p>
        <p className="text-lg text-[#171717]">
          「<span className="font-medium">{why.solution}</span>」
        </p>
        <p className="text-[#737373]">ことで解決し、</p>

        <p className="text-lg text-[#171717] pt-4">ユーザーは</p>
        <p className="text-lg text-[#171717]">
          「<span className="font-medium">{why.outcome}</span>」
        </p>
        <p className="text-[#737373]">ようになる。</p>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button variant="secondary" onClick={onEdit}>
          修正する
        </Button>
        <Button onClick={handleConfirm}>これでOK</Button>
      </div>
    </div>
  )
}
