/**
 *以p0为参考点，如果multi大于0，则p2在p1的逆时针方向，反正，如果multi小于0，则p2在p1的顺时针方向，特殊的，当multi等于0，p1、p2、p0三点共线。
 */
function getCross(pointA, pointB, point) {
    let x1 = pointA.x - point.x
    let y1 = pointA.y - point.y
    let x2 = pointB.x - point.x
    let y2 = pointB.y - point.y
    return x1 * y2 - x2 * y1
}

function isPointMartix(p, p1, p2, p3, p4) {
    return (
        getCross(p1, p2, p) * getCross(p3, p4, p) >= 0 &&
        getCross(p2, p3, p) * getCross(p4, p1, p) >= 0
    )
}

function isPointInTriangle(p, a,b,c) {
    return (
        getCross(a, c, b) * getCross(p, c, b) > 0 &&
        getCross(p2, p3, p) * getCross(p4, p1, p) > 0 &&
        getCross(p2, p3, p) * getCross(p4, p1, p) > 0
    )
}