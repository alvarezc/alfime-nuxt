<template>
    <v-card>
        <v-card-title primary-title>
            <div class="headline">Evaluación</div>
        </v-card-title>

        <v-card-text>
            <lookup :items="programas" chips multiple label="Programas que Aspira Ingresar"
                    v-model="value.aspiracion"></lookup>

            <lookup :items="remitentes" label="Remitente" v-model="value.remitente"></lookup>

            <v-text-field label="Observaciones" multi-line v-model="value.observaciones"></v-text-field>

            <v-text-field label="Conclusiones" multi-line v-model="value.conclusiones"></v-text-field>

            <lookup :items="programas" chips multiple v-model="value.plan"
                    label="Plan de Intervención"></lookup>

            <v-switch label="Aceptado" v-model="value.aceptado"></v-switch>

            <lookup :items="evaluadores" v-model="value.evaluador" label="Evaluador"></lookup>
        </v-card-text>

        <v-card-actions>
            <v-btn flat @click="guarda()">Guardar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import lookup from './lookup'
  import usuario from './usuario'
  import lookupService from '~/services/lookup'

  export default {
    name: 'aEvaluacion',

    components: {
      lookup,
      usuario
    },

    props: [
      'value'
    ],

    data () {
      return {
        evaluadores: [],
        remitentes: [],
        programas: []
      }
    },

    async mounted () {
      this.evaluadores = await lookupService.evaluadores()
      this.programas = await lookupService.programas()
      this.remitentes = await lookupService.remitentes()
    },

    methods: {
      guarda () {
        this.$emit('input', this.value)
        this.$emit('click')
      }
    }
  }
</script>
