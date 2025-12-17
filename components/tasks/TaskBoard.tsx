import { Task } from '@/types/task'
import TaskColumn from './TaskColumn'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

const STATUSES = ['todo', 'in-progress', 'done'] as const

export default function TaskBoard({
 tasks,
 loading,
  onChange,
  onEdit,
  onDelete,
}: {
  tasks: Task[]
  loading: boolean
  onChange: () => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}) {
  const [search, setSearch] = useState('')

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    await supabase
      .from('tasks')
      .update({ status: over.id })
      .eq('id', active.id)

    onChange()
  }

  return (
    <>
     
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {STATUSES.map(status => (
            <TaskColumn
                key={status}
                loading={loading}
                status={status}
                tasks={filteredTasks.filter(t => t.status === status)}
                onEdit={onEdit}
                onDelete={onDelete}
            />
          ))}
        </div>
      </DndContext>
    </>
  )
}
