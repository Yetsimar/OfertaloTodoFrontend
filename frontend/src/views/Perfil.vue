<template>
<v-layout row >
  <v-flex xs12 sm6 offset-xs3>
    <v-row>
    <v-col cols= "50">
  <v-form>
   <v-row justify="center">
  <v-avatar size="100">
      <img :src='ruta + `${form.imagen}`' style='width: 100%; height: 100%;'>
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
      readonly
      required
    ></v-text-field>
   <v-spacer></v-spacer>
    <v-text-field
      v-model="form.apellido"
      label="Apellido"
      readonly
      required
    ></v-text-field>
  </v-row>
  <v-row>
    <v-text-field
      v-model="form.email"
      label="Correo"
      required
      readonly
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="form.telefono"
      label="Telefono"
      required
      readonly
    ></v-text-field>
  </v-row>
  <v-row>
     <v-text-field
      v-model="form.direccion"
      label="Direccion"
      required
      readonly
    ></v-text-field>
  </v-row>
  <v-dialog v-model="dialog" max-width="500px">
              <v-form ref="form"
              >
              <v-card>
                <v-card-title>
                  <span align="center" justify="center" class="headline">Editar usuario</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row align="center" justify="center">
                      <v-avatar size = " 62 " >
                     <img :src='ruta + editForm.imagen'  style='width:310px;height:auto' />
                      </v-avatar>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-row>
                     <img :src='ruta + editForm.imagen'  style='width:310px;height:auto' />
                      <v-text-field style='height: 56px;margin: 0px 0px 10px;' outline label='Seleccione la Foto' @click='pickFile2'  prepend-inner-icon='attach_file'></v-text-field>
                      <input type="file"  style="display: none;"  ref="image"   accept="image/*" @change="onFilePicked2">
                     </v-row>
                    <v-row align="center" justify="center">
                       <v-text-field
                        v-model="editForm.nombre"
                        :counter="10"
                        label="Nombre"
                        :rules="nameRules"
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="editForm.apellido"
                        label="Apellido"
                        :rules="apellidoRules"
                      ></v-text-field>
                    </v-row>
                    <v-row align="center" justify="center">
                      <v-text-field
                        v-model="editForm.email"
                        label="Correo"
                        :rules="emailRules"
                      ></v-text-field>
                    <v-spacer></v-spacer>
                      <v-text-field
                        v-model="editForm.telefono"
                        label="Telefono"
                        :rules="telefonoRules"
                      ></v-text-field>
                    </v-row>
                    <v-row align="center" justify="center">
                      <v-text-field
                        v-model="editForm.direccion"
                        label="Direccion"
                        :rules="direccionRules"
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
import { server, port } from '@/services/environment'
import Api from '@/services/methods'
export default {
  data: () => ({
    ruta: server + ':' + port,
    select: null,
    dialog: false,
    form: {
      _id: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      telefono: '',
      imagen: {
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    editForm: {
      _id: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      telefono: '',
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
      this.form.imagen = this.$store.state.usuario.imagen
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
          this.editForm.imagen.imageName = files[0].name
          if (this.editForm.imagen.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.editForm.imagen.imageUrl = fr.result
            this.editForm.imagen.imageFile = files[0] // this is an image file that can be sent to server...
            console.log('url' + this.editForm.imagen.imageUrl)
          })
        } else {
          this.$swal.fire(
            'Oops...',
            'Error encontrado, la imagen debe pesar menos de 5MB.',
            'error'
          )
          this.files = []
          this.editForm.imagen = []
        }
      } else {
        this.editForm.imagen.imageName = ''
        this.editForm.imagen.imageFile = ''
        this.editForm.imagen.imageUrl = ''
      }
    },
    edit () {
      const data = new FormData()
      Object.keys(this.editForm).map(key => {
        if (Array.isArray(this.editForm[key])) {
          this.editForm[key].forEach(val => {
            if (typeof val === 'object' && val !== null) {
              return data.append(`${key}[]`, JSON.stringify(val))
            }
            return data.append(`${key}[]`, val)
          })
        } else if (
          typeof this.editForm[key] === 'object' &&
          this.editForm[key] !== null
        ) {
          return data.append(key, JSON.stringify(this.editForm[key]))
        } else {
          return data.append(key, this.editForm[key])
        }
      })
      if (this.editForm.imagen.imageFile) {
        data.append('imagen', this.editForm.imagen.imageFile)
      }
      if (this.validate()) {
        Api.put('/usuarios', data)
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
      }
    },
    close () {
      this.dialog = false
    },
    validate () {
      if (this.$refs.form.validate()) {
        return true
      } else {
        return false
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
