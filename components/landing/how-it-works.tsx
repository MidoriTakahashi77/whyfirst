const steps = [
  {
    number: 1,
    title: 'Whyを言語化',
    description: '解決したい課題と届けたい価値を整理',
  },
  {
    number: 2,
    title: '直感で選ぶ',
    description: '形容詞・色・動き・形を感覚的に選択',
  },
  {
    number: 3,
    title: '画像から抽出',
    description: '好きな画像からカラーパレットを作成',
  },
  {
    number: 4,
    title: 'デザイン生成',
    description: '統一感のあるUIテンプレートを出力',
  },
]

export function HowItWorks() {
  return (
    <section className="w-full max-w-3xl mx-auto border-t border-[#E5E5E5] pt-12">
      <p className="font-medium mb-6 flex items-center gap-2 text-[#171717]">
        <span>💡</span>
        Whyfirstとは？
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">{step.number}</span>
            </div>
            <div>
              <p className="font-medium text-[#171717]">{step.title}</p>
              <p className="text-sm text-[#737373]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
