
const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export interface Task {
  id: string
  title: string
  completed: boolean
  created_at?: string
}

export async function checkBackendConnection(): Promise<boolean> {
  const response = await fetch(`${API_URL}/health/db`)

  if (!response.ok) {
    throw new Error('Backend connection check failed')
  }

  return true
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`)

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return response.json() as Promise<Task[]>
}

export async function createTask(title: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })

  if (!response.ok) {
    throw new Error('Failed to create task')
  }

  return response.json() as Promise<Task>
}


export async function updateTask(
  id: string,
  completed: boolean,
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  })

  if (!response.ok) {
    throw new Error('Failed to update task')
  }

  return response.json() as Promise<Task>
}
