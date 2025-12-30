'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSessionStore } from '@/lib/store/session-store'
import { detectLanguage } from '@/lib/utils/detect-language'

interface WhyFormData {
  who: string
  problem: string
  solution: string
  outcome: string
}

interface WhyFormProps {
  onConfirm: () => void
}

const questions = [
  {
    key: 'who' as const,
    number: '01',
    label: '誰のためのプロダクトですか？',
    placeholder: '例：フリーランスのデザイナー',
  },
  {
    key: 'problem' as const,
    number: '02',
    label: 'その人はどんな課題を抱えていますか？',
    placeholder: '例：案件ごとの請求管理が煩雑で漏れが発生する',
  },
  {
    key: 'solution' as const,
    number: '03',
    label: 'このプロダクトでどう解決しますか？',
    placeholder: '例：案件と請求を紐づけて自動でリマインドする',
  },
  {
    key: 'outcome' as const,
    number: '04',
    label: '使った後、ユーザーはどう変わりますか？',
    placeholder: '例：請求漏れの不安から解放され、本業に集中できる',
  },
]

function buildRawInput(data: WhyFormData): string {
  return `「${data.who}」は「${data.problem}」という課題を抱えている。このプロダクトは「${data.solution}」ことで解決し、ユーザーは「${data.outcome}」ようになる。`
}

export function WhyForm({ onConfirm }: WhyFormProps) {
  const session = useSessionStore((state) => state.session)
  const updateSession = useSessionStore((state) => state.updateSession)

  const [formData, setFormData] = useState<WhyFormData>({
    who: session?.why?.who ?? '',
    problem: session?.why?.problem ?? '',
    solution: session?.why?.solution ?? '',
    outcome: session?.why?.outcome ?? '',
  })

  const isComplete = Object.values(formData).every((v) => v.trim().length > 0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const allText = Object.values(formData).join(' ')
      if (allText.trim()) {
        const detectedLanguage = detectLanguage(allText)
        const rawInput = buildRawInput(formData)
        updateSession({
          why: { ...formData, rawInput },
          detectedLanguage,
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [formData, updateSession])

  const handleChange = (key: keyof WhyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      {questions.map((q) => (
        <div key={q.key} className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#737373]">Q{q.number}</span>
            <span className="font-medium text-[#171717]">{q.label}</span>
          </div>
          <input
            type="text"
            value={formData[q.key]}
            onChange={(e) => handleChange(q.key, e.target.value)}
            placeholder={q.placeholder}
            className="w-full px-4 py-4 bg-[#F5F5F5] rounded-xl text-[#171717] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#171717]/10"
          />
        </div>
      ))}

      <div className="flex justify-center pt-6">
        <Button
          onClick={onConfirm}
          disabled={!isComplete}
          className="px-8 py-3 bg-[#171717] text-white rounded-lg hover:bg-[#2d2d2d] disabled:opacity-50"
        >
          次へ
        </Button>
      </div>
    </div>
  )
}
