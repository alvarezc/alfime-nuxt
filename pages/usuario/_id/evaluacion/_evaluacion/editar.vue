<template>
    <a-evaluacion v-model="modelo" @click="guardar()"></a-evaluacion>
</template>

<script>
  import evaluacionService from '~/services/evaluacion'

  export default {
    name: 'editar',

    async asyncData ({params}) {
      const modelo = await evaluacionService.read(params.evaluacion)

      return {
        modelo
      }
    },

    methods: {
      async guardar () {
        evaluacionService.guarda(this.modelo)

        this.$router.push(`/usuario/${this.$route.params.id}/evaluacion/${this.modelo.id}`)
      }
    }
  }
</script>
