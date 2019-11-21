<template>
<v-container  >
<v-row  justify="center"  :items="publicaciones">
<v-col cols="12" sm="8" md="4">
   <v-card >
     <v-toolbar flat color="indigo" dark>
    <v-toolbar-title >Publica un articulo</v-toolbar-title>
    <v-spacer></v-spacer>
     </v-toolbar>
     <v-card-text>
  <!-- .......................Formulario Registrar............................. -->
  <v-form  ref="form" v-model="valid" lazy-validation>
        <v-text-field  v-model="editedItem.titulo" :counter="20"  :rules="nameRules" label="Titulo de la publicacion"  required></v-text-field>
        <img :src='editedItem.imagen.imageUrl'  style='width:310px;height:auto' />
        <v-text-field style='height: 56px;margin: 0px 0px 10px;' outline label='Seleccione la Foto' @click='pickFile' v-model='editedItem.imagen.imageName'  prepend-inner-icon='attach_file'></v-text-field>
        <input type="file"  style="display: none;"  ref="image"   accept="image/*" @change="onFilePicked">
        <v-textarea  solo  v-model="editedItem.descripcion" name="input-7-4"   label="Descripcion" ></v-textarea>
        <v-select   v-model="editedItem.categoria" :items="idCategoriasArray" :rules="[v => !!v || 'Seleccione una categoria']"  label="Categoria"  required ></v-select>
        <v-text-field   v-model="editedItem.precio"   label="Pon un precio"  required></v-text-field>
        <v-checkbox  v-model="checkbox" :rules="[v => !!v || 'selecciona la casilla para  continuar!']" label="seguro desea publicar?"  required ></v-checkbox>

        <v-btn   :disabled="!valid"  color="success"  class="mr-4" @click="save" >Publicar</v-btn>
        <v-btn  color="error" class="mr-4"  @click="reset">Cancelar</v-btn>
  </v-form>
 <!--  ....................mis publicaciones .......................... -->
  </v-card-text>
   </v-card>
   </v-col>
   <v-col cols="12" sm="8" md="8">
   <v-card >
   <v-toolbar flat color="indigo" dark>
    <v-toolbar-title >Mis ultimas publicaciones</v-toolbar-title>
    <v-spacer></v-spacer>
     </v-toolbar>
     <v-card-text>
  <v-row align="center" justify="center">
    <!-- publicacion 1 -->
    <v-col cols="12" sm="8" md="6"  v-for="publicacion in publicaciones" :key="publicacion._id">
      <v-card>
      <v-form enctype="">
    <v-list-item  :items="publicaciones">
      <v-list-item-avatar color="grey">
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title value="titulo" class="headline">{{publicacion.titulo}}</v-list-item-title>
        <v-list-item-subtitle class="blue--text">{{publicacion.user.nombre}} {{publicacion.user.apellido}} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <img :src='ruta + `${publicacion.imagen}`' style='width: 100%; height: 100%;'>
    <v-card-text>
      <p class="blue--text">{{publicacion.categoria.nombre}}</p>
      <p>{{publicacion.descripcion}}</p>
    </v-card-text>
    <div class="text-right">
    <v-card-text class="green--text">
      ${{publicacion.precio}}
    </v-card-text>
    </div>
    <v-card-actions>
       <v-icon color="warning" title="Editar"  class="mr-2"  @click="editItem(publicacion)" >
         mdi-pencil
        </v-icon>
        <v-icon color="error" title="Eliminar"  class="mr-2"  v-on:click="deleteItem(publicacion)" >
         mdi-delete
        </v-icon>
      <v-spacer></v-spacer>
      <v-btn icon>
        {{publicacion.likes}}
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        {{publicacion.vistas}}
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
    </v-form>
    </v-card>
  </v-col>
    <!-- publicacion compartida -->
    <v-col cols="12" sm="8" md="6"  v-for="compartir in compartidas" :key="compartir._id">
      <v-card>
      <v-form enctype="">
    <v-list-item  :items="compartidas">
      <v-list-item-avatar color="grey">
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{compartir.titulo}}</v-list-item-title>
        <v-list-item-subtitle class="blue--text">{{compartir.user.nombre}} {{compartir.user.apellido}} </v-list-item-subtitle>
         <v-list-item-subtitle >Compartido de :{{compartir.delUsuario}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <img :src='ruta + `${compartir.imagen}`' style='width: 100%; height: 100%;'>
    <v-card-text>
      <p class="blue--text">{{compartir.categoria.nombre}}</p>
      <p>{{compartir.descripcion}}</p>
    </v-card-text>
    <div class="text-right">
    <v-card-text class="green--text">
      ${{compartir.precio}}
    </v-card-text>
    </div>
    <v-card-actions>
       <v-icon color="warning" title="Editar"  class="mr-2"  @click="editItem(compartir)" >
         mdi-pencil
        </v-icon>
        <v-icon color="error" title="Eliminar"  class="mr-2"  v-on:click="deleteCompartir(compartir)" >
         mdi-delete
        </v-icon>
      <v-spacer></v-spacer>
    </v-card-actions>
    </v-form>
    </v-card>
  </v-col>
  <!-- ....................fin de publicacion Compartida.................... -->
  </v-row>
   </v-card-text>
  </v-card>
   </v-col>
  </v-row>
  <v-dialog v-model="dialogEdit" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Actualizacion de la Publicacion</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedItem.titulo"  label="Titulo"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-textarea v-model="editedItem.descripcion"  label="Descripcion"></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedItem.precio"  label="Precio"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                          <v-select  v-model="editedItem.categoria" :items="idCategoriasArray" label="categoria"></v-select>
                      </v-col>
                       <v-col cols="12" sm="12" md="12">
                      <img :src='ruta + editedItem.imagen'  style='width:80%;height:80%'/>
                      <img :src='editedItem.imagen.imageUrl' v-if='editedItem.imagen.imageUrl' style='width:310px;height:auto' />
                      <v-text-field style='height: 56px;margin: 0px 0px 10px;' outline label='Seleccione la Foto' @click='pickFile' v-model='editedItem.imagen.imageName' prepend-inner-icon='attach_file' ></v-text-field>
                      <input type="file"  style="display: none;"  ref="image"   accept="image/*" @change="onFilePicked">
                       </v-col>
                        <v-btn   :disabled="!valid"  color="success"  class="mr-4" @click="save" >Publicar</v-btn>
                        <v-btn  color="error" class="mr-4"  @click="reset">Cancelar</v-btn>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
  </v-container>
</template>
<script>
import Api from '@/services/methods'
import { server, port } from '@/services/environment'
export default {
  data: () => ({
    dialogEdit: false,
    ruta: server + ':' + port,
    publicaciones: [],
    compartidas: [],
    img: '',
    editedIndex: -1,
    categorias: [],
    idCategoriasArray: [],
    editedItem: {
      _id: '',
      titulo: '',
      descripcion: '',
      categoria: '',
      precio: '',
      imagen: {
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    defaultItem: {
      _id: '',
      titulo: '',
      descripcion: '',
      precio: '',
      categoria: '',
      imagen: {
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    computed: {
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogEdit (val) {
        val || this.close()
      }
    },
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'El nombre es requerido',
      v => (v && v.length <= 20) || 'limite maximo de 20 caracteres'
    ],
    foto: '',
    fotoRules: [
      v => !!v || 'Se necesita una foto'
    ],
    email: '',
    emailRules: [
      v => !!v || 'El correo es requerido',
      v => /.+@.+\..+/.test(v) || 'El correo no es valido'
    ],
    select: null,
    checkbox: false
  }),
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.listarCategorias()
      this.listarPublicaciones()/* inicia el metodo de listar */
      this.listarCompartidas()
    },
    listarCategorias () {
      Api.get('categoria')
        .then((response) => {
          this.categorias = response.data
          console.log(this.categorias)
          this.categorias.map((data) => {
            this.idCategoriasArray.push({ text: data.nombre, value: data._id })
          })
          console.log(this.idCategoriasArray)
        })
        .catch((e) => {
          console.log('error' + e)
        })
    },
    listarCompartidas () {
      Api.get('misCompartidas')
        .then(response => {
          this.compartidas = response.data
          console.log(this.compartidas)
        })
        .catch(e => {
          console.log('Error al ver publicaciones compartidas')
          console.log('error' + e)
        })
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
          this.editedItem.imagen.imageName = files[0].name
          if (this.editedItem.imagen.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.editedItem.imagen.imageUrl = fr.result
            this.editedItem.imagen.imageFile = files[0] // this is an image file that can be sent to server...
            console.log('url' + this.editedItem.imagen.imageUrl)
          })
        } else {
          this.$swal.fire(
            'Oops...',
            'Error encontrado, la imagen debe pesar menos de 5MB.',
            'error'
          )
          this.files = []
          this.editedItem.imagen = []
        }
      } else {
        this.editedItem.imagen.imageName = ''
        this.editedItem.imagen.imageFile = ''
        this.editedItem.imagen.imageUrl = ''
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    /* muestra el catalogo de publicaciones del logeado */
    listarPublicaciones () {
      Api.get('catalogo')
        .then(response => {
          this.publicaciones = response.data
          console.log(this.publicaciones)
          console.log('ruta completa: ' + this.axios.defaults.baseURL)
        })
        .catch(e => {
          console.log('se ejecuta error')
          console.log('error' + e)
        })
    },
    editItem (publicacion) {
      this.editedIndex = this.publicaciones.indexOf(publicacion)
      this.editedItem = Object.assign({}, publicacion)
      this.dialogEdit = true
    },
    deleteItem (publicacion) {
      const index = this.publicaciones.indexOf(publicacion)
      this.$swal({
        type: 'warning',
        title: '¿Seguro que quiere borrar?',
        text: 'No podrá revertir',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'cancelar'
      }).then(result => {
        if (result.value) {
          this.$swal('Borrado!', 'Su registro fue borrado.', 'success')
          this.publicaciones.splice(index, 1)
          Api.delete('publicaciones/' + publicacion._id)
            .then(response => {
              console.log(response)
            })
        }
      })
    },
    deleteCompartir (compartir) {
      const index = this.compartidas.indexOf(compartir)
      this.$swal({
        type: 'warning',
        title: '¿Seguro que quiere borrar?',
        text: 'No podrá revertir',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'cancelar'
      }).then(result => {
        if (result.value) {
          this.$swal('Borrado!', 'Su Publicacion fue  borrada.', 'success')
          this.compartidas.splice(index, 1)
          Api.delete('compartir/' + compartir._id)
            .then(response => {
              console.log(response)
            })
        }
      })
    },
    close () {
      this.dialog = false
      this.dialogEdit = false
      setTimeout(() => {
        this.reset()
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      this.loading = true
      const data = new FormData()
      Object.keys(this.editedItem).map(key => {
        if (Array.isArray(this.editedItem[key])) {
          this.editedItem[key].forEach(val => {
            if (typeof val === 'object' && val !== null) {
              return data.append(`${key}[]`, JSON.stringify(val))
            }
            return data.append(`${key}[]`, val)
          })
        } else if (
          typeof this.editedItem[key] === 'object' &&
          this.editedItem[key] !== null
        ) {
          return data.append(key, JSON.stringify(this.editedItem[key]))
        } else {
          return data.append(key, this.editedItem[key])
        }
      })
      if (this.editedItem.imagen.imageFile) {
        data.append('imagen', this.editedItem.imagen.imageFile)
      }
      if (this.editedIndex > -1) {
        console.log('id public. ' + this.editedItem._id)
        Api.put('publicaciones/' + this.editedItem._id, {
          titulo: this.editedItem.titulo,
          descripcion: this.editedItem.descripcion,
          categoria: this.editedItem.categoria,
          precio: this.editedItem.precio,
          imagen: this.editedItem.imagen })
          .then(response => {
            this.editedItem = Object.assign({}, this.defaultItem)
            console.log(response)
            this.$swal({
              type: 'success',
              title: 'Actualizacion exitosa',
              text: 'Todos los cambios han guardados'
            })
          })
          .catch(e => {
            this.$swal({
              type: 'error',
              title: 'Error al Actualizar',
              text: 'Por verifique los datos e intente de nuevo'
            })
            console.log('error guardar....' + e)
          })
        Object.assign(this.publicaciones[this.editedIndex], this.editedItem)
      } else {
        Api.post('publicaciones', data)
          .then(response => {
            console.log(response.data)
            this.$swal({
              type: 'success',
              title: 'Felicidades',
              text: 'Su publicación se ha realizado con éxito'
            })
            this.publicaciones.push(response.data)
          })
      }
      console.log('Datos guardados')
      this.reset()
      this.close()
    }
  }
}
</script>
