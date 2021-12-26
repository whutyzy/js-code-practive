function insertionSort(arr) {
    const length = arr.length
    for (let i = 1; i < length; i++) {
        let temp = arr[i]
        for (let j = i; j >= 0; j--) {
            if (arr[j - 1] > temp) {
                arr[j] = arr[j - 1]
            } else {
                arr[j] = temp
                break
            }
        }
    }
    return arr
}

function mergeSort(arr) {
    if (array.length < 2) {
        return array
    }

    let m = Math.floor(arr.length / 2)
    let left = mergeSort(arr.slicce(0, m))
    let right = mergeSort(arr.slice(m))
    return merge(left, right)
}

function merge(left, right) {
    let result = []
    let i = 0,
        j = 0
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++])
        } else {
            result.push(right[j++])
        }
    }
    if (i < left.length) {
        result.push(...left.slice(i))
    } else {
        result.push(...right.slice(j))
    }
    return result
}

function quickSort(arr) {
    if (arr.length <= 1) return arr
    let pivot = arr[arr.length - 1]
    let left = arr.filter((n, index) => n <= pivot && index !== arr.length - 1)
    return [...quickSort(left), pivot, ...quickSort(right)]
}

function quickSort(array, start = 0, end = array.length - 1) {
    if (end <= start) return array
    let pivotIndex = partition(array, start, end)
    quickSort(array, start, pivotIndex - 1)
    quickSort(array, pivotIndex + 1, end)
    return array
}

function partition(arr, start = 0, end = array.length - 1) {
    const pivot = arr[end]
    let j = start    
    for (let i = start; i <= end; i++) {
        if (arr[i] <= pivot) {
            swap(arr, i, j++)
        }
    }
    return j - 1
}

function swap(arr, i, j) {
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

class Heap {
    constructor(arr) {
        this.stack = arr
        this.sort()
    }
    buildMaxHeap(end = this.stack.length - 1) {
        const stack = this.stack
        const lastParentIndex = end % 2 === 1 ? (end - 1) / 2 : (end - 2) / 2
        for (
            let parentIndex = lastParentIndex;
            parentIndex >= 0;
            parentIndex--
        ) {
            const leftIndex = parentIndex * 2 + 1
            const rightIndex = parentIndex * 2 + 2
            if (rightIndex <= end) {
                if (stack[parentIndex] < stack[rightIndex]) {
                    this.swap(parentIndex, rightIndex)
                }
            }
            if (stack[parentIndex] < stack[leftIndex]) {
                this.swap(parentIndex, leftIndex)
            }
        }
    }
    top() {
        return this.stack[0]
    }
    pop() {
        const top = this.stack.shift()
        this.buildMaxHeap()
        return top
    }
    push(num) {
        this.stack.push(num)
        this.buildMaxHeap()
    }
    sort() {
        const length = this.stack.length
        for (let end = length - 1; end > 0; end--) {
            this.buildMaxHeap(end)
            this.swap(0, end)
        }
        return this.stack
    }
    swap(i, j) {
        const stack = this.stack
        ;[stack[i], stack[j]] = [stack[j], stack[i]]
    }
}

const maxHeap = new Heap([7, 5, 4, 8, 1, 9, 6, 3])

function callbackOrPromiseFn(fn) {
    return function (success,fail) {
        return new Promise((resolve, reject) => {
            let successFn = () => {
                if (success) success()
                resolve()
            }
            fn(successFn,failFn)
        })
    }
}
