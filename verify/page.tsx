'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (val: string, idx: number) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp]
      newOtp[idx] = val
      setOtp(newOtp)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalCode = otp.join('')
    console.log('Verify OTP:', finalCode)

    if (finalCode === '123456') {
      alert('OTP Verified!')
      router.push('/')
    } else {
      alert('Invalid OTP')
    }
  }

  const handleResend = () => {
    if (timer === 0) {
      console.log('Resend OTP to:', email)
      setTimer(30)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
        <p className="text-center text-gray-500 mb-6">OTP sent to <strong>{email}</strong></p>

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((val, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center border border-gray-300 rounded-md"
              value={val}
              onChange={e => handleChange(e.target.value, idx)}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Verify
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0}
            className={`text-blue-600 font-medium hover:underline ${
              timer > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Resend OTP {timer > 0 ? `in ${timer}s` : ''}
          </button>
        </div>

        <div className="text-sm text-center mt-3 text-gray-600">
          Didn’t receive the code? Check spam or{' '}
          <button className="text-blue-500 hover:underline">change email</button>
        </div>
      </form>
    </div>
  )
}
