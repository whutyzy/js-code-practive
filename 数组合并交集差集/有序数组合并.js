var merge = function (nums1, m, nums2, n) {
    var p = m + n - 1 //0
    var p1 = m - 1 //-1
    var p2 = n - 1 //0
    // 理论上来说，nums2应该全部填充进去，所以这里以p2作为条件
    while (p2 >= 0) {
        // nums1里面全是0的情况，比如[0], 0, [1], 1
        if (p1 < 0) {
            // 直接用nums2去填补nums1就好了
            nums1[p--] = nums2[p2--]
            // 只有nums2比nums1大才用nus2填补
        } else if (nums2[p2] > nums1[p1]) {
            nums1[p] = nums2[p2]
            p--
            p2--
            // 反之用nums1填补
        } else {
            nums1[p] = nums1[p1]
            p--
            p1--
        }
    }
}
