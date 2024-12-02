import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

const validateExercise = (exercise) => {
  const difficulties = ['easy', 'medium', 'hard']
  const exerciseTypes = ['compound', 'isolation']
  const equipmentTypes = ['machine', 'bodyweight', 'weights', 'cables']
  const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']

  if (!exercise.name || typeof exercise.name !== 'string') {
    throw new Error(`Neplatný název cviku: ${exercise.name}`)
  }

  if (!Array.isArray(exercise.muscleGroups) || 
      !exercise.muscleGroups.every(mg => muscleGroups.includes(mg))) {
    throw new Error(`Neplatné svalové skupiny pro cvik ${exercise.name}`)
  }

  if (!difficulties.includes(exercise.difficulty)) {
    throw new Error(`Neplatná obtížnost pro cvik ${exercise.name}`)
  }

  if (!exerciseTypes.includes(exercise.exerciseType)) {
    throw new Error(`Neplatný typ cviku pro ${exercise.name}`)
  }

  if (!equipmentTypes.includes(exercise.equipmentType)) {
    throw new Error(`Neplatný typ vybavení pro cvik ${exercise.name}`)
  }

  return true
}

async function main() {
  try {
    console.log('Začínám seed databáze...')
    
    // Načtení dat z JSON souboru
    const exercisesData = JSON.parse(
      await fs.readFile(
        path.join(__dirname, '..', 'data', 'exercises.json'),
        'utf8'
      )
    )

    // Smazání existujících cviků
    await prisma.exerciseLibrary.deleteMany()
    
    // Validace a vložení nových cviků
    for (const exercise of exercisesData.exercises) {
      try {
        validateExercise(exercise)
        const created = await prisma.exerciseLibrary.create({
          data: exercise
        })
        console.log('Vytvořen cvik:', created.name)
      } catch (error) {
        console.error(`Chyba při vytváření cviku ${exercise.name}:`, error.message)
      }
    }

    const count = await prisma.exerciseLibrary.count()
    console.log(`Seed dokončen! Vytvořeno ${count} cviků.`)
  } catch (error) {
    console.error('Kritická chyba při seedování:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('Chyba:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 