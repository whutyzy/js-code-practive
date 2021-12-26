var reverseList = function (head) {
    let pre = null
    let cur = head
    while (cur !== null) {
        let temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    return pre
}
