<template>
    <v-container>
        <v-tabs v-model="activeTab">
            <v-tab ripple key="1">
                Ocupacion
            </v-tab>

            <v-tab-item key="1">
                <v-card flat>
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
                </v-card>
            </v-tab-item>

            <v-tab key="2">
                Ingresos
            </v-tab>

            <v-tab-item>
                <a-ingresos :evaluacionId="$route.params.evaluacionId"></a-ingresos>
            </v-tab-item>

            <v-tab ripple key="3">
                Aspecto Laboral
            </v-tab>

            <v-tab-item key="3">
                <v-card flat>
                    <v-card-text>
                        <v-text-field label="Tareas que ha desempeñado" v-model="modelo.tareas"
                                      multi-line></v-text-field>

                        <v-text-field label="Expectativas laborales" v-model="modelo.expectativas"
                                      multi-line></v-text-field>

                        <v-checkbox label="Ha soñado con vivir solo"
                                    v-model="modelo.actitud1"></v-checkbox>

                        <v-checkbox label="Ha soñado terminar una carrera universitaria"
                                    v-model="modelo.actitud2"></v-checkbox>

                        <v-checkbox label="Ha soñado con tener su propio trabajo o ser independiente"
                                    v-model="modelo.actitud3"></v-checkbox>

                        <v-checkbox label="Ha soñado con tener su propio negocio"
                                    v-model="modelo.actitud4"></v-checkbox>

                        <v-text-field label="Que ha soñado hacer y ha sido impedido por la discapacidad"
                                      v-model="modelo.aspiraciones" multi-line></v-text-field>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
        <v-card-actions>
            <a-actions :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`" @guarda="guarda"/>
        </v-card-actions>
    </v-container>
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

    data () {
      return {
        activeTab: '0'
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
