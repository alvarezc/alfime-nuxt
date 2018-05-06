<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex>
                <v-card>
                    <v-card-title primary-title="">
                        <div class="headline">Contacto</div>
                    </v-card-title>

                    <v-card-text>

                        <v-text-field label="Dirección" multi-line v-bind:aria-modal="modelo"><</v-text-field>

                        <lookup :items="barrios" required
                                label="Barrio" v-model="modelo.barrios"></lookup>

                        <v-text-field label="Teléfono 1" multi-line v-bind:aria-modal="modelo"><</v-text-field>

                        <v-text-field label="Teléfono 2" multi-line v-bind:aria-modal="modelo"><</v-text-field>

                        <v-text-field label="Dirección de correo electrónico" multi-line
                                      v-bind:aria-modal="modelo"></v-text-field>

                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import lookupService from '~/services/lookup'

  export default {
    name: 'contacto',
    async asyncData () {
      const barrios = await lookupService.barrios()
      return {
        modelo: {},
        barrios
      }
    }
  }
</script>

<style scoped>

</style>
