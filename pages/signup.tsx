import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

 const handleSignup = async () => {
  if (!email.trim() || !password.trim()) {
    toast.error('Email and password are required')
    return
  }

  if (!email.includes('@')) {
    toast.error('Please enter a valid email address')
    return
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters')
    return
  }

  setLoading(true)

  const normalizedEmail = email
  .trim()
  .toLowerCase()
  .replace(/["'“”‘’\s]/g, '')


  const { error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
  })

  setLoading(false)

 if (error) {
  //console.error('Supabase signup error:', error)
  toast.error(error.message)
  return
}

  toast.success('Account created successfully')
  router.push('/login')
}


  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Create Account
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Sign up to start managing your tasks
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <input
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full mt-4 bg-black text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-black font-medium cursor-pointer underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  </div>
)
}
