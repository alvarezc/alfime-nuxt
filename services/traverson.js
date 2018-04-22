// require traverson and traverson-hal
import traverson from 'traverson-promise'
import JsonHalAdapter from 'traverson-hal'

// register the traverson-hal plug-in for media type 'application/hal+json'
traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter)

export default traverson
