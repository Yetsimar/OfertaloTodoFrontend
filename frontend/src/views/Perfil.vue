<template>
<v-layout row >
  <v-flex xs12 sm6 offset-xs3>
    <v-row>
    <v-col cols= "50">
  <v-form>
   <v-row justify="center">
  <v-avatar color="indigo" size="80">
      <v-icon dark>mdi-account-circle</v-icon>
    </v-avatar>
    </v-row>
  <v-row>
    <v-col cols="10">
    <h1>Datos personales</h1>
    </v-col>
    <v-col cols="2">
   <v-btn
      color="#11879a"
      @click="modif"
      fab dark small
    > <v-icon>mdi-pencil</v-icon></v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-text-field
      v-model="form.nombre"
      :counter="10"
      label="Nombre"
      required
    ></v-text-field>
   <v-spacer></v-spacer>
    <v-text-field
      v-model="form.apellido"
      label="Apellido"
      required
    ></v-text-field>
  </v-row>
  <v-row>
    <v-text-field
      v-model="form.email"
      label="Correo"
      required
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="form.telefono"
      label="Telefono"
      required
    ></v-text-field>
  </v-row>
  <v-row>
     <v-text-field
      v-model="form.direccion"
      label="Direccion"
      required
    ></v-text-field>
  </v-row>
  <v-dialog v-model="dialog" max-width="500px">
              <v-form ref="form"
                    lazy-validation>
              <v-card>
                <v-card-title>
                  <span class="headline">Editar usuario</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row align="center" justify="center">
                       <v-text-field
                        v-model="editForm.nombre"
                        :counter="10"
                        label="Nombre"
                        required
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="editForm.apellido"
                        label="Apellido"
                        required
                      ></v-text-field>
                    </v-row>
                    <v-row align="center" justify="center">
                      <v-text-field
                        v-model="editForm.email"
                        label="Correo"
                        required
                      ></v-text-field>
                    <v-spacer></v-spacer>
                      <v-text-field
                        v-model="editForm.telefono"
                        label="Telefono"
                        required
                      ></v-text-field>
                    </v-row>
                    <v-row align="center" justify="center">
                      <v-text-field
                        v-model="editForm.direccion"
                        label="Direccion"
                        required
                      ></v-text-field>
                    </v-row>
                  </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" small dark @click="close">
                    <v-icon>mdi-close</v-icon>Cancelar
                  </v-btn>
                  <v-btn color="success" small dark @click="edit">
                    <v-icon>mdi-content-save</v-icon>Guardar
                  </v-btn>
                </v-card-actions>
                 </v-card-text>
              </v-card>
              </v-form>
            </v-dialog>
  </v-form>
    </v-col>
    </v-row>
  </v-flex>
</v-layout>
</template>
<script>
import Api from '@/services/methods'
export default {
  data: () => ({
    select: null,
    dialog: false,
    form: {
      _id: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      telefono: ''
    },
    editForm: {
      _id: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      telefono: ''
    }
  }),
  created () {
    this.initialize()
    console.log(this.$store.state.usuario)
  },
  methods: {
    initialize () {
      console.log(this.$store.state.usuario._id)
      this.form._id = this.$store.state.usuario._id
      this.form.nombre = this.$store.state.usuario.nombre
      this.form.apellido = this.$store.state.usuario.apellido
      this.form.email = this.$store.state.usuario.email
      this.form.direccion = this.$store.state.usuario.direccion
      this.form.telefono = this.$store.state.usuario.telefono
    },
    edit () {
      Api.put('/usuarios', this.editForm)
        .then(response => {
          console.log(response)
          this.$swal(
            'Felicidades.!',
            'Usuario modificado con éxito.',
            'success'
          )
          this.form = Object.assign({}, this.editForm)
          this.close()
        })
        .catch(err => {
          console.log(err)
          this.$swal(
            'Oops...',
            'Error encontrado, verifique su información',
            'error'
          )
        })
    },
    close () {
      this.dialog = false
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    modif () {
      this.dialog = true
      this.editForm = Object.assign({}, this.form)
    }
  }
}
</script>
