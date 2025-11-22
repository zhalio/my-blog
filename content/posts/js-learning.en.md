---
title: "JS Basics / Understanding Browser APIs"
date: "2025-11-20"
category: "tech"
summary: "Frontend Group Third Lecture Document"
tags:
  - JavaScript
  - Frontend
  - Learning
---

## JavaScript Introduction

### What is JavaScript?
JavaScript was initially created to "make web pages alive".
Programs written in this language are called **scripts**. They can be written directly in the HTML of a web page and run automatically when the page loads.
Scripts are provided and executed as plain text. They do not need special preparation or compilation to run.
In this respect, JavaScript is very different from Java.

### Why is it called JavaScript?
When JavaScript was first born, its name was "LiveScript". But because Java was very popular at the time, it was decided that positioning a new language as Java's "younger brother" would help its popularity.
As JavaScript evolved, it became a completely independent language with its own specification, ECMAScript. Now, it has no relationship with Java.

Today, JavaScript can run not only in browsers but also on servers, or even on any device equipped with a JavaScript engine.
Browsers have embedded JavaScript engines, sometimes called "JavaScript Virtual Machines".
Different engines have different "codenames", for example:
- V8 — JavaScript engine in Chrome, Opera, and Edge.
- SpiderMonkey — JavaScript engine in Firefox.
- ...and others like "Chakra" for IE, "JavaScriptCore", "Nitro", and "SquirrelFish" for Safari, etc.

### What can JavaScript in the browser do?
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or CPU because it was initially created for browsers which do not require these features.
JavaScript's capabilities largely depend on the environment it runs in. For example, Node.js supports functions that allow JavaScript to read/write arbitrary files, perform network requests, etc.
JavaScript in the browser can do everything related to web page manipulation, user interaction, and web servers.

For example, JavaScript in the browser can:
- Add new HTML to the page, modify existing content and styles.
- Respond to user actions, mouse clicks, pointer movements, key presses.
- Send network requests to remote servers, download and upload files (AJAX and COMET technologies).
- Get or set cookies, ask questions to visitors, or send messages.
- Remember client-side data ("local storage").

## JavaScript Basics

### "script" tag
We can insert JavaScript programs anywhere in an HTML document using the `<script>` tag.
For example:
```html
<!DOCTYPE HTML>
<html>
<body>
  <p>Before script tag...</p>
  <script>alert('Hello, world!');</script>
  <p>...After script tag</p>
</body>
</html>
```

### Variables
Variables can be declared using:
- `let`
- `const` (constant, cannot be changed)
- `var` (old style)

Variables are dynamically typed, they can store any value:
```javascript
let x = 5;
x = "John";
```

### Interaction
We use the browser as our working environment, so basic UI functions are:
- `prompt(question[, default])`
- `confirm(question)`
- `alert(message)`

## Functions

### Function Declaration vs Expression
```javascript
// Function Declaration
function sum(a, b) {
    return a + b;
}

// Function Expression
let sum = function(a, b) {
    return a + b;
};
```

### Arrow Functions
```javascript
let sum = (a, b) => a + b;
```

## Objects
Objects are collections of key-value pairs.
```javascript
const person = {
  name: "John",
  age: 25,
  city: "New York"
};
```

## Classes
```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}
```

## Browser APIs
Browser APIs are built-in interfaces that allow JavaScript to interact with the browser and computer.

### DOM (Document Object Model)
```javascript
const header = document.getElementById('header');
const items = document.querySelectorAll('.item');
```
