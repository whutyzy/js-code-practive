function deepClone(target, map = new WeakMap()) {
    if (typeof target === 'object' && target !== null) {
        if (map.has(target)) {
            return map.get(target)
        } else {
            let cloneTarget
            map.set(target, cloneTarget)
            if (typeof target === 'function') {
                cloneTarget = function () {
                    return target.apply(this, arguments)
                }
            } else if (target instanceof RegExp) {
                cloneTarget = new RegExp(target)
            } else {
                cloneTarget = target instanceof Array ? [] : {}
                for (let key in target) {
                    cloneTarget[key] = deepClone(target[key])
                }
            }
            return cloneTarget
        }
    }
    return target
}

const _toString = Object.prototype.toString
function getType(obj) {
    return _toString.call(obj).slice(8, -1)
}

function BFSDeepClone(target) {
    let cloneTarget
    if (getType(target) !== 'Object' && getType(target) !== 'Array') {
        if (typeof target === 'function') {
            cloneTarget = cloneTarget = function () {
                return target.apply(this, arguments)
            }
        } else if (target instanceof RegExp) {
            cloneTarget = new RegExp(target)
        }
        return cloneTarget
    }

    cloneTarget = target instanceof Array ? [] : {}
    const origin = [target]
    const clone = [cloneTarget]
    const vistied = new WeakMap()

    while (origin.length) {
        const _obj = origin.shift()
        const cloneObj = clone.shift()

        Object.keys(_obj).forEach((key) => {
            const item = _obj[key]
            if (getType(item) === 'Object' || getType(item) === 'Array') {
                if (vistied.has(item)) {
                    cloneObj[key] = vistied.get(item)
                } else {
                    vistied.set(item, cloneObj[key])
                    cloneObj[key] = getType(item) === 'Object' ? {} : []
                    origin.push(item)
                    copy.push(cloneObj[key])
                }
            } else if (typeof item === 'function') {
                cloneObj[key] = eval(`(${item.toString()})`)
            } else {
                cloneObj[key] = item
            }
        })
    }

    return res
}

const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

function forEach(array, iteratee) {
    let index = -1
    const length = array.length
    while (++index < length) {
        iteratee(array[index], index)
    }
    return array
}

function isObject(target) {
    const type = typeof target
    return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
    return Object.prototype.toString.call(target)
}

function getInit(target) {
    const Ctor = target.constructor
    return new Ctor()
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe))
}

function cloneReg(targe) {
    const reFlags = /\w*$/
    const result = new targe.constructor(targe.source, reFlags.exec(targe))
    result.lastIndex = targe.lastIndex
    return result
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m
    const paramReg = /(?<=\().+(?=\)\s+{)/
    const funcString = func.toString()
    if (func.prototype) {
        const param = paramReg.exec(funcString)
        const body = bodyReg.exec(funcString)
        if (body) {
            if (param) {
                const paramArr = param[0].split(',')
                return new Function(...paramArr, body[0])
            } else {
                return new Function(body[0])
            }
        } else {
            return null
        }
    } else {
        return eval(funcString)
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe)
        case regexpTag:
            return cloneReg(targe)
        case symbolTag:
            return cloneSymbol(targe)
        case funcTag:
            return cloneFunction(targe)
        default:
            return null
    }
}

function clone(target, map = new WeakMap()) {
    // 克隆原始类型
    if (!isObject(target)) {
        return target
    }

    // 初始化
    const type = getType(target)
    let cloneTarget
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type)
    } else {
        return cloneOtherType(target, type)
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target)
    }
    map.set(target, cloneTarget)

    // 克隆set
    if (type === setTag) {
        target.forEach((value) => {
            cloneTarget.add(clone(value, map))
        })
        return cloneTarget
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map))
        })
        return cloneTarget
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value
        }
        cloneTarget[key] = clone(target[key], map)
    })

    return cloneTarget
}
