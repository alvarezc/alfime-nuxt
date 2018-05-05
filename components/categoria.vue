<template>
    <v-card class="categoria">
        <v-card-title>
            <div class="headline" style="text-transform: capitalize">{{categoria.nombre}}</div>
        </v-card-title>

        <v-data-table :items="categoria.categorias" :headers="headers" item-key="id"
                      hide-actions>
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{props.item.id}}</td>
                    <td class="categoria__name">{{props.item.nombre}}</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table :items="props.item.items" class="child" hide-actions hide-headers>
                    <template slot="items" slot-scope="props">
                        <td>{{props.item.id}}</td>
                        <td>{{props.item.nombre}}</td>
                    </template>
                </v-data-table>
            </template>
            <template slot="no-data">
                No hay datos
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
  import medicoService from '~/services/medico'

  export default {
    name: 'aCategoria',

    props: ['id'],

    data () {
      return {
        categoria: {},

        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nombre', value: 'nombre'}
        ]
      }
    },

    async mounted () {
      this.categoria = await medicoService.categoria(this.id)
    }
  }
</script>

<style>
    .categoria table.table tbody td.categoria__name {
        font-weight: bold;
    }
</style>