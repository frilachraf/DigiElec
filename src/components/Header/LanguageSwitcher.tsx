'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Remove the locale prefix from pathname to get the path
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-1 transition-colors text-dark text-sm font-medium"
      >
        {languages.find((l) => l.code === locale)?.flag}
        <span>{locale.toUpperCase()}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-3 rounded-lg shadow-lg z-50 min-w-32">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={`/${lang.code}${pathWithoutLocale}`}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-1 transition-colors ${
                locale === lang.code ? 'bg-blue bg-opacity-10 text-blue font-medium' : 'text-dark'
              } border-b border-gray-3 last:border-0`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
