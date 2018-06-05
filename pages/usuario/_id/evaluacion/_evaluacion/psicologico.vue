<template>
    <v-container>
        <v-tabs v-model="activeTab">
            <v-tab ripple key="1">
                Actitud Social
            </v-tab>

            <v-tab-item key="1">
                <v-card flat>
                    <v-card-title>
                        <div class="headline">Aspecto Psicológico</div>
                    </v-card-title>

                    <v-card-text>
                        <v-text-field label="Comportamiento" multi-line v-model="modelo.comportamiento"></v-text-field>

                        <v-text-field label="Estabilidad emocional" multi-line
                                      v-model="modelo.estadoEmocional"></v-text-field>

                        <v-text-field label="Diagnóstico Social" multi-line
                                      v-model="modelo.diagnosticoSocial"></v-text-field>
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab ripple key="2">
                Limitación en la Actividad
            </v-tab>

            <v-tab-item key="2">
                <a-categoria id="3"></a-categoria>
            </v-tab-item>
        </v-tabs>
        <v-card-actions>
            <a-actions @guarda="guarda" :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`"/>
        </v-card-actions>
    </v-container>
</template>

<script>
  import evaluacionService from '~/services/evaluacion'
  import AActions from '../../../../../components/actions'

  export default {
    name: 'aspecto-psicologico',
    components: {AActions},
    async asyncData ({params}) {
      const modelo = await evaluacionService.evaluacionPsicologico(params.evaluacion)

      return {
        modelo
      }
    },

    data () {
      return {
        activeTab: '0'
      }
    },

    methods: {
      async guarda () {
        if (this.modelo.id === -1) {
          this.modelo = await evaluacionService.agregaPsicologico(this.$route.params.evaluacion, this.modelo)
        } else {
          this.modelo = await evaluacionService.guardaPsicologico(this.modelo)
        }
      }
    }
  }
</script>
