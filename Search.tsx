'use client'

interface Props {
  searchTerm: string
  setSearchTerm: (val: string) => void
}

export default function MobileSearchBar({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="block lg:hidden px-4 py-2 bg-white dark:bg-gray-800 shadow">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
    </div>
  )
}
