import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals'

interface Exercise {
  name: string
  muscleGroups: string[]
  category: string
  description: string
  requiresWeight: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  exerciseType: 'compound' | 'isolation'
  equipmentType: 'machine' | 'bodyweight' | 'weights' | 'cables'
}

interface ExercisesData {
  exercises: Exercise[]
}

const prisma = new PrismaClient()

describe('Exercise Seed Tests', () => {
  let exercisesData: ExercisesData

  beforeAll(async () => {
    // Načtení JSON dat
    const jsonContent = await fs.readFile(
      path.join(__dirname, '..', 'data', 'exercises.json'),
      'utf8'
    )
    exercisesData = JSON.parse(jsonContent)
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('JSON Data Validation', () => {
    test('exercises.json má správnou strukturu', () => {
      expect(exercisesData).toHaveProperty('exercises')
      expect(Array.isArray(exercisesData.exercises)).toBe(true)
    })

    test('každý cvik má všechny povinné vlastnosti', () => {
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(exercise).toHaveProperty('name')
        expect(exercise).toHaveProperty('muscleGroups')
        expect(exercise).toHaveProperty('category')
        expect(exercise).toHaveProperty('description')
        expect(exercise).toHaveProperty('requiresWeight')
        expect(exercise).toHaveProperty('difficulty')
        expect(exercise).toHaveProperty('exerciseType')
        expect(exercise).toHaveProperty('equipmentType')
      })
    })

    test('muscleGroups obsahují pouze povolené hodnoty', () => {
      const allowedMuscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']
      
      exercisesData.exercises.forEach((exercise: Exercise) => {
        exercise.muscleGroups.forEach((group: string) => {
          expect(allowedMuscleGroups).toContain(group)
        })
      })
    })

    test('difficulty má správné hodnoty', () => {
      const allowedDifficulties = ['easy', 'medium', 'hard'] as const
      
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(allowedDifficulties).toContain(exercise.difficulty)
      })
    })

    test('exerciseType má správné hodnoty', () => {
      const allowedTypes = ['compound', 'isolation'] as const
      
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(allowedTypes).toContain(exercise.exerciseType)
      })
    })

    test('equipmentType má správné hodnoty', () => {
      const allowedEquipment = ['machine', 'bodyweight', 'weights', 'cables'] as const
      
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(allowedEquipment).toContain(exercise.equipmentType)
      })
    })

    test('názvy cviků jsou unikátní', () => {
      const names = exercisesData.exercises.map((e: Exercise) => e.name)
      const uniqueNames = new Set(names)
      expect(names.length).toBe(uniqueNames.size)
    })
  })

  describe('Data Consistency', () => {
    test('cviky bez váhy mají requiresWeight: false', () => {
      const bodyweightExercises = exercisesData.exercises.filter(
        (e: Exercise) => e.equipmentType === 'bodyweight'
      )
      
      bodyweightExercises.forEach((exercise: Exercise) => {
        expect(exercise.requiresWeight).toBe(false)
      })
    })

    test('kategorie odpovídá alespoň jedné svalové skupině', () => {
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(exercise.muscleGroups).toContain(exercise.category)
      })
    })
  })

  describe('Data Quality', () => {
    test('popis cviku má minimální délku 20 znaků', () => {
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(exercise.description.length).toBeGreaterThanOrEqual(20)
      })
    })

    test('názvy cviků začínají velkým písmenem', () => {
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(exercise.name[0]).toMatch(/[A-Z]/)
      })
    })

    test('každý cvik má maximálně 4 svalové skupiny', () => {
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(exercise.muscleGroups.length).toBeLessThanOrEqual(4)
      })
    })

    test('svalové skupiny nejsou duplicitní', () => {
      exercisesData.exercises.forEach((exercise: Exercise) => {
        const uniqueGroups = new Set(exercise.muscleGroups)
        expect(uniqueGroups.size).toBe(exercise.muscleGroups.length)
      })
    })

    test('popis cviku končí tečkou', () => {
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(exercise.description).toMatch(/\.$/)
      })
    })

    test('název cviku neobsahuje zbytečné mezery', () => {
      exercisesData.exercises.forEach((exercise: Exercise) => {
        expect(exercise.name).toMatch(/^[^\s].*[^\s]$|^[^\s]$/)
        expect(exercise.name).not.toMatch(/\s{2,}/)
      })
    })
  })

  describe('Business Logic', () => {
    test('compound cviky zasahují více svalových skupin', () => {
      const compoundExercises = exercisesData.exercises.filter(
        e => e.exerciseType === 'compound'
      )
      
      compoundExercises.forEach(exercise => {
        expect(exercise.muscleGroups.length).toBeGreaterThanOrEqual(2)
      })
    })

    test('isolation cviky mají primárně jednu svalovou skupinu', () => {
      const isolationExercises = exercisesData.exercises.filter(
        e => e.exerciseType === 'isolation'
      )
      
      isolationExercises.forEach(exercise => {
        // Hlavní svalová skupina by měla být první v poli
        expect(exercise.muscleGroups[0]).toBe(exercise.category)
      })
    })

    test('těžké cviky jsou compound', () => {
      const hardExercises = exercisesData.exercises.filter(
        e => e.difficulty === 'hard'
      )
      
      hardExercises.forEach(exercise => {
        expect(exercise.exerciseType).toBe('compound')
      })
    })
  })
}) 