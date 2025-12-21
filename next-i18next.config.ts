import path from 'path';

const config = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  ns: ['common', 'home', 'constructions'],
  defaultNS: 'common',
  localePath: path.resolve('./public/locales'),
  fallbackLng: 'en',
  fallbackNS: 'common',
};

export default config;
