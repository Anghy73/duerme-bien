import { useContext } from 'react'
import { HabitacionesContext } from '../../contexts/habitaciones'

export const useHabitaciones = () => {
  const rooms = useContext(HabitacionesContext)

  if (rooms === undefined) {
    throw new Error('useHabitaciones must be used within a HabitacionesProvider')
  }

  return rooms
}
