<template>
    <v-container>
        <lookup :items="familiaTipos" required
                label="Tipo de Familia" v-model="model.familiaTipo"></lookup>
        <v-text-field label="Calidad de las Relaciones Familiares" v-model="model.calidadRelaciones"
                      maxlength="255" required></v-text-field>
        <h3>Información del Padre</h3>

        <identificacion v-model="model.padreIdentificacion" :tipos="documentoTipos"></identificacion>

        <v-text-field label="Nombre del Padre" v-model="model.padreNombre"
                      maxlength="100"></v-text-field>

        <h3>Información de la Madre</h3>

        <identificacion v-model="model.madreIdentificacion" :tipos="documentoTipos"></identificacion>

        <v-text-field label="Nombre de la Madre" v-model="model.madreNombre"
                      maxlength="100"></v-text-field>

        <v-dialog v-model="dialog" max-width="500px">
            <v-btn color="primary" dark slot="activator" class="mb-2">Agregar</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <lookup :items="parentescos" required label="Parentesco"
                                        v-model="editedItem.parentesco"></lookup>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field label="Nombre" v-model="editedItem.nombre" maxlength="100"
                                              required></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <lookup :items="responsabilidades" required label="Responsabilidad"
                                        v-model="editedItem.responsabilidad"></lookup>
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

        <v-data-table :headers="headers"
                      :items="items"
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
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>

        </v-data-table>

        <v-layout>
            {{model}}
        </v-layout>
    </v-container>
</template>

<script>
  import lookupService from '~/services/lookup'
  import identificacion from '~/components/identificacion'
  import lookup from '~/components/lookup'

  export default {
    name: 'familiar',

    components: {
      identificacion,
      lookup
    },

    async asyncData () {
      const documentoTipos = await lookupService.documentoTipos()
      const familiaTipos = await lookupService.familiaTipos()
      const parentescos = await lookupService.parentescos()
      const responsabilidades = await lookupService.responsabilidades()

      return {
        familiaTipos,
        documentoTipos,
        parentescos,
        responsabilidades
      }
    },

    data () {
      return {
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },

      initialize () {

      }
    }
  }
</script>

<style scoped>

</style>
