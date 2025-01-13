import { NextResponse } from 'next/server'

let tasks = [
  { id: 1, title: 'Complete project proposal', status: 'To Do' },
  { id: 2, title: 'Design user interface', status: 'In Progress' },
  { id: 3, title: 'Implement login functionality', status: 'Completed' },
]

export async function GET() {
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const { title, status } = await request.json()
  const newTask = {
    id: tasks.length + 1,
    title,
    status,
  }
  tasks.push(newTask)
  return NextResponse.json(newTask, { status: 201 })
}

