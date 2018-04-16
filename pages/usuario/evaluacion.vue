<template>
    <v-container>
        <v-select :items="programas" chips multiple
                  label="Programas que Aspira Ingresar" item-text="nombre" item-value="id"></v-select>

        <v-select :items="remitentes"
                  label="Remitente" item-text="nombre" item-value="id"></v-select>

        <v-text-field label="Observaciones" multi-line></v-text-field>

        <v-text-field label="Conclusiones" multi-line></v-text-field>

        <v-select :items="programas" chips multiple
                  label="Plan de Intervención" item-text="nombre" item-value="id"></v-select>

        <v-select :items="programas"
                  label="Evaluador" item-text="nombre" item-value="id"></v-select>
    </v-container>
</template>

<script>
  import lookup from '~/services/lookup'

  export default {
    name: 'evaluacion',

    async asyncData () {
      const programas = await lookup.programas()
      const remitentes = await lookup.remitentes()

      return {
        programas,
        remitentes
      }
    },

    data () {
      return {
        title: 'Evaluación'
      }
    }
  }
</script>

<style scoped>

</style>
