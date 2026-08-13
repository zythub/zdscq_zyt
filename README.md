# 开发效率提升工具集

面向开发、实施与运维人员的小工具集合（GitHub Pages 纯静态站点，无需后端）。当前内置：

- **字段生成器**：审批节点 + 自定义字段组合成表结构，导出下游导入工具要求的 Excel。
- **新增字段 SQL**：批量生成 `dy_table_field` 的 INSERT / ALTER / COMMENT SQL。
- **书签生成表单**：提取 Word 书签，复用命名规则，生成表单设计器 JSON。

第三方工具（如常用的在线工具站）在 `src/stores/externalTools.ts` 的 `EXTERNAL_TOOLS` 数组里写死内置，侧边栏会与内置工具一起平铺展示，外链条目在新窗口打开。

在线地址：<https://zythub.github.io/zdscq_zyt/>（GitHub Pages，纯静态，无需后端）

## 技术栈

- Vue 3 + TypeScript + Vite
- Naive UI（组件库，支持深浅色主题）
- pinyin-pro（中文 → 拼音）
- SheetJS（Excel 导出，已本地化打包，离线可用）

## 本地开发

```bash
npm install --cache=./.npm-cache   # 注意：默认缓存目录可能被环境拦截，统一用项目内缓存
npm run dev                        # 本地预览
npm run build                      # 类型检查 + 构建到 dist/
npm run preview                    # 预览构建产物
```

构建产物 `dist/` 直接部署到 GitHub Pages 根目录即可（`base: '/zdscq_zyt/'` 已在 vite.config.ts 配好）。

## 配置分层

| 层 | 载体 | 作用 |
|---|---|---|
| 团队基线 | `src/config/baseline.ts`（随代码发布） | 14 个审批节点、字段角色默认值、命名规则、固定字段 |
| 个人覆盖 | localStorage（只存 diff） | 你自己改过的配置项，刷新不丢 |
| 跨人传递 | JSON 导入/导出 | 界面「配置中心」里导出，别人导入即复用 |

**基线更新无需清缓存**：缓存里只存你的改动，其余永远跟随线上基线，推上去自动生效。
页面顶部出现提示条时，说明团队基线版本已更新。

## 字段角色（L1 全局默认表）

| 角色 | 默认类型 | 默认长度 | 说明 |
|---|---|---|---|
| 人员 ID | VARCHAR | 50 | 人员字段展开出的主键字段 |
| 人员姓名 | VARCHAR | 100 | 人员字段展开出的姓名字段 |
| 意见字段 | VARCHAR | 500 | 意见/审核意见 |
| 日期字段 | DATE | — | |
| 普通文本 | VARCHAR | 50 | |
| 金额 | DECIMAL(18,2) | 18 | |
| 序号 | INT | — | 子表序号 |
| 外键 | VARCHAR | 50 | 子表主表_id |

所有值都可在「配置中心 → 字段默认值」里改，一处改处处生效；单个字段特殊处理则在右侧字段表格里行内改。

## 英文名生成策略

1. 手工映射词典命中 → 直接用（在字段表格里改英文名会自动记住映射）
2. 拼音首字母（如「监理单位」→ `jldw`）
3. 撞名 → 自动降级为全拼（`jianlidanwei`）
4. 全拼仍撞 → 追加 `_2`/`_3` 并提示建议手动改名

每次降级都会在表格里给出可见提示，绝不静默处理。

## Excel 输出契约

「表名称」「字段信息」两个 sheet 的表头是下游导入工具的**硬性要求**，不增删列。
「是否允许null / 小数位数 / 默认值 / 备注」四列已全部开放配置（旧版写死 `YES`、小数位永远为空）。

## 目录结构

```
src/
  types/index.ts          # 全部类型定义（字段角色、节点、配置分层）
  config/baseline.ts      # 团队基线配置（SCHEMA_VERSION 变化会提示用户）
  core/identifier.ts      # 拼音/标识符解析：首字母→全拼→序号降级 + 长度上限校验
  core/generator.ts       # 字段生成：基础→自定义→节点→尾部，含 5 个高危 bug 的修复
  core/excel.ts           # 两个 sheet 的构建与导出
  stores/config.ts        # 三层配置合并 + localStorage diff + JSON 导入导出
  stores/builder.ts       # 会话状态（勾选/自定义字段/行内编辑/手动排序）
  components/             # NodePanel / QuickAdd / FieldTable / ConfigCenter / AppBody
public/legacy/            # 旧版（v1.x）保底入口，新版出问题时可用
tools/golden/             # 黄金样本回归：capture-legacy 采集旧版快照，verify 逐格比对
```

## 回归保障

```bash
npm run golden:capture    # 用旧版逻辑生成 5 个典型场景的快照
npm run golden:verify     # 新版生成结果与快照逐格对比，意外差异会报错
```

verify 会区分「预期内差异」（`yj`→`_yj`、姓名长度 800→100、DECIMAL 补小数位等）与意外差异，
CI 中也会自动跑一遍。
