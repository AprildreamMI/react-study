# React 小书

## 基本环境

1. 安装node

   > 修改node镜像

   ```
   npm config set registry https://registry.npm.taobao.org
   ```

2. 全局安装脚手架

   ```javascript
   npm install -g create-react-app
   ```

3. 通过脚手架命令新建工程

   ```javascript
   create-react-app hello-react
   ```

## 使用JSX描述UI信息

### JSX 原理

```javascript
<div class='box' id='content'>
  <div class='title'>Hello</div>
  <button>Click</button>
</div>
```

> 每个DOM元素的结构都可以用javaScript的对象来表示，一个DOM元素包含的信息其实包含三个
>
> 1. 标签名
> 2. 属性
> 3. 子元素

**用JavaScript 来表示**

```javascript
{
  tag: 'div',
  attrs: { className: 'box', id: 'content'},
  children: [
    {
      tag: 'div',
      arrts: { className: 'title' },
      children: ['Hello']
    },
    {
      tag: 'button',
      attrs: null,
      children: ['Click']
    }
  ]
}
```

