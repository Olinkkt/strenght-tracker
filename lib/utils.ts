import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Exercise {
  id: string
  name: string
  category: string
  description?: string
}

export type EditingExercise = Required<Pick<Exercise, 'id' | 'name' | 'category'>> & {
  description?: string
} 