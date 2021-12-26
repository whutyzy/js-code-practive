function lowestCommonAncestor(root, p, q) {
    if (!root || p.val === root.val || q.val === root.val) {
        return root
    }
    const pqInLeft = lowestCommonAncestor(root.left, p, q)
    const pqInRight = lowestCommonAncestor(root.right, p, q)

    if (pqInLeft === null) {
        return pqInRight
    } else if (pqInRight === null) {
        return pqInLeft
    } else {
        return root
    }
}

function _lowestCommonAncestor(root, p, q) {
    if (!root || p.val === root.val || q.val === root.val) {
        return root
    }
    const pqInLeft = find(root.left, p, q)
    const pqInRight = find(root.right, p, q)

    if (!pqInLeft) {
        return lowestCommonAncestor(root.right,p,q)
    } else if (!pqInRight) {
        return lowestCommonAncestor(root.left, p, q)
    } else {
        return root
    }
}

function find(root, p, q) {
    if (!root || p.val === root.val || q.val === root.val) {
        return root
    }
    const left = find(root.left, p, q)
    const right = find(root.right, p, q)
    return left ? left : right
}


