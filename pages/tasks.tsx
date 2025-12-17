import { useAuthGuard } from '@/lib/useAuthGuard'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { Task } from '@/types/task'
import AppLayout from '@/components/layout/AppLayout'
import TaskBoard from '@/components/tasks/TaskBoard'
import toast from 'react-hot-toast'
import CreateTaskModal from '@/components/tasks/CreateTaskModal'
import EditTaskModal from '@/components/tasks/EditTaskModal'
import DeleteTaskModal from '@/components/tasks/DeleteTaskModal'

export default function TasksPage() {
  const { loading } = useAuthGuard()
  const [tasks, setTasks] = useState<Task[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [loadingTasks, setLoadingTasks] = useState(true)
  
  const filteredTasks = tasks.filter(task => {
    const query = search.toLowerCase()

    return (
        task.title.toLowerCase().includes(query) ||
        (task.description?.toLowerCase().includes(query) ?? false)
    ) 
  })
  const fetchTasks = async () => {
    setLoadingTasks(true)

    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at')

    setLoadingTasks(false)

    if (!error) {
        setTasks(data || [])
    }
 }


  useEffect(() => {
    fetchTasks()
  }, [])

  if (loading) return null

  return (
  <AppLayout
  >
    <div className="flex justify-between items-center mb-6">
        {/* SEARCH */}
        <input
            placeholder="Search tasks..."
            className="w-full max-w-sm border px-4 py-2 rounded-md"
            onChange={e => setSearch(e.target.value)}
        />

        {/* ADD TASK */}
        <button
            onClick={() => setShowCreate(true)}
            className="bg-black text-white px-4 py-2 rounded-md"
        >
            + Add Task
        </button>
    </div>

    <TaskBoard
        tasks={filteredTasks}
        onChange={fetchTasks}
        onEdit={setEditTask}
        onDelete={setDeleteId}
    />

    <CreateTaskModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={fetchTasks}
    />
    <EditTaskModal
        open={!!editTask}
        task={editTask}
        onClose={() => setEditTask(null)}
        onUpdated={fetchTasks}
    />

    <DeleteTaskModal
        open={!!deleteId}
        taskId={deleteId}
        onClose={() => setDeleteId(null)}
        onDeleted={fetchTasks}
    />
  </AppLayout>
)
}
