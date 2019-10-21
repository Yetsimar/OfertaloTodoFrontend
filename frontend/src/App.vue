<template>
  <v-app>
    <Barra app></Barra>
    <v-content>
      <div class="container">
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Barra from './components/barra.vue'
export default {
  name: 'App',
  components: { Barra },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {}
  }
}
</script>
