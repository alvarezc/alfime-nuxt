import axios from 'axios'
import { prefix, extractLinks, extractEmbedded } from './helpers'
import moment from 'moment/moment'

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
  }
}
