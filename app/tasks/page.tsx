'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

interface Task {
  id: number
  title: string
  status: 'To Do' | 'In Progress' | 'Completed'
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [])

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTask, status: 'To Do' }),
    })

    if (response.ok) {
      const task = await response.json()
      setTasks([...tasks, task])
      setNewTask('')
    }
  }

  const updateTaskStatus = async (id: number, newStatus: 'To Do' | 'In Progress' | 'Completed') => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })

    if (response.ok) {
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
      )
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <form onSubmit={addTask} className="mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['To Do', 'In Progress', 'Completed'].map((status) => (
          <div key={status} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{status}</h2>
            <ul>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <li key={task.id} className="mb-2 p-2 bg-gray-100 rounded-md">
                    {task.title}
                    <div className="mt-2">
                      {['To Do', 'In Progress', 'Completed'].map((newStatus) => (
                        <button
                          key={newStatus}
                          onClick={() => updateTaskStatus(task.id, newStatus as Task['status'])}
                          className={`mr-2 px-2 py-1 rounded-md ${
                            task.status === newStatus
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {newStatus}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  )
}

