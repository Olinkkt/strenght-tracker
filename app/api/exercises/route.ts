import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    const exercises = await prisma.exerciseLibrary.findMany()
    return NextResponse.json(exercises)
  } catch (error) {
    return NextResponse.json(
      { error: 'Chyba při načítání cviků' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const exercise = await prisma.exerciseLibrary.create({
      data: {
        name: body.name,
        muscleGroups: body.muscleGroups,
        category: body.category,
        description: body.description
      }
    })
    return NextResponse.json(exercise)
  } catch (error) {
    return NextResponse.json(
      { error: 'Chyba při vytváření cviku' },
      { status: 500 }
    )
  }
} 