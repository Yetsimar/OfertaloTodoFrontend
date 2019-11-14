import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Publicar from '../views/Publicar.vue'
import Categoria from '../views/Categoria.vue'
import Publicaciones from '../views/Publicaciones.vue'
import Perfil from '../views/Perfil.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
    },
    {
      path: '/publicaciones',
      name: 'Publicaciones',
      component: Publicaciones
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    }
  ]
})
