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

    const full = await traverse(traversal, result, 'plan', 'aspiracion', 'remitente', 'usuario', 'evaluador')

    console.log(full)

    return full
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

  async evaluacionMedico (evaluacionId) {
    try {
      const result = await traverson
        .from(`${prefix}/evaluacionMedico/${evaluacionId}`)
        .jsonHal()
        .withRequestOptions({qs: {projection: 'completo'}})
        .getResource()
        .result

      return result
    } catch (e) {
      return {
        id: -1,
        familiar: [],
        diagnostico: [],
        recomendaciones: null,
        sinopsis: null
      }
    }
  }

  async guardaMedico ({id, familiar, diagnostico, recomendaciones, sinopsis}) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionMedico/${id}`)
      .jsonHal()
      .convertResponseToObject()
      .patch({
        recomendaciones,
        sinopsis,
        familiar: familiar
          .map(item => item._links ? item._links.self.href : `${prefix}/CIE/${item.id}`),
        diagnostico: diagnostico
          .map(item => item._links ? item._links.self.href : `${prefix}/CIE/${item.id}`)
      })
      .resultWithTraversal()

    return traversal.continue().follow('evaluacionMedico')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async agregaMedico (evaluacionId, {id, ...medico}) {
    medico.diagnostico = medico.diagnostico.map(item => item._links.self.href)
    medico.familiar = medico.familiar.map(item => item._links.self.href)

    const {traversal} = await traverson
      .from(`${prefix}/evaluacionMedico`)
      .jsonHal()
      .convertResponseToObject()
      .post(
        cleanSelf({
          evaluacion: `${prefix}/evaluacion/${evaluacionId}`,
          ...medico
        })
      )
      .resultWithTraversal()

    return traversal
      .continue()
      .follow('evaluacionMedico')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async evaluacionVivienda (evaluacionId) {
    try {
      const result = await traverson
        .from(`${prefix}/evaluacionVivienda/${evaluacionId}`)
        .jsonHal()
        .withRequestOptions({qs: {projection: 'completo'}})
        .getResource()
        .result

      return result
    } catch (e) {
      return {
        id: -1,
        tipo: {id: 1, self: {href: 'http://localhost:3000/api/viviendaTipo/1'}},
        estrato: 1,
        dormitorios: 0,
        techo: {id: 6, self: {href: 'http://localhost:3000/api/viviendaMaterial/6'}},
        piso: {id: 10, self: {href: 'http://localhost:3000/api/viviendaMaterial/10'}},
        pared: {id: 1, self: {href: 'http://localhost:3000/api/viviendaMaterial/1'}},
        evaluacion: {id: evaluacionId, self: {href: `http://localhost:3000/api/evaluacion/${evaluacionId}`}},
        mobiliario: []
      }
    }
  }

  async guardaVivienda ({id, familiar, diagnostico, recomendaciones, sinopsis}) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionVivienda/${id}`)
      .jsonHal()
      .convertResponseToObject()
      .patch({
        recomendaciones,
        sinopsis,
        familiar: familiar
          .map(item => item._links ? item._links.self.href : `${prefix}/CIE/${item.id}`),
        diagnostico: diagnostico
          .map(item => item._links ? item._links.self.href : `${prefix}/CIE/${item.id}`)
      })
      .resultWithTraversal()

    return traversal.continue().follow('evaluacionVivienda')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }

  async agregaVivienda (evaluacionId, {id, ...vivienda}) {
    const {traversal} = await traverson
      .from(`${prefix}/evaluacionVivienda`)
      .jsonHal()
      .convertResponseToObject()
      .post(
        cleanSelf({
          evaluacion: `${prefix}/evaluacion/${evaluacionId}`,
          ...cleanSelf(vivienda)
        })
      )
      .resultWithTraversal()

    return traversal
      .continue()
      .follow('evaluacionVivienda')
      .withTemplateParameters({projection: 'completo'})
      .getResource()
      .result
  }
}

const evaluacionService = new EvaluacionService()

export default evaluacionService
