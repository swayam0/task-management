import Link from 'next/link'
import { Home, List, Calendar, Settings } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div>
      <nav className="mt-6">
        <Link href="/" className="block py-3 px-6 hover:bg-gray-700">
          <Home className="inline-block mr-3" /> Dashboard
        </Link>
        <Link href="/tasks" className="block py-3 px-6 hover:bg-gray-700">
          <List className="inline-block mr-3" /> Tasks
        </Link>
        <Link href="/calendar" className="block py-3 px-6 hover:bg-gray-700">
          <Calendar className="inline-block mr-3" /> Calendar
        </Link>
        <Link href="/settings" className="block py-3 px-6 hover:bg-gray-700">
          <Settings className="inline-block mr-3" /> Settings
        </Link>
      </nav>
    </aside>
  )
}

