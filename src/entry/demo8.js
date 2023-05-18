document.body.append('函数柯里化');

const curry = fn => {
  if (fn.length <= 1) return fn;
  const generator = (...args) => {
    if (fn.length === args.length) {
      return fn(...args);
    } else {
      return (...args2) => {
        return generator(...args, ...args2);
      };
    }
  };
  return generator;
};

const add = (a, b, c, d) => a + b + c + d;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)(4));
