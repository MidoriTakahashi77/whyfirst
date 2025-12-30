import { cn } from '@/lib/utils/cn'

interface StepLayoutProps {
  children: React.ReactNode
  className?: string
}

export function StepLayout({ children, className }: StepLayoutProps) {
  return (
    <div className={cn('min-h-screen flex flex-col bg-[#FAFAFA] text-[#171717]', className)}>
      {children}
    </div>
  )
}

interface StepMainProps {
  children: React.ReactNode
  className?: string
}

export function StepMain({ children, className }: StepMainProps) {
  return <main className={cn('flex-1 container mx-auto px-4 py-8', className)}>{children}</main>
}

interface StepFooterProps {
  children: React.ReactNode
  className?: string
}

export function StepFooter({ children, className }: StepFooterProps) {
  return (
    <footer
      className={cn('sticky bottom-0 bg-white border-t border-[#E5E5E5] py-4 px-4', className)}
    >
      <div className="container mx-auto flex justify-between items-center">{children}</div>
    </footer>
  )
}
