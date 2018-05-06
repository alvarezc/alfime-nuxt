<template>
    <v-card>
        <v-card-title>
            Usuarios
            <v-spacer></v-spacer>
            <v-text-field
                    append-icon="search"
                    label="Buscar"
                    single-line
                    hide-details
                    v-model="buscar"
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :items="dataTable"
                :headers="headers"
                :search="buscar"
                class="elevation-1">
            <template slot="items" slot-scope="props">
                <td class="lookup__id">{{props.item.id}}</td>
                <td class="lookup__nombre" @click="changeUsuario(props.item)" role="button">
                    {{props.item.nombre}}
                </td>
                <td class="lookup__documento">{{props.item.documento}}</td>
            </template>
        </v-data-table>
        <v-card-actions>
            <v-btn to="/usuario/agregar">Agregar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import usuarioService from '~/services/usuario'
  import { mapMutations } from 'vuex'

  export default {
    name: 'index',

    async asyncData () {
      const dataTable = (await usuarioService.dataTable())
        .map(item => ({
          id: item.id,
          documento: item.documento,
          nombre: `${item.nombre} ${item.segundoNombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`
        }))

      return {
        dataTable
      }
    },

    data () {
      return {
        buscar: '',

        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nombre', value: 'nombre'},
          {text: 'Documento', value: 'documento'}
        ]
      }
    },

    created () {
      this.updateUsuario(null)
    },

    methods: {
      changeUsuario (usuario) {
        this.updateUsuario(usuario)
        this.$router.push(`/usuario/${usuario.id}`)
      },

      ...mapMutations({
        updateUsuario: 'alfime/updateUsuario'
      })
    }
  }
</script>

<style scoped>
    .lookup__id {
        width: 70px;
    }

    .lookup__documento {
        width: 150px;
    }
</style>
