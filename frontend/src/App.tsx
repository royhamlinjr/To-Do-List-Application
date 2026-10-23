
import { useEffect, useState } from 'react'
import { checkBackendConnection, createTask, getTasks, updateTask, } from './services/api'
import type { Task } from './services/api'

function App() {
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tasksError, setTasksError] = useState('')
  const [addError, setAddError] = useState('')

  const [backendStatus, setBackendStatus] = useState<
    'checking' | 'connected' | 'disconnected'
  >('checking')

  // Check the backend connection
  useEffect(() => {
    checkBackendConnection()
      .then(() => setBackendStatus('connected'))
      .catch(() => setBackendStatus('disconnected'))
  }, [])

  // Load tasks from the backend
  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data)
        setTasksError('')
      })
      .catch(() => {
        setTasksError('Unable to load tasks. Please check the backend.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

async function handleAddTask() {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    return
  }

  try {
    const newTask = await createTask(trimmedTitle)

    setTasks((currentTasks) => [newTask, ...currentTasks])
    setTitle('')
    setAddError('')
  } catch {
    setAddError('Unable to save task. Please check the backend and try again.')
  }
}


async function handleToggleTask(id: string) {
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return
  }

  try {
    const updatedTask = await updateTask(id, !task.completed)

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id ? updatedTask : item
      )
    )

    setTasksError('')
  } catch {
    setTasksError(
      'Unable to update task. Please check the backend.'
    )
  }
}


  // Delete a task locally for now
  function handleDeleteTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

  // Calculate task statistics
  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.length - completedCount

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            My Tasks
          </h1>

          <p className="mt-2 text-slate-500">
            Organize your day, one task at a time.
          </p>

          <p className="mt-3 text-sm">
            Backend:{' '}
            <span
              className={
                backendStatus === 'connected'
                  ? 'font-medium text-green-600'
                  : backendStatus === 'disconnected'
                    ? 'font-medium text-red-600'
                    : 'text-slate-500'
              }
            >
              {backendStatus === 'checking'
                ? 'Checking connection...'
                : backendStatus === 'connected'
                  ? 'Connected'
                  : 'Disconnected'}
            </span>
          </p>
        </header>

        {/* Task summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total tasks</p>
            <p className="mt-1 text-2xl font-bold text-slate-800">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Add task form */}
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
          {addError && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {addError}
            </p>
          )}
        </section>

        {/* Task list */}
        <section className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-800">
              Your tasks
            </h2>

            <span className="text-sm text-slate-500">
              {completedCount} of {tasks.length} completed
            </span>
          </div>

          {isLoading ? (
            <p className="py-8 text-center text-slate-500">
              Loading tasks...
            </p>
          ) : tasksError ? (
            <p className="py-8 text-center text-red-600">
              {tasksError}
            </p>
          ) : tasks.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-base font-medium text-slate-700">
                No tasks yet
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Add your first task above to get started.
              </p>
            </div>
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
