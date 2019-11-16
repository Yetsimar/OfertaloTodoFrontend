<template>
<v-row  justify="center" >
<v-col cols="12" sm="8" md="3">
    <v-card >
        <v-toolbar flat color="indigo" dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
            <v-toolbar-title class="white--text" >Panel</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
             <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="categoria in categorias" :key="categoria._id" @click="funcionvaqui">
          <v-list-item-content>
            <v-list-item-title v-text="categoria.nombre"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <!-- ..................lista 2........................ -->
       <v-h3 class="black--text">
           <v-icon  color="warning">mdi-star</v-icon>
           Vendedores destacados</v-h3>
       <v-list>
      <v-list-item
        v-for="item in items2"
        :key="item.title"
        @click="ss"
      >
        <v-list-item-icon>
          <v-icon v-if="item.icon" color="pink">mdi-star</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
   <!-- .............rango de..................   -->
    <!-- ..................lista 2........................ -->
       <v-h3 class="black--text">
           <v-icon  color="warning"></v-icon>
           Rango de precios</v-h3>
       <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title >hasta $50</v-list-item-title>
          <br> <br>
          <v-list-item-title>de $50 a $100</v-list-item-title>
          <br> <br>
          <v-list-item-title>de $100 a $500</v-list-item-title>
           <br> <br>
          <v-list-item-title>de $500 a $2000</v-list-item-title>
           <br> <br>
          <v-list-item-title>Mas de $2000</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
        </v-card-text>
    </v-card >
</v-col>
   <v-col cols="12" sm="8" md="9">
   <v-card >
   <v-toolbar flat color="indigo" dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    <v-toolbar-title class="white--text">Publicaciones</v-toolbar-title>
    <v-spacer></v-spacer>
     </v-toolbar>
     <v-card-text>
  <v-row align="center" justify="center">
    <!-- publicacion 1 -->
    <v-col cols="12" sm="8" md="4"  v-for="publicacion in publicaciones" :key="publicacion._id">
      <v-card>
      <v-form enctype="">
    <v-list-item  >
      <v-list-item-avatar color="grey">
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title value="titulo" v-model="editedItem.titulo" class="headline">{{publicacion.titulo}}</v-list-item-title>
        <v-list-item-subtitle>Publicado por:Usuario  </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <img :src='ruta + `${publicacion.imagen}`' style='width: 100%; height: 100%;'>
    <v-card-text>
      {{publicacion.descripcion}}
      <br>
      <div v-for="categoria in publicacion " :key="categoria._id">
        {{categoria.nombre}}
      </div>
    </v-card-text>
    <v-card-text>
      ${{publicacion.precio}}
    </v-card-text>
    <v-card-actions>
      <v-btn icon>
      <v-icon color="indigo"  title="Ver detalles"  class="mr-2" @click="ShowItem(publicacion)">mdi-eye</v-icon>
        </v-btn>
        <v-btn icon >
      <v-icon color="blue lighten-2"  title="Me gusta"  class="mr-2"  @click="likes(publicacion)" >mdi-thumb-up </v-icon>
        {{publicacion.likes}}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        {{publicacion.vistas}}
        <v-icon color="error" title="+ Favoritos">mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        {{publicacion.vistas}}
        <v-icon color="purple" title="Compartir">mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
    </v-form>
    </v-card>
  </v-col>
  </v-row>
   </v-card-text>
  </v-card>
   </v-col>
     <!-- View show -->
            <v-dialog v-model="dialogShow" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Detalles de Publicacion</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.titulo" disabled="true" label="Titulo"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                      <img :src='ruta + editedItem.imagen'  style='width:80%;height:80%'/>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.descripcion" disabled="true" label="Descripcion" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.precio" disabled="true" label="Precio" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-select v-model="editedItem.categoria" :items="idCategoriasArray" disabled="true" label="Categoria" ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-container>
                <!-- .....................Comentar........................ -->
                <div class="text-center">
                      <v-dialog v-model="menu2" persistent max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="indigo"
                        dark
                        v-on="on"
                        @click="listarComentarios()"
                      >
                        Comentar
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                        <v-card>
                          <div class="text-right">
                          <v-btn text @click="menu2 = false">Salir</v-btn>
                          </div>
                          <v-list>
                            <v-list-item>
                              <v-list-item-avatar>
                                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>John Leider</v-list-item-title>
                                <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-btn
                                  :class="fav ? 'red--text' : ''"
                                  icon
                                  @click="fav = !fav"
                                >
                                  <v-icon>mdi-heart</v-icon>
                                </v-btn>
                              </v-list-item-action>
                            </v-list-item>
                          </v-list>
                          <v-divider></v-divider>
                          <v-list>
                            <v-list-item>
                              <v-list-item-action>
                              </v-list-item-action>
                        <v-text-field v-model="itemComentario.texto"  label="Cometa aqui....." ></v-text-field>
                            </v-list-item>
                          </v-list>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="menu2 = false">Cancelar</v-btn>
                            <v-btn color="primary" text @click="comentar()">Comentar</v-btn>
                          </v-card-actions>
                         <p class="text-center">Comentarios</p>
                           <v-list v-for="comentar in comentarios" :key="comentar._id">
                             <!-- ...............comentarios.................... -->
                            <v-list-item >
                                <v-list-item-avatar>
                                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                              </v-list-item-avatar>
                              <v-list-item-content >
                                <div v-for="usuario in comentar " :key="usuario._id">
                                <v-list-item-title class="blue--text">{{usuario.nombre}} {{usuario.apellido}}</v-list-item-title>
                                 </div>
                                 <v-list-item-title>{{comentar.texto}}</v-list-item-title>
                                 <p class="text-right">{{comentar.Create_at | moment("DD-MM-YYYY")}}</p>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                       </v-dialog>
                    </div>
                    </v-container>
                 <!--  .................fin comentar................. -->
                          </v-card>
            </v-dialog>
            <!-- View show -->
    </v-row>
