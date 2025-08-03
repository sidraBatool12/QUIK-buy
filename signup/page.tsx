'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  username: string
  email: string
  password: string
}

export default function SignUpPage() {
  const router = useRouter()

  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [users, setUsers] = useState<User[]>([])
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [inputOtp, setInputOtp] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Step 1: Validate and send OTP
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { username, email, password, confirmPassword } = formData

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill all fields')
      return
    }
    if (!validateEmail(email)) {
      setError('Invalid email')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Check if username or email exists
    if (users.some(u => u.username === username || u.email === email)) {
      setError('Username or Email already exists')
      return
    }

    // Generate and "send" OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(otp)
    alert(`OTP sent to your email (${email}): ${otp} (Simulated)`)
    setStep('otp')
  }

  // Step 2: Verify OTP and create user
  const handleVerifyOtp = () => {
    if (inputOtp === generatedOtp) {
      // Save user
      setUsers([...users, { username: formData.username, email: formData.email, password: formData.password }])
      setSuccess('Account created successfully! Redirecting...')
      setError('')
      setTimeout(() => {
        // Redirect after success, e.g. home or login
        router.push('/login')
      }, 2500)
    } else {
      setError('Incorrect OTP, please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-1000 px-4 relative">
      {/* Back Button */}
      <div
        className="absolute top-4 left-4 cursor-pointer"
        onClick={() => router.back()}
        title="Go Back"
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-700 hover:text-indigo-900 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
       {/* Back Button & Home Button */}
      <div>
        <div
          className="absolute top-4 left-4 cursor-pointer"
          onClick={() => router.back()}
          title="Go Back"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-indigo-900 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div
          className="absolute top-4 left-14 cursor-pointer"
          onClick={() => router.push('/')}
          title="Home"
          aria-label="Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-indigo-900 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
        </div>
      </div>

      {step === 'form' ? (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Sign Up</h2>

          {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
          {success && <p className="mb-4 text-green-600 font-semibold">{success}</p>}

          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Send OTP
          </motion.button>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Login
            </Link>
          </p>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Verify OTP</h2>

          {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
          {success && <p className="mb-4 text-green-600 font-semibold">{success}</p>}

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={inputOtp}
            onChange={e => setInputOtp(e.target.value)}
            className="w-full mb-6 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVerifyOtp}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Verify & Create Account
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
