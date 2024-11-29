import { useWorkoutStore } from '@/store/workoutStore'

interface Set {
  weight: number
  reps: number
}

interface Exercise {
  name: string
  sets: Set[]
}

interface Workout {
  id: string
  date: string
  exercises: Exercise[]
}

interface WorkoutStatsProps {
  workouts?: Workout[]
}

export const WorkoutStats = ({ workouts }: WorkoutStatsProps) => {
  const storeWorkouts = useWorkoutStore((state) => state.workouts)
  const workoutsToUse = workouts ?? storeWorkouts

  const stats = {
    totalWorkouts: workoutsToUse.length,
    totalVolume: workoutsToUse.reduce((acc: number, workout: Workout) => 
      acc + workout.exercises.reduce((eAcc: number, exercise: Exercise) => 
        eAcc + exercise.sets.reduce((sAcc: number, set: Set) => 
          sAcc + (set.weight * set.reps), 0), 0), 0),
    lastWorkout: workoutsToUse.length > 0 
      ? new Date(workoutsToUse[workoutsToUse.length - 1].date).toLocaleDateString('cs-CZ')
      : 'Žádný trénink',
    averageExercisesPerWorkout: workoutsToUse.length > 0
      ? Math.round(workoutsToUse.reduce((acc: number, workout: Workout) => 
          acc + workout.exercises.length, 0) / workoutsToUse.length)
      : 0,
    totalSets: workoutsToUse.reduce((acc: number, workout: Workout) => 
      acc + workout.exercises.reduce((eAcc: number, exercise: Exercise) => 
        eAcc + exercise.sets.length, 0), 0),
    averageVolume: workoutsToUse.length > 0
      ? Math.round(workoutsToUse.reduce((acc: number, workout: Workout) => 
          acc + workout.exercises.reduce((eAcc: number, exercise: Exercise) => 
            eAcc + exercise.sets.reduce((sAcc: number, set: Set) => 
              sAcc + (set.weight * set.reps), 0), 0), 0) / workoutsToUse.length)
      : 0
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Celkem tréninků</h3>
        <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Celkový objem (kg)</h3>
        <p className="text-2xl font-bold">{Math.round(stats.totalVolume).toLocaleString()}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Poslední trénink</h3>
        <p className="text-2xl font-bold">{stats.lastWorkout}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Průměr cviků na trénink</h3>
        <p className="text-2xl font-bold">{stats.averageExercisesPerWorkout}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Celkem setů</h3>
        <p className="text-2xl font-bold">{stats.totalSets}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Průměrný objem na trénink</h3>
        <p className="text-2xl font-bold">{stats.averageVolume.toLocaleString()} kg</p>
      </div>
    </div>
  )
} 