</template>

<script>
import Api from '@/services/methods'
import { server, port } from '@/services/environment'
export default {
  data: () => ({
    fav: true,
    menu: false,
    menu2: false,
    estado: false,
    dialogEdit: false,
    dialogShow: false,
    ruta: server + ':' + port,
    publicaciones: [],
    comentarios: [],
    img: '',
    editedIndex: -1,
    categorias: [],
    idCategoriasArray: [],
    items: [
      {
        action: 'restaurant',
        title: 'Categorias',
        active: true,
        items: [
        ]
      }
    ],
    items2: [
      { icon: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
      { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
      { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
      { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
    ],
    editedItem: {
      _id: '',
      titulo: '',
      descripcion: '',
      categoria: '',
      precio: '',
      likes: '',
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
      likes: '',
      categoria: '',
      imagen: {
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    itemComentario: {
      _id: '',
      texto: '',
      idPublicacion: '',
      user: '',
      fechaComentario: '',
      imagen: {
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    itemLikes: {
      _id: '',
      idPublicacion: '',
      user: ''
    },
    computed: {
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogEdit (val) {
        val || this.close()
      },
      dialogShow (val) {
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
    initialize () {
      this.listarCategorias()
      this.listarPublicaciones()/* inicia el metodo de listar */
      this.listarComentarios()
    },
    /* muestra en la tabla los proveedores */
    listarPublicaciones () {
      Api.get('publicaciones')
        .then(response => {
          this.publicaciones = response.data
          console.log(this.publicaciones)
        })
        .catch(e => {
          console.log('se ejecuta error')
          console.log('error' + e)
        })
    },
    listarComentarios () {
      console.log(this.editedItem._id)
      Api.get('publicaciones/' + this.editedItem._id + '/comentarios')
        .then((response) => {
          this.comentarios = response.data
          console.log('comentarios: ' + this.comentarios)
        })
        .catch((e) => {
          console.log('se ejecuta a ver comentarios')
          console.log('error' + e)
        })
    },
    editItem (publicacion) {
      this.editedIndex = this.publicaciones.indexOf(publicacion)
      this.editedItem = Object.assign({}, publicacion)
      this.dialogEdit = true
    },
    ShowItem (publicacion) {
      this.editedIndex = this.publicaciones.indexOf(publicacion)
      this.editedItem = Object.assign({}, publicacion)
      this.dialogShow = true
      this.listarComentarios()
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
    close () {
      this.dialog = false
      this.dialogEdit = false
      setTimeout(() => {
        this.reset()
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    comentar () {
      Api.post('publicaciones/' + this.editedItem._id + '/comentarios', {
        texto: this.itemComentario.texto,
        idPublicacion: this.editedItem._id
      })
        .then((response) => {
          console.log('comentarios: ' + response.data)
          this.comentarios.push(response.data)
          this.listarComentarios()
        })
        .catch((e) => {
          console.log('se ejecuta a ver comentarios')
          console.log('error' + e)
        })
    },
    likes (publicacion) {
      console.log('id publi dd: ' + publicacion._id)
      Api.put('publicaciones/' + publicacion._id + '/like', {
      })
        .then((response) => {
          this.listarPublicaciones()
          console.log('likes: ' + response.data)
        })
        .catch((e) => {
          console.log('error' + e)
        })
    }
  }
}
</script>
