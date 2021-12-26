 // left instanceof right
function _instanceof(left, right) {
  // 构造函数原型
  const prototype = right.prototype
  // 实列对象属性，指向其构造函数原型
  left = left.__proto__
  // 查实原型链
  while (true) {
    // 如果为null，说明原型链已经查找到最顶层了，真接返回false
    if (left === null) {
      return false
    }
    // 查找到原型
    if (prototype === left){
      return true
    }
    // 继续向上查找
    left = left.__proto__
  }
}

const str = "abc"
_instanceof(str, String) // true

