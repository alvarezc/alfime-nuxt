import traverson from './traverson'
// import moment from 'moment'
import { prefix } from './helpers'

// /cifComponente/2

class CieService {
  async cieStarts (starts) {
    const result = await traverson
      .from(`${prefix}/CIE/search/findByEnfermedadContains`)
      .jsonHal()
      .follow('CIEs[$all]')
      .withRequestOptions({qs: {enfermedad: starts, size: 100}})
      .getResource()
      .result

    console.log(result)

    return result
  }
}

const service = new CieService()

export default service
