export interface SiteSettings {
  logo: string; // URL or image path for the company logo
  favicon: string; // URL or image path for the favicon
  companyName: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

export const siteSettings: SiteSettings = {
  logo: '/logo-wordmark.svg',
  favicon: '/favicon.ico',
  companyName: 'YuDezign',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://www.instagram.com/yudezignez/',
    linkedin: 'https://linkedin.com',
  },
};
