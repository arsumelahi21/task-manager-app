import { Task } from '@/types/task'
import TaskCard from './TaskCard'
import { useDroppable } from '@dnd-kit/core'
import TaskSkeleton from './TaskSkeleton'

export default function TaskColumn({
  status,
  tasks,
  loading,
  onEdit,
  onDelete,
}: {
  status: Task['status']
  tasks: Task[]
  loading: boolean
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}) {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div ref={setNodeRef} className="bg-gray-50 rounded-xl p-4">
      <h2 className="font-semibold mb-4 capitalize">
        {status.replace('-', ' ')}
      </h2>

      <div className="space-y-3">
            {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                <TaskSkeleton key={i} />
                ))
            ) : tasks.length === 0 ? (
                <p className="text-sm text-gray-400 italic text-center mt-6">
                No tasks here
                </p>
            ) : (
                tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                ))
            )}
        </div>


    </div>
  )
}
