<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs11 sm5>
                <v-select :items="discapacidades"
                          label="Discapacidad" item-text="nombre" item-value="id"></v-select>
            </v-flex>
            <v-flex xs1>{{date}}</v-flex>
            <v-spacer></v-spacer>
            <v-flex xs11 sm5>
                <calendar v-model="date" label="Fecha de Adquisición" :max="today"></calendar>
            </v-flex>
            <v-flex xs12>
                <v-data-table
                        :headers="headers"
                        :items="items"
                        hide-actions
                        class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.discapacidad }}</td>
                        <td class="justify-center">{{ props.item.origen }}</td>
                        <td class="text-xs-right">{{ props.item.adquisicion }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="editItem(props.item)">
                                <v-icon color="teal">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                    <template slot="no-data">
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import moment from 'moment'
  import lookup from '~/services/lookup'
  import calendar from '~/components/calendar'

  export default {
    name: 'medico',

    components: {
      calendar
    },

    async asyncData ({params}) {
      let discapacidades = await lookup.discapacidades()

      return {discapacidades}
    },

    data: () => ({
      today: moment().format('YYYY-MM-DD'),
      date: moment().format('YYYY-MM-DD'),
      menu: false,
      headers: [
        {text: 'Discapacidad', value: 'discapacidad'},
        {text: 'Origen', value: 'origen'},
        {text: 'Adquisición', value: 'adquisicion'},
        {text: 'Actions', value: 'name', sortable: false}
      ],

      items: [],

      defaultItem: {
        discapacidad: '',
        origen: '',
        adquisicion: '',
        discapacidadId: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.items = [
          {
            discapacidad: 'Física',
            origen: 'Congénita',
            adquisicion: '2010-01-01',
            discapacidadId: 1
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
