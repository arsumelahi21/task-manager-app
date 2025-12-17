import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import { Task } from '@/types/task'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'
import { STATUS_OPTIONS } from '@/constants/taskStatus'

export default function EditTaskModal({
  task,
  open,
  onClose,
  onUpdated,
}: {
  task: Task | null
  open: boolean
  onClose: () => void
  onUpdated: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
      setStatus(task.status)
    }
  }, [task])

  if (!task) return null

  const updateTask = async () => {
    const { error } = await supabase
      .from('tasks')
      .update({ title, description,status })
      .eq('id', task.id)

    if (error) {
      toast.error('Failed to update task')
      return
    }

    toast.success('Task updated')
    onClose()
    onUpdated()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

      <div className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border px-3 py-2 rounded"
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
          onClick={updateTask}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  )
}
