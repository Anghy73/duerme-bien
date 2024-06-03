// TODO: Asignar un valor a la habitación por la cantidad de personas que se puede hospedar en ella

// import { useState } from 'react'
import { useHabitaciones } from '../hooks/useHabitaciones'

function HabitacionForm () {
  const { addH } = useHabitaciones()

  const handleSubmit = (e) => {
    e.preventDefault()

    const { numH, numC, numCP, cTotal, numP, estado, valor } = Object.fromEntries(new FormData(e.target))
    // console.log({ numC, numCP, numH, numP, cTotal, estado, valor })

    const newH = {
      numH,
      numC,
      numCP,
      cTotal,
      numP,
      estado,
      valor
    }

    e.target.reset()
    addH(newH)
  }

  return (
    <form className='hform' onSubmit={handleSubmit}>
      <div className='hform__content'>
        <div>
          <label htmlFor=''>
            N° Habitación
          </label>
          <input id='numH' name='numH' type='number' placeholder='000' />
        </div>
        <div>
          <label htmlFor=''>
            N° Camas
          </label>
          <input id='numC' name='numC' type='number' placeholder='1' min='1' max='10' />
        </div>
        <div>
          <label htmlFor=''>
            N° Camas Plus
          </label>
          <input id='numCP' name='numCP' type='number' placeholder='1' min='1' max='10' />
        </div>
        <div>
          <label htmlFor=''>
            N° Total de Camas
          </label>
          <input id='cTotal' name='cTotal' type='number' placeholder='1' min='1' max='10' />
        </div>
        <div>
          <label htmlFor=''>
            N° Huespedes
          </label>
          <input id='numP' name='numP' type='number' placeholder='1' min='1' max='10' />
        </div>
        <div>
          <label htmlFor='state'>
            Estado
          </label>
          <select id='estado' name='estado'>
            <option value='disponible'>Disponible</option>
            <option value='ocupado'>Ocupado</option>
            <option value='mantencion'>Mantención</option>
          </select>
        </div>
        <div>
          <label htmlFor='state'>
            Valor
          </label>
          <input id='valor' name='valor' type='number' placeholder='10000' />
        </div>
      </div>

      <button className='hform__button'>Crear</button>
    </form>
  )
}

export default HabitacionForm
