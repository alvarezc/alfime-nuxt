<template>
    <v-container>
        <a-formulario v-model="modelo" :schema="schema"
                      to="/" @guarda="guarda"></a-formulario>
        {{modelo}}
    </v-container>
</template>

<script>
  import AFormulario from '../components/form/formulario'
  import lookupService from '../services/lookup'

  export default {
    name: 'forma',

    components: {AFormulario},

    async asyncData () {
      return {
        schema: [
          {
            id: 1,
            etiqueta: 'Nombre',
            nombre: 'nombre',
            tipo: 'texto',
            requerido: true,
            opciones: {
              max: 50,
              min: 10
            }
          },
          {
            id: 2,
            etiqueta: 'Estrato',
            nombre: 'estrato',
            tipo: 'slider',
            requerido: true,
            opciones: {
              max: 6,
              min: 1
            }
          },
          {
            id: 3,
            etiqueta: 'Lookup',
            nombre: 'calidad',
            tipo: 'lookup',
            requerido: true,
            opciones: {
              items: await lookupService.antecedentes(),
              chips: true,
              multiple: true
            }
          }
        ],

        modelo: {
          nombre: 'El Nombre',
          estrato: 4,
          calidad: null
        }
      }
    },

    methods: {
      guarda (form) {
        window.alert(JSON.stringify(form))
      }
    }
  }
</script>

<style scoped>

</style>
