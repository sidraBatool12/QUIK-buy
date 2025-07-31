'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react' // Optional: hamburger + close icons

const categories = ['Clothing', 'Electronics', 'Shoes', 'Accessories', 'Books', 'Sports']

interface Props {
  searchTerm: string
  setSearchTerm: (val: string) => void
  selectedCategories: string[]
  setSelectedCategories: (cats: string[]) => void
}

export default function SidebarWithSearch({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat))
    } else {
      setSelectedCategories([...selectedCategories, cat])
    }
  }

  // Close sidebar on ESC or outside click
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="sm:hidden p-2">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-800 dark:text-white"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } sm:hidden`}
        onClick={() => setIsOpen(false)}
        aria-label="Close sidebar overlay"
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl transform transition-transform duration-300 w-72 p-0 overflow-y-auto
        h-screen sm:h-[calc(100vh-64px)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0 sm:static sm:block sm:top-16`}
        style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)' }}
      >
        {/* Sticky close button for mobile */}
        <div className="sm:hidden sticky top-0 z-10 bg-white dark:bg-gray-900 flex justify-end p-4 border-b border-gray-100 dark:border-gray-800">
          <button onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-white hover:text-red-500 transition-colors" aria-label="Close sidebar">
            <X size={28} />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="p-6 pt-2 flex flex-col h-full">
          {/* Search Bar (desktop only) */}
          <div className="hidden sm:block mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Filters Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">Categories</h3>
              <button
                className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                onClick={() => setSelectedCategories([])}
                disabled={selectedCategories.length === 0}
                aria-label="Clear filters"
              >
                Clear
              </button>
            </div>
            <hr className="mb-4 border-gray-200 dark:border-gray-700" />
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {categories.map(cat => (
                <li key={cat}>
                  <label className="flex items-center cursor-pointer px-2 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded text-blue-600 focus:ring-blue-500"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className="ml-3 text-sm font-medium">{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    {/* Search Bar (mobile only, below navbar) */}
    <div className="sm:hidden px-4 pt-2 pb-4 bg-white dark:bg-gray-900 sticky top-[64px] z-40">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />
    </div>
    </>
  )
}
