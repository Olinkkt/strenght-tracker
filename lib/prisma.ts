import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  // Přidejte zde případnou development logiku
}

export default prisma 