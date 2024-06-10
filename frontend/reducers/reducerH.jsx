export const reducerHInitialState = [
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

export const reducerH = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_H': {
      console.log('click')
      const newH = {
        id: Date.now(),
        ...actionPayload
      }
      const newState = [...state, newH]
      return newState
    }

    case 'UPDATE_H': {
      return state
    }

    case 'DEL_H': {
      return state.filter(item => item.id !== actionPayload)
    }
  }
}
