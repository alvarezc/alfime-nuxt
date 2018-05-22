<template>
    <v-container>
        <div class="title">Psicologia</div>
        <template v-if="usuario">
            <v-data-table :items="lista" item-key="id" :headers="headers" v-if="editItem.id === -1">
                <template slot="items" slot-scope="props">
                    <tr @click="editar(props.item.id)">
                        <td>{{props.item.id}}</td>
                        <td class="categoria__name">{{props.item.tipo.nombre}}</td>
                        <td class="categoria__name">{{props.item.createdBy}}</td>
                        <td class="categoria__name">{{props.item.createdDate}}</td>
                        <td class="categoria__name">{{props.item.modifiedDate}}</td>
                    </tr>
                </template>
            </v-data-table>
            <template v-else>
                <a-formulario v-model="editItem.contenido" :schema="schema" to="/psicologia"></a-formulario>
            </template>
        </template>
        <template v-else>
            <h2>No hay usuario seleccionado</h2>
        </template>
    </v-container>
</template>

<script>
  import seccionService from '~/services/seccion'
  import { mapState } from 'vuex'
  import AFormulario from '../../components/form/formulario'

  export default {
    name: 'index',
    components: {AFormulario},

    data () {
      return {
        editItem: {id: -1, contenido: {generales: 'Probando'}},

        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Tipo', value: 'tipo.nombre'},
          {text: 'Creado Por', value: 'createdBy'},
          {text: 'Creado En', value: 'createdDate'},
          {text: 'Modificado En', value: 'modifiedDate'}
        ],

        schema: [
          {
            id: 1,
            etiqueta: 'Objetivos Generales',
            nombre: 'generales',
            tipo: 'texto',
            opciones: {
              max: 500,
              multi: true
            }
          },
          {
            id: 2,
            etiqueta: 'Objetivos Especificos',
            nombre: 'especificos',
            tipo: 'texto',
            opciones: {
              max: 500,
              multi: true
            }
          },
          {
            id: 3,
            etiqueta: 'Plan de Atención',
            nombre: 'plan',
            tipo: 'texto',
            opciones: {
              max: 500,
              multi: true
            }
          }
        ]
      }
    },

    computed: {
      ...mapState('alfime', ['usuario'])
    },

    asyncComputed: {
      lista: {
        async get () {
          if (this.usuario) {
            return seccionService.listaData(this.usuario.id, 1)
          } else {
            return []
          }
        },
        default: []
      }
    },

    methods: {
      async editar (seccionDataId) {
        const seccionData = await seccionService.seccionData(seccionDataId)

        this.editItem = seccionData
      }
    }
  }
</script>

<style scoped>

</style>
