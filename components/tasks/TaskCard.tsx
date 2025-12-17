import { Task } from '@/types/task'
import { useDraggable } from '@dnd-kit/core'

const STATUS_COLOR: Record<string, string> = {
  todo: 'bg-gray-200 text-gray-700',
  'in-progress': 'bg-yellow-200 text-yellow-800',
  done: 'bg-green-200 text-green-800',
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
      className="bg-white p-4 rounded-lg shadow"
    >
      {/* DRAG HANDLE */}
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab text-xs text-gray-400 mb-2"
      >
        ⠿ Drag
      </div>

      <p className="font-medium">{task.title}</p>
      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${STATUS_COLOR[task.status]}`}>
        {task.status.replace('-', ' ')}
      </span>

      {task.description && (
        <p className="text-sm text-gray-500">{task.description}</p>
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-3 text-sm">
        <button
          onClick={() => onEdit(task)}
          className="underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="underline text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
