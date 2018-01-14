'use strict'

const fastbillFetch = require('./fastbill-fetch.js')
const validations = require('./validations.js')
const R = require('ramda')

const mapKeys = R.curry((fn, obj) =>
  R.fromPairs(R.map(R.adjust(fn, 0), R.toPairs(obj)))
)
const uppercaseKeys = mapKeys(R.toUpper)
const lowercaseKeys = mapKeys(R.toLower)

module.exports = ({ email, apiKey }) => {
  const fetchBody = fastbillFetch({ email, apiKey })

  const customer = {
    get(options) {
      throw Error('customer.get was not implemented yet')
    },
    create({ data }) {
      data = uppercaseKeys(data)
      const errors = validations.getConsumerErrors(data)

      if (errors) {
        throw new Error(errors.join('; '))
      }

      const body = {
        service: 'customer.create',
        data,
      }

      return fetchBody(uppercaseKeys(body)).then(({ RESPONSE }) => ({
        response: lowercaseKeys(RESPONSE),
      }))
    },
    update(options) {
      throw Error('customer.update was not implemented yet')
    },
    delete(options) {
      throw Error('customer.delete was not implemented yet')
    },
  }

  return {
    customer,
  }
}
