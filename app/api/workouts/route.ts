import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

type WorkoutData = {
  date: string
  muscleGroups: string[]
  note?: string
  exercises: {
    exerciseId: string
    sets: {
      reps: number
      weight: number
    }[]
  }[]
}

type SetInput = {
  weight: number
  reps: number
}

type ExerciseInput = {
  exerciseId: string
  sets: SetInput[]
}

export async function POST(request: Request) {
  try {
    console.log('POST request začal')
    const data: WorkoutData = await request.json()
    console.log('Přijatá data:', data)
    
    console.log('Pokus o připojení k databázi...')
    const workout = await prisma.workout.create({
      data: {
        date: data.date,
        muscleGroups: data.muscleGroups,
        note: data.note,
        exercises: {
          create: data.exercises.map((exercise) => ({
            name: exercise.exerciseId,
            exerciseId: exercise.exerciseId,
            sets: {
              create: exercise.sets.map((set) => ({
                weight: set.weight,
                reps: set.reps
              }))
            }
          }))
        }
      },
      include: {
        exercises: {
          include: {
            sets: true
          }
        }
      }
    })
    console.log('Workout úspěšně vytvořen:', workout)

    return NextResponse.json(workout)
  } catch {
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany({
      include: {
        exercises: {
          include: {
            sets: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })
    return NextResponse.json(workouts)
  } catch {
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    )
  }
}