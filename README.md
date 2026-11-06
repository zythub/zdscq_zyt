# zdscq_zyt · 打包产物仓库

本仓库**只保留 `dist/` 打包产物**，不含任何源代码。

- 源码已迁出到维护方本地；知识库手册站已自包含工具子应用，不再依赖本仓库。
- `dist/` 的 base 是 `/zdscq_zyt/`，供 GitHub Pages 直接部署。
- `.github/workflows/static.yml` 直接上传 `dist/` 作为 Pages artifact，**不执行安装或构建**。
- 更新方式：在维护方本地重新构建后，整体替换 `dist/` 并推送 `main` 即可；远端内容始终与本地 `dist/` 一致。

> 历史提交里保留着迁移前的源码，如需回溯请查看 git 历史；当前工作树不含源代码。
