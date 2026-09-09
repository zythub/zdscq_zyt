---
type: 参考
status: 进行中
created: 2026-09-09
updated: 2026-09-09
tags:
  - 自定义开发
  - API
  - 事件
  - ctx
  - params
  - 子表
  - 官方文档
---

# 表单事件 API 参考（开发手册核心）

> 来源：bestdt 低代码平台官方文档 `formdeep/docs`，二次开发必读。本篇是**基础 API 的权威速查**；平台扩展（outInfo 全集、弹窗、列表渲染等官方未覆盖的）见 [[平台扩展API]]。
> 所有事件脚本都遵循同一签名：`module.exports = function (params, ctx, block) { ... }`，其中 `block` 仅代码块调用时存在。

## 0. 一句话上手

- **`ctx`**：全局 API 对象，提供表单所有操作方法（取值、改值、子表、校验、提交…）。
- **`params`**：当前事件触发时的上下文（触发控件实例、值、行数据、行级方法）。
- **最可靠取控件的方式**：用 `instanceId`（设计器属性面板最下方复制的 `type_随机串`），不要依赖 `dataBind` 点路径——详见第 1 节。

## 1. 核心概念：instanceId vs dataBind（最重要）

| 术语 | 是什么 | 示例 |
| :--- | :--- | :--- |
| **instanceId** | 系统生成的控件唯一 ID（UUID 形式），**始终不变** | `input_ah2wl95gdra4f` |
| **dataBind** | 控件与后端字段的逻辑绑定标识 | `flow_purchase.ID`（主表顶层）/ `flow_purchase_product.name`（子表行内） |
| **Instance** | 控件运行时对象，含全部 `props` | 用 `ctx.getInstance(id)` 获取 |

**实测结论**：在 `getValue/setValue/getInstance` 等里，**`instanceId` 始终可靠**；`dataBind` 能否命中取决于多重查找链全部通过，子表行内字段、特殊字符、嵌套 state 都会失配返回 `undefined`。

**判断规则**：
- 字段在**主表顶层**（不在任何子表内）→ `ctx.getValue / setValue / visibles / ...`，**优先传 instanceId**
- 字段在**子表行内** → 必须用 `getArrayValue / setArrayValue / getArrayInstance / setArrayInstance`

```js
// ✅ 推荐：instanceId（最稳）
const inst = ctx.getInstance('input_ah2wl95gdra4f');
const val  = ctx.getValue('input_ah2wl95gdra4f');
ctx.setValue('input_ah2wl95gdra4f', '新值');

// ⚠️ 可用但有局限：dataBind（仅对主表顶层字段可靠）
const val2 = ctx.getValue('flow_purchase.ID');

// 🔥 危险：子表行内字段用 getValue 必失败（真实路径带行号 flow_purchase_product.0.xxx）
ctx.getValue('flow_purchase_product.name'); // => undefined
```

> `ctx` 被 `createMonitoredCtx` Proxy 包装：对 `ctx` 直接赋值或拼错 key 会触发控制台警告，正常使用 ctx 方法不触发。

## 2. 事件列表（全部 19 个）

事件在控件 `props.events` 中按 `event` key 注册，运行时由 `ControlEventController` 分发，每段脚本签名即 `module.exports = function (params, ctx, block) {...}`。

### 用户触发

| 事件 | 触发时机 | params 关键字段 | 典型用途 |
| :--- | :--- | :--- | :--- |
| `CLICK` | 点击控件 | `params.value` | 提交、Tree 节点点击 |
| `CHANGE` | 值变化 | `params.value` / `params.oldValue` | 联动、动态校验 |
| `FOCUS` | 获焦 | `params.value` | 帮助信息、高亮 |
| `BLUR` | 失焦 | `params.value` | 实时校验、隐藏帮助 |

> `CHANGE` 特殊：除执行脚本外还会置 `isEdit=true` 并触发 `FormContext.onChange`，让业务感知"表单被改过"。

### 表单周期

| 事件 | 触发时机 | params 关键字段 | 典型用途 |
| :--- | :--- | :--- | :--- |
| `CREATED` | FormView 首次挂载完成（无 value） | — | 初始化异步数据、订阅事件 |
| `BEFORE_SUBMIT` | 提交时、校验通过后 | `params.value` = `buildSubmitData()` 结果 | 二次过滤、阻断提交 |
| `AFTER_SUBMIT` | 提交 callback resolve 后 | — | 跳转、提示、清理 |

