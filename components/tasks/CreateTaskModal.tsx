import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'
import Modal from '@/components/ui/Modal'
import { STATUS_OPTIONS } from '@/constants/taskStatus'

export default function CreateTaskModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  onCreated: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo')

  const createTask = async () => {
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('tasks').insert({
      title,
      description,
      status
    })

    setLoading(false)

    if (error) {
      toast.error('Failed to create task')
      return
    }

    toast.success('Task created')
    setTitle('')
    setDescription('')
    onClose()
    onCreated()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Create Task</h2>

      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Title *"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select
            value={status}
            onChange={e => setStatus(e.target.value as any)}
            className="w-full border rounded px-3 py-2"
            >
            {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
         </select>


        <button
          onClick={createTask}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </Modal>
  )
}
