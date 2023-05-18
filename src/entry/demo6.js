document.body.append('循环实现数组的 some 方法');

Array.prototype.selfSome = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  if (!arr.length) return false;
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue;
    }
    let res = fn.call(context, arr[i], i, this);
    if (res) return true;
  }
  return false;
};

const arr = [1, 2, 3];
console.log(arr.selfSome(i => i > 1));
