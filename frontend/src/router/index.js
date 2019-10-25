import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Publicar from '../views/Publicar.vue'
import Categoria from '../views/Categoria.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Publicar',
    name: 'Publicar',
    component: Publicar
  },
  {
    path: '/Categoria',
    name: 'Categoria',
    component: Categoria
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
