<template>
    <calendar :label="label" :required="required" :disabled="disabled"
              :value="internalValue" @input="update"></calendar>
</template>

<script>
  import base from './base'
  import calendar from '~/components/calendar'

  export default {
    name: 'AFormCalendario',

    components: {
      calendar
    },

    mixins: [base]
  }
</script>
