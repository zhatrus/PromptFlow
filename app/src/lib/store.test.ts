import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './store';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({ theme: 'system', favorites: [] });
  });

  it('should have default theme as system', () => {
    const { theme } = useAppStore.getState();
    expect(theme).toBe('system');
  });

  it('should set theme to dark', () => {
    useAppStore.getState().setTheme('dark');
    expect(useAppStore.getState().theme).toBe('dark');
  });

  it('should set theme to light', () => {
    useAppStore.getState().setTheme('light');
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('should have empty favorites by default', () => {
    const { favorites } = useAppStore.getState();
    expect(favorites).toEqual([]);
  });

  it('should add favorite', () => {
    useAppStore.getState().addFavorite('prompt-1');
    expect(useAppStore.getState().favorites).toContain('prompt-1');
  });

  it('should remove favorite', () => {
    useAppStore.getState().addFavorite('prompt-1');
    useAppStore.getState().addFavorite('prompt-2');
    useAppStore.getState().removeFavorite('prompt-1');

    expect(useAppStore.getState().favorites).not.toContain('prompt-1');
    expect(useAppStore.getState().favorites).toContain('prompt-2');
  });

  it('should check if item is favorite', () => {
    useAppStore.getState().addFavorite('prompt-1');

    expect(useAppStore.getState().isFavorite('prompt-1')).toBe(true);
    expect(useAppStore.getState().isFavorite('prompt-2')).toBe(false);
  });
});
