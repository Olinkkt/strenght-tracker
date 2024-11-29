export const exportData = () => {
  const data = {
    workouts: JSON.parse(localStorage.getItem('workout-storage') || '{}'),
    exercises: JSON.parse(localStorage.getItem('exercise-library') || '{}')
  }
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `strength-tracker-backup-${new Date().toLocaleDateString()}.json`
  a.click()
}

export const importData = async (file: File) => {
  const text = await file.text()
  const data = JSON.parse(text)
  localStorage.setItem('workout-storage', JSON.stringify(data.workouts))
  localStorage.setItem('exercise-library', JSON.stringify(data.exercises))
  window.location.reload()
} 