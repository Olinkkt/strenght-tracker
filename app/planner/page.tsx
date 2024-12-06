'use client'
import { useState } from 'react'
import { useExerciseLibraryStore } from '../store/exerciseLibraryStore'

interface PlannedWorkout {
  id: string
  name: string
  exercises: { name: string; targetSets: number; targetReps: number }[]
  dayOfWeek: number
}

export default function PlannerPage() {
  // const [workoutPlans, setWorkoutPlans] = useState<PlannedWorkout[]>([])
  // const exercises = useExerciseLibraryStore((state) => state.exercises)

  // Implementace plánování tréninků...
}

