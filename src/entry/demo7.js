document.body.append('使用 reduce 实现数组的 flat 方法');

const selfFlat = function (depth = 1) {
  let arr = Array.prototype.slice.call(this);
  if (depth === 0) return arr;
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      return [...pre, ...selfFlat.call(cur, depth - 1)];
    } else {
      return [...pre, cur];
    }
  }, []);
};
Array.prototype.selfFlat = selfFlat;
const arr = [1, 2, [3, 5], [5, [6, 7]]];
console.log(arr.selfFlat());
console.log(arr.selfFlat(Infinity));
console.log(arr.flat());
console.log(arr.flat(Infinity));
// 原生的 flat 方法支持一个 depth 参数表示降维的深度，默认为 1 即给数组降一层维度,传入 Inifity 会将传入的数组变成一个一维数组,原理是每递归一次将 depth 参数减 1，如果 depth 参数为 0 时，直接返回原数组
