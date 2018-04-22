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
    // (await axios.get(`${prefix}/usuario/${usuarioId}/evaluaciones`)).data
    // const links = evaluacion._embedded.evaluaciones.length && evaluacion._embedded.evaluaciones[0]._links
    // const {data} = await axios.get(links.familia.href)

    console.log(evaluacion)

    return fetchLinks(evaluacion, 'familiaTipo', 'padreDocumento', 'madreDocumento')
  }
}
