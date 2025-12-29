import { create } from 'zustand'

interface UIState {
  // Export Modal
  isExportModalOpen: boolean
  openExportModal: () => void
  closeExportModal: () => void

  // Loading states
  isGenerating: boolean
  setIsGenerating: (value: boolean) => void

  // Sidebar
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isExportModalOpen: false,
  openExportModal: () => set({ isExportModalOpen: true }),
  closeExportModal: () => set({ isExportModalOpen: false }),

  isGenerating: false,
  setIsGenerating: (value) => set({ isGenerating: value }),

  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
