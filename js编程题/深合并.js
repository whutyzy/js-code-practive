function each(obj, callback){
    Object.keys(obj).forEach(key => {
        callback(obj[key])
    })
  return obj
}

function merge(obj, target = {}) {
    each(target, (_, key) => {
        if (isObj(obj[key]) && !isObj(target[key]))
            throw new Error(`${key} in target must be object`)
        if (isObj(obj[key]) && isObj(target[key])) {
            obj[key] = merge(obj[key], target[key])
            return
        }
        obj[key] = target[key]
    })
    return obj
}

function isObj(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}
