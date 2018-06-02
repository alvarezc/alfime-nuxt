<template>
    <v-card>
        <form id="elFormulario" @submit.prevent="validateBeforeSubmit">
            <v-card-text>
                <template v-for="item in schema">
                    <component :is="getFieldType(item)" :disabled="isDisabled(item.disabled)"
                               :label="item.etiqueta" :key="getKey(item)" :validar="item.validar"
                               :schema="item" :value="getValue(item)" :options="item.opciones || {}"
                               @input="setValue" :name="item.nombre"></component>
                    <span v-show="errors.has(item.nombre)"
                          class="help is-danger">{{ errors.first(item.nombre) }}</span>
                </template>
            </v-card-text>

            <a-actions :to="to" @guarda="validateBeforeSubmit" @cerrar="() => $emit('cerrar')"></a-actions>
        </form>
    </v-card>
</template>

<script>
  import { get as objGet, set as objSet, debounce, isFunction } from 'lodash'

  export default {
    name: 'AFormulario',

    inject: ['$validator'],

    props: ['schema', 'value', 'to'],

    data () {
      return {
        setValue: null
      }
    },

    created () {
      this.setValue = debounce(this.setValueBase, 300)
    },

    methods: {
      getFieldType (item) {
        return `a-form-${item.tipo}`
      },

      getKey (item) {
        return `item${item.id}`
      },

      getValue (item) {
        return objGet(this.value, item.nombre)
      },

      setValueBase (item, value) {
        objSet(this.value, item.nombre, value)
      },

      isDisabled (source) {
        if (isFunction(source)) {
          return source(this.value)
        } else {
          return source
        }
      },

      validateBeforeSubmit () {
        this.$validator.validateAll()
          .then((result) => {
            if (result) {
              // eslint-disable-next-line
              alert('Form Submitted!')
              this.$emit('guarda', this.value)
              return
            }

            alert('Por favor corrige los errores primero')
          })
      }
    }
  }
</script>

<style scoped>
    .is-danger {
        color: #f00
    }

    h3 {
        padding-top: 18px;
    }
</style>
