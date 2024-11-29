'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2 } from 'lucide-react'

type Workout = {
  id: string
  name: string
  day: string
  exercises: string[]
}

const WorkoutPlanner = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [newWorkout, setNewWorkout] = useState<Omit<Workout, 'id'>>({
    name: '',
    day: '',
    exercises: [],
  })

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const addWorkout = () => {
    if (newWorkout.name && newWorkout.day) {
      setWorkouts([...workouts, { ...newWorkout, id: Date.now().toString() }])
      setNewWorkout({ name: '', day: '', exercises: [] })
    }
  }

  const removeWorkout = (id: string) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id))
  }

  const addExerciseToWorkout = (workoutId: string, exercise: string) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === workoutId
          ? { ...workout, exercises: [...workout.exercises, exercise] }
          : workout
      )
    )
  }

  const removeExerciseFromWorkout = (workoutId: string, exerciseIndex: number) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.filter((_, index) => index !== exerciseIndex),
            }
          : workout
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Create New Workout</h3>
        <div className="space-y-2">
          <div>
            <Label htmlFor="workout-name">Workout Name</Label>
            <Input
              id="workout-name"
              value={newWorkout.name}
              onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="workout-day">Day</Label>
            <Select
              onValueChange={(value) => setNewWorkout({ ...newWorkout, day: value })}
              value={newWorkout.day}
            >
              <SelectTrigger id="workout-day">
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addWorkout}>Add Workout</Button>
        </div>
      </div>
      {workouts.map((workout) => (
        <div key={workout.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              {workout.name} - {workout.day}
            </h3>
            <Button variant="ghost" size="icon" onClick={() => removeWorkout(workout.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-2">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{exercise}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExerciseFromWorkout(workout.id, index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex space-x-2">
              <Input
                placeholder="Add exercise"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addExerciseToWorkout(workout.id, e.currentTarget.value)
                    e.currentTarget.value = ''
                  }
                }}
              />
              <Button
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement
                  addExerciseToWorkout(workout.id, input.value)
                  input.value = ''
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WorkoutPlanner