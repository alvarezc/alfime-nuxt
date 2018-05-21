<template>
    <lookup :label="label" :required="required" :items="options.items" :value="internalValue" @input="update"
            :multiple="options.multiple" :chips="options.chips" :disabled="disabled"/>
</template>

<script>
  import base from './base'

  export default {
    name: 'AFormLookup',

    mixins: [base]
  }
</script>
