function kthLargest(root, k) {
    let res
    function dfs(root) {
        if (!root || k < 0) return
        dfs(root.right)
        k--
        if (k === 0) {
            res = root.val
        }
        dfs(root.left)
    }
    dfs(root)
    return res
}
