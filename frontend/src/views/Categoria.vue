<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="categorias"
        :search="search"
        sort-by="nombre"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="indigo" dark>
            <v-toolbar-title>Categorias</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="text-xs-center"
              v-model="search"
              label="Búsqueda"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="success" fab dark small class="mb-2" v-on="on">
                  <v-icon title="Agregar">mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-form ref="form"
                    v-model="valid"
                    lazy-validation>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedItem.nombre" :rules="nombreRules" label="Nombre" required></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" small dark @click="close">
                    <v-icon>mdi-close</v-icon>Cancelar
                  </v-btn>
                  <v-btn color="success" small dark @click="save">
                    <v-icon>mdi-content-save</v-icon>Guardar
                  </v-btn>
                </v-card-actions>
                 </v-card-text>
              </v-card>
              </v-form>
            </v-dialog>
            <!-- View show -->
            <v-dialog v-model="dialogShow" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitleShow }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedItem.nombre" disabled="true" :rules="nombreRules" label="Nombre"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
            <!-- View show -->
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon color="indigo" title="Ver" class="mr-2" @click="ShowItem(item)">mdi-eye</v-icon>
          <v-icon color="warning" title="Editar"  class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon color="error" title="Eliminar"  @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
          <h1>No hay categorias registradas</h1>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from '@/services/methods'
export default {
  data: () => ({
    valid: true,
    nombreRules: [
      v => !!v || 'El nombre es requerido',
      v => (v && v.length <= 25) || 'El nombre no debe pasar los 25 caracteres'
    ],
    dialog: false,
    dialogShow: false,
    headers: [
      { text: 'Nombre', value: 'nombre' }, /* value es el nombre del  modelo */
      { text: 'Acciones', value: 'action', sortable: false }
    ],
    categorias: [],
    search: '',
    editedIndex: -1,
    editedItem: {
      _id: '',
      nombre: ''
    },
    defaultItem: {
      _id: '',
      nombre: ''
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1
        ? 'Nueva Categoria'
        : 'Modificar Categoria'
    },
    formTitleShow () {
      return 'Información de la Categoria'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogShow (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.listarCategoria()/* inicia el metodo de listar */
    },
    validate () {
      if (this.$refs.form.validate()) {
        return true
      } else {
        return false
      }
    },
    /* muestra en la tabla los categorias */
    listarCategoria () {
      Api.get('categoria')
        .then(response => {
          this.categorias = response.data
        })
        .catch(e => {
          console.log('se ejecuta error')
          console.log('error' + e)
        })
    },
    editItem (item) {
      this.editedIndex = this.categorias.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    ShowItem (item) {
      this.editedIndex = this.categorias.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogShow = true
    },

    deleteItem (item) {
      const index = this.categorias.indexOf(item)
      this.$swal({
        type: 'warning',
        title: '¿Está seguro que desea borrar?',
        text: 'No podrá revertir la operación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'cancelar'
      }).then(result => {
        if (result.value) {
          this.$swal('Borrado!', 'Su registro ha sido borrado.', 'success')
          this.categorias.splice(index, 1)
          Api.delete('categoria/' + item._id)
            .then(response => {
              console.log(response)
            })
        }
      })
    },
    reset () {
      this.$refs.form.reset()
    },
    close () {
      this.dialog = false
      this.dialogShow = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.validate()) {
        if (this.editedIndex > -1) {
          console.log('Datos guardados')
          console.log(this.editedItem)
          console.log(this.editedItem._id)
          Api.put('categoria/' + this.editedItem._id, {
            nombre: this.editedItem.nombre
          })
            .then(response => {
              console.log(response)
              this.$swal({
                type: 'success',
                title: 'Modificación exitosa',
                text: 'sus cambios han sido guardados'
              })
            })

          Object.assign(this.categorias[this.editedIndex], this.editedItem)
        } else {
          Api.post('categoria', {
            nombre: this.editedItem.nombre
          })
            .then(response => {
              console.log(response)
              this.$swal({
                type: 'success',
                title: 'Su registro ha sido realizado con exito',
                text: 'datos guardados'
              })
            })
            .catch(e => {
              this.$swal({
                type: 'error',
                title: 'Error al guardar',
                text: 'Por verifique los datos e intente de nuevo'
              })
              console.log('error guardar....' + e)
            })
          this.categorias.push(this.editedItem)
        }
        this.close()
      }
    }
  }
}
</script>
