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
      items () {
        const subItems = []
        const alfime = this.$store.state.alfime
        const usuario = alfime.usuario
        const evaluacion = alfime.evaluacion

        if (usuario && evaluacion) {
          subItems.push(
            {id: 41, title: 'Familia', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/familia`},
            {id: 42, title: 'Ocupacion', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/ocupacion`},
            {id: 43, title: 'Ingresos', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/ingresos`},
            {id: 44, title: 'Securidad Social', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/seguridad-social`},
            {id: 45, title: 'Aspecto Laboral', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/aspecto-laboral`},
            {id: 46, title: 'Aspecto Psicologico', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/aspecto-psicologico`},
            {id: 47, title: 'Contacto', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/contacto`},
            {id: 48, title: 'Aspecto Médico', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/medico`}
          )
        }

        return [
          {id: 1, icon: 'apps', title: 'Bienvenidos', to: '/', exact: true},
          {id: 3, icon: 'perm_identity', title: 'Usuario', to: '/usuario', exact: true},
          {
            id: 4,
            icon: 'assignment',
            title: 'Evaluacion',
            to: `/usuario/${usuario && usuario.id}/evaluacion/${evaluacion && evaluacion.id}`,
            disabled: !evaluacion,
            exact: false
          },
          ...subItems,
          {id: 5, icon: 'widgets', title: 'Administración', to: '/admin', exact: true},
          {id: 6, icon: 'widgets', title: 'Aula Pedagogica', to: '/aula', exact: true},
          {id: 7, icon: 'widgets', title: 'Deportes', to: '/deporte', exact: true},
          {id: 8, icon: 'widgets', title: 'Fisioterapia', to: '/fisioterapia', exact: true},
          {id: 8, icon: 'widgets', title: 'Psicologia', to: '/psicologia', exact: true}
        ]
      },
      ...mapState({
        usuario: state => state.alfime.usuario // Namespaced property doesn't work
      })
    }
  }
</script>
