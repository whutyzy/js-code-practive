const arr = [1, 2, 3]
arr.reduce((p, x) => {
    return p.then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(x)
                resolve()
            }, 1000)
        })
    })
}, Promise.resolve())

function asyncPrint(str) {
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log(str)
            resolve(str)
        }, 1000)
    })
}

class PromisePool {
    constructor(limit, fn) {
        this.limit = limit
        this.fn = fn
        this.args = []
        this.running = 0
    }
    start(args) {
        this.args = args
        return new Promise((resolve) => {
            this.resolve = resolve
            this.run()
        })
    }
    run() {
        const args = this.args
        while (args.length > 0 && this.running < this.limit) {
            this.running++
            this.fn(args.shift()).then(() => {
                this.running--
                if (args.length > 0) {
                    this.run()
                } else if (this.running === 0) {
                    this.resolve()
                }
            })
        }
    }
}

class Query {
    constructor(dataList) {
        this.dataList = dataList
    }
    where(conditions) {
        const keyList = Object.keys(conditions)
        const dataList = this.dataList.filter((data) => {
            return keyList.every((k) => conditions[k].test(data[k]))
        })
        return new Query(dataList)
    }
    orderBy(key, orderType) {
        const func = (a, b) =>
            (a[key] - b[key]) * (orderType == 'desc' ? -1 : 1)
        const list = [...this.dataList].sort(func)
        return new Query(list)
    }
}

class Man {
    constructor(name) {
        this.name = name
        this.callbacks = []
        console.log('i am' + name)
    }
    eat(food) {
        function _eat(food) {
            console.log('i am eating' + food)
        }
        this.callbacks.push(_eat.bind(this, food))
        return this
    }
    sleep(time) {
        setTimeout(() => {
            console.log('i am waiting' + time)
            this.callbacks.forEach((cb) => cb())
        }, time)
        return this
    }
}

function LazyMan(name) {
    return new Man(name)
}
LazyMan('husky').eat('lunch').sleep('1000').eat('junk food')



class Jquery{
    constructor(dom) {
        this._dom = dom
    }
    parent() {
        return new Jquery(this._dom.parent)
    }
    children() {
    
    }
}