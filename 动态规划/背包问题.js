/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 // dp[i][j] = max(dp[i-1][j],dp[i][j-weights[i]]+values[i])
var coinChange = function (coins, amount) {
    // 完全背包问题
    let n = coins.length
    // 1、初始化dp,amount==0时，dp[amount]=0
    let dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    // 先遍历物品，再遍历背包
    for (let i = 0; i < n; i++) {
        // 遍历n种物品
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j])
        }
    } // end of for
    return dp[amount] === Infinity ? -1 : dp[amount]
}

// 0 1 问题
// dp[i][j] = max(dp[i-1][j],dp[i-1][j-weights[i]]+values[i])
function maxValue(weights, values, packageWeight) {
    const n = values.length
    let dp = new Array(packageWeight + 1).fill(0)

    for (let i = 0; i < n; i++) {
        for (let j = packageWeight; j >= weights[i]; j--) {
            
            dp[j] = Math.max(dp[j - weights[i]] + values[i], dp[j])
        }
    }

    return dp
}

maxValue([4, 2, 3], [4, 2, 3], 5)
