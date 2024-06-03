import { useHabitaciones } from '../hooks/useHabitaciones'

function Habitacion ({ habitacion }) {
  const { delH } = useHabitaciones()

  const handleClickEdit = () => {
    // fuck
    const inputH = document.getElementById('numH')
    const inputC = document.getElementById('numC')
    const inputCP = document.getElementById('numCP')
    const inputT = document.getElementById('cTotal')
    const inputP = document.getElementById('numP')
    const inputV = document.getElementById('valor')
    inputH.value = habitacion.numH
    inputC.value = habitacion.numC
    inputCP.value = habitacion.numCP
    inputT.value = habitacion.cTotal
    inputP.value = habitacion.numP
    inputV.value = habitacion.valor

    delH(habitacion.id)
  }

  const handleClickDel = () => {
    delH(habitacion.id)
  }

  return (
    <tr>
      <th>{habitacion.numH}</th>
      <th>{habitacion.numC}</th>
      <th>{habitacion.numCP}</th>
      <th>{habitacion.cTotal}</th>
      <th>{habitacion.numP}</th>
      <th>{habitacion.estado}</th>
      <th>{habitacion.valor}</th>
      <th>
        <button className='edit' onClick={handleClickEdit}>Editar</button>
      </th>
      <th>
        <button className='del' onClick={handleClickDel}>Eliminar</button>
      </th>
    </tr>
  )
}

export default Habitacion
