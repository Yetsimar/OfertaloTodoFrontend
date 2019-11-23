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
          v-for="categoria in categorias" :key="categoria._id">
          <v-list-item-content>
            <v-list-item-title v-text="categoria.nombre"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <!-- ..................lista 2........................ -->
       <h3 class="black--text">
           <v-icon  color="warning">mdi-star</v-icon>
           Vendedores destacados</h3>
       <v-list>
      <v-list-item
        v-for="item in items2"
        :key="item.title"
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
       <h3 class="black--text">
           <v-icon  color="warning"></v-icon>
           Rango de precios</h3>
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
       <v-card-title>
       </v-card-title>
     </v-toolbar>
     <v-card-text>
       <v-spacer></v-spacer>
            <v-text-field
              class="text-xs-center"
              v-model="search"
              :search ="search"
              label="Búsqueda"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
    <v-spacer></v-spacer>
  <v-row align="center" justify="center">
    <!-- publicacion 1 -->
    <v-col  cols="12" sm="8" md="4"  v-for="publicacion in filtrarPublicacion" :key="publicacion._id">
      <v-card>
      <v-form enctype="" >
    <v-list-item :search="search"  >
      <v-list-item-avatar color="grey">
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title value="titulo"  class="headline">{{publicacion.titulo }}</v-list-item-title>
        <v-list-item-subtitle class="blue--text">{{publicacion.user.nombre}} {{publicacion.user.apellido}}</v-list-item-subtitle>
        <span>{{publicacion.Create_at | moment("DD-MM-YY")}} </span>
      </v-list-item-content>
    </v-list-item>
    <img :src='ruta + `${publicacion.imagen}`' style='width: 100%; height: 100%;'>
    <v-card-text>
      <p class="blue--text">{{publicacion.categoria.nombre}}</p>
      <p>{{publicacion.descripcion }}</p>
    </v-card-text>
    <div class="text-right">
    <v-card-text class="green--text">
      ${{publicacion.precio}}
    </v-card-text>
    </div>
    <v-card-actions>
      <v-btn icon>
      <v-icon color="indigo"  title="Ver detalles"  class="mr-2" @click="ShowItem(publicacion)">mdi-eye</v-icon>
        </v-btn>
        <v-btn icon @click="likes(publicacion)" >
           {{publicacion.likes}}
      <v-icon color="error"  title="Me gusta"  class="mr-2"  >mdi-heart</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        {{publicacion.vistas}}
        <v-icon color="blue darken-2" title="Comentar" @click="dialogComentar(publicacion)">mdi-message-text</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="purple" title="Compartir"  @click="dialogCIem(publicacion)" >mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
    </v-form>
    </v-card>
  </v-col>
      <!-- publicacion compartida -->
    <v-col cols="12" sm="8" md="4"  v-for="compartir in filtrarCompartidas" :key="compartir._id">
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
     <!-- View show -->
            <v-dialog v-model="dialogShow" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Detalles de Publicacion</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                       <v-form enctype="">
                        <v-list-item  >
                    <v-list-item-content>
                      <div> Datos del Vendedor</div>
                      <v-col cols="12" sm="12" md="6">
                         <v-list-item-avatar color="grey">
                      <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                    </v-list-item-avatar>
                     <v-text-field v-model="editedItem.user.nombre" readonly  label="Nombre" ></v-text-field>
                     </v-col>
                      <v-col cols="12" sm="12" md="6">
                     <v-text-field v-model="editedItem.user.apellido" readonly  label="Apellido" ></v-text-field>
                     </v-col>
                      <v-col cols="12" sm="12" md="6">
                     <v-text-field v-model="editedItem.user.telefono" readonly  label="telefono" ></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="12" md="6">
                     <v-text-field v-model="editedItem.user.email" readonly  label="Correo" ></v-text-field>
                     </v-col>
                     <v-divider></v-divider>
                   <v-col cols="12" sm="12" md="6">
                      <img :src='ruta + editedItem.imagen'  style='width:80%;height:80%'/>
                      </v-col>
                   <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.titulo" readonly  label="Titulo" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.descripcion" readonly  label="Descripcion" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.precio" color="blue" readonly label="Precio($)" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-select v-model="editedItem.categoria._id" :items="idCategoriasArray"   readonly  label="Categoria" ></v-select>
                      </v-col>
                       <v-col cols="12" sm="12" md="6">
     <v-container>
                <div class="text-center">
                    </div>
                    </v-container>
                         </v-col>
                      </v-list-item-content>
                  </v-list-item>
                  </v-form>
                    </v-row>
                  </v-container>
                </v-card-text>
                <!-- .....................Comentar........................ -->
                 <!--  .................fin comentar................. -->
                          </v-card>
            </v-dialog>
            <!-- ..................................Comentario................. -->
             <v-dialog v-model="dialogCom" persistent max-width="500px">
                        <v-card>
                          <div class="text-right">
                          <v-btn text @click="dialogCom = false">Salir</v-btn>
                          </div>
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
                            <v-btn text @click="dialogCom = false">Cancelar</v-btn>
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
            <!-- ....................................fin comentario............... -->
             <!-- View show -->
            <v-dialog v-model="dialogC" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Compartir</span>
                </v-card-title>

                <v-card-text>
                  <v-row>
                  <v-col cols="10" sm="10" md="10">
                     <v-text-field v-model="editedItem.tituloCompartido"  label="Titulo" ></v-text-field>
                     </v-col>
                      <v-col cols="2" sm="2" md="2">
                       <v-btn icon @click="compartir()">
                   <v-icon color="purple" title="Compartir" >mdi-share-variant</v-icon>
                    </v-btn>
                    </v-col>
                      </v-row>
                  <v-card>
                  <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="6">
                         <v-list-item-avatar color="grey">
                      <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                    </v-list-item-avatar>
                     <v-text-field v-model="editedItem.user.nombre" readonly  label="Nombre" ></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="12" md="6">
                        </v-col>
                      <v-col cols="12" sm="12" md="6">
                     <v-text-field v-model="editedItem.user.apellido" readonly  label="Apellido" ></v-text-field>
                     </v-col>
                     <v-divider></v-divider>
                   <v-col cols="12" sm="12" md="6">
                      <img :src='ruta + editedItem.imagen'  style='width:80%;height:80%'/>
                      <v-text-field style='height: 56px;margin: 0px 0px 10px;' outline label='Seleccione la Foto' @click='pickFile' v-model='editedItem.imagen.imageName'  prepend-inner-icon='attach_file'></v-text-field>
                      <input type="file"  style="display: none;"  ref="image"   accept="image/*" @change="onFilePicked">
                      </v-col>
                   <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.titulo" readonly  label="Titulo" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.descripcion" readonly  label="Descripcion" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="editedItem.precio" color="blue" readonly label="Precio($)" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-select v-model="editedItem.categoria._id" :items="idCategoriasArray"   readonly  label="Categoria" ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-dialog>
    </v-row>
