// 从 .docx（OpenXML zip）读取 word/document.xml，并提取书签与子表表头。
// 书签 = 用户手工打的字段标记；子表在「表头行最后一列」打一个 xxx_child 书签。
import JSZip from 'jszip';

/** 浏览器侧：读取用户上传的 .docx，返回 document.xml 文本 */
export async function readDocxDocumentXml(file: File): Promise<string> {
  const zip = await JSZip.loadAsync(file);
  const f = zip.file('word/document.xml');
  if (!f) throw new Error('无效的 Word 文件：缺少 word/document.xml');
  return await f.async('string');
}

/** 提取书签英文名，过滤 _GoBack / _Toc* 噪音，去重 */
export function extractBookmarks(docXml: string): string[] {
  const names: string[] = [];
  const seen: Record<string, boolean> = {};
  let m: RegExpExecArray | null;
  const re = /<w:bookmarkStart\b[^>]*\bw:name="([^"]+)"[^>]*\bw:id="(\d+)"([^>]*)>/g;
  while ((m = re.exec(docXml))) {
    const n = m[1];
    if (/^_GoBack$/.test(n) || /^_Toc/.test(n) || seen[n]) continue;
    seen[n] = true;
    names.push(n);
  }
  if (!names.length) {
    const re2 = /<w:bookmarkStart\b[^>]*\bw:id="(\d+)"[^>]*\bw:name="([^"]+)"([^>]*)>/g;
    while ((m = re2.exec(docXml))) {
      const n2 = m[2];
      if (/^_GoBack$/.test(n2) || /^_Toc/.test(n2) || seen[n2]) continue;
      seen[n2] = true;
      names.push(n2);
    }
  }
  return names;
}

/** 提取书签前的中文 label：取书签所在单元格/段落中、书签之前的文本 */
export function labelBeforeBookmark(docXml: string, name: string): string {
  const bmIdx = docXml.indexOf('w:name="' + name + '"');
  if (bmIdx < 0) return '';
  let lastOpen = -1;
  let mm: RegExpExecArray | null;
  const openRe = /<w:(tc|p)\b[^>]*>/g;
  while ((mm = openRe.exec(docXml))) {
    if (mm.index < bmIdx) lastOpen = mm.index;
    else break;
  }
  if (lastOpen < 0) return '';
  const seg = docXml.slice(lastOpen, bmIdx);
  let txt = '';
  let tm: RegExpExecArray | null;
  const tre = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;
  while ((tm = tre.exec(seg))) txt += tm[1];
  return txt.replace(/\s+/g, ' ').replace(/[：:，。、\s]+$/, '').trim();
}

/** 子表：定位含 _child 书签的表格，取首行表头单元格的中文列 */
export function extractSubtableHeaders(
  docXml: string,
  childBm: string
): Array<{ chinese: string }> {
  const bmIdx = docXml.indexOf('w:name="' + childBm + '"');
  if (bmIdx < 0) return [];
  let tOpen = -1;
  let tm: RegExpExecArray | null;
  const tre = /<w:tbl\b[^>]*>/g;
  while ((tm = tre.exec(docXml))) {
    if (tm.index < bmIdx) tOpen = tm.index;
    else break;
  }
  const tEnd = docXml.indexOf('</w:tbl>', bmIdx);
  if (tOpen < 0 || tEnd < 0) return [];
  const tbl = docXml.slice(tOpen, tEnd + '</w:tbl>'.length);
  const rMatch = /<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/.exec(tbl);
  if (!rMatch) return [];
  const row = rMatch[0];
  const cells: Array<{ chinese: string }> = [];
  let cm: RegExpExecArray | null;
  const cRe = /<w:tc\b[^>]*>([\s\S]*?)<\/w:tc>/g;
  while ((cm = cRe.exec(row))) {
    let txt = '';
    let tRe: RegExpExecArray | null;
    const tRe2 = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;
    while ((tRe = tRe2.exec(cm[1]))) txt += tRe[1];
    txt = txt.replace(/\s+/g, ' ').replace(/[：:，。、\s]+$/, '').trim();
    if (txt) cells.push({ chinese: txt });
  }
  return cells;
}

/** 单元格内纯文本（供子表表头去空白判定用） */
export function cellText(cellStr: string): string {
  let txt = '';
  let m: RegExpExecArray | null;
  const re = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;
  while ((m = re.exec(cellStr))) txt += m[1];
  return txt.replace(/\s+/g, ' ').trim();
}
