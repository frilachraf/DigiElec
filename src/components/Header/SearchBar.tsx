'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface SearchResult {
  id: string | number;
  title: string;
  price: number;
  imgs: {
    previews: string[];
  };
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('header');
  const products = useSelector((state: RootState) => state.products.items);

  // Debounced search
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered.slice(0, 5)); // Show top 5 results
    setIsOpen(true);
  }, [products]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="w-full px-4 py-2.5 border border-gray-3 rounded-lg focus:outline-none focus:border-blue transition-colors bg-white text-dark text-sm"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-4 hover:text-dark transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M8.25 15C11.8725 15 14.75 12.1225 14.75 8.5C14.75 4.8775 11.8725 2 8.25 2C4.6275 2 1.75 4.8775 1.75 8.5C1.75 12.1225 4.6275 15 8.25 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.25 16.25L12.75 12.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-3 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-1 transition-colors border-b border-gray-3 last:border-0"
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={product.imgs.previews[0] || '/images/placeholder.png'}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-dark truncate">
                  {product.title}
                </h4>
                <p className="text-xs text-dark-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-3 rounded-lg shadow-lg z-50 px-4 py-3 text-center text-dark-4 text-sm">
          No products found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
