# 达梦 SQL 交付规范（踩坑沉淀）

> 来源：2026-10-27 老系统智慧工地接口迁移到 prp20 时连续踩的 4 个坑。
> 目的：**在写交付 SQL 之前就避开**，不要等现场执行报错再改。

---

## 一、达梦 VARCHAR 是「字节」不是「字符」（最容易踩）

达梦实例参数 `LENGTH_IN_CHAR = 0` → `VARCHAR(n)` 的 **n 是字节数**。UTF-8 汉字占 **3 字节**。

老库 MySQL 的 `varchar(2)` 是**字符**语义，能存"进场"2 个字；照抄到达梦变成 `VARCHAR(2)` = 2 字节，
塞不下"进场"（6 字节）→ 报错：

```
-6169 列[zt]长度超出定义
```

### 规则

| 场景 | 做法 |
| :--- | :--- |
| 从 MySQL 迁 DDL | 中文列宽 **至少按 字符数 × 3** 给。`varchar(2)` → `VARCHAR(10)` |
| 新建中文列 | 直接 `VARCHAR(50)`（≈16 汉字）起步，不要照抄老库窄列宽 |
| 表已建好要改宽 | `ALTER TABLE 表名 MODIFY 列名 VARCHAR(10);` |
| 纯数字/编码列 | `VARCHAR(10)` 足够（`DW001`、`NO00000` 都是 ASCII） |

**校验方式**：拿真实列定义（`ALL_TAB_COLUMNS.DATA_LENGTH`）算 `len(value.encode('utf-8'))`，
不能只数字符数。字符数对了字节数也会超。

---

## 二、ALTER 语法：达梦用 `MODIFY`，且要放在建表之后

```sql
-- ✅ 达梦写法
ALTER TABLE VIEW_ZHGD_RYJCSJ MODIFY zt VARCHAR(10);

-- ❌ MySQL 的 ALTER COLUMN ... TYPE 达梦不认
```

**顺序要求**：ALTER 必须在 `CREATE TABLE` 之后。表还不存在时执行 ALTER 会失败中断整个脚本。

**建表幂等写法**：达梦 8.1+ 支持 `CREATE TABLE IF NOT EXISTS`（本环境 DM8 0x7000c 已验证）：

```sql
CREATE TABLE IF NOT EXISTS 表名 (
  列名 类型,
  ...
);
```

表已存在时自动跳过，脚本可以从头到尾一次跑通，不用让现场"跳过第 1 步"。

---

## 三、INSERT 的列名必须查真实表结构，不能凭猜

老系统表名带 `_V` 后缀的是视图，迁到达梦建成普通表后，**列名跟老库可能不一致**。

实例：`SG_RYXX_M` 主键列真实叫 `id`，脚本里写成 `sg_ryxx_MOID` → 20 条 INSERT 全报：

```
-2111 无效的列名[sg_ryxx_MOID]
```

### 查真实列定义（达梦）

```sql
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, DATA_LENGTH
FROM ALL_TAB_COLUMNS
WHERE OWNER='PRPNEW' AND TABLE_NAME IN ('表1','表2')
ORDER BY TABLE_NAME, COLUMN_ID;
```

⚠️ 别把 `sys_api_info` 的列清单和 `sys_menu` 混：
- `sys_api_info`：`id, path, name, create_time, update_time, script, group_id, method, parameters, is_release, api_version`
- **没有** `create_by` / `update_by` / `parent_id`

---

## 四、时间列：格式必须与列类型严格对应

| 列类型 | 可接受的字符串 | 踩坑 |
| :--- | :--- | :--- |
| TIMESTAMP | `'2026-10-27 09:00:00'` 或 `'2026-10-27'` | 给 `'测试'` → -6118 |
| DATE | `'2026-10-27'` | 给 `'2026-10-27 09:00:00'` → -6118 |
| VARCHAR(8) | `'06:00'` | 给 `'2026-10-27'`（10 字节）→ -6169 |

```
-6118 第2 行附近出现错误: 非法的时间日期类型数据
```

**坑位错位比类型错更隐蔽**：如果 format 模板手写，值会串位（车牌收到时间列、状态收到车牌列），
报错信息还很难懂。→ **不要手写 format 模板**，要么按列顺序逐个拼，要么用校验器逐值查。

---

## 五、布尔列：BIT 只收 0/1

反推表结构时容易把布尔列当 VARCHAR，给了 `'测试'`、`'是'` 这类字符串。

