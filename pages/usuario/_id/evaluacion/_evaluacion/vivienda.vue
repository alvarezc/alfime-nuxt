<template>
    <v-container>
        <a-formulario :to="`/usuario/${$route.params.id}/evaluacion/${$route.params.evaluacion}`"
                      @guarda="guarda" :schema="schema" v-model="modelo"/>
    </v-container>
</template>

<script>
  import lookupService from '~/services/lookup'
  import evaluacionService from '~/services/evaluacion'
  import AFormulario from '../../../../../components/form/formulario'

  export default {
    name: 'vivienda',
    components: {AFormulario},
    async asyncData ({params}) {
      return {
        modelo: await evaluacionService.evaluacionVivienda(params.evaluacion),
        schema: [
          {
            id: 1,
            etiqueta: 'Tipo de Vivienda',
            nombre: 'tipo',
            tipo: 'lookup',
            opciones: {
              items: await lookupService.viviendaTipos()
            }
          },
          {
            id: 2,
            etiqueta: 'Calidad de la Vivienda',
            nombre: 'calidad',
            tipo: 'lookup',
            opciones: {
              items: await lookupService.viviendaCalidad()
            }
          },
          {
            id: 3,
            etiqueta: 'Calidad Otro',
            nombre: 'calidadOtro',
            tipo: 'texto',
            disabled: (modelo) => {
              console.log(modelo.calidad && modelo.calidad.id !== 16)

              return modelo.calidad && modelo.calidad.id !== 16
            },
            opciones: {
              max: 50
            }
          },
          {
            id: 4,
            etiqueta: 'Estrato',
            nombre: 'estrato',
            tipo: 'slider',
            opciones: {
              min: 1,
              max: 6
            }
          },
          {
            id: 5,
            etiqueta: 'Dormitorios',
            nombre: 'dormitorios',
            tipo: 'slider',
            opciones: {
              min: 0,
              max: 10
            }
          },
          {
            id: 6,
            etiqueta: 'Material de las Paredes',
            nombre: 'pared',
            tipo: 'lookup',
            opciones: {
              items: await lookupService.viviendaParedes()
            }
          },
          {
            id: 7,
            etiqueta: 'Material del Techo',
            nombre: 'techo',
            tipo: 'lookup',
            opciones: {
              items: await lookupService.viviendaTechos()
            }
          },
          {
            id: 8,
            etiqueta: 'Material del Piso',
            nombre: 'piso',
            tipo: 'lookup',
            opciones: {
              items: await lookupService.viviendaPisos()
            }
          },
          {
            id: 9,
            etiqueta: 'Mobiliario',
            nombre: 'mobiliario',
            tipo: 'lookup',
            opciones: {
              items: await lookupService.viviendaMobiliarios(),
              chips: true,
              multiple: true
            }
          }
        ]
      }
    },

    methods: {
      async guarda () {
        if (this.modelo.id === -1) {
          this.modelo = await evaluacionService.agregaVivienda(this.$route.params.evaluacion, this.modelo)
        } else {
          this.modelo = await evaluacionService.guardaVivienda(this.modelo)
        }
      }
    }
  }
</script>
