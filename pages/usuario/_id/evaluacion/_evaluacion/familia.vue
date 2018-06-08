<template>
    <v-container fluid grid-list-md>
        <v-tabs v-model="activeTab">
            <v-tab key="1">
                Familia
            </v-tab>

            <v-tab-item key="1">
                <v-card flat>
                    <v-card-text>
                        <lookup label="Estado Civil" :items="estadosCiviles" v-model="modelo.estadoCivil"
                                required></lookup>

                        <lookup :items="familiaTipos" required
                                label="Tipo de Familia" v-model="modelo.familiaTipo"></lookup>
                        <v-text-field label="Calidad de las Relaciones Familiares" v-model="modelo.calidadRelaciones"
                                      maxlength="255" required></v-text-field>
                        <h3>Información del Padre</h3>

                        <identificacion v-model="padreIdentificacion" :tipos="documentoTipos"></identificacion>

                        <v-text-field label="Nombre del Padre" v-model="modelo.padreNombre"
                                      maxlength="100"></v-text-field>

                        <h3>Información de la Madre</h3>

                        <identificacion v-model="madreIdentificacion" :tipos="documentoTipos"></identificacion>

                        <v-text-field label="Nombre de la Madre" v-model="modelo.madreNombre"
                                      maxlength="100"></v-text-field>
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab key="2">
                Actitud Familiar
            </v-tab>

            <v-tab-item key="2">
                <v-card flat>
                    <v-card-text>
                        <v-switch label="La familia es conciente de las limitaciones del usuario?"
                                  v-model="modelo.actitud1"></v-switch>
                        <v-switch label="La familia ayuda en las necesidades generales del usuario?"
                                  v-model="modelo.actitud2"></v-switch>
                        <v-switch label="La failia es realmente conciente del grado de discapacidad del usuario"
                                  v-model="modelo.actitud3"></v-switch>
                        <v-switch
                                label="La familia es conciente del impacto e importancia de la institucion para el proceso del usuario?"
                                v-model="modelo.actitud4"></v-switch>
                        <v-switch
                                label="La familia es conciente del impacto e importancia de cada programa dela institucion para el proceso del usuario?"
                                v-model="modelo.actitud5"></v-switch>
                        <v-switch label="La familia asiste a las actividades programadas por la institucion para ellos?"
                                  v-model="modelo.actitud6"></v-switch>

                        <v-text-field label="Actividades familiares recreativas" multi-line
                                      v-model="modelo.actividadesRecreativas"></v-text-field>
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab key="3">
                Otros Familiares
            </v-tab>

            <v-tab-item key="3">
                <v-card flat>
                    <v-card-text>
                        <v-data-table :headers="headers"
                                      :items="familiares"
                                      hide-actions
                                      class="elevation-1">

                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.parentesco.nombre }}</td>
                                <td>{{ props.item.nombre }}</td>
                                <td class="justify-center">{{ props.item.responsabilidad.nombre }}</td>
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
                                <em>No hay familiares en el sistema</em>
                            </template>

                        </v-data-table>

                        <v-dialog v-model="dialog" max-width="500px">
                            <v-btn color="primary" flat slot="activator" class="mb-2" :disabled="modelo.id === -1">
                                Agregar
                            </v-btn>

                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12>
                                                <form @submit="checkForm">
                                                    <v-flex xs12>
                                                        <lookup :items="parentescos" required label="Parentesco"
                                                                v-model="editedItem.parentesco"></lookup>
                                                    </v-flex>

                                                    <v-flex xs12>
                                                        <v-text-field label="Nombre" v-model="editedItem.nombre"
                                                                      maxlength="100"
                                                                      required></v-text-field>
                                                    </v-flex>

                                                    <v-flex xs12>
                                                        <lookup :items="responsabilidades" required
                                                                label="Responsabilidad"
                                                                v-model="editedItem.responsabilidad"></lookup>
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
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>

        <v-card flat>
            <v-card-actions>
                <v-btn flat @click="guarda()" color="blue">Guardar</v-btn>
                <v-btn flat color="red" exact
                       :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
  import lookupService from '~/services/lookup'
  import usuarioService from '~/services/usuario'
  import familiaService from '~/services/familia'
  import identificacion from '~/components/identificacion'
  import lookup from '~/components/lookup'

  export default {
    name: 'familiar',

    components: {
      identificacion,
      lookup
    },

    async asyncData ({params}) {
      const modelo = await usuarioService.evaluacionFamilia(params.evaluacion)
      const documentoTipos = await lookupService.documentoTipos()
      const familiaTipos = await lookupService.familiaTipos()
      const parentescos = await lookupService.parentescos()
      const responsabilidades = await lookupService.responsabilidades()
      const familiares = modelo.id === -1 ? [] : await familiaService.familiares(params.id)
      const estadosCiviles = await lookupService.estadosCiviles()

      return {
        familiaTipos,
        documentoTipos,
        parentescos,
        responsabilidades,
        modelo,
        familiares,
        estadosCiviles
      }
    },

    data () {
      return {
        activeTab: '0',

        model: {
          familiaTipo: null,
          calidadRelaciones: '',
          padreIdentificacion: {
            tipoId: null,
            numero: ''
          },
          padreNombre: '',
          madreIdentificacion: {
            tipoId: null,
            numero: ''
          },
          madreNombre: ''
        },

        dialog: false,

        items: [],

        editedIndex: -1,

        editedItem: {
          nombre: '',
          parentesco: {
            id: null,
            nombre: ''
          },
          responsabilidad: {
            id: null,
            nombre: ''
          }
        },

        defaultItem: {
          nombre: '',
          parentesco: {
            id: null,
            nombre: ''
          },
          responsabilidad: {
            id: null,
            nombre: ''
          }
        },

        headers: [
          {text: 'Parentesco', value: 'parentesco'},
          {text: 'Nombre', value: 'nombre'},
          {text: 'Responsabilidad', value: 'responsabilidad'},
          {text: 'Actions', value: 'name', sortable: false}
        ]
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

      padreIdentificacion: {
        get () {
          return {
            tipoId: this.modelo.padreDocumento,
            numero: this.modelo.padreIdentificacion
          }
        },

        set (newValue) {
          this.modelo.padreDocumento = newValue.tipoId
          this.modelo.padreIdentificacion = newValue.numero
        }
      },

      madreIdentificacion: {
        get () {
          return {
            tipoId: this.modelo.madreDocumento,
            numero: this.modelo.madreIdentificacion
          }
        },

        set (newValue) {
          this.modelo.madreDocumento = newValue.tipoId
          this.modelo.madreIdentificacion = newValue.numero
        }
      }
    },

    methods: {
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      async save () {
        if (this.editedIndex > -1) {
          const index = this.familiares.findIndex(item => item.id === this.editedIndex)
          Object.assign(this.familiares[index], this.editedItem)

          familiaService
            .guardaMiembro(this.editedItem)
        } else {
          this.familiares
            .push(await familiaService
              .agrega(this.$route.params.id, {
                nombre: this.editedItem.nombre,
                parentesco: this.editedItem.parentesco.self.href,
                responsabilidad: this.editedItem.responsabilidad.self.href
              }))
        }

        this.close()
      },

      async guarda () {
        const result = await familiaService.guardaFamilia(this.modelo)

        console.log(result)
      },

      editItem (props) {
        this.dialog = true
        this.editedItem = {...props}
        this.editedIndex = props.id
      },

      initialize () {

      },

      checkForm (e) {

      }
    }
  }
</script>
