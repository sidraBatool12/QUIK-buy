'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'


export default function LoginPage() {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter();


  // Forget password states
  const [showForget, setShowForget] = useState(false)
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [inputOtp, setInputOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false)

  // Dummy users database simulation
  const dummyUsers = [
    { username: 'admin', password: 'admin123' },
  ]

function handleLogin(e: React.FormEvent) {
  e.preventDefault();
  setError('');

  const rawUsers = localStorage.getItem('quikbuy_users');
  const users: any[] = rawUsers ? JSON.parse(rawUsers) : [];

  let user = users.find(u => u.username === username);

  if (!user) {
    // Signup-on-login
    user = {
      username,
      password,
      fullName: '',
      email: '',
      address: '',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    localStorage.setItem('quikbuy_users', JSON.stringify(users));
  } else if (user.password !== password) {
    setError('Incorrect password');
    return;
  }

  // Save login session
  localStorage.setItem('quikbuy_session_user', username);

  // Role-based redirection
  if (username === 'admin') {
    localStorage.setItem('role', 'admin');
    router.push('/dashboard/admin'); // ✅ Go to admin
  } else {
    localStorage.setItem('role', 'user');
    router.push('/dashboard/user'); // ✅ Go to user
  }

  setLoggedIn(true);
}

  function sendOtp() {
    if (!email.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setOtp(generatedOtp)
    setOtpSent(true)
    alert(`OTP sent to your email: ${generatedOtp} (Simulation)`)
  }

  function resetPassword() {
    if (newPassword.length < 6) {
      alert('Password should be at least 6 characters')
      return
    }
    setPasswordResetSuccess(true)
    setShowForget(false)
    alert('Password reset successful! Now login with new password.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center justify-center bg-gradient-to-br from-gray-700 to-gray-1000 p-4 relative">
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

      {!loggedIn ? (
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-center ">Login to Quik-Buy</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-grey-500 transition"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border mt-10 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-grey-500 transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600">{error}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white p-3 mt-10 rounded font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </motion.button>

          <p
            className="mt-5 text-center text-sm cursor-pointer hover:underline"
            onClick={() => setShowForget(true)}
          >
            Forgot Password?
          </p>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Signup here
            </a>
          </p>
        </motion.form>
      ) : (
        <button
  onClick={() => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    router.push('/'); // 👈 home page pe redirect
  }}>

</button>

      )}

      {/* Forget Password Modal */}
      {showForget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 py-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full relative"
          >
            <button
              onClick={() => {
                setShowForget(false)
                setOtpSent(false)
                setInputOtp('')
                setNewPassword('')
                setPasswordResetSuccess(false)
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            {/* Step 1: Email input */}
            {!otpSent && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">Reset Password</h3>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className="w-full p-3 mb-10 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  onClick={sendOtp}
                  className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
                >
                  Send OTP
                </button>
              </motion.div>
            )}

            {/* Step 2: OTP and new password */}
            {otpSent && !passwordResetSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">Enter OTP</h3>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={inputOtp}
                  onChange={e => setInputOtp(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (inputOtp === otp) {
                      alert('OTP verified! Please enter new password.')
                    } else {
                      alert('Wrong OTP, try again.')
                    }
                  }}
                  className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition mb-4"
                >
                  Verify OTP
                </button>

                {/* Animate new password input only if OTP is correct */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inputOtp === otp ? 1 : 0.5, y: inputOtp === otp ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    disabled={inputOtp !== otp}
                  />
                  <button
                    onClick={resetPassword}
                    disabled={inputOtp !== otp}
                    className={`w-full p-3 rounded text-white transition mb-10 ${
                      inputOtp === otp ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Reset Password
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Success message */}
            {passwordResetSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.3 }}
                className="text-center text-green-700"
              >
                <h3 className="text-xl font-semibold mb-4">Password Reset Successful!</h3>
                <button
                  onClick={() => setShowForget(false)}
                  className="bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition mb-10"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
    
  )
}

