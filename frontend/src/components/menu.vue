<template>
<v-layout align-start>
  <v-flex  xs12 sm6>
<v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#111b1d"
      dark
    >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4 "
      ><v-row>
         <v-col>
         <img src="../assets/logo.png" width="150" height="80"/>
         </v-col>
         </v-row>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar size="36">
      <img :src='ruta + `${imagen}`' style='width: 100%; height: 100%;'>
    </v-avatar>
        <v-btn small rounded
          color="#111b1d" dark
          v-on="on"
        v-text="nombre + ' '+  apellido">
        </v-btn>
      </template>
      <v-card absolute color="#C4C4C5" black>
     <v-list-item :to="{name: 'Perfil'}">
          <v-list-item-action>
            <v-icon color="#11879a">mdi-account</v-icon>
          </v-list-item-action>
        <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click='logout'>
          <v-list-item-action>
            <v-icon color="#11879a">lock_open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-card>
    </v-menu>
    </v-app-bar>
    <v-navigation-drawer app absolute v-model="drawer" temporary color="#C4C4C5" black>
      <v-list dense>
      <v-list-item :to="{name: 'home'}">
          <v-list-item-action>
            <v-icon color="#11879a">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if='menu1 === true' :to="{name: 'Categoria'}">
          <v-list-item-action>
            <v-icon color="#11879a">mdi-format-list-bulleted</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Categorias</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item :to="{name: 'Publicaciones'}">
          <v-list-item-action>
            <v-icon color="#11879a">mdi-newspaper-variant-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Publicaciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if='menu1 === false' :to="{name: 'Publicar'}">
          <v-list-item-action>
            <v-icon color="#11879a">mdi-newspaper</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Publicar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
  </v-navigation-drawer>
  </v-flex>
</v-layout>
</template>
<script>
import { server, port } from '@/services/environment'
export default {
  props: {
    source: String
  },
  data: () => ({
    search: '',
    ruta: server + ':' + port,
    cuenta: null,
    drawer: null,
    mini: null,
    nombre: '',
    apellido: '',
    imagen: '',
    menu1: '',
    sesion: []
  }),
  created () {
    this.initialize()
    if (this.$store.state.usuario) {
      this.nombre = this.$store.state.usuario.nombre
      this.apellido = this.$store.state.usuario.apellido
      this.sesion = this.$store.state.usuario.rol
      this.imagen = this.$store.state.usuario.imagen
      if (this.sesion === 'Administrador') {
        this.menu1 = true
      } else if (this.sesion === 'regular') {
        this.menu1 = false
      }
    }
  },
  methods: {
    initialize () {},
    logout () {
      this.$store.dispatch('logout')
      this.$cookies.set('token', [], '5D', '')
      window.location.href = '/'
    }
  }
}
</script>
