<template>
    <v-app>
        <v-navigation-drawer
                :mini-variant.sync="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                fixed
                app>
            <v-list>
                <template v-for="item in itemList">
                    <v-divider v-if="item.icon && item.id !== 1"></v-divider>
                    <component :is="item.subItems ? 'nav-sub-item' : 'nav-item'" :item="item"></component>
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
        </v-toolbar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017-2018 Yuliana Castaño Isaza</span>
        </v-footer>
    </v-app>
</template>

<script>
  import usuarioService from '~/services/usuario'
  import { mapGetters, mapMutations } from 'vuex'

  export const items = [
    {id: 1, icon: 'apps', title: 'Bienvenidos', to: '/', exact: true},
    {id: 3, icon: 'perm_identity', title: 'Usuario', to: '/usuario', exact: true},
    {
      id: 4,
      icon: 'assignment',
      title: 'Evaluacion',
      to: '/usuario/evaluacion',
      disabled: true,
      exact: false
    },
    {id: 5, icon: 'widgets', title: 'Administración', to: '/admin', exact: true},
    {id: 6, icon: 'widgets', title: 'Aula Pedagogica', to: '/aula', exact: true},
    {id: 7, icon: 'widgets', title: 'Deportes', to: '/deporte', exact: true},
    {id: 8, icon: 'widgets', title: 'Fisioterapia', to: '/fisioterapia', exact: true},
    {id: 9, icon: 'widgets', title: 'Psicologia', to: '/psicologia', exact: true}
  ]

  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        title: 'ALFIME',
        cedula: ''
      }
    },

    methods: {
      async search () {
        const usuario = await usuarioService.find(this.cedula)

        this.$nuxt.$router.push(`/usuario/${usuario.id}`)
      },

      ...mapMutations({
        updateUsuario: 'alfime/updateUsuario'
      })
    },

    computed: {
      itemList: {
        cache: false,
        get () {
          return items.map(item => {
            const {id, icon, title, to, disabled, exact} = item

            if (item.id === 4) {
              const usuario = this.usuario
              const evaluacion = this.evaluacion

              let result = {
                id,
                icon,
                title,
                to,
                disabled,
                exact
              }

              if (evaluacion) {
                result.disabled = false

                const subItems = [
                  {id: 40, title: 'Inicio', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}`, exact: true},
                  {id: 47, title: 'Contacto', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/contacto`},
                  {id: 41, title: 'Familia', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/familia`},
                  {id: 43, title: 'Vivienda', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/vivienda`},
                  {id: 42, title: 'Ocupacion', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/ocupacion`},
                  {
                    id: 44,
                    title: 'Seguridad Social',
                    to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/seguridad-social`
                  },
                  {id: 48, title: 'Aspecto Médico', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/medico`},
                  {
                    id: 46,
                    title: 'Aspecto Psicológico',
                    to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/aspecto-psicologico`
                  }
                ]

                result.subItems = [...subItems]
              }

              return result
            } else {
              const result = {id, icon, title, to, disabled, exact}

              return result
            }
          })
        }
      },

      ...mapGetters({
        evaluacion: 'alfime/getEvaluacion',
        usuario: 'alfime/getUsuario'
      })
    }
  }
</script>
