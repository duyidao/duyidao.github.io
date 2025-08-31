## 第十二章 Proxy

在 JavaScript 中，`Proxy` 对象提供了一种全新的能力，允许拦截和自定义对象的基本操作。这种代理机制使得开发者能够精确控制对象的行为，从属性读取到函数调用。

### 概述

`Proxy` 用于修改某些操作的默认行为，可以理解为在目标对象之前架设一层拦截，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

`Proxy` 这个词的中文意思是代理，用在这里表示由它来 “代理” 某些操作，可以译为 “代理器”。

```javascript
var obj = new Proxy({},{
  get:function(target,property){
    return 35
  }
})
proxy.time //35
proxy.name //35
proxy.title //35
```

上面代码中，`Proxy` 接受两个参数，第一个参数是所要代理的目标对象，即上面例子中的空对象，第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，函数的参数依次为目标对象、所要代理的属性和代理方法提供的参数。

原生对象的默认行为，会通过上面的拦截，得到定制化的结果，由于拦截的函数始终返回 35，因此访问任何属性返回的都是35。

```javascript
var obj = new Proxy({},{
  get:function(target,key,receiver){
    console.log('getting '+key)
    return Reflect.get(target,key,receiver)
  },
  set:function(target,key,value,receiver){
    console.log('setting '+key)
    return Reflect.set(target,key,value,receiver)
  }
})
obj.count = 1; // getting count
++obj.count; // getting count // setting count
```

先不看 `Reflect` 和这段代码做的什么，重心来看一下运行的结果。上面的代码说明，`Proxy` 实际上重载（ `overload` ）了点运算符，即用自己的定义覆盖了语言的原始定义。

### 实例方法

下面一一介绍 `Proxy` 支持的所有拦截操作。如果没有设置拦截，那么默认的行为就是原来语言的行为，以 `get()` 为例，如果没有设置 `get()` 拦截，访问对象属性会返回对象的属性值。

#### get()

`get()` 方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

```javascript
var person = {
  name:'张三'
}
var proxy = new Proxy(person,{
  get:function(target,property){
    if(property in target){
      return target[property]
    }
    else{
      throw new ReferenceError('Property "' + property + '" does not exist.')
    }
  }
})
proxy.name // '张三'
proxy.age // 抛出一个错误
```

上面代码中，`Proxy` 对象 `proxy` 拦截对 `person` 对象属性 `age` 的读取操作，如果该属性不存在，就会抛出一个错误。如果没有 `get()` 拦截，访问不存在的属性，只会返回 `undefined`。

`get()` 方法可以继承。

```javascript
let proto = new Proxy({},{
  get:function(target,property){
    return 35
  }
})
let obj = Object.create(proto)
obj.time //35
```

上面代码中，拦截操作定义在 `proto` 对象上面，所以如果读取 `obj` 对象继承的属性，拦截会生效。

如果目标对象自身的某个属性，不可写且不可配置，那么 `Proxy` 对应的 `get()` 拦截会报错。

```javascript
const target = Object.defineProperties({},{
  a:{
    value:37,
    writable:false,
    configurable:false
  }
})
const handler = {
  get(target,prop){
    return 27
  }
}
const proxy = new Proxy(target,handler);
proxy.a // TypeError: 'get' on proxy: property 'a' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '37' but got '27')
```

#### set()
`set()` 方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

假定 `person` 对象有一个 `age` 属性，该属性应该是一个不大于 200 的整数，那么可以使用 `Proxy` 拦截这个属性，如果赋值的数值不满足要求，就抛出一个错误，从而实现数据的验证和转换。

```javascript
let validator = {
  set:function(obj,prop,value){
    if(prop === 'age'){
      if(!Number.isInteger(value)){
        throw new TypeError('The age is not an integer')
      }
      if(value > 200){
        throw new RangeError('The age seems invalid')
      }
    }
    obj[prop] = value
    return true
  }
}
let person = new Proxy({
  age:18
}, validator);
person.age = 100
person.age // 100
person.age = 'young' // 抛出错误
person.age = 300 // 抛出错误
```

上面代码中，`validator` 对象有一个 `set` 方法，用来拦截对 `person` 对象属性 `age` 的赋值操作。如果不符合要求，就抛出一个错误，否则就返回赋值结果，并且返回 `true`，表示赋值成功。

> [!WARNING] ⚠ 注意
> 严格模式下，`set()` 必须返回 `true`，否则会报错。

有时候需要在对象内做内部属性设置，这些内部属性不希望让使用者外部修改，这时可以使用 `set()` 方法拦截，这些属性统一下划线 `_` 开头，表示这些属性不应该被外部使用。

