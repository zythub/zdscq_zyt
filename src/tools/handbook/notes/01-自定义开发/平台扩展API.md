---
type: 参考
status: 进行中
created: 2026-09-09
updated: 2026-09-09
tags:
  - 自定义开发
  - 平台扩展
  - outInfo
  - 弹窗
  - 列表渲染
  - 筛选
---

# 平台扩展 API（官方文档未覆盖）

> 本篇是 bestdt 低代码平台的**项目专属扩展 API**：`outInfo` 全集、弹窗/选人/确认、按钮参数、筛选条件枚举、列表/树形渲染、字段→控件 id 反查。
> **基础 ctx/params/事件/子表 API 见 [[表单事件API参考]]**（官方文档浓缩版），本篇不再重复。

## 1. ctx.outInfo 全集

`outInfo` 是表单初始化时外部传入的数据（合并语义，必须用 `ctx.setOutInfo({...})` 写入，勿直接赋值）。系统会派生出以下字段（运行时 `BstRuntime` 原样透传）：

| 属性 | 用途 |
| :--- | :--- |
| `outInfo.status` | 当前状态：`add` / `edit` / `view` / `flow-*` |
| `outInfo.formId` | 当前表单数据 id |
| `outInfo.formTitle` | 表单标题 |
| `outInfo.menuCode` | 当前表单菜单 code |
| `outInfo.reload()` | 重新拉取表单数据 |
| `outInfo.setButtonInitState(...)` | 设置按钮初始状态 |
| `outInfo.editForm(value)` | 编辑态保存（先 `await ctx.submit()`） |
| `outInfo.addForm(value)` | 新增态保存 |
| `outInfo.openFormModal(...)` | 打开表单弹窗 |
| `outInfo.openSelectModal(...)` | 打开选择弹窗 |
| `outInfo.openOrgModal(...)` | 打开选人/组织/岗位 |
| `outInfo.dataMap` | 外部传入的数据映射 |
| `outInfo.reLoad` | 刷新函数 |

### setButtonInitState 示例

```js
const setButtonInitState = ctx.outInfo.setButtonInitState;
setButtonInitState({
  number: { save: 2 },                 // 按钮后数字
  disabled: ["view", "save"],         // 禁用
  hidden: ["view"],                    // 隐藏
});
```

## 2. 弹窗与全局事件

### openFormModal（打开表单弹窗）

```js
const { openFormModal, row } = params;
openFormModal({
  formId: row.id,                 // 数据 id
  functionId: "abc",              // 表单 code（必填）
  instanceId: "12",               // 流程实例 id
  disabled: false,                // true=查看
  formInitData: data,
  onClose: () => {},
  modalProps: { custom: "note" },
  showFile: false,
});
```

### openSelectModal（打开选择弹窗）

```js
openSelectModal({
  functionId: "abc",
  type: "LIST_FORM",  // TREE_MAINTENANCE / TREE_SHOW / TREE_MULTI_TABLE_BINDING / LIST_FORM / FORM
  multiple: false,
  onOk: (rows) => { setFormInitData(rows); },
  advanceConditionList: [],
  conditionList: [],
});
```

### openOrgModal（打开选人/组织/岗位）

```js
openOrgModal({
  mode: 'user',           // 'user' | 'org' | 'pos'
  multiple: false,
  max: 10,
  orgId: 'xxx',
  initValue: [],
  onOk: (value, onClose) => { onClose(); },
  title: '选择人员',
});
```

### confirm

```js
confirm({
  title: '确认',
  content: '确定要删除吗？',
  onOk: () => { /* 删除逻辑 */ },
  onCancel: () => {},
});
```

## 3. 按钮事件与参数

### 点击事件链返回值

- 点击前 `return false` → 点击、点击后都不执行。
- 点击后事件 `params` 中有 `selfEventRes: { success, data }` → 判断原生保存是否成功。
- 事件间传值：`beforeClickEventRes`、`clickEventRes`、`selfEventRes`。

### 启动流程：自定义流程

```js
module.exports = function(request, ctx, params) {
  return {
    setFlow: (formValues, flows) => {
      if (formValues.name === 111) return flows.find(e => e.id === 1)?.procdefId;
      if (formValues.name === 222) return flows.find(e => e.id === 2)?.procdefId;
    }
  };
};
```

### 按钮在列表 / 树形列表中

