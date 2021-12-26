function flat(arr, num = 1) {
    return num > 0
        ? arr.reduce(
              (pre, cur) =>
                  pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
              []
          )
        : arr.slice()
}

const arr = [1, 2, 3, 4, [1, 2, 3]]
// concat + 递归
function flat(arr) {
    let arrResult = []
    arr.forEach((item) => {
        if (Array.isArray(item)) {
            arrResult = arrResult.concat(flat(item))
        } else {
            arrResult.push(item)
        }
    })
    return arrResult
}

const flat = (arr) => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
    }, [])
}

// 栈思想
function flat(arr) {
    const result = []
    const stack = [].concat(arr) // 将数组元素拷贝至栈，直接赋值会改变原数组
    //如果栈不为空，则循环遍历
    while (stack.length !== 0) {
        const val = stack.pop()
        if (Array.isArray(val)) {
            stack.push(...val) //如果是数组再次入栈，并且展开了一层
        } else {
            result.unshift(val) //如果不是数组就将其取出来放入结果数组中
        }
    }
    return result
}
