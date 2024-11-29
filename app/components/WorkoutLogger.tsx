'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'

type Exercise = {
  id: string
  name: string
  sets: { reps: number; weight: number }[]
}

const WorkoutLogger = () => {
  const [exercises, setExercises] = useState<Exercise[]>([])

  const addExercise = () => {
    setExercises([...exercises, { id: Date.now().toString(), name: '', sets: [{ reps: 0, weight: 0 }] }])
  }

  const updateExercise = (id: string, name: string) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, name } : ex))
  }

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => 
      ex.id === exerciseId ? { ...ex, sets: [...ex.sets, { reps: 0, weight: 0 }] } : ex
    ))
  }

  const updateSet = (exerciseId: string, setIndex: number, field: 'reps' | 'weight', value: number) => {
    setExercises(exercises.map(ex => 
      ex.id === exerciseId ? {
        ...ex,
        sets: ex.sets.map((set, idx) => idx === setIndex ? { ...set, [field]: value } : set)
      } : ex
    ))
  }

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id))
  }

  return (
    <div className="space-y-6">
      {exercises.map((exercise) => (
        <div key={exercise.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <Input
              type="text"
              value={exercise.name}
              onChange={(e) => updateExercise(exercise.id, e.target.value)}
              placeholder="Exercise name"
              className="text-lg font-semibold"
            />
            <Button variant="ghost" size="icon" onClick={() => removeExercise(exercise.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-2">
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="flex space-x-2">
                <div>
                  <Label htmlFor={`reps-${exercise.id}-${setIndex}`}>Reps</Label>
                  <Input
                    id={`reps-${exercise.id}-${setIndex}`}
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(exercise.id, setIndex, 'reps', parseInt(e.target.value))}
                    className="w-20"
                  />
                </div>
                <div>
                  <Label htmlFor={`weight-${exercise.id}-${setIndex}`}>Weight</Label>
                  <Input
                    id={`weight-${exercise.id}-${setIndex}`}
                    type="number"
                    value={set.weight}
                    onChange={(e) => updateSet(exercise.id, setIndex, 'weight', parseFloat(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => addSet(exercise.id)} className="mt-2">
            <Plus className="h-4 w-4 mr-1" /> Add Set
          </Button>
        </div>
      ))}
      <Button onClick={addExercise} className="w-full">
        <Plus className="h-5 w-5 mr-2" /> Add Exercise
      </Button>
    </div>
  )
}

export default WorkoutLogger