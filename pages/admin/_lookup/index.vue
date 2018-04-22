<template>
    <v-card>
        <v-card-title>
            Nutrition
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
                :items="lookup"
                :headers="headers"
                :search="buscar"
                class="elevation-1">
            <template slot="items" slot-scope="props">
                <td class="lookup__id">{{props.item.id}}</td>
                <td class="lookup__nombre">{{props.item.nombre}}</td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
  import lookupService from '~/services/lookup'

  export default {
    name: 'index',

    async asyncData ({params}) {
      const lookup = await lookupService[params.lookup]()

      console.log(params.lookup)
      console.log(lookupService[params.lookup])

      return {
        lookup
      }
    },

    data () {
      return {
        buscar: '',

        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nombre', value: 'nombre'}
        ]
      }
    }
  }
</script>

<style scoped>
    .lookup__id {
        width: 50px
    }
</style>
