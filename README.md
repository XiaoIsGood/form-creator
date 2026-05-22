# FormCreator

纯 JavaScript 表单创建库，零依赖，JSON Schema 驱动，支持 13 种常用表单组件。

## 特性

- **零依赖** — 纯 JS，不依赖任何框架或库
- **JSON Schema 驱动** — 配置可存入数据库，远程下发
- **13 种组件** — 文本、密码、数字、文本域、开关、下拉、单选、多选、日期、时间、文件、颜色、滑块
- **CSS 完全隔离** — `all: initial` + `!important` + `.form-creator` 前缀，外部样式无法污染
- **多项目共享校验器** — JSON 配置用字符串引用，JS 函数集中管理
- **响应式布局** — vertical / horizontal / inline 三种排列
- **CSS 变量主题** — 14 个变量控制所有样式

## 快速开始

### 浏览器引入

```html
<script src="form-creator.js"></script>
<script>
  const form = new FormCreator({
    container: '#form',
    schema: [
      { type: 'text', name: 'username', label: '用户名', placeholder: '请输入',
        rules: [{ required: true, message: '不能为空' }] },
      { type: 'password', name: 'password', label: '密码' },
      { type: 'select', name: 'role', label: '角色', options: ['管理员', '普通用户'] },
    ],
  });
</script>
```

### 获取/设置值

```js
// 获取全部
form.getValues();  // { username: 'admin', password: '123', role: '管理员' }

// 批量设置
form.setValues({ username: '新用户名' });

// 单个字段
form.getField('username').getValue();
form.getField('username').setValue('新值');
```

### 校验

```js
const result = form.validate();
// { valid: false, errors: { username: ['不能为空'], password: ['至少6个字符'] } }
```

### 监听变化

```js
const unsub = form.onChange((values, changedField) => {
  console.log('表单变化:', changedField, values);
});
// 取消监听
unsub();
```

### 重置

```js
form.reset();  // 恢复到 schema 中定义的 defaultValues
```

### 销毁

```js
form.destroy();  // 移除 DOM、清理事件
```

## Schema 字段配置

```js
{
  type: 'text',              // 组件类型（必填）
  name: 'field_name',        // 字段名，getValues 的 key（必填）
  label: '标签文本',          // 显示标签
  defaultValue: '',          // 默认值
  placeholder: '请输入...',
  disabled: false,
  // 各组件特有属性（按需传入）
  options: [],               // select / radio / checkbox 的选项
  min: 0,                    // number / slider 的最小值
  max: 100,                  // number / slider 的最大值
  step: 1,                   // number / slider 的步长
  accept: '.jpg,.png',       // file 的文件类型过滤
  multiple: false,           // select / file 是否多选
  rows: 4,                   // textarea 的行数
  // 校验规则 — 纯 JSON 可序列化
  rules: [],
}
```

### 组件类型一览

| type       | 说明     | 特有属性                          |
|------------|---------|----------------------------------|
| text       | 文本输入  | —                                |
| password   | 密码输入  | —                                |
| number     | 数字输入  | min, max, step                   |
| textarea   | 多行文本  | rows                             |
| switch     | 开关     | —                                |
| select     | 下拉选择  | options, multiple                |
| radio      | 单选框组  | options                          |
| checkbox   | 多选框组  | options                          |
| date       | 日期选择  | —                                |
| time       | 时间选择  | —                                |
| color      | 颜色选择  | —                                |
| slider     | 滑块     | min, max, step                   |
| file       | 文件上传  | accept, multiple                 |

### options 支持两种格式

```js
// 简单数组
options: ['北京', '上海', '广州']

// 对象数组
options: [
  { value: 'bj', label: '北京' },
  { value: 'sh', label: '上海' },
]
```

## 校验规则

```js
rules: [
  { required: true, message: '此项必填' },
  { pattern: '^[a-zA-Z0-9]+$', message: '只能输入字母和数字' },  // 正则字符串
  { min: 6, message: '至少6个字符' },
  { max: 20, message: '最多20个字符' },
  { validator: 'isUnique', message: '用户名已存在' },            // 命名校验器
  { custom: v => v !== 'admin', message: '不可用' },            // JS 函数
]
```

### 规则类型

| 规则       | 类型       | 说明                        |
|-----------|-----------|----------------------------|
| required  | Boolean   | 是否必填                     |
| pattern   | String    | 正则匹配（JSON 安全）          |
| min       | Number    | 最小值/最小长度               |
| max       | Number    | 最大值/最大长度               |
| validator | String    | 引用 validators 映射中的函数名  |
| custom    | Function  | 直传函数（不可 JSON 序列化）    |

### 多项目共享校验器

多个项目使用同一份 JS 校验函数，JSON Schema 只存字符串引用：

