function findLongest(nums) {
    if (nums.length <= 1) return nums.length
    nums = nums.sort((a, b) => a - b)
    let left = 0
    let right = 1
    let maxLength = 1
    let repeat = 0
    while (right < nums.length) {
       if (nums[right] - nums[right - 1] === 0) {
            repeat++
        } else if (nums[right] - nums[right - 1] !== 1) {
            maxLength = Math.max(maxLength, right - left - repeat)
            // console.log(right)
            repeat = 0
            left = right
        }
        right++
    }
    maxLength = Math.max(maxLength, right - left - repeat)
    return maxLength
}

findLongest([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6])
findLongest([100, 4, 200, 1, 3, 2])
