import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreSettings, ThemeConfig } from '@/types';

interface SettingsState {
  settings: StoreSettings;
  theme: ThemeConfig;
  announcement: {
    enabled: boolean;
    message: string;
    link?: string;
  };
  cookieConsent: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    hasConsented: boolean;
  };
  updateSettings: (settings: Partial<StoreSettings>) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  setAnnouncement: (announcement: { enabled: boolean; message: string; link?: string }) => void;
  setCookieConsent: (consent: { analytics: boolean; marketing: boolean }) => void;
}

const defaultSettings: StoreSettings = {
  storeName: 'My Store',
  storeEmail: 'contact@mystore.com',
  storePhone: '+1 234 567 8900',
  currency: 'USD',
  currencySymbol: '$',
  address: {
    id: '1',
    type: 'shipping',
    firstName: '',
    lastName: '',
    address1: '123 Store Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
    isDefault: true,
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
  },
  seo: {
    title: 'My Store - Best Products Online',
    description: 'Welcome to My Store - Your one-stop shop for quality products',
    keywords: 'ecommerce, online store, shopping',
  },
};

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff',
    foreground: '#1e293b',
    muted: '#f1f5f9',
    border: '#e2e8f0',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  borderRadius: '0.5rem',
  headerStyle: 'default',
  footerStyle: 'default',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      theme: defaultTheme,
      announcement: {
        enabled: true,
        message: 'Free shipping on orders over $50!',
        link: '/shipping',
      },
      cookieConsent: {
        necessary: true,
        analytics: false,
        marketing: false,
        hasConsented: false,
      },

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      updateTheme: (newTheme) =>
        set((state) => ({
          theme: { ...state.theme, ...newTheme },
        })),

      setAnnouncement: (announcement) =>
        set({ announcement }),

      setCookieConsent: (consent) =>
        set((state) => ({
          cookieConsent: {
            ...state.cookieConsent,
            ...consent,
            hasConsented: true,
          },
        })),
    }),
    {
      name: 'ecommerce-settings',
    }
  )
);
