import { fetchData } from "./supabase.mjs"

const CREDENTIAL_NAME = 'admin'
const CREDENTIAL_PASSWORD = 'admin123'

const formLogin = document.getElementById('formLogin')

const { fetchedData, error } = await fetchData('empleados');
console.log(fetchedData);

formLogin.addEventListener('submit', (e) => {
  e.preventDefault()
  const {user, password} = Object.fromEntries(new FormData(e.target))
  const path = window.location.pathname

  const valid = fetchedData.filter(elem => {
    if (user === elem.nombre && password === elem.clave) {
      return true
    } else {
      return false
    }
  });

  if (valid.length === 1) {
    if (path === '/index.html') {
      window.localStorage.setItem('tipo', valid[0].tipo)
      window.location.pathname = 'home.html'
    }
  } else {
    alert('Usuario no existe')
  }

  // if (user === CREDENTIAL_NAME && password === CREDENTIAL_PASSWORD) {
  //   if (path === '/index.html') {
  //     window.localStorage.setItem('user', CREDENTIAL_NAME)
  //     window.location.pathname = 'home.html'
  //   }
  // } else if (user !== CREDENTIAL_NAME) {
  //   if (path === '/index.html') {
  //     window.localStorage.setItem('user', user)
  //     window.location.pathname = 'home.html'
  //   }
  // } else {
  //   alert('Usuario o Contraseña no valido')
  // }

  e.target.reset()
})