<template>
    <v-checkbox :label="label" :required="required" :disabled="disabled"
                  :value="internalValue" @input="update"></v-checkbox>
</template>

<script>
  import base from './base'

  export default {
    name: 'AFormCheck',

    mixins: [base]
  }
</script>