- BIT 列 → 只能是 `0` / `1`
- VARCHAR 化的布尔标记列 → 也要显式给 `'0'` / `'1'`

---

## 六、★ 防复发工具：字节级 SQL 静态体检器

**位置**：`C:\Users\Administrator\WorkBuddy\2026-09-29-16-18-43\dm_sql_lint.py`
（配套 `dm_schema_snapshot.py` 存真实列定义快照）

```bash
cd /c/Users/<账号> / <密码>/2026-09-29-16-18-43
python dm_sql_lint.py /c/Users/<账号> / <密码>/prp/你的脚本.sql
```

校验项（每条 INSERT 逐值查）：

| 校验 | 对应达梦报错 |
| :--- | :--- |
| 列名必须存在于表 | -2111 无效的列名 |
| 字符串 UTF-8 **字节**长度 ≤ DATA_LENGTH | -6169 列长度超出定义 |
| TIMESTAMP/DATE 值可解析 | -6118 非法的时间日期类型 |
| BIT 只收 0/1、INT 只收整数 | 类型错配 |
| VALUES 值个数 == 列数 | 槽位错位 |
| DDL 列宽不得比真实表窄 | 建表后必然 -6169 |

**用法纪律**：交付 SQL **必须**先过一遍这个校验器，报"0 问题"再发出去。
（本例：老脚本一次扫出 80 个问题——60 个 zt/rinout 超长 + 20 个无效列名，
纯靠肉眼一个都看不出来。）

---

## 七、交付脚本必须幂等（脚本会被跑不止一次）

现场/开发常把同一个脚本跑多遍（调试、换环境重跑）。**uuid 造 id 不是幂等**，
主键不冲突会照插第二份。

### 正确做法：脚本第 0 步先清理再插入

```sql
-- 1) 接口注册去重：同 group_id 同 path 只留 create_time 最新的一条
DELETE FROM sys_api_info WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (
             PARTITION BY path
             ORDER BY create_time DESC, update_time DESC, id DESC
           ) AS rn
    FROM sys_api_info
    WHERE group_id='<group_id>'
      AND path IN ('<path1>','<path2>')
  ) t WHERE t.rn > 1
);

-- 2) 测试数据清理：按业务唯一标识精确定位，不误删正式数据
DELETE FROM 表名 WHERE sys_org_number='DW001';
```

⚠️ 达梦支持 `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)`，可以直接用来去重。
⚠️ 不要用 `MAX(id)` 判"最新"——id 是随机 uuid，字典序 ≠ 时间序。

### 删除范围要精确

`WHERE sys_org_number='DW001'` 精确；**不要**用 `sys_createtime >= '某天'` 这种粗条件，
会误删别人的正式数据。

---

## 八、达梦常用语法备忘

| 场景 | 语法 |
| :--- | :--- |
| 建表（幂等） | `CREATE TABLE IF NOT EXISTS t (...);` |
| 改列宽 | `ALTER TABLE t MODIFY c VARCHAR(10);` |
| 去重 | `ROW_NUMBER() OVER (PARTITION BY k ORDER BY t DESC)` |
| 层级查询 | `START WITH ... CONNECT BY PRIOR ...`（**不要**用 `WITH RECURSIVE`，版本兼容性差） |
| 类型映射 | `datetime→TIMESTAMP`、`bit→BIT`、`time→VARCHAR(20)`、`bool→BIT` |
| 注释 | `COMMENT ON TABLE/COLUMN ... IS '...';` 保留 |
| DROP 幂等 | 匿名块 `EXECUTE IMMEDIATE` + `EXCEPTION WHEN OTHERS THEN NULL` |
| 唯一约束冲突 | -6602 常见原因是**脚本重复执行** |

---

## 九、交付前自检清单

- [ ] 真实列定义拉过了吗？（`ALL_TAB_COLUMNS`，不是凭印象）
- [ ] 中文列宽够吗？（字节数，不是字符数）
- [ ] 列名全部对得上吗？（老系统 `_V` 视图尤其容易错）
- [ ] 时间格式与列类型匹配吗？
- [ ] BIT 列给的是 0/1 吗？
- [ ] 跑了 `dm_sql_lint.py` 吗？必须是 0 问题。
- [ ] 脚本能重复执行吗？（第 0 步幂等清理）
- [ ] 建表用了 `IF NOT EXISTS` 吗？
- [ ] ALTER 放在建表之后吗？
