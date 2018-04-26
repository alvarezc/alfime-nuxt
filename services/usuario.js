import axios from 'axios'
import { prefix, extractLinks, extractEmbedded, fetchLinks } from './helpers'
import moment from 'moment/moment'
import traverson from './traverson'

export default {
  async read (id) {
    const {data} = await axios.get(`${prefix}/usuario/${id}`)

    return extractLinks(true, data)
  },

  async find (cedula) {
    const {data} = await axios.get(`${prefix}/usuario/search/documentos?documento=${cedula}`)
    const usuarios = (data._embedded && data._embedded.usuarios) || []

    if (usuarios.length) {
      return usuarios[0]
    } else {
      return null
    }
  },

  async guarda (usuario) {
    const {data} = await axios
      .post(
        `${prefix}/usuario`,
        usuario
      )

    return data
  },

  async dataTable () {
    const result = await traverson
      .from(`${prefix}/usuario?projection=dataTable`)
      .jsonHal()
      .follow('usuarios[$all]')
      .getResource()
      .result

    console.log(result)

    return result
  },

  async evaluacion (usuarioId) {
    const {data} = await axios.get(`${prefix}/usuario/${usuarioId}/evaluaciones`)
    const evaluaciones = extractEmbedded('evaluaciones', data, true)

    return evaluaciones.length
      ? extractLinks(false, evaluaciones[0])
      : {
        id: -1,
        usuario: usuarioId,
        aceptado: false,
        fecha: moment().format('YYYY-MM-DD'),
        observaciones: '',
        conclusiones: '',
        plan: [],
        aspiracion: [],
        remitente: 1
      }
  },

  async evaluacionFamilia (usuarioId) {
    const evaluacion = await traverson
      .from(`${prefix}/usuario/${usuarioId}/evaluaciones`)
      .jsonHal()
      .follow('evaluaciones', 'familia')
      .getResource()
      .result

    return fetchLinks(evaluacion, 'familiaTipo', 'padreDocumento', 'madreDocumento')
  },

  async evaluacionOcupacion (usuarioId) {
    try {
      const evaluacion = await traverson
        .from(`${prefix}/usuario/${usuarioId}/evaluaciones`)
        .jsonHal()
        .follow('evaluaciones', 'ocupacion')
        .getResource()
        .result

      return fetchLinks(evaluacion, 'ocupacion', 'escolaridad', 'actividadEconomica')
    } catch (e) {
      const evaluacion = await traverson
        .from(`${prefix}/usuario/${usuarioId}/evaluaciones`)
        .jsonHal()
        .follow('evaluaciones')
        .getResource()
        .result

      return Promise.resolve({
        evaluacion: evaluacion._links.evaluacion.href,
        ocupacion: null,
        escolaridad: null,
        actividadEconomica: null,
        rutinaDiaria: '',
        actividadesTiempoLibre: '',
        telefono: '',
        empresa: ''
      })
    }
  }
}
