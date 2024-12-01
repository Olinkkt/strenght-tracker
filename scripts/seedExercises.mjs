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
  },
  {
    name: "Incline Dumbbell Press",
    category: "Chest",
    description: "Lehněte si na nakloněnou lavičku, držte jednoručky v úrovni hrudníku. Zatlačte je nahoru a kontrolovaně je spusťte zpět."
  },
  {
    name: "Cable Crossover",
    category: "Chest",
    description: "Stůjte mezi kabelovými kladkami, uchopte madla. Ohněte lokty a přitáhněte ruce k sobě před tělem, poté pomalu vraťte zpět."
  },
  {
    name: "Pec Deck Fly",
    category: "Chest",
    description: "Sedněte si na stroj s opěrkami pro paže, uchopte rukojeti. Stáhněte paže k sobě ve tvaru 'létání' a kontrolovaně vraťte zpět."
  },
  {
    name: "Bulgarian Split Squat",
    category: "Legs",
    description: "Postavte jednu nohu na lavičku za vámi a druhou na podlaze. Snižujte tělo do dřepu, dokud není koleno zadní nohy téměř na zemi, a vraťte zpět."
  },
  {
    name: "Step-ups s činkou",
    category: "Legs",
    description: "Postavte se před lavičku, držte činky v rukou. Krokem jedné nohy na lavičku, zatlačte a vstaňte."
  },
  {
    name: "Calf Raises",
    category: "Legs",
    description: "Postavte se na okraj stupně s patami volně visícími dolů. Zvedněte se na špičky a pomalu se vraťte zpět."
  },
  {
    name: "Glute Bridge",
    category: "Legs",
    description: "Lehněte si na záda s pokrčenýma nohama. Zvedněte boky do vzduchu, stahujte hýždě a pomalu se vraťte zpět."
  },
  {
    name: "One-Arm Dumbbell Row",
    category: "Back",
    description: "Podporujte se jednou rukou na lavičce, druhou rukou zvedejte jednoručku k boku, loket u těla."
  },
  {
    name: "Chin-up",
    category: "Back",
    description: "Uchopte hrazdu podhmatem, přitáhněte se tak, aby brada byla nad hrazdou."
  },
  {
    name: "Lat Pulldown",
    category: "Back",
    description: "Sedněte na stroj s širokým úchopem. Táhněte tyč směrem k hrudníku a kontrolovaně vraťte zpět."
  },
  {
    name: "Pendlay Row",
    category: "Back",
    description: "Zatněte záda v rovině, činku uchopte nadhmatem, zvedněte ji přímo vzhůru k břiše a spusťte zpět na zem."
  },
  {
    name: "Arnold Press",
    category: "Shoulders",
    description: "Sedněte nebo stojte, držte jednoručky v úrovni ramen. Zatlačte činky nahoru a při tom otáčejte zápěstí."
  },
  {
    name: "Upright Row",
    category: "Shoulders",
    description: "Stůjte s činkami v rukou, zvedněte je rovně nahoru k bradě, lokty by měly směřovat vzhůru."
  },
  {
    name: "Dumbbell Shrugs",
    category: "Shoulders",
    description: "Stůjte s činkami v rukou, zvedněte ramena co nejvýš, držte je chvíli nahoře a pomalu spusťte."
  },
  {
    name: "Hammer Curl",
    category: "Arms",
    description: "Držte činky v neutrálním úchopu, ohýbejte lokty a zvedejte činky směrem k ramenům."
  },
  {
    name: "Zottman Curl",
    category: "Arms",
    description: "Držte činky s palci nahoru, ohýbejte lokty, zvedněte činky a poté otočte zápěstí dolů pro negativní fázi."
  },
  {
    name: "Close-grip Bench Press",
    category: "Arms",
    description: "Lehněte si na lavičku, uchopte činku nadhmatem s úzkým úchopem. Spusťte činku k hrudníku a vytlačte ji zpět."
  },
  {
    name: "Reverse Grip Tricep Pushdown",
    category: "Arms",
    description: "Uchopte lano nebo tyč na kabelovém stroji podhmatem. Zatlačte ruce dolů a kontrolovaně vraťte zpět."
  },
  {
    name: "Hanging Leg Raise",
    category: "Core",
    description: "Visíte na hrazdě, zvedněte nohy ke středu těla, napněte břicho a kontrolovaně je spusťte zpět."
  },
  {
    name: "Russian Twists",
    category: "Core",
    description: "Sedněte si na podložku, pokrčte nohy a držte váhu nebo medicinbal. Otočte trup zleva doprava v kontrolovaných pohybech."
  },
  {
    name: "Mountain Climbers",
    category: "Core",
    description: "Začněte v pozici na prknech, přitahujte střídavě kolena k hrudi, jako byste lezli po horách."
  },
  {
    name: "V-ups",
    category: "Core",
    description: "Lehněte si na záda, zvedněte nohy a horní část těla současně, abyste se dotkli rukama vašich nohou a vrátili zpět."
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