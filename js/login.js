const CREDENTIAL_NAME = 'admin'
const CREDENTIAL_PASSWORD = 'admin123'

const formLogin = document.getElementById('formLogin')
formLogin.addEventListener('submit', (e) => {
  e.preventDefault()
  const {user, password} = Object.fromEntries(new FormData(e.target))

  if (user === CREDENTIAL_NAME && password === CREDENTIAL_PASSWORD) {
    const path = window.location.pathname
    if (path === '/login.html') {
      window.location.pathname = 'index.html'
    }
  } else {
    alert('Usuario o Contraseña no valido')
  }

  e.target.reset()
})