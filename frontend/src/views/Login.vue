<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-xs3 style="height:120px">
        <img src="../assets/logo3.png" height="120"/>
      </v-flex>
      <v-flex xs12 sm6 offset-xs3>
        <h2> Inicio de Sesión </h2>
        <v-form enctype="multipart/form-data">
          <v-row align="center" justify="center">
            <v-col cols="1">
              <v-icon>{{ icons.mdiAccount }}</v-icon>
            </v-col>
            <v-col cols="10">
               <v-text-field
                   id="Login"
                   color="#11879a"
                   label="Usuario"
                   name="Login"
                   type="text">
                </v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="1">
              <v-icon>{{ icons.mdiLockQuestion }}</v-icon>
            </v-col>
            <v-col cols="10">
                <v-text-field
                  color="#11879a"
                  id="password"
                  label="password"
                  name="password"
                  type="password">
               </v-text-field>
            </v-col>
          </v-row>
          <v-flex xs12 sm6>
         <v-row align="center" justify="center">
            <v-col cols="6">
                <v-btn color= "#11879a" flat @click.native="login" dark>Entrar</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6">
            <v-btn color="#11879a" flat @click="close" dark>Cancelar</v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <h3>¿Aun no tienes cuenta? <a href="./Registro" style="color:#12ceeb;">has click aquí</a></h3>
            </v-row>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mdiLockQuestion, mdiAccount } from '@mdi/js'
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    icons: {
      mdiLockQuestion,
      mdiAccount
    },
    form: {
      id: 1,
      email: null,
      password: null
    },
    methods: {
      close () {
      },
      login () {
      }
    }
  })
}
</script>
