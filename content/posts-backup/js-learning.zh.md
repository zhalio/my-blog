---
title: js语法基础/认识浏览器API
date: 2025-11-20
summary: 前端组第三次授课文档
tags:
  - JavaScript
  - Frontend
  - Learning
---
## JavaScript 简介

### 什么是 JavaScript？

JavaScript 最初被创建的目的是“使网页更生动”。
这种编程语言写出来的程序被称为 **脚本**。它们可以被直接写在网页的 HTML 中，在页面加载的时候自动执行。
脚本被以纯文本的形式提供和执行。它们不需要特殊的准备或编译即可运行。
这方面，JavaScript 和 Java 有很大的区别。

### 为什么叫 JavaScript？

JavaScript 在刚诞生的时候，它的名字叫 “LiveScript”。但是因为当时 Java 很流行，所以决定将一种新语言定位为 Java 的“弟弟”会有助于它的流行。
随着 JavaScript 的发展，它已经成为了一门完全独立的语言，并且也拥有了自己的语言规范 ECMAScript。现在，它和 Java 之间没有任何关系。

如今，JavaScript 不仅可以在浏览器中执行，也可以在服务端执行，甚至可以在任意搭载了 JavaScript 引擎 的设备中执行。
浏览器中嵌入了 JavaScript 引擎，有时也称作“JavaScript 虚拟机”。
不同的引擎有不同的“代号”，例如：

- V8 —— Chrome、Opera 和 Edge 中的 JavaScript 引擎。
- SpiderMonkey —— Firefox 中的 JavaScript 引擎。
- ……还有其他一些代号，像 “Chakra” 用于 IE，“JavaScriptCore”、“Nitro” 和 “SquirrelFish” 用于 Safari，等等。

上面这些术语很容易记住，因为它们经常出现在开发者的文章中。我们也会用到这些术语。例如，如果“V8 支持某个功能”，那么我们可以认为这个功能大概能在 Chrome、Opera 和 Edge 中正常运行。

### 引擎是如何工作的？

引擎很复杂，但是基本原理很简单。

1. 引擎（如果是浏览器，则引擎被嵌入在其中）读取（“解析”）脚本。
2. 然后，引擎将脚本转化（“编译”）为机器语言。
3. 然后，机器代码快速地执行。

引擎会对流程中的每个阶段都进行优化。它甚至可以在编译的脚本运行时监视它，分析流经该脚本的数据，并根据获得的信息进一步优化机器代码。

### 浏览器中的 JavaScript 能做什么？

现代的 JavaScript 是一种“安全的”编程语言。它不提供对内存或 CPU 的底层访问，因为它最初是为浏览器创建的，不需要这些功能。
JavaScript 的能力很大程度上取决于它运行的环境。例如，Node.js 支持允许 JavaScript 读取/写入任意文件，执行网络请求等的函数。
浏览器中的 JavaScript 可以做与网页操作、用户交互和 Web 服务器相关的所有事情。

例如，浏览器中的 JavaScript 可以做下面这些事：

- 在网页中添加新的 HTML，修改网页已有内容和网页的样式。
- 响应用户的行为，响应鼠标的点击，指针的移动，按键的按动。
- 向远程服务器发送网络请求，下载和上传文件（所谓的 AJAX 和 COMET 技术）。
- 获取或设置 cookie，向访问者提出问题或发送消息。
- 记住客户端的数据（“本地存储”）。

### 浏览器中的 JavaScript 不能做什么？

为了用户的（信息）安全，在浏览器中的 JavaScript 的能力是受限的。目的是防止恶意网页获取用户私人信息或损害用户数据。
此类限制的例子包括：

- 网页中的 JavaScript 不能读、写、复制和执行硬盘上的任意文件。它没有直接访问操作系统的功能。
- 现代浏览器允许 JavaScript 做一些文件相关的操作，但是这个操作是受到限制的。仅当用户做出特定的行为，JavaScript 才能操作这个文件。例如，用户把文件“拖放”到浏览器中，或者通过 `<input>` 标签选择了文件。
- 有很多与相机/麦克风和其它设备进行交互的方式，但是这些都需要获得用户的明确许可。因此，启用了 JavaScript 的网页应该不会偷偷地启动网络摄像头观察你，并把你的信息发送到 美国国家安全局。
- 不同的标签页/窗口之间通常互不了解。有时候，也会有一些联系，例如一个标签页通过 JavaScript 打开的另外一个标签页。但即使在这种情况下，如果两个标签页打开的不是同一个网站（域名、协议或者端口任一不相同的网站），它们都不能相互通信。
- 这就是所谓的“同源策略”。为了解决“同源策略”问题，两个标签页必须 **都** 包含一些处理这个问题的特定的 JavaScript 代码，并均允许数据交换。本教程会讲到这部分相关的知识。
- 这个限制也是为了用户的信息安全。例如，用户打开的 `https://www.google.com/` 网页必须不能访问 `http://gmail.com`（另外一个标签页打开的网页）也不能从那里窃取信息。
- JavaScript 可以轻松地通过互联网与当前页面所在的服务器进行通信。但是从其他网站/域的服务器中接收数据的能力被削弱了。尽管可以，但是需要来自远程服务器的明确协议（在 HTTP header 中）。这也是为了用户的信息安全。

