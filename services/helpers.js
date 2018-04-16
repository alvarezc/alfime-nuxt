export function extractEmbedded (propiedad, {_embedded}) {
  const lista = _embedded[propiedad]

  return lista.map(({_links, ...data}) => data)
}
