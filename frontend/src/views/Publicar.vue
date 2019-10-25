<template>
<v-container>
<v-row align="center" justify="center">
<v-col cols="12" sm="8" md="4">
   <v-card >
     <v-toolbar flat color="indigo" dark>
    <v-toolbar-title >Publica un articulo</v-toolbar-title>
    <v-spacer></v-spacer>
     </v-toolbar>
     <v-card-text>
  <v-form  ref="form" v-model="valid" lazy-validation>
    <v-text-field  v-model="name" :counter="20"  :rules="nameRules" label="Titulo de la publicacion"  required></v-text-field>
    <v-file-input   label="foto"  :rules="fotoRules" required></v-file-input>
    <v-textarea  solo name="input-7-4"   label="Descripcion" ></v-textarea>
    <v-select v-model="select"  :items="items" :rules="[v => !!v || 'Seleccione una categoria']"  label="Categoria"  required ></v-select>
    <v-text-field   :counter="number"  label="Pon un precio"  required></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'selecciona la casilla para  continuar!']"
      label="seguro desea publicar?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Publicar
    </v-btn>

    <v-btn  color="error" class="mr-4"  @click="reset">Cancelar</v-btn>
  </v-form>
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
    <v-col cols="12" sm="8" md="6"  v-for="publicacion in publicaciones" :key="publicacion.titulo">
    <v-list-item  :items="publicaciones">
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title value="titulo" v-model="editedItem.titulo" class="headline">{{publicacion.titulo}}</v-list-item-title>
        <v-list-item-subtitle>Publicado por:Yordan Lopez  </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>
    <v-card-text>
      {{publicacion.descripcion}}
    </v-card-text>
    <v-card-text>
      ${{publicacion.precio}}
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Read
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Bookmark
      </v-btn>
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
  </v-col>
  </v-row>
   </v-card-text>
  </v-card>
   </v-col>
  </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    publicaciones: [],
    editedItem: {
      _id: '',
      titulo: '',
      descripcion: ''
    },
    defaultItem: {
      _id: '',
      titulo: '',
      descripcion: ''
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
    items: [
      'Lapto',
      'PC',
      'Ropa',
      'Maqullaje'
    ],
    checkbox: false
  }),
  created () {
    this.initialize()
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    initialize () {
      this.listarPublicaciones()/* inicia el metodo de listar */
    },
    /* muestra en la tabla los proveedores */
    listarPublicaciones () {
      this.axios
        .get('/publicaciones')
        .then(response => {
          this.publicaciones = response.data
          console.log(this.publicaciones)
        })
        .catch(e => {
          console.log('se ejecuta error')
          console.log('error' + e)
        })
    }
  }
}
</script>
