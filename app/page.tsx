'use client'

import { useState, useEffect } from 'react'
import { useWorkoutStore } from './store/workoutStore'
import { X } from 'lucide-react'

interface ExerciseInput {
  name: string
  sets: { weight: number; reps: number }[]
}

interface Exercise {
  id: string
  name: string
  muscleGroups: string[]
  category: string
  description?: string
}

export default function WorkoutLogger() {
  const { workouts } = useWorkoutStore()
  
  const [workoutExercises, setWorkoutExercises] = useState<ExerciseInput[]>([])
  const [selectedExercise, setSelectedExercise] = useState('')
  const [currentSet, setCurrentSet] = useState({ weight: 0, reps: 0 })
  const [showExerciseList, setShowExerciseList] = useState(false)
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([])
  const [showMuscleGroupList, setShowMuscleGroupList] = useState(false)
  const [muscleGroupInput, setMuscleGroupInput] = useState('')
  const [workoutNote, setWorkoutNote] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([])

  const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.muscle-group-dropdown') && !target.closest('.exercise-dropdown')) {
        setShowMuscleGroupList(false)
        setShowExerciseList(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/api/exercises')
        if (!response.ok) throw new Error('Chyba při načítání cviků')
        const data = await response.json()
        setExercises(data)
      } catch (error) {
        console.error('Chyba při načítání cviků:', error)
      }
    }

    fetchExercises()
  }, [])

  const handleAddSet = (exerciseIndex: number) => {
    if (currentSet.weight < 0) {
      alert('Váha nemůže být záporná')
      return
    }
    if (currentSet.weight > 1000) {
      alert('Příliš vysoká váha')
      return
    }
    if (currentSet.reps <= 0) {
      alert('Počet opakování musí být větší než 0')
      return
    }
    if (currentSet.reps > 100) {
      alert('Příliš mnoho opakování')
      return
    }
    const updatedExercises = [...workoutExercises]
    updatedExercises[exerciseIndex].sets.push(currentSet)
    setWorkoutExercises(updatedExercises)
    setCurrentSet({ weight: 0, reps: 0 })
  }

  const handleAddExercise = (exerciseName: string) => {
    setWorkoutExercises([...workoutExercises, { name: exerciseName, sets: [] }])
    setSelectedExercise('')
    setShowExerciseList(false)
  }

  const handleSaveWorkout = async () => {
    if (selectedMuscleGroups.length === 0) {
      alert('Vyberte alespoň jednu svalovou partii')
      return
    }
    if (workoutExercises.length > 0) {
      try {
        const response = await fetch('/api/workouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: new Date().toISOString(),
            muscleGroups: selectedMuscleGroups,
            exercises: workoutExercises,
            note: workoutNote || undefined
          })
        })

        if (!response.ok) {
          throw new Error('Chyba při ukládání')
        }

        const data = await response.json()
        console.log('Uložený workout:', data)

        // Vyčistit formulář
        setWorkoutExercises([])
        setSelectedMuscleGroups([])
        setWorkoutNote('')
      } catch (error) {
        alert('Chyba při ukládání workoutu')
        console.error(error)
      }
    }
  }

  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...workoutExercises]
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1)
    setWorkoutExercises(updatedExercises)
  }

  const handleRemoveExercise = (exerciseIndex: number) => {
    setWorkoutExercises(workoutExercises.filter((_, index) => index !== exerciseIndex))
  }

  const handleToggleMuscleGroup = (muscleGroup: string) => {
    if (selectedMuscleGroups.includes(muscleGroup)) {
      setSelectedMuscleGroups(selectedMuscleGroups.filter(mg => mg !== muscleGroup))
    } else {
      setSelectedMuscleGroups([...selectedMuscleGroups, muscleGroup])
    }
    setShowMuscleGroupList(false)
    setMuscleGroupInput('')
  }

  const filteredExercises = exercises.filter(exercise => {
    if (selectedExercise && !exercise.name.toLowerCase().includes(selectedExercise.toLowerCase())) {
      return false;
    }
    
    if (selectedMuscleGroups.length === 0) {
      return true;
    }

    return selectedMuscleGroups.includes(exercise.category);
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Zaznamenat Trénink</h1>
      
      {/* Výběr svalových partií */}
      <div className="mb-6 relative z-20">
        <div className="flex gap-2">
          <div className="relative flex-1 muscle-group-dropdown">
            <div className="flex items-center">
              <input
                type="text"
                value={muscleGroupInput}
                onChange={(e) => {
                  setMuscleGroupInput(e.target.value)
                  setShowMuscleGroupList(true)
                }}
                onFocus={() => {
                  setShowMuscleGroupList(true)
                  setShowExerciseList(false)
                }}
                placeholder="Vyberte svalové partie"
                className="w-full p-2 border rounded"
              />
              {showMuscleGroupList && (
                <button
                  onClick={() => setShowMuscleGroupList(false)}
                  className="absolute right-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {showMuscleGroupList && (
              <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {muscleGroups
                  .filter(mg => mg.toLowerCase().includes(muscleGroupInput.toLowerCase()))
                  .map(muscleGroup => (
                    <button
                      key={muscleGroup}
                      onClick={() => handleToggleMuscleGroup(muscleGroup)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center ${
                        selectedMuscleGroups.includes(muscleGroup) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <span>{muscleGroup}</span>
                      {selectedMuscleGroups.includes(muscleGroup) && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
        {selectedMuscleGroups.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedMuscleGroups.map(muscleGroup => (
              <span
                key={muscleGroup}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {muscleGroup}
                <button
                  onClick={() => handleToggleMuscleGroup(muscleGroup)}
                  className="hover:text-blue-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Výběr cviku */}
      <div className="mb-6 relative z-10">
        <div className="flex gap-2">
          <div className="relative flex-1 exercise-dropdown">
            <div className="flex items-center">
              <input
                type="text"
                value={selectedExercise}
                onChange={(e) => {
                  setSelectedExercise(e.target.value)
                  setShowExerciseList(true)
                }}
                onFocus={() => {
                  setShowExerciseList(true)
                  setShowMuscleGroupList(false)
                }}
                placeholder="Vyberte nebo vyhledejte cvik"
                className="w-full p-2 border rounded"
              />
              {showExerciseList && (
                <button
                  onClick={() => setShowExerciseList(false)}
                  className="absolute right-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {showExerciseList && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredExercises.map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => handleAddExercise(exercise.name)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                  >
                    <span>{exercise.name}</span>
                    <span className="text-gray-500 text-sm">
                      {exercise.muscleGroups.join(', ')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Seznam cviků v tréninku */}
      <div className="space-y-6">
        {workoutExercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{exercise.name}</h3>
              <button
                onClick={() => handleRemoveExercise(exerciseIndex)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Sety */}
            <div className="space-y-2 mb-4">
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex items-center gap-2 text-gray-600">
                  <span>Set {setIndex + 1}: {set.weight}kg × {set.reps} opakování</span>
                  <button
                    onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Přidání setu */}
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={currentSet.weight || ''}
                onChange={(e) => setCurrentSet({ ...currentSet, weight: Number(e.target.value) })}
                placeholder="Váha (kg)"
                className="w-24 p-2 border rounded"
                min="0"
                step="0.1"
                required
              />
              <input
                type="number"
                value={currentSet.reps || ''}
                onChange={(e) => setCurrentSet({ ...currentSet, reps: Number(e.target.value) })}
                placeholder="Opakování"
                className="w-24 p-2 border rounded"
                min="0"
              />
              <button
                onClick={() => handleAddSet(exerciseIndex)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Přidat set
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Poznámky k tréninku */}
      <div className="mt-6">
        <textarea
          value={workoutNote}
          onChange={(e) => setWorkoutNote(e.target.value)}
          placeholder="Poznámky k tréninku..."
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      {/* Uložit trénink */}
      {workoutExercises.length > 0 && (
        <button
          onClick={handleSaveWorkout}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Uložit trénink
        </button>
      )}
    </div>
  )
}

