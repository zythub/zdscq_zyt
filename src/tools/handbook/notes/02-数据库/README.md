---
type: 导航
status: 进行中
created: 2026-09-08
updated: 2026-09-08
tags:
  - 导航
  - 数据库
  - 分区
---

# 02 数据库

> PostgreSQL（OpenGauss / 高斯）为主，MySQL / 达梦为辅，MongoDB 存附件。备份恢复、常用表、连接方法集中在这。

## 速查

| 主题 | 文档 |
| :--- | :--- |
| 备份恢复、连接、常用表、SQL 模板 | [[数据库速查与连接]] |

## 关键约定

- PostgreSQL 主库，默认 schema `plant`。
- MongoDB 用于附件/文件，端口 `27017`。
- 标识符长度限制：**63 字符**（PostgreSQL）。
- 达梦 / MySQL 兼容：字符串拼接用 `CONCAT`，PG 用 `||`。

## 关联分区

- [[首页]]
- [[01-自定义开发/README|01 自定义开发]]
- [[03-自定义接口/README|03 自定义接口]]
- [[04-环境接入与排障/README|04 环境接入与排障]]
