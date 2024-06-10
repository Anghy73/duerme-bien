import { createContext, useEffect, useReducer, useState } from 'react'
import { reducerH, reducerHInitialState } from '../reducers/reducerH'

export const HabitacionesContext = createContext()

export function HabitacionesProvider ({ children }) {
  // const [state, dispatch] = useReducer(reducerH, reducerHInitialState)
  const [state, setState] = useState([])

  useEffect(() => {
    const arrayState = [
      {
        id: Date.now(),
        numH: '000',
        numC: 3,
        numCP: 1,
        cTotal: 4,
        numP: 5,
        estado: 'Disponible',
        valor: 40000
      },
      {
        id: Date.now() + 1,
        numH: '001',
        numC: 2,
        numCP: 2,
        cTotal: 4,
        numP: 4,
        estado: 'Ocupado',
        valor: 30000
      }
    ]
    setState(arrayState)
  }, [])

  const addH = (product) => {
    console.log('si')
    // fetch('url', {
    //   method: 'POST'
    // })
  }

  // const editH = product => dispatch({
  //   type: 'UPDATE_H',
  //   payload: product
  // })

  // const editH = product => {
  //   room = state.find(item => item.id === product)
  // }

  // const delH = product => dispatch({
  //   type: 'DEL_H',
  //   payload: product
  // })

  return (
    <HabitacionesContext.Provider value={{
      rooms: state,
      addH
      // editH,
      // delH
    }}
    >
      {children}
    </HabitacionesContext.Provider>
  )
}
