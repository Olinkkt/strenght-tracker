import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany({
      include: {
        exercises: {
          include: {
            sets: true
          }
        }
      }
    })
    return NextResponse.json(workouts)
  } catch (error) {
    return NextResponse.json({ error: 'Chyba při načítání workoutů' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const workout = await prisma.workout.create({
      data: {
        date: data.date,
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
    return NextResponse.json(workout)
  } catch (error) {
    return NextResponse.json({ error: 'Chyba při vytváření workoutu' }, { status: 500 })
  }
} 