import axios from 'axios'
import { extractEmbedded, prefix } from './helpers'

console.log(prefix)

export default {
  async barrios () {
    const {data} = await axios.get(`${prefix}/barrio?size=500`)

    return extractEmbedded('barrios', data)
  },

  async ciudades (departamentoId) {
    const {data} = await axios.get(`${prefix}/departamento/${departamentoId}/ciudades?size=100`)

    return extractEmbedded('ciudades', data)
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

  async pensiones () {
    const {data} = await axios.get(`${prefix}/pension`)

    return extractEmbedded('pensiones', data)
  },

  async programas () {
    const {data} = await axios.get(`${prefix}/programa`)

    return extractEmbedded('programas', data)
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
  }
}
