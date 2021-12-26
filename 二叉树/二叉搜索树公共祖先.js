var lowestCommonAncestor = function (root, p, q) {
    if (!root || root.val === p.val || q.val === root.val) return root
    if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q)
    }
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q)
    }
    return root
}







1`1`