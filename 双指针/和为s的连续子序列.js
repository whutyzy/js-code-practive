var findContinuousSequence = function (target) {
    let i = 1,
        j = 2,
        sum = 3
    let result = []
    while (i < j) {
        if (sum < target) {
            j++
            sum += j
        } else if (sum === target) {
            result.push(range(i, j))
            sum = sum - i
            i++
        } else {
            sum -= i
            i++
        }
    }
    return result
}

function range(i, j) {
    const result = []
    for (let x = i; x <= j; x++) {
        result.push(x)
    }
    return result
}
