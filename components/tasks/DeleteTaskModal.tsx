import Modal from '@/components/ui/Modal'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'

export default function DeleteTaskModal({
  open,
  taskId,
  onClose,
  onDeleted,
}: {
  open: boolean
  taskId: string | null
  onClose: () => void
  onDeleted: () => void
}) {
  if (!taskId) return null

  const deleteTask = async () => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      toast.error('Failed to delete task')
      return
    }

    toast.success('Task deleted')
    onClose()
    onDeleted()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Delete Task</h2>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={deleteTask}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}
