var mirrorTree = function (root) {
    if (!root) return null
    return {
        val: root.val,
        left: mirrorTree(root.right),
        right: mirrorTree(root.left)
    }
}
