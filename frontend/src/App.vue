<template>
  <v-app>
    <Menu v-if='sesion._id'></Menu>
    <v-content>
      <div class="container">
        <router-view/>
      </div>
    </v-content>
    <Footer v-if='sesion._id'></Footer>
  </v-app>
</template>

<script>
import Menu from './components/menu.vue'
import Footer from './components/footer.vue'
export default {
  name: 'App',
  components: { Menu, Footer },
  sesion: [],
  created () {
    this.sesion = this.$store.state.usuario
    console.log(this.$store.state.usuario)
    if (this.$route.meta.isPublic === false && !this.$store.state.token) {
      window.location.href = '/'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$cookies.set('token', [], '5D', '')
      window.location.href = '/'
    }
  }
}
</script>
