/* eslint-env jest */

const generateMethods = ({ fbFetch = jest.fn() } = {}) => {
  jest.mock('./fastbill-fetch.js')
  require('./fastbill-fetch.js').mockImplementationOnce(() => fbFetch)

  return require('./api-methods.js')({
    email: 'email@example.com',
    apiKey: 'myKey'
  })
}

describe('apiMethods', () => {
  describe('customer', () => {
    describe('create', () => {
      it('must throw validator errors', () => {
        const { customer } = generateMethods({ isValid: false })

        expect(() => customer.create({ data: {} })).toThrow(
          'Prop "customer_type" may be "consumer". Received "undefined"; ' +
            'Prop "last_name" should be present. Received "undefined".'
        )
      })

      it('must uppercase all data before sending', () => {
        const fbFetch = jest.fn(() => Promise.resolve({}))
        const { customer } = generateMethods({ fbFetch })

        customer.create({
          data: {
            customer_type: 'consumer',
            last_name: 'Müller',
            first_name: 'Max'
          }
        })

        expect(fbFetch).toHaveBeenCalledTimes(1)
        expect(fbFetch).toHaveBeenCalledWith(
          expect.objectContaining({
            DATA: {
              CUSTOMER_TYPE: 'consumer',
              LAST_NAME: 'Müller',
              FIRST_NAME: 'Max'
            }
          })
        )
      })

      it('must lowercase all received data', () => {
        expect.assertions(1)
        const fbFetch = jest.fn(() =>
          Promise.resolve({
            RESPONSE: {
              CUSTOMER_ID: 123,
              STATUS: 'success'
            }
          })
        )

        const { customer } = generateMethods({ fbFetch })

        return customer
          .create({
            data: {
              customer_type: 'consumer',
              last_name: 'Müller'
            }
          })
          .then(result => {
            expect(result).toEqual({
              response: {
                customer_id: 123,
                status: 'success'
              }
            })
          })
      })
    })
  })
})
