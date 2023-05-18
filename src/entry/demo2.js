document.body.append('循环实现数组 map 方法');

Array.prototype.selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue;
    }
    newArr[i] = fn.call(context, arr[i], i, this);
  }
  return newArr;
};

const arr = [1, 2, 3];
console.log(arr.selfMap(i => i * 2));
