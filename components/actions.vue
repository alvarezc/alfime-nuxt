<template>
    <v-container>
        <v-btn @click="guarda" color="blue" flat>Guardar</v-btn>
        <v-btn :to="to" exact flat color="red">Cerrar</v-btn>
    </v-container>
</template>

<script>
  export default {
    name: 'AActions',

    props: ['to'],

    methods: {
      guarda () {
        this.$emit('guarda')
      }
    }
  }
</script>
