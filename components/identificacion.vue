<template>
    <v-layout row wrap>
        <v-flex class="mr-1" xs12 sm5 md4 lg3>
            <v-select label="Tipo de Documento"
                      :items="tipos" autocomplete
                      item-text="tipo" item-value="id"
                      v-model="tipoId"></v-select>
        </v-flex>

        <v-flex>
            <v-text-field label="Número de Identificación"
                          v-model="numero"></v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
  import lookup from '~/services/lookup'

  export default {
    name: 'identificacion',

    props: ['value', 'tipos'],

    async asyncData () {
      const documentoTipos = await lookup.documentoTipos()

      return {
        documentoTipos
      }
    },

    computed: {
      tipoId: {
        get () {
          return this.value.tipoId
        },

        set (newValue) {
          this.$emit('input', {
            tipoId: newValue,
            numero: this.value.numero
          })
        }
      },

      numero: {
        get () {
          return this.value.numero
        },

        set (newValue) {
          this.$emit('input', {
            tipoId: this.value.tipoId,
            numero: newValue
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