如果在浏览器环境外（例如在服务器上）使用 JavaScript，则不存在此类限制。现代浏览器还允许安装可能会要求扩展权限的插件/扩展。

### 是什么使得 JavaScript 与众不同？

至少有 3 件事值得一提：

- 与 HTML/CSS 完全集成。
- 简单的事，简单地完成。
- 被所有的主流浏览器支持，并且默认开启。

JavaScript 是将这三件事结合在一起的唯一的浏览器技术。
这就是为什么 JavaScript 与众不同。这也是为什么它是用于创建浏览器界面的使用最广泛的工具。
此外，JavaScript 还可用于创建服务器和移动端应用程序等。

### JavaScript “上层”语言

不同的人想要不同的功能。JavaScript 的语法也不能满足所有人的需求。
这是正常的，因为每个人的项目和需求都不一样。
因此，最近出现了许多新语言，这些语言在浏览器中执行之前，都会被 **编译**（转化）成 JavaScript。
现代化的工具使得编译速度非常快且透明，实际上允许开发者使用另一种语言编写代码并会将其“自动转换”为 JavaScript。

此类语言的示例有：

- **CoffeeScript** 是 JavaScript 的一种语法糖。它引入了更加简短的语法，使我们可以编写更清晰简洁的代码。通常，Ruby 开发者喜欢它。
- **TypeScript** 专注于添加“严格的数据类型”以简化开发，以更好地支持复杂系统的开发。由微软开发。
- **Flow** 也添加了数据类型，但是以一种不同的方式。由 Facebook 开发。
- **Dart** 是一门独立的语言。它拥有自己的引擎，该引擎可以在非浏览器环境中运行（例如手机应用），它也可以被编译成 JavaScript。由 Google 开发。
- **Brython** 是一个 Python 到 JavaScript 的转译器，让我们可以在不使用 JavaScript 的情况下，以纯 Python 编写应用程序。
- **Kotlin** 是一个现代、简洁且安全的编程语言，编写出的应用程序可以在浏览器和 Node 环境中运行。

这样的语言还有很多。当然，即使我们在使用此类编译语言，我们也需要了解 JavaScript。因为了解 JavaScript 才能让我们真正明白我们在做什么。

## JavaScript 入门

### “script” 标签

我们几乎可以使用 `<script>` 标签将 JavaScript 程序插入到 HTML 文档的任何位置。
比如：

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

`<script>` 标签中包裹了 JavaScript 代码，当浏览器遇到 `<script>` 标签，代码会自动运行。

### 外部脚本

如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。
脚本文件可以通过 `src` 特性添加到 HTML 文件中。

```html
<script src="/path/to/script.js"></script>
```

这里，`/path/to/script.js` 是脚本文件从网站根目录开始的绝对路径。当然也可以提供当前页面的相对路径。例如，`src="script.js"`，就像 `src="./script.js"`，表示当前文件夹中的 "script.js" 文件。

我们也可以提供一个完整的 URL 地址，例如：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

要附加多个脚本，请使用多个标签：

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
```

…
请注意：
一般来说，只有最简单的脚本才嵌入到 HTML 中。更复杂的脚本存放在单独的文件中。
使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的缓存中。
之后，其他页面想要相同的脚本就会从缓存中获取，而不是下载它。所以文件实际上只会下载一次。
这可以节省流量，并使得页面（加载）更快。

如果设置了 `src` 特性，script 标签内容将会被忽略。
一个单独的 `<script>` 标签不能同时有 `src` 特性和内部包裹的代码。
这将不会工作：

```html
<script src="file.js">
    alert(1); // 此内容会被忽略，因为设定了 src
</script>
```

我们必须进行选择，要么使用外部的 `<script src="…">`，要么使用正常包裹代码的 `<script>`。
为了让上面的例子工作，我们可以将它分成两个 `<script>` 标签。

```html
<script src="file.js"></script>
<script>
    alert(1);
</script>
```

## JavaScript 特性

### 代码结构

语句用分号分隔：

```javascript
alert('Hello'); alert('World');
```

通常，换行符也被视为分隔符，因此下面的例子也能正常运行：

```javascript
alert('Hello')
alert('World')
```

这就是所谓的「自动分号插入」。但有时它不起作用，例如：

```javascript
alert("There will be an error after this message")
[1, 2].forEach(alert)
```

大多数代码风格指南都认为我们应该在每个语句后面都加上分号。
在代码块 `{...}` 后以及有代码块的语法结构（例如循环）后不需要加分号：

```javascript
function f() {
  // 函数声明后不需要加分号
}

for(;;) {
  // 循环语句后不需要加分号
}
```

……但即使我们在某处添加了「额外的」分号，这也不是错误。分号会被忽略的。

### 严格模式

为了完全启用现代 JavaScript 的所有特性，我们应该在脚本顶部写上 `"use strict"` 指令。

```javascript
'use strict';
...
```

该指令必须位于 JavaScript 脚本的顶部或函数体的开头。
如果没有 `"use strict"`，所有东西仍可以正常工作，但某些功能将以老式的“兼容”方式运行。我们通常更喜欢现代的方式。

### 变量

可以使用以下方式声明变量：

- `let`
- `const`（不变的，不能被改变）
- `var`（旧式的）

一个变量名可以由以下组成：

- 字母和数字，但是第一个字符不能是数字。
- 字符 `$` 和 `_` 是允许的，用法同字母。
- 非拉丁字母和象形文字也是允许的，但通常不会使用。

变量是动态类型的，它们可以存储任何值：

```javascript
let x = 5;
x = "John";
```

有 8 种数据类型：

- `number` — 可以是浮点数，也可以是整数，
- `bigint` — 用于任意长度的整数，
- `string` — 字符串类型，
- `boolean` — 逻辑值：`true`/`false`，
- `null` — 具有单个值 `null` 的类型，表示“空”或“不存在”，
- `undefined` — 具有单个值 `undefined` 的类型，表示“未分配（未定义）”，
- `object` 和 `symbol` — 对于复杂的数据结构和唯一标识符，我们目前还没学习这个类型。

`typeof` 运算符返回值的类型，但有两个例外：

```javascript
typeof null == "object" // JavaScript 编程语言的设计错误
typeof function(){} == "function" // 函数被特殊对待
```

### 交互

我们使用浏览器作为工作环境，所以基本的 UI 功能将是：

- `prompt(question[, default])` 提出一个问题 `question`，并返回访问者输入的内容，如果他按下「取消」则返回 `null`。
- `confirm(question)` 提出一个问题 `question`，并建议用户在“确定”和“取消”之间进行选择。选择结果以 `true`/`false` 形式返回。
- `alert(message)` 输出一个消息 `message`。

这些函数都会产生 **模态框**，它们会暂停代码执行并阻止访问者与页面的其他部分进行交互，直到用户做出回答为止。
举个例子：

```javascript
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

### 运算符

JavaScript 支持以下运算符：

#### 算数运算符

常规的：`+` `-` `*` `/`（加减乘除），取余运算符 `%` 和幂运算符 `**`。
二进制加号 `+` 可以连接字符串。如果任何一个操作数是一个字符串，那么另一个操作数也将被转换为字符串：

```javascript
alert( '1' + 2 ); // '12'，字符串
alert( 1 + '2' ); // '12'，字符串
alert(2 + 2 + '1' ); // "41"，不是 "221"
alert('1' + 2 + 2); // "122"，不是 "14"
```

#### 赋值

简单的赋值：`a = b` 和合并了其他操作的赋值：`a *= 2`。

#### 按位运算符

按位运算符在最低位级上操作 32 位的整数

#### 三元运算符

唯一具有三个参数的操作：`cond ? resultA : resultB`。如果 `cond` 为真，则返回 `resultA`，否则返回 `resultB`。
有时我们需要根据一个条件去赋值一个变量。
如下所示：

```javascript
let accessAllowed;
let age = prompt('How old are you?', '');

if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}

alert(accessAllowed);
```

所谓的“条件”或“问号”运算符让我们可以更简短地达到目的。
这个运算符通过问号 `?` 表示。有时它被称为三元运算符，被称为“三元”是因为该运算符中有三个操作数。实际上它是 JavaScript 中唯一一个有这么多操作数的运算符。
语法：

```javascript
let result = condition ? value1 : value2;
```

计算条件结果，如果结果为真，则返回 `value1`，否则返回 `value2`。
例如：

```javascript
let accessAllowed = (age > 18) ? true : false;
```

技术上讲，我们可以省略 `age > 18` 外面的括号。问号运算符的优先级较低，所以它会在比较运算符 `>` 后执行。
下面这个示例会执行和前面那个示例相同的操作：

```javascript
// 比较运算符 "age > 18" 首先执行
//（不需要将其包含在括号中）
let accessAllowed = age > 18 ? true : false;
```

但括号可以使代码可读性更强，所以我们建议使用它们。
请注意：
在上面的例子中，你可以不使用问号运算符，因为比较本身就返回 `true`/`false`：

```javascript
// 下面代码同样可以实现
let accessAllowed = age > 18;
```

#### 多个 ‘?’

使用一系列问号 `?` 运算符可以返回一个取决于多个条件的值。
例如：

