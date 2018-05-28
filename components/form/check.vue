<template>
    <v-checkbox :label="label" :required="required" :disabled="disabled"
                v-model="checkValue"></v-checkbox>
</template>

<script>
  import base from './base'

  export default {
    name: 'AFormCheck',

    mixins: [base],

    computed: {
      checkValue: {
        get () {
          return this.internalValue
        },

        set (newValue) {
          this.internalValue = newValue
          this.update(newValue)
        }
      }
    }
  }
</script>
