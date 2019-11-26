<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-xs3 style="height:120px" >
        <v-row align="center" justify="center">
        <img src="../assets/logo3.png" height="120"/>
        </v-row>
      </v-flex>
      <v-flex xs12 sm6 offset-xs3>
        <v-row align="center" justify="center">
        <h1> Datos personales </h1>
        </v-row>
        <v-form  ref="form" enctype="multipart/form-data">
          <v-row align="center" justify="center">
            <v-avatar size = " 62 " >
            <img :src='form.imagen.imageUrl'  style='width:100%;height:100%' />
            </v-avatar>
            </v-row>
            <v-spacer></v-spacer>
            <v-row>
            <v-text-field style='height: 56px;margin: 0px 0px 10px;' outline label='Seleccione la Foto de perfil' @click='pickFile' v-model='form.imagen.imageName'  prepend-inner-icon='attach_file'></v-text-field>
            <input type="file"  style="display: none;"  ref="image"   accept="image/*" @change="onFilePicked">
          </v-row>
          <v-row align="center" justify="center">
                <v-text-field
                   v-model="form.nombre"
                   id="nombre"
                   color="#11879a"
                   label="Nombre"
                   name="Nombre"
                   type="text"
                   :rules="nameRules">
                </v-text-field>
                <v-spacer></v-spacer>
                <v-text-field
                v-model="form.apellido"
                   id="apellido"
                   color="#11879a"
                   label="Apellido"
                   name="Apellido"
                   type="text"
                   :rules="apellidoRules">
                </v-text-field>
            </v-row>
          <v-row align="center" justify="center">
                <v-text-field
                  v-model="form.email"
                   id="correo"
                   color="#11879a"
                   label="Correo"
                   name="Correo"
                   type="text"
                   :rules="emailRules">
                </v-text-field>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="form.direccion"
                   id="direccion"
                   color="#11879a"
                   label="Direccion"
                   name="Direccion"
                   type="text"
                   :rules="direccionRules">
                </v-text-field>
                </v-row>
          <v-row align="center" justify="center">
                <v-text-field
                  v-model="form.telefono"
                   id="telefono"
                   color="#11879a"
                   label="Telefono"
                   name="Telefono"
                   type="text"
                   :rules="telefonoRules">
                </v-text-field>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="form.password"
                  id="password"
                  color="#11879a"
                  label="Contraseña"
                  name="contraseña"
                  type="password"
                  :rules="passwordRules">
               </v-text-field>
               </v-row>
          <v-spacer></v-spacer>
          <v-row align="center" justify="center">
            <v-col cols="6">
                <v-btn color= "#11879a" @click='save()' dark><v-icon>save</v-icon>Registrar</v-btn>
            </v-col>
             </v-row>
           <v-row align="center" justify="center">
            <h3>¿Ya tienes cuenta? <a href="./" style="color:#12ceeb;">has click aquí</a></h3>
            </v-row>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Api from '@/services/methods'
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    form: {
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      telefono: '',
      password: '',
      imagen: {
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    nameRules: [
      v => !!v || 'Nombre es requerido',
      v => (v && v.length <= 15) || 'máximo 15 caracteres'
    ],
    emailRules: [
      v => !!v || 'E-mail es requerido',
      v => /.+@.+\..+/.test(v) || 'E-mail es inválido'
    ],
    passwordRules: [
      v => !!v || 'Contraseña es requerida',
      v => (v && v.length <= 8) || 'máximo 8 caracteres'
    ],
    apellidoRules: [
      v => !!v || 'Apellido es requerido',
      v => (v && v.length <= 15) || 'máximo 15 caracteres'
    ],
    direccionRules: [
      v => !!v || 'Dirección es requerido',
      v => (v && v.length <= 30) || 'máximo 30 caracteres'
    ],
    telefonoRules: [
      v => !!v || 'Telefono es requerid0',
      v => (v && v.length <= 13) || 'máximo 13 caracteres'
    ]
  }),
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        let peso = false
        for (let j = 0; j < files.length; j++) {
          if (files[j].size > 4194304) {
            peso = true
          }
        }
        if (peso === false) {
          this.form.imagen.imageName = files[0].name
          if (this.form.imagen.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.form.imagen.imageUrl = fr.result
            this.form.imagen.imageFile = files[0] // this is an image file that can be sent to server...
            console.log('url' + this.form.imagen.imageUrl)
          })
        } else {
          this.$swal.fire(
            'Oops...',
            'Error encontrado, la imagen debe pesar menos de 5MB.',
            'error'
          )
          this.files = []
          this.form.imagen = []
        }
      } else {
        this.form.imagen.imageName = ''
        this.form.imagen.imageFile = ''
        this.form.imagen.imageUrl = ''
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        return true
      } else {
        return false
      }
    },
    save () {
      const data = new FormData()
      Object.keys(this.form).map(key => {
        if (Array.isArray(this.form[key])) {
          this.form[key].forEach(val => {
            if (typeof val === 'object' && val !== null) {
              return data.append(`${key}[]`, JSON.stringify(val))
            }
            return data.append(`${key}[]`, val)
          })
        } else if (
          typeof this.form[key] === 'object' &&
          this.form[key] !== null
        ) {
          return data.append(key, JSON.stringify(this.form[key]))
        } else {
          return data.append(key, this.form[key])
        }
      })
      if (this.form.imagen.imageFile) {
        data.append('imagen', this.form.imagen.imageFile)
      }
      if (this.validate()) {
        Api.post('/usuarios', data)
          .then(response => {
            console.log(response.data)
            this.$swal(
              'Felicidades.!',
              'Registro realizado exitosamente.',
              'success'
            )

            this.initialize()
            window.location.href = '/'
          })
          .catch(err => {
            console.log(err)
            this.$swal(
              'Oops...',
              'Por verifique los datos e intente de nuevo',
              'error'
            )
          })
      }
    }
  }
}
</script>
