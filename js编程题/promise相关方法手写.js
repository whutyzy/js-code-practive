function _finally(cb) {
    let P = this.constructor
    return this.then(
        (value) => P.resolve(callback()).then(() => value),
        (reason) =>
            P.resolve(callback()).then(() => {
                throw reason
            })
    )
}

function _catch(cb) {
    let P = this.constructor
    return P.then(null, cb)
}

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let fuilledCount = 0
        let result = []
        const promiseLength = promises.length
        promises.forEach((_promise, index) => {
            Promise.resolve(_promise)
                .then((res) => {
                    result[index] = res
                    fuilledCount++
                    if (fuilledCount === promiseLength) {
                        resolve(result)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    })
}

function createAsyncPrint(timeout) {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (timeout % 2 === 1) {
                    console.log(timeout)
                    resolve('resolved', timeout)
                } else {
                    console.log('rejected', timeout)
                    reject(timeout)
                }
            }, timeout * 100)
        })
    }
}

function runPromiseByOrder(promiseFn) {
    promiseFn.reduce((p, current) => {
        return p.then(
            (res) => current(res),
            (err) => current(err)
        )
    }, Promise.resolve())
}

runPromiseByOrder([
    createAsyncPrint(1),
    createAsyncPrint(2),
    createAsyncPrint(3)
])
