<template>
    <v-container>
        Ahora a poner los lookups
        <ul>
            <li v-for="(item, i) in lookups" :key="item.id">
                <nuxt-link :to="`/admin/${item.id}`">{{item.label}}</nuxt-link>
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
          {id: 'discapacidades', label: 'Discapacidades'},
          {id: 'documentoTipos', label: 'Tipos de Documentos'},
          {id: 'generos', label: 'Géneros'},
          {id: 'barrios', label: 'Barrios'},
          {id: 'frecuencias', label: 'Frecuencias'},
          {id: 'ingresos', label: 'Ingresos'},
          {id: 'parentescos', label: 'Parentescos'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
