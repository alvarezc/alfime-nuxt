<template>
    <v-container>
        <usuario :usuario="evaluacion.usuario"></usuario>

        <lookup :items="programas" chips multiple label="Programas que Aspira Ingresar"
                v-model="evaluacion.aspiracion"></lookup>

        <lookup :items="remitentes" label="Remitente" v-model="evaluacion.remitente"></lookup>

        <v-text-field label="Observaciones" multi-line v-model="evaluacion.observaciones"></v-text-field>

        <v-text-field label="Conclusiones" multi-line v-model="evaluacion.conclusiones"></v-text-field>

        <lookup :items="programas" chips multiple v-model="evaluacion.plan"
                label="Plan de Intervención"></lookup>

        <v-switch label="Aceptado" v-model="evaluacion.aceptado"></v-switch>

        <lookup :items="evaluadores" v-model="evaluacion.evaluador" label="Evaluador"></lookup>

        <v-btn @click="guarda()">Guardar</v-btn>
    </v-container>
</template>

<script>
  import lookup from '~/components/lookup'
  import usuario from '~/components/usuario'
  import lookupService from '~/services/lookup'
  import usuarioService from '~/services/usuario'
  import evaluacionService from '~/services/evaluacion'

  export default {
    name: 'evaluacion',

    components: {
      lookup,
      usuario
    },

    async asyncData ({params}) {
      const programas = await lookupService.programas()
      const remitentes = await lookupService.remitentes()
      const evaluadores = await lookupService.evaluadores()
      const evaluacion = await usuarioService.evaluacion(params.id)

      return {
        programas,
        remitentes,
        evaluacion,
        evaluadores
      }
    },

    data () {
      return {
        title: 'Evaluación'
      }
    },

    methods: {
      async guarda () {
        const {usuario, ...evaluacion} = this.evaluacion

        await evaluacionService
          .guarda({
            id: evaluacion.id,
            self: evaluacion.self,
            usuario: (usuario.self || usuario._links.self).href,
            aspiracion: evaluacion.aspiracion.map(item => (item.self || item._links.self).href),
            plan: evaluacion.plan.map(item => (item.self || item._links.self).href),
            remitente: (evaluacion.remitente.self || evaluacion.remitente._links.self).href,
            observaciones: evaluacion.observaciones,
            conclusiones: evaluacion.conclusiones,
            aceptado: evaluacion.aceptado,
            evaluador: (evaluacion.evaluador.self || evaluacion.evaluador._links.self).href,
            fecha: evaluacion.fecha
          })

        this.$nuxt.$router.push(`/usuario/${this.$route.params.id}`)
      }
    }
  }
</script>

<style scoped>

</style>
