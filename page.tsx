'use client'

import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Link from 'next/link'
import SidebarWithSearch from './components/SidebarWithSearch'

export const allProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1a5?auto=format&fit=crop&w=500&q=80',
    price: '$99',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    rating: 4,
  },
  {
    id: 2,
    name: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
    price: '$699',
    description: 'Latest smartphone with powerful performance and great camera.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Laptop Bag',
    image: 'https://images.unsplash.com/photo-1618364691641-0de0b5fd9412?auto=format&fit=crop&w=500&q=80',
    price: '$45',
    description: 'Stylish and protective laptop bag with extra compartments.',
    rating: 4,
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=500&q=80',
    price: '$59',
    description: 'Portable speaker with deep bass and waterproof design.',
    rating: 4,
  },
  {
    id: 5,
    name: 'Phone Case',
    image: 'https://images.unsplash.com/photo-1611512346884-6c82bfc65133?auto=format&fit=crop&w=500&q=80',
    price: '$15',
    description: 'Shockproof phone case with sleek finish and drop protection.',
    rating: 3,
  },
  {
    id: 6,
    name: 'Running Shoes',
    image: 'https://images.unsplash.com/photo-1595950658703-2661c00a1601?auto=format&fit=crop&w=500&q=80',
    price: '$120',
    description: 'Comfortable and lightweight shoes designed for runners.',
    rating: 4.5,
  },
  {
    id: 7,
    name: 'Leather Wallet',
    image: 'https://images.unsplash.com/photo-1591375278062-5abac6f2d9c8?auto=format&fit=crop&w=500&q=80',
    price: '$35',
    description: 'Premium leather wallet with multiple compartments.',
    rating: 4,
  },
  {
    id: 8,
    name: 'Makeup Kit',
    image: 'https://images.unsplash.com/photo-1614351040568-d1f3e1797d40?auto=format&fit=crop&w=500&q=80',
    price: '$60',
    description: 'Complete makeup kit with premium-quality products.',
    rating: 4.2,
  },
  {
    id: 9,
    name: 'Casual T-Shirt',
    image: 'https://images.unsplash.com/photo-1580910051071-8b3e02f05d1b?auto=format&fit=crop&w=500&q=80',
    price: '$25',
    description: 'Cotton casual t-shirt perfect for daily wear.',
    rating: 4.1,
  },
  {
    id: 10,
    name: 'Wrist Watch',
    image: 'https://images.unsplash.com/photo-1509817316-6e4fabf89503?auto=format&fit=crop&w=500&q=80',
    price: '$150',
    description: 'Elegant wrist watch with leather strap and water resistance.',
    rating: 4.6,
  },
  {
    id: 11,
    name: 'Denim Jeans',
    image: 'https://images.unsplash.com/photo-1622519403454-bb60a64b4d88?auto=format&fit=crop&w=500&q=80',
    price: '$49',
    description: 'Slim-fit stretch denim jeans for all-day comfort.',
    rating: 4.3,
  },
  {
    id: 12,
    name: 'Gaming Keyboard',
    image: 'https://images.unsplash.com/photo-1622445270883-308e5b160239?auto=format&fit=crop&w=500&q=80',
    price: '$89',
    description: 'Mechanical keyboard with RGB lights and fast response.',
    rating: 4.7,
  },
  {
    id: 13,
    name: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1579635223612-b3e89ea7cc4f?auto=format&fit=crop&w=500&q=80',
    price: '$35',
    description: 'Stylish UV-protected sunglasses for outdoor use.',
    rating: 4.1,
  },
  {
    id: 14,
    name: 'Backpack',
    image: 'https://images.unsplash.com/photo-1579885885941-0cf5ec9e7e0b?auto=format&fit=crop&w=500&q=80',
    price: '$40',
    description: 'Multipurpose backpack with laptop sleeve and water resistance.',
    rating: 4.3,
  },
  {
    id: 15,
    name: 'Lipstick Set',
    image: 'https://images.unsplash.com/photo-1613069142649-3a4d8c8aa473?auto=format&fit=crop&w=500&q=80',
    price: '$29',
    description: 'Matte lipstick set with vibrant and long-lasting shades.',
    rating: 4.4,
  },
  {
    id: 16,
    name: 'Fitness Tracker',
    image: 'https://images.unsplash.com/photo-1579583761433-3e09c5eeb733?auto=format&fit=crop&w=500&q=80',
    price: '$75',
    description: 'Fitness band with heart rate monitor and step counter.',
    rating: 4.2,
  },
  {
    id: 17,
    name: 'Perfume',
    image: 'https://images.unsplash.com/photo-1585110396000-4ec7d6d28260?auto=format&fit=crop&w=500&q=80',
    price: '$55',
    description: 'Refreshing fragrance for long-lasting freshness.',
    rating: 4,
  },
  {
    id: 18,
    name: 'Formal Shoes',
    image: 'https://images.unsplash.com/photo-1618354691322-e356fdfd8f53?auto=format&fit=crop&w=500&q=80',
    price: '$99',
    description: 'Elegant leather shoes suitable for formal occasions.',
    rating: 4.5,
  },
  {
    id: 19,
    name: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1602810311616-6c088bba1f77?auto=format&fit=crop&w=500&q=80',
    price: '$39',
    description: 'Soft cotton hoodie with front pocket and hood.',
    rating: 4.3,
  },
  {
    id: 20,
    name: 'Hair Dryer',
    image: 'https://images.unsplash.com/photo-1621687447846-4e1a88d56828?auto=format&fit=crop&w=500&q=80',
    price: '$49',
    description: 'Powerful and fast-drying hair dryer with cool shot feature.',
    rating: 4,
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onSearchChange={setSearchTerm} />

      <main className="mt-32 px-4 max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-center text-lg py-10">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map(product => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-white dark:bg-gray-900 rounded-xl shadow border dark:border-gray-800 overflow-hidden transform transition-transform duration-300 hover:scale-[1.03]"
              >
                <img
                  src={`${product.image}?auto=format&fit=crop&w=500&q=80`}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
                  <p className="text-blue-600 font-semibold mt-2">{product.price}</p>
                  <div className="text-yellow-500 mt-1">
                    {'⭐'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer></Footer>
    </div>
  )
}
