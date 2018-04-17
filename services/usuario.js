import axios from 'axios'
import { prefix, extractLinks } from './helpers'

export default {
  async read (id) {
    const {data} = await axios.get(`${prefix}/usuario/${id}`)

    return extractLinks(true, data)
  },

  async find (cedula) {
    const {data} = await axios.get(`${prefix}/usuario/search/documentos?documento=${cedula}`)
    const usuarios = (data._embedded && data._embedded.usuarios) || []

    if (usuarios.length) {
      return usuarios[0]
    } else {
      return null
    }
  }
}
