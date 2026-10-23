
function App() {
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
        </header>

        {/* Task input section */}
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Add a new task
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="What needs to be done?"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </section>

        {/* Task list section */}
        <section className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Your tasks
            </h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              0 tasks
            </span>
          </div>

          <p className="py-8 text-center text-slate-500">
            No tasks yet. Add your first task above.
          </p>
        </section>
      </div>
    </main>
  )
}

export default App
