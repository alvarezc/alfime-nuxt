<template>
    <v-container>
        <v-layout>
            {{usuario.nombre}} {{usuario.segundoNombre}} {{usuario.apellidoPaterno}} {{usuario.apellidoMaterno}}
        </v-layout>
        <v-layout>
            {{usuario.tipoDocumento.tipo}} {{usuario.documento}}
        </v-layout>
        <v-layout>
            {{usuario.genero.genero}} {{usuario.nacimiento}}
        </v-layout>
        <v-layout>
            {{usuario.ciudad.ciudad}}, {{usuario.ciudad.departamento.departamento}}
        </v-layout>
        {{stateUsuario}}
        <v-layout>
            <v-btn router
                   :to="`/usuario/${$route.params.id}/evaluacion/${evaluacionId ? evaluacionId : 'agregar'}`">
                Evaluacion
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
  import usuarioServicio from '~/services/usuario'
  import moment from 'moment'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'index',

    async asyncData ({params}) {
      const usuario = await usuarioServicio.read(params.id)
      const evaluacionId = await usuarioServicio.evaluacionId(params.id)

      return {
        usuario: {...usuario, nacimiento: moment(usuario.nacimiento).format('YYYY-MM-DD')},
        evaluacionId
      }
    },

    computed: {
      ...mapState({
        stateUsuario: 'usuario'
      })
    },

    methods: {
      ...mapMutations({
        updateUsuario: 'alfime/updateUsuario',
        updateEvaluacion: 'alfime/updateEvaluacion'
      })
    },

    created () {
      this.updateEvaluacion({id: this.evaluacionId})
    }
  }
</script>

<style scoped>

</style>
