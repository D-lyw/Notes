#

## Object 对象相关函数

### Object.create()

```javascript
// 以传入的对象为原型返回一个新的对象
Object.create(proto, [propertiesObject])

// 简单内部实现逻辑
Object.create = function(obj) {
  const Fun = function() {}
  Fun.prototype = obj

  return new Fun()
}
```

使用例子一：

```javascript
function Shape() {
  this.x = 0
  this.y = 0
}

Shape.prototype.move = function(x, y) {
  this.x += x
  this.y += y
  console.info('Shape moved.')
}

function Rectangle() {
  Shape.call(this)
}

Rectangle.prototype = Object.create(Shape.prototype)

Rectangle.prototype.constructor = Rectangle

var rect = new Rectangle()
```

#### 相关链接

- [MDN | Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

### Object.assign()

## Array 对象相关函数

### Array.from()

### Array.isArray()

### **Array.prototype.reduce()**

对数组中的每个元素执行传入的`reducer`函数，并将其结果汇总为一个单个返回值

```javascript
arr.reduce(reducer(accumulator, currentValue[, index[, array]])[, initialValue])

// 简单内部实现原理
Array.prototype.reduce = (reducer, ininialValue) => {

}
```

使用例子一：累加求和

```javascript
[1, 2, 3, 4].reduce((res, curValue) => {
  res + curValue
}, 0)
```

使用例子二：依次执行多个函数，函数执行返回值作为下一个函数的参数

```javascript
// pipe1
const pipe = (...funcs) => {
  return initialVal => funcs.reduce((res, func) => func(res), initialVal)
}
const example = pipe(func1, func2, func3, func4)

// pipe2
const pipe2 = [func1, func2, func3, func4].reduce((a, b) => (...args) => a(b(...args)))   // () => func1(func2(func3(func4())))
```

#### 相关链接

- [MDN | Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

## 函数式编程

### 函数组合 compose

```javascript
const compose = (...funcs) => {
  if (funcs.length === 0) {
    return args => args
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
}
```

## 其他

### 洋葱模型中间件机制
