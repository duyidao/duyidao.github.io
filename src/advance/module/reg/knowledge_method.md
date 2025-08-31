# 方法

## 字符方法

下面介绍的方法是 `String` 提供的支持正则表达式的方法

### search

`search()` 方法用于检索字符串中指定的子字符串，也可以使用正则表达式搜索，返回值为索引位置

```js
let str = 'daodao.com'
console.log(str.search('com')) // 7
```

使用正则表达式搜索

```js
console.log(str.search(/\.com/i)) // 6
```

### match

直接使用字符串搜索

```js
let str = 'daodao.com'
console.log(str.match('com'))
```

使用正则获取内容，下面是简单的搜索字符串

```js
let fn = 'daodao'
let res = fn.match(/u/)
console.log(res)
console.log(res[0]) //匹配的结果
console.log(res[index]) //出现的位置
```

如果使用 `g` 修饰符时，就不会有结果的详细信息了（可以使用 `exec`），下面是获取所有 h1~6 的标题元素

```js
let body = document.body.innerHTML
let result = body.match(/<(h[1-6])>[\s\S]+?<\/\1>/g)
console.table(result)
```

### matchAll

在新浏览器中支持使用 `matchAll` 操作，并返回迭代对象

```js
let str = "daodao";
let reg = /[a-z]/ig;
for (const iterator of str.matchAll(reg)) {
  console.log(iterator);
}

['d', index: 0, input: 'daodao', groups: undefined]
['a', index: 1, input: 'daodao', groups: undefined]
['o', index: 2, input: 'daodao', groups: undefined]
['d', index: 3, input: 'daodao', groups: undefined]
['a', index: 4, input: 'daodao', groups: undefined]
['o', index: 5, input: 'daodao', groups: undefined]
```

### split

用于使用字符串或正则表达式分隔字符串，下面是使用字符串分隔日期

```js
let str = '2023-02-12'
console.log(str.split('-')) //["2023", "02", "12"]
```

如果日期的连接符不确定，那就要使用正则操作了

```js
let str = '2023/02-12'
console.log(str.split(/-|\//))
```

### replace

`replace` 方法不仅可以执行基本字符替换，也可以进行正则替换，下面替换日期连接符

```js
let str = '2023/02/12'
console.log(str.replace(/\//g, '-')) //2023-02-12
```

替换字符串可以插入下面的特殊变量名：

| 变量 | 说明                                                                                                                 |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
| $$   | 插入一个 "$"。                                                                                                       |
| $&   | 插入匹配的子串。                                                                                                     |
| $    | 插入当前匹配的子串左边的内容。                                                                                       |
| $'   | 插入当前匹配的子串右边的内容。                                                                                       |
| $n   | 假如第一个参数是 RegExp 对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从 1 开始 |

在刀刀前后添加三个 `=`

```js
let fn = '=刀刀='
console.log(fn.replace(/刀刀/g, "$`$`$&$'$'"))
```

把电话号用 `-` 连接

```js
let fn = '(010)99999999 (020)8888888'
console.log(fn.replace(/\((\d{3,4})\)(\d{7,8})/g, '$1-$2'))
```

把所有 `教育` 汉字加上链接 `https://www.daodao.com`

```html
<body>
  在线教育是一种高效的学习方式，教育是一生的事业
</body>
<script>
  const body = document.body
  body.innerHTML = body.innerHTML.replace(
    /教育/g,
    `<a href="https://www.daodao.com">$&</a>`
  )
</script>
```

为链接添加上 `https` ，并补全 `www.`

```html
<body>
  <main>
    <a style="color:red" href="http://www.fndd.com"> 开源系统 </a>
    <a id="l1" href="http://daodao.com">刀刀</a>
    <a href="http://yahoo.com">雅虎</a>
    <h4>http://www.fndd.com</h4>
  </main>
</body>
<script>
  const main = document.querySelector('body main')
  const reg = /(<a.*href=['"])(http)(:\/\/)(www\.)?(fndd|daodao)/gi
  main.innerHTML = main.innerHTML.replace(reg, (v, ...args) => {
    args[1] += 's'
    args[3] = args[3] || 'www.'
    return args.splice(0, 5).join('')
  })
</script>
```

将标题标签全部替换为 `p` 标签

