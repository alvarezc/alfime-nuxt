import traverson from './traverson'
// import moment from 'moment'
import { prefix } from './helpers'

// /cifComponente/2

class MedicoService {
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
}

const service = new MedicoService()

export default service
