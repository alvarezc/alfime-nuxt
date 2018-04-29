import traverson from './traverson'
import moment from 'moment'
import { prefix, fetchLinks, traverse, cleanSelf } from './helpers'

// const evaluacionDefault = {
//   aceptado: false,
//   fecha: moment().format('YYYY-MM-DD'),
//   observaciones: '',
//   conclusiones: '',
//   plan: [],
//   aspiracion: [],
//   remitente: 1,
//   evaluador: null
// }

class EvaluacionService {
  async read (evaluacionId) {
    const {result, traversal} = await traverson
      .from(`${prefix}/evaluacion/${evaluacionId}`)
      .jsonHal()
      .getResource()
      .resultWithTraversal()

    return traverse(traversal, result, 'plan', 'aspiracion', 'remitente', 'usuario', 'evaluador')
  }

  async empty (usuarioId) {
    const remitente = await traverson.from(`${prefix}/remitente/1`)
      .jsonHal()
      .getResource()
      .result

    return {
      id: -1,
      usuario: {
        _links: {
          self: {
            href: `${prefix}/usuario/${usuarioId}`
          }
        }
      },
      aceptado: false,
      fecha: moment().format('YYYY-MM-DD'),
      observaciones: '',
      conclusiones: '',
      plan: [],
      aspiracion: [],
      remitente
    }
  }

  async evaluacion (usuarioId) {
    const usuario = await this.readQuick(usuarioId)
    const remitente = await traverson.from(`${prefix}/remitente/1`)
      .jsonHal()
      .getResource()
      .result
    const evaluaciones = await traverson.from(`${prefix}/usuario/${usuarioId}/evaluaciones`)
      .jsonHal()
      .follow('evaluaciones[$all]')
      .getResource()
      .result

    const result = evaluaciones.length
      ? await fetchLinks(evaluaciones[0], 'plan', 'aspiracion', 'remitente', 'usuario', 'evaluador')
      : {
        id: -1,
        usuario,
        aceptado: false,
        fecha: moment().format('YYYY-MM-DD'),
        observaciones: '',
        conclusiones: '',
        plan: [],
        aspiracion: [],
        remitente
      }

    console.log(result)

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

    const {usuario, ...sinUsuario} = evaluacion

    result = await save.patch(cleanSelf({id, ...sinUsuario})).result

    return result
  }

  async evaluacionIngresos (evaluacionId) {
    const ingresos = await traverson
      .from(`${prefix}/evaluacionIngreso/search/findByEvaluacionId`)
      .withRequestOptions({qs: {evaluacionId: evaluacionId, projection: 'completo'}})
      .jsonHal()
      .follow('evaluacionesIngresos[$all]')
      .getResource()
      .result

    console.log(ingresos)

    return ingresos
  }

  async guardaIngreso (ingreso) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionIngreso/${ingreso.id}`)
      .jsonHal()
      .convertResponseToObject()
      .patch(ingreso)
      .resultWithTraversal()

    return traversal.continue().follow('evaluacionIngreso')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async agregaIngreso (evaluacionId, ingreso) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionIngreso`)
      .jsonHal()
      .convertResponseToObject()
      .post({
        evaluacion: `${prefix}/evaluacion/${evaluacionId}`,
        ...ingreso
      })
      .resultWithTraversal()

    return traversal.continue()
      .follow('evaluacionIngreso')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async borraIngreso (ingreso) {
    await traverson
      .from(ingreso._links.self.href)
      .jsonHal()
      .delete()
      .result

    return ingreso
  }
}

const evaluacionService = new EvaluacionService()

export default evaluacionService