```javascript
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

可能很难一下子看出发生了什么。但经过仔细观察，我们可以看到它只是一个普通的检查序列。

1. 第一个问号检查 `age < 3`。
2. 如果为真 — 返回 `'Hi, baby!'`。否则，会继续执行冒号 `:` 后的表达式，检查 `age < 18`。
3. 如果为真 — 返回 `'Hello!'`。否则，会继续执行下一个冒号 `:` 后的表达式，检查 `age < 100`。
4. 如果为真 — 返回 `'Greetings!'`。否则，会继续执行最后一个冒号 `:` 后面的表达式，返回 `'What an unusual age!'`。

这是使用 `if..else` 实现上面的逻辑的写法：

```javascript
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

#### ‘?’ 的非常规使用

有时可以使用问号 `?` 来代替 `if` 语句：

```javascript
let company = prompt('Which company created JavaScript?', '');

(company == 'Netscape') ?alert('Right!') : alert('Wrong.');
```

根据条件 `company =='Netscape'`，要么执行 `?` 后面的第一个表达式并显示对应内容，要么执行第二个表达式并显示对应内容。
在这里我们不是把结果赋值给变量。而是根据条件执行不同的代码。
**不建议这样使用问号运算符。**
这种写法比 `if` 语句更短，对一些程序员很有吸引力。但它的可读性差。
下面是使用 `if` 语句实现相同功能的代码，进行下比较：

```javascript
let company = prompt('Which company created JavaScript?', '');

if (company == 'Netscape') {
    alert('Right!');
} else {
    alert('Wrong.');
}
```

因为我们的眼睛垂直扫描代码。所以，跨越几行的代码块比长而水平的代码更易于理解。
问号 `?` 的作用是根据条件返回其中一个值。请正确使用它。当需要执行不同的代码分支时，请使用 `if`。

#### 逻辑运算符

逻辑与 `&&` 和或 `||` 执行短路运算，然后返回运算停止处的值（`true`/`false` 不是必须的）。逻辑非 `!` 将操作数转换为布尔值并返回其相反的值。

#### 空值合并运算符

`a ?? b` 的结果是：

- 如果 `a` 是已定义的，则结果为 `a`，
- 如果 `a` 不是已定义的，则结果为 `b`。

换句话说，如果第一个参数不是 `null`/`undefined`，则 `??` 返回第一个参数。否则，返回第二个参数。

```javascript
let user;

alert(user ?? "匿名"); // 匿名（user 未定义）
```

`??` 运算符从一列变量中，选取值为已定义的值（defined value）的变量。`a ?? b` 的结果是 `a`，除非 `a` 为 `null`/`undefined`，这时结果是 `b`。

#### 比较运算符

对不同类型的值进行相等检查时，运算符 `==` 会将不同类型的值转换为数字（除了 `null` 和 `undefined`，它们彼此相等而没有其他情况），所以下面的例子是相等的：

```javascript
alert( 0 == false ); // true
alert( 0 == '' ); // true
```

其他比较也将转换为数字。
严格相等运算符 `===` 不会进行转换：不同的类型总是指不同的值。
值 `null` 和 `undefined` 是特殊的：它们只在 `==` 下相等，且不相等于其他任何值。
大于/小于比较，在比较字符串时，会按照字符顺序逐个字符地进行比较。其他类型则被转换为数字。

#### 其他运算符

还有很少一部分其他运算符，如逗号运算符。

### 循环

- 我们涵盖了 3 种类型的循环：

```javascript
// 1
while (condition) {
  ...
}

// 2
do {
  ...
} while (condition);

// 3
for(let i = 0; i < 10; i++) {
  ...
}
```

- 在 `for(let...)` 循环内部声明的变量，只在该循环内可见。但我们也可以省略 `let` 并重用已有的变量。
- 指令 `break`/`continue` 允许退出整个循环/当前迭代。使用标签来打破嵌套循环。

### “switch” 结构

“switch” 结构可以替代多个 `if` 检查。它内部使用 `===`（严格相等）进行比较。
例如：

```javascript
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // prompt 的结果是一个字符串，而不是数字
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

## 函数

### 函数表达式 vs 函数声明

- **函数声明**：在主代码流中声明为单独的语句的函数：

```javascript
// 函数声明
function sum(a, b) {
    return a + b;
}
```

- **函数表达式**：在一个表达式中或另一个语法结构中创建的函数。下面这个函数是在赋值表达式 `=` 右侧创建的：

```javascript
// 函数表达式
let sum = function(a, b) {
    return a + b;
};
```

更细微的差别是，JavaScript 引擎会在 **什么时候** 创建函数。
函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用。
一旦代码执行到赋值表达式 `let sum = function…` 的右侧，此时就会开始创建该函数，并且可以从现在开始使用（分配，调用等）。

函数声明则不同。
在函数声明被定义之前，它就可以被调用。
例如，一个全局函数声明对整个脚本来说都是可见的，无论它被写在这个脚本的哪个位置。
这是内部算法的缘故。当 JavaScript 准备 **运行脚本**时，首先会在脚本中寻找全局函数声明，并创建这些函数。我们可以将其视为“初始化阶段”。
在处理完所有函数声明后，代码才被执行。所以运行时能够使用这些函数。

例如下面的代码会正常工作：

```javascript
sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

函数声明 `sayHi` 是在 JavaScript 准备运行脚本时被创建的，在这个脚本的任何位置都可见。

……如果它是一个函数表达式，它就不会工作：

```javascript
sayHi("John"); // error!

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

函数表达式在代码执行到它时才会被创建。只会发生在 `(*)` 行。为时已晚。

函数声明的另外一个特殊的功能是它们的块级作用域。
严格模式下，当一个函数声明在一个代码块内时，它在该代码块内的任何位置都是可见的。但在代码块外不可见。
例如，想象一下我们需要依赖于在代码运行过程中获得的变量 `age` 声明一个函数 `welcome()`。并且我们计划在之后的某个时间使用它。
如果我们使用函数声明，则以下代码无法像预期那样工作：

```javascript
let age = prompt("What is your age?", 18);

// 有条件地声明一个函数
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ……稍后使用
welcome(); // Error: welcome is not defined
```

这是因为函数声明只在它所在的代码块中可见。
下面是另一个例子：

```javascript
let age = 16; // 拿 16 作为例子

if (age < 18) {
  welcome();               // \   (运行)
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  函数声明在声明它的代码块内任意位置都可用
  }                        //  |
                           //  |
  welcome();               // /   (运行)

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// 在这里，我们在花括号外部调用函数，我们看不到它们内部的函数声明。


welcome(); // Error: welcome is not defined
```

我们怎么才能让 `welcome` 在 `if` 外可见呢？
正确的做法是使用函数表达式，并将 `welcome` 赋值给在 `if` 外声明的变量，并具有正确的可见性。
下面的代码可以如愿运行：

```javascript
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

welcome(); // 现在可以了
```

或者我们可以使用问号运算符 `?` 来进一步对代码进行简化：

```javascript
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

welcome(); // 现在可以了
```

### 什么时候选择函数声明与函数表达式？

根据经验，当我们需要声明一个函数时，首先考虑函数声明语法。它能够为组织代码提供更多的灵活性。因为我们可以在声明这些函数之前调用这些函数。
这对代码可读性也更好，因为在代码中查找 `function f(…) {…}` 比 `let f = function(…) {…}` 更容易。函数声明更“醒目”。
……但是，如果由于某种原因而导致函数声明不适合我们（我们刚刚看过上面的例子），那么应该使用函数表达式。

### 箭头函数

创建函数还有另外一种非常简单的语法，并且这种方法通常比函数表达式更好。
它被称为“箭头函数”，因为它看起来像这样：

```javascript
let func = (arg1, arg2, ..., argN) => expression;
```

这里创建了一个函数 `func`，它接受参数 `arg1..argN`，然后使用参数对右侧的 `expression` 求值并返回其结果。
换句话说，它是下面这段代码的更短的版本：

```javascript
let func = function(arg1, arg2, ..., argN) {
    return expression;
};
```

让我们来看一个具体的例子：

```javascript
let sum = (a, b) => a + b;

