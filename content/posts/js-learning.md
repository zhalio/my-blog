---
title: "js 学习之路"
date: "2025-11-20"
category: "tech"
summary: "前端第三次授课文档"
---



---

# JavaScript 简介

## 什么是 JavaScript？

JavaScript 最初被创建的目的是“使网页更生动”。
这种编程语言写出来的程序被称为 **脚本**。它们可以直接写在网页的 HTML 中，在页面加载时自动执行。

脚本以纯文本形式提供和执行，不需要特殊准备或编译。

JavaScript 与 Java 有很大的不同。

---

## 为什么叫 JavaScript？

JavaScript 最初名为 **LiveScript**。当时 Java 很流行，因此为了推广，给它取名为 Java 的“弟弟”。

随着发展，JavaScript 成为了独立语言，并拥有自己的语言规范 **ECMAScript**，如今与 Java 完全无关。

现在 JavaScript 不仅可以在浏览器运行，也可在服务端、各种嵌入 JS 引擎的设备中执行。

浏览器内置 JavaScript 引擎（也称“JavaScript 虚拟机”）：

* **V8** —— Chrome、Opera、Edge 使用
* **SpiderMonkey** —— Firefox
* **Chakra** —— IE
* **JavaScriptCore / Nitro / SquirrelFish** —— Safari
* ……等

当文中说“V8 支持某功能”，意味着该功能大概率在 Chrome/Opera/Edge 可用。

---

## 引擎是如何工作的？

流程：

1. 引擎读取（解析）脚本
2. 将其编译为机器语言
3. 执行机器代码

引擎会在各阶段优化代码，甚至在运行时监视并进一步优化。

---

## 浏览器中的 JavaScript 能做什么？

JavaScript 是一种 **安全的** 语言，没有底层内存/CPU 访问能力。

浏览器中的 JavaScript 可做：

* 动态添加/修改 HTML 与 CSS
* 处理用户交互（鼠标、键盘等）
* 发送网络请求、上传/下载文件（AJAX、COMET）
* 操作 cookie、提示用户输入
* 使用 localStorage 存储数据

---

## 浏览器中的 JavaScript 不能做什么？

为了安全，它不能：

* 随意读写硬盘文件
* 未经许可访问摄像头、麦克风等
* 随意与不同域名的标签页通信（**同源策略**）
* 未授权地从其他网站获取数据

在 Node.js 或其他非浏览器环境中则无此限制。

---

## 是什么使得 JavaScript 与众不同？

三点：

* 与 HTML/CSS 完全集成
* 简单任务容易完成
* 所有主流浏览器默认支持

因此 JavaScript 成为最广泛的浏览器界面开发技术。
它也可用于服务器开发、移动应用等。

---

## JavaScript “上层”语言

许多语言可编译为 JavaScript，如：

* **CoffeeScript** —— 更短语法
* **TypeScript** —— 强类型，由微软开发
* **Flow** —— 类型检查，由 Facebook 开发
* **Dart** —— Google 开发
* **Brython** —— Python → JavaScript
* **Kotlin** —— 可运行在浏览器与 Node

即使使用这些语言，也必须了解 JavaScript 本身。

---

# JavaScript 入门

## `<script>` 标签

可在 HTML 任何位置插入：

```html
<!DOCTYPE HTML>
<html>
<body>
  <p>script 标签之前...</p>
  <script>alert('Hello, world!');</script>
  <p>...script 标签之后</p>
</body>
</html>
```

浏览器遇到 `<script>` 会立即执行。

---

## 外部脚本

将脚本放入单独文件：

```html
<script src="/path/to/script.js"></script>
```

也可使用完整 URL：

```html
<script src="https://cdn.../lodash.js"></script>
```

多个脚本：

```html
<script src="/js/a.js"></script>
<script src="/js/b.js"></script>
```

注意：

* **不能同时使用 `src` 和内部代码**
  内部代码会被忽略。
* 使用外部文件可以缓存，提高性能。

---

# JavaScript 特性

## 代码结构

语句用 **分号** 分隔，但换行可自动插入分号。

自动分号插入并非总是可靠，例如：

