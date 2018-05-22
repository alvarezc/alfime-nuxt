import axios from 'axios'
import { extractEmbedded, prefix } from './helpers'

const viviendaMaterial = async (id) => {
  const {data} = await axios.get(`${prefix}/viviendaMaterial/search/findAllBySeccion?seccionId=${id}`)

  return extractEmbedded('viviendaMateriales', data)
}

export default {
  async antecedentes () {
    const {data} = await axios.get(`${prefix}/antecedente`)

    return extractEmbedded('antecedentes', data)
  },

  async antecedenteCategorias () {
    const {data} = await axios.get(`${prefix}/antecedenteCategoria`)

    return extractEmbedded('antecedenteCategorias', data)
  },

  async atencionTipos () {
    const {data} = await axios.get(`${prefix}/atencionTipo`)

    return extractEmbedded('atencionTipos', data)
  },

  async barrios () {
    const {data} = await axios.get(`${prefix}/barrio?size=500`)

    return extractEmbedded('barrios', data)
  },

  async ciudades (departamentoId) {
    const {data} = await axios.get(`${prefix}/departamento/${departamentoId}/ciudades?size=100`)

    return extractEmbedded('ciudades', data)
  },

  async cajasCompensacion () {
    const {data} = await axios.get(`${prefix}/caja-compensacion?size=100`)

    return extractEmbedded('cajasCompensacion', data)
  },

  async cifCategorias (componenteId) {
    const {data} = await axios.get(`${prefix}/cifComponente/${componenteId}/categorias?projection=completo`)

    return extractEmbedded('cifCategorias', data)
  },

  async cifComponentes () {
    const {data} = await axios.get(`${prefix}/cifcomponente?size=100`)

    return extractEmbedded('cifcomponentes', data)
  },

  async cifItems () {
    const {data} = await axios.get(`${prefix}/cifitem?size=100`)

    return extractEmbedded('cifitems', data)
  },

  async cies () {
    const {data} = await axios.get(`${prefix}/cie?size=3888`)

    return extractEmbedded('cies', data)
  },

  async departamentos () {
    const {data} = await axios.get(`${prefix}/departamento?size=50`)

    return extractEmbedded('departamentos', data)
  },

  async discapacidades () {
    const {data} = await axios.get(`${prefix}/discapacidad`)

    return extractEmbedded('discapacidades', data)
  },

  async documentoTipos () {
    const {data} = await axios.get(`${prefix}/tipoDocumento`)

    return extractEmbedded('tiposDocumento', data)
  },

  async epses () {
    const {data} = await axios.get(`${prefix}/eps`)

    return extractEmbedded('EPSes', data)
  },

  async escolaridades () {
    const {data} = await axios.get(`${prefix}/escolaridad`)

    return extractEmbedded('escolaridades', data)
  },

  async estadosCiviles () {
    const {data} = await axios.get(`${prefix}/estadoCivil`)

    return extractEmbedded('estadosCiviles', data)
  },

  async evaluadores () {
    const {data} = await axios.get(`${prefix}/rol/8/asociados`)

    return extractEmbedded('asociados', data)
      .map(item => ({id: item.id, nombre: item.nombreCompleto, self: item.self}))
  },

  async familiaTipos () {
    const {data} = await axios.get(`${prefix}/familiaTipo`)

    return extractEmbedded('familiaTipos', data)
  },

  async frecuencias () {
    const {data} = await axios.get(`${prefix}/frecuencia`)

    return extractEmbedded('frecuencias', data)
  },

  async generos () {
    const {data} = await axios.get(`${prefix}/genero`)

    return extractEmbedded('generos', data)
  },

  async ingresos () {
    const {data} = await axios.get(`${prefix}/ingreso`)

    return extractEmbedded('ingresos', data)
  },

  async parentescos () {
    const {data} = await axios.get(`${prefix}/parentesco`)

    return extractEmbedded('parentescos', data)
  },

  async ocupaciones () {
    const {data} = await axios.get(`${prefix}/ocupacion`)

    return extractEmbedded('ocupaciones', data)
  },
  async origenes () {
    const {data} = await axios.get(`${prefix}/origen`)

    return extractEmbedded('origenes', data)
  },

  async pensiones () {
    const {data} = await axios.get(`${prefix}/pension`)

    return extractEmbedded('pensiones', data)
  },

  async programas () {
    const {data} = await axios.get(`${prefix}/programa`)

    return extractEmbedded('programas', data)
  },

  async religiones () {
    const {data} = await axios.get(`${prefix}/religion`)

    return extractEmbedded('religiones', data)
  },

  async remitentes () {
    const {data} = await axios.get(`${prefix}/remitente`)

    return extractEmbedded('remitentes', data)
  },

  async regimenes () {
    const {data} = await axios.get(`${prefix}/regimen`)

    return extractEmbedded('regimenes', data)
  },

  async responsabilidades () {
    const {data} = await axios.get(`${prefix}/responsabilidad`)

    return extractEmbedded('responsabilidades', data)
  },

  async seccionTipos () {
    const {data} = await axios.get(`${prefix}/seccionTipo`)

    return extractEmbedded('seccionTipos', data)
  },

  async viviendaCalidad () {
    return viviendaMaterial(4)
  },

  async viviendaMobiliarios () {
    const {data} = await axios.get(`${prefix}/viviendaMobiliario`)

    return extractEmbedded('viviendaMobiliarios', data)
  },

  async viviendaParedes () {
    return viviendaMaterial(1)
  },

  async viviendaPisos () {
    return viviendaMaterial(3)
  },

  async viviendaTechos () {
    return viviendaMaterial(2)
  },

  async viviendaTipos () {
    const {data} = await axios.get(`${prefix}/viviendaTipo`)

    return extractEmbedded('viviendaTipos', data)
  }
}
