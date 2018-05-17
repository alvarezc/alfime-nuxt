<template>
    <v-container>
        <lookup :items="tipos" v-model="modelo.tipo" label="Tipo de Vivienda"></lookup>

        <v-subheader>Estrato</v-subheader>

        <v-layout row>
            <v-flex xs10 sm11>
                <v-slider :min="1" :max="6" v-model="modelo.estrato" thumb-label></v-slider>
            </v-flex>

            <v-flex xs2 sm1>
                <v-text-field v-model="modelo.estrato" type="number" :max="6" :min="1"></v-text-field>
            </v-flex>
        </v-layout>

        <v-subheader>Dormitorios</v-subheader>

        <v-layout row>
            <v-flex xs10 sm11>
                <v-slider :min="0" :max="10" v-model="modelo.dormitorios" thumb-label></v-slider>
            </v-flex>

            <v-flex xs2 sm1>
                <v-text-field v-model="modelo.dormitorios" type="number" :max="10" :min="0"></v-text-field>
            </v-flex>
        </v-layout>

        <lookup :items="paredes" v-model="modelo.pared" label="Material de las Paredes"></lookup>

        <lookup :items="techos" v-model="modelo.techo" label="Material de los Techos"></lookup>

        <lookup :items="pisos" v-model="modelo.piso" label="Material de los Pisos"></lookup>

        <lookup :items="mobiliarios" chips multiple label="Mobiliario"
                v-model="modelo.mobiliario"></lookup>

        <a-actions :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`"
                   @guarda="guarda"></a-actions>
    </v-container>
</template>

<script>
  import lookupService from '~/services/lookup'
  import evaluacionService from '~/services/evaluacion'

  export default {
    name: 'vivienda',

    async asyncData ({params}) {
      return {
        paredes: await lookupService.viviendaParedes(),
        techos: await lookupService.viviendaTechos(),
        pisos: await lookupService.viviendaPisos(),
        tipos: await lookupService.viviendaTipos(),
        mobiliarios: await lookupService.viviendaMobiliarios(),
        modelo: await evaluacionService.evaluacionVivienda(params.evaluacion)
      }
    },

    methods: {
      async guarda () {
        if (this.modelo.id === -1) {
          this.modelo = await evaluacionService.agregaVivienda(this.$route.params.evaluacion, this.modelo)
        } else {
          this.modelo = await evaluacionService.guardaVivienda(this.modelo)
        }
      }
    }
  }
</script>

<style scoped>

</style>