> **`BEFORE_SUBMIT` 返回值语义**：`return false` → **阻断提交**；`return undefined/其他` → 正常提交；`return 对象` → **用该对象替代 `submitValue`**。
> **`AFTER_SUBMIT`**：校验失败 / `BEFORE_SUBMIT` 返回 `false` 都不触发。

### 子表（自增组件）事件

| 事件 | 触发时机 | params 关键字段 |
| :--- | :--- | :--- |
| `ADD_ROWS` | 新增行 | `params.args[0].list`（新行数组） |
| `REMOVE_ROWS` | 删除行 | `params.args[0].list`（被删行数组） |
| `SELECT_ROWS` | 行被选中 | `params.args[0]`（选中行数据） |

> 触发源：`ArrayFormApi` 的 `append/prepend/insert/update/replace/rowAppend/remove`。**`swap/move/hidden` 不触发**（hidden 只改 `$hidden` 标记）。

### 组件生命周期

| 事件 | 触发时机 | 备注 |
| :--- | :--- | :--- |
| `MOUNTED` | 控件挂载完成 | `useMount` 里 `await Promise.resolve()` 后，保证 UI 已挂载 |
| `UNMOUNTED` | 控件卸载 | `simple:true` 触发，`params` **不含** value/getValue/setValue/validate/arrayFormApi |

### 上传组件

| 事件 | 触发时机 | 典型用途 |
| :--- | :--- | :--- |
| `BEFORE_UPLOAD` | 上传前 | `return false` 阻断上传；类型/大小校验 |
| `UPLOAD_SUCCESS` | 上传成功 | 更新其他控件、刷新列表 |
| `UPLOAD_FAIL` | 上传失败 | 重置、错误处理 |
| `DELETE_FILE` | 删除已上传文件 | 清理关联数据 |

### 按钮 / 标签页 / 视图

| 事件 | 触发时机 | 备注 |
| :--- | :--- | :--- |
| `SELECTED` | 多选按钮切换选中 | 仅支持切换的按钮有效 |
| `TABCHANGED` | 标签页切换 | `params.value` = 新激活 key |
| `CHANGE`（折叠面板） | 展开/收起 | 走普通 CHANGE，非 TABCHANGED |
| `VIEW_MODE_CHANGE` | 编辑态↔查看态切换 | `params.value.isView` 布尔 |

### 返回值规则

- **仅 `BEFORE_SUBMIT` 与 `BEFORE_UPLOAD` 的返回值有意义**（前者替代/阻断提交，后者阻断上传）。
- 其余 15 个事件（CLICK / CHANGE / FOCUS / BLUR / MOUNTED / UNMOUNTED / CREATED / UPLOAD_SUCCESS / UPLOAD_FAIL / DELETE_FILE / ADD_ROWS / REMOVE_ROWS / SELECT_ROWS / SELECTED / TABCHANGED）**返回值被丢弃**，脚本里 `return` 无效果。
- **执行顺序**：同一事件的多个处理器按 `props.events` 数组顺序执行；`watches`（监听其他控件的 watch 项）在用户脚本**之后**执行（仅 CHANGE 触发）。

## 3. ctx 普通控件方法

### 取值 / 改值

```js
ctx.getValue('input_xxx');              // 按 instanceId 取
ctx.getValue('flow_purchase.ID');       // 按 dataBind 取（仅主表顶层可靠）
ctx.getValue();                         // 不传参：返回整个表单数据
ctx.getValues('id1', 'id2');            // 批量取，按序返回数组

ctx.setValue('input_xxx', '新值');      // 改值（值真正变化才异步触发 CHANGE）
ctx.setDatas({ 'k1': 'v1', 'k2': 10 });// 批量改（内部循环 setValue）
```
> 取/改**子表行内字段**必须用 `getArrayValue/setArrayValue`，见第 5 节。

### instance 操作

