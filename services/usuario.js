import axios from 'axios'
import { prefix, fetchLinks } from './helpers'
import moment from 'moment/moment'
import traverson from './traverson'

class UsuarioService {
  async read (id) {
    const {result, traversal} = await traverson
      .from(`${prefix}/usuario/${id}`)
      .jsonHal()
      .getResource()
      .resultWithTraversal()

    const departamento = await traversal
      .continue()
      .follow('ciudad', 'departamento')
      .getResource()
      .result

    return Promise
      .all(
        ['tipoDocumento', 'genero', 'ciudad', 'evaluador']
          .map(async item => {
            try {
              result[item] = await traversal
                .continue()
                .follow(item)
                .getResource()
                .result
            } catch (e) {
              console.log(e)
            }
          })
      )
      .then(() => {
        result.ciudad.departamento = departamento

        return result
      })
  }

  async readQuick (id) {
    const temp = await traverson
      .from(`${prefix}/usuario/${id}?projection=dataTable`)
      .jsonHal()
      .follow('self')
      .getResource()
      .result

    console.log(temp)

    return temp
  }

  async find (cedula) {
    const {data} = await axios.get(`${prefix}/usuario/search/documentos?documento=${cedula}`)
    const usuarios = (data._embedded && data._embedded.usuarios) || []

    if (usuarios.length) {
      return usuarios[0]
    } else {
      return null
    }
  }

  async guarda (usuario) {
    const {data} = await axios
      .post(
        `${prefix}/usuario`,
        usuario
      )

    return data
  }

  async dataTable () {
    const result = await traverson
      .from(`${prefix}/usuario?projection=dataTable`)
      .jsonHal()
      .follow('usuarios[$all]')
      .getResource()
      .result

    console.log(result)

    return result
  }

  async evaluacionId (usuarioId) {
    try {
      const {data} = await axios.get(`${prefix}/usuario/${usuarioId}/evaluaciones?projection=id`)
      const {_embedded} = data

      return Array.isArray(_embedded.evaluaciones) ? _embedded.evaluaciones[0].id : null
    } catch (e) {
      return null
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

  async evaluacionFamilia (evaluacionId) {
    const {result, traversal} = await traverson
      .from(`${prefix}/evaluacion/${evaluacionId}`)
      .jsonHal()
      .getResource()
      .resultWithTraversal()

    try {
      const evaluacion = await traversal
        .continue()
        .follow('familia')
        .getResource()
        .result

      console.log(result)

      return fetchLinks(evaluacion, 'familiaTipo', 'padreDocumento', 'madreDocumento', 'evaluacion')
    } catch (d) {
      console.log(d)

      return {
        id: -1,
        familiaTipo: null,
        calidadRelaciones: '',
        padreDocumento: null,
        padreIdentificacion: null,
        padreNombre: '',
        madreDocumento: null,
        madreIdentificacion: null,
        madreNombre: '',
        evaluacion: result,
        _links: {
          self: {
            href: d.url
          }
        }
      }
    }
  }

  async evaluacionOcupacion (usuarioId) {
    try {
      const evaluacion = await traverson
        .from(`${prefix}/usuario/${usuarioId}/evaluaciones`)
        .jsonHal()
        .follow('evaluaciones', 'ocupacion')
        .getResource()
        .result

      return fetchLinks(evaluacion, 'ocupacion', 'escolaridad')
    } catch (e) {
      const evaluacion = await traverson
        .from(`${prefix}/usuario/${usuarioId}/evaluaciones`)
        .jsonHal()
        .follow('evaluaciones')
        .getResource()
        .result

      return Promise.resolve({
        evaluacion: evaluacion._links.evaluacion.href,
        ocupacion: null,
        escolaridad: null,
        actividadEconomica: '',
        rutinaDiaria: '',
        actividadesTiempoLibre: '',
        telefono: '',
        empresa: ''
      })
    }
  }
}

const usuarioService = new UsuarioService()

export default usuarioService
