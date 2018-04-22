import traverson from './traverson'
import { prefix, fetchLinks, cleanSelf } from './helpers'

export default {
  async familiares (id) {
    const result = await traverson
      .from(`${prefix}/evaluacion/${id}/familia`)
      .jsonHal()
      .follow('miembros')
      .follow('familiares[$all]')
      .getResource()
      .result

    return fetchLinks(result, 'parentesco', 'responsabilidad')

    // return Promise
    //   .all(
    //     result
    //       .map(async (item) => {
    //         const parentesco = await traverson.from(item._links.parentesco.href).getResource().result
    //         const responsabilidad = await traverson.from(item._links.responsabilidad.href).getResource().result
    //
    //         return {
    //           ...item,
    //           parentesco,
    //           responsabilidad
    //         }
    //       })
    //   )
  },

  async agrega (id, miembro) {
    const evaluacion = await traverson
      .from(`${prefix}/evaluacion/${id}`)
      .jsonHal()
      .follow('usuario')
      .getResource()
      .result

    const result = await traverson
      .from(`${prefix}/familia`)
      .jsonHal()
      .convertResponseToObject()
      .post({...miembro, evaluacion: evaluacion._links.self.href})
      .result

    console.log(`Agregar ${JSON.stringify(result)}`)
    const fetched = await fetchLinks(result, 'parentesco', 'responsabilidad')
    console.log(`Fetched ${JSON.stringify(fetched)}`)

    return fetched
  },

  async guardaMiembro (miembro) {
    const {nombre, parentesco, responsabilidad} = miembro
    const result = await traverson
      .from(miembro._links.self.href)
      .jsonHal()
      .convertResponseToObject()
      .patch(
        cleanSelf({
          nombre,
          parentesco,
          responsabilidad
        }))
      .result

    console.log(`Saved member ${JSON.stringify(result)}`)

    return fetchLinks(result, 'parentesco', 'responsabilidad')
  },

  async guardaFamilia (evaluacionFamiliar) {
    const result = await traverson
      .from(evaluacionFamiliar._links.self.href)
      .jsonHal()
      .convertResponseToObject()
      .patch(cleanSelf(evaluacionFamiliar))
      .result

    return result
  }
}
