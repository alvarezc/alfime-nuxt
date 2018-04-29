<template>
    <v-card>
        <v-card-title primary-title>
            <div class="headline">Evaluación</div>
        </v-card-title>

        <v-card-text>
            <v-text-field label="Rutina Diaria" multi-line v-model="modelo.rutinaDiaria"></v-text-field>

            <v-text-field label="Actividades de tiempo libre" multi-line
                          v-model="modelo.actividadesTiempoLibre"></v-text-field>

            <lookup :items="escolaridades" required
                    label="Escolaridad" v-model="modelo.escolaridad"></lookup>

            <lookup :items="ocupaciones" required
                    label="Ocupación" v-model="modelo.ocupacion"></lookup>

            <v-text-field required maxlength="100" counter="100"
                          label="Actividad Económica" v-model="modelo.actividadEconomica"></v-text-field>

            <v-text-field label="Empresa" v-model="modelo.empresa" maxlength="100"></v-text-field>

            <v-text-field label="Teléfono" v-model="modelo.telefono" maxlength="20"></v-text-field>

        </v-card-text>

        <v-card-actions>
            <v-btn @click="guarda()" color="blue" flat>Guardar</v-btn>
            <v-btn :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`" flat color="red">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import lookupService from '~/services/lookup'
  import usuarioService from '~/services/usuario'
  import ocupacionService from '~/services/ocupacion'
  import identificacion from '~/components/identificacion'
  import lookup from '~/components/lookup'

  export default {
    name: 'ocupacion',

    components: {
      identificacion,
      lookup
    },

    async asyncData ({params}) {
      const modelo = await usuarioService.evaluacionOcupacion(params.id)
      const escolaridades = await lookupService.escolaridades()
      const ocupaciones = await lookupService.ocupaciones()

      return {
        modelo,
        escolaridades,
        ocupaciones
      }
    },

    methods: {
      async guarda () {
        const result = await ocupacionService.guardaOcupacion(this.modelo)

        this.modelo = result

        this.$router.push(`/usuario/${this.$route.params.id}/evaluacion/${this.modelo.id}`)
      }
    }
  }
</script>

<style scoped>

</style>