```javascript
let handler = {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to set private "${key}" property`);
    }
    // 否则就照常设置属性
    target[key] = value;
    return true;
  }
};
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop // undefined
proxy._prop = 1; // 抛出错误 Invalid attempt to set private "_prop" property
```

> [!WARNING] ⚠ 注意
> 如果目标对象自身的某个属性不可写也不可配置，那么 `set` 不得改变这个属性的值，只能返回同样的值，否则报错。

#### apply()
`apply` 方法拦截函数的调用、`call` 和 `apply` 操作。该方法接受三个参数，分别是目标对象、目标对象的上下文对象（`this`）和目标对象的参数数组。

```javascript
var handler = {
  apply: function(target, ctx, args){
    return Reflect.apply(...arguments)
  }
}
```

下面举个例子🌰：

```javascript
function fn(){
  return '我是fn函数的返回'
}
let handler = {
  apply:function(){
    return '我是proxy的apply拦截'
  }
}
let proxy = new Proxy(fn,handler)
proxy() // '我是proxy的apply拦截'
```

#### has()
`has()` 方法用来拦截 `HasProperty` 操作，即判断对象是否具有某个属性时，这个方法会生效，例如 `in` 运算符。具体来说，`has()` 方法可以接受两个参数，分别是目标对象、需查询的属性名。

```javascript
var handler = {
  has(target, key){
    if(key[0] === '_'){
      return false
    }
    return key in target
  }
}
var target = {
  _prop: 'foo',
  prop: 'foo'
}
var proxy = new Proxy(target, handler)
'_prop' in proxy // false
'prop' in proxy // true
```

如果原对象不可配置或者禁止扩展，这时 `has` 拦截会报错。

```js
let obj = {a: 10}
Object.preventExtensions(obj)

let p = new Proxy(obj, {
  has(target, prop) {
    return false;
  }
})

'a' in p // TypeError is thrown
```

但是 `has` 拦截对 `for...in` 循环无效，即 `for...in` 循环不会触发 `has`。

::: code-group
```js [p1]
let stu1 = {name: 'aa', age: 18}

let handler = {
  has(target,key) {
    if(key === 'age' &&& target[key] < 30){
      return 'young'
    }
    return 'old'
  }
}

let p1 = new Proxy(stu1, handler)

'age' in p1 // 'young'

for(let key in p1){
    console.log(p1[key]) // 'aa' 18
}
```
```js [p2]
let stu2 = {name: 'bb', age: 88}

let handler = {
  has(target,key) {
    if(key === 'age' &&& target[key] < 30){
      return 'young'
    }
    return 'old'
  }
}

let p2 = new Proxy(stu2, handler)

'age' in p2 // 'old'

