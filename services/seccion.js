import traverson from './traverson'
import { prefix, cleanSelf } from './helpers'
import moment from 'moment/moment'

class SeccionService {
  async listaData (usuarioId, seccionId) {
    const result = await traverson
      .from(`${prefix}/seccionData/search/findAllByUsuarioIdAndSeccionId`)
      .withRequestOptions({qs: {usuarioId, seccionId, projection: 'lista'}})
      .jsonHal()
      .follow('seccionDatas[$all]')
      .getResource()
      .result

    return result.map(item => ({
      ...item,
      createdDate: moment(item.createdDate).format('YYYY-MM-DD'),
      modifiedDate: moment(item.modifiedDate).format('YYYY-MM-DD')
    }))
  }

  async seccionData (seccionDataId) {
    const result = await traverson
      .from(`${prefix}/seccionData/${seccionDataId}`)
      .jsonHal()
      .getResource()
      .result

    return {...result, contenido: JSON.parse(result.contenido)}
  }

  async guardaSeccionData ({id, contenido}) {
    const {traversal} = await traverson
      .from(`${prefix}/seccionData/${id}`)
      .jsonHal()
      .convertResponseToObject()
      .patch({
        contenido
      })
      .resultWithTraversal()

    return traversal.continue().follow('seccionData')
      .getResource()
      .result
  }

  async agregaSeccionData (usuarioId, {id, ...data}) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionVivienda`)
      .jsonHal()
      .convertResponseToObject()
      .post(
        cleanSelf({
          usuario: `${prefix}/usuario/${usuarioId}`,
          ...cleanSelf(data)
        })
      )
      .resultWithTraversal()

    return traversal
      .continue()
      .follow('seccionData')
      .getResource()
      .result
  }
}

const service = new SeccionService()

export default service
