import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Exercise {
  id: string
  name: string
  category: string
  description?: string
}

interface ExerciseLibraryStore {
  exercises: Exercise[]
  addExercise: (name: string, category: string, description?: string) => void
  removeExercise: (id: string) => void
  updateExercise: (id: string, name: string, category: string, description?: string) => void
}

export const useExerciseLibraryStore = create<ExerciseLibraryStore>()(
  persist(
    (set) => ({
      exercises: [
        { 
          id: '1', 
          name: 'Bench Press', 
          category: 'Chest',
          description: 'Lehněte si na lavičku, uchopte činku nadhmatem v šířce ramen. Spusťte činku kontrolovaně k hrudníku a zatlačte zpět nahoru.'
        },
        { 
          id: '2', 
          name: 'Squat', 
          category: 'Legs',
          description: 'Postavte se s činkou na zádech, nohy na šířku ramen. Kontrolovaně se spusťte do dřepu a zpět nahoru.'
        },
        { 
          id: '3', 
          name: 'Deadlift', 
          category: 'Back',
          description: 'Uchopte činku na zemi, záda rovná, pohyb vychází z kyčlí. Zvedněte činku plynulým pohybem nahoru.'
        },
        { 
          id: '4', 
          name: 'Pull-up', 
          category: 'Back',
          description: 'Uchopte hrazdu nadhmatem, přitáhněte se tak, aby brada byla nad hrazdou.'
        },
        { 
          id: '5', 
          name: 'Military Press', 
          category: 'Shoulders',
          description: 'Postavte se vzpřímeně, uchopte činku před rameny. Zatlačte činku vzhůru nad hlavu a kontrolovaně spusťte zpět.'
        },
      ],
      addExercise: (name, category, description) =>
        set((state) => ({
          exercises: [...state.exercises, { 
            id: Date.now().toString(), 
            name, 
            category,
            description
          }]
        })),
      removeExercise: (id) =>
        set((state) => ({
          exercises: state.exercises.filter((e) => e.id !== id)
        })),
      updateExercise: (id, name, category, description) =>
        set((state) => ({
          exercises: state.exercises.map((e) =>
            e.id === id ? { ...e, name, category, description } : e
          )
        })),
    }),
    {
      name: 'exercise-library'
    }
  )
) 