```js
const inst = ctx.getInstance('input_xxx');   // 先按 instanceId，再按 dataBind
ctx.setInstance('input_xxx', 'placeholder', '新提示');
ctx.setInstance('input_xxx', 'visible', false);   // 显示/隐藏
ctx.setInstance('input_xxx', 'disabled', true);   // 禁用/启用
ctx.setInstance('input_xxx', 'required', true);   // 必填/非必填

ctx.setParam('input_xxx', { disabled: true, placeholder: '只读' }); // 合并单个控件 params
ctx.setParams({ 'input_a': { disabled: true }, 'input_b': { visible: false } }); // 批量
ctx.setActions('btn_save', 'BEFORE_SUBMIT', { /* 事件属性 */ }); // 整体替换某 action（找不到不新增）
```

### 批量显隐 / 禁用 / 必填 / 只读

```js
ctx.visibles('id1', 'id2', true);     // 最后一位布尔：true 显示
ctx.disableds('id1', 'id2', true);    // true 禁用
ctx.requireds('id1', 'id2', true);    // true 必填
ctx.readonlys('id1', 'id2', true);    // true 只读
```

### 选项（下拉 / 级联 / 树 / 机构 / 字典）

```js
ctx.getOptions('select_xxx');                 // => [{label, value}]
ctx.getOptions('subtable_xxx.select_yyy', 0); // 子表指定行
ctx.setOptions('select_xxx', [{ label: 'A', value: 'A' }]); // 不自动清空 value
```

### 样式（CSS 类名）

```js
ctx.addClassName('input_xxx', 'c-red', 'mt-12');   // 拼接（不去重）
ctx.removeClassName('input_xxx', 'c-red');          // 差集
```

### 校验

```js
const [isValid, errors] = await ctx.validate();              // 校验整个表单
const [isValid2, errors2] = await ctx.validate('input_xxx'); // 校验单个控件
const [isValid3, errs3] = await ctx.validate('sub_xxx', 0);  // 校验子表指定行
// ValidateResult: { name, success, message?, index?, instance }
```

### 触发 / 订阅自定义事件

```js
const off = ctx.listen('beforeSubmit', async (params, ctx) => {
  if (!ctx.getValue('flow_purchase.ID')) { ctx.message('请填备注','error'); return false; } // 阻断提交
});
ctx.trigger('change', { instance: myInst, args: [] });
off(); // 取消订阅
```

## 4. ctx 整体表单方法

```js
const result = await ctx.submit();                       // 校验后提交；内部先调子表单 save 再主表 submit
await ctx.submit(async (data) => { /* 成功 */ }, async (e) => { /* 失败 */ });
const draft = await ctx.saveDraft();                     // 同 submit，但不调子表单 save

ctx.reset();                                            // 重置到初始值
ctx.reset({ field1: '默认' });                           // 用指定数据重置

const hide = ctx.loading(true); hide();                  // 显示/关闭 loading
ctx.message('保存成功', 'success');                      // success|warning|error|info|loading

const isView = ctx.getViewMode();                        // true=查看态 false=编辑态
const user = ctx.getUserInfo();                          // 当前登录用户
const formId = ctx.getFormId();                          // 当前表单 formId（来自 outInfo.formId）
const data = ctx.buildSubmitData();                      // 按 dataTable+dataField 重组提交数据

ctx.getFormInfo(); ctx.setFormInfo({ v: 1 });            // 运行时元数据（覆盖语义，非 merge）
```

## 5. ctx 子表（ArrayForm）方法

子表行自带不可见的 `$internal_id`（用户代码不应读写）。有"隐藏行"（`hidden`）时，**可见行号 ≠ 底层数组索引**，行操作都按可见行号工作。

### 取值 / 改值

```js
ctx.getArrayValue('sub_xxx');                       // 全部行
ctx.getArrayValue('sub_xxx', 0);                   // 第 0 行
ctx.getArrayValue('sub_xxx', 0, 'sub_xxx.name');   // 第 0 行某字段

ctx.setArrayValue('sub_xxx', [{...}, {...}]);                       // 替换全部（等价 ArrayFormApi.replace）
ctx.setArrayValue('sub_xxx', 0, 'sub_xxx.name', '新值');            // 改指定行指定字段
ctx.setArrayValue('sub_xxx', 0, { 'sub_xxx.name': 'x', 'sub_xxx.num': 10 }); // 改指定行多字段
ctx.deleteArrayRow('sub_xxx', 0);                                 // 删行
```

### ArrayFormApi（推荐，通过 `ctx.getArrayFormApi(name)` 或 `params.arrayFormApi` 获取）

