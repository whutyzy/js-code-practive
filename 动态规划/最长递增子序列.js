const lengthOfLIS = (nums) => {
    // 假如输入的数组长度小于等于 1 ，那么就代表为空数组或者只有一位，那么直接返回该数组长度即可
    if (nums.length <= 1) return nums.length
    let max = 0
    let dp = Array(nums.length).fill(1)
    // 遍历所有数组元素
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; i < i; j++){
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i],dp[j]+1)
            }
             max = Math.max(max , dp[i]);
        }
       
    }
   
    return 
}
