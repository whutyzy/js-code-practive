function repeatFn(fn, repeatTimes, delay) {
    let currentRepeatTimes = 0
    return function loop() {
        try {
            const result = fn.apply(this, arguments)
            currentRepeatTimes++
            if (currentRepeatTimes >= repeatTimes) {
                return result
            } else {
                setTimeout(() => {
                    loop(...arguments)
                }, delay)
            }
        } catch (err) {
            console.error(err)
        }
    }
}

const repeatFunc = repeatFn(console.log, 4, 3000)
repeatFunc('hellworld')
