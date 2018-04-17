import axios from 'axios'

export function extractEmbedded (propiedad, {_embedded}) {
  const lista = _embedded[propiedad]

  return lista.map(({_links, ...data}) => ({self: _links.self, ...data}))
}

export const prefix = 'http://localhost:8090/api'

export async function extractLinks (recursive, {_links, ...result}) {
  const {self, ...all} = _links

  for (let key in all) {
    if (all[key].href !== self.href) {
      const href = all[key].href
      const {data} = await axios.get(href)
      const {_embedded, ...fields} = data

      if (_embedded) {
        result[key] = _embedded[key]
      } else {
        result[key] = recursive ? await extractLinks(false, data) : fields
      }

      console.log(`${key} ${JSON.stringify(result[key])}`)
    }
  }

  return result
}
