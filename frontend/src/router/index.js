import Vue from 'vue'
import store from '@/store/'
import Router from 'vue-router'
import swal from 'vue-sweetalert2'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Publicaciones from '../views/Publicaciones.vue'
import Publicar from '../views/Publicar.vue'
import Perfil from '../views/Perfil.vue'
import Categoria from '../views/Categoria.vue'
import LoginApi from '@/services/login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        isPublic: true,
        isLog: true
      }
    },
    {
      path: '/Perfil',
      name: 'Perfil',
      component: Perfil,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/Publicar',
      name: 'Publicar',
      component: Publicar,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/Publicaciones',
      name: 'Publicaciones',
      component: Publicaciones,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/Categoria',
      name: 'Categoria',
      component: Categoria,
      meta: {
        isPublic: false,
        privado: true
      }
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registro,
      meta: {
        isPublic: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.isPublic)
  if (requiresAuth === false) {
    LoginApi
      .refreshtoken()
      .then(res => {
        store.dispatch('setuser', res.data.usuario)
        next()
      })
      .catch(error => {
        console.log(error)
        swal(
          'Oops...',
          'Error encontrado, Debe iniciar sesion!',
          'error'
        )
        next('/')
      })
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  console.log('pasa rutas')
  const permiso = to.matched.some(record => record.meta.privado)
  if (permiso === true) {
    LoginApi
      .permisostoken()
      .then(res => {
        console.log(res.data.usuario.rol)
        const rol = res.data.usuario.rol
        if (rol === 'Administrador') {
          next()
        } else {
          next('/home')
        }
      })
      .catch(error => {
        console.log(error)
        swal(
          'Oops...',
          'Error encontrado, Debe iniciar sesion!',
          'error'
        )
        next('/')
      })
  } else {
    next()
  }
})

export default router
