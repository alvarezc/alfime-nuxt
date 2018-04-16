<template>
    <v-container>
        <v-layout row>
            <v-flex>
                <v-text-field label="Nombre"></v-text-field>
            </v-flex>
            <v-flex class="ml-2">
                <v-text-field label="Segundo Nombre"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="mr-2">
                <v-text-field label="Apellido Paterno"></v-text-field>
            </v-flex>
            <v-flex>
                <v-text-field label="Apellido Materno"></v-text-field>
            </v-flex>
        </v-layout>

        <identificacion v-model="identificacion" :tipos="documentoTipos"></identificacion>

        <v-select label="Genero"
                  :items="generos"
                  item-text="genero" item-value="id"></v-select>

        <calendar label="Fecha de Nacimiento" v-model="date" :max="today"></calendar>

        <v-layout row wrap>
            <v-flex xs6>
                <v-select v-model="departamento" label="Departamento de Nacimiento"
                          :items="departamentos" autocomplete
                          item-text="departamento" item-value="id"></v-select>
            </v-flex>

            <v-flex xs6>
                <v-select v-model="ciudad" label="Ciudad de Nacimiento"
                          :items="ciudades" autocomplete
                          item-text="ciudad" item-value="id"></v-select>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
  import moment from 'moment'
  import lookup from '~/services/lookup'
  import calendar from '~/components/calendar'
  import identificacion from '~/components/identificacion'

  export default {
    name: 'index',

    components: {
      calendar,
      identificacion
    },

    async asyncData () {
      const documentoTipos = await lookup.documentoTipos()
      const generos = await lookup.generos()
      const departamentos = await lookup.departamentos()
      const ciudades = await lookup.ciudades(5)

      return {
        documentoTipos,
        generos,
        departamentos,
        ciudades
      }
    },

    data: () => ({
      today: moment().format('YYYY-MM-DD'),
      departamento: 5, // Antioquia
      ciudad: 47, // Envigado
      date: moment().format('YYYY-MM-DD'),
      menu: false,
      identificacion: {tipoId: null, numero: ''}
    }),

    methods: {
      async cargaCiudades (departamentoId) {
        this.ciudades = await lookup.ciudades(departamentoId)
        this.ciudad = this.ciudades[0].id
      }
    },

    watch: {
      departamento (newValue) {
        this.cargaCiudades(newValue) // Carga ciudades cuando cambie
      }
    }
  }
</script>

<style scoped>

</style>
