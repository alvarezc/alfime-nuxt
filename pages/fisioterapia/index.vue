<template>
    <a-seccion titulo="Fisioterapia" :templates="templates" :seccion="3"/>
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