```javascript
alert("There will be an error after this message")
[1, 2].forEach(alert)
```

一般建议句尾加分号。

代码块 `{...}` 后不需要分号。

---

## 严格模式

启用现代特性：

```javascript
'use strict';
```

应写在脚本或函数顶部。

---

## 变量

三种声明方式：

* `let`
* `const`（常量）
* `var`（旧方式）

变量名规则：

* 字母/数字（首字符不能是数字）
* `$`、`_` 可用
* Unicode 字符可用（不推荐）

JavaScript 是动态类型语言，可随时改变类型：

```javascript
let x = 5;
x = "John";
```

### 八种数据类型

* number
* bigint
* string
* boolean
* null
* undefined
* object
* symbol

`typeof` 特例：

```javascript
typeof null == "object" // JS 设计缺陷
typeof function(){} == "function"
```

---

## 交互

浏览器中常用：

* `prompt(question[, default])`
* `confirm(question)`
* `alert(message)`

示例：

```javascript
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");
alert(userName);
alert(isTeaWanted);
```

---

## 运算符

### 算数运算符

`+ - * / % **`

加号可拼接字符串：

```javascript
'1' + 2 // "12"
```

### 赋值

如 `a = b`、`a *= 2`

### 三元运算符

`cond ? a : b`

示例：

```javascript
let access = age > 18 ? true : false;
```

可用于多层判断：

```javascript
let message = age < 3 ? "Hi" :
              age < 18 ? "Hello" :
              age < 100 ? "Greetings" :
              "Unusual age";
```

不推荐用来代替 if 语句执行不同代码。

---

## 逻辑运算符

* `&&`、`||` —— 短路求值，返回停止位置的值
* `!` —— 转换为布尔值后取反

---

## 空值合并运算符 `??`

选择已定义值：

```javascript
user ?? "匿名"
```

---

## 比较运算符

`==` 会进行类型转换：

```javascript
0 == false // true
```

`===` 不进行转换，推荐使用。

字符串比较按字典序。

---

## 循环

```javascript
while (condition) {}
do {} while (condition);
for (let i = 0; i < 10; i++) {}
```

`break` / `continue` 用于跳出循环。

---

## switch 结构

使用严格相等比较：

```javascript
switch (age) {
  case "18":
    alert("This works!");
    break;
}
```

---

# 函数

## 函数声明 VS 函数表达式

### 函数声明（可提前调用）

```javascript
function sum(a, b) {
  return a + b;
}
```

函数在脚本加载时创建。

### 函数表达式（执行到时才创建）

```javascript
let sum = function(a, b) {
  return a + b;
};
```

### 块级作用域问题

函数声明只在所在块内可见：

```javascript
if (age < 18) {
  function welcome() { alert("Hi"); }
}

welcome(); // ❌ 不可访问
```

正确写法：

```javascript
let welcome;

if (age < 18) {
  welcome = function() { alert("Hi"); };
} else {
  welcome = function() { alert("Hello"); };
}

welcome();
```

---

## 箭头函数

基本形式：

```javascript
let func = (a, b) => a + b;
```

无参数：

```javascript
let hi = () => alert("Hello");
```

单参数可省略括号：

```javascript
let double = n => n * 2;
```

多行函数：

```javascript
let sum = (a, b) => {
  let result = a + b;
  return result;
};
```

---

# 作用域

```javascript
// 全局作用域
let globalVar = "我是全局变量";

function test() {
  let localVar = "我是局部变量";
}

if (true) {
  let blockVar = "块级变量";
}
```

---

# 对象

## 创建对象

```javascript
const person = { name: "张三", age: 25, city: "北京" };

const car = new Object();
car.brand = "Tesla";

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const user = new Person("李四", 30);

const proto = { greeting: "Hello" };
const obj = Object.create(proto);
```

---

## 访问属性

```javascript
student.name
student["favorite color"]
student[key]
```

---

## 常用操作

```javascript
book.pages = 1096;
delete book.year;

"title" in book;
book.hasOwnProperty("author");

for (let key in book) {
  console.log(`${key}: ${book[key]}`);
}
```

---