```html
<body>
  <h1>daodao.com</h1>
  <h2>fndd.com</h2>
  <h1>刀刀</h1>
</body>

<script>
  const reg = /<(h[1-6])>(.*?)<\/\1>/g
  const body = document.body.innerHTML
  const html = body.replace(reg, function (str, tag, content) {
    return `<p>${content}</p>`
  })
  document.body.innerHTML = html
</script>
```

删除页面中的 `h1~h6` 标签

```html
<body>
  <h1>daodao.com</h1>
  <h2>fndd.com</h2>
  <h1>刀刀</h1>
</body>
<script>
  const reg = /<(h[1-6])>(.*?)<\/\1>/g
  const body = document.body.innerHTML
  const html = body.replace(reg, '')
  document.body.innerHTML = html
</script>
```

**回调函数**

`replace` 支持回调函数操作，用于处理复杂的替换逻辑

| 变量名            | 代表的值                                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| match             | 匹配的子串。（对应于上述的$&。）                                                                                                                                                            |
| p1,p2, ...        | 假如 replace() 方法的第一个参数是一个 RegExp 对象，则代表第 n 个括号匹配的字符串。（对应于上述的$1，$2 等。）例如，如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。 |
| offset            | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1）                                                                        |
| string            | 被匹配的原字符串。                                                                                                                                                                          |
| NamedCaptureGroup | 命名捕获组匹配的对象                                                                                                                                                                        |

使用回调函数将 `刀刀` 添加上链接

```html
<body>
  <div class="content">刀刀前端要更努力</div>
</body>

<script>
  let content = document.querySelector('.content')
  content.innerHTML = content.innerHTML.replace(
    '刀刀',
    function (search, pos, source) {
      return `<a href="https://www.daodao.com">${search}</a>`
    }
  )
</script>
```

为所有标题添加上 `hot` 类

```html
<body>
  <div class="content">
    <h1>刀刀</h1>
    <h2>daodao.com</h2>
    <h1>刀刀</h1>
  </div>
</body>
<script>
  let content = document.querySelector('.content')
  let reg = /<(h[1-6])>([\s\S]*?)<\/\1>/gi
  content.innerHTML = content.innerHTML.replace(
    reg,
    (
      search, //匹配到的字符
      p1, //第一个原子组
      p2, //第二个原子组
      index, //索引位置
      source //原字符
    ) => {
      return `
    <${p1} class="hot">${p2}</${p1}>
    `
    }
  )
</script>
```

## 正则方法

下面是 `RegExp` 正则对象提供的操作方法

### test

检测输入的邮箱是否合法

```html
<body>
  <input type="js" name="email" />
</body>

<script>
  let email = document.querySelector(`[name="email"]`)
  email.addEventListener('keyup', (e) => {
    console.log(/^\w+@\w+\.\w+$/.test(e.target.value))
  })
</script>
```

### exec

不使用 `g` 修饰符时与 `match` 方法使用相似，使用 `g` 修饰符后可以循环调用直到全部匹配完。

- 使用 `g` 修饰符多次操作时使用同一个正则，即把正则定义为变量使用
- 使用 `g` 修饰符最后匹配不到时返回 `null`

计算内容中刀刀出现的次数

```html
<body>
  <div class="content">刀刀每天都要更努力，刀刀博客每周更新~</div>
</body>

<script>
  let content = document.querySelector('.content')
  let reg = /(?<tag>刀刀)/g // tag为别名
  let num = 0
  while ((result = reg.exec(content.innerHTML))) {
    num++
  }
  console.log(`刀刀共出现${num}次`)
</script>
```

## 断言匹配

断言虽然写在扩号中但它不是组，所以不会在匹配结果中保存，可以将断言理解为正则中的条件。

### (?=exp)

**零宽先行断言** `?=exp` 匹配后面为 `exp` 的内容

把后面是 `前端` 的刀刀汉字加上链接

```html
<body>
  <main>刀刀每天都要更努力，刀刀前端小菜鸡。</main>
</body>

<script>
  const main = document.querySelector('main')
  const reg = /刀刀(?=前端)/gi
  main.innerHTML = main.innerHTML.replace(
    reg,
    (v) => `<a href="https://daodao.com">${v}</a>`
  )
</script>
```

下面是将价格后面 添加上 `.00`

```html
<script>
  let lessons = `
    js,200元,300次
    php,300.00元,100次
    node.js,180元,260次
  `
  let reg = /(\d+)(.00)?(?=元)/gi
  lessons = lessons.replace(reg, (v, ...args) => {
    args[1] = args[1] || '.00'
    return args.splice(0, 2).join('')
  })
  console.log(lessons)
</script>
```

使用断言验证用户名必须为五位，下面正则体现断言是不是组，并且不在匹配结果中记录

```html
<body>
  <input type="js" name="username" />
</body>

<script>
  document
    .querySelector(`[name="username"]`)
    .addEventListener('keyup', function () {
      let reg = /^(?=[a-z]{5}$)/i
      console.log(reg.test(this.value))
    })
</script>
```

### (?<=exp)

**零宽后行断言** `?<=exp` 匹配前面为 `exp` 的内容

匹配前面是`daodao` 的数字

```js
let fn = 'daodao789fndd666'
let reg = /(?<=daodao)\d+/i
console.log(fn.match(reg)) //789
```

匹配前后都是数字的内容

```js
let fn = 'daodao789fndd666'
let reg = /(?<=\d)[a-z]+(?=\d{3})/i
console.log(fn.match(reg)) // fndd
```

所有超链接替换为 `daodao.com`

```html
<body>
  <a href="https://baidu.com">百度</a>
  <a href="https://yahoo.com">雅虎</a>
</body>
<script>
  const body = document.body
  let reg = /(?<=<a.*href=(['"])).+?(?=\1)/gi
  // console.log(body.innerHTML.match(reg));
  body.innerHTML = body.innerHTML.replace(reg, 'https://daodao.com')
</script>
```

下例中将 `刀刀` 后面的博客添加上链接

```html
<body>
  <h1>刀刀博客每周更新</h1>
</body>

<script>
  let h1 = document.querySelector('h1')
  let reg = /(?<=刀刀)博客/
  h1.innerHTML = h1.innerHTML.replace(reg, (str) => {
    return `<a href="https://www.daodao.com">${str}</a>`
  })
</script>
```

将电话的后四位模糊处理

```js
let users = `
  杜一刀电话: 12345678901
  刀刀电话: 98745675603
`

let reg = /(?<=\d{7})\d+\s*/g
users = users.replace(reg, (str) => {
  return '*'.repeat(4)
})
console.log(users) //杜一刀电话: 1234567****刀刀电话: 9874567****
```

获取标题中的内容

```js
let fn = `<h1>刀刀视频不断录制案例丰富的视频教程</h1>`
let reg = /(?<=<h1>).*(?=<\/h1>)/g
console.log(fn.match(reg))
```

### (?!exp)

**零宽负向先行断言** 后面不能出现 `exp` 指定的内容

使用 `(?!exp)` 字母后面不能为两位数字

```js
let fn = 'daodao12duyidao'
let reg = /[a-z]+(?!\d{2})$/i // 如果不加$则daoda也符合要求，因此加上表示只能以字母结尾
console.table(reg.exec(fn)) // duyidao
```

下例为用户名中不能出现 `刀刀` 。

```html
<body>
  <main>
    <input type="js" name="username" />
  </main>
</body>
<script>
  const input = document.querySelector(`[name="username"]`)
  input.addEventListener('keyup', function () {
    const reg = /^(?!.*刀刀.*)[a-z]{5,6}$/i // 从起始位置开始到最后都不能出现刀刀，.*表示任意字符
    console.log(this.value.match(reg))
  })
</script>
```

### (?<!exp)

**零宽负向后行断言** 前面不能出现 `exp` 指定的内容

获取前面不是数字的字符

```js
let fn = 'fndd99daodao'
let reg = /(?<!\d+)[a-z]+/i
console.log(reg.exec(fn)) //fndd
```

把所有不是以 `https://oss.daodao.com` 开始的静态资源替换为新网址

```html
<body>
  <main>
    <a href="https://www.daodao.com/1.jpg">1.jpg</a>
    <a href="https://oss.daodao.com/2.jpg">2.jpg</a>
    <a href="https://cdn.daodao.com/2.jpg">3.jpg</a>
    <a href="https://daodao.com/2.jpg">3.jpg</a>
  </main>
</body>
<script>
  const main = document.querySelector('main')
  const reg = /https:\/\/(\w+)?(?<!oss)\..+?(?=\/)/gi
  main.innerHTML = main.innerHTML.replace(reg, (v) => {
    console.log(v)
    return 'https://oss.daodao.com'
  })
</script>
```
