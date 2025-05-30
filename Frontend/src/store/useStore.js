import { create } from "zustand"

const useStore = create((set) => ({
  // Navigation state
  isMenuOpen: false,
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),

  // User state
  user: null,
  setUser: (user) => set({ user }),

  // Theme state
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  // Loading states
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))

export default useStore
