<template>
    <v-card>
        <v-card-title primary-title>
            <div class="headline">Evaluación</div>
        </v-card-title>

        <v-card-text v-if="evaluacion.id !== -1">
            <v-layout column>
                <h4>Usuario</h4>
                <usuario :usuario="evaluacion.usuario"></usuario>
            </v-layout>

            <v-layout column>
                <h4>Programas que Aspira Ingresar</h4>
                <v-list>
                    <v-list-tile v-for="aspiracion in evaluacion.aspiracion" :key="aspiracion.id">
                        <p>{{aspiracion.nombre}}</p>
                    </v-list-tile>
                </v-list>
            </v-layout>

            <v-layout column>
                <h4>Remitente</h4>
                <div class="body-1">{{evaluacion.remitente.nombre}}</div>
            </v-layout>

            <v-layout column>
                <h4>Observaciones</h4>
                <div class="body-1">{{evaluacion.observaciones}}</div>
            </v-layout>

            <v-layout column>
                <h4>Conclusiones</h4>
                <div class="body-1">{{evaluacion.conclusiones}}</div>
            </v-layout>

            <v-layout column>
                <h4>Plan de Intervención</h4>
                <v-list>
                    <v-list-tile v-for="aspiracion in evaluacion.plan" :key="aspiracion.id">
                        <v-list-tile-content>{{aspiracion.nombre}}</v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-layout>

            <v-switch label="Aceptado" v-model="evaluacion.aceptado" readonly></v-switch>

            <v-layout column>
                <h4>Evaluador</h4>
                <v-list v-if="evaluacion.evaluador">
                    <v-list-tile>
                        <v-list-tile-content>{{evaluacion.evaluador.nombreCompleto}}</v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-layout>
        </v-card-text>

        <v-card-actions>
            <v-btn flat color="blue" :to="`${parentLink}/editar`">Editar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import lookup from '~/components/lookup'
  import usuario from '~/components/usuario'
  import evaluacionService from '~/services/evaluacion'

  export default {
    name: 'evaluacion',

    components: {
      lookup,
      usuario
    },

    async asyncData ({params}) {
      const evaluacion = await evaluacionService.read(params.evaluacion)

      return {
        evaluacion
      }
    },

    data () {
      return {
        title: 'Evaluación',
        parentLink: `/usuario/${this.$route.params.id}/evaluacion/${this.$route.params.evaluacion}`
      }
    },

    created () {
      if (this.evaluacion.id === -1) {
        this.$route.push(`/usuario/${this.$route.params.id}/evaluacion/agregar`)
      }
    }

  }
</script>

<style scoped>

</style>
