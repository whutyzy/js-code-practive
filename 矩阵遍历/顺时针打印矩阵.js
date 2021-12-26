var spiralOrder = function (matrix) {
    let yLength = matrix.length
    let xLength = matrix[0] ? matrix[0].length : 0
    let top = 0,
        left = 0,
        bottom = yLength - 1,
        right = xLength - 1
    let result = []
    while (true) {
        for (let x = left; x <= right; x++) {
            result.push(matrix[top][x])
            console.log()
        }
        top++
        if (top > bottom) break
        for (let y = top; y <= bottom; y++) {
            result.push(matrix[y][right])
        }

        right--
        if (left > right) break
        for (let x = right; x >= left; x--) {
            result.push(matrix[bottom][x])
        }
        bottom--
        if (top > bottom) break
        for (let y = bottom; y >= top; y--) {
            result.push(matrix[y][left])
        }
        left++
        if (left > right) break
    }
    return result
}
