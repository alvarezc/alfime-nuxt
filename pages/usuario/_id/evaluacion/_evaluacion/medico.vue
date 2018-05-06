<template>
    <v-container>
        <v-card>
            <v-card-title primary-title="">
                <div class="headline">Aspecto Médico</div>
            </v-card-title>

            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <form>
                                        <v-radio-group v-model="editedItem.valor.congenita" row>
                                            <v-radio label="Congénita" :value="true"></v-radio>
                                            <v-radio label="Adquirida" :value="false"></v-radio>
                                        </v-radio-group>

                                        <calendar v-model="editedItem.valor.adquisicion" label="Fecha de Adquisición"
                                                  :max="today"></calendar>
                                    </form>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-data-table
                    :headers="headers"
                    :items="discapacidades"
                    hide-actions
                    class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.discapacidad.nombre }}</td>
                    <td class="justify-center">
                        <template v-if="props.item.valor">
                            {{props.item.valor.congenita ? 'Congénita' : 'Adquirida'}}
                        </template>
                        <template v-else>
                            Ninguna
                        </template>
                    </td>
                    <td class="text-xs-right">
                        <template v-if="props.item.valor">
                            {{formatDate(props.item.valor.adquisicion)}}
                        </template>
                        <template v-else>
                            Ninguna
                        </template>

                    </td>

                    <td class="justify-center layout px-0">
                        <v-btn icon class="mx-0" @click="editItem(props.item)">
                            <v-icon color="teal">edit</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="deleteItem(props.item)" :disabled="!props.item.valor">
                            <v-icon color="pink">delete</v-icon>
                        </v-btn>
                    </td>

                </template>
                <template slot="no-data">
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>

            <v-card-actions>
                <v-btn flat exact color="red"
                       :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>

        <br>
        <a-categoria id="1"></a-categoria>
        <br>
        <a-categoria id="2"></a-categoria>
        <br>
        <a-categoria id="3"></a-categoria>
        <br>
        <a-categoria id="4"></a-categoria>
        <br>
        <a-categoria id="5"></a-categoria>
    </v-container>
</template>

<script>
  import moment from 'moment'
  import lookup from '~/services/lookup'
  import evaluacionService from '~/services/evaluacion'
  import calendar from '~/components/calendar'
  import ACategoria from '../../../../../components/categoria'

  export default {
    name: 'medico',

    components: {
      ACategoria,
      calendar
    },

    async asyncData ({params}) {
      const evaluacionDiscapacidades = await evaluacionService.evaluacionDiscapacidades(params.evaluacion)
      let discapacidadList = await lookup.discapacidades()

      return {
        discapacidadList,
        evaluacionDiscapacidades,
        modelo: {}
      }
    },

    data: () => ({
      today: moment().format('YYYY-MM-DD'),

      date: moment().format('YYYY-MM-DD'),

      menu: false,

      dialog: false,

      formTitle: '',

      headers: [
        {text: 'Discapacidad', value: 'discapacidad'},
        {text: 'Origen', value: 'origen'},
        {text: 'Adquisición', value: 'adquisicion'},
        {text: 'Actions', value: 'name', sortable: false}
      ],

      defaultItem: {
        discapacidad: '',
        valor: {
          congenita: true,
          adquisicion: null
        }
      },

      editedItem: {
        valor: {
          congenita: true,
          adquisicion: null
        }
      }
    }),

    computed: {
      discapacidades () {
        return this.discapacidadList.map(discapacidad => {
          return {
            discapacidad,
            valor: this.evaluacionDiscapacidades.find(item => item.discapacidad.id === discapacidad.id)
          }
        })
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
      },

      formatDate (date) {
        return moment(date).format('YYYY-MM-DD')
      },

      editItem ({discapacidad, valor}) {
        this.dialog = true
        this.editedItem = {
          discapacidad,
          valor: valor ? {...valor} : {id: -1, congenita: true, adquisicion: null}
        }
        this.editedIndex = valor ? valor.id : -1
        this.formTitle = discapacidad.nombre
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      async deleteItem ({valor}) {
        if (confirm('Seguro que quieres borrar la discapacidad?')) {
          const result = await evaluacionService.borraDiscapacidad(valor)

          const index = this.evaluacionDiscapacidades
            .findIndex(item => item.discapacidad.id === result.discapacidad.id)

          this.evaluacionDiscapacidades.splice(index, 1)
        }
      },

      async save () {
        const {valor, discapacidad} = this.editedItem
        let result

        if (this.editedIndex > -1) {
          result = await evaluacionService
            .guardaDiscapacidad({
              id: this.editedIndex,
              congenita: valor.congenita,
              adquisicion: valor.adquisicion
            })
        } else {
          result = await evaluacionService
            .agregaDiscapacidad(this.$route.params.evaluacion, {
              discapacidad: discapacidad.self.href,
              congenita: valor.congenita,
              adquisicion: valor.adquisicion
            })
        }

        const index = this.evaluacionDiscapacidades.findIndex(item => item.discapacidad.id === result.discapacidad.id)

        if (index === -1) {
          // Agregar
          this.evaluacionDiscapacidades.push(result)
        } else {
          Object.assign(this.evaluacionDiscapacidades[index], result)
        }

        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
