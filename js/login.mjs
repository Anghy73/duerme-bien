import { fetchData } from "./supabase.mjs"

const formLogin = document.getElementById('formLogin')
const btnContra = document.getElementById('btnRecuperarContraseña')

btnContra.addEventListener('click', () => {
  return alert('Comuníquese con un administrador para realizar el cambio de contraseña')
})

const { fetchedData, error } = await fetchData('empleados');
console.log(fetchedData);
let path = window.location.pathname

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { user, password } = Object.fromEntries(new FormData(e.target))

  const valid = await fetchedData.filter(elem => {
    if (user === elem.nombre && password === elem.clave) {
      return true
    } else {
      return false
    }
  });

  if (valid.length === 1) {
    if (path === '/duerme-bien/' || path === '/' || path === '/index.html') {
      window.localStorage.setItem('tipo', valid[0].tipo)
      window.location.pathname = '/duerme-bien/home.html'
    } else {
    }
  } else {
    alert('Usuario no existe')
  }

  e.target.reset()
})