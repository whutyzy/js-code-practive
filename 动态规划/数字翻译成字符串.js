var translateNum = function (num) {
    let str = num.toString()
    let dp = [1, 1]
    for (let i = 2; i <= str.length; i++) {
        if (str[i - 2] === '1' || (str[i - 2] === '2' && str[i - 1] <= '5')) {
            dp[i] = dp[i - 1] + dp[i - 2]
        } else {
            dp[i] = dp[i - 1]
        }
    }
    return dp[str.length]
}
