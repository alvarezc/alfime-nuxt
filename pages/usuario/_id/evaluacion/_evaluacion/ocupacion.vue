<template>
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

                <v-card-actions>
                    <v-btn @click="guarda()" color="blue" flat>Guardar</v-btn>
                    <v-btn :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`" exact flat
                           color="red">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-tab-item>

        <v-tab ripple key="2">
            Aspecto Laboral
        </v-tab>

        <v-tab-item key="2">
            <v-card flat>
                <v-card-text>
                    <v-text-field label="Tareas que ha desempeñado" v-model="modelo.tareas" multi-line></v-text-field>

                    <v-text-field label="Expectativas laborales" v-model="modelo.expectativas" multi-line></v-text-field>

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

                <v-card-actions>
                    <v-btn @click="guarda()" color="blue" flat>Guardar</v-btn>
                    <v-btn :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`" exact flat
                           color="red">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-tab-item>
    </v-tabs>
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
