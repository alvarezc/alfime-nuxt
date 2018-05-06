import traverson from './traverson'
// import moment from 'moment'
import { cleanSelf, prefix } from './helpers'

// /cifComponente/2

class CifService {
  async categoria (componenteId) {
    const {result, traversal} = await traverson
      .from(`${prefix}/cifComponente/${componenteId}`)
      .jsonHal()
      .getResource()
      .resultWithTraversal()

    return {
      ...result,
      categorias: await traversal
        .continue()
        .follow('categorias', 'cifCategorias[$all]')
        .withTemplateParameters({projection: 'completo'})
        .getResource()
        .result
    }
  }

  async barreras () {
    return traverson
      .from(`${prefix}/cifCalificador/search/findByFacilitadorIsFalse`)
      .jsonHal()
      .follow('cifCalificadores[$all]')
      .getResource()
      .result
  }

  async calificadores () {
    return traverson
      .from(`${prefix}/cifCalificador`)
      .jsonHal()
      .follow('cifCalificadores[$all]')
      .getResource()
      .result
  }

  async usuarioItems (usuarioId, componenteId) {
    return traverson
      .from(`${prefix}/cifItemUsuario/search`)
      .jsonHal()
      .follow('findAllByUsuarioIdAndItemCategoriaId', 'cifItemUsuarios[$all]')
      .withTemplateParameters({usuarioId, componenteId, projection: 'medico'})
      .getResource()
      .result
    // /cifItemUsuario/search/findAllByUsuarioIdAndItemCategoriaComponenteId?usuarioId=1&componenteId=1&projection=medico
  }

  async agregaItem (usuarioId, itemId, calificador) {
    const result = await traverson
      .from(`${prefix}/cifItemUsuario`)
      .jsonHal()
      .convertResponseToObject()
      .post({
        usuario: `${prefix}/usuario/${usuarioId}`,
        item: `${prefix}/cifItem/${itemId}`,
        ...cleanSelf({calificador})
      })
      .result

    return traverson
      .from(result._links.self.href)
      .withRequestOptions({qs: {projection: 'medico'}})
      .getResource()
      .result
  }

  async guardaItem (id, calificador) {
    return traverson
      .from(`${prefix}/cifItemUsuario/${id}`)
      .jsonHal()
      .convertResponseToObject()
      .patch(cleanSelf({calificador}))
      .result
  }

  async borraItem (id) {
    return traverson
      .from(`${prefix}/cifItemUsuario/${id}`)
      .delete()
      .result
  }
}

const service = new CifService()

export default service
