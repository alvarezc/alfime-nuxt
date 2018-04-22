import axios from 'axios'

export function extractEmbedded (propiedad, {_embedded}, includeLinks) {
  const lista = _embedded[propiedad]

  return lista.map(({_links, ...data}) =>
    (includeLinks
      ? {self: _links.self, ...data, _links}
      : {self: _links.self, ...data}))
}

export const prefix = 'http://localhost:3000/api'

export async function extractLinks (recursive, {_links, ...result}) {
  const {self, ...all} = _links

  for (let key in all) {
    if (all[key].href !== self.href) {
      const href = all[key].href

      try {
        const {data} = await axios.get(href)
        const {_embedded, ...fields} = data

        if (_embedded) {
          for (let embeddedKey in _embedded) {
            if (_embedded.hasOwnProperty(embeddedKey)) {
              result[key] = _embedded[embeddedKey]
            }
          }
        } else {
          result[key] = recursive ? await extractLinks(false, data) : fields
        }

        console.log(`${key} ${JSON.stringify(result[key])}`)
      } catch (e) {
        // Not found
        result[key] = null // VUE requires at least null so change detection works
      }
    }
  }

  return result
}
