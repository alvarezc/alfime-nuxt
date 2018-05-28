<template>
    <v-card>
        <form id="elFormulario">
            <v-card-text>
                <component :is="getFieldType(item)" :disabled="isDisabled(item.disabled)" :required="item.requerido"
                           v-for="item in schema" :label="item.etiqueta" :key="getKey(item)"
                           :schema="item" :value="getValue(item)" :options="item.opciones || {}"
                           @input="setValue" :name="`${item.tipo}${item.id}`"></component>
            </v-card-text>

            <a-actions :to="to" @guarda="() => $emit('guarda', this.value)" @cerrar="() => $emit('cerrar')"></a-actions>
        </form>
    </v-card>
</template>

<script>
  import { get as objGet, set as objSet, debounce, isFunction } from 'lodash'

  export default {
    name: 'AFormulario',

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
      }
    }
  }
</script>
