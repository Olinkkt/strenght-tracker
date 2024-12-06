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
          create: data.exercises.map((exercise: any) => ({
            name: exercise.name,
            sets: {
              create: exercise.sets.map((set: any) => ({
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
  } catch (error) {
    console.error('Detailní chyba:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Neznámá chyba' },
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    )
  }
}