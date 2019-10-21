<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-xs3 style="height:120px">
        <img src="../assets/logo3.png" height="120"/>
      </v-flex>
      <v-flex xs12 sm6 offset-xs3>
        <h1> Registro </h1>
        <v-form enctype="multipart/form-data">
          <v-row align="center" justify="center">
                <v-text-field
                   id="nombre"
                   color="#11879a"
                   label="Nombre"
                   name="Nombre"
                   type="text">
                </v-text-field>
          </v-row>
          <v-row align="center" justify="center">
                <v-text-field
                   id="apellido"
                   color="#11879a"
                   label="Apellido"
                   name="Apellido"
                   type="text">
                </v-text-field>
            </v-row>
          <v-row align="center" justify="center">
                <v-text-field
                   id="correo"
                   color="#11879a"
                   label="Correo"
                   name="Correo"
                   type="text">
                </v-text-field>
                </v-row>
          <v-row align="center" justify="center">
                <v-text-field
                   id="direccion"
                   color="#11879a"
                   label="Direccion"
                   name="Direccion"
                   type="text">
                </v-text-field>
                </v-row>
          <v-row align="center" justify="center">
                <v-text-field
                   id="telefono"
                   color="#11879a"
                   label="Telefono"
                   name="Telefono"
                   type="text">
                </v-text-field>
                </v-row>
          <v-row align="center" justify="center">
                <v-text-field
                  id="password"
                  label="password"
                  name="password"
                  type="password">
               </v-text-field>
               </v-row>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6>
          <v-row align="center" justify="center">
            <v-col cols="6">
                <v-btn color= "#11879a" flat @click.native="login" dark>Registrar</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6">
           <v-btn color="#11879a" flat @click="close" dark>Cancelar</v-btn>
            </v-col>
             </v-row>
           <v-row align="center" justify="center">
            <h3>¿Ya tienes cuenta? <a href="./Login" style="color:#12ceeb;">has click aquí</a></h3>
            </v-row>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    form: {
      id: 1,
      email: null,
      password: null
    }
  })
}
</script>
