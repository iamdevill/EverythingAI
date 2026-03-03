import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreSettings } from '@/types';

interface SettingsState {
  settings: StoreSettings;
  theme: {
    colors: StoreSettings['themeColors'];
    borderRadius: string;
    headerStyle: string;
    footerStyle: string;
  };
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
  updateTheme: (theme: Partial<SettingsState['theme']>) => void;
  setAnnouncement: (announcement: { enabled: boolean; message: string; link?: string }) => void;
  setCookieConsent: (consent: { analytics: boolean; marketing: boolean }) => void;
}

const defaultSettings: StoreSettings = {
  id: '1',
  storeName: 'My Store',
  storeEmail: 'contact@mystore.com',
  storePhone: '+1 234 567 8900',
  currency: 'USD',
  currencySymbol: '$',
  taxRate: 0.08,
  shippingEnabled: true,
  freeShippingThreshold: 50,
  defaultShippingCost: 5,
  country: 'US',
  address: {
    address1: '123 Store Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US'
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
  },
  seoTitle: 'My Store - Best Products Online',
  seoDescription: 'Welcome to My Store - Your one-stop shop for quality products',
  seoKeywords: 'ecommerce, online store, shopping',
  themeColors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff',
    foreground: '#1e293b',
    muted: '#f1f5f9',
    border: '#e2e8f0',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const defaultTheme = {
  colors: defaultSettings.themeColors,
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