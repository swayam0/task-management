import { NextResponse } from 'next/server'

let tasks = [
  { id: 1, title: 'Complete project proposal', status: 'To Do' },
  { id: 2, title: 'Design user interface', status: 'In Progress' },
  { id: 3, title: 'Implement login functionality', status: 'Completed' },
]

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json()
  const id = parseInt(params.id)
  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  tasks[taskIndex] = { ...tasks[taskIndex], status }
  return NextResponse.json(tasks[taskIndex])
}

