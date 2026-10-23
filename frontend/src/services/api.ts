
const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export async function checkBackendConnection(): Promise<boolean> {
  const response = await fetch(`${API_URL}/health/db`)

  if (!response.ok) {
    throw new Error('Backend connection check failed')
  }

  return true
}


export interface Task {
  id: string
  title: string
  completed: boolean
  created_at?: string
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`)

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return response.json() as Promise<Task[]>
}