```js
const api = ctx.getArrayFormApi('sub_xxx'); // name 可为 dataBind 或 instanceId
api.append({});                 // 末尾新增空行
api.append([{}, {}]);           // 批量新增
api.prepend({});                // 开头新增
api.insert(1, { name: '新' });  // 指定可见行位置插入
api.rowAppend(0, { name: 'x' });// 在可见行 0 后追加
api.remove(1);                  // 删除（可见行）；支持 remove([1,3])
api.replace([]);                // 替换全部 / 清空
api.update(1, { name: 'v2' }); // 更新指定行（保留 $internal_id）
api.swap(0, 1);                 // 交换两行
api.move(2, 0);                 // 移动行
api.hidden((row) => row.amount === 0); // 按条件前端隐藏（不改数据，加 $hidden 标记）
```

### 行级 instance / 属性 / 校验 / 样式

```js
ctx.getArrayInstance('sub_xxx', 0, 'sub_xxx.name'); // 行内某组件实例
ctx.setArrayInstance('sub_xxx', 0, 'sub_xxx.name', 'visible', false);

ctx.disabledArrayRow('sub_xxx', 0, true);                 // 整行禁用
ctx.disabledArrayRow('sub_xxx', 0, 'sub_xxx.name', true); // 行内指定组件
ctx.readonlyArrayRow('sub_xxx', 0, true);
ctx.requiredArrayRow('sub_xxx', 0, true);
ctx.updateArrayRowOptions('sub_xxx', 0, { select_id: [{label,value}] }); // 不改已选
await ctx.validateArray('sub_xxx');                       // 校验子表
await ctx.validateArray('sub_xxx', 0, 'sub_xxx.name');

ctx.addArrayFormClassName('sub_xxx', 0, 'sub_xxx.name', 'error-bg');
ctx.removeArrayFormClassName('sub_xxx', 0, 'sub_xxx.name', 'error-bg');
```

### params 子表行内方法

```js
params.row;                    // 当前行数据（实时 getter）
params.index;                  // 当前行号
params.arrayFormApi;           // 当前子表句柄
params.deleteCurrentRow();
params.updateCurrentRowValues({ 'sub_xxx.name': '新' });
params.validateCurrentRow();
params.getCurrentRowInstance('sub_xxx.name');
params.setCurrentRowDisableds(true);          // 整行 / 指定组件
params.setCurrentRowRequireds('sub_xxx.name', false);
params.setCurrentRowOptions({ select_id: [{label,value}] });
params.addCurrentRowClassName('highlight');
params.removeCurrentRowClassName('highlight');
```

**速查表**：读取 `getArrayValue`｜新增 `append/prepend/insert`（`params.arrayFormApi.*` / `params.deleteCurrentRow`）｜删除 `deleteArrayRow`/`remove`｜修改 `setArrayValue`/`update`/`replace`/`updateCurrentRowValues`｜禁用/只读/必填 `disabledArrayRow`/`readonlyArrayRow`/`requiredArrayRow`/`setCurrentRow*`｜校验 `validateArray`/`validateCurrentRow`｜样式 `addArrayFormClassName`/`addCurrentRowClassName`｜选项 `updateArrayRowOptions`/`setCurrentRowOptions`｜实例 `getArrayInstance`/`getCurrentRowInstance`｜隐藏 `hidden`。

## 6. 辅助函数（utils）

```js
// HTTP：request 返回函数，再传 data 才真正发请求；返回的是 axios 完整响应（含 .data/.status）
const res = await ctx.http.request('GET', '/api/list')({ page: 1 });
const r2  = await ctx.http.request('POST', '/api/save', { headers: {} })(payload);

// 数据源（设计器配置，每次调用重新执行，不缓存）
const list = await ctx.datasource.getProductList({ categoryId: 1 });

// 工具函数（设计器配置，第一次执行后缓存结果）
const r = ctx.utils.calcAmount({ price: 100, quantity: 2 });

// 业务注入函数（代码侧 BstFormDeepUtils.setFns 注入，无缓存）
ctx.fns.formatMoney(123.456);

// 全局 Store（同用户跨表单/页签共享；用 setStore 合并写入，勿直接赋值）
ctx.setStore({ global_user: { id: 1 } });
const theme = ctx.store.theme;

// 外部挂载数据（outInfo 基础；完整字段见 [[平台扩展API]]）
ctx.setOutInfo({ businessKey: 'PO-001' });
const formId = ctx.outInfo.formId;

// 用户与组织
ctx.allUsers;  // [{id,name,deptId}]
ctx.allOrgs;   // [{id,name,code}]

// 子表缓存（业务方主动存，不与 submit 自动关联）
ctx.setListFormSaveCacheMap('key', value);
ctx.getListFormSaveCacheMap('key');
```
> `datasource` 每次重新执行（适合最新数据）；`utils` 第一次后缓存（适合纯计算）。`fns` 适合跨包共享纯函数。

