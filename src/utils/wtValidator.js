import wtUtil from '@/utils/wtUtil'

const wtValidator = {
  ValidatorNotBlank: (rule, value, callback) => {
    if (wtUtil.isBlank(value)) {
      callback(new Error(''))
    } else {
      callback()
    }
  },
  ValidatorWtUpload: (rule, value, callback) => {
    console.log('this', this)
    console.log('rule', rule)
    console.log('value', value)
    callback()
  }
}

export default wtValidator
