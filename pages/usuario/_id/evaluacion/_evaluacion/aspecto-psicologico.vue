<template>
    <v-card>
        <v-card-title primary-title="">
            <div class="headline">Actitud Social</div>
        </v-card-title>

        <v-card-text>
            <lookup :items="religiones" required
                    label="Religión" v-model="modelo.religion"></lookup>

            <lookup :items="estadosCiviles" required
                    label="Estado Civil" v-model="modelo.estadoCivil"></lookup>
            <v-text-field label="Comportamiento" multi-line v-model="modelo.comportamiento"></v-text-field>

            <v-text-field label="Estabilidad emocional" multi-line v-bind:aria-modal="modelo.emocional"><</v-text-field>
            <v-text-field label="Diagnóstico Social" multi-line v-bind:aria-modal="modelo.social"><</v-text-field>

        </v-card-text>
    </v-card>

</template>

<script>
  import lookupService from '~/services/lookup'

  export default {
    name: 'aspecto-psicologico',

    async asyncData () {
      const religiones = await lookupService.religiones()
      const estadosCiviles = await lookupService.estadosCiviles()

      return {
        modelo: {},
        religiones,
        estadosCiviles
      }
    }
  }
</script>

<style scoped>

</style>