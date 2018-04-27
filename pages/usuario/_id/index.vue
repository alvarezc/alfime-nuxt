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
        <v-layout>
            <v-btn router :to="`/usuario/${$route.params.id}/evaluacion/${evaluacion.id === -1 ? 'agregar' : evaluacion.id}`">Evaluacion</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
  import usuarioServicio from '~/services/usuario'
  import moment from 'moment'

  export default {
    name: 'index',

    async asyncData ({params}) {
      const usuario = await usuarioServicio.read(params.id)
      const evaluacion = await usuarioServicio.evaluacion(params.id)

      console.log(usuario)

      return {
        usuario: {...usuario, nacimiento: moment(usuario.nacimiento).format('YYYY-MM-DD')},
        evaluacion
      }
    }
  }
</script>

<style scoped>

</style>
