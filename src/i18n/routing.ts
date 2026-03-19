import {defineRouting} from 'next-intl/routing';
import {getRequestConfig} from 'next-intl/server';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en'
});

// Lightweight wrappers around Next.js' `getRequestConfig`
export const getConfig = () => getRequestConfig({routing, locale: 'en'});
