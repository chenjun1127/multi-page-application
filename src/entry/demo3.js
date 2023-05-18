document.body.append('使用 reduce 实现数组 map 方法');

Array.prototype.selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  return arr.reduce((pre, cur, index) => {
    return [...pre, fn.call(context, cur, index, this)];
  }, []);
};

const arr = [1, 2, 3];
console.log(arr.selfMap(i => i * 2));
