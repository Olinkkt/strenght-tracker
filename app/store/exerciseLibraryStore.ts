import { create } from 'zustand'
import { Exercise } from '@/lib/utils'

interface ExerciseLibraryState {
  exercises: Exercise[]
  isLoading: boolean
  addExercise: (name: string, category: string) => Promise<void>
  removeExercise: (id: string) => Promise<void>
  updateExercise: (id: string, name: string, category: string, description?: string) => Promise<void>
  fetchExercises: () => Promise<void>
}

export const useExerciseLibraryStore = create<ExerciseLibraryState>((set) => ({
  exercises: [],
  isLoading: false,

  fetchExercises: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/exercises')
      const exercises = await response.json()
      console.log('Store: Received exercises:', exercises)
      set({ exercises })
    } catch (error) {
      console.error('Store Error:', error)
      set({ exercises: [] })
    } finally {
      set({ isLoading: false })
    }
  },

  addExercise: async (name, category) => {
    try {
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category })
      })
      const newExercise = await response.json()
      set((state) => ({ exercises: [...state.exercises, newExercise] }))
    } catch (error) {
      console.error('Chyba při přidávání cviku:', error)
    }
  },

  removeExercise: async (id) => {
    try {
      await fetch(`/api/exercises/${id}`, { method: 'DELETE' })
      set((state) => ({
        exercises: state.exercises.filter((exercise) => exercise.id !== id)
      }))
    } catch (error) {
      console.error('Chyba při mazání cviku:', error)
    }
  },

  updateExercise: async (id, name, category, description) => {
    try {
      const response = await fetch(`/api/exercises/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, description })
      })
      const updatedExercise = await response.json()
      set((state) => ({
        exercises: state.exercises.map((exercise) =>
          exercise.id === id ? updatedExercise : exercise
        )
      }))
    } catch (error) {
      console.error('Chyba při aktualizaci cviku:', error)
    }
  }
})) 