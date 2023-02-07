# 数据类型

## 类型判断

### typeof

`typeof` 用于返回以下原始类型

- 基本类型：number/string/boolean
- function
- object
- undefined

可以使用 typeof 用于判断数据的类型

```js
let a = 1;
console.log(typeof a); //number

let b = "1";
console.log(typeof b); //string

//未赋值或不存在的变量返回undefined
var hd;
console.log(typeof hd);

function run() {}
console.log(typeof run); //function

let c = [1, 2, 3];
console.log(typeof c); //object

let d = { name: "daodao.com" };
console.log(typeof d); //object
```

### instanceof

**`instanceof`** 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

也可以理解为是否为某个对象的实例，`typeof`不能区分数组，但`instanceof`则可以。

```js
let hd = [];
let daodao = {};
console.log(hd instanceof Array); //true
console.log(daodao instanceof Array); //false

let c = [1, 2, 3];
console.log(c instanceof Array); //true

let d = { name: "daodao.com" };
console.log(d instanceof Object); //true

function User() {}
let hd = new User();
console.log(hd instanceof User); //true
```

### 值类型与对象

下面是使用字面量与对象方法创建字符串，返回的是不同类型。

```js
let hd = "daodao";
let cms = new String("duyidao");
console.log(typeof hd, typeof cms); //string object
```

只有对象才有方法使用，但在`JS`中也可以使用值类型调用方法，因为它会在执行时将值类型转为对象。

```js
let hd = "daodao";
let cms = new String("duyidao");
console.log(hd.length); //9
console.log(cms.length); //5
```

## 基本类型

### 字符串 String

字符串类型是使用非常多的数据类型，也是相对简单的数据类型。

#### 声明定义

使用对象形式创建字符串

```js
let hd = new String('daodao');
// 获取字符串长度
console.log(hd.length);
// 获取字符串
console.log(hd.toString());
```

字符串使用单、双引号包裹，单、双引号使用结果没有区别。

```js
let content = '刀刀';
console.log(content);
```

#### 转义符号

有些字符有双层含义，需要使用 `\` 转义符号进行含义转换。下例中引号为字符串边界符，如果输出引号时需要使用转义符号。

```js
let content = '刀刀 \'xiaodao.com\'';
console.log(content);
```

常用转义符号列表如下

| 符号 | 说明     |
| ---- | -------- |
| \t   | 制表符   |
| \n   | 换行     |
| \\   | 斜杠符号 |
| \'   | 单引号   |
| \"   | 双引号 R |

#### 连接运算符

使用 `+` 可以连接多个内容组合成字符串，经常用于组合输出内容使用。

```js
let year = 2010,
name = '刀刀';
console.log(name + '成立于' + year + '年');
```

使用 `+=` 在字符串上追回字符内容

```js
let web = '刀刀';
web += '网址：houdunren.com';
console.log(web); //刀刀网址：houdunren.com
```

#### 模板字面量

使用反引号符号包裹的字符串中可以写入引入变量与表达式，引入方式为 `${}` 。

```js
let url = 'daodao.com';
console.log(`刀刀网址是${url}`); //刀刀网址是houdunren.com
```

支持换行操作不会产生错误

```js
let url = 'daodao.com';
document.write(`刀刀网址是${url}
大家可以在网站上学习到很多技术知识`);
```

使用表达式

```js
function show(title) {
	return `刀刀`;
}
console.log(`${show()}`)
```

模板字面量支持嵌套使用

![image-20191011025107379](https://doc.daodao.com/assets/img/image-20191011025107379.418bb650.png)

```js
let lessons = [
	{title: '媒体查询响应式布局'},{title: 'FLEX 弹性盒模型'},{title: 'GRID 栅格系统'}
];

function template() {
  return `<ul>
      ${lessons.map((item)=>`
          <li>${item.title}</li>
      `).join('')}
  </ul>`;
}
document.body.innerHTML = template();
```

#### 标签模板

标签模板是提取出普通字符串与变量，交由标签函数处理

```js
let lesson = 'css';
let web = '刀刀';
tag `访问${web}学习${lesson}前端知识`;

function tag(strings, ...values) {
    console.log(strings); //["访问", "学习", "前端知识"]
    console.log(values); // ["刀刀", "css"]
}
```

下面例子将标题中有刀刀的使用标签模板加上链接

```js
let lessons = [
  { title: "刀刀媒体查询响应式布局", author: "刀刀向军" },
  { title: "FLEX 弹性盒模型", author: "刀刀" },
  { title: "GRID 栅格系统刀刀教程", author: "古老师" }
];

function links(strings, ...vars) {
  return strings
    .map((str, key) => {
      return (
        str +
        (vars[key]
          ? vars[key].replace(
              "刀刀",
              `<a href="https://www.daodao.com">刀刀</a>`
            )
          : "")
      );
    })
    .join("");
}

function template() {
  return `<ul>
    ${lessons
      .map(item => links`<li>${item.author}:${item.title}</li>`)
      .join("")}
</ul>`;
}
document.body.innerHTML += template();
```

#### 字符串方法

##### 获取长度

使用`length`属性可以获取字符串长度

```js
console.log("daodao.com".length)
```

##### 大小写转换

将字符转换成大写格式

```js
console.log('daodao.com'.toUpperCase()); //HOUDUNREN.COM
```

转字符为小写格式

```js
console.log('daodao.com'.toLowerCase()); //daodao.com
```

##### 移除空白

使用`trim`删除字符串左右的空白字符

```js
let str = '   daodao.com  ';
console.log(str.length);
console.log(str.trim().length);
```

使用`trimLeft`删除左边空白，使用`trimRight`删除右边空白

```js
let name = " daodao ";
console.log(name); // " daodao "
console.log(name.trimLeft()); // "daodao "
console.log(name.trimRight()); // " daodao"
```

##### 获取单字符

根据从 0 开始的位置获取字符

```js
console.log('daodao'.charAt(3)) // d
```

使用数字索引获取字符串

```js
console.log('daodao'[3]) // d
```

##### 截取字符串

使用 `slice、substr、substring` 函数都可以截取字符串。

- slice、substring 第二个参数为截取的结束位置
- substr 第二个参数指定获取字符数量

```js
let hd = 'daodao.com';
console.log(hd.slice(3)); //dao.com
console.log(hd.substr(3)); //dao.com
console.log(hd.substring(3)); //dao.com

console.log(hd.slice(3, 6)); //dao
console.log(hd.substring(3, 6)); //dao
console.log(hd.substring(3, 0)); //dao 较小的做为起始位置
console.log(hd.substr(3, 6)); //dao.

console.log(hd.slice(3, -1)); //dao.co 第二个为负数表示从后面算的字符
console.log(hd.slice(-2));//om 从末尾取
console.log(hd.substring(3, -9)); //dao 负数转为0
console.log(hd.substr(-3, 2)); //co 从后面第三个开始取两个
```

##### 查找字符串

从开始获取字符串位置，检测不到时返回 `-1`

```js
console.log('daodao.com'.indexOf('o')); //2
console.log('daodao.com'.indexOf('o', 3)); //5 从第3个字符向后搜索
```

从结尾来搜索字符串位置

```js
console.log('daodao.com'.lastIndexOf('o')); //8
console.log('daodao.com'.lastIndexOf('o', 7)); //3 从第7个字符向前搜索
```

`search()` 方法用于检索字符串中指定的子字符串，也可以使用正则表达式搜索

```js
let str = "daodao.com";
console.log(str.search("com")); // 7
console.log(str.search(/\.com/i)); // 6
```

`includes` 字符串中是否包含指定的值，第二个参数指查找开始位置

```js
console.log('daodao.com'.includes('o')); //true
console.log('daodao.com'.includes('h', 11)); //true
```

`startsWith` 是否是指定位置开始，第二个参数为查找的开始位置。

```js
console.log('daodao.com'.startsWith('d')); //true
console.log('daodao.com'.startsWith('a')); //false
console.log('daodao.com'.startsWith('o', 1)); //true
```

`endsWith` 是否是指定位置结束，第二个参数为查找的结束位置。

```js
console.log('daodao.com'.endsWith('com')); //true
console.log('daodao.com'.endsWith('o', 2)); //true
```

下面是查找关键词的示例

```js
const words = ["vite", "project"];
const title = "欢迎查看刀刀博客vite与project模块";
const status = words.some(word => {
  return title.includes(word);
});
console.log(status);
```

##### 替换字符串

`replace` 方法用于字符串的替换操作

```js
let name = "daodao.com";
web = name.replace("daodao", "duyidao");
console.log(web); // duyidao.com
```

默认只替换一次，如果全局替换需要使用正则（更强大的使用会在正则表达式章节介绍）

```js
let str = "2023/02/12";
console.log(str.replace(/\//g, "-")); // 2023-02-12
```

使用字符串替换来生成关键词链接

```js
const word = ["vite", "learn"];
const string = "刀刀博客vite与learn模块";
const title = word.reduce((pre, word) => {
  return pre.replace(word, `<a href="?w=${word}">${word}</a>`);
}, string);
document.body.innerHTML += title;
```

使用正则表达式完成替换

```js
let res = "daodao.com".replace(/u/g, str => {
  return "@";
});
console.log(res);
```

##### 重复生成

下例是根据参数重复生成星号

```js
function star(num = 3) {
	return '*'.repeat(num);
}
console.log(star()); // ***
```

下面是模糊后三位电话号码

```js
let phone = "98765432101";
console.log(phone.slice(0, -3) + "*".repeat(3)); // 98765432***
```

##### 类型转换

分隔字母

```js
let name = "duyidao";
console.log(name.split(""));
```

将字符串转换为数组

```js
console.log("1,2,3".split(",")); //[1,2,3]
```

隐式类型转换会根据类型自动转换类型

```js
let hd = 99 + '';
console.log(typeof hd); //string
```

使用 `String` 构造函数可以显示转换字符串类型

```js
let hd = 99;
console.log(typeof String(hd));
```

js 中大部分类型都是对象，可以使用类方法 `toString`转化为字符串

```js
let hd = 99;
console.log(typeof hd.toString()); //string

let arr = ['duyidao', '刀刀'];
console.log(typeof arr.toString()); //string
```

### Boolean

布尔类型包括 `true` 与 `false` 两个值，开发中使用较多的数据类型。

### [#](https://doc.daodao.com/系统课程/js/3 基本类型.html#声明定义-2)声明定义

使用对象形式创建布尔类型

```text
console.log(new Boolean(true)); //true
console.log(new Boolean(false)); //false
```

但建议使用字面量创建布尔类型

```text
let hd =true;
```

### [#](https://doc.daodao.com/系统课程/js/3 基本类型.html#隐式转换)隐式转换

基本上所有类型都可以隐式转换为 Boolean 类型。

| 数据类型  | true             | false            |
| --------- | ---------------- | ---------------- |
| String    | 非空字符串       | 空字符串         |
| Number    | 非 0 的数值      | 0 、NaN          |
| Array     | 数组不参与比较时 | 参与比较的空数组 |
| Object    | 所有对象         |                  |
| undefined | 无               | undefined        |
| null      | 无               | null             |
| NaN       | 无               | NaN              |

当与 boolean 类型比较时，会将两边类型统一为数字 1 或 0。

如果使用 Boolean 与数值比较时，会进行隐式类型转换 true 转为 1，false 转为 0。

```text
console.log(3 == true); //false
console.log(0 == false); //true
```

下面是一个典型的例子，字符串在与 Boolean 比较时，两边都为转换为数值类型后再进行比较。

```text
console.log(Number("daodao")); //NaN
console.log(Boolean("daodao")); //true
console.log("daodao" == true); //false
console.log("1" == true); //true
```

数组的表现与字符串原理一样，会先转换为数值

```text
console.log(Number([])); //0
console.log(Number([3])); //3
console.log(Number([1, 2, 3])); //NaN
console.log([] == false); //true
console.log([1] == true); //true
console.log([1, 2, 3] == true); //false
```

引用类型的 Boolean 值为真，如对象和数组

```text
if ([]) console.log("true");
if ({}) console.log("true");
```

### [#](https://doc.daodao.com/系统课程/js/3 基本类型.html#显式转换)显式转换

使用 `!!` 转换布尔类型

```text
let hd = '';
console.log(!!hd); //false
hd = 0;
console.log(!!hd); //false
hd = null;
console.log(!!hd); //false
hd = new Date("2020-2-22 10:33");
console.log(!!hd); //true
```

使用 `Boolean` 函数可以显式转换为布尔类型

```text
let hd = '';
console.log(Boolean(hd)); //false
hd = 0;
console.log(Boolean(hd)); //false
hd = null;
console.log(Boolean(hd)); //false
hd = new Date("2020-2-22 10:33");
console.log(Boolean(hd)); //true
```

### 实例操作

下面使用 Boolean 类型判断用户的输入，并给出不同的反馈。

```text
while (true) {
  let n = prompt("请输入刀刀成立年份").trim();
  if (!n) continue;
  alert(n == 2010 ? "回答正确" : "答案错误！看看官网了解下");
  break;
}
```