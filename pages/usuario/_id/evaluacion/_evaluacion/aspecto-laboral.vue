<template>
    <v-card>
        <v-card-title primary-title>
            <div class="headline">Aspecto Laboral</div>
        </v-card-title>

        <v-card-text>
            <v-text-field label="Tareas que ha desempeñado" multi-line v-model="modelo.experiencias"></v-text-field>

            <v-text-field label="Expectativas laborales" multi-line v-bind:aria-modal="modelo.aspiraciones"><</v-text-field>

            <h3>Actitud del Usuario</h3>

            <v-switch label="Ha soñado con vivir solo"
                      v-model="modelo.actitud7"></v-switch>
            <v-switch label="Ha soñado terminar una carrera universitaria"
                      v-model="modelo.actitud8"></v-switch>
            <v-switch label="Ha soñado con tener su propio trabajo o ser independiente"
                      v-model="modelo.actitud9"></v-switch>
            <v-switch
                    label="Ha soñado con tener su propio negocio"
                    v-model="modelo.actitud10"></v-switch>
            <v-text-field label="Que ha soñado hacer que no ha podido por su discapacidad?" multi-line
                          v-model="modelo.sueños"></v-text-field>

        </v-card-text></v-card>
</template>

<script>
  // import lookupService from '~/services/lookup'

  export default {
    name: 'aspecto-laboral',

    async asyncData ({params}) {
      // const modelo = await evaluacionService.evaluacionAspectoLaboral(params.id)

      return {
        modelo: {}
      }
    }
  }
</script>

<style scoped>

</style>