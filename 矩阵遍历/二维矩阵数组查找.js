var findNumberIn2DArray = function (arr, target) {
    if (arr.length === 0) return false
    let yLength = arr.length
    let xLength = arr[0].length
    let startX = xLength - 1
    let startY = 0
    let result = false
    while (startX >= 0 && startY >= 0 && startX < xLength && startY < yLength) {
        const current = arr[startY][startX]
        if (current > target) {
            startX--
        } else if (current < target) {
            startY++
        } else {
            return true
        }
    }
    return result
}
