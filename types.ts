export interface Skin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  downloadUrl: string;
  category: 'racing' | 'street' | 'drift' | 'rally';
  author: string;
  downloads: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  image?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}