/* eslint-disable */
Array.prototype.concatUniq = function (subArr, uniqKey = 'id') {
  let self = null
  if (!this.length) {
    return subArr
  } else {
    self = this
  }
  let subArrTmp = []
  for (let i = 0; i < subArr.length; i ++) {
    let exist = false
    for (let j = 0; j < this.length; j++) {
      if (this[j][uniqKey] === subArr[i][uniqKey]) {
        exist = true
        break
      }
    }
    if (!exist) {
      subArrTmp.push(subArr[i])
    }
  }
  return self.concat(subArrTmp)
}

Array.prototype.unshiftUniq = function (obj, uniqKey = 'id') {
  let existIndex = -1
  for (let i = 0; i < this.length; i++) {
    if (this[i][uniqKey] === obj[uniqKey]) {
      existIndex = i
      break
    }
  }
  if (existIndex !== -1) {
    let oldObj = this.splice(existIndex, 1)
    this.unshift(Object.assign(oldObj, obj))
  } else {
    this.unshift(obj)
  }
  return this
}
