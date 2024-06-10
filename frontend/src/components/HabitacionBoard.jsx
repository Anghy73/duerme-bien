import { useHabitaciones } from '../hooks/useHabitaciones'

import Habitacion from './Habitacion'

function HabitacionBoard () {
  const { rooms } = useHabitaciones()

  return (
    <>
      <table className='hboard'>
        <thead>
          <tr>
            <th>N° Habitaciones</th>
            <th>N° Camas</th>
            <th>N° Camas Plus</th>
            <th>N° Total de Camas</th>
            <th>N° Huespedes</th>
            <th>Estado</th>
            <th>Valor</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {
            rooms.map(habitacion => <Habitacion key={habitacion.id} habitacion={habitacion} />)
          }
        </tbody>
      </table>
    </>
  )
}

export default HabitacionBoard
