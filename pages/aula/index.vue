<template>
    <a-seccion titulo="Aula" :templates="templates" :seccion="1"/>
</template>

<script>
  import { plan, informe, seguimiento } from './schemas'

  export default {
    name: 'index',

    data () {
      return {
        templates: {plan, informe, seguimiento}
      }
    }
  }
</script>
