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
        <v-layout column>
            <v-btn router :to="`/usuario/${$route.params.id}/evaluacion`">Evaluacion</v-btn>
            <v-btn router :to="`/usuario/${$route.params.id}/familiar`">Familiar</v-btn>
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

      console.log(usuario)

      return {
        usuario: {...usuario, nacimiento: moment(usuario.nacimiento).format('YYYY-MM-DD')}
      }
    }
  }
</script>

<style scoped>

</style>
