<template>
    <a-evaluacion v-model="datos" @click="guarda()"></a-evaluacion>
</template>

<script>
  import evaluacionService from '~/services/evaluacion'

  export default {
    name: 'agregar',

    async asyncData ({params}) {
      const datos = await evaluacionService.empty(params.id)

      return {
        datos
      }
    },

    data () {
      return {
        title: 'Evaluación'
      }
    },

    methods: {
      async guarda () {
        const {usuario, ...evaluacion} = this.datos

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
