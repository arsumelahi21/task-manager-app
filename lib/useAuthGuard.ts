import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './supabaseClient'

export function useAuthGuard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/login')
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  return { loading }
}
