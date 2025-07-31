'use client'

import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-950 to-gray-800 text-gray-300 py-12 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4 tracking-wide text-white">Quick-Buy</h2>
            <p className="text-sm leading-relaxed max-w-sm text-gray-400">
              Your trusted online store for premium quality products delivered fast and secure.
            </p>
            <div className="mt-6 flex space-x-4 text-xl text-gray-400">
              <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:underline hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:underline hover:text-white transition-colors">Shop</a></li>
              <li><a href="#" className="hover:underline hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:underline hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Customer Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:underline hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:underline hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:underline hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="mb-4 text-sm max-w-xs text-gray-400">
              Subscribe to get our latest news and offers directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <input
                type="email"
                placeholder="Your email"
                required
                className="rounded-full px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-700 pt-6 select-none">
          © {new Date().getFullYear()} Quick-Buy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
