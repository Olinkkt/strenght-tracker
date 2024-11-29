'use client'

import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const ProgressChart = () => {
  const [selectedExercise, setSelectedExercise] = useState('Bench Press')

  const exercises = ['Bench Press', 'Squat', 'Deadlift']

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Max Weight (lbs)',
        data: [135, 145, 150, 155, 160, 165],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Progress for ${selectedExercise}`,
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercise Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedExercise} defaultValue={selectedExercise}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select exercise" />
          </SelectTrigger>
          <SelectContent>
            {exercises.map((exercise) => (
              <SelectItem key={exercise} value={exercise}>
                {exercise}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="h-[300px]">
          <Line options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressChart

