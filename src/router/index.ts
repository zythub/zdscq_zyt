import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import FieldGenerator from '@/tools/field-generator/index.vue';
import FieldSql from '@/tools/field-sql/index.vue';
import BookmarkForm from '@/tools/bookmark-form/index.vue';
import JsonFormatter from '@/tools/json-formatter/index.vue';
import FormDocs from '@/tools/form-docs/index.vue';
import Toolbox from '@/tools/toolbox/index.vue';

// 让 vue-router 的 RouteMeta 认知到工具元信息，避免 meta.tool 报错
declare module 'vue-router' {
  interface RouteMeta {
    tool?: ToolMeta;
  }
}

/** 单个工具在侧边栏展示的元信息 */
export interface ToolMeta {
  /** 侧边栏与顶栏标题 */
  title: string;
  /** 一句话说明，显示在顶栏副标题 */
  desc: string;
  /** 24×24 viewBox 的 svg path（描边风格） */
  icon: string;
}

export interface AppRouteMeta extends Record<string, unknown> {
  tool: ToolMeta;
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/field-generator',
  },
  {
    path: '/field-generator',
    name: 'field-generator',
    component: FieldGenerator,
      meta: {
        tool: {
          title: '字段生成器',
          desc: '审批流建表 · Excel 字段定义一键生成',
          icon: 'M3 5h18v14H3zM3 9h18M3 14h18M9 5v14M15 5v14',
        } satisfies ToolMeta,
      },
  },
  {
    path: '/field-sql',
    name: 'field-sql',
    component: FieldSql,
      meta: {
        tool: {
          title: '新增字段 SQL',
          desc: '批量生成 dy_table_field 插入 / 改表 / 注释 SQL',
          icon: 'M4 7h16M4 12h10M4 17h16M17 10l3 2-3 2',
        } satisfies ToolMeta,
      },
  },
  {
    path: '/bookmark-form',
    name: 'bookmark-form',
    component: BookmarkForm,
      meta: {
        tool: {
          title: '书签生成表单',
          desc: '提取 Word 书签 → 复用命名规则 → 设计器 JSON',
          icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
        } satisfies ToolMeta,
      },
  },
  {
    path: '/json-formatter',
    name: 'json-formatter',
    component: JsonFormatter,
      meta: {
        tool: {
          title: 'JSON 格式化',
          desc: 'JSON 格式化 / 压缩 / 校验 + 在线工具',
          icon: 'M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6zM14 3v6h6',
        } satisfies ToolMeta,
      },
  },
  {
    path: '/form-docs',
    name: 'form-docs',
    component: FormDocs,
      meta: {
        tool: {
          title: '自定义表单在线文档',
          desc: 'BestDT 响应式表单设计器文档',
          icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h6',
        } satisfies ToolMeta,
      },
  },
  {
    path: '/toolbox',
    name: 'toolbox',
    component: Toolbox,
      meta: {
        tool: {
          title: '工具箱',
          desc: 'PDF 在线工具（合并 / 格式转换）',
          icon: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z',
        } satisfies ToolMeta,
      },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/field-generator',
  },
];

const router = createRouter({
  // GitHub Pages 项目站点部署在 /zdscq_zyt/ 子路径；用 hash 历史避免深链路由刷新 404
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