```js
// 共享库 form-validators.js
const sharedValidators = {
  isUnique: async v => { /* 检查唯一性 */ },
  isEmail: v => /^.+@.+\..+$/.test(v),
  isPhone: v => /^1[3-9]\d{9}$/.test(v),
  notReserved: v => !['admin', 'root', 'system'].includes(v),
};

// 各项目的 JSON 配置（可存数据库）
const schemaFromDB = [
  {
    type: 'text',
    name: 'username',
    label: '用户名',
    rules: [
      { required: true, message: '用户名不能为空' },
      { validator: 'notReserved', message: '该用户名为系统保留' },
      { validator: 'isUnique', message: '用户名已存在' },
    ],
  },
  {
    type: 'text',
    name: 'email',
    label: '邮箱',
    rules: [
      { required: true, message: '邮箱不能为空' },
      { validator: 'isEmail', message: '邮箱格式不正确' },
    ],
  },
];

// 使用
const form = new FormCreator({
  container: '#form',
  schema: schemaFromDB,          // 来自数据库
  validators: sharedValidators,  // 共享函数库
});
```

一套 JS 函数，多份 JSON 配置，完全解耦。

## API 参考

### new FormCreator(options)

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| container | String \| HTMLElement | 是 | 容器元素或 CSS 选择器 |
| schema | Array | 是 | 字段配置数组 |
| layout | String | 否 | vertical（默认）/ horizontal / inline |
| validators | Object | 否 | 命名校验器映射 |

### 实例方法

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `getValues()` | Object | 获取所有字段值 |
| `setValues(data)` | — | 批量设置字段值 |
| `validate()` | `{ valid, errors }` | 全量校验，errors 按字段名分组 |
| `reset()` | — | 恢复所有字段为默认值 |
| `onChange(fn)` | Function | 注册变化回调，返回注销函数 |
| `getField(name)` | FormField \| null | 获取单个字段实例 |
| `destroy()` | — | 销毁实例，清理 DOM 和事件 |

### onChange 回调

```js
form.onChange((values, changedFieldName) => {
  // values: 当前所有字段值
  // changedFieldName: 触发变化的字段名
});
```

### FormField 实例

| 成员 | 类型 | 说明 |
|------|------|------|
| `getValue()` | Function | 获取字段值 |
| `setValue(val)` | Function | 设置字段值 |
| `validate()` | Function | 校验该字段，返回错误数组 |
| `$el` | HTMLElement | 字段根 DOM 元素 |

## 自定义样式

通过 CSS 变量覆盖默认样式，在 `.form-creator` 或 `:root` 上设置：

```css
:root {
  --fc-font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --fc-font-size: 14px;
  --fc-primary-color: #1890ff;
  --fc-input-radius: 4px;
  --fc-input-border: #d9d9d9;
  --fc-input-focus-border: #1890ff;
  --fc-input-focus-shadow: 0 0 0 2px rgba(24,144,255,0.2);
  --fc-error-color: #ff4d4f;
  --fc-input-error-border: #ff4d4f;
  --fc-label-color: #262626;
  --fc-label-weight: 600;
  --fc-input-bg: #fafafa;
  --fc-spacing: 20px;
  --fc-disabled-opacity: 0.4;
  --fc-input-padding: 10px 14px;
  --fc-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 全部 CSS 变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--fc-font-family` | system-ui, sans-serif | 字体 |
| `--fc-font-size` | 14px | 字号 |
| `--fc-label-color` | #333 | 标签颜色 |
| `--fc-label-weight` | 500 | 标签字重 |
| `--fc-input-bg` | #fff | 输入框背景 |
| `--fc-input-border` | #d1d5db | 输入框边框 |
| `--fc-input-radius` | 6px | 输入框圆角 |
| `--fc-input-focus-border` | #4a90d9 | 聚焦边框色 |
| `--fc-input-focus-shadow` | 0 0 0 3px rgba(...) | 聚焦阴影 |
| `--fc-input-error-border` | #e74c3c | 错误边框色 |
| `--fc-error-color` | #e74c3c | 错误文字色 |
| `--fc-error-size` | 12px | 错误文字大小 |
| `--fc-primary-color` | #4a90d9 | 主色调 |
| `--fc-spacing` | 16px | 字段间距 |
| `--fc-disabled-opacity` | 0.5 | 禁用透明度 |
| `--fc-input-padding` | 8px 12px | 输入框内边距 |
| `--fc-transition` | 0.2s ease | 过渡动画 |

## 兼容性

- Chrome / Edge 90+
- Firefox 90+
- Safari 15+
- 支持 ESM（`module.exports`）和浏览器 `<script>` 两种引入方式

## 许可证

MIT
