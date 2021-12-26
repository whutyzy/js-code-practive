function computed(getter) {
    let def = {}
    const watcher = new Watcher(getter, { computed: true })
    Object.defineProperty(def, 'value', {
        get() {
            watcher.dep.depend()
            return watcher.get()
        }
    })
    return def
}

class Watcher {
    constructor(getter, options = {}) {
        console.log(options)
        const { computed } = options
        this.computed = computed
        this.getter = getter
        if (computed) {
            this.dep = new Dep()
        } else {
            this.get()
        }
    }
    get() {
        pushTarget(this)
        this.value = this.getter()
        popupTarget()
        return this.value
    }
    update() {
        if (this.computed) {
            this.get()
            this.dep.notify()
        } else {
            this.get()
        }
    }
}

class Dep {
    constructor() {
        this.deps = new Set()
    }

    depend() {
        if (Dep.target) {
            this.deps.add(Dep.target)
        }
    }

    notify() {
        this.deps.forEach((watcher) => watcher.update())
    }
}

// 正在运行的watcher
Dep.target = null

function observe(data) {
    Object.keys(data).forEach((key) => {
        defineReactive(data, key)
    })
    return data
}

function defineReactive(data, key) {
    const dep = new Dep()
    let val = data[key]
    Object.defineProperty(data, key, {
        get() {
            dep.depend()
            return val
        },
        set(value) {
            val = value
            dep.notify()
        }
    })
    if (typeof val === 'object') {
        observe(val)
    }
}

const targetStack = []

function pushTarget(watcher) {
    if (Dep.target) {
        targetStack.push(Dep.target)
    }
    Dep.tarhet = watcher
}

function popupTarget() {
    targetStack.pop()
}

const data = observe({ name: 'husky' })
const fullName = computed(() => data.name + '---')
console.log(fullName.value)
new Watcher(() => {
    console.log(fullName.value)
})
data.name = '233333'
