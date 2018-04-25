<template>
    <v-container>
        <v-text-field label="Rutina Diaria" multi-line v-model="modelo.rutinaDiaria"></v-text-field>

        <v-text-field label="Actividades de tiempo libre" multi-line
                      v-model="modelo.actividadesTiempoLibre"></v-text-field>

        <lookup :items="escolaridades" required
                label="Escolaridad" v-model="modelo.escolaridad"></lookup>

        <lookup :items="ocupaciones" required
                label="Ocupación" v-model="modelo.ocupacion"></lookup>

        <lookup :items="actividadesEconomicas" required
                label="Actividad Económica" v-model="modelo.actividadEconomica"></lookup>

        <v-text-field label="Empresa" v-model="modelo.empresa" maxlength="100"></v-text-field>

        <v-text-field label="Teléfono" v-model="modelo.telefono" maxlength="20"></v-text-field>

        <v-layout>
            <v-btn @click="guarda()" style="margin-bottom: 30px" class="primary" dark>Guardar</v-btn>
        </v-layout>

        {{modelo}}
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
      const actividadesEconomicas = await lookupService.actividadesEconomicas()

      return {
        modelo,
        escolaridades,
        ocupaciones,
        actividadesEconomicas
      }
    },

    methods: {
      async guarda () {
        const result = await ocupacionService.guardaOcupacion(this.modelo)

        this.modelo = result
        console.log(result)
      }
    }
  }
</script>

<style scoped>

</style>
