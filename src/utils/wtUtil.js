const wtUtil = {
  isBlank: (str) => {
    return str == null || /^\s*$/.test(str)
  },
  isNotBlank: (str) => {
    return !wtUtil.isBlank(str)
  },
  debounce: (func, delay) => {
    let timer
    return function(...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}

export default wtUtil

