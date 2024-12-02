import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MUSCLE_GROUPS = {
  CHEST: 'Chest',
  BACK: 'Back',
  LEGS: 'Legs',
  SHOULDERS: 'Shoulders',
  ARMS: 'Arms',
  CORE: 'Core'
} as const

export type MuscleGroup = typeof MUSCLE_GROUPS[keyof typeof MUSCLE_GROUPS]

export interface Exercise {
  id: string
  name: string
  muscleGroups: string[]
  category: string
  description: string
  requiresWeight: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  exerciseType: 'compound' | 'isolation'
  equipmentType: 'machine' | 'bodyweight' | 'weights' | 'cables'
}

export type EditingExercise = Required<Pick<Exercise, 'id' | 'name' | 'category'>> & {
  description?: string
} 