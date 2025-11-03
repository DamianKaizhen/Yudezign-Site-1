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
  logo: 'https://asearepsd4iqjdj2.public.blob.vercel-storage.com/1762150920994-YU%20DEZIGN%20LOGO%20CUSTOMIZED%20CABINETRY%202021.png',
  favicon: '/vite.svg',
  companyName: 'YuDezign',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://www.instagram.com/yudezignez/',
    linkedin: 'https://linkedin.com',
  },
};