| 参数 | 说明 |
| :--- | :--- |
| `parentCtx` | 嵌套表单的父实例 |
| `selectedRows` | 配置可选择时勾选的行 |
| `setSelectedRows(rows)` | 设置选中行（必须有 id） |
| `conditions` / `advanceConditions` | 当前查询条件 |
| `row` | 行内按钮：当前行数据 |
| `code` | 当前页面菜单 code |
| `currentNode` | 树形展示：当前节点 |
| `reload()` | 刷新列表 |
| `setFormInitData(data)` | 重设表单初始值 |

### setFormInitData 格式

```js
const data = {
  mainData: [{ code: "number_0vyw...", value: null }],
  subTable: [{
    subFormCode: "subtable_ki...",
    subData: [[{ code: "office_...Name", value: null }, { code: "number_...", value: null }]]
  }]
};
setFormInitData(data);
```

### 全局用户与通知

```js
const { userInfo, message, history } = params;
message.success('成功');
message.error('错误');
message.warning('警告');
history.push('/customform/1231313?id=12314&disabled=true&showFilter=true');
// id=数据id；disabled=true 仅查看；showFilter=true 列表过滤
```

## 4. 筛选条件 symbol 枚举

| 值 | 含义 |
| :--- | :--- |
| EQ | 等于 |
| NE | 不等于 |
| GT / GE | 大于 / 大于等于 |
| LT / LE | 小于 / 小于等于 |
| ALL_LIKE | 包含 |
| LEFT_LIKE / RIGHT_LIKE | 左/右模糊 |

### conditionList

```js
[{ tbName: "table_name", field: "field_name", value: "v", symbol: "EQ", otherValue: "" }]
```

### advanceConditionList

```js
[{
  left: false, right: false,
  connectStr: ' and ',   // ' and ' | ' or '，注意前后空格
  field: "table.field",
  symbol: "EQ",
  value: "v"
}]
```

### 弹窗动态过滤（实例）

```js
// 初始化时按当前登陆人机构过滤
ctx.setInstance("input_s0ls1xxzdhvfvzl4pj", "conditions", [{
  tbName: "tud_wdgcqdbsbzb",
  field: "sys_org_id",
  value: JSON.parse(localStorage.userInfo).companyId,
  symbol: "EQ",
}]);
```

## 5. 列表 / 树形渲染

> 这些函数在「列表/树」的自定义渲染脚本里 `module.exports` 返回对象。

### renderText（单元格文本渲染）

```js
module.exports = function () {
  return {
    renderText: (value, record, index, code) => {
      if (record.input_xxx === null) {
        return "<span style='color:red;'>" + (value || "") + "</span>";
      }
      return value;
    }
  };
};
```

### renderAction（操作列按钮控制）

```js
module.exports = function () {
  return {
    renderAction: (record, btns) => btns.filter(btn => record.id === 1)
  };
};
```

### actionWidth

```js
return { actionWidth: 200 };
```

### 树节点 renderTitle

```js
return {
  renderTitle: (nodeData) => {
    if (nodeData.weight === 0) return '<span style="color:red;">' + nodeData.name + '</span>';
    return '<span style="color:blue;">' + nodeData.name + '</span>';
  }
};
```

### onTreeSelect

```js
return {
  onTreeSelect: ({ setSelectConditions, parentCtx, formDetail, currentNode, setHeaderTitle }) => {
    setHeaderTitle('测试测试');
    setSelectConditions({ conditions: [], advanceConditions: [] });
  }
};
```

## 6. 通过数据库字段名找控件 id（getControlIdByField）

> 控件 id 在测试/正式环境可能不一致，**不要硬编码**，用此函数实时解析。

```js
function getControlIdByField(formInstance, fieldName) {
  const stack = [formInstance];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node.props?.dataField === fieldName && node.id) return node.id;
    if (node.children) for (const c of node.children) stack.push(c);
  }
  return undefined;
}

// 用法：根据数据库字段名动态取控件 id，再安全取值
const gcmcId = getControlIdByField(params.instance, "gcmc");
const gcmc = gcmcId ? ctx.getValue(gcmcId) : undefined;
```

## 关联

- [[表单事件API参考]]（基础 ctx/params/事件/子表 API）
- [[自定义表单开发实战]]（真实出库表单代码，含 getControlIdByField 用法）
- [[04-环境接入与排障/常见问题FAQ]]（控件 id 不一致排查）
