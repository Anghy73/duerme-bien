import { Link } from 'react-router-dom'

function Header () {
  return (
    <header className='header'>
      <h1 className='header__logo'>
        <p>Duerme</p>
        <p>Bien</p>
      </h1>
      <nav className='header__nav'>
        <ul className='header__content'>
          <li className='header__item'><Link className='header__link' to='/'>Inicio</Link></li>
          <li className='header__item'><Link className='header__link' to='/clientes'>Clientes</Link></li>
          <li className='header__item'><Link className='header__link' to='/habitaciones'>Habitaciones</Link></li>
          <li className='header__item'><Link className='header__link' to='/reservas'>Reservas</Link></li>
          <li className='header__item'><Link className='header__link' to='/resumen'>Resumen</Link></li>
        </ul>
      </nav>
      <div className='header__profile'>
        <p>AD</p>
      </div>
    </header>
  )
}

export default Header
