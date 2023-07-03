// 1.1-. instalamos el router: npm install vue-router@4 
// 1.2-. realizamos la importacion de los elementos que usaremos que estan contenidos en vue-router
import { createRouter, createWebHashHistory } from 'vue-router'

// 1.3-. creamos las rutas e importamos los componentes a usar como paginas
const routes = [
  //                       LazyLoad = los modulos estan separados del bundle(carga inicial) principal de la aplicacion, 
  //                                  esto ayuda a tener tiempos mas pequeños de carga, en lugar de tener una sola descarga grande, 
  //                                  se tendran muchas descargas pequeñas
  //                      () => import ()
  //                               nombre que se vera en navegador red/network   ruta de la pagina
  { path: '/home', name: 'home', component: () => import(/* webpackChunkName: "Home.vue" */ '../components/Home') },
  // En caso de que no se escriba directamente en la url el home, este redireccionara automaticamente al ir a la direccion "/"
  { path: '/', redirect: 'home' },
  { path: '/login', name: 'login', component: () => import(/* webpackChunkName: "Login.vue" */ '../components/Login') },
  { path: '/detail_platform/', name: 'detail_platform', props: true, component: () => import(/* webpackChunkName: "DetailPlatform.vue" */ '../components/DetailPlatform') },
  { path: '/detail_sensor/', name: 'detail_sensor', props: true, component: () => import(/* webpackChunkName: "DetailSensor.vue" */ '../components/DetailSensor') },
  // page 404 Not Found
  // se busca cualquier url que no tenga match con los especificados aca en las rutas
  { path: '/:pathMatch(.*)*', component: () => import(/* webpackChunkName: "Error404PageNotFound.vue" */ '../components/Error404PageNotFound') },
]

// 1.4-. creamos la instancia del router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

let token = sessionStorage.getItem("Token");
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (checkTokenExpiration() == false) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

function checkTokenExpiration() {
  let token = sessionStorage.getItem('Token')
  let tokenDateExpiration = sessionStorage.getItem('expirationDate')

  const isoString = tokenDateExpiration
  const date = new Date(isoString)
  date.setHours(date.getHours() + 3)

  const options = {
    timeZone: 'America/Santiago',
    timeZoneName: 'short',
  }
  const dateTokenExpiration = date.toLocaleString('en-US', options)

  const currentTime = new Date()
  const dateCurrentTime = currentTime.toLocaleString('en-US', options)

  if (dateTokenExpiration > dateCurrentTime) {
    return true // El token ha expirado
  } else {
    return false // El token aún es válido
  }
}

// 1.5-. lo exportamos para su uso: main.js
export default router