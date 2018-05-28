<template>
    <v-container>
        <div class="title">Psicologia</div>
        <template v-if="usuario">
            <template v-if="editItem.id === null">
                <v-data-table :items="lista" item-key="id" :headers="headers">
                    <template slot="items" slot-scope="props">
                        <tr @click="editar(props.item.id)">
                            <td>{{props.item.id}}</td>
                            <td>{{props.item.tipo.nombre}}</td>
                            <td>{{props.item.createdBy}}</td>
                            <td>{{props.item.createdDate}}</td>
                            <td>{{props.item.modifiedDate}}</td>
                        </tr>
                    </template>
                </v-data-table>
                <v-layout row>
                    <lookup :items="seccionTipos" label="Agregar Tipo" v-model="seccionTipo"></lookup>
                    <v-btn :disabled="!seccionTipo" @click="agregar()">Agregar</v-btn>
                </v-layout>
            </template>
            <template v-else>
                <a-formulario v-model="editItem.contenido" :schema="schemaSeguimiento" to="/psicologia"
                              @guarda="guarda()"></a-formulario>
            </template>
        </template>
        <template v-else>
            <h2>No hay usuario seleccionado</h2>
            <v-btn to="/usuario">Seleccionar Usuario</v-btn>
        </template>
    </v-container>
</template>


<script>
  export default {
    name: 'seguimiento'
  }

  import lookupService from '~/services/lookup'
  import seccionService from '~/services/seccion'
  import { mapState } from 'vuex'

  export default {
    name: 'index',

    async asyncData () {
      return {
        seccionTipos: await lookupService.seccionTipos()
      }
    },

    data () {
      return {
        editItem: {id: null, contenido: {generales: 'Probando'}},

        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Tipo', value: 'tipo.nombre'},
          {text: 'Creado Por', value: 'createdBy'},
          {text: 'Creado En', value: 'createdDate'},
          {text: 'Modificado En', value: 'modifiedDate'}
        ],

        seccionTipo: null,

        schemaSeguimiento: [
          {
            id: 9,
            etiqueta: 'Motivo de consulta',
            nombre: 'motivo',
            tipo: 'texto',
            opciones: {
              max: 500,
              multi: true
            }
          },
          {
            id: 10,
            etiqueta: 'Logros',
            nombre: 'logros',
            tipo: 'texto',
            opciones: {
              max: 500,
              multi: true
            }
          },
          {
            id: 11,
            etiqueta: 'Dificultades',
            nombre: 'dificultades',
            tipo: 'texto',
            opciones: {
              max: 500,
              multi: true
            }
          },
          {
            id: 12,
            etiqueta: 'Observaciones',
            nombre: 'observaciones',
            tipo: 'texto'
          },
        ],

        lista: []
      }
    },

    computed: {
      ...mapState('alfime', ['usuario'])
    },

    mounted () {
      const state = this.$store.state

      if (state.alfime.usuario) {
        this.getLista(state.alfime.usuario)
      }
      this.$store.watch(
        (state) => state.alfime.usuario,
        (newValue) => {
          this.getLista(newValue)
        })
    },

    methods: {
      async editar (seccionDataId) {
        const seccionData = await seccionService.seccionData(seccionDataId)

        this.editItem = seccionData
      },

      async getLista (usuario) {
        if (usuario) {
          this.lista = await seccionService.listaData(this.usuario.id, 1)
        } else {
          this.lista = []
        }
      },

      agregar () {
        this.editItem = {
          id: -1,

          contenido: {
            motivo: null,
            logros: null,
            dificultades: null,
            observaciones: null
          },
          tipo: this.seccionTipo,

          seccion: 1
        }
      },

      async guarda () {
        if (this.editItem.id === -1) {
          await seccionService.agregaSeccionData(this.usuario.id, this.editItem)
        } else {
          await seccionService.guardaSeccionData(this.editItem)
        }

        this.editItem = {id: null, contenido: {}}

        this.getLista(this.usuario)
      }
    }
  }
</script>
<
style
scoped >

< /style>