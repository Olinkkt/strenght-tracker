'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Search } from 'lucide-react'

type Exercise = {
  id: string
  name: string
  category: string
}

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: 'Bench Press', category: 'Chest' },
    { id: '2', name: 'Squat', category: 'Legs' },
    { id: '3', name: 'Deadlift', category: 'Back' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [newExercise, setNewExercise] = useState({ name: '', category: '' })

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addExercise = () => {
    if (newExercise.name && newExercise.category) {
      setExercises([...exercises, { id: Date.now().toString(), ...newExercise }])
      setNewExercise({ name: '', category: '' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
            <p className="text-gray-600">{exercise.category}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Add New Exercise</h3>
        <div className="space-y-2">
          <div>
            <Label htmlFor="exercise-name">Exercise Name</Label>
            <Input
              id="exercise-name"
              type="text"
              value={newExercise.name}
              onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="exercise-category">Category</Label>
            <Input
              id="exercise-category"
              type="text"
              value={newExercise.category}
              onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
            />
          </div>
          <Button onClick={addExercise}>
            <Plus className="h-5 w-5 mr-2" /> Add Exercise
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExerciseLibrary