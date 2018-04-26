import traverson from './traverson'
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

class EvaluacionService {
  async read (usuarioId) {
    const {data} = await axios.get(`${prefix}/usuario/${usuarioId}`)
    const evaluaciones = extractEmbedded('evaluaciones', data)
    const result = evaluaciones.length ? evaluaciones[0] : {...evaluacionDefault}

    if (!result.usuario) {
      result.usuario = data
    }

    return result
  }

  async guarda (source) {
    const {id, ...evaluacion} = source

    if (evaluacion.id === -1) {
      return this.agregar(evaluacion)
    }

    let result
    const save = traverson
      .from(`${prefix}/evaluacion/${id === -1 ? '' : id}`)
      .jsonHal()
      .convertResponseToObject()

    if (id === -1) {
      result = await save.post(evaluacion).result
    } else {
      result = await save.patch({id, ...evaluacion}).result
    }

    return result
  }
}

const evaluacionService = new EvaluacionService()

export default evaluacionService
