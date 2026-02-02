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
    }),
    {
      name: 'prompt-guide-storage',
    }
  )
);
