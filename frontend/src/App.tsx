import { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

interface Task {
  id?: string
  title: string
  description: string
  completed: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`)
    setTasks(res.data)
  }

  useEffect(() => { fetchTasks() }, [])

  const addTask = async () => {
    if (!title.trim()) return
    await axios.post(`${API}/tasks`, {
      title, description: desc, completed: false
    })
    setTitle(''); setDesc('')
    fetchTasks()
  }

  const toggleTask = async (task: Task) => {
    await axios.put(`${API}/tasks/${task.id}`, {
      ...task, completed: !task.completed
    })
    fetchTasks()
  }

  const deleteTask = async (id: string) => {
    await axios.delete(`${API}/tasks/${id}`)
    fetchTasks()
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1>Task Manager</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Task title" style={{ padding: 8 }} />
        <input value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Description" style={{ padding: 8 }} />
        <button onClick={addTask} style={{ padding: 8 }}>Add Task</button>
      </div>
      {tasks.map(task => (
        <div key={task.id} style={{ display: 'flex', alignItems: 'center',
          gap: 10, padding: '10px 0', borderBottom: '1px solid #eee' }}>
          <input type="checkbox" checked={task.completed}
            onChange={() => toggleTask(task)} />
          <div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none' }}>
            <strong>{task.title}</strong>
            <p style={{ margin: 0, color: '#666', fontSize: 13 }}>{task.description}</p>
          </div>
          <button onClick={() => deleteTask(task.id!)}>Delete</button>
        </div>
      ))}
    </div>
  )
}