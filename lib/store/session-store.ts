import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Session, Step } from '../../types'

interface SessionState {
  session: Session | null

  // Actions
  createSession: (mode?: 'full' | 'quick') => void
  updateSession: (updates: Partial<Session>) => void
  goToStep: (step: Step) => void
  resetSession: () => void

  // DB同期用（認証後）
  syncToDb: () => Promise<void>
  loadFromDb: (sessionId: string) => Promise<void>
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      session: null,

      createSession: (mode = 'full') => {
        const newSession: Session = {
          id: crypto.randomUUID(),
          mode,
          currentStep: 'why',
          detectedLanguage: 'ja',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          why: null,
          mood: null,
          colour: null,
          movement: null,
          shape: null,
          space: null,
          images: null,
          moodboard: null,
          design: null,
        }
        set({ session: newSession })
      },

      updateSession: (updates) => {
        const { session } = get()
        if (!session) return

        set({
          session: {
            ...session,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        })
      },

      goToStep: (step) => {
        const { session } = get()
        if (!session) return

        set({
          session: {
            ...session,
            currentStep: step,
            updatedAt: new Date().toISOString(),
          },
        })
      },

      resetSession: () => {
        set({ session: null })
      },

      syncToDb: async () => {
        const { session } = get()
        if (!session) return

        // TODO: Supabase連携後に実装
        // await supabase.from('sessions').upsert(session)
      },

      loadFromDb: async (_sessionId) => {
        // TODO: Supabase連携後に実装
        // const { data } = await supabase.from('sessions').select().eq('id', sessionId).single()
        // if (data) set({ session: data })
      },
    }),
    {
      name: 'whyfirst-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ session: state.session }),
    }
  )
)

// セレクター（パフォーマンス最適化用）
export const useSession = () => useSessionStore((state) => state.session)
export const useCurrentStep = () => useSessionStore((state) => state.session?.currentStep)
