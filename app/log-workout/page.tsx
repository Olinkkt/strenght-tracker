'use client'

import { useState, useEffect } from 'react'
import { Exercise } from '@/lib/utils'
import { useExerciseLibraryStore } from '../store/exerciseLibraryStore'
import { Button } from '@/components/ui/button'

export default function LogWorkout() {
  const { exercises, fetchExercises } = useExerciseLibraryStore()
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetchExercises()
  }, [fetchExercises])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Zaznamenat Trénink</h1>

      {/* Vyhledávání cviků */}
      <input
        type="text"
        placeholder="Vyberte nebo vyhledejte cvik"
        className="w-full p-2 border rounded mb-4"
      />

      {/* Seznam vybraných cviků */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Vybrané cviky:</h2>
        <div className="space-y-2">
          {selectedExercises.map((exercise, index) => (
            <div 
              key={`${exercise.id}-${index}`}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span>{exercise.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedExercises(prev => 
                  prev.filter((_, i) => i !== index)
                )}
              >
                Odstranit
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Seznam všech cviků */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Dostupné cviky:</h2>
        <div className="space-y-2">
          {exercises.map(exercise => (
            <button
              key={exercise.id}
              onClick={() => setSelectedExercises(prev => [...prev, exercise])}
              className="w-full text-left p-2 hover:bg-gray-100 rounded"
            >
              {exercise.name} ({exercise.category})
            </button>
          ))}
        </div>
      </div>

      {/* Poznámky k tréninku */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Poznámky k tréninku</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Volitelné poznámky k tréninku..."
        />
      </div>

      <Button 
        onClick={() => {
          console.log({
            exercises: selectedExercises,
            notes
          })
        }}
        className="w-full"
      >
        Uložit trénink
      </Button>
    </div>
  )
} 