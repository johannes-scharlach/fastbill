'use strict'

const apiMethods = require('./src/api-methods.js')

const missing = desc => {
  throw Error(`${desc} is required to use the fastbill api`)
}
module.exports = (
  {
    email = missing('options.email'),
    apiKey = missing('options.apiKey')
  } = missing('Options object')
) => apiMethods({ email, apiKey })
