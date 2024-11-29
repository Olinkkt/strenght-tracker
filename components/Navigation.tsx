'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dumbbell, ClipboardList, LineChart, Calendar } from 'lucide-react'

const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Log Workout', icon: Dumbbell },
    { href: '/exercises', label: 'Exercises', icon: ClipboardList },
    { href: '/progress', label: 'Progress', icon: LineChart },
    { href: '/planner', label: 'Planner', icon: Calendar },
  ]

  return (
    <nav className="bg-gray-800 text-white p-4 md:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Strength Tracker</h1>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-1 ${
                pathname === item.href ? 'text-blue-400' : 'hover:text-blue-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

