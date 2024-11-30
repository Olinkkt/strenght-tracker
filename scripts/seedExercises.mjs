import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const exercises = [
  { 
    name: 'Bench Press',
    category: 'Chest',
    description: 'Lehněte si na lavičku, uchopte činku nadhmatem v šířce ramen. Spusťte činku kontrolovaně k hrudníku a zatlačte zpět nahoru.'
  },
  { 
    name: 'Squat',
    category: 'Legs',
    description: 'Postavte se s činkou na zádech, nohy na šířku ramen. Kontrolovaně se spusťte do dřepu a zpět nahoru.'
  },
  { 
    name: 'Deadlift',
    category: 'Back',
    description: 'Uchopte činku na zemi, záda rovná, pohyb vychází z kyčlí. Zvedněte činku plynulým pohybem nahoru.'
  },
  { 
    name: 'Pull-up',
    category: 'Back',
    description: 'Uchopte hrazdu nadhmatem, přitáhněte se tak, aby brada byla nad hrazdou.'
  },
  { 
    name: 'Military Press',
    category: 'Shoulders',
    description: 'Postavte se vzpřímeně, uchopte činku před rameny. Zatlačte činku vzhůru nad hlavu a kontrolovaně spusťte zpět.'
  },
  {
    name: 'Pushup',
    category: 'Chest',
    description: 'Vzpor ležmo, ruce na šířku ramen. Spusťte se kontrolovaně dolů, lokty u těla, a zatlačte zpět nahoru.'
  },
  {
    name: 'Lateral Raise',
    category: 'Shoulders',
    description: 'Stůjte s jednoručkami podél těla. Zvedejte paže do stran až do úrovně ramen, lokty mírně pokrčené.'
  },
  {
    name: 'Shoulder Press',
    category: 'Shoulders',
    description: 'Sedněte/stůjte s jednoručkami u ramen. Tlačte činky vzhůru do propnutí loktů a kontrolovaně spusťte zpět.'
  },
  {
    name: 'Bicep Curl',
    category: 'Arms',
    description: 'Uchopte činku podhmatem na šířku ramen. Ohýbejte lokty a zvedejte činku k ramenům, spusťte zpět dolů.'
  },
  {
    name: 'Tricep Extension',
    category: 'Arms',
    description: 'Uchopte jednoručku oběma rukama za hlavou. Propněte lokty a zvedněte činku nad hlavu, pomalu spusťte zpět.'
  },
  {
    name: 'Leg Press',
    category: 'Legs',
    description: 'Sedněte na stroj, nohy na plošině na šířku ramen. Spusťte váhu kontrolovaně dolů a zatlačte zpět nahoru.'
  },
  {
    name: 'Crunches',
    category: 'Core',
    description: 'Lehněte si, nohy pokrčené, ruce za hlavou. Zvedejte horní část těla směrem ke kolenům a pomalu zpět.'
  },
  {
    name: 'Plank',
    category: 'Core',
    description: 'Vzpor na předloktích, tělo v jedné rovině. Zpevněte břicho a držte pozici po určený čas.'
  },
  {
    name: 'Dips',
    category: 'Chest',
    description: 'Uchopte bradla, ruce propnuté. Spusťte se kontrolovaně dolů, lokty u těla, a vytlačte se zpět nahoru.'
  },
  {
    name: 'Romanian Deadlift',
    category: 'Back',
    description: 'Stůjte s činkou před stehny, nohy mírně pokrčené. S rovnými zády spouštějte činku podél stehen dolů a zpět.'
  }
]

async function main() {
  console.log('Začínám seed databáze...')
  
  // Nejdřív smažeme všechny existující cviky
  await prisma.exerciseLibrary.deleteMany()
  
  // Pak přidáme nové
  for (const exercise of exercises) {
    const created = await prisma.exerciseLibrary.create({
      data: exercise
    })
    console.log('Vytvořen cvik:', created)
  }
  
  // Kontrola
  const allExercises = await prisma.exerciseLibrary.findMany()
  console.log('Všechny cviky v databázi:', allExercises)
}

main()
  .catch(e => {
    console.error('Chyba:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 