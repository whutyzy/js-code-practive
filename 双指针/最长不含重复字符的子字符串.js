var lengthOfLongestSubstring = function (s) {
    let left = 0
    let right = 0
    let maxLength = 0
    while (right < s.length) {
        const char = s[right]
        if (map.has(char)) {
            left = Math.max(map.get(char),left)
        }
        map.set(char, right)
        maxLength = Math.max(maxLength,right-left+1)
    }
    return maxLength
}

