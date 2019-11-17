<template>

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
   <v-row justify="center">
  <v-avatar color="indigo" size="80">
      <v-icon dark>mdi-account-circle</v-icon>
    </v-avatar>
    </v-row>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="Apellido"
      :rules="apellido"
      label="Apellido"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      label="Correo"
      required
    ></v-text-field>

     <v-text-field
      v-model="direccion"
      label="Direccion"
      required
    ></v-text-field>
     <v-text-field
      v-model="telefono"
      label="Telefono"
      required
    ></v-text-field>

    <v-select
      v-model="Sexo"
      :items="sexo"
      :rules="[v => !!v || 'Requerido']"
      label="Sexo"
      required
    ></v-select>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
  </v-form>
</template>
<script>
import Api from '@/services/methods'
export default {
  data: () => ({
    select: null,
    sexo: [
      'Femenino',
      'Masculino',
      'Otros'
    ],
    checkbox: false,
    editedItem: {
      _id: '',
      Nombre: '',
      Apellido: '',
      Correo: '',
      Direccion: '',
      Telefono: '',
      Sexo: '',
      Fecha_nacimiento: '',
      imagen: {
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    defaultItem: {
      _id: '',
      Apellido: '',
      Correo: '',
      Direccion: '',
      Telefono: '',
      Sexo: '',
      Fecha_nacimiento: '',
      imagen: {
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    }
  }),
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      console.log('sssss')
      console.log('Id Usuario: ' + this.$store.state.usuario)
    },
    ObtenerUsuario () {
      Api.get('/perfil/')
        .then((response) => {
          this.perfil = response.data
          console.log(this.perfil)
        })
        .catch((e) => {
          console.log('error' + e)
        })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
