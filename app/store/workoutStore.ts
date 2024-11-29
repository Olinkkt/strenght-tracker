import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Exercise {
  name: string
  sets: {
    weight: number
    reps: number
  }[]
}

export interface WorkoutSession {
  id: string
  date: string
  exercises: Exercise[]
  muscleGroups: string[]
  note?: string
}

interface WorkoutStore {
  workouts: WorkoutSession[]
  addWorkout: (workout: Omit<WorkoutSession, 'id'>) => void
  removeWorkout: (id: string) => void
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      workouts: [],
      addWorkout: (workout) => 
        set((state) => ({
          workouts: [...state.workouts, {
            ...workout,
            id: Date.now().toString()
          }]
        })),
      removeWorkout: (id) =>
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== id)
        })),
    }),
    {
      name: 'workout-storage'
    }
  )
) 