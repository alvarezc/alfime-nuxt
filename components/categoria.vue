<template>
    <v-card class="categoria">
        <v-card-title>
            <div class="headline" style="text-transform: capitalize">{{categoria.nombre}}</div>
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
                                    <lookup :items="calificadores" label="Calificador" required
                                            v-model="editedItem.calificador"/>
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

        <v-data-table :items="categoria.categorias" :headers="headers" item-key="id"
                      hide-actions>
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{props.item.id}}</td>
                    <td class="categoria__name">{{props.item.nombre}}</td>
                    <td class="categoria__count text-xs-right">{{props.item.count}}</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table :items="props.item.items" class="child" hide-actions hide-headers>
                    <template slot="items" slot-scope="props">
                        <td class="item__name">{{props.item.nombre}}</td>

                        <td class="item__calificador text-xs-right">
                            <template v-if="props.item.usuarioItem.calificador">
                                <em>{{props.item.usuarioItem.calificador.nombre}}</em>
                            </template>
                        </td>

                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="editItem(props.item.usuarioItem)">
                                <v-icon color="teal">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="deleteItem(props.item.usuarioItem)"
                                   :disabled="props.item.usuarioItem.id === -1">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
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
  import cifService from '~/services/cif'

  export default {
    name: 'aCategoria',

    props: {
      id: {
        type: String
      },

      barreras: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        categoria: {},

        calificadores: [],

        formTitle: null,

        dialog: false,

        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nombre', value: 'nombre'},
          {text: 'Existentes', value: 'count'}
        ],

        defaultItem: {
          id: -1,
          calificador: null,
          parentId: null
        },

        editedItem: {
          id: -1,
          calificador: null,
          parentId: null
        }
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const categoria = await cifService.categoria(this.id)

        this.categoria = {
          ...categoria,
          categorias: await Promise.all(categoria
            .categorias
            .map(async categoria => {
              const usuarioItems = await this.items(categoria.id)

              return {
                ...categoria,
                count: (usuarioItems && usuarioItems.length) || null,
                items: [
                  ...categoria.items
                    .map(item => {
                      const temp = usuarioItems.find(usuarioItem => usuarioItem.item.id === item.id) ||
                        {id: -1, item: {...item}, calificador: null}

                      temp.parentId = categoria.id

                      return {
                        ...item,
                        usuarioItem: temp
                      }
                    })
                ]
              }
            }))
        }

        this.calificadores = this.barreras ? await cifService.barreras() : await cifService.calificadores()
      },

      async items (componenteId) {
        return cifService.usuarioItems(this.$route.params.id, componenteId)
      },

      editItem ({parentId, id, item, calificador}) {
        this.dialog = true
        this.editedItem = {
          parentId,
          calificador,
          id,
          item
        }
        this.editedIndex = id
        this.formTitle = item.nombre
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      async deleteItem ({id}) {
        if (confirm('Seguro que quieres borrar el calificador?')) {
          await cifService.borraItem(id)

          this.initialize()
        }
      },

      async save () {
        // this.editedItem = {
        //   parentId,
        //   calificador,
        //   id,
        //   item
        // }

        const {parentId, calificador, item} = this.editedItem
        let result

        console.log(parentId)

        if (this.editedIndex > -1) {
          // result = await cifService
          //   .guardaItem({
          //     id: this.editedIndex,
          //     congenita: valor.congenita,
          //     adquisicion: valor.adquisicion
          //   })
          result = await cifService
            .guardaItem(this.editedIndex, calificador)
        } else {
          result = await cifService
            .agregaItem(this.$route.params.id, item.id, calificador)
        }

        // const categoria = this.categoria.categorias.find(categoria => categoria.id === parentId)
        // const categoriaItem = categoria.items.find(item => item.id === result.item.id)
        //
        console.log(result)
        // console.log(categoria)
        // console.log(categoriaItem)
        //
        // categoriaItem.usuarioItem.id = result.id
        // categoriaItem.usuarioItem.calificador = result.calificador

        this.close()

        this.initialize()
      }
    }
  }
</script>

<style>
    .categoria table.table tbody td.categoria__name {
        font-weight: bold;
    }

    .categoria__name,
    .item__name {
        width: 100%;
    }

    .item__calificador {
        white-space: nowrap;
    }
</style>
