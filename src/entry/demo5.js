document.body.append('使用 reduce 实现数组 filter 方法');

Array.prototype.selfFilter = function (fn, context) {
  return this.reduce((pre, cur, index) => {
    return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre];
  }, []);
};

const arr = [1, 2, 3];
console.log(arr.selfFilter(i => i > 2));
