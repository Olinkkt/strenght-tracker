'use client'
import { useState } from 'react'
import { useWorkoutStore } from '../store/workoutStore'
import { useExerciseLibraryStore } from '../store/exerciseLibraryStore'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ProgressPage() {
  const workouts = useWorkoutStore((state) => state.workouts)
  const exercises = useExerciseLibraryStore((state) => state.exercises)
  const [selectedExercise, setSelectedExercise] = useState<string>('')

  const processDataForExercise = (exerciseName: string) => {
    return workouts
      .filter(w => w.exercises.some(e => e.name === exerciseName))
      .map(w => {
        const exercise = w.exercises.find(e => e.name === exerciseName)
        if (!exercise || !exercise.sets.length) return null

        const weights = exercise.sets.map(s => s.weight)
        const maxWeight = Math.max(...weights)
        const avgWeight = weights.reduce((acc, weight) => acc + weight, 0) / weights.length

        return {
          date: new Date(w.date).toLocaleDateString('cs-CZ'),
          maxWeight,
          avgWeight
        }
      })
      .filter((data): data is { date: string; maxWeight: number; avgWeight: number } => data !== null)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Progress</h1>
      
      <div className="mb-6">
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Vyberte cvik</option>
          {exercises.map(exercise => (
            <option key={exercise.id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>

      {selectedExercise && (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{selectedExercise}</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processDataForExercise(selectedExercise)}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="maxWeight" 
                  stroke="#8884d8" 
                  name="Maximální váha (kg)"
                />
                <Line 
                  type="monotone" 
                  dataKey="avgWeight" 
                  stroke="#82ca9d" 
                  name="Průměrná váha (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {!selectedExercise && (
        <div className="text-center py-10 text-gray-500">
          Vyberte cvik pro zobrazení progresu
        </div>
      )}
    </div>
  )
}

