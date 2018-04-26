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

        <lookup label="Genero" :items="generos" v-model="modelo.genero"></lookup>

        <calendar label="Fecha de Nacimiento" v-model="modelo.nacimiento" :max="today"></calendar>

        <v-layout row wrap>
            <v-flex xs6>
                <lookup v-model="departamento" label="Departamento de Nacimiento" :items="departamentos"
                        @input="changeDepartamento"></lookup>
            </v-flex>

            <v-flex xs6>
                <lookup v-model="modelo.ciudad" label="Ciudad de Nacimiento" :items="ciudades"></lookup>
            </v-flex>
        </v-layout>

        <v-btn @click="guarda()">Guardar</v-btn>
    </v-container>
</template>

<script>
  import moment from 'moment'
  import lookupService from '~/services/lookup'
  import usuarioService from '~/services/usuario'
  import calendar from '~/components/calendar'
  import lookup from '~/components/lookup'
  import identificacion from '~/components/identificacion'

  export default {
    name: 'index',

    components: {
      calendar,
      identificacion,
      lookup
    },

    async asyncData () {
      const documentoTipos = await lookupService.documentoTipos()
      const generos = await lookupService.generos()
      const departamentos = await lookupService.departamentos()

      return {
        documentoTipos,
        generos,
        departamentos
      }
    },

    data: () => ({
      today: moment().format('YYYY-MM-DD'),
      departamento: null,
      ciudades: [],
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
        this.ciudades = await lookupService.ciudades(departamentoId)
        this.modelo.ciudad = this.ciudades[0]
      },

      async guarda () {
        const {identificacion, ...usuario} = this.modelo

        const data = await usuarioService
          .guarda({
            ...usuario,
            documento: identificacion.numero,
            genero: usuario.genero.self.href,
            tipoDocumento: identificacion.tipoId.self.href,
            ciudad: usuario.ciudad.self.href,
            nacimiento: moment(usuario.nacimiento).toISOString()
          })

        this.$nuxt.$router.push(`/usuario/${data.id}`)
      },

      async changeDepartamento (newValue) {
        console.log(JSON.stringify(newValue))
        this.cargaCiudades(newValue.id) // Carga ciudades cuando cambie
      }
    },

    created () {
      this.departamento = this.departamentos.find(item => item.id === 5) // Antioquia
      this.changeDepartamento(this.departamento)
    }
  }
</script>

<style scoped>

</style>
