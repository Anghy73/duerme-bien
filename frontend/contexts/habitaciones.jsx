import { createContext, useReducer } from 'react'
import { reducerH, reducerHInitialState } from '../reducers/reducerH'

export const HabitacionesContext = createContext()

export function HabitacionesProvider ({ children }) {
  const [state, dispatch] = useReducer(reducerH, reducerHInitialState)

  const addH = product => dispatch({
    type: 'ADD_H',
    payload: product
  })

  const editH = product => dispatch({
    type: 'UPDATE_H',
    payload: product
  })

  // const editH = product => {
  //   room = state.find(item => item.id === product)
  // }

  const delH = product => dispatch({
    type: 'DEL_H',
    payload: product
  })

  return (
    <HabitacionesContext.Provider value={{
      rooms: state,
      addH,
      editH,
      delH
    }}
    >
      {children}
    </HabitacionesContext.Provider>
  )
}
