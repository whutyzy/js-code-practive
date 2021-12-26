function exist(grid, target) {
    const yLength = grid.length
    const xLength = grid[0].length
    const visitedGrid = Array(yLength)
        .fill(0)
        .map(() => Array(xLength).fill(false))
    const startChar = target[0]
    for (let y = 0; y < yLength; y++) {
        for (let x = 0; x < xLength; x++) {
            if (grid[y][x] === startChar) {
                if (helper(x, y, 0)) {
                    return true
                }
            }
        }
    }
    return false

    function helper(x, y, index) {
        if (!isValidValue(x, y)) {
            return false
        }
        if (target[index] !== grid[y][x]) {
            return false
        } else if (index === target.length - 1) {
            return true
        }
        visitedGrid[y][x] = true
        let res =
            helper(x + 1, y, index + 1) ||
            helper(x - 1, y, index + 1) ||
            helper(x, y + 1, index + 1) ||
            helper(x, y - 1, index + 1)
        visitedGrid[y][x] = false
        return res
    }
    function isValidValue(x, y) {
        return (
            0 <= x &&
            x < xLength &&
            0 <= y &&
            y < yLength &&
            visitedGrid[y][x] === false
        )
    }
}
