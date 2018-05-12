<template>
    <v-app>
        <v-navigation-drawer
                :mini-variant.sync="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                fixed
                app>
            <v-list>
                <template v-for="item in items">
                    <v-divider v-if="item.icon && item.id !== 1"></v-divider>
                    <template v-if="item.subItems">
                        <v-list-group :prepend-icon="item.icon" :value="false"
                                      :disabled="item.disabled">
                            <v-list-tile slot="activator">
                                <v-list-tile-title>{{item.title}}</v-list-tile-title>
                            </v-list-tile>
                            <template v-for="subItem in item.subItems">
                                <v-list-tile
                                        router
                                        :to="subItem.to"
                                        :key="subItem.id"
                                        :exact="subItem.exact">
                                    <v-list-tile-action>
                                        <v-icon v-html="subItem.icon" v-if="subItem.icon"></v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="subItem.title"></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list-group>
                    </template>
                    <template v-else>
                        <v-list-tile
                                router
                                :to="item.to"
                                :key="item.id"
                                :exact="item.exact"
                                :disabled="item.disabled">
                            <v-list-tile-action>
                                <v-icon v-html="item.icon" v-if="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </template>
                <v-divider></v-divider>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="clipped">
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn
                    icon
                    @click.stop="miniVariant = !miniVariant"
            >
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-btn
                    icon
                    @click.stop="clipped = !clipped"
            >
                <v-icon>web</v-icon>
            </v-btn>
            <v-btn
                    icon
                    @click.stop="fixed = !fixed"
            >
                <v-icon>remove</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field label="Identificación..." hide-details v-model="cedula" single-line append-icon="search"
                          :append-icon-cb="search"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
                    icon
                    @click.stop="rightDrawer = !rightDrawer">
                <v-icon>menu</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-navigation-drawer
                temporary
                :right="right"
                v-model="rightDrawer"
                fixed>
            <v-list>
                <v-list-tile @click.native="right = !right">
                    <v-list-tile-action>
                        <v-icon light>compare_arrows</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017-2018 Yuliana Castaño Isaza</span>
        </v-footer>
    </v-app>
</template>

<script>
  import usuarioService from '~/services/usuario'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ALFIME',
        cedula: ''
      }
    },

    methods: {
      async search () {
        const usuario = await usuarioService.find(this.cedula)

        this.$nuxt.$router.push(`/usuario/${usuario.id}`)
      }
    },

    computed: {
      ...mapState({
        usuario: state => state.alfime.usuario, // Namespaced property doesn't work
        evaluacion: state => state.alfime.evaluacion, // Namespaced property doesn't work
        items: state => state.alfime.items
      })
    }
  }
</script>
