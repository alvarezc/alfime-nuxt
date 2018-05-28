<template>
    <a-seccion titulo="Psicología" :templates="templates" :seccion="5"/>
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
