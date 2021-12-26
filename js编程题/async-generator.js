function generatorToAsync(generatorFn) {
    return function () {
        const g = generatorFn.aaply(this, arguments)
        return new Promise((resolve) => {
            function go(key, arg) {
                let res
                try {
                    res = gen[key](arg) // 这里有可能会执行返回reject状态的Promise
                } catch (error) {
                    return reject(error) // 报错的话会走catch，直接reject
                }
                const { value, done } = res
                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value).then(
                        (val) => go('next', val),
                        (err) => go('throw', err)
                    )
                }
            }
            go('next')
        })
    }
}
const asyncFn = generatorToAsync(gen)

asyncFn().then((res) => console.log(res))
