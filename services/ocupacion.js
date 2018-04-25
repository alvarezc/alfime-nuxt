import traverson from './traverson'
import { prefix, cleanSelf, fetchLinks } from './helpers'

export default {
  async guardaOcupacion (evaluacionOcupacion) {
    if (!evaluacionOcupacion._links) {
      // Agregar
      const result = await traverson
        .from(`${prefix}/evaluacionOcupacion`)
        .jsonHal()
        .convertResponseToObject()
        .post(cleanSelf(evaluacionOcupacion))
        .result

      return fetchLinks(result, 'ocupacion', 'escolaridad', 'actividadEconomica')
    } else {
      // Actualizar
      const result = await traverson
        .from(evaluacionOcupacion._links.self.href)
        .jsonHal()
        .convertResponseToObject()
        .patch(cleanSelf(evaluacionOcupacion))
        .result

      return fetchLinks(result, 'ocupacion', 'escolaridad', 'actividadEconomica')
    }
  }
}