/* 这个箭头函数是下面这个函数的更短的版本：

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

可以看到 `(a, b) => a + b` 表示一个函数接受两个名为 `a` 和 `b` 的参数。在执行时，它将对表达式 `a + b` 求值，并返回计算结果。

- 如果我们只有一个参数，还可以省略掉参数外的圆括号，使代码更短。
- 例如：

```javascript
let double = n => n * 2;// 差不多等同于：let double = function(n) { return n * 2 }

alert( double(3) ); // 6
```

- 如果没有参数，括号则是空的（但括号必须保留）：

```javascript
let sayHi = () => alert("Hello!");
sayHi();
```

箭头函数可以像函数表达式一样使用。
例如，动态创建一个函数：

```javascript
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");

welcome();
```

一开始，箭头函数可能看起来并不熟悉，也不容易读懂，但一旦我们看习惯了之后，这种情况很快就会改变。
箭头函数对于简单的单行行为（action）来说非常方便，尤其是当我们懒得打太多字的时候。

### 多行的箭头函数

到目前为止，我们看到的箭头函数非常简单。它们从 `=>` 的左侧获取参数，计算并返回右侧表达式的计算结果。
有时我们需要更复杂一点的函数，比如带有多行的表达式或语句。在这种情况下，我们可以使用花括号将它们括起来。主要区别在于，用花括号括起来之后，需要包含 `return` 才能返回值（就像常规函数一样）。
就像这样：

```javascript
let sum = (a, b) => {  // 花括号表示开始一个多行函数
  let result = a + b;
  return result; // 如果我们使用了花括号，那么我们需要一个显式的 “return”
};

alert( sum(1, 2) ); // 3
```

### 作用域

```javascript
// 全局作用域
let globalVar = "我是全局变量";

function test() {
  // 函数作用域
  let localVar = "我是局部变量";
  console.log(globalVar);  // ✅ 可以访问
  console.log(localVar);   // ✅ 可以访问
}

test();
console.log(globalVar);  // ✅ 可以访问
// console.log(localVar);  // ❌ 报错！

// 块级作用域
if (true) {
  let blockVar = "块级变量";
  console.log(blockVar);  // ✅
}
// console.log(blockVar);  // ❌ 报错！
```

## 对象

### 什么是对象？

对象是键值对的集合，用于存储和组织相关的数据和功能。

```javascript
// 创建对象的几种方式

//1. 对象字面量（最常用）
const person = {
  name: "张三",
  age: 25,
  city: "北京"
};

// 2. 使用 new Object()
const car = new Object();
car.brand = "Tesla";
car.model = "Model 3";

// 3. 使用构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const user = new Person("李四", 30);

// 4. 使用 Object.create()
const proto = { greeting: "Hello" };
const obj = Object.create(proto);
```

### 访问对象属性

```javascript
const student = {
  name: "小明",
  age: 18,
  "favorite color": "blue"  // 带空格的属性名
};

// 点表示法
console.log(student.name);  // "小明"

// 方括号表示法
console.log(student["age"]);  // 18
console.log(student["favorite color"]);  // "blue"

// 动态访问
const key = "name";
console.log(student[key]);  // "小明"
```

### 对象的常用操作

```javascript
const book = {
  title: "JavaScript 权威指南",
  author: "David Flanagan",
  year: 2020
};

// 添加/修改属性
book.pages = 1096;
book.year = 2021;

// 删除属性
delete book.year;

// 检查属性是否存在
console.log("title" in book);  // true
console.log(book.hasOwnProperty("author"));  // true

// 遍历对象
for (let key in book) {
  console.log(`${key}: ${book[key]}`);
}

// 获取所有键
console.log(Object.keys(book));  // ["title", "author", "pages"]

// 获取所有值
console.log(Object.values(book));  // ["JavaScript 权威指南", "David Flanagan", 1096]

// 获取键值对数组
console.log(Object.entries(book));  
// [["title", "JavaScript 权威指南"], ["author", "David Flanagan"], ["pages", 1096]
```

## 类

### 基本语法

```javascript
class MyClass {
  // class 方法
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

然后使用 `new MyClass()` 来创建具有上述列出的所有方法的新对象。
`new` 会自动调用 `constructor()` 方法，因此我们可以在 `constructor()` 中初始化对象。
例如：

```javascript
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// 用法：
let user = new User("John");
user.sayHi();
```

当 `new User("John")` 被调用：

1. 一个新对象被创建。
2. `constructor` 使用给定的参数运行，并将其赋值给 `this.name`。
   ……然后我们就可以调用对象方法了，例如 `user.sayHi`。

### 什么是 class

```javascript
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class 是一个函数
alert(typeof User); // function

// ...或者，更确切地说，是 constructor 方法
alert(User === User.prototype.constructor); // true

// 方法在 User.prototype 中，例如：
alert(User.prototype.sayHi); // sayHi 方法的代码

// 在原型中实际上有两个方法
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

`class User {...}` 构造实际上做了如下的事儿：

1. 创建一个名为 `User` 的函数，该函数成为类声明的结果。该函数的代码来自于 `constructor` 方法（如果我们不编写这种方法，那么它就被假定为空）。
2. 存储类中的方法，例如 `User.prototype` 中的 `sayHi`。

### 类表达式

```javascript
// “命名类表达式（Named Class Expression）”
// (规范中没有这样的术语，但是它和命名函数表达式类似)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // MyClass 这个名字仅在类内部可见
  }
};

new User().sayHi(); // 正常运行，显示 MyClass 中定义的内容

alert(MyClass); // error，MyClass 在外部不可见
```

### getter 和 setter

```javascript
class User {

  constructor(name) {
    // 调用 setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name is too short.
```

类声明可以通过在 `User.prototype` 中创建 getters 和 setters 来实现。

## 面向对象

### 简单类比

```javascript
// 把"人"这个概念变成代码中的对象

class Person {
  constructor(name, age) {
    this.name = name;  // 属性：名字
    this.age = age;    // 属性：年龄
  }
  
  // 方法：说话
  speak(message) {
    console.log(`${this.name} 说: ${message}`);
  }
  
  // 方法：自我介绍
  introduce() {
    console.log(`大家好，我是 ${this.name}，今年 ${this.age} 岁`);
  }
}

// 创建具体的人（对象）
const xm = new Person('xm', 20);
xm.introduce();  // 大家好，我是 xm，今年 20 岁
xm.speak('你好！'); // xm 说: 你好！
```

### 核心概念

#### 封装

把数据和方法包在一起，隐藏细节

```javascript
class Phone {
  #battery = 100;  // 私有属性，外部看不到
  
  useBattery() {
    this.#battery -= 10;
    console.log(`剩余电量: ${this.#battery}%`);
  }
}

const myPhone = new Phone();
myPhone.useBattery();  // 剩余电量: 90%
// myPhone.#battery = 100;  // ❌ 错误！无法直接修改
```

#### 继承

子类继承父类的属性和方法

```javascript
// 父类
class Animal {
  eat() {
    console.log('正在吃东西...');
  }
}

// 子类继承父类
class Dog extends Animal {
  bark() {
    console.log('汪汪汪！');
  }
}

const dog = new Dog();
dog.eat();   // 正在吃东西... (继承自父类)
dog.bark();  // 汪汪汪！(自己的方法)
```

#### 多态

同一个方法，不同对象有不同表现

```javascript
class Animal {
  makeSound() {
    console.log('动物发出声音');
  }
}

class Dog extends Animal {
  makeSound() {
    console.log('汪汪汪！');
  }
}

class Cat extends Animal {
  makeSound() {
    console.log('喵喵喵！');
  }
}

const dog = new Dog();
const cat = new Cat();

dog.makeSound();  // 汪汪汪！
cat.makeSound();  // 喵喵喵！(同一个方法，不同表现)
```

### 为什么要用面向对象

```javascript
let dog1Name = '旺财';
let dog1Age = 3;

let dog2Name = '大黄';
let dog2Age = 5;

function dog1Bark() {
  console.log(`${dog1Name} 在叫`);
}

function dog2Bark() {
  console.log(`${dog2Name} 在叫`);
}
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  bark() {
    console.log(`${this.name} 在叫`);
  }
}

const dog1 = new Dog('旺财', 3);
const dog2 = new Dog('大黄', 5);

dog1.bark();  // 旺财 在叫
dog2.bark();  // 大黄 在叫
```

## 认识浏览器 API

浏览器 API（Browser APIs）是由浏览器提供的一组接口和功能，允许 JavaScript 代码与浏览器和用户的计算机进行交互。这些 API 让网页应用能够访问系统资源、处理用户交互等。

### DOM （文档对象模型）

#### 选择元素

```javascript
// 1. 通过 ID 选择（返回单个元素）
const header = document.getElementById('header');

// 2. 通过类名选择（返回 HTMLCollection）
const items = document.getElementsByClassName('item');

// 3. 通过标签名选择（返回 HTMLCollection）
const divs = document.getElementsByTagName('div');

// 4. 通过 CSS 选择器（返回第一个匹配元素）
const firstBtn = document.querySelector('.btn');
const mainTitle = document.querySelector('#main-title');
const firstPara = document.querySelector('p');

// 5. 通过 CSS 选择器（返回所有匹配元素的 NodeList）
const allBtns = document.querySelectorAll('.btn');
const allParas = document.querySelectorAll('p');

// 6. 特殊选择
document.body;           // 获取 body 元素
document.head;           // 获取 head 元素
document.documentElement; // 获取 html 元素
```

推荐使用： `querySelector` 和 `querySelectorAll`（更灵活强大）

#### 操作元素内容

```javascript
const div = document.querySelector('#myDiv');

// 1. textContent - 纯文本内容
div.textContent = '这是纯文本';
console.log(div.textContent);

// 2. innerHTML - HTML 内容
div.innerHTML = '<strong>这是粗体文本</strong>';
console.log(div.innerHTML);

// 3. innerText - 可见文本（考虑 CSS 样式）
div.innerText = '可见文本';

// 示例：
const example = document.querySelector('#example');
example.innerHTML = `
  <h2>标题</h2>
  <p>段落内容</p>
  <ul>
    <li>项目 1</li>
    <li>项目 2</li>
  </ul>
`;
```

#### 操作元素属性

```javascript
const img = document.querySelector('img');
const link = document.querySelector('a');

// 1. 获取/设置标准属性
img.src = 'new-image.jpg';
img.alt = '图片描述';
console.log(img.src);

link.href = 'https://example.com';
link.target = '_blank';

// 2. getAttribute / setAttribute（适用于所有属性）
const customValue = img.getAttribute('data-id');
img.setAttribute('data-id', '123');

// 3. 移除属性
img.removeAttribute('alt');

// 4. 检查属性是否存在
if (img.hasAttribute('src')) {
  console.log('图片有 src 属性');
}

// 5. data-* 属性（HTML5 自定义属性）
// HTML: <div data-user-id="123" data-role="admin"></div>
const div = document.querySelector('div');
console.log(div.dataset.userId);  // "123"
console.log(div.dataset.role);    // "admin"
div.dataset.newAttr = 'value';    // 设置 data-new-attr="value"
```

#### 操作 css 样式

```javascript
const box = document.querySelector('.box');

// 1. 直接修改行内样式
box.style.color = 'red';
box.style.backgroundColor = 'blue';  // 注意：CSS 的 background-color 变成驼峰命名
box.style.fontSize = '20px';
box.style.width = '300px';

// 2. 设置多个样式
Object.assign(box.style, {
  color: 'white',
  backgroundColor: 'black',
  padding: '20px',
  borderRadius: '10px'
});

// 3. 使用 cssText（一次性设置多个）
box.style.cssText = 'color: red; background: blue; font-size: 20px;';

// 4. 获取计算后的样式
const styles = window.getComputedStyle(box);
console.log(styles.color);
console.log(styles.fontSize);

// 5. 操作 class（推荐方法）
box.classList.add('active');           // 添加类
box.classList.remove('hidden');        // 移除类
box.classList.toggle('highlight');     // 切换类（有则删，无则加）
box.classList.contains('active');      // 检查是否有某个类
box.classList.replace('old', 'new');   // 替换类

// 老方法（不推荐）
box.className = 'box active';          // 直接设置（会覆盖）
box.className += ' new-class';         // 添加类
```

#### 创建和插入元素

```javascript
// 1. 创建元素
const div = document.createElement('div');
const p = document.createElement('p');
const span = document.createElement('span');

// 2. 设置内容和属性
div.textContent = '这是新创建的 div';
div.className = 'new-div';
div.id = 'myDiv';

// 3. 插入元素
const container = document.querySelector('#container');

// appendChild - 添加到末尾
container.appendChild(div);

// insertBefore - 插入到指定元素前面
const firstChild = container.firstElementChild;
container.insertBefore(p, firstChild);

// append / prepend（可以插入多个，包括文本）
container.append(span, '文本内容');    // 添加到末尾
container.prepend('开头的文本', p);    // 添加到开头

// after / before - 在元素前后插入
div.before('前面的内容');
div.after('后面的内容');

// insertAdjacentHTML - 插入 HTML 字符串
container.insertAdjacentHTML('beforebegin', '<p>在元素前</p>');
container.insertAdjacentHTML('afterbegin', '<p>在内容开头</p>');
container.insertAdjacentHTML('beforeend', '<p>在内容末尾</p>');
container.insertAdjacentHTML('afterend', '<p>在元素后</p>');

// 4. 完整示例：创建一个列表
const ul = document.createElement('ul');
const items = ['苹果', '香蕉', '橙子'];

items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  ul.appendChild(li);
});

document.body.appendChild(ul);
```

#### 删除和替换元素

```javascript
const element = document.querySelector('#myElement');
const parent = document.querySelector('#parent');

// 1. 删除元素
element.remove();  // 直接删除自己（现代方法）
parent.removeChild(element);  // 通过父元素删除（老方法）

// 2. 替换元素
const newElement = document.createElement('div');
newElement.textContent = '新元素';
element.replaceWith(newElement);  // 直接替换（现代方法）
parent.replaceChild(newElement, element);  // 通过父元素替换（老方法）

// 3. 清空元素内容
parent.innerHTML = '';  // 方法 1
while (parent.firstChild) {  // 方法 2（更安全）
  parent.removeChild(parent.firstChild);
}
```

### BOM（浏览器对象模型）

用于与浏览器窗口交互

```javascript
// 窗口对象
window.alert('提示')
window.confirm('确认?')
window.location.href = 'https://example.com'

// 定时器
setTimeout(() => { console.log('延迟执行') }, 1000)
setInterval(() => { console.log('循环执行') }, 1000)

// 浏览器历史
window.history.back()
window.history.forward()
```

### 事件

处理用户交互事件

```javascript
const button = document.querySelector('#myButton');

// 1. addEventListener（推荐）
button.addEventListener('click', function(event) {
  console.log('按钮被点击了');
  console.log('事件对象：', event);
});

// 2. 使用箭头函数
button.addEventListener('click', (event) => {
  console.log('点击', event.target);
});

// 3. 命名函数（便于移除）
function handleClick(event) {
  console.log('处理点击');
}
button.addEventListener('click', handleClick);

// 移除事件监听器
button.removeEventListener('click', handleClick);

// 4. 老方法（不推荐，会覆盖之前的）
button.onclick = function() {
  console.log('点击');
};

// 5. HTML 属性（不推荐）
// <button onclick="handleClick()">点击</button>
```

4. Fetch

用于网络请求

5. LocalStorage & SessionStorage

本地数据存储

6. Geolocation

获取用户地理位置

7. Notification

显示桌面通知

8. Canvas

绘制图形

9. Geolocation

地理定位

10. Service Worker

离线支持和后台运行

11. Web Storage

本地存储

12. Multimedia

音频和视频控制
