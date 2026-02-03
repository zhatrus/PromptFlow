import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface AppState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  completedParts: string[];
  markPartComplete: (partId: string) => void;
  markPartIncomplete: (partId: string) => void;
  isPartComplete: (partId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      favorites: [],
      addFavorite: (id) => set((state) => ({ 
        favorites: [...state.favorites, id] 
      })),
      removeFavorite: (id) => set((state) => ({ 
        favorites: state.favorites.filter((f) => f !== id) 
      })),
      isFavorite: (id) => get().favorites.includes(id),
      completedParts: [],
      markPartComplete: (partId) => set((state) => ({
        completedParts: state.completedParts.includes(partId) 
          ? state.completedParts 
          : [...state.completedParts, partId]
      })),
      markPartIncomplete: (partId) => set((state) => ({
        completedParts: state.completedParts.filter((p) => p !== partId)
      })),
      isPartComplete: (partId) => get().completedParts.includes(partId),
    }),
    {
      name: 'prompt-guide-storage',
    }
  )
);
