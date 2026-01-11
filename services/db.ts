import { Skin } from '../types';

const STORAGE_KEY = 'arbskinz_data';

// Initial Seed Data
const SEED_DATA: Skin[] = [
  {
    id: '1',
    title: 'Neon Cyberpunk GTR',
    description: 'High visibility neon strips on matte black finish. Perfect for night city runs.',
    imageUrl: 'https://images.unsplash.com/photo-1600712242805-5f78671660d7?q=80&w=1000&auto=format&fit=crop',
    downloadUrl: '#',
    category: 'street',
    author: 'Admin',
    downloads: 1240,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Red Bull Drift Spec',
    description: 'Professional drift livery inspired by formula drift championships.',
    imageUrl: 'https://images.unsplash.com/photo-1610848092790-a3594892789d?q=80&w=1000&auto=format&fit=crop',
    downloadUrl: '#',
    category: 'drift',
    author: 'Admin',
    downloads: 850,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Martini Racing Porsche',
    description: 'Classic rally legend livery remastered for modern chassis.',
    imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop',
    downloadUrl: '#',
    category: 'rally',
    author: 'Admin',
    downloads: 2100,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Midnight Purple R34',
    description: 'Clean, simple, elegant. The legendary midnight purple color code.',
    imageUrl: 'https://images.unsplash.com/photo-1620593796338-348612a4208a?q=80&w=1000&auto=format&fit=crop',
    downloadUrl: '#',
    category: 'street',
    author: 'Admin',
    downloads: 3005,
    createdAt: new Date().toISOString()
  }
];

export const getSkins = (): Skin[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return JSON.parse(data);
};

export const getSkinById = (id: string): Skin | undefined => {
  const skins = getSkins();
  return skins.find(s => s.id === id);
};

export const addSkin = (skin: Omit<Skin, 'id' | 'downloads' | 'createdAt'>): Skin => {
  const skins = getSkins();
  const newSkin: Skin = {
    ...skin,
    id: Math.random().toString(36).substr(2, 9),
    downloads: 0,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newSkin, ...skins]));
  return newSkin;
};

export const deleteSkin = (id: string): void => {
  const skins = getSkins();
  const filtered = skins.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};