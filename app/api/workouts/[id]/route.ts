import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Díky kaskádovému mazání stačí smazat jen workout
    await prisma.workout.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Chyba při mazání:', error)
    return NextResponse.json(
      { error: 'Chyba při mazání workoutu' },
      { status: 500 }
    )
  }
} 