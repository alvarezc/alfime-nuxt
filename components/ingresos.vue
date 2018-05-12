<template>
    <v-card>
        <v-card-title primary-title>
            <div class="headline">Ingresos</div>
        </v-card-title>
        <v-data-table
                hide-actions
                :items="ingresos"
                :headers="headers">
            <template slot="items" slot-scope="props">
                <td class="lookup__id">{{props.item.ingreso.id}}</td>
                <td class="lookup__nombre">
                    {{props.item.ingreso.nombre}}
                </td>
                <td class="lookup__monto">
                    <template v-if="props.item.valor">
                        $ {{props.item.valor.monto}}
                    </template>
                    <template v-else>$ 0</template>
                </td>
                <td class="lookup__frecuencia">
                    <template v-if="props.item.valor && props.item.valor.frecuencia">
                        {{props.item.valor.frecuencia.nombre}}
                    </template>
                    <template v-else>
                        <span style="color: #bbb">Ninguno</span>
                    </template>
                </td>
                <td class="justify-center layout px-0 lookup__actions">
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)" :disabled="!props.item.valor">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

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
                                    <v-flex xs12>
                                        <v-text-field label="Monto" v-model="editedItem.valor.monto"
                                                      maxlength="8" mask="########"
                                                      required></v-text-field>
                                    </v-flex>

                                    <v-flex xs12>
                                        <lookup :items="frecuencias" required label="Frecuencia"
                                                v-model="editedItem.valor.frecuencia"></lookup>
                                    </v-flex>
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
    </v-card>
</template>

<script>
  import evaluacionService from '~/services/evaluacion'
  import lookupService from '~/services/lookup'

  export default {
    name: 'AIngresos',

    props: {
      evaluacionId: {
        required: true,
        type: String
      }
    },

    mounted () {
      this.initialize(this.evaluacionId)
    },

    data () {
      return {
        ingresosList: [],
        evaluacionIngresos: [],
        frecuencias: [],

        headers: [
          {text: 'ID', value: 'ingreso.id'},
          {text: 'Nombre', value: 'ingreso.nombre'},
          {text: 'Monto', value: 'valor.monto'},
          {text: 'Frecuencia', value: 'valor.frecuencia', sortable: false},
          {text: 'Actions', value: 'name', sortable: false}
        ],

        dialog: false,

        editedIndex: -1,

        editedItem: {
          valor: {
            monto: 0,
            frecuencia: null
          }
        },

        defaultItem: {
          ingreso: {},
          valor: {
            monto: 0,
            frecuencia: null
          }
        },

        formTitle: ''
      }
    },

    computed: {
      ingresos () {
        return this.ingresosList.map(ingreso => {
          console.log(ingreso)

          return {
            ingreso,
            valor: this.evaluacionIngresos.find(item => item.ingreso.id === ingreso.id)
          }
        })
      }
    },

    methods: {
      async initialize (evaluacionId) {
        this.evaluacionIngresos = await evaluacionService.evaluacionIngresos(evaluacionId)
        this.ingresosList = await lookupService.ingresos()
        this.frecuencias = await lookupService.frecuencias()
      },

      editItem ({ingreso, valor}) {
        this.dialog = true
        this.editedItem = {
          ingreso,
          valor: valor ? {...valor} : {id: -1, monto: 0, frecuencia: null}
        }
        this.editedIndex = valor ? valor.id : -1
        this.formTitle = ingreso.nombre
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      async deleteItem ({valor}) {
        if (confirm('Seguro que quieres borrar el ingreso?')) {
          const result = await evaluacionService.borraIngreso(valor)

          console.log(result)

          const index = this.evaluacionIngresos.findIndex(item => item.ingreso.id === result.ingreso.id)

          this.evaluacionIngresos.splice(index, 1)
        }
      },

      async save () {
        const {valor, ingreso} = this.editedItem
        let result

        if (this.editedIndex > -1) {
          result = await evaluacionService
            .guardaIngreso({
              id: this.editedIndex,
              monto: this.editedItem.valor.monto,
              frecuencia: valor.frecuencia.self ? valor.frecuencia.self.href : undefined
            })
        } else {
          result = await evaluacionService
            .agregaIngreso(this.$route.params.evaluacion, {
              ingreso: ingreso.self.href,
              monto: this.editedItem.valor.monto,
              frecuencia: valor.frecuencia.self ? valor.frecuencia.self.href : undefined
            })
        }

        const index = this.evaluacionIngresos.findIndex(item => item.ingreso.id === result.ingreso.id)

        if (index === -1) {
          // Agregar
          this.evaluacionIngresos.push(result)
        } else {
          Object.assign(this.evaluacionIngresos[index], result)
        }

        this.close()
      }
    }
  }
</script>

<style scoped>
    .lookup__id {
        width: 70px;
    }

    .lookup__nombre {
        width: 100%;
    }

    .lookup__monto {
        text-align: right;
        white-space: nowrap;
    }

    .lookup__frecuencia {
        width: 150px;
        text-align: right;
    }

    .lookup__actions {
        width: 100px;
    }
</style>
