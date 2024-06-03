import HabitacionBoard from '../components/HabitacionBoard'
import HabitacionForm from '../components/HabitacionForm'
import Header from '../components/Header'

function Habitaciones () {
  return (
    <>
      <Header />
      <div className='habitaciones'>
        <HabitacionForm />
        <HabitacionBoard />
      </div>
    </>
  )
}

export default Habitaciones
