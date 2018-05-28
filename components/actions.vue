<template>
    <v-container>
        <v-btn @click="guarda" color="blue" flat>Guardar</v-btn>
        <v-btn :to="to" @click="cerrar" exact flat color="red">Cerrar</v-btn>
    </v-container>
</template>

<script>
  export default {
    name: 'AActions',

    props: ['to'],

    methods: {
      guarda () {
        this.$emit('guarda')
      },

      cerrar () {
        this.$emit('cerrar')
      }
    }
  }
</script>
