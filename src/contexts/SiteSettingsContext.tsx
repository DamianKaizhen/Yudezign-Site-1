import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SiteSettings } from '../types';

interface SiteSettingsContextType {
  settings: SiteSettings;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  logo: '',
  favicon: '/vite.svg',
  companyName: 'YuDeZign',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://www.instagram.com/yudezignez/',
    linkedin: 'https://linkedin.com',
  },
};

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
  refreshSettings: async () => {},
});

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  }
  return context;
};

interface SiteSettingsProviderProps {
  children: ReactNode;
}

export const SiteSettingsProvider = ({ children }: SiteSettingsProviderProps) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async (bustCache = false) => {
    try {
      // Add cache-busting parameter to force fresh data
      const url = bustCache
        ? `/api/settings?_=${Date.now()}`
        : '/api/settings';

      const response = await fetch(url, {
        // Disable browser cache when refreshing
        cache: bustCache ? 'no-cache' : 'default',
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.data);

        // Update favicon dynamically
        if (data.data.favicon) {
          const faviconLink = document.getElementById('favicon') as HTMLLinkElement;
          if (faviconLink) {
            faviconLink.href = data.data.favicon;
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch site settings:', error);
      // Use default settings on error
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSettings = async () => {
    // Force fresh fetch by busting cache
    await fetchSettings(true);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, isLoading, refreshSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
