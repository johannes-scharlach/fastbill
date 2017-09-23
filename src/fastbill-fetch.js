'use strict'

const fetch = require('node-fetch')

const API_ENDPOINT = 'https://my.fastbill.com/api/1.0/api.php'

module.exports = ({ email, apiKey }) => obj =>
  fetch(API_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'conten-type': 'application/json',
      authentication: `Basic ${Buffer.from(`${email}:${apiKey}`).toString(
        'base64'
      )}`
    }
  })