## 7. 布局控件（Tab / 折叠 / 栅格 / 表格）

```js
// 标签页 / 折叠面板激活项
ctx.setActiveKey('tab_xxx', 'tab-pane_a');                 // Tab：只取第 1 个 key
ctx.setActiveKey('collapse_xxx', 'pane_a', 'pane_b');      // 折叠（非手风琴）：多选

// 栅格/表格格子显隐
ctx.setInstance('gridcol_abc', 'visible', false);
ctx.setInstance('sheet_cell_abc', 'visible', false);

// 标签页/折叠自身事件中可直接 params.setActiveKey(...)
```

## 8. 高频坑（FAQ）

### 事件不执行

1. 没用 `module.exports = function (params, ctx) {...}` 包裹；
2. 异步函数漏 `await`（`const [ok] = ctx.validate()` 没 await，后续先跑）；
3. 绑错控件/事件类型（CHANGE 只对值变化控件，按钮用 CLICK）；
4. 被 `return false` 提前截断（BEFORE_SUBMIT 里）；
5. 语法错误（F12 Console 看红字）。
> 验证：脚本首行 `console.log('触发了', params.instance.id, params.value)`，操作控件看日志。

### getValue 返回 undefined（top 1 高频）

按可能性排序：
1. **用 dataBind 代替 instanceId**（最常见）→ 换成 `params.instance.id` 或 `ctx.getInstance` 拿 instanceId；
2. 用 `getValue` 读子表行内字段 → 改用 `getArrayValue(table, index, field)`；
3. `dataBind` 与设计器实际填值不一致（如填的是 `id` 不是 `flow_purchase.ID`）→ `ctx.getInstance(id).props.dataBind` 反查；
4. 字段本来就没值（空 defaultValue / 用户没填 / 空字符串）→ 先 `setValue` 再 `getValue` 验证；
5. **在 `CREATED` 里读**（时序问题，`form.reset` 可能晚于 CREATED）→ 改 `MOUNTED`/`CHANGE`，或 `setTimeout(()=>{...},0)`；
6. 传了 label 名而非 dataBind/instanceId；
7. 子表 `swap/hidden` 后可见行号 ≠ 底层索引 → `getArrayValue` 的 index 指可见行。

```js
// ✅ 推荐写法
const id = params.instance.id;
const v = ctx.getValue(id);
ctx.setValue(id, '新值');
// ✅ 子表行内
ctx.getArrayValue('sub_xxx', 0, 'sub_xxx.name');
```

## 9. 官方文档索引

- 整体表单：<https://www.bestdt.com/formdeep/docs/responsive/function/overall>
- 普通控件：<https://www.bestdt.com/formdeep/docs/responsive/function/basic-control>
- 自增控件（子表）：<https://www.bestdt.com/formdeep/docs/responsive/function/increment-control>
- 辅助函数：<https://www.bestdt.com/formdeep/docs/responsive/function/utils>
- 参数解释（术语）：<https://www.bestdt.com/formdeep/docs/responsive/function/glossary>
- 事件列表：<https://www.bestdt.com/formdeep/docs/responsive/event/list>
- 布局控件：<https://www.bestdt.com/formdeep/docs/responsive/function/layout-control>
- FAQ 事件不触发：<https://www.bestdt.com/formdeep/docs/faq/event-not-firing>
- FAQ getValue undefined：<https://www.bestdt.com/formdeep/docs/faq/getValue-undefined>

## 关联

- [[平台扩展API]]（outInfo 全集、弹窗、列表渲染等官方未覆盖的 API）
- [[自定义表单开发实战]]（真实出库表单代码）
- [[01-自定义开发/README|01 自定义开发]]（分区导航）
