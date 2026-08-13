import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import FieldGenerator from '@/tools/field-generator/index.vue';
import FieldSql from '@/tools/field-sql/index.vue';
import BookmarkForm from '@/tools/bookmark-form/index.vue';

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
