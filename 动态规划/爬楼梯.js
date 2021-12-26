var numWays = function (n) {
    let result = 0
    let prev1 = 2
    let prev2 = 1

    for (let i = 3; i <= n; i++) {
        result = prev1 + prev2
        
        prev2 = prev1
        prev1 = result
    }
    return result
}
