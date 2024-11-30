'use client'

import { useState, useEffect } from 'react'
import { useExerciseLibraryStore } from '../store/exerciseLibraryStore'
import { X } from 'lucide-react'
import { Exercise, EditingExercise } from '@/lib/utils'

interface ExerciseDetailModalProps {
  exercise: EditingExercise
  onClose: () => void
  onEdit: () => void
}

const ExerciseDetailModal = ({ exercise, onClose, onEdit }: ExerciseDetailModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-sm font-semibold text-gray-500">Kategorie:</span>
              <span className="ml-2">{exercise.category}</span>
            </div>

            {exercise.description && (
              <div>
                <h3 className="font-semibold mb-2">Popis cviku:</h3>
                <p className="text-gray-600">{exercise.description}</p>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Upravit
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Zavřít
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExerciseLibrary() {
  const { 
    exercises, 
    fetchExercises, 
    addExercise, 
    removeExercise, 
    updateExercise 
  } = useExerciseLibraryStore()
  const [newExercise, setNewExercise] = useState({ name: '', category: '' })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingExercise, setEditingExercise] = useState<EditingExercise | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<EditingExercise | null>(null)

  const categories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']

  useEffect(() => {
    fetchExercises()
  }, [fetchExercises])

  const handleAddExercise = async () => {
    if (newExercise.name && newExercise.category) {
      await addExercise(newExercise.name, newExercise.category)
      setNewExercise({ name: '', category: '' })
    }
  }

  const handleUpdateExercise = async () => {
    if (editingExercise) {
      await updateExercise(
        editingExercise.id,
        editingExercise.name,
        editingExercise.category,
        editingExercise.description
      )
      setEditingExercise(null)
    }
  }

  const filteredExercises = exercises
    .filter(e => selectedCategory === 'all' || e.category === selectedCategory)
    .filter(e => {
      if (!e.category) return false
      return e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             e.category.toLowerCase().includes(searchQuery.toLowerCase())
    })

  const editingForm = (
    <div className="space-y-2">
      <input
        type="text"
        value={editingExercise?.name ?? ''}
        onChange={(e) => {
          if (editingExercise) {
            setEditingExercise({ ...editingExercise, name: e.target.value })
          }
        }}
        className="w-full p-2 border rounded"
        placeholder="Název cviku"
      />
      <select
        value={editingExercise?.category}
        onChange={(e) => {
          if (editingExercise) {
            setEditingExercise({ ...editingExercise, category: e.target.value })
          }
        }}
        className="w-full p-2 border rounded"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      {editingExercise && (
        <div className="space-y-2">
          <textarea
            value={editingExercise.description || ''}
            onChange={(e) => setEditingExercise({ 
              ...editingExercise,
              description: e.target.value 
            })}
            className="w-full p-2 border rounded"
            placeholder="Popis cviku"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdateExercise}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Uložit
            </button>
            <button
              onClick={() => setEditingExercise(null)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Zrušit
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const handleOpenDetail = (exercise: Exercise) => {
    const editingExercise: EditingExercise = {
      id: exercise.id,
      name: exercise.name,
      category: exercise.category || '',
      description: exercise.description
    }
    setSelectedExercise(editingExercise)
  }

  const handleEditExercise = (exercise: Exercise) => {
    const editingExercise: EditingExercise = {
      id: exercise.id,
      name: exercise.name,
      category: exercise.category || '',
      description: exercise.description
    }
    setEditingExercise(editingExercise)
  }

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

      {/* Přidání nového cviku */}
      <div className="mb-8 p-4 border rounded-lg bg-white">
        <h2 className="text-lg font-semibold mb-4">Přidat nový cvik</h2>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            value={newExercise.name}
            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
            placeholder="Název cviku"
            className="flex-1 min-w-[200px] p-2 border rounded"
          />
          <select
            value={newExercise.category}
            onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
            className="p-2 border rounded min-w-[150px]"
          >
            <option value="">Vyberte kategorii</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            onClick={handleAddExercise}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Přidat cvik
          </button>
        </div>
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
            {editingExercise?.id === exercise.id ? (
              editingForm
            ) : (
              <div className="flex justify-between items-start">
                <div 
                  className="cursor-pointer"
                  onClick={() => handleOpenDetail(exercise)}
                >
                  <h3 className="font-semibold">{exercise.name}</h3>
                  <span className="text-sm text-gray-500">{exercise.category}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditExercise(exercise)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Upravit
                  </button>
                  <button
                    onClick={() => removeExercise(exercise.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Smazat
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onEdit={() => {
            setEditingExercise(selectedExercise)
            setSelectedExercise(null)
          }}
        />
      )}

      {filteredExercises.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Žádné cviky neodpovídají vašemu vyhledávání
        </div>
      )}
    </div>
  )
}

