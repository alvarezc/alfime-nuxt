<template>
    <v-tabs v-model="activeTab">
        <v-tab key="1">
            Seguridad Social
        </v-tab>

        <v-tab-item key="1">
            <v-card>
                <v-card-text>
                    <lookup :items="regimenes" label="Regimen de afiliacion a salud"
                            v-model="model.regimen"/>

                    <lookup :items="epses" label="EPS" v-model="model.eps"></lookup>

                    <lookup :items="cajasCompensacion" label="Caja de compensacion" v-model="model.cajaCompensacion"
                            :disabled="subsidiado"/>

                    <lookup :items="pensiones" label="Fondo de Pension" v-model="model.fondoPension"
                            :disabled="subsidiado"/>
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="blue" @click="guarda()">Guardar</v-btn>
                    <v-btn flat color="red" exact
                           :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-tab-item>

        <v-tab key="2">
            Tipo de Servicios
        </v-tab>

        <v-tab-item key="2">
            <v-data-table
                    hide-actions
                    :items="servicios"
                    :headers="headers">
                <template slot="items" slot-scope="props">
                    <td class="lookup__id">{{props.item.atencionTipo.id}}</td>
                    <td class="lookup__nombre">
                        {{props.item.atencionTipo.nombre}}
                    </td>
                    <td class="lookup__monto">
                        <template v-if="props.item.frecuencia">
                            {{props.item.frecuencia.cantidad}} /
                            {{props.item.frecuencia.frecuencia.nombre}}
                        </template>
                        <template v-else>Ninguna</template>
                    </td>
                    <td class="justify-center layout px-0 lookup__actions">
                        <v-btn icon class="mx-0" @click="editItem(props.item)">
                            <v-icon color="teal">edit</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="deleteItem(props.item)" :disabled="!props.item.frecuencia">
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
                                            <v-text-field label="Cantidad" v-model="editedItem.frecuencia.cantidad"
                                                          maxlength="2" mask="##"
                                                          required></v-text-field>
                                        </v-flex>

                                        <v-flex xs12>
                                            <lookup :items="frecuencias" required label="Periodo"
                                                    v-model="editedItem.frecuencia.frecuencia"></lookup>
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
        </v-tab-item>
    </v-tabs>
</template>

<script>
  import lookupService from '~/services/lookup'
  import evaluacionService from '~/services/evaluacion'

  export default {
    name: 'seguridad-social',

    async asyncData ({params}) {
      const regimenes = await lookupService.regimenes()
      const epses = await lookupService.epses()
      const cajasCompensacion = await lookupService.cajasCompensacion()
      const pensiones = await lookupService.pensiones()
      const atencionTiposList = await lookupService.atencionTipos()
      const frecuencias = await lookupService.frecuencias()
      const evaluacionAtenciones = await evaluacionService.evaluacionAtenciones(params.evaluacion)
      const model = await evaluacionService.readEvaluacionSalud(params.evaluacion)

      return {
        epses,
        regimenes,
        cajasCompensacion,
        pensiones,
        frecuencias,
        atencionTiposList,
        evaluacionAtenciones,
        model
      }
    },

    data () {
      return {
        activeTab: '0',

        headers: [
          {text: 'ID', value: 'servicio.id'},
          {text: 'Tipo de Servicio', value: 'servicio.nombre'},
          {text: 'Asistencia', value: 'frecuencia.cantidad', sortable: false},
          {text: 'Actions', value: 'name', sortable: false}
        ],

        model: {
          regimen: null,
          cajaCompensacion: null,
          eps: null,
          fondoPension: null
        },

        dialog: false,

        editedIndex: -1,

        editedItem: {
          frecuencia: {
            numero: 0,
            frecuencia: null
          }
        },

        defaultItem: {
          atencionTipo: {},
          frecuencia: {
            numero: 0,
            frecuencia: null
          }
        },

        formTitle: ''
      }
    },

    computed: {
      servicios () {
        return this.atencionTiposList.map(atencionTipo => {
          return {
            atencionTipo,
            frecuencia: this.evaluacionAtenciones.find(item => item.atencionTipo.id === atencionTipo.id)
          }
        })
      },

      subsidiado () {
        return this.model.regimen === null || this.model.regimen.id === 1
      }
    },

    methods: {
      async guarda () {
        if (this.model.regimen.id === 1) {
          this.model.cajaCompensacion = null
          this.model.fondoPension = null
        }

        if (this.model.id === -1) {
          this.model = await evaluacionService
            .agregarEvaluacionSalud(this.$route.params.evaluacion, this.model)
        } else {
          evaluacionService.guardaEvaluacionSalud(this.model)
        }
      },

      editItem ({atencionTipo, frecuencia}) {
        this.dialog = true
        this.editedItem = {
          atencionTipo,
          frecuencia: frecuencia ? {...frecuencia} : {id: -1, cantidad: 0, frecuencia: null}
        }
        this.editedIndex = frecuencia ? frecuencia.id : -1
        this.formTitle = atencionTipo.nombre
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      async deleteItem ({frecuencia}) {
        if (confirm('Seguro que quieres borrar la atención?')) {
          const result = await evaluacionService.borraAtencion(frecuencia)

          const index = this.evaluacionAtenciones.findIndex(item => item.atencionTipo.id === result.atencionTipo.id)

          this.evaluacionAtenciones.splice(index, 1)
        }
      },

      async save () {
        const {frecuencia, atencionTipo} = this.editedItem
        let result

        if (this.editedIndex > -1) {
          result = await evaluacionService
            .guardaAtencion({
              id: this.editedIndex,
              cantidad: this.editedItem.frecuencia.cantidad,
              frecuencia: frecuencia.frecuencia.self ? frecuencia.frecuencia.self.href : undefined
            })
        } else {
          result = await evaluacionService
            .agregaAtencion(this.$route.params.evaluacion, {
              atencionTipo: atencionTipo.self.href,
              cantidad: this.editedItem.frecuencia.cantidad,
              frecuencia: frecuencia.frecuencia.self ? frecuencia.frecuencia.self.href : undefined
            })
        }

        const index = this.evaluacionAtenciones.findIndex(item => item.atencionTipo.id === result.atencionTipo.id)

        if (index === -1) {
          // Agregar
          this.evaluacionAtenciones.push(result)
        } else {
          Object.assign(this.evaluacionAtenciones[index], result)
        }

        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
