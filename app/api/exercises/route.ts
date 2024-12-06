import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const exercises = await prisma.exerciseLibrary.findMany()
    console.log('API RESPONSE:', exercises)
    return new NextResponse(JSON.stringify(exercises), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('API ERROR:', error)
    return new NextResponse(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
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