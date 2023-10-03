## superagent
用于在浏览器和 Node.js 环境中发起 HTTP 请求
```
npm install superagent --save
npm install @types/superagent --save-dev
```

## cheerio
用于解析和操作 HTML 和 XML
```
npm install cheerio --save
```
```typescript
// HTML/XML 结构字符串
const $ = cheerio.load('HTML/XML');
// 获取对应 class 或者 标签 内容
$('.xxx')
// .eq() 用于选择元素集合中的特定索引位置的元素
xx.eq(1)
```

## nodemon
nodemon 是一个工具，可在检测到目录中的文件更改时自动重新启动节点应用程序，从而帮助开发基于 Node.js 的应用程序
```
npm i nodemon -D

nodemon ./build/crawler.js
```
```typescript
// package.json 配置忽略文件
"nodemonConfig": {
  "ignore": ["data/**"]
}
```

## concurrently
同时运行多个命令
```
npm i concurrently -D
```
```typescript
concurrently 'npm run dev' 'npm run serve'
// 同时运行 所有 dev 环境下的 执行命令
concurrently npm:dev:*
```

## fs
- Node.js 的核心模块之一，提供了文件系统操作的功能
  - 读取文件, 写入文件, 创建文件, 删除文件, 操作目录等

```javascript
const fs = require('fs');

// 读取文件内容
fs.readFile('file.txt', 'utf8', (err, data) => {});

// 写入文件内容
fs.writeFile('new-file.txt', 'Hello, Node.js!', (err) => {});

// 删除文件
fs.unlink('file-to-delete.txt', (err) => {});

// 检查目录文件是否存在
fs.existsSync('file.text')
```

## path
Node.js 内置的模块，用于处理文件路径的字符串
```javascript
const path = require('path');

// 拼接路径, __dirname 当前执行脚本所在的目录的绝对路径
const fullPath = path.join(__dirname, 'files', 'file.txt');

// 获取路径的文件名部分
const filename = path.basename(fullPath);

// 获取路径的目录名部分
const directory = path.dirname(fullPath);

// 解析路径，获取绝对路径
const absolutePath = path.resolve(__dirname， 'relative-path.txt');

```




