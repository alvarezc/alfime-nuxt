import axios from 'axios'
import traverson from './traverson'
import halfred from 'halfred'
// import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

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
              : (result[key] = parsed.embedded(key))
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
  const {_embedded, ...target} = source

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      const value = target[key]

      if (key !== '_links' && value !== null && value !== void 0) { // Make sure it's not null or undefined first
        if (typeof value === 'object') {
          // const parsed = halfred.parse(Array.isArray(value) ? value[0] : value)
          if (Array.isArray(value)) {
            target[key] = value
              .map(item => {
                const parsed = halfred.parse(item)
                const links = parsed.allLinks()
                const selfTemp = links.self || parsed.self
                const self = Array.isArray(selfTemp) ? selfTemp[0] : selfTemp

                return self
                  ? !self.templated
                    ? self.href
                    : new URITemplate(self.href).expand({})
                  : item
              })
          } else {
            const parsed = halfred.parse(value)
            const links = parsed.allLinks()
            const selfTemp = (value.self || links.self)
            const self = Array.isArray(selfTemp) ? selfTemp[0] : selfTemp
            const uri = !self.templated ? self.href : new URITemplate(self.href).expand({})

            target[key] = uri
          }
        } else {
          target[key] = value
        }
      }
    } else {
      console.log(`Not own key ${key}`)
    }
  }

  return target
}

export async function traverse (traversal, target, ...keys) {
  return Promise
    .all(
      keys
        .map(key =>
          traversal
            .continue()
            .follow(key)
            .getResource()
            .result
            .then(value => {
              if (value._embedded) {
                const embedded = value._embedded

                target[key] = embedded[Object.keys(embedded)[0]]
              } else {
                target[key] = value
              }
            })
            .catch(() => {
              target[key] = null
            })
        )
    )
    .then(() => target)
}
