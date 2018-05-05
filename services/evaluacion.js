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

  async readEvaluacionSalud (evaluacionId) {
    try {
      const {result, traversal} = await traverson
        .from(`${prefix}/evaluacionSalud/${evaluacionId}`)
        .jsonHal()
        .getResource()
        .resultWithTraversal()

      return traverse(traversal, result, 'fondoPension', 'cajaCompensacion', 'regimen', 'eps')
    } catch (e) {
      return {
        id: -1,
        fondoPension: null,
        cajaCompensacion: null,
        regimen: null,
        eps: null
      }
    }
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

    return result
  }

  async guarda (source) {
    const {id, ...evaluacion} = source

    if (id === -1) {
      return this.agregarEvaluacion(evaluacion)
    }

    let result
    const save = traverson
      .from(`${prefix}/evaluacion/${id}`)
      .jsonHal()
      .convertResponseToObject()

    const {usuario, ...sinUsuario} = evaluacion

    result = await save.patch(cleanSelf({id, ...sinUsuario})).result

    return result
  }

  async agregarEvaluacion (evaluacion) {
    const save = traverson
      .from(`${prefix}/evaluacion`)
      .jsonHal()
      .convertResponseToObject()

    return save.post(cleanSelf(evaluacion)).result
  }

  async guardaEvaluacionSalud (source) {
    const {id, ...salud} = source

    if (id === -1) {
      return this.agregarEvaluacionSalud(salud)
    }

    const {result, traversal} = await traverson
      .from(`${prefix}/evaluacionSalud/${id}`)
      .jsonHal()
      .convertResponseToObject()
      .patch(
        cleanSelf({
          id,
          ...salud
        }))
      .resultWithTraversal()

    return traverse(traversal, result, 'fondoPension', 'cajaCompensacion', 'regimen', 'eps')
  }

  async agregarEvaluacionSalud (evaluacionId, {id, ...salud}) {
    const {result, traversal} = await traverson
      .from(`${prefix}/evaluacionSalud`)
      .jsonHal()
      .convertResponseToObject()
      .post(
        cleanSelf({
          evaluacion: `${prefix}/evaluacion/${evaluacionId}`,
          ...salud
        })
      ).resultWithTraversal()

    return traverse(traversal, result, 'fondoPension', 'cajaCompensacion', 'regimen', 'eps')
  }

  async evaluacionIngresos (evaluacionId) {
    const ingresos = await traverson
      .from(`${prefix}/evaluacionIngreso/search/findByEvaluacionId`)
      .withRequestOptions({qs: {evaluacionId: evaluacionId, projection: 'completo'}})
      .jsonHal()
      .follow('evaluacionesIngresos[$all]')
      .getResource()
      .result

    return ingresos
  }

  async evaluacionDiscapacidades (evaluacionId) {
    const discapacidades = await traverson
      .from(`${prefix}/evaluacionDiscapacidad/search/findByEvaluacionId`)
      .withRequestOptions({qs: {evaluacionId: evaluacionId, projection: 'completo'}})
      .jsonHal()
      .follow('evaluacionesDiscapacidades[$all]')
      .getResource()
      .result

    return discapacidades.map(item => ({
      ...item,
      adquisicion: moment(item.adquisicion).format('YYYY-MM-DD')
    }))
  }

  async evaluacionAtenciones (evaluacionId) {
    const ingresos = await traverson
      .from(`${prefix}/evaluacionAtencion/search/findByEvaluacionId`)
      .withRequestOptions({qs: {evaluacionId: evaluacionId, projection: 'completo'}})
      .jsonHal()
      .follow('evaluacionesAtenciones[$all]')
      .getResource()
      .result

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

  async guardaDiscapacidad (discapacidad) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionDiscapacidad/${discapacidad.id}`)
      .jsonHal()
      .convertResponseToObject()
      .patch(discapacidad)
      .resultWithTraversal()

    return traversal.continue().follow('evaluacionDiscapacidad')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async agregaDiscapacidad (evaluacionId, discapacidad) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionDiscapacidad`)
      .jsonHal()
      .convertResponseToObject()
      .post({
        evaluacion: `${prefix}/evaluacion/${evaluacionId}`,
        ...discapacidad
      })
      .resultWithTraversal()

    return traversal.continue()
      .follow('evaluacionDiscapacidad')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async borraDiscapacidad (discapacidad) {
    await traverson
      .from(discapacidad._links.self.href)
      .jsonHal()
      .delete()
      .result

    return discapacidad
  }

  async guardaAtencion (atencion) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionAtencion/${atencion.id}`)
      .jsonHal()
      .convertResponseToObject()
      .patch(atencion)
      .resultWithTraversal()

    return traversal.continue().follow('evaluacionAtencion')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async agregaAtencion (evaluacionId, atencion) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionAtencion`)
      .jsonHal()
      .convertResponseToObject()
      .post({
        evaluacion: `${prefix}/evaluacion/${evaluacionId}`,
        ...atencion
      })
      .resultWithTraversal()

    return traversal.continue()
      .follow('evaluacionAtencion')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async borraAtencion (atencion) {
    await traverson
      .from(atencion._links.self.href)
      .jsonHal()
      .delete()
      .result

    return atencion
  }
}

const evaluacionService = new EvaluacionService()

export default evaluacionService