for(let key in p2){
  console.log(p2[key]) // 'bb' 88
}
```
:::

> [!WARNING] ⚠ 注意
> `has()` 方法拦截的是 `HasProperty` 操作，而不是 `HasOwnProperty` 操作，即 `has()` 方法不判断一个属性是对象自身的属性，还是继承的属性。

#### construct()
`construct` 方法用于拦截 `new` 命令，其接受三个参数，分别是目标对象 `target`、构造函数的参数对象 `args` 和 `new` 命令的上下文对象（`newTarget`）。下面是拦截对象的写法：
```javascript
var handler = {
  construct(target, args, newTarget){
    return new target(...args)
  }
}
```

下面举个例子🌰：

```javascript
let p = new Proxy(function(){}, {
  construct: function(target, args){
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
})

new p(1) // 'called: 1' { value: 10}
```

注意，`construct` 方法返回的必须是一个对象，否则会报错。

```js
var p = new Proxy(function() {}, {
  construct: function(target, args) {
    return 1;
  }
});

new p() // TypeError: 'construct' on proxy: trap returned non-object ('1')
```

#### deleteProperty()

`deleteProperty` 方法用于拦截 `delete` 操作，如果这个方法抛出错误或者返回 `false`，当前属性就无法被 `delete` 命令删除。

```js
var handler = {
  deleteProperty(target, key){
    if(key[0] === '_'){
      throw new Error(`Invalid attempt to delete private "${key}" property`)
    }
    delete target[key]
    return true
  }
}

var target = {
  _prop: 'foo',
  prop: 'foo'
}

var proxy = new Proxy(target, handler)
delete proxy._prop // Error: Invalid attempt to delete private "_prop" property
delete proxy.prop // true
```

> [!WARNING] ⚠ 注意
> 目标对象自身的不可配置的属性不能被 `deleteProperty` 方法删除，否则会报错。

#### defineProperty()

`defineProperty` 方法拦截了 `Object.defineProperty` 操作。
```js
var handler = {
  defineProperty(target, key, descriptor){
    return false
  }
}

var target = {}
var proxy = new Proxy(target, handler)
Object.defineProperty(proxy, 'foo', {value: 1}) // TypeError: 'defineProperty' on proxy: trap returned falsish for property 'foo'
```
由于 `defineProperty` 返回 `false`，所以添加新属性会抛出错误。

> [!WARNING] ⚠ 注意
> 如果目标对象不可扩展（`extensible`），则 `defineProperty` 不能增加目标对象上不存在的属性，否则也会报错。另外，如果目标对象的某个属性不可写（`writable`）或不可配置（`configurable`），则 `defineProperty` 方法不得改变这两个设置。

#### getOwnPropertyDescriptor()
`getOwnPropertyDescriptor` 方法拦截 `Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者 `undefined`。

```js
var handler = {
  getOwnPropertyDescriptor(target, key){
    if(key[0] === '_'){
      return
    }
    return Object.getOwnPropertyDescriptor(target, key)
  }
}

var target = {
  _foo: 'bar',
  baz: 'qux'
}

var proxy = new Proxy(target, handler)
Object.getOwnPropertyDescriptor(proxy, 'wat') // undefined
Object.getOwnPropertyDescriptor(proxy, '_foo') // undefined
Object.getOwnPropertyDescriptor(proxy, 'baz') // qux
```

#### getPrototypeOf()

`getPrototypeOf` 方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

下面是一个例子。
```js
var proto = {}
var p = new Proxy({}, {
  getPrototypeOf(target){
    return proto
  }
})
Object.getPrototypeOf(p) === proto // true
```

> [!WARNING] ⚠ 注意
> `getPrototypeOf` 方法只能返回对象或者 `null`，否则会报错。另外，如果目标对象不可扩展（`extensible`）， `getPrototypeOf` 方法必须返回目标对象的原型对象。

#### ownKeys()

`ownKeys` 方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`

举个例子🌰：

```js
let obj = {
  a: 1,
  b: 2,
  c: 3,
}
let handler = {
  ownKeys(target){
    return ['a', 'c']
  }
}
let proxy = new Proxy(obj, handler)
Object.keys(proxy) // ["a", "c"]
```

上述代码由于对 `obj` 对象做了 `ownKeys` 拦截，只返回 `a` 和 `c` 属性，而 `b` 属性则被排除了。

`ownKeys` 方法有以下几个需要注意的点：

1. 在使用 `Object.keys()` 方法时,有三类属性会被 `ownKeys` 方法自动过滤，不会返回。分别为：目前对象不存在的属性、属性名为 `Symbol` 值的属性、不可遍历（`enumerable`）的属性。
   ```js
   let obj = {
      a: 1,
      b: 2,
      c: 3,
      [Symbol('foo')]: 4,
    }
    Object.defineProperty(obj, 'key', {
      enumerable: false,
      value: 4
    })
    let handler = {
      ownKeys(target){
        return ['a', 'c', Symbol('foo'), 'd', 'key']
      }
    }
    let proxy = new Proxy(obj, handler)
    Object.keys(proxy) // ["a", "c"]
   ```
   上述代码因为 `d` 属性在 `obj` 对象中不存在，属性名 `foo` 是 `Symbol` 值的属性，`key` 属性是不可遍历属性，因此均被 `ownKeys` 方法被过滤了。

2. `ownKeys` 方法可以拦截 `Object.getOwnPropertyNames()`。
   ```js
    let obj = {
      a: 1,
      b: 2,
      c: 3,
    }
    let handler = {
      ownKeys(target){
        return ['a', 'c']
      }
    }
    let proxy = new Proxy(obj, handler)
    Object.getOwnPropertyNames(proxy) // ["a", "c"]
   ```

3. `ownKeys` 方法返回的数组成员只能是字符串或 `Symbol`，否则会报错。
   ```js
    let obj = {}

    let handler = {
      ownKeys(target){
        return [123, true, undefined, null, {}, []]
      }
    }
    let proxy = new Proxy(obj, handler)
    Object.getOwnPropertyNames(proxy) // TypeError: 123 is not a valid property name
   ```

4. 如果目标对象自身包含不可配置的属性，则 `ownKeys` 方法返回的数组之中必须包含该属性，否则会报错。
   ```js
    let obj = {}
    Object.defineProperty(obj, 'key', {
      configurable: false,
      enumerable: true,
      value: 4
    })
    let handler = {
      ownKeys(target){
        return ['a', 'c']
      }
    }
    let proxy = new Proxy(obj, handler)
    Object.getOwnPropertyNames(proxy) // TypeError: 'ownKeys' on proxy: trap returned did not include 'key'
   ```

5. 如果目标对象是不可扩展的（`non-extensible`），则 `ownKeys` 方法返回的数组之中必须包含目标对象的所有属性，且不能包含多余的属性，否则会报错。
   ```js
    let obj = {
      a: 1,
      b: 2,
      c: 3,
    }
    Object.preventExtensions(obj)
    let handler = {
      ownKeys(target){
        return ['a', 'c', 'd']
      }
    }
    let proxy = new Proxy(obj, handler)
    Object.getOwnPropertyNames(proxy) // TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
   ```

#### preventExtensions()

`preventExtensions` 方法拦截 `Object.preventExtensions` 操作。该方法必须返回一个布尔值，否则会被自动转为布尔值。

> [!WARNING] ⚠ 注意
> `preventExtensions` 方法有一个限制，只有目标对象不可扩展时，`preventExtensions` 方法才能返回 `true`，否则会报错。
> ```js
> let p = new Proxy({}, {
>   preventExtensions: function(target){
>     return true
>   }
> })
> Object.preventExtensions(p) // TypeError: 'preventExtensions' on proxy: trap returned falsish
> ```
> 为了防止这种问题，需要在 `proxy.preventExtensions` 方法中调用一次 `Object.preventExtensions`。

#### isExtensible()

`isExtensible` 方法拦截 `Object.isExtensible` 操作。

```js
var p = new Proxy({}, {
  isExtensible: function(target){
    console.log('called')
    return true
  }
})

Object.isExtensible(p) // "called"
```

> [!WARNING] ⚠ 注意
> `isExtensible` 方法只能返回布尔值，返回值会自动被转换为布尔值。`isExtensible` 方法有一个强限制，它的返回值必须与目标对象的 `isExtensible` 属性保持一致，否则会抛出错误。

#### setPrototypeOf()

`setPrototypeOf` 方法用于拦截 `Object.setPrototypeOf` 方法。该方法接受两个参数，第一个参数是目标对象，第二个参数是原型对象。

```js
var handler = {
  setPrototypeOf(target, proto){
    throw new Error('Changing the prototype is forbidden')
  }
}
var proto = {}
var target = function(){}
var proxy = new Proxy(target, handler)
Object.setPrototypeOf(proxy, proto) // Error: Changing the prototype is forbidden
```

> [!WARNING] ⚠ 注意
> `setPrototypeOf` 方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），`setPrototypeOf` 方法不得改变目标对象的原型。否则会报错。

### Proxy.revocable()

`Proxy.revocable` 方法返回一个可取消的 `Proxy` 实例。

```js
let target = {}
let handler = {}
let {proxy, revoke} = Proxy.revocable(target, handler)
proxy.foo = 123
proxy.foo // 123
revoke()
proxy.foo // TypeError: Revoked
```

> [!WARNING] ⚠ 注意
> `Proxy.revocable` 方法返回一个对象，该对象的 `proxy` 属性是 `Proxy` 实例，`revoke` 属性是一个函数，可以取消 `Proxy` 实例。一旦 `revoke` 函数执行，`Proxy` 实例就会失效。

使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

### this 问题

在 `Proxy` 代理的情况下，目标对象内部的 `this` 关键字会指向 `Proxy` 实例。

```js
var target = {
  m: function(){
    console.log(this === proxy)
  }
}
var proxy = new Proxy(target, {})
target.m() // false
proxy.m() // true
```

有些原生对象的 `this` 错误，只有在 `Proxy` 下才能修复，比如 `Date` 对象。

```js
var d = new Date()
d.getTime() // 1488488835657
var proxy = new Proxy(d, {})
proxy.getTime() // 1488488835657
```

### 总结

`Proxy` 是 JavaScript 中用于拦截和修改对象操作的代理器，它允许在访问对象属性或方法时进行自定义行为。

`Proxy` 接受两个参数：目标对象和处理程序对象，后者定义了拦截操作的行为。拦截操作包括属性读取（`get`）、属性赋值（`set`）、函数调用（`apply`）、属性存在性检查（`has`）、构造函数调用（`construct`）、属性删除（`deleteProperty`）、属性描述符获取（`getOwnPropertyDescriptor`）、原型链获取（`getPrototypeOf`）、自身属性读取（`ownKeys`）、对象扩展性检查（`isExtensible`）和原型设置（`setPrototypeOf`）等。

`Proxy.revocable` 方法可以创建一个可撤销的 `Proxy` 实例，通过调用 `revoke` 函数来取消代理。在 `Proxy` 中，目标对象内部的 `this` 指向 `Proxy` 实例，而不是目标对象本身。这使得 `Proxy` 成为一个强大的工具，可以在不直接修改目标对象的情况下，控制对对象的访问和操作。