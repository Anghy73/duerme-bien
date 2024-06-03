import Header from './components/Header'
import Inicio from './pages/Inicio'

// TODO: fechas de ingreso salida del hotel en cliente, guardar fecha de reservación en la bd y mostrar en resumen

function App () {
  return (
    <>
      <Header />
      <main className='main'>
        <Inicio />
      </main>
      {/* <footer>comming soon</footer> */}
    </>
  )
}

export default App
