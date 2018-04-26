import axios from 'axios'
import traverson from './traverson'
import halfred from 'halfred'

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

export async function fetchLinks (result, ...keys) {
  const fetch = async (item) => {
    const result = {...item}

    const parsed = halfred.parse(result)

    return Promise
      .all(
        keys
          .map(async (key) => {
            return item._links[key]
              ? traverson.from(item._links[key].href)
                .jsonHal()
                .getResource()
                .result
                .then(link => {
                  const parsed = halfred.parse(link)
                  const arrays = parsed.allEmbeddedArrays()
                  const keys = Object.keys(arrays)

                  result[key] = keys.length ? arrays[keys[0]].map(item => item.original()) : parsed.original()
                })
              : (result[key] = parsed.embeded(key))
          })
      )
      .then(() => result)
  }

  return Array.isArray(result)
    ? Promise
      .all(
        result
          .map(fetch)
      )
    : fetch(result)
}

export function cleanSelf (source) {
  const target = {...source}

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      const value = target[key]

      if (key !== '_links' && value !== null && value !== void 0) { // Make sure it's not null or undefined first
        target[key] = (value.self || (value._links && value._links.self) || {href: value}).href
      }
    } else {
      console.log(`Not own key ${key}`)
    }
  }

  return target
}
