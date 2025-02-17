'use client'

import { useState, useEffect } from 'react'
import { WorkoutStats } from '../components/WorkoutStats'
import { exportData, importData } from '../components/DataManagement'

interface Set {
  id: string
  weight: number
  reps: number
}

interface Exercise {
  id: string
  name: string
  sets: Set[]
}

interface Workout {
  id: string
  date: string
  muscleGroups: string[]
  exercises: Exercise[]
  note?: string
}

export default function HistoryPage() {
  const [isClient, setIsClient] = useState(false)
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' })
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([])

  const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']

  // Načtení workoutů z API
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts')
        if (!response.ok) throw new Error('Chyba při načítání')
        const data = await response.json()
        setWorkouts(data)
      } catch (error) {
        console.error('Chyba při načítání workoutů:', error)
      }
    }

    fetchWorkouts()
    setIsClient(true)
  }, [])

  const filteredWorkouts = workouts
    .filter(w => {
      if (!dateFilter.from && !dateFilter.to) return true
      const workoutDate = new Date(w.date)
      const fromDate = dateFilter.from ? new Date(dateFilter.from) : null
      const toDate = dateFilter.to ? new Date(dateFilter.to) : null
      return (!fromDate || workoutDate >= fromDate) && 
             (!toDate || workoutDate <= toDate)
    })
    .filter(w => selectedMuscleGroups.length === 0 || 
      selectedMuscleGroups.some(group => w.muscleGroups?.includes(group)))

  const handleDelete = async (id: string) => {
    if (window.confirm('Opravdu chcete smazat tento trénink?')) {
      try {
        const response = await fetch(`/api/workouts/${id}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('Chyba při mazání')
        setWorkouts(workouts.filter(w => w.id !== id))
      } catch (error) {
        console.error('Chyba při mazání workoutu:', error)
      }
    }
  }

  const handleCopyWorkout = async (workout: Workout) => {
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          muscleGroups: workout.muscleGroups,
          exercises: workout.exercises.map(exercise => ({
            name: exercise.name,
            sets: exercise.sets.map(set => ({
              weight: set.weight,
              reps: set.reps
            }))
          })),
          note: workout.note
        })
      })

      if (!response.ok) throw new Error('Chyba při kopírování')
      
      // Znovu načteme workouty pro aktualizaci seznamu
      const updatedWorkouts = await fetch('/api/workouts').then(res => res.json())
      setWorkouts(updatedWorkouts)
    } catch (error) {
      console.error('Chyba při kopírování workoutu:', error)
      alert('Chyba při kopírování workoutu')
    }
  }

  if (!isClient) {
    return <div>Načítání...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tréninková Historie</h1>
        <div className="flex gap-2">
          <button
            onClick={exportData}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Exportovat data
          </button>
          <label className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
            Importovat data
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) importData(file)
              }}
            />
          </label>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <input
            type="date"
            value={dateFilter.from}
            onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={dateFilter.to}
            onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
            className="p-2 border rounded"
          />
          <div className="flex flex-wrap gap-2">
            {muscleGroups.map(group => (
              <button
                key={group}
                onClick={() => {
                  if (selectedMuscleGroups.includes(group)) {
                    setSelectedMuscleGroups(selectedMuscleGroups.filter(g => g !== group))
                  } else {
                    setSelectedMuscleGroups([...selectedMuscleGroups, group])
                  }
                }}
                className={`px-4 py-2 rounded ${
                  selectedMuscleGroups.includes(group)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        <WorkoutStats workouts={filteredWorkouts} />
      </div>

      <div className="space-y-4">
        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Žádné tréninky neodpovídají vybraným filtrům</p>
          </div>
        ) : (
          filteredWorkouts.map((session) => (
            <div key={session.id} className="border p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{new Date(session.date).toLocaleDateString('cs-CZ')}</h2>
                <button
                  onClick={() => handleDelete(session.id)}
                  className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                >
                  Smazat
                </button>
              </div>
              
              {session.muscleGroups && session.muscleGroups.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {session.muscleGroups.map((group, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-2">
                {session.exercises.map((exercise, index) => (
                  <div key={index} className="ml-4 my-2">
                    <h3 className="font-medium">{exercise.name}</h3>
                    <div className="ml-4 grid gap-1">
                      {exercise.sets.map((set, setIndex) => (
                        <p key={setIndex} className="text-gray-600">
                          Set {setIndex + 1}: {set.weight}kg × {set.reps} opakování
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleCopyWorkout(session)}
                className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded"
              >
                Kopírovat
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 