<template>
    <v-container>
        <div class="title">{{titulo}}</div>
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
                <a-formulario v-model="editItem.contenido" :schema="currentSchema"
                              @guarda="guarda()" @cerrar="cerrar()"></a-formulario>
            </template>
        </template>
        <template v-else>
            <h2>No hay usuario seleccionado</h2>
            <v-btn to="/usuario">Seleccionar Usuario</v-btn>
        </template>
    </v-container>
</template>

<script>
  import lookupService from '~/services/lookup'
  import seccionService from '~/services/seccion'

  export default {
    name: 'ASeccion',

    props: {
      titulo: {
        required: true,
        type: String
      },

      templates: {
        required: true,
        type: Object
      },

      seccion: {
        required: true,
        type: Number
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

        seccionTipos: [],

        seccionTipo: null,

        currentSchema: [],

        lista: [],

        usuario: null
      }
    },

    mounted () {
      const state = this.$store.state

      if (state.alfime && state.alfime.usuario) {
        console.log(`Usuario ${JSON.stringify(state.alfime.usuario)}`)

        this.usuario = state.alfime.usuario
        this.getLista(state.alfime.usuario)
      }

      this.$store.watch(
        (state) => state.alfime.usuario,
        (newValue) => {
          console.log(`Usuario ${JSON.stringify(newValue)}`)
          this.usuario = newValue
          this.getLista(newValue)
        })

      lookupService.seccionTipos()
        .then(tipos => {
          this.seccionTipos = tipos
        })
    },

    methods: {
      async editar (seccionDataId) {
        const seccionData = await seccionService.seccionData(seccionDataId)

        this.editItem = seccionData

        switch (seccionData.tipo.id) {
          case 1:
            this.currentSchema = this.templates.plan.schema
            break
          case 2:
            this.currentSchema = this.templates.informe.schema
            break
          default:
            this.currentSchema = this.templates.seguimiento.schema
        }
      },

      async getLista (usuario) {
        if (usuario) {
          this.lista = await seccionService.listaData(usuario.id, this.seccion)
        } else {
          this.lista = []
        }
      },

      agregar () {
        this.editItem = {
          id: -1,

          contenido: {},

          tipo: this.seccionTipo,

          seccion: this.seccion
        }

        switch (this.seccionTipo.id) {
          case 1:
            this.editItem.contenido = {...this.templates.plan.model}
            this.currentSchema = this.templates.plan.schema
            break
          case 2:
            this.editItem.contenido = {...this.templates.informe.model}
            this.currentSchema = this.templates.informe.schema
            break
          default:
            this.editItem.contenido = {...this.templates.seguimiento.model}
            this.currentSchema = this.templates.seguimiento.schema
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
      },

      cerrar () {
        this.editItem = {id: null, contenido: {}}
      }
    }
  }
</script>
