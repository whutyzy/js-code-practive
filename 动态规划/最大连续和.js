var maxSubArray = function (nums) {
    let dp = [nums[0]]
    let max = dp[0]
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(0, dp[i - 1]) + nums[i]
        max = Math.max(dp[i], max)
    }
    return max
}
