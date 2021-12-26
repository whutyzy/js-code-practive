// add(1)(2)(3)()
function add(n) {
    return function (m) {
        if (arguments.length === 0) {
            return n
        } else {
            return add(n + m)
        }
    }
}
add(1)(2)(3)()

// add(1)(2)
function add(n) {
    var fn = function (m) {
        return add(n + m)
    }
    fn.valueOf = function () {
        return n
    }
    fn.toString = function () {
        return '' + n
    }
    return fn
}

function curry(fn, ...args) {
    if (args.length === fn.length) {
        return fn.apply(this, args)
    }
    function h(...args2) {
        const args3 = args.concat(args2)
        return curry(fn, ...args3)
    }
    return h
}
