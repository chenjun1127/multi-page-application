document.body.append('循环实现数组 filter 方法');

Array.prototype.selfFilter = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue;
    }
    fn.call(context, arr[i], i, this) && newArr.push(arr[i]);
  }
  return newArr;
};

const arr = [1, 2, 3];
console.log(arr.selfFilter(i => i > 2));
