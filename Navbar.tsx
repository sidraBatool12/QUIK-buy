'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FaShoppingCart, FaUser, FaChevronDown } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoClose } from 'react-icons/io5'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ur', label: 'اردو' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
]

interface NavbarProps {
  onSearchChange: (value: string) => void
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const [language, setLanguage] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [mobileLangDropdown, setMobileLangDropdown] = useState(false)
  const [mobileUserDropdown, setMobileUserDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const langDropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false)
      }
      if (
        userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang && languages.some(l => l.code === savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  const changeLanguage = (code: string) => {
    setLanguage(code)
    localStorage.setItem('language', code)
    setLangDropdownOpen(false)
    setMobileLangDropdown(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearchChange(value)
  }

  return (
    <header className="fixed w-full top-0 left-0 z-50 shadow bg-white dark:bg-gray-900 transition-colors">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo and search bar with reduced gap */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Quik Buy"
              className="h-16 w-16 cursor-pointer"
            />
          </Link>
          {/* Desktop Search */}
          <div className="hidden md:block" style={{ maxWidth: 339 }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language Switcher */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-1"
            >
              <span>{languages.find(l => l.code === language)?.label || 'English'}</span>
              <FaChevronDown size={12} />
            </button>
            {langDropdownOpen && (
              <ul className="absolute bg-white dark:bg-gray-800 shadow rounded mt-1 w-32 z-30">
                {languages.map(lang => (
                  <li
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
                  >
                    {lang.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          
          <Link href="/signup" className="hover:text-blue-600 font-medium">
            {translate('signup', language)}
          </Link>

          <Link href="/cart" className="relative hover:text-blue-600 flex items-center space-x-1">
            <FaShoppingCart size={22} />
            <span>{translate('cart', language)}</span>
            <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5">
              3
            </span>
          </Link>

          {/* User Dashboard Dropdown */}
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="hover:text-blue-600 flex items-center space-x-1"
            >
              <FaUser size={22} />
              <span>{translate('dashboard', language)}</span>
              <FaChevronDown size={12} />
            </button>

            {userDropdownOpen && (
              <ul className="absolute right-0 bg-white dark:bg-gray-800 shadow rounded mt-1 w-40 z-30">
                <li className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer">
                  <Link href="/dashboard/user">User</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer">
                  <Link href="/dashboard/admin">Admin</Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Hamburger Button (Mobile Only) with improved animation and increased height for dropdowns */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block transition-all duration-500 ease-in-out"
            style={{
              opacity: mobileMenuOpen ? 0 : 1,
              transform: mobileMenuOpen ? 'rotate(90deg) scale(0.7)' : 'rotate(0deg) scale(1)',
              position: mobileMenuOpen ? 'absolute' : 'static',
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)'
            }}>
            <RxHamburgerMenu size={30} />
          </span>
          <span className="block transition-all duration-500 ease-in-out"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.7)',
              position: !mobileMenuOpen ? 'absolute' : 'static',
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)'
            }}>
            <IoClose size={32} />
          </span>
        </button>
      </nav>

      {/* Mobile Search Bar below logo */}
      <div className="md:hidden px-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full px-4 py-2 mb-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring"
        />
      </div>

      {/* Mobile Dropdown Menu with increased height for dropdowns */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 px-4 transition-all duration-500 ease-in-out 
          ${mobileMenuOpen ? 'max-h-[600px] py-2 opacity-100' : 'max-h-0 py-0 opacity-0'}
        `}
      >
        {/* Language Dropdown (mobile) with border */}
        <div className="relative ">
          <button
            onClick={() => setMobileLangDropdown(!mobileLangDropdown)}
            className="flex items-center w-full  bg-transparent  py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-700 ]  mt-2"
          >
            {languages.find(l => l.code === language)?.label || 'English'}
            <FaChevronDown size={14} className={`ml-2 transition-transform duration-300 ${mobileLangDropdown ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          {mobileLangDropdown && (
            <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded shadow-lg overflow-hidden z-20 border border-gray-400 dark:border-gray-700">
              {languages.map(lang => (
                <li
                  key={lang.code}
                  onClick={() => { changeLanguage(lang.code); setMobileLangDropdown(false) }}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Links */}

        <Link href="/signup" className="block py-2 hover:text-blue-600 border-b border-gray-200 dark:border-gray-700">{translate('signup', language)}</Link>
        <Link href="/cart" className="block py-2 hover:text-blue-600 border-b border-gray-200 dark:border-gray-700">
          {translate('cart', language)}
          <span className="ml-1 bg-red-600 text-white rounded-full text-xs px-1.5">3</span>
        </Link>
        {/* Dashboard Dropdown (mobile) with border */}
        <div className="relative  ">
          <button
            onClick={() => setMobileUserDropdown(!mobileUserDropdown)}
            className="flex items-center w-full bg-transparent  py-2 text-sm text-gray-00  rounded"
          >
            <span>{translate('dashboard', language)}</span>
            <FaChevronDown size={14} className={`ml-2 transition-transform duration-300 ${mobileUserDropdown ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          {mobileUserDropdown && (
            <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded shadow-lg ">
              <li className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700">
                <Link href="/dashboard/user">User</Link>
              </li>
              <li className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700">
                <Link href="/dashboard/admin">Admin</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}

function translate(key: 'login' | 'signup' | 'cart' | 'dashboard', lang: string): string {
  const translations: Record<string, Record<string, string>> = {
    login: {
      ur: 'لاگ ان',
      ko: '로그인',
      zh: '登录',
      ja: 'ログイン',
      en: 'Login',
    },
    signup: {
      ur: 'رجسٹر',
      ko: '회원가입',
      zh: '注册',
      ja: 'サインアップ',
      en: 'Signup',
    },
    cart: {
      ur: 'کارٹ',
      ko: '장바구니',
      zh: '购物车',
      ja: 'カート',
      en: 'Cart',
    },
    dashboard: {
      ur: 'یوزر ڈیش بورڈ',
      ko: '사용자 대시보드',
      zh: '用户仪表板',
      ja: 'ユーザーダッシュボード',
      en: 'User Dashboard',
    },
  }
  return translations[key][lang] || translations[key].en
}
