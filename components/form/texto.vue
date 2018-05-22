<template>
    <v-text-field :label="label" :required="required" :disabled="disabled" :counter="options.max"
                  :rules="rules" :mask="options.mask" :multi-line="options.multi"
                  :value="internalValue" @input="update"></v-text-field>
</template>

<script>
  import base from './base'

  export default {
    name: 'AFormTexto',

    mixins: [base],

    computed: {
      rules () {
        const result = []

        if (this.options.rules) {
          result.push(this.options.rules)
        }

        if (this.options.max) {
          result.push((v) => !v || v.length <= this.options.max ||
            `Campo solo puede tener ${this.options.max} caracteres`)
        }

        if (this.options.min) {
          result.push((v) => (v && v.length >= this.options.min) ||
            `Campo debe tener al menos ${this.options.min} caracteres`)
        }

        return result
      }
    }
  }
</script>
