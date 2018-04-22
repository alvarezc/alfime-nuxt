import axios from 'axios'
import moment from 'moment'
import { prefix, extractEmbedded } from './helpers'

const evaluacionDefault = {
  aceptado: false,
  fecha: moment().format('YYYY-MM-DD'),
  observaciones: '',
  conclusiones: '',
  plan: [],
  aspiracion: [],
  remitente: 1,
  evaluador: null
}

async function agregar (evaluacion) {
  const {data} = await axios
    .post(
      `${prefix}/evaluacion`,
      evaluacion
    )

  return data
}

export default {
  async read (usuarioId) {
    const {data} = await axios.get(`${prefix}/usuario/${usuarioId}`)
    const evaluaciones = extractEmbedded('evaluaciones', data)
    const result = evaluaciones.length ? evaluaciones[0] : {...evaluacionDefault}

    if (!result.usuario) {
      result.usuario = data
    }

    return result
  },

  async guarda (evaluacion) {
    if (evaluacion.id === -1) {
      return agregar(evaluacion)
    }

    const {data} = await axios
      .patch(
        (evaluacion.self && evaluacion.self.href) || `${prefix}/evaluacion/${evaluacion.id}`,
        evaluacion
      )

    return data
  }
}
