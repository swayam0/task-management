'use client'

import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Task {
  id: number
  title: string
  status: 'To Do' | 'In Progress' | 'Completed'
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [])

  const taskCounts = {
    'To Do': tasks.filter((task) => task.status === 'To Do').length,
    'In Progress': tasks.filter((task) => task.status === 'In Progress').length,
    Completed: tasks.filter((task) => task.status === 'Completed').length,
  }

  const chartData = Object.entries(taskCounts).map(([status, count]) => ({
    status,
    count,
  }))

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
          <p className="text-4xl font-bold">{tasks.length}</p>
          <p className="text-gray-500">Total Tasks</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">In Progress</h2>
          <p className="text-4xl font-bold">{taskCounts['In Progress']}</p>
          <p className="text-gray-500">Tasks</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Completed</h2>
          <p className="text-4xl font-bold">{taskCounts['Completed']}</p>
          <p className="text-gray-500">Tasks</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  )
}

