<template>
    <v-container>
        Ahora a poner los lookups
        <ul>
            <li>
                <nuxt-link :to="`/admin/${item.id}`" v-for="(item, i) in lookups">{{item.label}}</nuxt-link>
            </li>
        </ul>
    </v-container>
</template>

<script>
  export default {
    name: 'index',

    data () {
      return {
        lookups: [
          {id: 'actividadesEconomicas', label: 'Actividades Económicas'},
          {id: 'discapacidades', label: 'Discapacidades'},
          {id: 'documentoTipos', label: 'Tipo de Documentos'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
