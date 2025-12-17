import { supabase } from '@/lib/supabaseClient'
import { FiLogOut } from 'react-icons/fi'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>

        <button
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.href = '/login'
          }}
          className="text-sm underline"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  )
}