</template>

<script>
import Api from '@/services/methods'
import { server, port } from '@/services/environment'
export default {
  data: () => ({
    dialogC: false,
    fav: true,
    menu: false,
    dialogCom: false,
    dialogEdit: false,
    dialogShow: false,
    ruta: server + ':' + port,
    publicaciones: [],
    search: '',
    comentarios: [],
    compartidas: [],
    cantLikes: [],
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
      tituloCompartido: '',
      titulo: '',
      descripcion: '',
      categoria: '',
      user: {
        nombre: '',
        apellido: '',
        telefono: '',
        email: ''
      },
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
      user: {
        nombre: '',
        apellido: '',
        telefono: '',
        email: ''
      },
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
  computed: {
    formTitleShow () {
      return 'Titulo nuevo'
    },
    /* ..........busca publicacion............. */
    filtrarPublicacion: function () {
      return this.publicaciones.filter((publicacion) => {
        return publicacion.titulo.match(this.search) ||
         publicacion.descripcion.match(this.search) ||
         publicacion.categoria.nombre.match(this.search) ||
         publicacion.user.nombre.match(this.search) ||
         publicacion.user.apellido.match(this.search)
      })
    },
    filtrarCompartidas: function () {
      return this.compartidas.filter((compartir) => {
        return compartir.titulo.match(this.search) ||
         compartir.descripcion.match(this.search) ||
         compartir.categoria.nombre.match(this.search) ||
         compartir.user.nombre.match(this.search) ||
         compartir.user.apellido.match(this.search)
      })
    }
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
    },
    dialogC (val) {
      val || this.close()
    },
    dialogCom (val) {
      val || this.close()
    }
  },
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
        .catch(e => {
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
      this.listarCompartidas()
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
    /*   buscarCategoria (idCategoria) {
      Api.get('publicaciones')
        .then(response => {
          if(response.data){
          this.publicaciones = response.data
          console.log(this.publicaciones)
          }
        })
        .catch(e => {
          console.log('se ejecuta error')
          console.log('error' + e)
        })
    }, */
    listarCompartidas () {
      Api.get('compartir')
        .then(response => {
          this.compartidas = response.data
          console.log(this.compartidas)
        })
        .catch(e => {
          console.log('Error al ver publicaciones compartidas')
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
        .catch(e => {
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
    dialogCIem (publicacion) {
      this.editedIndex = this.publicaciones.indexOf(publicacion)
      this.editedItem = Object.assign({}, publicacion)
      this.dialogC = true
    },
    dialogComentar (publicacion) {
      this.editedIndex = this.publicaciones.indexOf(publicacion)
      this.editedItem = Object.assign({}, publicacion)
      this.dialogCom = true
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
      this.dialogC = false
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
        .catch(e => {
          console.log('se ejecuta a ver comentarios')
          console.log('error' + e)
        })
    },
    likes (publicacion) {
      console.log('id publi dd: ' + publicacion._id)
      Api.post('publicaciones/' + publicacion._id + '/like', {
      })
        .then((response) => {
          console.log('likes: ' + response.data)
          const Toast = this.$swal.mixin({
            type: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Toast.stopTimer)
              toast.addEventListener('mouseleave', Toast.resumeTimer)
            }
          })
          Toast.fire({
            title: 'Has dado Me gusta'
          })
        })
        .catch(e => {
          console.log('error' + e)
        })
      this.listarPublicaciones()
    },
    contadorLikes (publicacion) {
      console.log('id publi dd: ' + publicacion._id)
      Api.get('publicaciones/' + publicacion._id + '/like', {
      })
        .then((response) => {
          let nro = response.data
          console.log('Nro likes: ' + nro)
        })
        .catch(e => {
          console.log('error' + e)
        })
    },
    compartir () {
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
        console.log('nombre de la imagen: ' + this.editedItem.imagen)
        let imagenCom = this.editedItem.imagen
        Api.post('compartir', {
          titulo: this.editedItem.tituloCompartido,
          titulo2: this.editedItem.titulo,
          descripcion: this.editedItem.descripcion,
          categoria: this.editedItem.categoria,
          precio: this.editedItem.precio,
          delUsuario: this.editedItem.user.nombre + ' ' + this.editedItem.user.apellido,
          imagen: imagenCom })
          .then(response => {
            this.editedItem = Object.assign({}, this.defaultItem)
            console.log(response)
            this.$swal({
              type: 'success',
              title: 'Publicacion Compartida',
              text: 'has Compartido con exito'
            })
            this.close()
          })
          .catch(e => {
            this.$swal({
              type: 'error',
              title: 'Error al Compartir',
              text: 'Por verifique los datos e intente de nuevo'
            })
            console.log('error guardar....' + e)
          })
        Object.assign(this.publicaciones[this.editedIndex], this.editedItem)
      }
      console.log('Datos guardados')
      this.reset()
      this.close()
    }
  }
}
</script>
