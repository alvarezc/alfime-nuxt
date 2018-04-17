<template>
    <v-container>
        <v-layout row>
            <v-flex>
                <v-text-field v-model="modelo.nombre" label="Nombre"></v-text-field>
            </v-flex>
            <v-flex class="ml-2">
                <v-text-field v-model="modelo.segundoNombre" label="Segundo Nombre"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="mr-2">
                <v-text-field v-model="modelo.apellidoPaterno" label="Apellido Paterno"></v-text-field>
            </v-flex>
            <v-flex>
                <v-text-field v-model="modelo.apellidoMaterno" label="Apellido Materno"></v-text-field>
            </v-flex>
        </v-layout>

        <identificacion v-model="modelo.identificacion" :tipos="documentoTipos"></identificacion>

        <v-select label="Genero"
                  :items="generos" v-model="modelo.genero"
                  item-text="genero" item-value="id"></v-select>

        <calendar label="Fecha de Nacimiento" v-model="modelo.nacimiento" :max="today"></calendar>

        <v-layout row wrap>
            <v-flex xs6>
                <v-select v-model="departamento" label="Departamento de Nacimiento"
                          :items="departamentos" autocomplete
                          item-text="departamento" item-value="id"></v-select>
            </v-flex>

            <v-flex xs6>
                <v-select v-model="modelo.ciudad" label="Ciudad de Nacimiento"
                          :items="ciudades" autocomplete
                          item-text="ciudad" item-value="id"></v-select>
            </v-flex>
        </v-layout>

        <v-btn @click="guarda()">Guardar</v-btn>
    </v-container>
</template>

<script>
  import moment from 'moment'
  import lookup from '~/services/lookup'
  import calendar from '~/components/calendar'
  import identificacion from '~/components/identificacion'
  import axios from 'axios'

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
      date: moment().format('YYYY-MM-DD'),
      menu: false,
      modelo: {
        nombre: '',
        segundoNombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nacimiento: '',
        ciudad: 47, // Envigado
        genero: null,
        identificacion: {tipoId: null, numero: ''}
      }
    }),

    methods: {
      async cargaCiudades (departamentoId) {
        this.ciudades = await lookup.ciudades(departamentoId)
        this.ciudad = this.ciudades[0].id
      },

      async guarda () {
        const {identificacion, ...usuario} = this.modelo

        const {data} = await axios
          .post(
            'http://localhost:8090/api/usuario',
            {
              ...usuario,
              documento: identificacion.numero,
              genero: `http://localhost:8090/api/genero/${usuario.genero}`,
              tipoDocumento: `http://localhost:8090/api/tipoDocumento/${identificacion.tipoId}`,
              ciudad: `http://localhost:8090/api/ciudad/${usuario.ciudad}`,
              nacimiento: moment(usuario.nacimiento).toISOString()
            })

        this.$nuxt.$router.push(`/usuario/${data.id}`)
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
