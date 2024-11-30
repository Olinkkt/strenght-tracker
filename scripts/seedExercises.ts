import { prisma } from '../lib/prisma'

const exercises = [
  { 
    name: 'Bench Press', 
    muscleGroups: ['Chest'],
    category: 'Chest',
    description: 'Lehněte si na lavičku, uchopte činku nadhmatem v šířce ramen. Spusťte činku kontrolovaně k hrudníku a zatlačte zpět nahoru.'
  },
  { 
    name: 'Squat', 
    muscleGroups: ['Legs'],
    category: 'Legs',
    description: 'Postavte se s činkou na zádech, nohy na šířku ramen. Kontrolovaně se spusťte do dřepu a zpět nahoru.'
  },
  { 
    name: 'Deadlift', 
    muscleGroups: ['Back'],
    category: 'Back',
    description: 'Uchopte činku na zemi, záda rovná, pohyb vychází z kyčlí. Zvedněte činku plynulým pohybem nahoru.'
  },
  { 
    name: 'Pull-up', 
    muscleGroups: ['Back'],
    category: 'Back',
    description: 'Uchopte hrazdu nadhmatem, přitáhněte se tak, aby brada byla nad hrazdou.'
  },
  { 
    name: 'Military Press', 
    muscleGroups: ['Shoulders'],
    category: 'Shoulders',
    description: 'Postavte se vzpřímeně, uchopte činku před rameny. Zatlačte činku vzhůru nad hlavu a kontrolovaně spusťte zpět.'
  },
]

async function main() {
  console.log('Začínám seed databáze...')
  
  for (const exercise of exercises) {
    await prisma.exerciseLibrary.create({
      data: exercise
    })
  }
  
  console.log('Seed dokončen!')
}

main()
  .catch((e) => {
    console.error('Chyba při seedování:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 