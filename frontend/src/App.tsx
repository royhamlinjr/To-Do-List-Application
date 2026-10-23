
import { useState } from 'react'

interface Task {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask() {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    const newTask: Task = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    }

    setTasks((currentTasks) => [...currentTasks, newTask])
    setTitle('')
  }

  
function handleToggleTask(id: number) {
  setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  )
}

function handleDeleteTask(id: number) {
  setTasks((currentTasks) =>
    currentTasks.filter((task) => task.id !== id)
  )
}


  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            My Tasks
          </h1>
          <p className="mt-2 text-slate-500">
            Organize your day, one task at a time.
          </p>
        </header>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Add a new task
          </h2>

          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault()
              handleAddTask()
            }}
          >
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to be done?"
              maxLength={200}
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Add Task
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Your tasks
            </h2>

            
        <span className="text-sm text-slate-500">
          {tasks.filter((task) => task.completed).length} of{' '}
          {tasks.length} completed
        </span>

          </div>

          {tasks.length === 0 ? (
            <p className="py-8 text-center text-slate-500">
              No tasks yet. Add your first task above.
            </p>
          ) : (
            
          <ul className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 py-4"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  aria-label={`Mark ${task.title} as completed`}
                  className="size-4 cursor-pointer accent-blue-600"
                />

                <span
                  className={`min-w-0 flex-1 break-words ${
                    task.completed
                      ? 'text-slate-400 line-through'
                      : 'text-slate-700'
                  }`}
                >
                  {task.title}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteTask(task.id)}
                  className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          )}
        </section>
      </div>
    </main>
  )
}

export default App
