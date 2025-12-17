import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
import { FiCheckCircle, FiLogIn, FiUserPlus } from 'react-icons/fi'

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.replace('/tasks')
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  if (loading) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-10 space-y-8 transition hover:shadow-xl">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Task Manager
          </h1>
          <p className="text-gray-600">
            A simple and secure way to manage your tasks.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
          {[
            'Secure Auth',
            'Kanban Board',
            'Drag & Drop',
          ].map(feature => (
            <div
              key={feature}
              className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FiCheckCircle className="text-green-600" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition transform hover:-translate-y-0.5"
          >
            <FiLogIn />
            Login
          </Link>

          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition transform hover:-translate-y-0.5"
          >
            <FiUserPlus />
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  )
}
