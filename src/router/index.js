import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NuevaCuenta from '../views/NuevaCuenta.vue'
import NuevaTransaccion from '../views/NuevaTransaccion.vue'
import CuentaTransaccion from '../views/CuentaTransaccion.vue'
import VistaCliente from '../views/VistaCliente.vue'
import Login from '../views/Login.vue'
import VerTransacciones from '../views/VerTransacciones.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {path:'/nuevacuenta/:codCliente', name:'NuevaCuenta',component: NuevaCuenta},
  {path:'/cuenta-transaccion/:codCliente', name:'CuentaTransaccion',component: CuentaTransaccion},
  {path:'/nuevatransaccion/:numeroCuenta', name:'NuevaTransaccion',component: NuevaTransaccion},
  {path:'/login', name:'Login',component: Login},
  {path:'/inicio/:dui', name:'VistaCliente',component: VistaCliente},
  {path:'/transacciones/:numeroCuenta', name:'VerTransacciones',component: VerTransacciones},
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
