var cuttingRope = function (n) {
    let dp = [0, 1, 2]
    for (let i = 3; i <= n; i++) {
        dp[i] = 0
        for (let j = 2; j < i; j++) {
            dp[i] = Math.max(dp[i], Math.max(j * (i - j), j * dp[i - j]))
        }
    }
    return dp[n]
}
