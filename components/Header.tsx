'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import SearchButton from './SearchButton';
import {
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from '@tremor/react';
import Avatar from 'react-avatar';
import { useRouter } from 'next/navigation';
const SORT_BY_MAP = {
  r: 'Default',
  rv: 'By Review',
  p: 'By Price (Low To High)',
  pd: 'By Price (High To Low)',
};
function Header() {
  const [pages, setPages] = useState('');
  const [sortBy, setSortBy] = useState('r');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const router = useRouter();
  return (
    <header className="flex flex-col items-center md:flex-row md:items-start  md:space-x-6 px-2 py-10 pb-5 md:p-10 md:pb-5">
      <Link href={'/'}>
        <Image
          src={'https://links.papareact.com/208'}
          alt="Logo"
          width={200}
          height={150}
          className="object-contain mr-10"
        />
      </Link>
      <div className="w-full md:max-w-2xl">
        {/* form */}
        <form
          action={(formData) => {
            const searchTerm = formData.get('searchTerm');
            if (!formData.get('searchTerm')) return;
            const params = new URLSearchParams();
            if (pages) params.set('pages', pages.toString());
            if (sortBy) params.set('sort_by', sortBy.toString());
            if (minPrice) params.set('min_price', minPrice.toString());
            if (maxPrice) params.set('max_price', maxPrice.toString());
            router.push(`/search/${searchTerm}?${params.toString()}`);
          }}
        >
          <div className="flex items-center gap-2 w-full px-4">
            <div className="flex items-center space-x-2 bg-white shadow-xl rounded-full border-0 px-6 py-4  flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                name="searchTerm"
                className="outline-none flex-1"
              />
            </div>
            {/* search button */}
            <SearchButton />
          </div>
          <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-4 max-w-lg md:max-w-none mx-auto items-center">
            <SearchSelect
              placeholder="# of pages"
              className="min-w-4"
              onValueChange={(val) => setPages(val)}
            >
              {[...Array(100)].map((_, i) => (
                <SearchSelectItem key={i} value={(i + 1).toString()}>
                  {(i + 1).toString()} pages
                </SearchSelectItem>
              ))}
            </SearchSelect>
            <Select
              placeholder="Sort"
              className="min-w-4"
              onValueChange={(val) => setSortBy(val)}
            >
              {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </Select>
            <SearchSelect
              placeholder="Min  Price..."
              className="min-w-4"
              onValueChange={(val) => setMinPrice(val)}
            >
              {['', '100', '250', '500', '750', '900', '1000'].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? 'No Minimum' : `$${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>
            <SearchSelect
              placeholder="Max  Price..."
              className="min-w-4"
              onValueChange={(val) => setMaxPrice(val)}
            >
              {['', '100', '250', '500', '750', '900', '1000+'].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? 'No Maximum' : `$${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>
          </div>
        </form>
      </div>
      <div className="hidden lg:flex flex-1 justify-end">
        {/* Avatar */}
        <Avatar name="M Faysal Bsata" round size="50" />
      </div>
    </header>
  );
}

export default Header;
