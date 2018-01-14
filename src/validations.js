'use strict'

module.exports = {
  getConsumerErrors(obj) {
    const errs = []

    if (obj.CUSTOMER_TYPE === 'business') {
      return null
    }

    if (obj.CUSTOMER_TYPE !== 'consumer') {
      errs.push(
        `Prop "customer_type" may be "consumer". Received "${
          obj.CUSTOMER_TYPE
        }"`
      )
    }

    if (!obj.LAST_NAME) {
      errs.push(
        `Prop "last_name" should be present. Received "${obj.LAST_NAME}".`
      )
    }

    return errs.length ? errs : null
  },
}
