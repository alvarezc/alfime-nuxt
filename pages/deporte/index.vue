<template>
    <a-seccion titulo="Deportes" :templates="templates" :seccion="2"/>
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
