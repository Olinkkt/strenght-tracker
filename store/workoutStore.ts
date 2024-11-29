import { create } from 'zustand'

interface WorkoutStore {
  workouts: any[]
  // ... další typy a stav
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],
  // ... další implementace
})) 