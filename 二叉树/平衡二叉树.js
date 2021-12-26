var isBalanced = function (root) {
    return dfs(root) !== -1

    function dfs(node) {
        if (!node) return 0
        let left = dfs(node.left)
        if (left === -1) return -1
        let right = dfs(node.right)
        if (right === -1) return -1
        return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1
    }
}
