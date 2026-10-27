/**
 * 站点访问人次统计（Vercount）。
 *
 * 为什么不用不蒜子：busuanzi 的 ibruce.info 域名在部分网络下加载挂起，
 * 会让整页一直转圈；Vercount 走 events.vercount.one，稳定且带自己的缓存。
 *
 * 两个坑（都已踩过）：
 * 1. 必须在 Vue 挂载之后再注入脚本。计数器执行时会扫描 #vercount_value_site_pv，
 *    若在 index.html 里 defer 引入，会先于 Vue 渲染执行，扫不到元素 → 永远不显示。
 * 2. 同一个 id 在页面上只能有一个元素。vercount 用 getElementById 取元素，
 *    重复 id 时只有第一个会被填充。手册页 hideChrome 会隐藏站点底栏，
 *    所以那里用的是独立 id（见 MANUAL_PV_ID），由本模块手动回填。
 */
import { onMounted, ref } from 'vue';

/** 站点底栏用的元素 id（vercount 脚本自动填充） */
export const SITE_PV_ID = 'vercount_value_site_pv';
/** 手册页用的元素 id（vercount 不认识，由本模块回填） */
export const MANUAL_PV_ID = 'vercount_value_site_pv_manual';

const VERCOUNT_SRC = 'https://events.vercount.one/js';

/** 手册页显示的访问人次（由站点底栏的 vercount 值转发过来） */
export const manualPv = ref<string | null>(null);

let siteEl: HTMLElement | null = null;

/**
 * 把站点底栏里 vercount 填好的数字转发到手册页的独立元素。
 * vercount 只认 SITE_PV_ID，所以这里做一次「读 → 写」。
 */
function forwardToManual(): void {
  if (!siteEl) siteEl = document.getElementById(SITE_PV_ID);
  const v = siteEl?.textContent?.trim();
  if (v && v !== '–' && v !== '-') manualPv.value = v;
  const manualEl = document.getElementById(MANUAL_PV_ID);
  if (manualEl && manualPv.value) manualEl.textContent = manualPv.value;
}

function loadVisitCounter(): void {
  const w = window as unknown as { __vercountLoaded?: boolean };
  if (w.__vercountLoaded) return;
  w.__vercountLoaded = true;
  // 清掉历史缓存计数：接口请求失败时脚本会回退显示 localStorage 里旧的
  // （曾出现过旧的域名级大数 63,724,565 被缓存），确保每次都取新值，失败则显示占位符
  try {
    localStorage.removeItem('visitorCountData');
  } catch {
    /* 忽略 */
  }
  const s = document.createElement('script');
  s.src = VERCOUNT_SRC;
  s.async = true;
  s.onerror = () => {
    w.__vercountLoaded = false; // 失败可重试
  };
  s.onload = () => {
    // 脚本执行后数字是异步填入的，轮询几次把值取回来
    let tries = 0;
    const tick = (): void => {
      forwardToManual();
      if (++tries < 40) window.setTimeout(tick, 250);
    };
    tick();
  };
  document.head.appendChild(s);
}

/**
 * 在组件里启用访问人次统计。
 * 无论该页面是否显示站点底栏，数字都会被转发到 MANUAL_PV_ID。
 */
export function useVisitCounter(): void {
  onMounted(() => {
    loadVisitCounter();
    // 底栏数字是异步填的，持续转发直到取到
    let tries = 0;
    const tick = (): void => {
      forwardToManual();
      if (++tries < 60) window.setTimeout(tick, 300);
    };
    window.setTimeout(tick, 300);
  });
}
