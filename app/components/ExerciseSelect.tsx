'use client'

import { useState, useEffect } from 'react'
import { useExerciseLibraryStore } from '../store/exerciseLibraryStore'
import { Exercise, MuscleGroup } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ExerciseSelectProps {
  selectedMuscleGroup?: MuscleGroup
  onExerciseSelect: (exercise: Exercise) => void
}

export function ExerciseSelect({ selectedMuscleGroup, onExerciseSelect }: ExerciseSelectProps) {
  const { exercises, fetchExercises } = useExerciseLibraryStore()

  useEffect(() => {
    fetchExercises()
  }, [fetchExercises])

  console.log('Selected muscle group:', selectedMuscleGroup)
  console.log('All exercises:', exercises)

  const filteredExercises = selectedMuscleGroup 
    ? exercises.filter(exercise => exercise.category === selectedMuscleGroup)
    : exercises

  console.log('Filtered exercises:', filteredExercises)

  if (filteredExercises.length === 0) {
    console.log('No exercises found for category:', selectedMuscleGroup)
  }

  return (
    <Select onValueChange={(value) => {
      const exercise = exercises.find(e => e.id === value)
      if (exercise) onExerciseSelect(exercise)
    }}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Vyberte cvik" />
      </SelectTrigger>
      <SelectContent>
        {filteredExercises.map(exercise => (
          <SelectItem key={exercise.id} value={exercise.id}>
            {exercise.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 