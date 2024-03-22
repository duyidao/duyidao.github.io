# Proxy比defineProperty好在哪

在学习 Vue 时，一直都听说 Vue3 响应式原理用的 Proxy，Vue2 使用的是 defineProperty。因此 Vue3 响应式更优于 Vue2。不过这是为什么呢？

## Vue2响应式本质

首先关于 Vue 的响应式本质是什么，是在给一个变量重新赋值时能够得知到这步操作，做某些处理，并更新页面。

```js
const obj = {
    a: 1,
    b: 2,
    c: {
        tree: 1,
        flower: 2
    }
}
```

现在我若直接 `obj.a = 2` 修改对象 `obj` 的 `a` 属性，显然是无法做处理的。若使用函数的方式呢？通过 `get()` 获取值，通过 `set()` 设置值。

不过怎么变成函数呢？在 ES6 之前，只能通过 `Object.defineProperty` 实现。

```js
Object.defineProperty(obj, 'a', {
    get() {
        console.log('读取a:', a)
        return a
    },
    set(val) {
        if(val !== obj.a) {
            console.log('更改a:', a)
            obj.a = val
        }
    }
})
```

这样就能够在获取 `a` 时监听到，在更改 `a` 时也能监听到，还能做其他的操作。

由于 `Object.defineProperty` 是针对属性做监听，所以对于一个对象它需要做深度遍历，在 Vue2 源码中，就有一个 `observe` 的函数，遍历传过来的对象进行监听。如果该属性值是一个对象，则再一次深度遍历。

```js
function _isObject(v) {
    return typeof v === 'object' && v !== null
}

function observe(obj) {
    for(const k in obj) {
        let v = obj[k]
        if(_isObject(v)) observe(v)
    }
    Object.defineProperty(obj, k, {
        get() {
            console.log('读取:', k)
            return v
        },
        set(val) {
            if(val !== v) {
                console.log('更改:', k)
                v = val
            }
        }
    })
}
```

这个过程就叫做观察，观察实质就是遍历每个属性，把每一个属性的读取和赋值变成函数，这样就能收到通知。

这个做法有一个天生的缺陷：由于它只能对属性监听，因此需要深度遍历。且监听的时候在遍历是能监听对象的原属性，如果新增一个属性，则无法被监听。这就是为什么 Vue2 无法监听对象属性的新增和删除（不会触发 `get` 和 `set` ）。

## Vue3响应式本质

同样都是变函数，Vue3 是直接针对整个对象进行监听。无论是新增、删除还是读取，他都能监听到。

在监听时他还会产生一个代理对象，在使用属性或赋值属性时，都是通过这个代理对象来实现。

```js
const newObj = new Proxy(obj, {
    get(target, k) {
        let v = target[k]
        console.log(k, 'read')
        return v
    },
    set(target, k, val) {
        let v = target[k]
        if(target[k] !== val) {
            (target[k] = val
        }
    }
})
```

完善一下。

```js
function _isObject(v) {
    return typeof v === 'object' && v !== null
}

function observe(obj) {
    const newObj = new Proxy(obj, {
        get(target, k) {
            let v = target[k]
            if(_isObject(v)) {
                v = observe(v)
            }
            console.log(k, 'read')
            return v
        },
        set(target, k, val) {
            let v = target[k]
            if(target[k] !== val) {
                (target[k] = val
            }
        }
    })
    return newObj
}
```

## 总结

由于 `proxy` 是直接监听整个对象，在需要的时候才会递归监听对象内的对象，因此性能上会比 `defineProporty` 更胜一筹。