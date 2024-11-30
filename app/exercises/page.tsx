'use client'

import { useState, useEffect } from 'react'
import { useExerciseLibraryStore } from '../store/exerciseLibraryStore'
import { Exercise } from '@/lib/utils'

export default function ExerciseLibrary() {
  const { exercises, fetchExercises } = useExerciseLibraryStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']

  useEffect(() => {
    fetchExercises()
  }, [fetchExercises])

  const filteredExercises = exercises
    .filter(e => selectedCategory === 'all' || e.category === selectedCategory)
    .filter(e => {
      if (!e.category) return false
      return e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             e.category.toLowerCase().includes(searchQuery.toLowerCase())
    })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Knihovna cviků</h1>

      {/* Vyhledávání */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Vyhledat cvik..."
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Filtrování podle kategorie */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Všechny
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Seznam cviků */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map(exercise => (
          <div
            key={exercise.id}
            className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold">{exercise.name}</h3>
              <span className="text-sm text-gray-500">{exercise.category}</span>
              {exercise.description && (
                <p className="mt-2 text-gray-600 text-sm">{exercise.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Žádné cviky neodpovídají vašemu vyhledávání
        </div>
      )}
    </div>
  )
}

