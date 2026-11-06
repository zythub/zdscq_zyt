const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-D-ZMwtYx.js","assets/vendor-BCO9Chjb.js","assets/pinyin-DiBRVqv8.js","assets/xlsx-3SA47z_C.js","assets/index-D3p9KSTy.css"])))=>i.map(i=>d[i]);
import{u as O,s as yr,a as wr,d as Fe,n as xr,r as Vn,i as st,h as $n,c as ge,w as on,b as ye,p as Ct,o as Hn,e as pn,f as K,g as re,j as D,k as Qt,F as Ne,l as De,m as Te,q as ne,t as ue,v as de,x as X,B as Ee,y as Ae,z as Pe,T as kr,A as Er,N as Ar,C as Sr,D as Ir,E as Cr,G as Tr,H as Rr,I as Nr,J as qn,K as Lr,L as Dr,M as Or,O as je,P as kt,Q as Le,R as zr,S as Wn,U as at,V as lt,W as zt,X as Fr,Y as Gn,Z as Rt,_ as Ye,$ as Br,a0 as Pr,a1 as Mr,a2 as jr,a3 as Zt,a4 as Ur,a5 as Vr,a6 as Tt,a7 as $r,a8 as Hr,a9 as Ft,aa as qr,ab as Wr,ac as Gr,ad as Qr}from"./vendor-BCO9Chjb.js";import{p as Qn}from"./pinyin-DiBRVqv8.js";import{u as mt,w as Zr}from"./xlsx-3SA47z_C.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))c(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function t(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(l){if(l.ep)return;l.ep=!0;const a=t(l);fetch(l.href,a)}})();/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const it=typeof document<"u";function Zn(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Kr(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Zn(e.default)}const we=Object.assign;function Bt(e,n){const t={};for(const c in n){const l=n[c];t[c]=Ue(l)?l.map(e):e(l)}return t}const _t=()=>{},Ue=Array.isArray;function mn(e,n){const t={};for(const c in e)t[c]=c in n?n[c]:e[c];return t}const Kn=/#/g,Xr=/&/g,Yr=/\//g,Jr=/=/g,ea=/\?/g,Xn=/\+/g,ta=/%5B/g,na=/%5D/g,Yn=/%5E/g,ra=/%60/g,Jn=/%7B/g,aa=/%7C/g,er=/%7D/g,sa=/%20/g;function ln(e){return e==null?"":encodeURI(""+e).replace(aa,"|").replace(ta,"[").replace(na,"]")}function ia(e){return ln(e).replace(Jn,"{").replace(er,"}").replace(Yn,"^")}function Kt(e){return ln(e).replace(Xn,"%2B").replace(sa,"+").replace(Kn,"%23").replace(Xr,"%26").replace(ra,"`").replace(Jn,"{").replace(er,"}").replace(Yn,"^")}function oa(e){return Kt(e).replace(Jr,"%3D")}function la(e){return ln(e).replace(Kn,"%23").replace(ea,"%3F")}function ua(e){return la(e).replace(Yr,"%2F")}function vt(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const da=/\/$/,ca=e=>e.replace(da,"");function Pt(e,n,t="/"){let c,l={},a="",r="";const o=n.indexOf("#");let u=n.indexOf("?");return u=o>=0&&u>o?-1:u,u>=0&&(c=n.slice(0,u),a=n.slice(u,o>0?o:n.length),l=e(a.slice(1))),o>=0&&(c=c||n.slice(0,o),r=n.slice(o,n.length)),c=ma(c??n,t),{fullPath:c+a+r,path:c,query:l,hash:vt(r)}}function fa(e,n){const t=n.query?e(n.query):"";return n.path+(t&&"?")+t+(n.hash||"")}function gn(e,n){return!n||!e.toLowerCase().startsWith(n.toLowerCase())?e:e.slice(n.length)||"/"}function ha(e,n,t){const c=n.matched.length-1,l=t.matched.length-1;return c>-1&&c===l&&ut(n.matched[c],t.matched[l])&&tr(n.params,t.params)&&e(n.query)===e(t.query)&&n.hash===t.hash}function ut(e,n){return(e.aliasOf||e)===(n.aliasOf||n)}function tr(e,n){if(Object.keys(e).length!==Object.keys(n).length)return!1;for(var t in e)if(!pa(e[t],n[t]))return!1;return!0}function pa(e,n){return Ue(e)?bn(e,n):Ue(n)?bn(n,e):(e==null?void 0:e.valueOf())===(n==null?void 0:n.valueOf())}function bn(e,n){return Ue(n)?e.length===n.length&&e.every((t,c)=>t===n[c]):e.length===1&&e[0]===n}function ma(e,n){if(e.startsWith("/"))return e;if(!e)return n;const t=n.split("/"),c=e.split("/"),l=c[c.length-1];(l===".."||l===".")&&c.push("");let a=t.length-1,r,o;for(r=0;r<c.length;r++)if(o=c[r],o!==".")if(o==="..")a>1&&a--;else break;return t.slice(0,a).join("/")+"/"+c.slice(r).join("/")}const Ge={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Xt=(function(e){return e.pop="pop",e.push="push",e})({}),Mt=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function ga(e){if(!e)if(it){const n=document.querySelector("base");e=n&&n.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),ca(e)}const ba=/^[^#]+#/;function _a(e,n){return e.replace(ba,"#")+n}function va(e,n){const t=document.documentElement.getBoundingClientRect(),c=e.getBoundingClientRect();return{behavior:n.behavior,left:c.left-t.left-(n.left||0),top:c.top-t.top-(n.top||0)}}const Nt=()=>({left:window.scrollX,top:window.scrollY});function ya(e){let n;if("el"in e){const t=e.el,c=typeof t=="string"&&t.startsWith("#"),l=typeof t=="string"?c?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!l)return;n=va(l,e)}else n=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(n):window.scrollTo(n.left!=null?n.left:window.scrollX,n.top!=null?n.top:window.scrollY)}function _n(e,n){return(history.state?history.state.position-n:-1)+e}const Yt=new Map;function wa(e,n){Yt.set(e,n)}function xa(e){const n=Yt.get(e);return Yt.delete(e),n}function ka(e){return typeof e=="string"||e&&typeof e=="object"}function nr(e){return typeof e=="string"||typeof e=="symbol"}let Ie=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const rr=Symbol("");Ie.MATCHER_NOT_FOUND+"",Ie.NAVIGATION_GUARD_REDIRECT+"",Ie.NAVIGATION_ABORTED+"",Ie.NAVIGATION_CANCELLED+"",Ie.NAVIGATION_DUPLICATED+"";function dt(e,n){return we(new Error,{type:e,[rr]:!0},n)}function qe(e,n){return e instanceof Error&&rr in e&&(n==null||!!(e.type&n))}const Ea=["params","query","hash"];function Aa(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const n={};for(const t of Ea)t in e&&(n[t]=e[t]);return JSON.stringify(n,null,2)}function Sa(e){const n={};if(e===""||e==="?")return n;const t=(e[0]==="?"?e.slice(1):e).split("&");for(let c=0;c<t.length;++c){const l=t[c].replace(Xn," "),a=l.indexOf("="),r=vt(a<0?l:l.slice(0,a)),o=a<0?null:vt(l.slice(a+1));if(r in n){let u=n[r];Ue(u)||(u=n[r]=[u]),u.push(o)}else n[r]=o}return n}function vn(e){let n="";for(let t in e){const c=e[t];if(t=oa(t),c==null){c!==void 0&&(n+=(n.length?"&":"")+t);continue}(Ue(c)?c.map(l=>l&&Kt(l)):[c&&Kt(c)]).forEach(l=>{l!==void 0&&(n+=(n.length?"&":"")+t,l!=null&&(n+="="+l))})}return n}function Ia(e){const n={};for(const t in e){const c=e[t];c!==void 0&&(n[t]=Ue(c)?c.map(l=>l==null?null:""+l):c==null?c:""+c)}return n}const Ca=Symbol(""),yn=Symbol(""),Lt=Symbol(""),un=Symbol(""),Jt=Symbol("");function gt(){let e=[];function n(c){return e.push(c),()=>{const l=e.indexOf(c);l>-1&&e.splice(l,1)}}function t(){e=[]}return{add:n,list:()=>e.slice(),reset:t}}function Ze(e,n,t,c,l,a=r=>r()){const r=c&&(c.enterCallbacks[l]=c.enterCallbacks[l]||[]);return()=>new Promise((o,u)=>{const h=d=>{d===!1?u(dt(Ie.NAVIGATION_ABORTED,{from:t,to:n})):d instanceof Error?u(d):ka(d)?u(dt(Ie.NAVIGATION_GUARD_REDIRECT,{from:n,to:d})):(r&&c.enterCallbacks[l]===r&&typeof d=="function"&&r.push(d),o())},p=a(()=>e.call(c&&c.instances[l],n,t,h));let f=Promise.resolve(p);e.length<3&&(f=f.then(h)),f.catch(d=>u(d))})}function jt(e,n,t,c,l=a=>a()){const a=[];for(const r of e)for(const o in r.components){let u=r.components[o];if(!(n!=="beforeRouteEnter"&&!r.instances[o]))if(Zn(u)){const h=(u.__vccOpts||u)[n];h&&a.push(Ze(h,t,c,r,o,l))}else{let h=u();a.push(()=>h.then(p=>{if(!p)throw new Error(`Couldn't resolve component "${o}" at "${r.path}"`);const f=Kr(p)?p.default:p;r.mods[o]=p,r.components[o]=f;const d=(f.__vccOpts||f)[n];return d&&Ze(d,t,c,r,o,l)()}))}}return a}function Ta(e,n){const t=[],c=[],l=[],a=Math.max(n.matched.length,e.matched.length);for(let r=0;r<a;r++){const o=n.matched[r];o&&(e.matched.find(h=>ut(h,o))?c.push(o):t.push(o));const u=e.matched[r];u&&(n.matched.find(h=>ut(h,u))||l.push(u))}return[t,c,l]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Ra=()=>location.protocol+"//"+location.host;function ar(e,n){const{pathname:t,search:c,hash:l}=n,a=e.indexOf("#");if(a>-1){let r=l.includes(e.slice(a))?e.slice(a).length:1,o=l.slice(r);return o[0]!=="/"&&(o="/"+o),gn(o,"")}return gn(t,e)+c+l}function Na(e,n,t,c){let l=[],a=[],r=null;const o=({state:d})=>{const s=ar(e,location),b=t.value,g=n.value;let y=0;if(d){if(t.value=s,n.value=d,r&&r===b){r=null;return}y=g?d.position-g.position:0}else c(s);l.forEach(_=>{_(t.value,b,{delta:y,type:Xt.pop,direction:y?y>0?Mt.forward:Mt.back:Mt.unknown})})};function u(){r=t.value}function h(d){l.push(d);const s=()=>{const b=l.indexOf(d);b>-1&&l.splice(b,1)};return a.push(s),s}function p(){if(document.visibilityState==="hidden"){const{history:d}=window;if(!d.state)return;d.replaceState(we({},d.state,{scroll:Nt()}),"")}}function f(){for(const d of a)d();a=[],window.removeEventListener("popstate",o),window.removeEventListener("pagehide",p),document.removeEventListener("visibilitychange",p)}return window.addEventListener("popstate",o),window.addEventListener("pagehide",p),document.addEventListener("visibilitychange",p),{pauseListeners:u,listen:h,destroy:f}}function wn(e,n,t,c=!1,l=!1){return{back:e,current:n,forward:t,replaced:c,position:window.history.length,scroll:l?Nt():null}}function La(e){const{history:n,location:t}=window,c={value:ar(e,t)},l={value:n.state};l.value||a(c.value,{back:null,current:c.value,forward:null,position:n.length-1,replaced:!0,scroll:null},!0);function a(u,h,p){const f=e.indexOf("#"),d=f>-1?(t.host&&document.querySelector("base")?e:e.slice(f))+u:Ra()+e+u;try{n[p?"replaceState":"pushState"](h,"",d),l.value=h}catch(s){console.error(s),t[p?"replace":"assign"](d)}}function r(u,h){a(u,we({},n.state,wn(l.value.back,u,l.value.forward,!0),h,{position:l.value.position}),!0),c.value=u}function o(u,h){const p=we({},l.value,n.state,{forward:u,scroll:Nt()});a(p.current,p,!0),a(u,we({},wn(c.value,u,null),{position:p.position+1},h),!1),c.value=u}return{location:c,state:l,push:o,replace:r}}function Da(e){e=ga(e);const n=La(e),t=Na(e,n.state,n.location,n.replace);function c(a,r=!0){r||t.pauseListeners(),history.go(a)}const l=we({location:"",base:e,go:c,createHref:_a.bind(null,e)},n,t);return Object.defineProperty(l,"location",{enumerable:!0,get:()=>n.location.value}),Object.defineProperty(l,"state",{enumerable:!0,get:()=>n.state.value}),l}function Oa(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Da(e)}let tt=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var Re=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(Re||{});const za={type:tt.Static,value:""},Fa=/[a-zA-Z0-9_]/;function Ba(e){if(!e)return[[]];if(e==="/")return[[za]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function n(s){throw new Error(`ERR (${t})/"${h}": ${s}`)}let t=Re.Static,c=t;const l=[];let a;function r(){a&&l.push(a),a=[]}let o=0,u,h="",p="";function f(){h&&(t===Re.Static?a.push({type:tt.Static,value:h}):t===Re.Param||t===Re.ParamRegExp||t===Re.ParamRegExpEnd?(a.length>1&&(u==="*"||u==="+")&&n(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),a.push({type:tt.Param,value:h,regexp:p,repeatable:u==="*"||u==="+",optional:u==="*"||u==="?"})):n("Invalid state to consume buffer"),h="")}function d(){h+=u}for(;o<e.length;){if(u=e[o++],u==="\\"&&t!==Re.ParamRegExp){c=t,t=Re.EscapeNext;continue}switch(t){case Re.Static:u==="/"?(h&&f(),r()):u===":"?(f(),t=Re.Param):d();break;case Re.EscapeNext:d(),t=c;break;case Re.Param:u==="("?t=Re.ParamRegExp:Fa.test(u)?d():(f(),t=Re.Static,u!=="*"&&u!=="?"&&u!=="+"&&o--);break;case Re.ParamRegExp:u===")"?p[p.length-1]=="\\"?p=p.slice(0,-1)+u:t=Re.ParamRegExpEnd:p+=u;break;case Re.ParamRegExpEnd:f(),t=Re.Static,u!=="*"&&u!=="?"&&u!=="+"&&o--,p="";break;default:n("Unknown state");break}}return t===Re.ParamRegExp&&n(`Unfinished custom RegExp for param "${h}"`),f(),r(),l}const xn="[^/]+?",Pa={sensitive:!1,strict:!1,start:!0,end:!0};var Oe=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(Oe||{});const Ma=/[.+*?^${}()[\]/\\]/g;function ja(e,n){const t=we({},Pa,n),c=[];let l=t.start?"^":"";const a=[];for(const h of e){const p=h.length?[]:[Oe.Root];t.strict&&!h.length&&(l+="/");for(let f=0;f<h.length;f++){const d=h[f];let s=Oe.Segment+(t.sensitive?Oe.BonusCaseSensitive:0);if(d.type===tt.Static)f||(l+="/"),l+=d.value.replace(Ma,"\\$&"),s+=Oe.Static;else if(d.type===tt.Param){const{value:b,repeatable:g,optional:y,regexp:_}=d;a.push({name:b,repeatable:g,optional:y});const v=_||xn;if(v!==xn){s+=Oe.BonusCustomRegExp;try{`${v}`}catch(A){throw new Error(`Invalid custom RegExp for param "${b}" (${v}): `+A.message)}}let w=g?`((?:${v})(?:/(?:${v}))*)`:`(${v})`;f||(w=y&&h.length<2?`(?:/${w})`:"/"+w),y&&(w+="?"),l+=w,s+=Oe.Dynamic,y&&(s+=Oe.BonusOptional),g&&(s+=Oe.BonusRepeatable),v===".*"&&(s+=Oe.BonusWildcard)}p.push(s)}c.push(p)}if(t.strict&&t.end){const h=c.length-1;c[h][c[h].length-1]+=Oe.BonusStrict}t.strict||(l+="/?"),t.end?l+="$":t.strict&&!l.endsWith("/")&&(l+="(?:/|$)");const r=new RegExp(l,t.sensitive?"":"i");function o(h){const p=h.match(r),f={};if(!p)return null;for(let d=1;d<p.length;d++){const s=p[d]||"",b=a[d-1];f[b.name]=s&&b.repeatable?s.split("/"):s}return f}function u(h){let p="",f=!1;for(const d of e){(!f||!p.endsWith("/"))&&(p+="/"),f=!1;for(const s of d)if(s.type===tt.Static)p+=s.value;else if(s.type===tt.Param){const{value:b,repeatable:g,optional:y}=s,_=b in h?h[b]:"";if(Ue(_)&&!g)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const v=Ue(_)?_.join("/"):_;if(!v)if(y)d.length<2&&(p.endsWith("/")?p=p.slice(0,-1):f=!0);else throw new Error(`Missing required param "${b}"`);p+=v}}return p||"/"}return{re:r,score:c,keys:a,parse:o,stringify:u}}function Ua(e,n){let t=0;for(;t<e.length&&t<n.length;){const c=n[t]-e[t];if(c)return c;t++}return e.length<n.length?e.length===1&&e[0]===Oe.Static+Oe.Segment?-1:1:e.length>n.length?n.length===1&&n[0]===Oe.Static+Oe.Segment?1:-1:0}function sr(e,n){let t=0;const c=e.score,l=n.score;for(;t<c.length&&t<l.length;){const a=Ua(c[t],l[t]);if(a)return a;t++}if(Math.abs(l.length-c.length)===1){if(kn(c))return 1;if(kn(l))return-1}return l.length-c.length}function kn(e){const n=e[e.length-1];return e.length>0&&n[n.length-1]<0}const Va={strict:!1,end:!0,sensitive:!1};function $a(e,n,t){const c=ja(Ba(e.path),t),l=we(c,{record:e,parent:n,children:[],alias:[]});return n&&!l.record.aliasOf==!n.record.aliasOf&&n.children.push(l),l}function Ha(e,n){const t=[],c=new Map;n=mn(Va,n);function l(f){return c.get(f)}function a(f,d,s){const b=!s,g=An(f);g.aliasOf=s&&s.record;const y=mn(n,f),_=[g];if("alias"in f){const A=typeof f.alias=="string"?[f.alias]:f.alias;for(const C of A)_.push(An(we({},g,{components:s?s.record.components:g.components,path:C,aliasOf:s?s.record:g})))}let v,w;for(const A of _){const{path:C}=A;if(d&&C[0]!=="/"){const I=d.record.path,x=I[I.length-1]==="/"?"":"/";A.path=d.record.path+(C&&x+C)}if(v=$a(A,d,y),s?s.alias.push(v):(w=w||v,w!==v&&w.alias.push(v),b&&f.name&&!Sn(v)&&r(f.name)),ir(v)&&u(v),g.children){const I=g.children;for(let x=0;x<I.length;x++)a(I[x],v,s&&s.children[x])}s=s||v}return w?()=>{r(w)}:_t}function r(f){if(nr(f)){const d=c.get(f);d&&(c.delete(f),t.splice(t.indexOf(d),1),d.children.forEach(r),d.alias.forEach(r))}else{const d=t.indexOf(f);d>-1&&(t.splice(d,1),f.record.name&&c.delete(f.record.name),f.children.forEach(r),f.alias.forEach(r))}}function o(){return t}function u(f){const d=Ga(f,t);t.splice(d,0,f),f.record.name&&!Sn(f)&&c.set(f.record.name,f)}function h(f,d){let s,b={},g,y;if("name"in f&&f.name){if(s=c.get(f.name),!s)throw dt(Ie.MATCHER_NOT_FOUND,{location:f});y=s.record.name,b=we(En(d.params,s.keys.filter(w=>!w.optional).concat(s.parent?s.parent.keys.filter(w=>w.optional):[]).map(w=>w.name)),f.params&&En(f.params,s.keys.map(w=>w.name))),g=s.stringify(b)}else if(f.path!=null)g=f.path,s=t.find(w=>w.re.test(g)),s&&(b=s.parse(g),y=s.record.name);else{if(s=d.name?c.get(d.name):t.find(w=>w.re.test(d.path)),!s)throw dt(Ie.MATCHER_NOT_FOUND,{location:f,currentLocation:d});y=s.record.name,b=we({},d.params,f.params),g=s.stringify(b)}const _=[];let v=s;for(;v;)_.unshift(v.record),v=v.parent;return{name:y,path:g,params:b,matched:_,meta:Wa(_)}}e.forEach(f=>a(f));function p(){t.length=0,c.clear()}return{addRoute:a,resolve:h,removeRoute:r,clearRoutes:p,getRoutes:o,getRecordMatcher:l}}function En(e,n){const t={};for(const c of n)c in e&&(t[c]=e[c]);return t}function An(e){const n={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:qa(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(n,"mods",{value:{}}),n}function qa(e){const n={},t=e.props||!1;if("component"in e)n.default=t;else for(const c in e.components)n[c]=typeof t=="object"?t[c]:t;return n}function Sn(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Wa(e){return e.reduce((n,t)=>we(n,t.meta),{})}function Ga(e,n){let t=0,c=n.length;for(;t!==c;){const a=t+c>>1;sr(e,n[a])<0?c=a:t=a+1}const l=Qa(e);return l&&(c=n.lastIndexOf(l,c-1)),c}function Qa(e){let n=e;for(;n=n.parent;)if(ir(n)&&sr(e,n)===0)return n}function ir({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function In(e){const n=st(Lt),t=st(un),c=ge(()=>{const u=O(e.to);return n.resolve(u)}),l=ge(()=>{const{matched:u}=c.value,{length:h}=u,p=u[h-1],f=t.matched;if(!p||!f.length)return-1;const d=f.findIndex(ut.bind(null,p));if(d>-1)return d;const s=Cn(u[h-2]);return h>1&&Cn(p)===s&&f[f.length-1].path!==s?f.findIndex(ut.bind(null,u[h-2])):d}),a=ge(()=>l.value>-1&&Ja(t.params,c.value.params)),r=ge(()=>l.value>-1&&l.value===t.matched.length-1&&tr(t.params,c.value.params));function o(u={}){if(Ya(u)){const h=n[O(e.replace)?"replace":"push"](O(e.to)).catch(_t);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>h),h}return Promise.resolve()}return{route:c,href:ge(()=>c.value.href),isActive:a,isExactActive:r,navigate:o}}function Za(e){return e.length===1?e[0]:e}const Ka=Fe({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:In,setup(e,{slots:n}){const t=Vn(In(e)),{options:c}=st(Lt),l=ge(()=>({[Tn(e.activeClass,c.linkActiveClass,"router-link-active")]:t.isActive,[Tn(e.exactActiveClass,c.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const a=n.default&&Za(n.default(t));return e.custom?a:$n("a",{"aria-current":t.isExactActive?e.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:l.value},a)}}}),Xa=Ka;function Ya(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const n=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(n))return}return e.preventDefault&&e.preventDefault(),!0}}function Ja(e,n){for(const t in n){const c=n[t],l=e[t];if(typeof c=="string"){if(c!==l)return!1}else if(!Ue(l)||l.length!==c.length||c.some((a,r)=>a.valueOf()!==l[r].valueOf()))return!1}return!0}function Cn(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Tn=(e,n,t)=>e??n??t,es=Fe({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:t}){const c=st(Jt),l=ge(()=>e.route||c.value),a=st(yn,0),r=ge(()=>{let h=O(a);const{matched:p}=l.value;let f;for(;(f=p[h])&&!f.components;)h++;return h}),o=ge(()=>l.value.matched[r.value]);Ct(yn,ge(()=>r.value+1)),Ct(Ca,o),Ct(Jt,l);const u=ye();return on(()=>[u.value,o.value,e.name],([h,p,f],[d,s,b])=>{p&&(p.instances[f]=h,s&&s!==p&&h&&h===d&&(p.leaveGuards.size||(p.leaveGuards=s.leaveGuards),p.updateGuards.size||(p.updateGuards=s.updateGuards))),h&&p&&(!s||!ut(p,s)||!d)&&(p.enterCallbacks[f]||[]).forEach(g=>g(h))},{flush:"post"}),()=>{const h=l.value,p=e.name,f=o.value,d=f&&f.components[p];if(!d)return Rn(t.default,{Component:d,route:h});const s=f.props[p],b=s?s===!0?h.params:typeof s=="function"?s(h):s:null,y=$n(d,we({},b,n,{onVnodeUnmounted:_=>{_.component.isUnmounted&&(f.instances[p]=null)},ref:u}));return Rn(t.default,{Component:y,route:h})||y}}});function Rn(e,n){if(!e)return null;const t=e(n);return t.length===1?t[0]:t}const ts=es;function ns(e){const n=Ha(e.routes,e),t=e.parseQuery||Sa,c=e.stringifyQuery||vn,l=e.history,a=gt(),r=gt(),o=gt(),u=wr(Ge);let h=Ge;it&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const p=Bt.bind(null,V=>""+V),f=Bt.bind(null,ua),d=Bt.bind(null,vt);function s(V,Z){let G,ie;return nr(V)?(G=n.getRecordMatcher(V),ie=Z):ie=V,n.addRoute(ie,G)}function b(V){const Z=n.getRecordMatcher(V);Z&&n.removeRoute(Z)}function g(){return n.getRoutes().map(V=>V.record)}function y(V){return!!n.getRecordMatcher(V)}function _(V,Z){if(Z=we({},Z||u.value),typeof V=="string"){const i=Pt(t,V,Z.path),U=n.resolve({path:i.path},Z),M=l.createHref(i.fullPath);return we(i,U,{params:d(U.params),hash:vt(i.hash),redirectedFrom:void 0,href:M})}let G;if(V.path!=null)G=we({},V,{path:Pt(t,V.path,Z.path).path});else{const i=we({},V.params);for(const U in i)i[U]==null&&delete i[U];G=we({},V,{params:f(i)}),Z.params=f(Z.params)}const ie=n.resolve(G,Z),ce=V.hash||"";ie.params=p(d(ie.params));const ve=fa(c,we({},V,{hash:ia(ce),path:ie.path})),pe=l.createHref(ve);return we({fullPath:ve,hash:ce,query:c===vn?Ia(V.query):V.query||{}},ie,{redirectedFrom:void 0,href:pe})}function v(V){return typeof V=="string"?Pt(t,V,u.value.path):we({},V)}function w(V,Z){if(h!==V)return dt(Ie.NAVIGATION_CANCELLED,{from:Z,to:V})}function A(V){return x(V)}function C(V){return A(we(v(V),{replace:!0}))}function I(V,Z){const G=V.matched[V.matched.length-1];if(G&&G.redirect){const{redirect:ie}=G;let ce=typeof ie=="function"?ie(V,Z):ie;return typeof ce=="string"&&(ce=ce.includes("?")||ce.includes("#")?ce=v(ce):{path:ce},ce.params={}),we({query:V.query,hash:V.hash,params:ce.path!=null?{}:V.params},ce)}}function x(V,Z){const G=h=_(V),ie=u.value,ce=V.state,ve=V.force,pe=V.replace===!0,i=I(G,ie);if(i)return x(we(v(i),{state:typeof i=="object"?we({},ce,i.state):ce,force:ve,replace:pe}),Z||G);const U=G;U.redirectedFrom=Z;let M;return!ve&&ha(c,ie,G)&&(M=dt(Ie.NAVIGATION_DUPLICATED,{to:U,from:ie}),B(ie,ie,!0,!1)),(M?Promise.resolve(M):P(U,ie)).catch(E=>qe(E)?qe(E,Ie.NAVIGATION_GUARD_REDIRECT)?E:le(E):H(E,U,ie)).then(E=>{if(E){if(qe(E,Ie.NAVIGATION_GUARD_REDIRECT))return x(we({replace:pe},v(E.to),{state:typeof E.to=="object"?we({},ce,E.to.state):ce,force:ve}),Z||U)}else E=S(U,ie,!0,pe,ce);return se(U,ie,E),E})}function T(V,Z){const G=w(V,Z);return G?Promise.reject(G):Promise.resolve()}function N(V){const Z=te.values().next().value;return Z&&typeof Z.runWithContext=="function"?Z.runWithContext(V):V()}function P(V,Z){let G;const[ie,ce,ve]=Ta(V,Z);G=jt(ie.reverse(),"beforeRouteLeave",V,Z);for(const i of ie)i.leaveGuards.forEach(U=>{G.push(Ze(U,V,Z))});const pe=T.bind(null,V,Z);return G.push(pe),xe(G).then(()=>{G=[];for(const i of a.list())G.push(Ze(i,V,Z));return G.push(pe),xe(G)}).then(()=>{G=jt(ce,"beforeRouteUpdate",V,Z);for(const i of ce)i.updateGuards.forEach(U=>{G.push(Ze(U,V,Z))});return G.push(pe),xe(G)}).then(()=>{G=[];for(const i of ve)if(i.beforeEnter)if(Ue(i.beforeEnter))for(const U of i.beforeEnter)G.push(Ze(U,V,Z));else G.push(Ze(i.beforeEnter,V,Z));return G.push(pe),xe(G)}).then(()=>(V.matched.forEach(i=>i.enterCallbacks={}),G=jt(ve,"beforeRouteEnter",V,Z,N),G.push(pe),xe(G))).then(()=>{G=[];for(const i of r.list())G.push(Ze(i,V,Z));return G.push(pe),xe(G)}).catch(i=>qe(i,Ie.NAVIGATION_CANCELLED)?i:Promise.reject(i))}function se(V,Z,G){o.list().forEach(ie=>N(()=>ie(V,Z,G)))}function S(V,Z,G,ie,ce){const ve=w(V,Z);if(ve)return ve;const pe=Z===Ge,i=it?history.state:{};G&&(ie||pe?l.replace(V.fullPath,we({scroll:pe&&i&&i.scroll},ce)):l.push(V.fullPath,ce)),u.value=V,B(V,Z,G,pe),le()}let j;function m(){j||(j=l.listen((V,Z,G)=>{if(!J.listening)return;const ie=_(V),ce=I(ie,J.currentRoute.value);if(ce){x(we(ce,{replace:!0,force:!0}),ie).catch(_t);return}h=ie;const ve=u.value;it&&wa(_n(ve.fullPath,G.delta),Nt()),P(ie,ve).catch(pe=>qe(pe,Ie.NAVIGATION_ABORTED|Ie.NAVIGATION_CANCELLED)?pe:qe(pe,Ie.NAVIGATION_GUARD_REDIRECT)?(x(we(v(pe.to),{force:!0}),ie).then(i=>{qe(i,Ie.NAVIGATION_ABORTED|Ie.NAVIGATION_DUPLICATED)&&!G.delta&&G.type===Xt.pop&&l.go(-1,!1)}).catch(_t),Promise.reject()):(G.delta&&l.go(-G.delta,!1),H(pe,ie,ve))).then(pe=>{pe=pe||S(ie,ve,!1),pe&&(G.delta&&!qe(pe,Ie.NAVIGATION_CANCELLED)?l.go(-G.delta,!1):G.type===Xt.pop&&qe(pe,Ie.NAVIGATION_ABORTED|Ie.NAVIGATION_DUPLICATED)&&l.go(-1,!1)),se(ie,ve,pe)}).catch(_t)}))}let $=gt(),he=gt(),F;function H(V,Z,G){le(V);const ie=he.list();return ie.length?ie.forEach(ce=>ce(V,Z,G)):console.error(V),Promise.reject(V)}function W(){return F&&u.value!==Ge?Promise.resolve():new Promise((V,Z)=>{$.add([V,Z])})}function le(V){return F||(F=!V,m(),$.list().forEach(([Z,G])=>V?G(V):Z()),$.reset()),V}function B(V,Z,G,ie){const{scrollBehavior:ce}=e;if(!it||!ce)return Promise.resolve();const ve=!G&&xa(_n(V.fullPath,0))||(ie||!G)&&history.state&&history.state.scroll||null;return xr().then(()=>ce(V,Z,ve)).then(pe=>pe&&ya(pe)).catch(pe=>H(pe,V,Z))}const R=V=>l.go(V);let ae;const te=new Set,J={currentRoute:u,listening:!0,addRoute:s,removeRoute:b,clearRoutes:n.clearRoutes,hasRoute:y,getRoutes:g,resolve:_,options:e,push:A,replace:C,go:R,back:()=>R(-1),forward:()=>R(1),beforeEach:a.add,beforeResolve:r.add,afterEach:o.add,onError:he.add,isReady:W,install(V){V.component("RouterLink",Xa),V.component("RouterView",ts),V.config.globalProperties.$router=J,Object.defineProperty(V.config.globalProperties,"$route",{enumerable:!0,get:()=>O(u)}),it&&!ae&&u.value===Ge&&(ae=!0,A(l.location).catch(ie=>{}));const Z={};for(const ie in Ge)Object.defineProperty(Z,ie,{get:()=>u.value[ie],enumerable:!0});V.provide(Lt,J),V.provide(un,yr(Z)),V.provide(Jt,u);const G=V.unmount;te.add(V),V.unmount=function(){te.delete(V),te.size<1&&(h=Ge,j&&j(),j=null,u.value=Ge,ae=!1,F=!1),G()}}};function xe(V){return V.reduce((Z,G)=>Z.then(()=>N(G)),Promise.resolve())}return J}function or(){return st(Lt)}function rs(e){return st(un)}const as=[],lr="vercount_value_site_pv",ss="vercount_value_site_pv_manual",is="https://events.vercount.one/js",Ut=ye(null);let bt=null;function ur(){var t;bt||(bt=document.getElementById(lr));const e=(t=bt==null?void 0:bt.textContent)==null?void 0:t.trim();e&&e!=="–"&&e!=="-"&&(Ut.value=e);const n=document.getElementById(ss);n&&Ut.value&&(n.textContent=Ut.value)}function os(){const e=window;if(e.__vercountLoaded)return;e.__vercountLoaded=!0;try{localStorage.removeItem("visitorCountData")}catch{}const n=document.createElement("script");n.src=is,n.async=!0,n.onerror=()=>{e.__vercountLoaded=!1},n.onload=()=>{let t=0;const c=()=>{ur(),++t<40&&window.setTimeout(c,250)};c()},document.head.appendChild(n)}function ls(){Hn(()=>{os();let e=0;const n=()=>{ur(),++e<60&&window.setTimeout(n,300)};window.setTimeout(n,300)})}const us={class:"shell is-top"},ds={key:0,class:"side"},cs=["href"],fs={class:"nav"},hs={class:"nav-ico",viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round"},ps=["d"],ms={class:"nav-label"},gs=["href","title"],bs={class:"nav-ico ext-ico"},_s={class:"nav-label"},vs={class:"side-foot"},ys={class:"visits",title:"站点累计访问人次"},ws=["id"],xs={class:"top-right"},ks={key:0,viewBox:"0 0 24 24",width:"15",height:"15",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Es={key:1,viewBox:"0 0 24 24",width:"15",height:"15",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},As={class:"main"},Ss={key:0,class:"topbar"},Is={class:"top-title"},Cs=Fe({__name:"ToolLayout",props:{isDark:{type:Boolean}},emits:["toggle-theme"],setup(e,{emit:n}){const t=n,c=or(),l=rs();ls();const a=ge(()=>c.getRoutes().filter(d=>{var s;return d.name&&((s=d.meta)==null?void 0:s.tool)}).filter(d=>{var s;return!((s=d.meta.tool)!=null&&s.hiddenInNav)}).map(d=>{const s=d.meta.tool;return{key:String(d.name),title:s.title,desc:s.desc,icon:s.icon,external:!1,to:d.path}})),r=ge(()=>[...a.value,...as.map(d=>({key:d.id,title:d.name,desc:d.desc,icon:d.icon||"🔗",external:!0,url:d.url}))]),o=ge(()=>{var d;return(d=l.meta)==null?void 0:d.tool}),u=ge(()=>{var d;return!!((d=o.value)!=null&&d.hideChrome)}),h="/zdscq_zyt/".replace(/\/$/,"").endsWith("/tools"),p=h?"../index.html":"/zdscq_zyt/";function f(d){h&&(d.preventDefault(),window.location.href="../index.html")}return(d,s)=>{var y,_;const b=pn("router-link"),g=pn("router-view");return K(),re("div",us,[u.value?Ae("",!0):(K(),re("aside",ds,[D("a",{class:"brand brand-link",href:O(p),title:"返回知识库首页",onClick:f},[...s[1]||(s[1]=[Qt('<span class="brand-mark" aria-hidden="true" data-v-30987a4b><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-v-30987a4b><ellipse cx="12" cy="6" rx="7" ry="3" fill="#fff" stroke="none" data-v-30987a4b></ellipse><path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" data-v-30987a4b></path><path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" data-v-30987a4b></path></svg></span><div class="brand-text" data-v-30987a4b><span class="brand-name" data-v-30987a4b>自定义表单知识库</span><span class="brand-sub" data-v-30987a4b>BESTDT · 二次开发</span></div>',2)])],8,cs),D("nav",fs,[(K(!0),re(Ne,null,De(r.value,v=>(K(),re(Ne,{key:v.key},[v.external?(K(),re("a",{key:1,href:v.url,target:"_blank",rel:"noopener noreferrer",class:"nav-item ext",title:v.title},[D("span",bs,ue(v.icon),1),D("span",_s,ue(v.title),1),s[2]||(s[2]=D("span",{class:"ext-badge","aria-hidden":"true"},"↗",-1))],8,gs)):(K(),Te(b,{key:0,to:v.to,class:"nav-item","active-class":"active",title:v.title},{default:ne(()=>[(K(),re("svg",hs,[D("path",{d:v.icon},null,8,ps)])),D("span",ms,ue(v.title),1)]),_:2},1032,["to","title"]))],64))),128))]),D("div",vs,[s[4]||(s[4]=D("span",{class:"ver"},"v2.1.0",-1)),D("span",ys,[s[3]||(s[3]=de("访问 ",-1)),D("span",{id:O(lr),class:"mono"},"–",8,ws)])]),D("div",xs,[X(O(Ee),{size:"small",quaternary:"",onClick:s[0]||(s[0]=v=>t("toggle-theme"))},{icon:ne(()=>[e.isDark?(K(),re("svg",ks,[...s[5]||(s[5]=[D("circle",{cx:"12",cy:"12",r:"4"},null,-1),D("path",{d:"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"},null,-1)])])):(K(),re("svg",Es,[...s[6]||(s[6]=[D("path",{d:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"},null,-1)])]))]),default:ne(()=>[de(" "+ue(e.isDark?"浅色":"深色"),1)]),_:1})])])),D("div",As,[(y=o.value)!=null&&y.hideTopbar?Ae("",!0):(K(),re("header",Ss,[D("div",Is,[D("h1",null,ue(((_=o.value)==null?void 0:_.title)??"开发效率提升工具集"),1)])])),D("main",{class:Pe(["content",{"chrome-off":u.value}])},[X(g,null,{default:ne(({Component:v})=>[X(kr,{name:"fade",mode:"out-in"},{default:ne(()=>[(K(),Te(Er(v)))]),_:2},1024)]),_:1})],2)])])}}}),$e=(e,n)=>{const t=e.__vccOpts||e;for(const[c,l]of n)t[c]=l;return t},Ts=$e(Cs,[["__scopeId","data-v-30987a4b"]]),Rs={style:{height:"100vh",display:"flex","flex-direction":"column",overflow:"hidden"}},Ns={style:{flex:"1","min-height":"0"}},Vt="handbook.theme",Ls="zdscq:theme",Ds=Fe({__name:"App",setup(e){function n(){try{return(localStorage.getItem(Vt)||localStorage.getItem(Ls))==="light"?"light":"dark"}catch{return"dark"}}const t=ye(n()==="dark"),c=ge(()=>t.value?Rr:null);try{localStorage.setItem(Vt,t.value?"dark":"light")}catch{}function l(){t.value=!t.value;try{localStorage.setItem(Vt,t.value?"dark":"light")}catch{}document.documentElement.classList.toggle("dark",t.value)}document.documentElement.classList.toggle("dark",t.value),Ct("appTheme",{isDark:t,toggle:l});const a={common:{primaryColor:"#1d4ed8",primaryColorHover:"#4f7ff0",primaryColorPressed:"#1e40af",primaryColorSuppl:"#4f7ff0",borderRadius:"8px",borderColor:"#e3e8ef",dividerColor:"#e3e8ef",cardColor:"#ffffff",modalColor:"#ffffff",bodyColor:"#f4f6f9",inputColor:"#ffffff",actionColor:"#f1f5f9",hoverColor:"rgba(29, 78, 216, 0.06)",textColorBase:"#0f172a",textColor1:"#0f172a",textColor2:"#4b5b6f",textColor3:"#94a3b8",placeholderColor:"#cbd5e1",fontWeightStrong:"600",fontFamily:"'Segoe UI', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",fontSize:"18px",fontSizeTiny:"16px",fontSizeSmall:"17px",fontSizeMedium:"18px",fontSizeLarge:"18px",fontSizeHuge:"22px",lineHeight:"1.5"},Card:{borderRadius:"12px"},Dialog:{borderRadius:"12px"},Drawer:{borderRadius:"12px"}},r={common:{primaryColor:"#72a0ff",primaryColorHover:"#93b4ff",primaryColorPressed:"#4f7ff0",primaryColorSuppl:"#93b4ff",borderRadius:"8px",borderColor:"#1e2a3f",dividerColor:"#1e2a3f",cardColor:"#111a2b",modalColor:"#111a2b",bodyColor:"#0b1220",inputColor:"#111a2b",actionColor:"#1c2536",hoverColor:"rgba(114, 160, 255, 0.12)",textColorBase:"#e6edf7",textColor1:"#e6edf7",textColor2:"#a3b2c7",textColor3:"#6b7c93",placeholderColor:"#4a5a70",fontWeightStrong:"600",fontFamily:"'Segoe UI', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",fontSize:"15px",fontSizeTiny:"13px",fontSizeSmall:"14px",fontSizeMedium:"15px",fontSizeLarge:"17px",fontSizeHuge:"20px",lineHeight:"1.5"},Card:{borderRadius:"12px"},Dialog:{borderRadius:"12px"},Drawer:{borderRadius:"12px"}},o=ge(()=>t.value?r:a);return(u,h)=>(K(),Te(O(Tr),{theme:c.value,"theme-overrides":o.value,locale:O(Cr),"date-locale":O(Ir)},{default:ne(()=>[X(O(Ar),null,{default:ne(()=>[X(O(Sr),null,{default:ne(()=>[D("div",Rs,[D("div",Ns,[X(Ts,{"is-dark":t.value,onToggleTheme:l},null,8,["is-dark"])])])]),_:1})]),_:1})]),_:1},8,["theme","theme-overrides","locale","date-locale"]))}}),Os="modulepreload",zs=function(e){return"/zdscq_zyt/"+e},Nn={},Fs=function(n,t,c){let l=Promise.resolve();if(t&&t.length>0){let r=function(h){return Promise.all(h.map(p=>Promise.resolve(p).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),u=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));l=r(t.map(h=>{if(h=zs(h),h in Nn)return;Nn[h]=!0;const p=h.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const d=document.createElement("link");if(d.rel=p?"stylesheet":Os,p||(d.as="script"),d.crossOrigin="",d.href=h,u&&d.setAttribute("nonce",u),document.head.appendChild(d),p)return new Promise((s,b)=>{d.addEventListener("load",s),d.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return l.then(r=>{for(const o of r||[])o.status==="rejected"&&a(o.reason);return n().catch(a)})},Ln=4,Bs={personId:{type:"VARCHAR",length:100,scale:null,nullable:!0,defaultValue:"",comment:""},personName:{type:"VARCHAR",length:200,scale:null,nullable:!0,defaultValue:"",comment:""},opinion:{type:"TEXT",length:null,scale:null,nullable:!0,defaultValue:"",comment:""},date:{type:"DATE",length:null,scale:null,nullable:!0,defaultValue:"",comment:""},text:{type:"VARCHAR",length:50,scale:null,nullable:!0,defaultValue:"",comment:""},amount:{type:"DECIMAL",length:18,scale:2,nullable:!0,defaultValue:"",comment:""},serial:{type:"INT",length:null,scale:null,nullable:!0,defaultValue:"",comment:""},foreignKey:{type:"VARCHAR",length:50,scale:null,nullable:!0,defaultValue:"",comment:""}},Ps={personId:{type:"VARCHAR",length:50,scale:null,nullable:!0,defaultValue:"",comment:""},personName:{type:"VARCHAR",length:100,scale:null,nullable:!0,defaultValue:"",comment:""},opinion:{type:"TEXT",length:null,scale:null,nullable:!0,defaultValue:"",comment:""},date:{type:"DATE",length:null,scale:null,nullable:!0,defaultValue:"",comment:""},text:{type:"VARCHAR",length:50,scale:null,nullable:!0,defaultValue:"",comment:""},amount:{type:"DECIMAL",length:18,scale:2,nullable:!0,defaultValue:"",comment:""},serial:{type:"INT",length:null,scale:null,nullable:!0,defaultValue:"",comment:""},foreignKey:{type:"VARCHAR",length:50,scale:null,nullable:!0,defaultValue:"",comment:""}},Ms=[{suffix:"",role:"personId",label:""},{suffix:"_name",role:"personName",label:"姓名"},{suffix:"_sign",role:"text",label:"签字",override:{type:"TEXT",length:null}}],js=[{suffix:"_id",role:"personId",label:"id",override:{type:"VARCHAR",length:50}},{suffix:"_name",role:"personName",label:"姓名",override:{type:"VARCHAR",length:100}},{suffix:"_sign",role:"text",label:"签名图片",override:{type:"TEXT",length:null}},{suffix:"_yj",role:"opinion",label:"意见"},{suffix:"_date",role:"date",label:"日期"}];function Se(e,n,t,c){return{id:e,name:n,group:t,fields:c.map(([l,a,r])=>({name:l,role:a,isPerson:r===!0}))}}const be=!0,Us=[Se("sgdw","施工单位","参建单位",[["经办人","personId",be],["项目技术负责人","personId",be],["项目经理","personId",be],["经办人日期","date"]]),Se("jldw","监理单位","参建单位",[["总监意见","opinion"],["专业监理工程师意见","opinion"],["专业监理工程师","personId",be],["安全监理工程师","personId",be],["总监理工程师","personId",be],["监理日期","date"]]),Se("sjdw","设计单位","参建单位",[["设计单位意见","opinion"],["设计代表","personId",be],["设计单位日期","date"]]),Se("zjzxdw","造价咨询单位","参建单位",[["造价咨询单位意见","opinion"],["专业造价工程师","personId",be],["造价咨询单位负责人","personId",be],["造价咨询单位日期","date"]]),Se("dbgdw","代保管单位","参建单位",[["代保管单位意见","opinion"],["代保管单位负责人","personId",be],["代保管单位日期","date"]]),Se("gcb","工程部","建设单位部门",[["工程部审核意见","opinion"],["工程部专业工程师","personId",be],["工程部部门负责人","personId",be],["工程部日期","date"]]),Se("azb","安质部","建设单位部门",[["安质部审核意见","opinion"],["安质部专业工程师","personId",be],["安质部部门负责人","personId",be],["安质部日期","date"]]),Se("ajhb","安健环部","建设单位部门",[["安健环部审核意见","opinion"],["安健环部专业工程师","personId",be],["安健环部部门负责人","personId",be],["安健环部日期","date"]]),Se("jhb","计划部","建设单位部门",[["计划部审核意见","opinion"],["计划部专业工程师","personId",be],["计划部部门负责人","personId",be],["计划部日期","date"]]),Se("dab","档案部","建设单位部门",[["档案部审核意见","opinion"],["档案部专业工程师","personId",be],["档案部部门负责人","personId",be],["档案部日期","date"]]),Se("wzb","物资部","建设单位部门",[["建设单位物资部意见","opinion"],["物资部专业工程师","personId",be],["物资部主任","personId",be],["物资部日期","date"]]),Se("jsdw","建设单位","建设单位",[["建设单位审批意见","opinion"],["建设单位代表","personId",be],["建设单位日期","date"]]),Se("jsdwznbm","建设单位职能部门","建设单位",[["建设单位职能部门审核意见","opinion"],["职能部门专业工程师","personId",be],["职能部门负责人","personId",be],["职能部门日期","date"]])],Vs=[Se("sgdw","施工单位","参建单位",[["经办人","personId",be],["项目技术负责人","personId",be]]),Se("jldw","监理单位","参建单位",[["项目经理","personId",be],["专业监理工程师","personId",be],["安全监理工程师","personId",be],["总监理工程师","personId",be]]),Se("sjdw","设计单位","参建单位",[["设计单位","personId",be]]),Se("zjzxdw","造价咨询单位","参建单位",[["专业造价工程师","personId",be],["造价咨询单位负责人","personId",be]]),Se("dbgdw","代保管单位","参建单位",[["代保管单位负责人","personId",be]]),Se("gcb","工程部","建设单位部门",[["工程部专业工程师","personId",be],["工程部部门负责人","personId",be]]),Se("azb","安质部","建设单位部门",[["安质部专业工程师","personId",be],["安质部部门负责人","personId",be]]),Se("jhb","计划部","建设单位部门",[["计划部专业工程师","personId",be],["计划部部门负责人","personId",be]]),Se("wzb","物资部","建设单位部门",[["物资部专业工程师","personId",be],["物资部负责人","personId",be]]),Se("jsdw","建设单位","建设单位部门",[["建设单位负责人","personId",be]])],Dn={opinionSuffix:"_yj",nameSuffix:"_name",dateSuffix:"_date",fallbackToFullPinyin:!0,tablePrefix:"tud_",dialect:"postgresql",maxIdentifierLength:null},$s=[{english:"_id",chinese:"_id",role:"text",override:{type:"VARCHAR",length:200}},{english:"specialty",chinese:"专业",role:"text"},{english:"unit",chinese:"机组",role:"text"},{english:"project_name",chinese:"工程名称",role:"text",override:{type:"VARCHAR",length:200}},{english:"number",chinese:"编号",role:"text"},{english:"bdh",chinese:"表单号",role:"text"},{english:"zhi",chinese:"致",role:"text"},{english:"qcdw",chinese:"起草单位",role:"text",override:{type:"VARCHAR",length:100}},{english:"organization_name",chinese:"单位名称",role:"text",override:{type:"VARCHAR",length:100}},{english:"company_code",chinese:"单位代码",role:"text",override:{type:"VARCHAR",length:100}},{english:"contract_name",chinese:"合同名称",role:"text",override:{type:"VARCHAR",length:100}},{english:"contract_number",chinese:"合同编号",role:"text",override:{type:"VARCHAR",length:100}}],Hs=[{english:"fdd_dzqz_file_id",chinese:"签章文件id",role:"text"},{english:"fdd_dzqz_status",chinese:"签章状态",role:"text"},{english:"flow_instance_id",chinese:"流程实例ID",role:"text"},{english:"flow_id",chinese:"流程编号",role:"text"},{english:"flow_startflag",chinese:"流程状态",role:"text"},{english:"flow_bizstate",chinese:"流程业务状态",role:"text"}],qs=[{english:"specialty",chinese:"专业",role:"text"},{english:"unit",chinese:"机组",role:"text"},{english:"project_name",chinese:"工程名称",role:"text",override:{type:"VARCHAR",length:200}},{english:"number",chinese:"编号",role:"text"},{english:"bdh",chinese:"表单号",role:"text"},{english:"zhi",chinese:"致",role:"text"},{english:"qcdw",chinese:"起草单位",role:"text",override:{type:"VARCHAR",length:50}},{english:"organization_name",chinese:"单位名称",role:"text",override:{type:"VARCHAR",length:200}},{english:"company_code",chinese:"单位代码",role:"text",override:{type:"VARCHAR",length:50}},{english:"contract_name",chinese:"合同名称",role:"text",override:{type:"VARCHAR",length:50}},{english:"contract_number",chinese:"合同编号",role:"text",override:{type:"VARCHAR",length:50}}],On=[{english:"ay_serial",chinese:"序号",role:"serial"},{english:"zb_id",chinese:"主表_id",role:"foreignKey"}],dn=[{id:"standard",label:"标准版本",config:{schemaVersion:Ln,naming:{...Dn},roleDefaults:Ps,nodes:Vs,baseFieldsStart:qs,baseFieldsEnd:[],subTableFields:On,translationDict:{设计单位:"sjdb"},personTemplate:js}},{id:"nanchong",label:"南充版本",config:{schemaVersion:Ln,naming:{...Dn},roleDefaults:Bs,nodes:Us,baseFieldsStart:$s,baseFieldsEnd:Hs,subTableFields:On,translationDict:{},personTemplate:Ms}}],Ws=dn[0].id,en=Object.fromEntries(dn.map(e=>[e.id,e.config])),dr=Ws,cn=ye(dr);function Gs(e){e in en&&(cn.value=e)}const ze=ge(()=>en[cn.value]??en[dr]),Qs=ge(()=>dn.map(e=>({value:e.id,label:e.label}))),Zs={postgresql:63,mysql:64,dameng:128},yt=new Set(["TEXT","DATE","DATETIME","TIMESTAMP","INT","BIGINT"]),wt=new Set(["DECIMAL"]);function ct(e){return e.trim().replace(/\s+/g,"").replace(/[:：，。；！？、（）()【】\[\]"'`]/g,"")}function xt(e){let n=e.toLowerCase().replace(/[^a-z0-9_]/g,"_");return n=n.replace(/_+/g,"_").replace(/^_+|_+$/g,""),/^\d/.test(n)&&(n=`f_${n}`),n}function Dt(e){const n=ct(e);if(!n)return"";try{const t=Qn(n,{pattern:"first",toneType:"none",type:"string"});return xt(String(t).replace(/\s+/g,""))}catch{return xt(n)}}function zn(e){const n=ct(e);if(!n)return"";try{const t=Qn(n,{toneType:"none",type:"string"});return xt(String(t).replace(/\s+/g,""))}catch{return xt(n)}}function cr(e){return e.maxIdentifierLength??Zs[e.dialect]}function nt(e,n,t,c,l=[]){const a=[],r=ct(e),o=cr(t),u=s=>n.has(s)||l.some(b=>n.has(s+b)),h=s=>l.reduce((b,g)=>Math.max(b,s.length+g.length),s.length),p=c[r];if(p){const s=xt(p);if(u(s))a.push(`词典映射「${r} → ${s}」与已有字段冲突，已改用拼音`);else return h(s)>o&&a.push(`超出 ${o} 字符上限（当前 ${h(s)}）`),{name:s,warnings:a}}const f=Dt(r);if(f&&!u(f)&&h(f)<=o)return{name:f,warnings:a};if(t.fallbackToFullPinyin){const s=zn(r);if(s&&!u(s)){if(h(s)<=o)return f&&u(f)&&a.push(`首字母 ${f} 已被占用，降级为全拼`),{name:s,warnings:a};const b=o-Math.max(0,...l.map(y=>y.length),0),g=s.slice(0,b).replace(/_+$/,"");if(g&&!u(g))return a.push(`全拼 ${s.length} 字符超出上限，已截断为 ${g}`),{name:g,warnings:a}}}const d=f||zn(r)||"field";if(!u(d)&&h(d)<=o)return{name:d,warnings:a};for(let s=2;s<100;s++){const b=o-String(s).length-1-Math.max(0,...l.map(y=>y.length),0),g=`${d.slice(0,Math.max(1,b))}_${s}`;if(!u(g))return a.push(`名称冲突，已追加序号后缀 ${g}（建议手动改成有语义的名字）`),{name:g,warnings:a}}return a.push("无法生成唯一字段名，请手动指定"),{name:`${d}_x`,warnings:a}}function Ks(e,n){const t=Dt(e)||"custom_table";return`${n.tablePrefix}${t}`}function Xs(e){const n={...e};return yt.has(n.type)?n.length=null:(n.length==null||n.length<=0)&&(n.length=50),wt.has(n.type)?(n.scale==null||n.scale<0)&&(n.scale=2):n.scale=null,n}function Ys(e,n,t){const c=e.roleDefaults[n]??e.roleDefaults.text;return Xs({...c,...t??{}})}function Me(e,n){const t=Ys(e.config,n.role,n.override),c=(n.warnings??[]).map(l=>({level:"warn",message:l}));n.english.length>e.max&&c.push({level:"error",message:`字段名 ${n.english.length} 字符，超出上限 ${e.max}，导入数据库会失败`}),e.used.has(n.english)&&c.push({level:"error",message:`字段名重复：${n.english}`}),e.used.add(n.english),e.out.push({key:`${n.origin}::${n.english}::${e.seq++}`,english:n.english,chinese:n.chinese,type:t.type,length:t.length,scale:t.scale,nullable:t.nullable,defaultValue:t.defaultValue,comment:t.comment,role:n.role,origin:n.origin,originLabel:n.originLabel,touched:[],warnings:c})}function $t(e,n,t){for(const c of n){const l=[];let a=c.english.trim();if(a){if(e.used.has(a)){let r=2;for(;e.used.has(`${a}_${r}`);)r++;l.push(`固定字段 ${a} 与前面的字段重名，已改为 ${a}_${r}，请检查配置`),a=`${a}_${r}`}Me(e,{english:a,chinese:c.chinese,role:c.role,override:c.override,origin:"system",originLabel:t,warnings:l})}}}function Js(e,n){e.config.personTemplate.forEach((t,c)=>{Me(e,{english:n.base+t.suffix,chinese:n.chinese+t.label,role:t.role,override:{...n.override??{},...t.override??{}},origin:n.origin,originLabel:n.originLabel,warnings:c===0?n.warnings:[]})})}function ei(e,n){const{naming:t}=e.config;n.withOpinion&&Me(e,{english:n.base+t.opinionSuffix,chinese:n.chinese+"意见",role:"opinion",override:n.opinionOverride,origin:n.origin,originLabel:n.originLabel}),Me(e,{english:n.base,chinese:n.chinese,role:"personId",override:n.idOverride,origin:n.origin,originLabel:n.originLabel,warnings:n.warnings}),Me(e,{english:n.base+t.nameSuffix,chinese:n.chinese+"姓名",role:"personName",override:n.nameOverride,origin:n.origin,originLabel:n.originLabel}),Me(e,{english:n.base+"_sign",chinese:n.chinese+"签字",role:"text",override:{type:"TEXT",length:null},origin:n.origin,originLabel:n.originLabel}),n.withDate&&Me(e,{english:n.base+t.dateSuffix,chinese:n.chinese+"日期",role:"date",origin:n.origin,originLabel:n.originLabel})}function ti(e,n){const{naming:t,translationDict:c}=e.config,l=[],a=[];for(const r of n.fields){const o=ct(r.name);if(!o)continue;const u=r.isPerson?e.config.personTemplate.map(d=>d.suffix):[],h=new Set([...e.used,...e.reserved]),{name:p,warnings:f}=nt(o,h,t,c,u);if(r.isPerson){e.reserved.add(p);for(const d of e.config.personTemplate)e.reserved.add(p+d.suffix);a.push(()=>Js(e,{base:p,chinese:r.name,origin:`node:${n.id}`,originLabel:n.name,warnings:f,override:r.override}))}else e.reserved.add(p),l.push(()=>Me(e,{english:p,chinese:r.name,role:r.role,override:r.override,origin:`node:${n.id}`,originLabel:n.name,warnings:f}))}for(const r of l)r();for(const r of a)r()}function ni(e,n){const{naming:t,translationDict:c}=e.config,l=[],a=[];for(const r of n){const o=ct(r.chineseName);if(!o)continue;const u=r.hasDate&&r.type!=="DATE"&&r.type!=="DATETIME"&&r.type!=="TIMESTAMP",h=[];r.isPerson&&h.push(t.nameSuffix),r.hasOpinion&&h.push(t.opinionSuffix),u&&h.push(t.dateSuffix);let p,f=[];const d=new Set([...e.used,...e.reserved]);if(r.englishName.trim())p=r.englishName.trim().toLowerCase(),d.has(p)&&f.push(`手填英文名 ${p} 已被占用`);else{const g=nt(o,d,t,c,h);p=g.name,f=g.warnings}e.reserved.add(p);for(const g of h)e.reserved.add(p+g);const s=`custom:${r.uid}`,b={type:r.type,length:r.length,scale:r.scale};r.isPerson?a.push(()=>ei(e,{base:p,chinese:r.chineseName,origin:s,originLabel:"自定义",warnings:f,nameOverride:b,withOpinion:r.hasOpinion,withDate:u})):l.push(()=>{Me(e,{english:p,chinese:r.chineseName,role:r.type==="DECIMAL"?"amount":r.type==="DATE"?"date":"text",override:b,origin:s,originLabel:"自定义",warnings:f}),r.hasOpinion&&Me(e,{english:p+t.opinionSuffix,chinese:r.chineseName+"意见",role:"opinion",origin:s,originLabel:"自定义"}),u&&Me(e,{english:p+t.dateSuffix,chinese:r.chineseName+"日期",role:"date",origin:s,originLabel:"自定义"})})}for(const r of l)r();for(const r of a)r()}function ri(e){const{config:n,tableMode:t,selectedNodeIds:c,customFields:l}=e,a={config:n,used:new Set,reserved:new Set,out:[],max:cr(n.naming),seq:0};if(t==="main"?$t(a,n.baseFieldsStart,"基础字段"):$t(a,n.subTableFields,"子表字段"),ni(a,l),t==="main"){const r=new Set(c);for(const o of n.nodes)r.has(o.id)&&ti(a,o);$t(a,n.baseFieldsEnd,"基础字段")}return a.out}function ai(){return{tableMode:"main",tableChineseName:"",dataLinkName:"",tableComment:"",englishTableName:"",selectedNodeIds:[],customFields:[],edits:{},manualOrder:[]}}const me=Vn(ai()),tn=ye(new Set);let si=0;function ii(){return`cf${Date.now().toString(36)}${(si++).toString(36)}`}function nn(e){const n={uid:ii(),chineseName:"",englishName:"",type:"VARCHAR",length:50,scale:null,isPerson:!1,hasDate:!1,hasOpinion:!1,...e};return me.customFields.push(n),n}function oi(e){const n=me.customFields.findIndex(t=>t.uid===e);n>=0&&me.customFields.splice(n,1)}function li(){me.customFields=[];const e=new Set(We.value.map(n=>n.english));for(const n of Object.keys(me.edits))e.has(n)||delete me.edits[n]}const Fn={input:{type:"VARCHAR",length:50},textarea:{type:"TEXT",length:null},date:{type:"DATE",length:null},checkbox:{type:"VARCHAR",length:50},select:{type:"VARCHAR",length:50},radio:{type:"VARCHAR",length:50}};function ui(e){const n=new Set(me.customFields.map(l=>l.englishName)),t=new Set([...ze.value.baseFieldsStart.map(l=>l.english),...ze.value.baseFieldsEnd.map(l=>l.english)]),c=[];for(const l of e){if(n.has(l.english)||t.has(l.english))continue;const a=Fn[l.type]??Fn.input,r=nn({chineseName:l.label,englishName:l.english,type:a.type,length:a.length,scale:null,isPerson:l.english.endsWith("_name"),hasDate:/_(rq|date)$/.test(l.english),hasOpinion:/_yj$/.test(l.english)});n.add(r.englishName),c.push(r.englishName)}if(!n.has("bz")&&!t.has("bz")){const l=nn({chineseName:"备注",englishName:"bz",type:"TEXT",length:null,scale:null,isPerson:!1,hasDate:!1,hasOpinion:!1});c.push(l.englishName)}return c}function di(e){const n=me.selectedNodeIds.indexOf(e);n>=0?me.selectedNodeIds.splice(n,1):me.selectedNodeIds.push(e)}function ci(e){me.tableMode!==e&&(me.tableMode=e,e==="sub"&&(me.selectedNodeIds=[]),me.manualOrder=[])}const We=ge(()=>{const n=ri({config:ze.value,tableMode:me.tableMode,selectedNodeIds:me.selectedNodeIds,customFields:me.customFields}).map(h=>{const p=me.edits[h.english];if(!p)return h;const f=Object.keys(p);return{...h,...p,touched:f}});if(!me.manualOrder.length)return n;const t=new Map(me.manualOrder.map((h,p)=>[h,p])),c=[],l=[],a=[];let r=!1;for(const h of n)h.origin==="system"?r?l.push(h):c.push(h):(r=!0,a.push(h));const o=a.filter(h=>t.has(h.english)),u=a.filter(h=>!t.has(h.english));return o.sort((h,p)=>(t.get(h.english)??0)-(t.get(p.english)??0)),[...c,...o,...u,...l]}),rn=ge(()=>{const e=me.englishTableName.trim();return e||Ks(me.tableChineseName,ze.value.naming)}),et=ge(()=>{let e=0,n=0;for(const t of We.value)for(const c of t.warnings)c.level==="error"?e++:n++;return{errors:e,warns:n}});function Qe(e,n){me.edits[e]={...me.edits[e]??{},...n}}function fi(e){delete me.edits[e]}function hi(e){me.manualOrder=e}function pi(){me.manualOrder=[]}function fr(e){tn.value=new Set(e),window.setTimeout(()=>{tn.value=new Set},2400)}const hr=["VARCHAR","CHAR","TEXT","INT","BIGINT","DECIMAL","DATE","DATETIME","TIMESTAMP"];typeof window<"u"&&Object.defineProperty(window,"__builder",{get:()=>({fields:We.value,problemCount:et.value,fullTableName:rn.value,session:me,nodeIds:ze.value.nodes.map(e=>e.id),setNodes:e=>{me.selectedNodeIds=e}})});const mi={style:{display:"flex","flex-direction":"column",flex:"1","min-height":"0"}},gi={class:"panel-head"},bi={key:0,style:{padding:"12px 4px"}},_i={key:1,class:"scroll-y",style:{flex:"1","min-height":"0","padding-right":"4px"}},vi={style:{"font-size":"13px","font-weight":"500"}},yi={style:{display:"flex","flex-direction":"column",gap:"4px"}},wi=["onClick"],xi={class:"node-main"},ki={class:"node-name"},Ei={key:0,class:"node-people"},Ai=Fe({__name:"NodePanel",props:{disabled:{type:Boolean}},setup(e){const n=e,t=ge(()=>{const u=new Map;for(const h of ze.value.nodes){const p=u.get(h.group)??[];p.push(h),u.set(h.group,p)}return[...u.entries()].map(([h,p])=>({name:h,nodes:p}))}),c=ge(()=>new Set(me.selectedNodeIds));function l(u){return u.filter(h=>c.value.has(h.id)).length}function a(u){return u.fields.filter(h=>h.isPerson).map(h=>h.name)}function r(){me.selectedNodeIds=ze.value.nodes.map(u=>u.id)}function o(){me.selectedNodeIds=[]}return(u,h)=>(K(),re("div",mi,[D("div",gi,[h[2]||(h[2]=D("span",{class:"panel-title"},"审批节点",-1)),O(me).selectedNodeIds.length?(K(),Te(O(Nr),{key:0,value:O(me).selectedNodeIds.length,type:"success"},null,8,["value"])):Ae("",!0),h[3]||(h[3]=D("div",{style:{flex:"1"}},null,-1)),X(O(qn),{size:2},{default:ne(()=>[X(O(Ee),{size:"tiny",quaternary:"",disabled:n.disabled,onClick:r},{default:ne(()=>[...h[0]||(h[0]=[de("全选",-1)])]),_:1},8,["disabled"]),X(O(Ee),{size:"tiny",quaternary:"",disabled:n.disabled||!O(me).selectedNodeIds.length,onClick:o},{default:ne(()=>[...h[1]||(h[1]=[de(" 清空 ",-1)])]),_:1},8,["disabled"])]),_:1})]),n.disabled?(K(),re("div",bi,[X(O(Lr),{size:"small",description:"子表不涉及审批节点，只需添加字段"})])):(K(),re("div",_i,[X(O(Dr),{"default-expanded-names":t.value.map(p=>p.name)},{default:ne(()=>[(K(!0),re(Ne,null,De(t.value,p=>(K(),Te(O(Or),{key:p.name,name:p.name},{header:ne(()=>[D("span",vi,ue(p.name),1),l(p.nodes)?(K(),Te(O(je),{key:0,size:"tiny",type:"success",bordered:!1,style:{"margin-left":"6px"}},{default:ne(()=>[de(ue(l(p.nodes))+"/"+ue(p.nodes.length),1)]),_:2},1024)):Ae("",!0)]),default:ne(()=>[D("div",yi,[(K(!0),re(Ne,null,De(p.nodes,f=>(K(),re("button",{key:f.id,type:"button",class:Pe(["node-row",{"node-row--on":c.value.has(f.id)}]),onClick:d=>O(di)(f.id)},[h[4]||(h[4]=D("span",{class:"node-rail","aria-hidden":"true"},null,-1)),D("span",xi,[D("span",ki,ue(f.name),1),a(f).length?(K(),re("span",Ei,ue(a(f).join("、")),1)):Ae("",!0)])],10,wi))),128))])]),_:2},1032,["name"]))),128))]),_:1},8,["default-expanded-names"])]))]))}}),Si=$e(Ai,[["__scopeId","data-v-2742ea34"]]),Ii={style:{display:"flex","flex-direction":"column",flex:"1","min-height":"0",gap:"10px"}},Ci={style:{display:"flex","flex-direction":"column",gap:"6px",padding:"2px"}},Ti={style:{"font-size":"13px"}},Ri={style:{"font-size":"13px"}},Ni={key:0,class:"preview-box mono"},Li={key:1,style:{display:"flex","flex-direction":"column","min-height":"0",flex:"1"}},Di={class:"muted",style:{"font-size":"13px",padding:"6px 2px",display:"flex","align-items":"center","justify-content":"space-between"}},Oi={class:"scroll-y",style:{flex:"1","min-height":"0",display:"flex","flex-direction":"column",gap:"4px"}},zi={style:{flex:"1","min-width":"0"}},Fi={style:{"font-size":"13px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},Bi={class:"muted",style:{"font-size":"11px"}},Pi=Fe({__name:"QuickAdd",setup(e){const n=kt(),t=ye({chineseName:"",englishName:"",type:"VARCHAR",length:50,scale:null,isPerson:!1,hasDate:!1,hasOpinion:!1}),c=hr.map(f=>({label:f,value:f})),l=ge(()=>!yt.has(t.value.type)),a=ge(()=>wt.has(t.value.type)),r=ge(()=>{const f=ct(t.value.chineseName);if(!f)return[];const d=t.value.englishName.trim()||Dt(f)||"field",{opinionSuffix:s,nameSuffix:b,dateSuffix:g}=ze.value.naming,y=[],_=t.value.hasDate&&!["DATE","DATETIME","TIMESTAMP"].includes(t.value.type);return t.value.isPerson?(t.value.hasOpinion&&y.push(d+s),y.push(d),y.push(d+b),_&&y.push(d+g)):(y.push(d),t.value.hasOpinion&&y.push(d+s),_&&y.push(d+g)),y});function o(f){t.value.type=f,yt.has(f)?t.value.length=null:t.value.length==null&&(t.value.length=50),wt.has(f)?(t.value.scale==null&&(t.value.scale=2),t.value.length==null&&(t.value.length=18)):t.value.scale=null}function u(){if(!t.value.chineseName.trim()){n.warning("请填写中文名称");return}nn({...t.value}),fr(r.value),n.success(`已添加 ${r.value.length} 个字段`),t.value={chineseName:"",englishName:"",type:t.value.type,length:t.value.length,scale:t.value.scale,isPerson:!1,hasDate:!1,hasOpinion:!1}}function h(f){const d=/(姓名|人员|签字|签名|经理|负责人|经办|填报|审核人|批准人|总监|代表|联系人|经办人|申报人|代理人)/.test(f),s=/(意见|审核|审批|批准|结论|会签|签署)/.test(f),b=/(日期|时间|年月日|签收|签定|签订)/.test(f);d?(t.value.isPerson=!0,t.value.hasOpinion=!0,t.value.hasDate=!0):(t.value.isPerson=!1,t.value.hasOpinion=s,t.value.hasDate=b)}on(()=>t.value.chineseName,f=>{f&&f.trim()&&h(f.trim())});function p(f){const d=[f.type];return f.length!=null&&d.push(f.scale!=null?`${f.length},${f.scale}`:String(f.length)),f.isPerson&&d.push("人员"),f.hasOpinion&&d.push("意见"),f.hasDate&&d.push("日期"),d.join(" · ")}return(f,d)=>(K(),re("div",Ii,[d[12]||(d[12]=D("div",{class:"panel-head"},[D("span",{class:"panel-title"},"快速添加字段")],-1)),X(O(Le),{value:t.value.chineseName,"onUpdate:value":d[0]||(d[0]=s=>t.value.chineseName=s),placeholder:"中文名称，如：审批人",size:"small",clearable:"",onKeyup:zr(u,["enter"])},null,8,["value"]),X(O(Wn),{trigger:"hover",placement:"right"},{trigger:ne(()=>[X(O(Le),{value:t.value.englishName,"onUpdate:value":d[1]||(d[1]=s=>t.value.englishName=s),placeholder:"英文名（留空自动生成拼音）",size:"small",clearable:""},null,8,["value"])]),default:ne(()=>[d[7]||(d[7]=de(" 留空则按拼音首字母生成，撞名自动降级为全拼 ",-1))]),_:1}),X(O(at),{value:t.value.type,options:O(c),size:"small","onUpdate:value":o},null,8,["value","options"]),X(O(qn),{size:6,wrap:!1},{default:ne(()=>[l.value?(K(),Te(O(lt),{key:0,value:t.value.length,"onUpdate:value":d[2]||(d[2]=s=>t.value.length=s),size:"small",min:1,max:65535,placeholder:"长度",style:{flex:"1"}},null,8,["value"])):Ae("",!0),a.value?(K(),Te(O(lt),{key:1,value:t.value.scale,"onUpdate:value":d[3]||(d[3]=s=>t.value.scale=s),size:"small",min:0,max:30,placeholder:"小数位",style:{width:"92px"}},null,8,["value"])):Ae("",!0)]),_:1}),D("div",Ci,[X(O(zt),{checked:t.value.isPerson,"onUpdate:checked":d[4]||(d[4]=s=>t.value.isPerson=s),size:"small"},{default:ne(()=>[...d[8]||(d[8]=[D("span",{style:{"font-size":"13px"}},"人员字段（展开 ID + 姓名）",-1)])]),_:1},8,["checked"]),X(O(zt),{checked:t.value.hasOpinion,"onUpdate:checked":d[5]||(d[5]=s=>t.value.hasOpinion=s),size:"small"},{default:ne(()=>[D("span",Ti,"附带意见（"+ue(O(ze).naming.opinionSuffix)+"）",1)]),_:1},8,["checked"]),X(O(zt),{checked:t.value.hasDate,"onUpdate:checked":d[6]||(d[6]=s=>t.value.hasDate=s),size:"small"},{default:ne(()=>[D("span",Ri,"附带日期（"+ue(O(ze).naming.dateSuffix)+"）",1)]),_:1},8,["checked"])]),r.value.length?(K(),re("div",Ni,[(K(!0),re(Ne,null,De(r.value,s=>(K(),re("div",{key:s},ue(s),1))),128))])):Ae("",!0),X(O(Ee),{type:"primary",size:"small",block:"",onClick:u},{default:ne(()=>[de(" 添加（"+ue(r.value.length||0)+" 个字段） ",1)]),_:1}),O(me).customFields.length?(K(),re("div",Li,[D("div",Di,[D("span",null,"已添加 "+ue(O(me).customFields.length)+" 组",1),X(O(Fr),{onPositiveClick:O(li)},{trigger:ne(()=>[X(O(Ee),{size:"tiny",type:"error",quaternary:""},{default:ne(()=>[...d[9]||(d[9]=[de("清空",-1)])]),_:1})]),default:ne(()=>[d[10]||(d[10]=de(" 将移除全部手动添加的字段（不影响审批节点生成的字段），确定吗？ ",-1))]),_:1},8,["onPositiveClick"])]),D("div",Oi,[(K(!0),re(Ne,null,De(O(me).customFields,s=>(K(),re("div",{key:s.uid,class:"hoverable added-row",style:{display:"flex","align-items":"center",gap:"6px",padding:"6px 8px","border-radius":"var(--r-sm)"}},[D("div",zi,[D("div",Fi,ue(s.chineseName),1),D("div",Bi,ue(p(s)),1)]),X(O(Ee),{size:"tiny",quaternary:"",type:"error",onClick:b=>O(oi)(s.uid)},{default:ne(()=>[...d[11]||(d[11]=[de("删除",-1)])]),_:1},8,["onClick"])]))),128))])])):Ae("",!0)]))}}),Mi=$e(Pi,[["__scopeId","data-v-45047b98"]]),ji={style:{display:"flex","flex-direction":"column",flex:"1","min-height":"0","min-width":"0",overflow:"hidden"}},Ui={class:"panel-head"},Vi={key:0,class:"scroll-y field-grid",style:{flex:"1",border:"1px solid var(--border)","border-radius":"var(--r-md)"}},$i=["onDragover","onDrop"],Hi=["onDragstart"],qi={style:{padding:"2px 4px","min-width":"0"}},Wi={style:{padding:"2px 4px","min-width":"0"}},Gi={style:{padding:"2px 4px"}},Qi={style:{padding:"2px 4px"}},Zi={key:1,class:"muted",style:{opacity:"0.3","padding-left":"6px"}},Ki={style:{padding:"2px 4px"}},Xi={key:1,class:"muted",style:{opacity:"0.3","padding-left":"6px"}},Yi={style:{padding:"2px 8px"}},Ji={style:{padding:"2px 4px"}},eo={style:{padding:"2px 4px","min-width":"0"}},to={style:{padding:"4px 8px","min-width":"0",display:"flex","align-items":"center",gap:"6px"}},no={style:{"max-width":"280px","font-size":"13px","line-height":"1.6"}},ro={key:0,class:"empty-hint"},ao={key:1,class:"scroll-y",style:{flex:"1","min-height":"0",display:"flex","flex-direction":"column",padding:"4px"}},so={style:{display:"flex","justify-content":"flex-end",padding:"4px 2px"}},io={class:"md-box mono"},oo=Fe({__name:"FieldTable",setup(e){const n=kt(),t=ye("table"),c=ge(()=>{const I=N=>N.replace(/\t/g," ").replace(/[\r\n]+/g," "),x=["字段名称","中文名称","类型","长度","小数位","允许空","默认值","备注","来源"],T=h.value.map(N=>[N.english,N.chinese,N.type,N.length==null?"":String(N.length),N.scale==null?"":String(N.scale),N.nullable?"是":"否",N.defaultValue??"",N.comment??"",N.originLabel].map(P=>I(String(P))).join("	"));return[x.join("	"),...T].join(`
`)});async function l(){try{await navigator.clipboard.writeText(c.value),n.success("已复制，直接 Ctrl+V 粘贴到 Excel / WPS / 飞书表格即可按列展开")}catch{n.error("复制失败（浏览器禁用了剪贴板），请手动选中下方文本复制")}}const a=hr.map(I=>({label:I,value:I})),r=ye(null),o=ye(null),u=ye(""),h=ge(()=>{const I=u.value.trim().toLowerCase();return We.value.filter(x=>x.origin==="system"?!1:I?x.english.toLowerCase().includes(I)||x.chinese.toLowerCase().includes(I):!0)}),p=ge(()=>me.manualOrder.length>0);function f(I,x){if(u.value.trim()){n.warning("筛选状态下不能拖拽排序，请先清空筛选"),x.preventDefault();return}r.value=I;const T=x.currentTarget.closest(".ft-row");T&&x.dataTransfer&&(x.dataTransfer.effectAllowed="move",x.dataTransfer.setDragImage(T,0,0))}function d(I,x){x.preventDefault(),o.value=I}function s(I){const x=r.value;if(r.value=null,o.value=null,x==null||x===I)return;const T=h.value.map(P=>P.english),[N]=T.splice(x,1);N!==void 0&&(T.splice(I,0,N),hi(T))}function b(){r.value=null,o.value=null}function g(I){return!yt.has(I)}function y(I){return wt.has(I)}function _(I,x){const T={type:x};yt.has(x)?T.length=null:I.length==null&&(T.length=50),wt.has(x)?(T.scale=I.scale??2,I.length==null&&(T.length=18)):T.scale=null,Qe(I.english,T)}function v(I,x){const T=x.trim().toLowerCase();!T||T===I.english||(Qe(I.english,{english:T}),n.success(`已改为 ${T}`))}function w(I){return I.warnings.some(x=>x.level==="error")?"row-error":I.warnings.length?"row-warn":""}const A=[{key:"seq",label:"#",width:"44px"},{key:"english",label:"字段名称",width:"minmax(170px, 1.1fr)"},{key:"chinese",label:"中文名称",width:"minmax(240px, 2fr)"},{key:"type",label:"类型",width:"116px"},{key:"length",label:"长度",width:"84px"},{key:"scale",label:"小数位",width:"78px"},{key:"nullable",label:"null",width:"58px"},{key:"default",label:"默认值",width:"90px"},{key:"comment",label:"备注",width:"minmax(90px, 0.8fr)"},{key:"origin",label:"来源",width:"108px"}],C=ge(()=>A.map(I=>I.width).join(" "));return(I,x)=>(K(),re("div",ji,[D("div",Ui,[x[6]||(x[6]=D("span",{class:"panel-title"},"字段定义",-1)),X(O(je),{size:"tiny",bordered:!1},{default:ne(()=>[de(ue(O(We).length)+" 个",1)]),_:1}),p.value?(K(),Te(O(je),{key:0,size:"tiny",type:"info",bordered:!1},{default:ne(()=>[...x[2]||(x[2]=[de("已手动排序",-1)])]),_:1})):Ae("",!0),p.value?(K(),Te(O(Ee),{key:1,size:"tiny",quaternary:"",onClick:O(pi)},{default:ne(()=>[...x[3]||(x[3]=[de(" 恢复默认顺序 ",-1)])]),_:1},8,["onClick"])):Ae("",!0),x[7]||(x[7]=D("div",{style:{flex:"1"}},null,-1)),X(O(Gn),{value:t.value,"onUpdate:value":x[0]||(x[0]=T=>t.value=T),size:"small"},{default:ne(()=>[X(O(Rt),{value:"table"},{default:ne(()=>[...x[4]||(x[4]=[de("表格",-1)])]),_:1}),X(O(Rt),{value:"excel"},{default:ne(()=>[...x[5]||(x[5]=[de("Excel",-1)])]),_:1})]),_:1},8,["value"]),X(O(Le),{value:u.value,"onUpdate:value":x[1]||(x[1]=T=>u.value=T),size:"tiny",placeholder:"筛选字段",clearable:"",style:{width:"150px"}},null,8,["value"])]),t.value==="table"?(K(),re("div",Vi,[D("div",{class:"grid-head",style:Ye({gridTemplateColumns:C.value})},[(K(),re(Ne,null,De(A,T=>D("div",{key:T.key,style:{padding:"8px 8px"}},ue(T.label),1)),64))],4),(K(!0),re(Ne,null,De(h.value,(T,N)=>(K(),re("div",{key:T.key,class:Pe(["ft-row hoverable",[w(T),{"row-flash":O(tn).has(T.english)}]]),style:Ye({gridTemplateColumns:C.value,opacity:r.value===N?.4:1,borderTop:o.value===N&&r.value!==null?"2px solid var(--success)":void 0}),onDragover:P=>d(N,P),onDrop:P=>s(N)},[D("div",{class:"drag-handle",draggable:"true",title:"拖拽排序",onDragstart:P=>f(N,P),onDragend:b,style:{padding:"4px 8px",opacity:"0.45",cursor:"grab","user-select":"none","touch-action":"none"}},ue(N+1),41,Hi),D("div",qi,[X(O(Le),{value:T.english,size:"tiny",class:"mono",status:T.warnings.some(P=>P.level==="error")?"error":void 0,onChange:P=>v(T,P)},null,8,["value","status","onChange"])]),D("div",Wi,[X(O(Le),{value:T.chinese,size:"tiny","onUpdate:value":P=>O(Qe)(T.english,{chinese:P})},null,8,["value","onUpdate:value"])]),D("div",Gi,[X(O(at),{value:T.type,options:O(a),size:"tiny","onUpdate:value":P=>_(T,P)},null,8,["value","options","onUpdate:value"])]),D("div",Qi,[g(T.type)?(K(),Te(O(lt),{key:0,value:T.length,size:"tiny",min:1,max:65535,"show-button":!1,"onUpdate:value":P=>O(Qe)(T.english,{length:P})},null,8,["value","onUpdate:value"])):(K(),re("span",Zi,"—"))]),D("div",Ki,[y(T.type)?(K(),Te(O(lt),{key:0,value:T.scale,size:"tiny",min:0,max:30,"show-button":!1,"onUpdate:value":P=>O(Qe)(T.english,{scale:P})},null,8,["value","onUpdate:value"])):(K(),re("span",Xi,"—"))]),D("div",Yi,[X(O(Br),{value:T.nullable,size:"small","onUpdate:value":P=>O(Qe)(T.english,{nullable:P})},null,8,["value","onUpdate:value"])]),D("div",Ji,[X(O(Le),{value:T.defaultValue,size:"tiny",placeholder:"—","onUpdate:value":P=>O(Qe)(T.english,{defaultValue:P})},null,8,["value","onUpdate:value"])]),D("div",eo,[X(O(Le),{value:T.comment,size:"tiny",placeholder:"—","onUpdate:value":P=>O(Qe)(T.english,{comment:P})},null,8,["value","onUpdate:value"])]),D("div",to,[T.warnings.length?(K(),Te(O(Pr),{key:0,trigger:"hover",placement:"left"},{trigger:ne(()=>[X(O(je),{size:"tiny",type:T.warnings.some(P=>P.level==="error")?"error":"warning",bordered:!1},{default:ne(()=>[de(ue(T.originLabel),1)]),_:2},1032,["type"])]),default:ne(()=>[D("div",no,[(K(!0),re(Ne,null,De(T.warnings,(P,se)=>(K(),re("div",{key:se},ue(P.message),1))),128))])]),_:2},1024)):(K(),Te(O(Wn),{key:1,trigger:"hover",placement:"left"},{trigger:ne(()=>[X(O(je),{size:"tiny",bordered:!1,style:{"max-width":"100%"}},{default:ne(()=>[de(ue(T.originLabel),1)]),_:2},1024)]),default:ne(()=>[de(" "+ue(T.origin),1)]),_:2},1024)),T.touched.length?(K(),Te(O(Ee),{key:2,size:"tiny",quaternary:"",title:"撤销对该行的修改",onClick:P=>O(fi)(T.english)},{default:ne(()=>[...x[8]||(x[8]=[de(" ↺ ",-1)])]),_:1},8,["onClick"])):Ae("",!0)])],46,$i))),128)),h.value.length?Ae("",!0):(K(),re("div",ro,ue(u.value?"没有匹配的字段":"勾选审批节点或添加自定义字段后，这里会显示生成结果"),1))])):(K(),re("div",ao,[D("div",so,[X(O(Ee),{size:"tiny",onClick:l},{default:ne(()=>[...x[9]||(x[9]=[de("复制（直接粘贴到 Excel）",-1)])]),_:1})]),D("pre",io,ue(c.value),1)]))]))}}),lo=$e(oo,[["__scopeId","data-v-f04fb276"]]),uo=["表名称","中文名称","数据链接名称","备注"],co=["顺序号","字段名称","中文名称","字段类型","字段长度","小数位数","是否允许null","默认值","备注"];function fo(e){const n=[[...uo],[e.tableName,e.tableChineseName||e.tableName,e.dataLinkName,e.tableComment]],t=[[...co]];return e.fields.forEach((c,l)=>{t.push([l+1,c.english,c.chinese,c.type,c.length??"",c.scale??"",c.nullable?"YES":"NO",c.defaultValue??"",c.comment??""])}),{table:n,field:t}}function ho(e){const{table:n,field:t}=fo(e),c=mt.book_new(),l=mt.aoa_to_sheet(n);l["!cols"]=[{wch:24},{wch:24},{wch:20},{wch:20}],mt.book_append_sheet(c,l,"表名称");const a=mt.aoa_to_sheet(t);a["!cols"]=[{wch:8},{wch:26},{wch:24},{wch:12},{wch:10},{wch:10},{wch:13},{wch:12},{wch:20}],mt.book_append_sheet(c,a,"字段信息");const r=`${e.tableName||"字段定义"}.xlsx`;return Zr(c,r),r}const po={style:{display:"flex","flex-direction":"column",flex:"1","min-height":"0",overflow:"hidden"}},mo={class:"toolbar",style:{display:"flex","align-items":"center",gap:"10px",padding:"8px 4px","flex-shrink":"0","flex-wrap":"wrap"}},go={class:"muted",style:{"font-size":"14px"}},bo=8,_o=Fe({__name:"index",setup(e){const n=kt(),t=ge(()=>me.tableMode==="sub"),c=ye(null),l=ye(null),a=[15,68,15],r=[70,30],o=[200,340,120],u=[340,180],h=ye([...a]),p=ye([...r]),f=ge(()=>t.value?p.value:h.value),d=ge(()=>t.value?u:o);function s(w){const A=f.value[w],C=t.value?w===0?40:180:w===0?40:w===1?110:180;return{flex:`${A} 1 0`,minWidth:`${d.value[w]}px`,animationDelay:`${C}ms`}}let b=null;function g(w,A){if(!c.value)return;A.preventDefault();const C=t.value?1:2,I=c.value.clientWidth-24-C*bo,x=f.value;b={idx:w,startX:A.clientX,wA0:x[w]/100*I,wB0:x[w+1]/100*I,avail:I},l.value=w,document.body.style.userSelect="none",document.body.style.cursor="col-resize",window.addEventListener("mousemove",y),window.addEventListener("mouseup",_)}function y(w){if(!b)return;const A=f.value,C=d.value[b.idx],I=d.value[b.idx+1];let x=w.clientX-b.startX;const T=C-b.wA0,N=b.wB0-I;x=Math.min(Math.max(x,T),N);const P=b.wA0+x,se=b.wB0-x;A[b.idx]=P/b.avail*100,A[b.idx+1]=se/b.avail*100}function _(){b&&(window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",_),document.body.style.userSelect="",document.body.style.cursor="",l.value=null,b=null)}Mr(()=>{b&&_()});function v(){if(!We.value.length){n.warning("还没有任何字段，先勾选审批节点或添加自定义字段");return}if(et.value.errors>0){n.error(`有 ${et.value.errors} 个字段存在错误，请先修正（表格中标红的行）`);return}try{const w=ho({tableName:rn.value,tableChineseName:me.tableChineseName,dataLinkName:me.dataLinkName,tableComment:me.tableComment,fields:We.value});n.success(`已导出 ${w}`)}catch(w){n.error(`导出失败：${w.message}`)}}return(w,A)=>(K(),re("div",po,[D("div",mo,[X(O(Gn),{value:O(me).tableMode,size:"small","onUpdate:value":A[0]||(A[0]=C=>O(ci)(C))},{default:ne(()=>[X(O(Rt),{value:"main"},{default:ne(()=>[...A[5]||(A[5]=[de("主表",-1)])]),_:1}),X(O(Rt),{value:"sub"},{default:ne(()=>[...A[6]||(A[6]=[de("子表",-1)])]),_:1})]),_:1},8,["value"]),X(O(at),{value:O(cn),options:O(Qs),size:"small",style:{width:"130px"},"consistent-menu-width":!1,"onUpdate:value":A[1]||(A[1]=C=>O(Gs)(C))},null,8,["value","options"]),X(O(Le),{value:O(me).tableChineseName,"onUpdate:value":A[2]||(A[2]=C=>O(me).tableChineseName=C),size:"small",placeholder:"请输入表名（中文）",style:{width:"190px"},clearable:""},null,8,["value"]),X(O(Le),{value:O(rn),size:"small",placeholder:"表名自动生成",style:{width:"230px"},disabled:!0,class:"mono"},null,8,["value"]),A[8]||(A[8]=D("div",{style:{flex:"1"}},null,-1)),O(et).errors?(K(),Te(O(je),{key:0,size:"small",type:"error",bordered:!1},{default:ne(()=>[de(ue(O(et).errors)+" 个错误 ",1)]),_:1})):O(et).warns?(K(),Te(O(je),{key:1,size:"small",type:"warning",bordered:!1},{default:ne(()=>[de(ue(O(et).warns)+" 个提示 ",1)]),_:1})):Ae("",!0),D("span",go,"共 "+ue(O(We).length)+" 个字段",1),X(O(Ee),{type:"primary",size:"small",disabled:!O(We).length,onClick:v},{default:ne(()=>[...A[7]||(A[7]=[de(" 导出 Excel ",-1)])]),_:1},8,["disabled"])]),D("div",{ref_key:"bodyRef",ref:c,class:"body"},[t.value?Ae("",!0):(K(),re("section",{key:0,class:"panel col rise-in",style:Ye(s(0))},[X(Si)],4)),t.value?Ae("",!0):(K(),re("div",{key:1,class:Pe(["splitter",{active:l.value===0}]),title:"拖拽调整宽度",onMousedown:A[3]||(A[3]=C=>g(0,C))},null,34)),D("section",{class:"panel col rise-in",style:Ye(s(t.value?0:1))},[X(lo)],4),D("div",{class:Pe(["splitter",{active:l.value===(t.value?0:1)}]),title:"拖拽调整宽度",onMousedown:A[4]||(A[4]=C=>g(t.value?0:1,C))},null,34),D("section",{class:"panel col rise-in",style:Ye(s(t.value?1:2))},[X(Mi)],4)],512)]))}}),vo=$e(_o,[["__scopeId","data-v-ba8d7470"]]),yo=/^(序号|编号|次序|顺序|行号|no\.?|no$|#|index)$/i;function an(e){return/意见|说明|备注|内容|描述|结论|审核|审批|签署意见/.test(e)?{type:"textarea",length:null}:/日期|时间|年月日|年\s*月/.test(e)?{type:"date",length:null}:/是否|有无|是\/否|同意否/.test(e)?{type:"checkbox",length:null}:/金额|费用|单价|总价|价款|造价|预算|工资|报价|结算/.test(e)?{type:"input",length:18}:/电话|手机|邮箱|email|邮编|传真/.test(e)?{type:"input",length:50}:/专业|工程师|代表|负责人|经理|总监|签字|姓名|人$/.test(e)?{type:"input",length:100}:{type:"input",length:50}}function wo(e){return/_yj$/.test(e)?{type:"textarea",length:null}:/(_date|_rq|rq$|date)/i.test(e)?{type:"date",length:null}:/_name$/.test(e)?{type:"input",length:100}:/^sfcwd$|_sf$|sfcw/.test(e)?{type:"radio",length:null}:e==="id"?{type:"input",length:32}:{type:"input",length:50}}function pr(e){return String(e||"").split(/[，,、；;\n\r]+/).map(n=>n.trim().replace(/^["'"]+|["'"]+$/g,"")).filter(n=>n.length>0)}const xo={class:"page"},ko={class:"wrap"},Eo={class:"batch"},Ao={class:"batch-head"},So={class:"tbl-head"},Io={class:"tbl-scroll"},Co={key:0,class:"ft"},To={class:"idx"},Ro={key:1,class:"empty"},No={key:0,class:"warn-list"},Lo={class:"out-head"},Do={class:"lbl"},Oo={class:"ops"},zo={key:0,class:"sql"},Fo=Fe({__name:"index",setup(e){const n=kt(),t=[{label:"VARCHAR",value:"VARCHAR"},{label:"INT",value:"INT"},{label:"TEXT",value:"TEXT"},{label:"DATE",value:"DATE"},{label:"BOOLEAN",value:"BOOLEAN"},{label:"DECIMAL",value:"DECIMAL"}],c=new Set(["TEXT","DATE","BOOLEAN","INT"]),l=ye(""),a=ye(""),r=ye([]),o=ye("");function u(){const I="0123456789abcdef";let x="";const T=new Uint8Array(32);if(typeof crypto<"u"&&crypto.getRandomValues){crypto.getRandomValues(T);for(let N=0;N<32;N++)x+=I[T[N]%16]}else for(let N=0;N<32;N++)x+=I[Math.floor(Math.random()*16)];return x}function h(){const I=new Date,x=(T,N=2)=>String(T).padStart(N,"0");return`${I.getFullYear()}-${x(I.getMonth()+1)}-${x(I.getDate())} ${x(I.getHours())}:${x(I.getMinutes())}:${x(I.getSeconds())}.${x(I.getMilliseconds(),3)}`}function p(I,x){switch(I){case"textarea":return{dbType:"TEXT",length:null};case"date":return{dbType:"DATE",length:null};case"checkbox":return{dbType:"BOOLEAN",length:null};case"select":case"radio":return{dbType:"VARCHAR",length:x??100};case"input":default:return{dbType:"VARCHAR",length:x??100}}}function f(I,x){switch(I){case"VARCHAR":return`varchar(${x??255})`;case"INT":return"integer";case"TEXT":return"text";case"DATE":return"date";case"BOOLEAN":return"boolean";case"DECIMAL":return"numeric(18,2)";default:return"varchar(255)"}}function d(I){return c.has(I)}function s(){if(!r.value.length)return 50;const I=Math.max(...r.value.map(x=>x.sort));return Math.max(I,49)+1}function b(){const I=pr(a.value);if(!I.length){n.warning("请输入至少一个字段");return}const x=new Set,T=l.value.trim()||"tud_table";let N=s();const P=I.map(se=>{const S=nt(se,x,ze.value.naming,ze.value.translationDict,["_name","_yj","_date"]);x.add(S.name);const j=an(se),m=p(j.type,j.length);return{tableName:T,fieldName:S.name,fieldDesc:se,dbType:m.dbType,length:m.length,sort:N++,id:u(),warn:S.warnings.join("；")}});r.value=P,o.value=h(),n.success(`已解析 ${P.length} 个字段，可在表格内修改后再生成 SQL`)}function g(){r.value.push({tableName:l.value.trim()||"tud_table",fieldName:"",fieldDesc:"",dbType:"VARCHAR",length:255,sort:s(),id:u(),warn:""}),o.value=o.value||h()}function y(I){r.value.splice(I,1)}function _(){o.value=h(),r.value.forEach(I=>I.id=u()),n.info("已重新生成 主键ID 与 当前时间")}const v=ge(()=>r.value.filter(I=>I.warn)),w=ge(()=>{if(!r.value.length||!o.value)return"";const I=o.value;return r.value.map(x=>{const T=x.length!=null?x.length:"NULL";return`INSERT INTO "dy_table_field" VALUES (
  '${x.id}', (select id from dy_table where name = '${x.tableName}'),
  '${x.fieldName}',
  '${x.fieldDesc}',
  '${x.dbType}', ${T}, NULL, 1, NULL,
  ${x.sort},
  NULL, '${I}', '857c179f6afb2920cafe02f9891d6476', '${I}', '857c179f6afb2920cafe02f9891d6476', FALSE);

ALTER TABLE "${x.tableName}" ADD COLUMN "${x.fieldName}" ${f(x.dbType,x.length)};
COMMENT ON COLUMN "${x.tableName}"."${x.fieldName}" IS '${x.fieldDesc}';`}).join(`

`)}),A=ge(()=>!r.value.length);on(()=>r.value.length,()=>{o.value||(o.value=h())}),Hn(()=>{o.value=h()});async function C(){var I;if(A.value){n.warning("请先解析 / 添加字段");return}try{if((I=navigator.clipboard)!=null&&I.writeText)await navigator.clipboard.writeText(w.value);else{const x=document.createElement("textarea");x.value=w.value,x.style.position="fixed",x.style.opacity="0",document.body.appendChild(x),x.select(),document.execCommand("copy"),document.body.removeChild(x)}n.success(`已复制 ${r.value.length} 条 SQL 到剪贴板`)}catch{n.error("复制失败，请手动选择文本复制")}}return(I,x)=>(K(),re("div",xo,[x[11]||(x[11]=D("div",{class:"page-head"},[D("h2",null,"生成新增字段 SQL"),D("p",null,"批量粘贴字段 → 自动出英文与类型 → 在表格内核对 → 一键生成 INSERT / ALTER / COMMENT SQL。")],-1)),D("div",ko,[X(O(jr),{"show-feedback":!1,"label-placement":"top"},{default:ne(()=>[X(O(Vr),{label:"表名（应用到新行）"},{default:ne(()=>[X(O(Le),{value:l.value,"onUpdate:value":x[0]||(x[0]=T=>l.value=T),placeholder:"如 tud_b07new（解析 / 新增的行默认带这个表名，可在表格内逐行改）",clearable:""},null,8,["value"])]),_:1})]),_:1}),D("div",Eo,[D("div",Ao,[x[3]||(x[3]=D("span",{class:"lbl"},"批量粘贴字段（逗号 / 换行 / 顿号分隔）",-1)),X(O(Ee),{size:"small",type:"primary",onClick:b},{default:ne(()=>[...x[2]||(x[2]=[de("解析生成字段",-1)])]),_:1})]),X(O(Le),{value:a.value,"onUpdate:value":x[1]||(x[1]=T=>a.value=T),type:"textarea",rows:3,placeholder:"如：专业监理工程师姓名，安全监理工程师姓名，总监理工程师姓名"},null,8,["value"])]),D("div",So,[x[5]||(x[5]=D("span",{class:"lbl"},"字段信息（可直接在表格内修改，改完再生成 SQL）",-1)),X(O(Ee),{size:"small",secondary:"",onClick:g},{default:ne(()=>[...x[4]||(x[4]=[de("+ 新增一行",-1)])]),_:1})]),D("div",Io,[r.value.length?(K(),re("table",Co,[x[7]||(x[7]=D("thead",null,[D("tr",null,[D("th",{class:"c-idx"},"序号"),D("th",{class:"c-table"},"表名"),D("th",{class:"c-field"},"字段名（英文）"),D("th",{class:"c-desc"},"字段描述（中文）"),D("th",{class:"c-type"},"类型"),D("th",{class:"c-len"},"长度"),D("th",{class:"c-sort"},"排序"),D("th",{class:"c-act"})])],-1)),D("tbody",null,[(K(!0),re(Ne,null,De(r.value,(T,N)=>(K(),re("tr",{key:N},[D("td",To,ue(N+1),1),D("td",null,[X(O(Le),{value:T.tableName,"onUpdate:value":P=>T.tableName=P,size:"small"},null,8,["value","onUpdate:value"])]),D("td",null,[X(O(Le),{value:T.fieldName,"onUpdate:value":P=>T.fieldName=P,size:"small"},null,8,["value","onUpdate:value"])]),D("td",null,[X(O(Le),{value:T.fieldDesc,"onUpdate:value":P=>T.fieldDesc=P,size:"small"},null,8,["value","onUpdate:value"])]),D("td",null,[X(O(at),{value:T.dbType,"onUpdate:value":P=>T.dbType=P,options:t,size:"small"},null,8,["value","onUpdate:value"])]),D("td",null,[X(O(lt),{value:T.length,"onUpdate:value":P=>T.length=P,size:"small",min:0,max:4e3,disabled:d(T.dbType),style:{width:"100%"}},null,8,["value","onUpdate:value","disabled"])]),D("td",null,[X(O(lt),{value:T.sort,"onUpdate:value":P=>T.sort=P,size:"small",min:0,max:9999,style:{width:"100%"}},null,8,["value","onUpdate:value"])]),D("td",null,[X(O(Ee),{size:"small",text:"",type:"error",onClick:P=>y(N)},{default:ne(()=>[...x[6]||(x[6]=[de("删除",-1)])]),_:1},8,["onClick"])])]))),128))])])):(K(),re("div",Ro,"粘贴字段并点击「解析生成字段」，或点「新增一行」手动添加…"))]),v.value.length?(K(),re("div",No,[(K(!0),re(Ne,null,De(v.value,(T,N)=>(K(),re("div",{class:"warn-item",key:N},"⚠ "+ue(T.fieldDesc)+"："+ue(T.warn),1))),128))])):Ae("",!0),X(O(Zt),{type:"warning","show-icon":!0,style:{margin:"12px 0"}},{default:ne(()=>[...x[8]||(x[8]=[de(" 排序号（默认 ",-1),D("b",null,"50",-1),de("）请按目标表结构调整；table_id 已改为按「表名」动态查 (select id from dy_table where name = '表名')，请确保该表名在 dy_table 中存在。 创建人/时间保持模板原值；ALTER 列类型已按字段类型自动生成（varchar / text / date …），如需修改请手动调整。 ",-1)])]),_:1}),D("div",Lo,[D("span",Do,"生成的 SQL（"+ue(r.value.length)+" 条）",1),D("div",Oo,[X(O(Ee),{size:"small",secondary:"",disabled:A.value,onClick:_},{default:ne(()=>[...x[9]||(x[9]=[de("重新生成 时间/ID",-1)])]),_:1},8,["disabled"]),X(O(Ee),{size:"small",type:"primary",disabled:A.value,onClick:C},{default:ne(()=>[...x[10]||(x[10]=[de("复制 SQL",-1)])]),_:1},8,["disabled"])])]),X(O(Ur),{style:{"max-height":"320px"}},{default:ne(()=>[A.value?Ae("",!0):(K(),re("pre",zo,ue(w.value),1))]),_:1})])]))}}),Bo=$e(Fo,[["__scopeId","data-v-8782553a"]]);var St=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Po(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function It(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ht={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/var Bn;function Mo(){return Bn||(Bn=1,(function(e,n){(function(t){e.exports=t()})(function(){return(function t(c,l,a){function r(h,p){if(!l[h]){if(!c[h]){var f=typeof It=="function"&&It;if(!p&&f)return f(h,!0);if(o)return o(h,!0);var d=new Error("Cannot find module '"+h+"'");throw d.code="MODULE_NOT_FOUND",d}var s=l[h]={exports:{}};c[h][0].call(s.exports,function(b){var g=c[h][1][b];return r(g||b)},s,s.exports,t,c,l,a)}return l[h].exports}for(var o=typeof It=="function"&&It,u=0;u<a.length;u++)r(a[u]);return r})({1:[function(t,c,l){var a=t("./utils"),r=t("./support"),o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";l.encode=function(u){for(var h,p,f,d,s,b,g,y=[],_=0,v=u.length,w=v,A=a.getTypeOf(u)!=="string";_<u.length;)w=v-_,f=A?(h=u[_++],p=_<v?u[_++]:0,_<v?u[_++]:0):(h=u.charCodeAt(_++),p=_<v?u.charCodeAt(_++):0,_<v?u.charCodeAt(_++):0),d=h>>2,s=(3&h)<<4|p>>4,b=1<w?(15&p)<<2|f>>6:64,g=2<w?63&f:64,y.push(o.charAt(d)+o.charAt(s)+o.charAt(b)+o.charAt(g));return y.join("")},l.decode=function(u){var h,p,f,d,s,b,g=0,y=0,_="data:";if(u.substr(0,_.length)===_)throw new Error("Invalid base64 input, it looks like a data url.");var v,w=3*(u=u.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(u.charAt(u.length-1)===o.charAt(64)&&w--,u.charAt(u.length-2)===o.charAt(64)&&w--,w%1!=0)throw new Error("Invalid base64 input, bad content length.");for(v=r.uint8array?new Uint8Array(0|w):new Array(0|w);g<u.length;)h=o.indexOf(u.charAt(g++))<<2|(d=o.indexOf(u.charAt(g++)))>>4,p=(15&d)<<4|(s=o.indexOf(u.charAt(g++)))>>2,f=(3&s)<<6|(b=o.indexOf(u.charAt(g++))),v[y++]=h,s!==64&&(v[y++]=p),b!==64&&(v[y++]=f);return v}},{"./support":30,"./utils":32}],2:[function(t,c,l){var a=t("./external"),r=t("./stream/DataWorker"),o=t("./stream/Crc32Probe"),u=t("./stream/DataLengthProbe");function h(p,f,d,s,b){this.compressedSize=p,this.uncompressedSize=f,this.crc32=d,this.compression=s,this.compressedContent=b}h.prototype={getContentWorker:function(){var p=new r(a.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")),f=this;return p.on("end",function(){if(this.streamInfo.data_length!==f.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),p},getCompressedWorker:function(){return new r(a.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},h.createWorkerFrom=function(p,f,d){return p.pipe(new o).pipe(new u("uncompressedSize")).pipe(f.compressWorker(d)).pipe(new u("compressedSize")).withStreamInfo("compression",f)},c.exports=h},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,c,l){var a=t("./stream/GenericWorker");l.STORE={magic:"\0\0",compressWorker:function(){return new a("STORE compression")},uncompressWorker:function(){return new a("STORE decompression")}},l.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,c,l){var a=t("./utils"),r=(function(){for(var o,u=[],h=0;h<256;h++){o=h;for(var p=0;p<8;p++)o=1&o?3988292384^o>>>1:o>>>1;u[h]=o}return u})();c.exports=function(o,u){return o!==void 0&&o.length?a.getTypeOf(o)!=="string"?(function(h,p,f,d){var s=r,b=d+f;h^=-1;for(var g=d;g<b;g++)h=h>>>8^s[255&(h^p[g])];return-1^h})(0|u,o,o.length,0):(function(h,p,f,d){var s=r,b=d+f;h^=-1;for(var g=d;g<b;g++)h=h>>>8^s[255&(h^p.charCodeAt(g))];return-1^h})(0|u,o,o.length,0):0}},{"./utils":32}],5:[function(t,c,l){l.base64=!1,l.binary=!1,l.dir=!1,l.createFolders=!0,l.date=null,l.compression=null,l.compressionOptions=null,l.comment=null,l.unixPermissions=null,l.dosPermissions=null},{}],6:[function(t,c,l){var a=null;a=typeof Promise<"u"?Promise:t("lie"),c.exports={Promise:a}},{lie:37}],7:[function(t,c,l){var a=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",r=t("pako"),o=t("./utils"),u=t("./stream/GenericWorker"),h=a?"uint8array":"array";function p(f,d){u.call(this,"FlateWorker/"+f),this._pako=null,this._pakoAction=f,this._pakoOptions=d,this.meta={}}l.magic="\b\0",o.inherits(p,u),p.prototype.processChunk=function(f){this.meta=f.meta,this._pako===null&&this._createPako(),this._pako.push(o.transformTo(h,f.data),!1)},p.prototype.flush=function(){u.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},p.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this._pako=null},p.prototype._createPako=function(){this._pako=new r[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var f=this;this._pako.onData=function(d){f.push({data:d,meta:f.meta})}},l.compressWorker=function(f){return new p("Deflate",f)},l.uncompressWorker=function(){return new p("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,c,l){function a(s,b){var g,y="";for(g=0;g<b;g++)y+=String.fromCharCode(255&s),s>>>=8;return y}function r(s,b,g,y,_,v){var w,A,C=s.file,I=s.compression,x=v!==h.utf8encode,T=o.transformTo("string",v(C.name)),N=o.transformTo("string",h.utf8encode(C.name)),P=C.comment,se=o.transformTo("string",v(P)),S=o.transformTo("string",h.utf8encode(P)),j=N.length!==C.name.length,m=S.length!==P.length,$="",he="",F="",H=C.dir,W=C.date,le={crc32:0,compressedSize:0,uncompressedSize:0};b&&!g||(le.crc32=s.crc32,le.compressedSize=s.compressedSize,le.uncompressedSize=s.uncompressedSize);var B=0;b&&(B|=8),x||!j&&!m||(B|=2048);var R=0,ae=0;H&&(R|=16),_==="UNIX"?(ae=798,R|=(function(J,xe){var V=J;return J||(V=xe?16893:33204),(65535&V)<<16})(C.unixPermissions,H)):(ae=20,R|=(function(J){return 63&(J||0)})(C.dosPermissions)),w=W.getUTCHours(),w<<=6,w|=W.getUTCMinutes(),w<<=5,w|=W.getUTCSeconds()/2,A=W.getUTCFullYear()-1980,A<<=4,A|=W.getUTCMonth()+1,A<<=5,A|=W.getUTCDate(),j&&(he=a(1,1)+a(p(T),4)+N,$+="up"+a(he.length,2)+he),m&&(F=a(1,1)+a(p(se),4)+S,$+="uc"+a(F.length,2)+F);var te="";return te+=`
\0`,te+=a(B,2),te+=I.magic,te+=a(w,2),te+=a(A,2),te+=a(le.crc32,4),te+=a(le.compressedSize,4),te+=a(le.uncompressedSize,4),te+=a(T.length,2),te+=a($.length,2),{fileRecord:f.LOCAL_FILE_HEADER+te+T+$,dirRecord:f.CENTRAL_FILE_HEADER+a(ae,2)+te+a(se.length,2)+"\0\0\0\0"+a(R,4)+a(y,4)+T+$+se}}var o=t("../utils"),u=t("../stream/GenericWorker"),h=t("../utf8"),p=t("../crc32"),f=t("../signature");function d(s,b,g,y){u.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=b,this.zipPlatform=g,this.encodeFileName=y,this.streamFiles=s,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}o.inherits(d,u),d.prototype.push=function(s){var b=s.meta.percent||0,g=this.entriesCount,y=this._sources.length;this.accumulate?this.contentBuffer.push(s):(this.bytesWritten+=s.data.length,u.prototype.push.call(this,{data:s.data,meta:{currentFile:this.currentFile,percent:g?(b+100*(g-y-1))/g:100}}))},d.prototype.openedSource=function(s){this.currentSourceOffset=this.bytesWritten,this.currentFile=s.file.name;var b=this.streamFiles&&!s.file.dir;if(b){var g=r(s,b,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:g.fileRecord,meta:{percent:0}})}else this.accumulate=!0},d.prototype.closedSource=function(s){this.accumulate=!1;var b=this.streamFiles&&!s.file.dir,g=r(s,b,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(g.dirRecord),b)this.push({data:(function(y){return f.DATA_DESCRIPTOR+a(y.crc32,4)+a(y.compressedSize,4)+a(y.uncompressedSize,4)})(s),meta:{percent:100}});else for(this.push({data:g.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},d.prototype.flush=function(){for(var s=this.bytesWritten,b=0;b<this.dirRecords.length;b++)this.push({data:this.dirRecords[b],meta:{percent:100}});var g=this.bytesWritten-s,y=(function(_,v,w,A,C){var I=o.transformTo("string",C(A));return f.CENTRAL_DIRECTORY_END+"\0\0\0\0"+a(_,2)+a(_,2)+a(v,4)+a(w,4)+a(I.length,2)+I})(this.dirRecords.length,g,s,this.zipComment,this.encodeFileName);this.push({data:y,meta:{percent:100}})},d.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},d.prototype.registerPrevious=function(s){this._sources.push(s);var b=this;return s.on("data",function(g){b.processChunk(g)}),s.on("end",function(){b.closedSource(b.previous.streamInfo),b._sources.length?b.prepareNextSource():b.end()}),s.on("error",function(g){b.error(g)}),this},d.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},d.prototype.error=function(s){var b=this._sources;if(!u.prototype.error.call(this,s))return!1;for(var g=0;g<b.length;g++)try{b[g].error(s)}catch{}return!0},d.prototype.lock=function(){u.prototype.lock.call(this);for(var s=this._sources,b=0;b<s.length;b++)s[b].lock()},c.exports=d},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,c,l){var a=t("../compressions"),r=t("./ZipFileWorker");l.generateWorker=function(o,u,h){var p=new r(u.streamFiles,h,u.platform,u.encodeFileName),f=0;try{o.forEach(function(d,s){f++;var b=(function(v,w){var A=v||w,C=a[A];if(!C)throw new Error(A+" is not a valid compression method !");return C})(s.options.compression,u.compression),g=s.options.compressionOptions||u.compressionOptions||{},y=s.dir,_=s.date;s._compressWorker(b,g).withStreamInfo("file",{name:d,dir:y,date:_,comment:s.comment||"",unixPermissions:s.unixPermissions,dosPermissions:s.dosPermissions}).pipe(p)}),p.entriesCount=f}catch(d){p.error(d)}return p}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,c,l){function a(){if(!(this instanceof a))return new a;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var r=new a;for(var o in this)typeof this[o]!="function"&&(r[o]=this[o]);return r}}(a.prototype=t("./object")).loadAsync=t("./load"),a.support=t("./support"),a.defaults=t("./defaults"),a.version="3.10.1",a.loadAsync=function(r,o){return new a().loadAsync(r,o)},a.external=t("./external"),c.exports=a},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,c,l){var a=t("./utils"),r=t("./external"),o=t("./utf8"),u=t("./zipEntries"),h=t("./stream/Crc32Probe"),p=t("./nodejsUtils");function f(d){return new r.Promise(function(s,b){var g=d.decompressed.getContentWorker().pipe(new h);g.on("error",function(y){b(y)}).on("end",function(){g.streamInfo.crc32!==d.decompressed.crc32?b(new Error("Corrupted zip : CRC32 mismatch")):s()}).resume()})}c.exports=function(d,s){var b=this;return s=a.extend(s||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),p.isNode&&p.isStream(d)?r.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):a.prepareContent("the loaded zip file",d,!0,s.optimizedBinaryString,s.base64).then(function(g){var y=new u(s);return y.load(g),y}).then(function(g){var y=[r.Promise.resolve(g)],_=g.files;if(s.checkCRC32)for(var v=0;v<_.length;v++)y.push(f(_[v]));return r.Promise.all(y)}).then(function(g){for(var y=g.shift(),_=y.files,v=0;v<_.length;v++){var w=_[v],A=w.fileNameStr,C=a.resolve(w.fileNameStr);b.file(C,w.decompressed,{binary:!0,optimizedBinaryString:!0,date:w.date,dir:w.dir,comment:w.fileCommentStr.length?w.fileCommentStr:null,unixPermissions:w.unixPermissions,dosPermissions:w.dosPermissions,createFolders:s.createFolders}),w.dir||(b.file(C).unsafeOriginalName=A)}return y.zipComment.length&&(b.comment=y.zipComment),b})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,c,l){var a=t("../utils"),r=t("../stream/GenericWorker");function o(u,h){r.call(this,"Nodejs stream input adapter for "+u),this._upstreamEnded=!1,this._bindStream(h)}a.inherits(o,r),o.prototype._bindStream=function(u){var h=this;(this._stream=u).pause(),u.on("data",function(p){h.push({data:p,meta:{percent:0}})}).on("error",function(p){h.isPaused?this.generatedError=p:h.error(p)}).on("end",function(){h.isPaused?h._upstreamEnded=!0:h.end()})},o.prototype.pause=function(){return!!r.prototype.pause.call(this)&&(this._stream.pause(),!0)},o.prototype.resume=function(){return!!r.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},c.exports=o},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,c,l){var a=t("readable-stream").Readable;function r(o,u,h){a.call(this,u),this._helper=o;var p=this;o.on("data",function(f,d){p.push(f)||p._helper.pause(),h&&h(d)}).on("error",function(f){p.emit("error",f)}).on("end",function(){p.push(null)})}t("../utils").inherits(r,a),r.prototype._read=function(){this._helper.resume()},c.exports=r},{"../utils":32,"readable-stream":16}],14:[function(t,c,l){c.exports={isNode:typeof Buffer<"u",newBufferFrom:function(a,r){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(a,r);if(typeof a=="number")throw new Error('The "data" argument must not be a number');return new Buffer(a,r)},allocBuffer:function(a){if(Buffer.alloc)return Buffer.alloc(a);var r=new Buffer(a);return r.fill(0),r},isBuffer:function(a){return Buffer.isBuffer(a)},isStream:function(a){return a&&typeof a.on=="function"&&typeof a.pause=="function"&&typeof a.resume=="function"}}},{}],15:[function(t,c,l){function a(C,I,x){var T,N=o.getTypeOf(I),P=o.extend(x||{},p);P.date=P.date||new Date,P.compression!==null&&(P.compression=P.compression.toUpperCase()),typeof P.unixPermissions=="string"&&(P.unixPermissions=parseInt(P.unixPermissions,8)),P.unixPermissions&&16384&P.unixPermissions&&(P.dir=!0),P.dosPermissions&&16&P.dosPermissions&&(P.dir=!0),P.dir&&(C=_(C)),P.createFolders&&(T=y(C))&&v.call(this,T,!0);var se=N==="string"&&P.binary===!1&&P.base64===!1;x&&x.binary!==void 0||(P.binary=!se),(I instanceof f&&I.uncompressedSize===0||P.dir||!I||I.length===0)&&(P.base64=!1,P.binary=!0,I="",P.compression="STORE",N="string");var S=null;S=I instanceof f||I instanceof u?I:b.isNode&&b.isStream(I)?new g(C,I):o.prepareContent(C,I,P.binary,P.optimizedBinaryString,P.base64);var j=new d(C,S,P);this.files[C]=j}var r=t("./utf8"),o=t("./utils"),u=t("./stream/GenericWorker"),h=t("./stream/StreamHelper"),p=t("./defaults"),f=t("./compressedObject"),d=t("./zipObject"),s=t("./generate"),b=t("./nodejsUtils"),g=t("./nodejs/NodejsStreamInputAdapter"),y=function(C){C.slice(-1)==="/"&&(C=C.substring(0,C.length-1));var I=C.lastIndexOf("/");return 0<I?C.substring(0,I):""},_=function(C){return C.slice(-1)!=="/"&&(C+="/"),C},v=function(C,I){return I=I!==void 0?I:p.createFolders,C=_(C),this.files[C]||a.call(this,C,null,{dir:!0,createFolders:I}),this.files[C]};function w(C){return Object.prototype.toString.call(C)==="[object RegExp]"}var A={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(C){var I,x,T;for(I in this.files)T=this.files[I],(x=I.slice(this.root.length,I.length))&&I.slice(0,this.root.length)===this.root&&C(x,T)},filter:function(C){var I=[];return this.forEach(function(x,T){C(x,T)&&I.push(T)}),I},file:function(C,I,x){if(arguments.length!==1)return C=this.root+C,a.call(this,C,I,x),this;if(w(C)){var T=C;return this.filter(function(P,se){return!se.dir&&T.test(P)})}var N=this.files[this.root+C];return N&&!N.dir?N:null},folder:function(C){if(!C)return this;if(w(C))return this.filter(function(N,P){return P.dir&&C.test(N)});var I=this.root+C,x=v.call(this,I),T=this.clone();return T.root=x.name,T},remove:function(C){C=this.root+C;var I=this.files[C];if(I||(C.slice(-1)!=="/"&&(C+="/"),I=this.files[C]),I&&!I.dir)delete this.files[C];else for(var x=this.filter(function(N,P){return P.name.slice(0,C.length)===C}),T=0;T<x.length;T++)delete this.files[x[T].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(C){var I,x={};try{if((x=o.extend(C||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:r.utf8encode})).type=x.type.toLowerCase(),x.compression=x.compression.toUpperCase(),x.type==="binarystring"&&(x.type="string"),!x.type)throw new Error("No output type specified.");o.checkSupport(x.type),x.platform!=="darwin"&&x.platform!=="freebsd"&&x.platform!=="linux"&&x.platform!=="sunos"||(x.platform="UNIX"),x.platform==="win32"&&(x.platform="DOS");var T=x.comment||this.comment||"";I=s.generateWorker(this,x,T)}catch(N){(I=new u("error")).error(N)}return new h(I,x.type||"string",x.mimeType)},generateAsync:function(C,I){return this.generateInternalStream(C).accumulate(I)},generateNodeStream:function(C,I){return(C=C||{}).type||(C.type="nodebuffer"),this.generateInternalStream(C).toNodejsStream(I)}};c.exports=A},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,c,l){c.exports=t("stream")},{stream:void 0}],17:[function(t,c,l){var a=t("./DataReader");function r(o){a.call(this,o);for(var u=0;u<this.data.length;u++)o[u]=255&o[u]}t("../utils").inherits(r,a),r.prototype.byteAt=function(o){return this.data[this.zero+o]},r.prototype.lastIndexOfSignature=function(o){for(var u=o.charCodeAt(0),h=o.charCodeAt(1),p=o.charCodeAt(2),f=o.charCodeAt(3),d=this.length-4;0<=d;--d)if(this.data[d]===u&&this.data[d+1]===h&&this.data[d+2]===p&&this.data[d+3]===f)return d-this.zero;return-1},r.prototype.readAndCheckSignature=function(o){var u=o.charCodeAt(0),h=o.charCodeAt(1),p=o.charCodeAt(2),f=o.charCodeAt(3),d=this.readData(4);return u===d[0]&&h===d[1]&&p===d[2]&&f===d[3]},r.prototype.readData=function(o){if(this.checkOffset(o),o===0)return[];var u=this.data.slice(this.zero+this.index,this.zero+this.index+o);return this.index+=o,u},c.exports=r},{"../utils":32,"./DataReader":18}],18:[function(t,c,l){var a=t("../utils");function r(o){this.data=o,this.length=o.length,this.index=0,this.zero=0}r.prototype={checkOffset:function(o){this.checkIndex(this.index+o)},checkIndex:function(o){if(this.length<this.zero+o||o<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+o+"). Corrupted zip ?")},setIndex:function(o){this.checkIndex(o),this.index=o},skip:function(o){this.setIndex(this.index+o)},byteAt:function(){},readInt:function(o){var u,h=0;for(this.checkOffset(o),u=this.index+o-1;u>=this.index;u--)h=(h<<8)+this.byteAt(u);return this.index+=o,h},readString:function(o){return a.transformTo("string",this.readData(o))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var o=this.readInt(4);return new Date(Date.UTC(1980+(o>>25&127),(o>>21&15)-1,o>>16&31,o>>11&31,o>>5&63,(31&o)<<1))}},c.exports=r},{"../utils":32}],19:[function(t,c,l){var a=t("./Uint8ArrayReader");function r(o){a.call(this,o)}t("../utils").inherits(r,a),r.prototype.readData=function(o){this.checkOffset(o);var u=this.data.slice(this.zero+this.index,this.zero+this.index+o);return this.index+=o,u},c.exports=r},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,c,l){var a=t("./DataReader");function r(o){a.call(this,o)}t("../utils").inherits(r,a),r.prototype.byteAt=function(o){return this.data.charCodeAt(this.zero+o)},r.prototype.lastIndexOfSignature=function(o){return this.data.lastIndexOf(o)-this.zero},r.prototype.readAndCheckSignature=function(o){return o===this.readData(4)},r.prototype.readData=function(o){this.checkOffset(o);var u=this.data.slice(this.zero+this.index,this.zero+this.index+o);return this.index+=o,u},c.exports=r},{"../utils":32,"./DataReader":18}],21:[function(t,c,l){var a=t("./ArrayReader");function r(o){a.call(this,o)}t("../utils").inherits(r,a),r.prototype.readData=function(o){if(this.checkOffset(o),o===0)return new Uint8Array(0);var u=this.data.subarray(this.zero+this.index,this.zero+this.index+o);return this.index+=o,u},c.exports=r},{"../utils":32,"./ArrayReader":17}],22:[function(t,c,l){var a=t("../utils"),r=t("../support"),o=t("./ArrayReader"),u=t("./StringReader"),h=t("./NodeBufferReader"),p=t("./Uint8ArrayReader");c.exports=function(f){var d=a.getTypeOf(f);return a.checkSupport(d),d!=="string"||r.uint8array?d==="nodebuffer"?new h(f):r.uint8array?new p(a.transformTo("uint8array",f)):new o(a.transformTo("array",f)):new u(f)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,c,l){l.LOCAL_FILE_HEADER="PK",l.CENTRAL_FILE_HEADER="PK",l.CENTRAL_DIRECTORY_END="PK",l.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",l.ZIP64_CENTRAL_DIRECTORY_END="PK",l.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(t,c,l){var a=t("./GenericWorker"),r=t("../utils");function o(u){a.call(this,"ConvertWorker to "+u),this.destType=u}r.inherits(o,a),o.prototype.processChunk=function(u){this.push({data:r.transformTo(this.destType,u.data),meta:u.meta})},c.exports=o},{"../utils":32,"./GenericWorker":28}],25:[function(t,c,l){var a=t("./GenericWorker"),r=t("../crc32");function o(){a.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(o,a),o.prototype.processChunk=function(u){this.streamInfo.crc32=r(u.data,this.streamInfo.crc32||0),this.push(u)},c.exports=o},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,c,l){var a=t("../utils"),r=t("./GenericWorker");function o(u){r.call(this,"DataLengthProbe for "+u),this.propName=u,this.withStreamInfo(u,0)}a.inherits(o,r),o.prototype.processChunk=function(u){if(u){var h=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=h+u.data.length}r.prototype.processChunk.call(this,u)},c.exports=o},{"../utils":32,"./GenericWorker":28}],27:[function(t,c,l){var a=t("../utils"),r=t("./GenericWorker");function o(u){r.call(this,"DataWorker");var h=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,u.then(function(p){h.dataIsReady=!0,h.data=p,h.max=p&&p.length||0,h.type=a.getTypeOf(p),h.isPaused||h._tickAndRepeat()},function(p){h.error(p)})}a.inherits(o,r),o.prototype.cleanUp=function(){r.prototype.cleanUp.call(this),this.data=null},o.prototype.resume=function(){return!!r.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,a.delay(this._tickAndRepeat,[],this)),!0)},o.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(a.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},o.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var u=null,h=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":u=this.data.substring(this.index,h);break;case"uint8array":u=this.data.subarray(this.index,h);break;case"array":case"nodebuffer":u=this.data.slice(this.index,h)}return this.index=h,this.push({data:u,meta:{percent:this.max?this.index/this.max*100:0}})},c.exports=o},{"../utils":32,"./GenericWorker":28}],28:[function(t,c,l){function a(r){this.name=r||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}a.prototype={push:function(r){this.emit("data",r)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(r){this.emit("error",r)}return!0},error:function(r){return!this.isFinished&&(this.isPaused?this.generatedError=r:(this.isFinished=!0,this.emit("error",r),this.previous&&this.previous.error(r),this.cleanUp()),!0)},on:function(r,o){return this._listeners[r].push(o),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(r,o){if(this._listeners[r])for(var u=0;u<this._listeners[r].length;u++)this._listeners[r][u].call(this,o)},pipe:function(r){return r.registerPrevious(this)},registerPrevious:function(r){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=r.streamInfo,this.mergeStreamInfo(),this.previous=r;var o=this;return r.on("data",function(u){o.processChunk(u)}),r.on("end",function(){o.end()}),r.on("error",function(u){o.error(u)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var r=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),r=!0),this.previous&&this.previous.resume(),!r},flush:function(){},processChunk:function(r){this.push(r)},withStreamInfo:function(r,o){return this.extraStreamInfo[r]=o,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var r in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,r)&&(this.streamInfo[r]=this.extraStreamInfo[r])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var r="Worker "+this.name;return this.previous?this.previous+" -> "+r:r}},c.exports=a},{}],29:[function(t,c,l){var a=t("../utils"),r=t("./ConvertWorker"),o=t("./GenericWorker"),u=t("../base64"),h=t("../support"),p=t("../external"),f=null;if(h.nodestream)try{f=t("../nodejs/NodejsStreamOutputAdapter")}catch{}function d(b,g){return new p.Promise(function(y,_){var v=[],w=b._internalType,A=b._outputType,C=b._mimeType;b.on("data",function(I,x){v.push(I),g&&g(x)}).on("error",function(I){v=[],_(I)}).on("end",function(){try{var I=(function(x,T,N){switch(x){case"blob":return a.newBlob(a.transformTo("arraybuffer",T),N);case"base64":return u.encode(T);default:return a.transformTo(x,T)}})(A,(function(x,T){var N,P=0,se=null,S=0;for(N=0;N<T.length;N++)S+=T[N].length;switch(x){case"string":return T.join("");case"array":return Array.prototype.concat.apply([],T);case"uint8array":for(se=new Uint8Array(S),N=0;N<T.length;N++)se.set(T[N],P),P+=T[N].length;return se;case"nodebuffer":return Buffer.concat(T);default:throw new Error("concat : unsupported type '"+x+"'")}})(w,v),C);y(I)}catch(x){_(x)}v=[]}).resume()})}function s(b,g,y){var _=g;switch(g){case"blob":case"arraybuffer":_="uint8array";break;case"base64":_="string"}try{this._internalType=_,this._outputType=g,this._mimeType=y,a.checkSupport(_),this._worker=b.pipe(new r(_)),b.lock()}catch(v){this._worker=new o("error"),this._worker.error(v)}}s.prototype={accumulate:function(b){return d(this,b)},on:function(b,g){var y=this;return b==="data"?this._worker.on(b,function(_){g.call(y,_.data,_.meta)}):this._worker.on(b,function(){a.delay(g,arguments,y)}),this},resume:function(){return a.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(b){if(a.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new f(this,{objectMode:this._outputType!=="nodebuffer"},b)}},c.exports=s},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,c,l){if(l.base64=!0,l.array=!0,l.string=!0,l.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",l.nodebuffer=typeof Buffer<"u",l.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")l.blob=!1;else{var a=new ArrayBuffer(0);try{l.blob=new Blob([a],{type:"application/zip"}).size===0}catch{try{var r=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);r.append(a),l.blob=r.getBlob("application/zip").size===0}catch{l.blob=!1}}}try{l.nodestream=!!t("readable-stream").Readable}catch{l.nodestream=!1}},{"readable-stream":16}],31:[function(t,c,l){for(var a=t("./utils"),r=t("./support"),o=t("./nodejsUtils"),u=t("./stream/GenericWorker"),h=new Array(256),p=0;p<256;p++)h[p]=252<=p?6:248<=p?5:240<=p?4:224<=p?3:192<=p?2:1;h[254]=h[254]=1;function f(){u.call(this,"utf-8 decode"),this.leftOver=null}function d(){u.call(this,"utf-8 encode")}l.utf8encode=function(s){return r.nodebuffer?o.newBufferFrom(s,"utf-8"):(function(b){var g,y,_,v,w,A=b.length,C=0;for(v=0;v<A;v++)(64512&(y=b.charCodeAt(v)))==55296&&v+1<A&&(64512&(_=b.charCodeAt(v+1)))==56320&&(y=65536+(y-55296<<10)+(_-56320),v++),C+=y<128?1:y<2048?2:y<65536?3:4;for(g=r.uint8array?new Uint8Array(C):new Array(C),v=w=0;w<C;v++)(64512&(y=b.charCodeAt(v)))==55296&&v+1<A&&(64512&(_=b.charCodeAt(v+1)))==56320&&(y=65536+(y-55296<<10)+(_-56320),v++),y<128?g[w++]=y:(y<2048?g[w++]=192|y>>>6:(y<65536?g[w++]=224|y>>>12:(g[w++]=240|y>>>18,g[w++]=128|y>>>12&63),g[w++]=128|y>>>6&63),g[w++]=128|63&y);return g})(s)},l.utf8decode=function(s){return r.nodebuffer?a.transformTo("nodebuffer",s).toString("utf-8"):(function(b){var g,y,_,v,w=b.length,A=new Array(2*w);for(g=y=0;g<w;)if((_=b[g++])<128)A[y++]=_;else if(4<(v=h[_]))A[y++]=65533,g+=v-1;else{for(_&=v===2?31:v===3?15:7;1<v&&g<w;)_=_<<6|63&b[g++],v--;1<v?A[y++]=65533:_<65536?A[y++]=_:(_-=65536,A[y++]=55296|_>>10&1023,A[y++]=56320|1023&_)}return A.length!==y&&(A.subarray?A=A.subarray(0,y):A.length=y),a.applyFromCharCode(A)})(s=a.transformTo(r.uint8array?"uint8array":"array",s))},a.inherits(f,u),f.prototype.processChunk=function(s){var b=a.transformTo(r.uint8array?"uint8array":"array",s.data);if(this.leftOver&&this.leftOver.length){if(r.uint8array){var g=b;(b=new Uint8Array(g.length+this.leftOver.length)).set(this.leftOver,0),b.set(g,this.leftOver.length)}else b=this.leftOver.concat(b);this.leftOver=null}var y=(function(v,w){var A;for((w=w||v.length)>v.length&&(w=v.length),A=w-1;0<=A&&(192&v[A])==128;)A--;return A<0||A===0?w:A+h[v[A]]>w?A:w})(b),_=b;y!==b.length&&(r.uint8array?(_=b.subarray(0,y),this.leftOver=b.subarray(y,b.length)):(_=b.slice(0,y),this.leftOver=b.slice(y,b.length))),this.push({data:l.utf8decode(_),meta:s.meta})},f.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:l.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},l.Utf8DecodeWorker=f,a.inherits(d,u),d.prototype.processChunk=function(s){this.push({data:l.utf8encode(s.data),meta:s.meta})},l.Utf8EncodeWorker=d},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,c,l){var a=t("./support"),r=t("./base64"),o=t("./nodejsUtils"),u=t("./external");function h(g){return g}function p(g,y){for(var _=0;_<g.length;++_)y[_]=255&g.charCodeAt(_);return y}t("setimmediate"),l.newBlob=function(g,y){l.checkSupport("blob");try{return new Blob([g],{type:y})}catch{try{var _=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return _.append(g),_.getBlob(y)}catch{throw new Error("Bug : can't construct the Blob.")}}};var f={stringifyByChunk:function(g,y,_){var v=[],w=0,A=g.length;if(A<=_)return String.fromCharCode.apply(null,g);for(;w<A;)y==="array"||y==="nodebuffer"?v.push(String.fromCharCode.apply(null,g.slice(w,Math.min(w+_,A)))):v.push(String.fromCharCode.apply(null,g.subarray(w,Math.min(w+_,A)))),w+=_;return v.join("")},stringifyByChar:function(g){for(var y="",_=0;_<g.length;_++)y+=String.fromCharCode(g[_]);return y},applyCanBeUsed:{uint8array:(function(){try{return a.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return a.nodebuffer&&String.fromCharCode.apply(null,o.allocBuffer(1)).length===1}catch{return!1}})()}};function d(g){var y=65536,_=l.getTypeOf(g),v=!0;if(_==="uint8array"?v=f.applyCanBeUsed.uint8array:_==="nodebuffer"&&(v=f.applyCanBeUsed.nodebuffer),v)for(;1<y;)try{return f.stringifyByChunk(g,_,y)}catch{y=Math.floor(y/2)}return f.stringifyByChar(g)}function s(g,y){for(var _=0;_<g.length;_++)y[_]=g[_];return y}l.applyFromCharCode=d;var b={};b.string={string:h,array:function(g){return p(g,new Array(g.length))},arraybuffer:function(g){return b.string.uint8array(g).buffer},uint8array:function(g){return p(g,new Uint8Array(g.length))},nodebuffer:function(g){return p(g,o.allocBuffer(g.length))}},b.array={string:d,array:h,arraybuffer:function(g){return new Uint8Array(g).buffer},uint8array:function(g){return new Uint8Array(g)},nodebuffer:function(g){return o.newBufferFrom(g)}},b.arraybuffer={string:function(g){return d(new Uint8Array(g))},array:function(g){return s(new Uint8Array(g),new Array(g.byteLength))},arraybuffer:h,uint8array:function(g){return new Uint8Array(g)},nodebuffer:function(g){return o.newBufferFrom(new Uint8Array(g))}},b.uint8array={string:d,array:function(g){return s(g,new Array(g.length))},arraybuffer:function(g){return g.buffer},uint8array:h,nodebuffer:function(g){return o.newBufferFrom(g)}},b.nodebuffer={string:d,array:function(g){return s(g,new Array(g.length))},arraybuffer:function(g){return b.nodebuffer.uint8array(g).buffer},uint8array:function(g){return s(g,new Uint8Array(g.length))},nodebuffer:h},l.transformTo=function(g,y){if(y=y||"",!g)return y;l.checkSupport(g);var _=l.getTypeOf(y);return b[_][g](y)},l.resolve=function(g){for(var y=g.split("/"),_=[],v=0;v<y.length;v++){var w=y[v];w==="."||w===""&&v!==0&&v!==y.length-1||(w===".."?_.pop():_.push(w))}return _.join("/")},l.getTypeOf=function(g){return typeof g=="string"?"string":Object.prototype.toString.call(g)==="[object Array]"?"array":a.nodebuffer&&o.isBuffer(g)?"nodebuffer":a.uint8array&&g instanceof Uint8Array?"uint8array":a.arraybuffer&&g instanceof ArrayBuffer?"arraybuffer":void 0},l.checkSupport=function(g){if(!a[g.toLowerCase()])throw new Error(g+" is not supported by this platform")},l.MAX_VALUE_16BITS=65535,l.MAX_VALUE_32BITS=-1,l.pretty=function(g){var y,_,v="";for(_=0;_<(g||"").length;_++)v+="\\x"+((y=g.charCodeAt(_))<16?"0":"")+y.toString(16).toUpperCase();return v},l.delay=function(g,y,_){setImmediate(function(){g.apply(_||null,y||[])})},l.inherits=function(g,y){function _(){}_.prototype=y.prototype,g.prototype=new _},l.extend=function(){var g,y,_={};for(g=0;g<arguments.length;g++)for(y in arguments[g])Object.prototype.hasOwnProperty.call(arguments[g],y)&&_[y]===void 0&&(_[y]=arguments[g][y]);return _},l.prepareContent=function(g,y,_,v,w){return u.Promise.resolve(y).then(function(A){return a.blob&&(A instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(A))!==-1)&&typeof FileReader<"u"?new u.Promise(function(C,I){var x=new FileReader;x.onload=function(T){C(T.target.result)},x.onerror=function(T){I(T.target.error)},x.readAsArrayBuffer(A)}):A}).then(function(A){var C=l.getTypeOf(A);return C?(C==="arraybuffer"?A=l.transformTo("uint8array",A):C==="string"&&(w?A=r.decode(A):_&&v!==!0&&(A=(function(I){return p(I,a.uint8array?new Uint8Array(I.length):new Array(I.length))})(A))),A):u.Promise.reject(new Error("Can't read the data of '"+g+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(t,c,l){var a=t("./reader/readerFor"),r=t("./utils"),o=t("./signature"),u=t("./zipEntry"),h=t("./support");function p(f){this.files=[],this.loadOptions=f}p.prototype={checkSignature:function(f){if(!this.reader.readAndCheckSignature(f)){this.reader.index-=4;var d=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+r.pretty(d)+", expected "+r.pretty(f)+")")}},isSignature:function(f,d){var s=this.reader.index;this.reader.setIndex(f);var b=this.reader.readString(4)===d;return this.reader.setIndex(s),b},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var f=this.reader.readData(this.zipCommentLength),d=h.uint8array?"uint8array":"array",s=r.transformTo(d,f);this.zipComment=this.loadOptions.decodeFileName(s)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var f,d,s,b=this.zip64EndOfCentralSize-44;0<b;)f=this.reader.readInt(2),d=this.reader.readInt(4),s=this.reader.readData(d),this.zip64ExtensibleData[f]={id:f,length:d,value:s}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var f,d;for(f=0;f<this.files.length;f++)d=this.files[f],this.reader.setIndex(d.localHeaderOffset),this.checkSignature(o.LOCAL_FILE_HEADER),d.readLocalPart(this.reader),d.handleUTF8(),d.processAttributes()},readCentralDir:function(){var f;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER);)(f=new u({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(f);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var f=this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);if(f<0)throw this.isSignature(0,o.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(f);var d=f;if(this.checkSignature(o.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===r.MAX_VALUE_16BITS||this.diskWithCentralDirStart===r.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===r.MAX_VALUE_16BITS||this.centralDirRecords===r.MAX_VALUE_16BITS||this.centralDirSize===r.MAX_VALUE_32BITS||this.centralDirOffset===r.MAX_VALUE_32BITS){if(this.zip64=!0,(f=this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(f),this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,o.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var s=this.centralDirOffset+this.centralDirSize;this.zip64&&(s+=20,s+=12+this.zip64EndOfCentralSize);var b=d-s;if(0<b)this.isSignature(d,o.CENTRAL_FILE_HEADER)||(this.reader.zero=b);else if(b<0)throw new Error("Corrupted zip: missing "+Math.abs(b)+" bytes.")},prepareReader:function(f){this.reader=a(f)},load:function(f){this.prepareReader(f),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},c.exports=p},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(t,c,l){var a=t("./reader/readerFor"),r=t("./utils"),o=t("./compressedObject"),u=t("./crc32"),h=t("./utf8"),p=t("./compressions"),f=t("./support");function d(s,b){this.options=s,this.loadOptions=b}d.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(s){var b,g;if(s.skip(22),this.fileNameLength=s.readInt(2),g=s.readInt(2),this.fileName=s.readData(this.fileNameLength),s.skip(g),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((b=(function(y){for(var _ in p)if(Object.prototype.hasOwnProperty.call(p,_)&&p[_].magic===y)return p[_];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+r.pretty(this.compressionMethod)+" unknown (inner file : "+r.transformTo("string",this.fileName)+")");this.decompressed=new o(this.compressedSize,this.uncompressedSize,this.crc32,b,s.readData(this.compressedSize))},readCentralPart:function(s){this.versionMadeBy=s.readInt(2),s.skip(2),this.bitFlag=s.readInt(2),this.compressionMethod=s.readString(2),this.date=s.readDate(),this.crc32=s.readInt(4),this.compressedSize=s.readInt(4),this.uncompressedSize=s.readInt(4);var b=s.readInt(2);if(this.extraFieldsLength=s.readInt(2),this.fileCommentLength=s.readInt(2),this.diskNumberStart=s.readInt(2),this.internalFileAttributes=s.readInt(2),this.externalFileAttributes=s.readInt(4),this.localHeaderOffset=s.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");s.skip(b),this.readExtraFields(s),this.parseZIP64ExtraField(s),this.fileComment=s.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var s=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),s==0&&(this.dosPermissions=63&this.externalFileAttributes),s==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var s=a(this.extraFields[1].value);this.uncompressedSize===r.MAX_VALUE_32BITS&&(this.uncompressedSize=s.readInt(8)),this.compressedSize===r.MAX_VALUE_32BITS&&(this.compressedSize=s.readInt(8)),this.localHeaderOffset===r.MAX_VALUE_32BITS&&(this.localHeaderOffset=s.readInt(8)),this.diskNumberStart===r.MAX_VALUE_32BITS&&(this.diskNumberStart=s.readInt(4))}},readExtraFields:function(s){var b,g,y,_=s.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});s.index+4<_;)b=s.readInt(2),g=s.readInt(2),y=s.readData(g),this.extraFields[b]={id:b,length:g,value:y};s.setIndex(_)},handleUTF8:function(){var s=f.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=h.utf8decode(this.fileName),this.fileCommentStr=h.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(b!==null)this.fileNameStr=b;else{var g=r.transformTo(s,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(g)}var y=this.findExtraFieldUnicodeComment();if(y!==null)this.fileCommentStr=y;else{var _=r.transformTo(s,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(_)}}},findExtraFieldUnicodePath:function(){var s=this.extraFields[28789];if(s){var b=a(s.value);return b.readInt(1)!==1||u(this.fileName)!==b.readInt(4)?null:h.utf8decode(b.readData(s.length-5))}return null},findExtraFieldUnicodeComment:function(){var s=this.extraFields[25461];if(s){var b=a(s.value);return b.readInt(1)!==1||u(this.fileComment)!==b.readInt(4)?null:h.utf8decode(b.readData(s.length-5))}return null}},c.exports=d},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,c,l){function a(b,g,y){this.name=b,this.dir=y.dir,this.date=y.date,this.comment=y.comment,this.unixPermissions=y.unixPermissions,this.dosPermissions=y.dosPermissions,this._data=g,this._dataBinary=y.binary,this.options={compression:y.compression,compressionOptions:y.compressionOptions}}var r=t("./stream/StreamHelper"),o=t("./stream/DataWorker"),u=t("./utf8"),h=t("./compressedObject"),p=t("./stream/GenericWorker");a.prototype={internalStream:function(b){var g=null,y="string";try{if(!b)throw new Error("No output type specified.");var _=(y=b.toLowerCase())==="string"||y==="text";y!=="binarystring"&&y!=="text"||(y="string"),g=this._decompressWorker();var v=!this._dataBinary;v&&!_&&(g=g.pipe(new u.Utf8EncodeWorker)),!v&&_&&(g=g.pipe(new u.Utf8DecodeWorker))}catch(w){(g=new p("error")).error(w)}return new r(g,y,"")},async:function(b,g){return this.internalStream(b).accumulate(g)},nodeStream:function(b,g){return this.internalStream(b||"nodebuffer").toNodejsStream(g)},_compressWorker:function(b,g){if(this._data instanceof h&&this._data.compression.magic===b.magic)return this._data.getCompressedWorker();var y=this._decompressWorker();return this._dataBinary||(y=y.pipe(new u.Utf8EncodeWorker)),h.createWorkerFrom(y,b,g)},_decompressWorker:function(){return this._data instanceof h?this._data.getContentWorker():this._data instanceof p?this._data:new o(this._data)}};for(var f=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],d=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},s=0;s<f.length;s++)a.prototype[f[s]]=d;c.exports=a},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,c,l){(function(a){var r,o,u=a.MutationObserver||a.WebKitMutationObserver;if(u){var h=0,p=new u(b),f=a.document.createTextNode("");p.observe(f,{characterData:!0}),r=function(){f.data=h=++h%2}}else if(a.setImmediate||a.MessageChannel===void 0)r="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var g=a.document.createElement("script");g.onreadystatechange=function(){b(),g.onreadystatechange=null,g.parentNode.removeChild(g),g=null},a.document.documentElement.appendChild(g)}:function(){setTimeout(b,0)};else{var d=new a.MessageChannel;d.port1.onmessage=b,r=function(){d.port2.postMessage(0)}}var s=[];function b(){var g,y;o=!0;for(var _=s.length;_;){for(y=s,s=[],g=-1;++g<_;)y[g]();_=s.length}o=!1}c.exports=function(g){s.push(g)!==1||o||r()}}).call(this,typeof St<"u"?St:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(t,c,l){var a=t("immediate");function r(){}var o={},u=["REJECTED"],h=["FULFILLED"],p=["PENDING"];function f(_){if(typeof _!="function")throw new TypeError("resolver must be a function");this.state=p,this.queue=[],this.outcome=void 0,_!==r&&g(this,_)}function d(_,v,w){this.promise=_,typeof v=="function"&&(this.onFulfilled=v,this.callFulfilled=this.otherCallFulfilled),typeof w=="function"&&(this.onRejected=w,this.callRejected=this.otherCallRejected)}function s(_,v,w){a(function(){var A;try{A=v(w)}catch(C){return o.reject(_,C)}A===_?o.reject(_,new TypeError("Cannot resolve promise with itself")):o.resolve(_,A)})}function b(_){var v=_&&_.then;if(_&&(typeof _=="object"||typeof _=="function")&&typeof v=="function")return function(){v.apply(_,arguments)}}function g(_,v){var w=!1;function A(x){w||(w=!0,o.reject(_,x))}function C(x){w||(w=!0,o.resolve(_,x))}var I=y(function(){v(C,A)});I.status==="error"&&A(I.value)}function y(_,v){var w={};try{w.value=_(v),w.status="success"}catch(A){w.status="error",w.value=A}return w}(c.exports=f).prototype.finally=function(_){if(typeof _!="function")return this;var v=this.constructor;return this.then(function(w){return v.resolve(_()).then(function(){return w})},function(w){return v.resolve(_()).then(function(){throw w})})},f.prototype.catch=function(_){return this.then(null,_)},f.prototype.then=function(_,v){if(typeof _!="function"&&this.state===h||typeof v!="function"&&this.state===u)return this;var w=new this.constructor(r);return this.state!==p?s(w,this.state===h?_:v,this.outcome):this.queue.push(new d(w,_,v)),w},d.prototype.callFulfilled=function(_){o.resolve(this.promise,_)},d.prototype.otherCallFulfilled=function(_){s(this.promise,this.onFulfilled,_)},d.prototype.callRejected=function(_){o.reject(this.promise,_)},d.prototype.otherCallRejected=function(_){s(this.promise,this.onRejected,_)},o.resolve=function(_,v){var w=y(b,v);if(w.status==="error")return o.reject(_,w.value);var A=w.value;if(A)g(_,A);else{_.state=h,_.outcome=v;for(var C=-1,I=_.queue.length;++C<I;)_.queue[C].callFulfilled(v)}return _},o.reject=function(_,v){_.state=u,_.outcome=v;for(var w=-1,A=_.queue.length;++w<A;)_.queue[w].callRejected(v);return _},f.resolve=function(_){return _ instanceof this?_:o.resolve(new this(r),_)},f.reject=function(_){var v=new this(r);return o.reject(v,_)},f.all=function(_){var v=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=_.length,A=!1;if(!w)return this.resolve([]);for(var C=new Array(w),I=0,x=-1,T=new this(r);++x<w;)N(_[x],x);return T;function N(P,se){v.resolve(P).then(function(S){C[se]=S,++I!==w||A||(A=!0,o.resolve(T,C))},function(S){A||(A=!0,o.reject(T,S))})}},f.race=function(_){var v=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=_.length,A=!1;if(!w)return this.resolve([]);for(var C=-1,I=new this(r);++C<w;)x=_[C],v.resolve(x).then(function(T){A||(A=!0,o.resolve(I,T))},function(T){A||(A=!0,o.reject(I,T))});var x;return I}},{immediate:36}],38:[function(t,c,l){var a={};(0,t("./lib/utils/common").assign)(a,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),c.exports=a},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,c,l){var a=t("./zlib/deflate"),r=t("./utils/common"),o=t("./utils/strings"),u=t("./zlib/messages"),h=t("./zlib/zstream"),p=Object.prototype.toString,f=0,d=-1,s=0,b=8;function g(_){if(!(this instanceof g))return new g(_);this.options=r.assign({level:d,method:b,chunkSize:16384,windowBits:15,memLevel:8,strategy:s,to:""},_||{});var v=this.options;v.raw&&0<v.windowBits?v.windowBits=-v.windowBits:v.gzip&&0<v.windowBits&&v.windowBits<16&&(v.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var w=a.deflateInit2(this.strm,v.level,v.method,v.windowBits,v.memLevel,v.strategy);if(w!==f)throw new Error(u[w]);if(v.header&&a.deflateSetHeader(this.strm,v.header),v.dictionary){var A;if(A=typeof v.dictionary=="string"?o.string2buf(v.dictionary):p.call(v.dictionary)==="[object ArrayBuffer]"?new Uint8Array(v.dictionary):v.dictionary,(w=a.deflateSetDictionary(this.strm,A))!==f)throw new Error(u[w]);this._dict_set=!0}}function y(_,v){var w=new g(v);if(w.push(_,!0),w.err)throw w.msg||u[w.err];return w.result}g.prototype.push=function(_,v){var w,A,C=this.strm,I=this.options.chunkSize;if(this.ended)return!1;A=v===~~v?v:v===!0?4:0,typeof _=="string"?C.input=o.string2buf(_):p.call(_)==="[object ArrayBuffer]"?C.input=new Uint8Array(_):C.input=_,C.next_in=0,C.avail_in=C.input.length;do{if(C.avail_out===0&&(C.output=new r.Buf8(I),C.next_out=0,C.avail_out=I),(w=a.deflate(C,A))!==1&&w!==f)return this.onEnd(w),!(this.ended=!0);C.avail_out!==0&&(C.avail_in!==0||A!==4&&A!==2)||(this.options.to==="string"?this.onData(o.buf2binstring(r.shrinkBuf(C.output,C.next_out))):this.onData(r.shrinkBuf(C.output,C.next_out)))}while((0<C.avail_in||C.avail_out===0)&&w!==1);return A===4?(w=a.deflateEnd(this.strm),this.onEnd(w),this.ended=!0,w===f):A!==2||(this.onEnd(f),!(C.avail_out=0))},g.prototype.onData=function(_){this.chunks.push(_)},g.prototype.onEnd=function(_){_===f&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=r.flattenChunks(this.chunks)),this.chunks=[],this.err=_,this.msg=this.strm.msg},l.Deflate=g,l.deflate=y,l.deflateRaw=function(_,v){return(v=v||{}).raw=!0,y(_,v)},l.gzip=function(_,v){return(v=v||{}).gzip=!0,y(_,v)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,c,l){var a=t("./zlib/inflate"),r=t("./utils/common"),o=t("./utils/strings"),u=t("./zlib/constants"),h=t("./zlib/messages"),p=t("./zlib/zstream"),f=t("./zlib/gzheader"),d=Object.prototype.toString;function s(g){if(!(this instanceof s))return new s(g);this.options=r.assign({chunkSize:16384,windowBits:0,to:""},g||{});var y=this.options;y.raw&&0<=y.windowBits&&y.windowBits<16&&(y.windowBits=-y.windowBits,y.windowBits===0&&(y.windowBits=-15)),!(0<=y.windowBits&&y.windowBits<16)||g&&g.windowBits||(y.windowBits+=32),15<y.windowBits&&y.windowBits<48&&(15&y.windowBits)==0&&(y.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new p,this.strm.avail_out=0;var _=a.inflateInit2(this.strm,y.windowBits);if(_!==u.Z_OK)throw new Error(h[_]);this.header=new f,a.inflateGetHeader(this.strm,this.header)}function b(g,y){var _=new s(y);if(_.push(g,!0),_.err)throw _.msg||h[_.err];return _.result}s.prototype.push=function(g,y){var _,v,w,A,C,I,x=this.strm,T=this.options.chunkSize,N=this.options.dictionary,P=!1;if(this.ended)return!1;v=y===~~y?y:y===!0?u.Z_FINISH:u.Z_NO_FLUSH,typeof g=="string"?x.input=o.binstring2buf(g):d.call(g)==="[object ArrayBuffer]"?x.input=new Uint8Array(g):x.input=g,x.next_in=0,x.avail_in=x.input.length;do{if(x.avail_out===0&&(x.output=new r.Buf8(T),x.next_out=0,x.avail_out=T),(_=a.inflate(x,u.Z_NO_FLUSH))===u.Z_NEED_DICT&&N&&(I=typeof N=="string"?o.string2buf(N):d.call(N)==="[object ArrayBuffer]"?new Uint8Array(N):N,_=a.inflateSetDictionary(this.strm,I)),_===u.Z_BUF_ERROR&&P===!0&&(_=u.Z_OK,P=!1),_!==u.Z_STREAM_END&&_!==u.Z_OK)return this.onEnd(_),!(this.ended=!0);x.next_out&&(x.avail_out!==0&&_!==u.Z_STREAM_END&&(x.avail_in!==0||v!==u.Z_FINISH&&v!==u.Z_SYNC_FLUSH)||(this.options.to==="string"?(w=o.utf8border(x.output,x.next_out),A=x.next_out-w,C=o.buf2string(x.output,w),x.next_out=A,x.avail_out=T-A,A&&r.arraySet(x.output,x.output,w,A,0),this.onData(C)):this.onData(r.shrinkBuf(x.output,x.next_out)))),x.avail_in===0&&x.avail_out===0&&(P=!0)}while((0<x.avail_in||x.avail_out===0)&&_!==u.Z_STREAM_END);return _===u.Z_STREAM_END&&(v=u.Z_FINISH),v===u.Z_FINISH?(_=a.inflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===u.Z_OK):v!==u.Z_SYNC_FLUSH||(this.onEnd(u.Z_OK),!(x.avail_out=0))},s.prototype.onData=function(g){this.chunks.push(g)},s.prototype.onEnd=function(g){g===u.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=r.flattenChunks(this.chunks)),this.chunks=[],this.err=g,this.msg=this.strm.msg},l.Inflate=s,l.inflate=b,l.inflateRaw=function(g,y){return(y=y||{}).raw=!0,b(g,y)},l.ungzip=b},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,c,l){var a=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";l.assign=function(u){for(var h=Array.prototype.slice.call(arguments,1);h.length;){var p=h.shift();if(p){if(typeof p!="object")throw new TypeError(p+"must be non-object");for(var f in p)p.hasOwnProperty(f)&&(u[f]=p[f])}}return u},l.shrinkBuf=function(u,h){return u.length===h?u:u.subarray?u.subarray(0,h):(u.length=h,u)};var r={arraySet:function(u,h,p,f,d){if(h.subarray&&u.subarray)u.set(h.subarray(p,p+f),d);else for(var s=0;s<f;s++)u[d+s]=h[p+s]},flattenChunks:function(u){var h,p,f,d,s,b;for(h=f=0,p=u.length;h<p;h++)f+=u[h].length;for(b=new Uint8Array(f),h=d=0,p=u.length;h<p;h++)s=u[h],b.set(s,d),d+=s.length;return b}},o={arraySet:function(u,h,p,f,d){for(var s=0;s<f;s++)u[d+s]=h[p+s]},flattenChunks:function(u){return[].concat.apply([],u)}};l.setTyped=function(u){u?(l.Buf8=Uint8Array,l.Buf16=Uint16Array,l.Buf32=Int32Array,l.assign(l,r)):(l.Buf8=Array,l.Buf16=Array,l.Buf32=Array,l.assign(l,o))},l.setTyped(a)},{}],42:[function(t,c,l){var a=t("./common"),r=!0,o=!0;try{String.fromCharCode.apply(null,[0])}catch{r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{o=!1}for(var u=new a.Buf8(256),h=0;h<256;h++)u[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;function p(f,d){if(d<65537&&(f.subarray&&o||!f.subarray&&r))return String.fromCharCode.apply(null,a.shrinkBuf(f,d));for(var s="",b=0;b<d;b++)s+=String.fromCharCode(f[b]);return s}u[254]=u[254]=1,l.string2buf=function(f){var d,s,b,g,y,_=f.length,v=0;for(g=0;g<_;g++)(64512&(s=f.charCodeAt(g)))==55296&&g+1<_&&(64512&(b=f.charCodeAt(g+1)))==56320&&(s=65536+(s-55296<<10)+(b-56320),g++),v+=s<128?1:s<2048?2:s<65536?3:4;for(d=new a.Buf8(v),g=y=0;y<v;g++)(64512&(s=f.charCodeAt(g)))==55296&&g+1<_&&(64512&(b=f.charCodeAt(g+1)))==56320&&(s=65536+(s-55296<<10)+(b-56320),g++),s<128?d[y++]=s:(s<2048?d[y++]=192|s>>>6:(s<65536?d[y++]=224|s>>>12:(d[y++]=240|s>>>18,d[y++]=128|s>>>12&63),d[y++]=128|s>>>6&63),d[y++]=128|63&s);return d},l.buf2binstring=function(f){return p(f,f.length)},l.binstring2buf=function(f){for(var d=new a.Buf8(f.length),s=0,b=d.length;s<b;s++)d[s]=f.charCodeAt(s);return d},l.buf2string=function(f,d){var s,b,g,y,_=d||f.length,v=new Array(2*_);for(s=b=0;s<_;)if((g=f[s++])<128)v[b++]=g;else if(4<(y=u[g]))v[b++]=65533,s+=y-1;else{for(g&=y===2?31:y===3?15:7;1<y&&s<_;)g=g<<6|63&f[s++],y--;1<y?v[b++]=65533:g<65536?v[b++]=g:(g-=65536,v[b++]=55296|g>>10&1023,v[b++]=56320|1023&g)}return p(v,b)},l.utf8border=function(f,d){var s;for((d=d||f.length)>f.length&&(d=f.length),s=d-1;0<=s&&(192&f[s])==128;)s--;return s<0||s===0?d:s+u[f[s]]>d?s:d}},{"./common":41}],43:[function(t,c,l){c.exports=function(a,r,o,u){for(var h=65535&a|0,p=a>>>16&65535|0,f=0;o!==0;){for(o-=f=2e3<o?2e3:o;p=p+(h=h+r[u++]|0)|0,--f;);h%=65521,p%=65521}return h|p<<16|0}},{}],44:[function(t,c,l){c.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,c,l){var a=(function(){for(var r,o=[],u=0;u<256;u++){r=u;for(var h=0;h<8;h++)r=1&r?3988292384^r>>>1:r>>>1;o[u]=r}return o})();c.exports=function(r,o,u,h){var p=a,f=h+u;r^=-1;for(var d=h;d<f;d++)r=r>>>8^p[255&(r^o[d])];return-1^r}},{}],46:[function(t,c,l){var a,r=t("../utils/common"),o=t("./trees"),u=t("./adler32"),h=t("./crc32"),p=t("./messages"),f=0,d=4,s=0,b=-2,g=-1,y=4,_=2,v=8,w=9,A=286,C=30,I=19,x=2*A+1,T=15,N=3,P=258,se=P+N+1,S=42,j=113,m=1,$=2,he=3,F=4;function H(i,U){return i.msg=p[U],U}function W(i){return(i<<1)-(4<i?9:0)}function le(i){for(var U=i.length;0<=--U;)i[U]=0}function B(i){var U=i.state,M=U.pending;M>i.avail_out&&(M=i.avail_out),M!==0&&(r.arraySet(i.output,U.pending_buf,U.pending_out,M,i.next_out),i.next_out+=M,U.pending_out+=M,i.total_out+=M,i.avail_out-=M,U.pending-=M,U.pending===0&&(U.pending_out=0))}function R(i,U){o._tr_flush_block(i,0<=i.block_start?i.block_start:-1,i.strstart-i.block_start,U),i.block_start=i.strstart,B(i.strm)}function ae(i,U){i.pending_buf[i.pending++]=U}function te(i,U){i.pending_buf[i.pending++]=U>>>8&255,i.pending_buf[i.pending++]=255&U}function J(i,U){var M,E,k=i.max_chain_length,L=i.strstart,q=i.prev_length,Q=i.nice_match,z=i.strstart>i.w_size-se?i.strstart-(i.w_size-se):0,Y=i.window,oe=i.w_mask,ee=i.prev,fe=i.strstart+P,ke=Y[L+q-1],_e=Y[L+q];i.prev_length>=i.good_match&&(k>>=2),Q>i.lookahead&&(Q=i.lookahead);do if(Y[(M=U)+q]===_e&&Y[M+q-1]===ke&&Y[M]===Y[L]&&Y[++M]===Y[L+1]){L+=2,M++;do;while(Y[++L]===Y[++M]&&Y[++L]===Y[++M]&&Y[++L]===Y[++M]&&Y[++L]===Y[++M]&&Y[++L]===Y[++M]&&Y[++L]===Y[++M]&&Y[++L]===Y[++M]&&Y[++L]===Y[++M]&&L<fe);if(E=P-(fe-L),L=fe-P,q<E){if(i.match_start=U,Q<=(q=E))break;ke=Y[L+q-1],_e=Y[L+q]}}while((U=ee[U&oe])>z&&--k!=0);return q<=i.lookahead?q:i.lookahead}function xe(i){var U,M,E,k,L,q,Q,z,Y,oe,ee=i.w_size;do{if(k=i.window_size-i.lookahead-i.strstart,i.strstart>=ee+(ee-se)){for(r.arraySet(i.window,i.window,ee,ee,0),i.match_start-=ee,i.strstart-=ee,i.block_start-=ee,U=M=i.hash_size;E=i.head[--U],i.head[U]=ee<=E?E-ee:0,--M;);for(U=M=ee;E=i.prev[--U],i.prev[U]=ee<=E?E-ee:0,--M;);k+=ee}if(i.strm.avail_in===0)break;if(q=i.strm,Q=i.window,z=i.strstart+i.lookahead,Y=k,oe=void 0,oe=q.avail_in,Y<oe&&(oe=Y),M=oe===0?0:(q.avail_in-=oe,r.arraySet(Q,q.input,q.next_in,oe,z),q.state.wrap===1?q.adler=u(q.adler,Q,oe,z):q.state.wrap===2&&(q.adler=h(q.adler,Q,oe,z)),q.next_in+=oe,q.total_in+=oe,oe),i.lookahead+=M,i.lookahead+i.insert>=N)for(L=i.strstart-i.insert,i.ins_h=i.window[L],i.ins_h=(i.ins_h<<i.hash_shift^i.window[L+1])&i.hash_mask;i.insert&&(i.ins_h=(i.ins_h<<i.hash_shift^i.window[L+N-1])&i.hash_mask,i.prev[L&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=L,L++,i.insert--,!(i.lookahead+i.insert<N)););}while(i.lookahead<se&&i.strm.avail_in!==0)}function V(i,U){for(var M,E;;){if(i.lookahead<se){if(xe(i),i.lookahead<se&&U===f)return m;if(i.lookahead===0)break}if(M=0,i.lookahead>=N&&(i.ins_h=(i.ins_h<<i.hash_shift^i.window[i.strstart+N-1])&i.hash_mask,M=i.prev[i.strstart&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=i.strstart),M!==0&&i.strstart-M<=i.w_size-se&&(i.match_length=J(i,M)),i.match_length>=N)if(E=o._tr_tally(i,i.strstart-i.match_start,i.match_length-N),i.lookahead-=i.match_length,i.match_length<=i.max_lazy_match&&i.lookahead>=N){for(i.match_length--;i.strstart++,i.ins_h=(i.ins_h<<i.hash_shift^i.window[i.strstart+N-1])&i.hash_mask,M=i.prev[i.strstart&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=i.strstart,--i.match_length!=0;);i.strstart++}else i.strstart+=i.match_length,i.match_length=0,i.ins_h=i.window[i.strstart],i.ins_h=(i.ins_h<<i.hash_shift^i.window[i.strstart+1])&i.hash_mask;else E=o._tr_tally(i,0,i.window[i.strstart]),i.lookahead--,i.strstart++;if(E&&(R(i,!1),i.strm.avail_out===0))return m}return i.insert=i.strstart<N-1?i.strstart:N-1,U===d?(R(i,!0),i.strm.avail_out===0?he:F):i.last_lit&&(R(i,!1),i.strm.avail_out===0)?m:$}function Z(i,U){for(var M,E,k;;){if(i.lookahead<se){if(xe(i),i.lookahead<se&&U===f)return m;if(i.lookahead===0)break}if(M=0,i.lookahead>=N&&(i.ins_h=(i.ins_h<<i.hash_shift^i.window[i.strstart+N-1])&i.hash_mask,M=i.prev[i.strstart&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=i.strstart),i.prev_length=i.match_length,i.prev_match=i.match_start,i.match_length=N-1,M!==0&&i.prev_length<i.max_lazy_match&&i.strstart-M<=i.w_size-se&&(i.match_length=J(i,M),i.match_length<=5&&(i.strategy===1||i.match_length===N&&4096<i.strstart-i.match_start)&&(i.match_length=N-1)),i.prev_length>=N&&i.match_length<=i.prev_length){for(k=i.strstart+i.lookahead-N,E=o._tr_tally(i,i.strstart-1-i.prev_match,i.prev_length-N),i.lookahead-=i.prev_length-1,i.prev_length-=2;++i.strstart<=k&&(i.ins_h=(i.ins_h<<i.hash_shift^i.window[i.strstart+N-1])&i.hash_mask,M=i.prev[i.strstart&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=i.strstart),--i.prev_length!=0;);if(i.match_available=0,i.match_length=N-1,i.strstart++,E&&(R(i,!1),i.strm.avail_out===0))return m}else if(i.match_available){if((E=o._tr_tally(i,0,i.window[i.strstart-1]))&&R(i,!1),i.strstart++,i.lookahead--,i.strm.avail_out===0)return m}else i.match_available=1,i.strstart++,i.lookahead--}return i.match_available&&(E=o._tr_tally(i,0,i.window[i.strstart-1]),i.match_available=0),i.insert=i.strstart<N-1?i.strstart:N-1,U===d?(R(i,!0),i.strm.avail_out===0?he:F):i.last_lit&&(R(i,!1),i.strm.avail_out===0)?m:$}function G(i,U,M,E,k){this.good_length=i,this.max_lazy=U,this.nice_length=M,this.max_chain=E,this.func=k}function ie(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new r.Buf16(2*x),this.dyn_dtree=new r.Buf16(2*(2*C+1)),this.bl_tree=new r.Buf16(2*(2*I+1)),le(this.dyn_ltree),le(this.dyn_dtree),le(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new r.Buf16(T+1),this.heap=new r.Buf16(2*A+1),le(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new r.Buf16(2*A+1),le(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function ce(i){var U;return i&&i.state?(i.total_in=i.total_out=0,i.data_type=_,(U=i.state).pending=0,U.pending_out=0,U.wrap<0&&(U.wrap=-U.wrap),U.status=U.wrap?S:j,i.adler=U.wrap===2?0:1,U.last_flush=f,o._tr_init(U),s):H(i,b)}function ve(i){var U=ce(i);return U===s&&(function(M){M.window_size=2*M.w_size,le(M.head),M.max_lazy_match=a[M.level].max_lazy,M.good_match=a[M.level].good_length,M.nice_match=a[M.level].nice_length,M.max_chain_length=a[M.level].max_chain,M.strstart=0,M.block_start=0,M.lookahead=0,M.insert=0,M.match_length=M.prev_length=N-1,M.match_available=0,M.ins_h=0})(i.state),U}function pe(i,U,M,E,k,L){if(!i)return b;var q=1;if(U===g&&(U=6),E<0?(q=0,E=-E):15<E&&(q=2,E-=16),k<1||w<k||M!==v||E<8||15<E||U<0||9<U||L<0||y<L)return H(i,b);E===8&&(E=9);var Q=new ie;return(i.state=Q).strm=i,Q.wrap=q,Q.gzhead=null,Q.w_bits=E,Q.w_size=1<<Q.w_bits,Q.w_mask=Q.w_size-1,Q.hash_bits=k+7,Q.hash_size=1<<Q.hash_bits,Q.hash_mask=Q.hash_size-1,Q.hash_shift=~~((Q.hash_bits+N-1)/N),Q.window=new r.Buf8(2*Q.w_size),Q.head=new r.Buf16(Q.hash_size),Q.prev=new r.Buf16(Q.w_size),Q.lit_bufsize=1<<k+6,Q.pending_buf_size=4*Q.lit_bufsize,Q.pending_buf=new r.Buf8(Q.pending_buf_size),Q.d_buf=1*Q.lit_bufsize,Q.l_buf=3*Q.lit_bufsize,Q.level=U,Q.strategy=L,Q.method=M,ve(i)}a=[new G(0,0,0,0,function(i,U){var M=65535;for(M>i.pending_buf_size-5&&(M=i.pending_buf_size-5);;){if(i.lookahead<=1){if(xe(i),i.lookahead===0&&U===f)return m;if(i.lookahead===0)break}i.strstart+=i.lookahead,i.lookahead=0;var E=i.block_start+M;if((i.strstart===0||i.strstart>=E)&&(i.lookahead=i.strstart-E,i.strstart=E,R(i,!1),i.strm.avail_out===0)||i.strstart-i.block_start>=i.w_size-se&&(R(i,!1),i.strm.avail_out===0))return m}return i.insert=0,U===d?(R(i,!0),i.strm.avail_out===0?he:F):(i.strstart>i.block_start&&(R(i,!1),i.strm.avail_out),m)}),new G(4,4,8,4,V),new G(4,5,16,8,V),new G(4,6,32,32,V),new G(4,4,16,16,Z),new G(8,16,32,32,Z),new G(8,16,128,128,Z),new G(8,32,128,256,Z),new G(32,128,258,1024,Z),new G(32,258,258,4096,Z)],l.deflateInit=function(i,U){return pe(i,U,v,15,8,0)},l.deflateInit2=pe,l.deflateReset=ve,l.deflateResetKeep=ce,l.deflateSetHeader=function(i,U){return i&&i.state?i.state.wrap!==2?b:(i.state.gzhead=U,s):b},l.deflate=function(i,U){var M,E,k,L;if(!i||!i.state||5<U||U<0)return i?H(i,b):b;if(E=i.state,!i.output||!i.input&&i.avail_in!==0||E.status===666&&U!==d)return H(i,i.avail_out===0?-5:b);if(E.strm=i,M=E.last_flush,E.last_flush=U,E.status===S)if(E.wrap===2)i.adler=0,ae(E,31),ae(E,139),ae(E,8),E.gzhead?(ae(E,(E.gzhead.text?1:0)+(E.gzhead.hcrc?2:0)+(E.gzhead.extra?4:0)+(E.gzhead.name?8:0)+(E.gzhead.comment?16:0)),ae(E,255&E.gzhead.time),ae(E,E.gzhead.time>>8&255),ae(E,E.gzhead.time>>16&255),ae(E,E.gzhead.time>>24&255),ae(E,E.level===9?2:2<=E.strategy||E.level<2?4:0),ae(E,255&E.gzhead.os),E.gzhead.extra&&E.gzhead.extra.length&&(ae(E,255&E.gzhead.extra.length),ae(E,E.gzhead.extra.length>>8&255)),E.gzhead.hcrc&&(i.adler=h(i.adler,E.pending_buf,E.pending,0)),E.gzindex=0,E.status=69):(ae(E,0),ae(E,0),ae(E,0),ae(E,0),ae(E,0),ae(E,E.level===9?2:2<=E.strategy||E.level<2?4:0),ae(E,3),E.status=j);else{var q=v+(E.w_bits-8<<4)<<8;q|=(2<=E.strategy||E.level<2?0:E.level<6?1:E.level===6?2:3)<<6,E.strstart!==0&&(q|=32),q+=31-q%31,E.status=j,te(E,q),E.strstart!==0&&(te(E,i.adler>>>16),te(E,65535&i.adler)),i.adler=1}if(E.status===69)if(E.gzhead.extra){for(k=E.pending;E.gzindex<(65535&E.gzhead.extra.length)&&(E.pending!==E.pending_buf_size||(E.gzhead.hcrc&&E.pending>k&&(i.adler=h(i.adler,E.pending_buf,E.pending-k,k)),B(i),k=E.pending,E.pending!==E.pending_buf_size));)ae(E,255&E.gzhead.extra[E.gzindex]),E.gzindex++;E.gzhead.hcrc&&E.pending>k&&(i.adler=h(i.adler,E.pending_buf,E.pending-k,k)),E.gzindex===E.gzhead.extra.length&&(E.gzindex=0,E.status=73)}else E.status=73;if(E.status===73)if(E.gzhead.name){k=E.pending;do{if(E.pending===E.pending_buf_size&&(E.gzhead.hcrc&&E.pending>k&&(i.adler=h(i.adler,E.pending_buf,E.pending-k,k)),B(i),k=E.pending,E.pending===E.pending_buf_size)){L=1;break}L=E.gzindex<E.gzhead.name.length?255&E.gzhead.name.charCodeAt(E.gzindex++):0,ae(E,L)}while(L!==0);E.gzhead.hcrc&&E.pending>k&&(i.adler=h(i.adler,E.pending_buf,E.pending-k,k)),L===0&&(E.gzindex=0,E.status=91)}else E.status=91;if(E.status===91)if(E.gzhead.comment){k=E.pending;do{if(E.pending===E.pending_buf_size&&(E.gzhead.hcrc&&E.pending>k&&(i.adler=h(i.adler,E.pending_buf,E.pending-k,k)),B(i),k=E.pending,E.pending===E.pending_buf_size)){L=1;break}L=E.gzindex<E.gzhead.comment.length?255&E.gzhead.comment.charCodeAt(E.gzindex++):0,ae(E,L)}while(L!==0);E.gzhead.hcrc&&E.pending>k&&(i.adler=h(i.adler,E.pending_buf,E.pending-k,k)),L===0&&(E.status=103)}else E.status=103;if(E.status===103&&(E.gzhead.hcrc?(E.pending+2>E.pending_buf_size&&B(i),E.pending+2<=E.pending_buf_size&&(ae(E,255&i.adler),ae(E,i.adler>>8&255),i.adler=0,E.status=j)):E.status=j),E.pending!==0){if(B(i),i.avail_out===0)return E.last_flush=-1,s}else if(i.avail_in===0&&W(U)<=W(M)&&U!==d)return H(i,-5);if(E.status===666&&i.avail_in!==0)return H(i,-5);if(i.avail_in!==0||E.lookahead!==0||U!==f&&E.status!==666){var Q=E.strategy===2?(function(z,Y){for(var oe;;){if(z.lookahead===0&&(xe(z),z.lookahead===0)){if(Y===f)return m;break}if(z.match_length=0,oe=o._tr_tally(z,0,z.window[z.strstart]),z.lookahead--,z.strstart++,oe&&(R(z,!1),z.strm.avail_out===0))return m}return z.insert=0,Y===d?(R(z,!0),z.strm.avail_out===0?he:F):z.last_lit&&(R(z,!1),z.strm.avail_out===0)?m:$})(E,U):E.strategy===3?(function(z,Y){for(var oe,ee,fe,ke,_e=z.window;;){if(z.lookahead<=P){if(xe(z),z.lookahead<=P&&Y===f)return m;if(z.lookahead===0)break}if(z.match_length=0,z.lookahead>=N&&0<z.strstart&&(ee=_e[fe=z.strstart-1])===_e[++fe]&&ee===_e[++fe]&&ee===_e[++fe]){ke=z.strstart+P;do;while(ee===_e[++fe]&&ee===_e[++fe]&&ee===_e[++fe]&&ee===_e[++fe]&&ee===_e[++fe]&&ee===_e[++fe]&&ee===_e[++fe]&&ee===_e[++fe]&&fe<ke);z.match_length=P-(ke-fe),z.match_length>z.lookahead&&(z.match_length=z.lookahead)}if(z.match_length>=N?(oe=o._tr_tally(z,1,z.match_length-N),z.lookahead-=z.match_length,z.strstart+=z.match_length,z.match_length=0):(oe=o._tr_tally(z,0,z.window[z.strstart]),z.lookahead--,z.strstart++),oe&&(R(z,!1),z.strm.avail_out===0))return m}return z.insert=0,Y===d?(R(z,!0),z.strm.avail_out===0?he:F):z.last_lit&&(R(z,!1),z.strm.avail_out===0)?m:$})(E,U):a[E.level].func(E,U);if(Q!==he&&Q!==F||(E.status=666),Q===m||Q===he)return i.avail_out===0&&(E.last_flush=-1),s;if(Q===$&&(U===1?o._tr_align(E):U!==5&&(o._tr_stored_block(E,0,0,!1),U===3&&(le(E.head),E.lookahead===0&&(E.strstart=0,E.block_start=0,E.insert=0))),B(i),i.avail_out===0))return E.last_flush=-1,s}return U!==d?s:E.wrap<=0?1:(E.wrap===2?(ae(E,255&i.adler),ae(E,i.adler>>8&255),ae(E,i.adler>>16&255),ae(E,i.adler>>24&255),ae(E,255&i.total_in),ae(E,i.total_in>>8&255),ae(E,i.total_in>>16&255),ae(E,i.total_in>>24&255)):(te(E,i.adler>>>16),te(E,65535&i.adler)),B(i),0<E.wrap&&(E.wrap=-E.wrap),E.pending!==0?s:1)},l.deflateEnd=function(i){var U;return i&&i.state?(U=i.state.status)!==S&&U!==69&&U!==73&&U!==91&&U!==103&&U!==j&&U!==666?H(i,b):(i.state=null,U===j?H(i,-3):s):b},l.deflateSetDictionary=function(i,U){var M,E,k,L,q,Q,z,Y,oe=U.length;if(!i||!i.state||(L=(M=i.state).wrap)===2||L===1&&M.status!==S||M.lookahead)return b;for(L===1&&(i.adler=u(i.adler,U,oe,0)),M.wrap=0,oe>=M.w_size&&(L===0&&(le(M.head),M.strstart=0,M.block_start=0,M.insert=0),Y=new r.Buf8(M.w_size),r.arraySet(Y,U,oe-M.w_size,M.w_size,0),U=Y,oe=M.w_size),q=i.avail_in,Q=i.next_in,z=i.input,i.avail_in=oe,i.next_in=0,i.input=U,xe(M);M.lookahead>=N;){for(E=M.strstart,k=M.lookahead-(N-1);M.ins_h=(M.ins_h<<M.hash_shift^M.window[E+N-1])&M.hash_mask,M.prev[E&M.w_mask]=M.head[M.ins_h],M.head[M.ins_h]=E,E++,--k;);M.strstart=E,M.lookahead=N-1,xe(M)}return M.strstart+=M.lookahead,M.block_start=M.strstart,M.insert=M.lookahead,M.lookahead=0,M.match_length=M.prev_length=N-1,M.match_available=0,i.next_in=Q,i.input=z,i.avail_in=q,M.wrap=L,s},l.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,c,l){c.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,c,l){c.exports=function(a,r){var o,u,h,p,f,d,s,b,g,y,_,v,w,A,C,I,x,T,N,P,se,S,j,m,$;o=a.state,u=a.next_in,m=a.input,h=u+(a.avail_in-5),p=a.next_out,$=a.output,f=p-(r-a.avail_out),d=p+(a.avail_out-257),s=o.dmax,b=o.wsize,g=o.whave,y=o.wnext,_=o.window,v=o.hold,w=o.bits,A=o.lencode,C=o.distcode,I=(1<<o.lenbits)-1,x=(1<<o.distbits)-1;e:do{w<15&&(v+=m[u++]<<w,w+=8,v+=m[u++]<<w,w+=8),T=A[v&I];t:for(;;){if(v>>>=N=T>>>24,w-=N,(N=T>>>16&255)===0)$[p++]=65535&T;else{if(!(16&N)){if((64&N)==0){T=A[(65535&T)+(v&(1<<N)-1)];continue t}if(32&N){o.mode=12;break e}a.msg="invalid literal/length code",o.mode=30;break e}P=65535&T,(N&=15)&&(w<N&&(v+=m[u++]<<w,w+=8),P+=v&(1<<N)-1,v>>>=N,w-=N),w<15&&(v+=m[u++]<<w,w+=8,v+=m[u++]<<w,w+=8),T=C[v&x];n:for(;;){if(v>>>=N=T>>>24,w-=N,!(16&(N=T>>>16&255))){if((64&N)==0){T=C[(65535&T)+(v&(1<<N)-1)];continue n}a.msg="invalid distance code",o.mode=30;break e}if(se=65535&T,w<(N&=15)&&(v+=m[u++]<<w,(w+=8)<N&&(v+=m[u++]<<w,w+=8)),s<(se+=v&(1<<N)-1)){a.msg="invalid distance too far back",o.mode=30;break e}if(v>>>=N,w-=N,(N=p-f)<se){if(g<(N=se-N)&&o.sane){a.msg="invalid distance too far back",o.mode=30;break e}if(j=_,(S=0)===y){if(S+=b-N,N<P){for(P-=N;$[p++]=_[S++],--N;);S=p-se,j=$}}else if(y<N){if(S+=b+y-N,(N-=y)<P){for(P-=N;$[p++]=_[S++],--N;);if(S=0,y<P){for(P-=N=y;$[p++]=_[S++],--N;);S=p-se,j=$}}}else if(S+=y-N,N<P){for(P-=N;$[p++]=_[S++],--N;);S=p-se,j=$}for(;2<P;)$[p++]=j[S++],$[p++]=j[S++],$[p++]=j[S++],P-=3;P&&($[p++]=j[S++],1<P&&($[p++]=j[S++]))}else{for(S=p-se;$[p++]=$[S++],$[p++]=$[S++],$[p++]=$[S++],2<(P-=3););P&&($[p++]=$[S++],1<P&&($[p++]=$[S++]))}break}}break}}while(u<h&&p<d);u-=P=w>>3,v&=(1<<(w-=P<<3))-1,a.next_in=u,a.next_out=p,a.avail_in=u<h?h-u+5:5-(u-h),a.avail_out=p<d?d-p+257:257-(p-d),o.hold=v,o.bits=w}},{}],49:[function(t,c,l){var a=t("../utils/common"),r=t("./adler32"),o=t("./crc32"),u=t("./inffast"),h=t("./inftrees"),p=1,f=2,d=0,s=-2,b=1,g=852,y=592;function _(S){return(S>>>24&255)+(S>>>8&65280)+((65280&S)<<8)+((255&S)<<24)}function v(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new a.Buf16(320),this.work=new a.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function w(S){var j;return S&&S.state?(j=S.state,S.total_in=S.total_out=j.total=0,S.msg="",j.wrap&&(S.adler=1&j.wrap),j.mode=b,j.last=0,j.havedict=0,j.dmax=32768,j.head=null,j.hold=0,j.bits=0,j.lencode=j.lendyn=new a.Buf32(g),j.distcode=j.distdyn=new a.Buf32(y),j.sane=1,j.back=-1,d):s}function A(S){var j;return S&&S.state?((j=S.state).wsize=0,j.whave=0,j.wnext=0,w(S)):s}function C(S,j){var m,$;return S&&S.state?($=S.state,j<0?(m=0,j=-j):(m=1+(j>>4),j<48&&(j&=15)),j&&(j<8||15<j)?s:($.window!==null&&$.wbits!==j&&($.window=null),$.wrap=m,$.wbits=j,A(S))):s}function I(S,j){var m,$;return S?($=new v,(S.state=$).window=null,(m=C(S,j))!==d&&(S.state=null),m):s}var x,T,N=!0;function P(S){if(N){var j;for(x=new a.Buf32(512),T=new a.Buf32(32),j=0;j<144;)S.lens[j++]=8;for(;j<256;)S.lens[j++]=9;for(;j<280;)S.lens[j++]=7;for(;j<288;)S.lens[j++]=8;for(h(p,S.lens,0,288,x,0,S.work,{bits:9}),j=0;j<32;)S.lens[j++]=5;h(f,S.lens,0,32,T,0,S.work,{bits:5}),N=!1}S.lencode=x,S.lenbits=9,S.distcode=T,S.distbits=5}function se(S,j,m,$){var he,F=S.state;return F.window===null&&(F.wsize=1<<F.wbits,F.wnext=0,F.whave=0,F.window=new a.Buf8(F.wsize)),$>=F.wsize?(a.arraySet(F.window,j,m-F.wsize,F.wsize,0),F.wnext=0,F.whave=F.wsize):($<(he=F.wsize-F.wnext)&&(he=$),a.arraySet(F.window,j,m-$,he,F.wnext),($-=he)?(a.arraySet(F.window,j,m-$,$,0),F.wnext=$,F.whave=F.wsize):(F.wnext+=he,F.wnext===F.wsize&&(F.wnext=0),F.whave<F.wsize&&(F.whave+=he))),0}l.inflateReset=A,l.inflateReset2=C,l.inflateResetKeep=w,l.inflateInit=function(S){return I(S,15)},l.inflateInit2=I,l.inflate=function(S,j){var m,$,he,F,H,W,le,B,R,ae,te,J,xe,V,Z,G,ie,ce,ve,pe,i,U,M,E,k=0,L=new a.Buf8(4),q=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!S||!S.state||!S.output||!S.input&&S.avail_in!==0)return s;(m=S.state).mode===12&&(m.mode=13),H=S.next_out,he=S.output,le=S.avail_out,F=S.next_in,$=S.input,W=S.avail_in,B=m.hold,R=m.bits,ae=W,te=le,U=d;e:for(;;)switch(m.mode){case b:if(m.wrap===0){m.mode=13;break}for(;R<16;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if(2&m.wrap&&B===35615){L[m.check=0]=255&B,L[1]=B>>>8&255,m.check=o(m.check,L,2,0),R=B=0,m.mode=2;break}if(m.flags=0,m.head&&(m.head.done=!1),!(1&m.wrap)||(((255&B)<<8)+(B>>8))%31){S.msg="incorrect header check",m.mode=30;break}if((15&B)!=8){S.msg="unknown compression method",m.mode=30;break}if(R-=4,i=8+(15&(B>>>=4)),m.wbits===0)m.wbits=i;else if(i>m.wbits){S.msg="invalid window size",m.mode=30;break}m.dmax=1<<i,S.adler=m.check=1,m.mode=512&B?10:12,R=B=0;break;case 2:for(;R<16;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if(m.flags=B,(255&m.flags)!=8){S.msg="unknown compression method",m.mode=30;break}if(57344&m.flags){S.msg="unknown header flags set",m.mode=30;break}m.head&&(m.head.text=B>>8&1),512&m.flags&&(L[0]=255&B,L[1]=B>>>8&255,m.check=o(m.check,L,2,0)),R=B=0,m.mode=3;case 3:for(;R<32;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}m.head&&(m.head.time=B),512&m.flags&&(L[0]=255&B,L[1]=B>>>8&255,L[2]=B>>>16&255,L[3]=B>>>24&255,m.check=o(m.check,L,4,0)),R=B=0,m.mode=4;case 4:for(;R<16;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}m.head&&(m.head.xflags=255&B,m.head.os=B>>8),512&m.flags&&(L[0]=255&B,L[1]=B>>>8&255,m.check=o(m.check,L,2,0)),R=B=0,m.mode=5;case 5:if(1024&m.flags){for(;R<16;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}m.length=B,m.head&&(m.head.extra_len=B),512&m.flags&&(L[0]=255&B,L[1]=B>>>8&255,m.check=o(m.check,L,2,0)),R=B=0}else m.head&&(m.head.extra=null);m.mode=6;case 6:if(1024&m.flags&&(W<(J=m.length)&&(J=W),J&&(m.head&&(i=m.head.extra_len-m.length,m.head.extra||(m.head.extra=new Array(m.head.extra_len)),a.arraySet(m.head.extra,$,F,J,i)),512&m.flags&&(m.check=o(m.check,$,J,F)),W-=J,F+=J,m.length-=J),m.length))break e;m.length=0,m.mode=7;case 7:if(2048&m.flags){if(W===0)break e;for(J=0;i=$[F+J++],m.head&&i&&m.length<65536&&(m.head.name+=String.fromCharCode(i)),i&&J<W;);if(512&m.flags&&(m.check=o(m.check,$,J,F)),W-=J,F+=J,i)break e}else m.head&&(m.head.name=null);m.length=0,m.mode=8;case 8:if(4096&m.flags){if(W===0)break e;for(J=0;i=$[F+J++],m.head&&i&&m.length<65536&&(m.head.comment+=String.fromCharCode(i)),i&&J<W;);if(512&m.flags&&(m.check=o(m.check,$,J,F)),W-=J,F+=J,i)break e}else m.head&&(m.head.comment=null);m.mode=9;case 9:if(512&m.flags){for(;R<16;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if(B!==(65535&m.check)){S.msg="header crc mismatch",m.mode=30;break}R=B=0}m.head&&(m.head.hcrc=m.flags>>9&1,m.head.done=!0),S.adler=m.check=0,m.mode=12;break;case 10:for(;R<32;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}S.adler=m.check=_(B),R=B=0,m.mode=11;case 11:if(m.havedict===0)return S.next_out=H,S.avail_out=le,S.next_in=F,S.avail_in=W,m.hold=B,m.bits=R,2;S.adler=m.check=1,m.mode=12;case 12:if(j===5||j===6)break e;case 13:if(m.last){B>>>=7&R,R-=7&R,m.mode=27;break}for(;R<3;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}switch(m.last=1&B,R-=1,3&(B>>>=1)){case 0:m.mode=14;break;case 1:if(P(m),m.mode=20,j!==6)break;B>>>=2,R-=2;break e;case 2:m.mode=17;break;case 3:S.msg="invalid block type",m.mode=30}B>>>=2,R-=2;break;case 14:for(B>>>=7&R,R-=7&R;R<32;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if((65535&B)!=(B>>>16^65535)){S.msg="invalid stored block lengths",m.mode=30;break}if(m.length=65535&B,R=B=0,m.mode=15,j===6)break e;case 15:m.mode=16;case 16:if(J=m.length){if(W<J&&(J=W),le<J&&(J=le),J===0)break e;a.arraySet(he,$,F,J,H),W-=J,F+=J,le-=J,H+=J,m.length-=J;break}m.mode=12;break;case 17:for(;R<14;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if(m.nlen=257+(31&B),B>>>=5,R-=5,m.ndist=1+(31&B),B>>>=5,R-=5,m.ncode=4+(15&B),B>>>=4,R-=4,286<m.nlen||30<m.ndist){S.msg="too many length or distance symbols",m.mode=30;break}m.have=0,m.mode=18;case 18:for(;m.have<m.ncode;){for(;R<3;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}m.lens[q[m.have++]]=7&B,B>>>=3,R-=3}for(;m.have<19;)m.lens[q[m.have++]]=0;if(m.lencode=m.lendyn,m.lenbits=7,M={bits:m.lenbits},U=h(0,m.lens,0,19,m.lencode,0,m.work,M),m.lenbits=M.bits,U){S.msg="invalid code lengths set",m.mode=30;break}m.have=0,m.mode=19;case 19:for(;m.have<m.nlen+m.ndist;){for(;G=(k=m.lencode[B&(1<<m.lenbits)-1])>>>16&255,ie=65535&k,!((Z=k>>>24)<=R);){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if(ie<16)B>>>=Z,R-=Z,m.lens[m.have++]=ie;else{if(ie===16){for(E=Z+2;R<E;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if(B>>>=Z,R-=Z,m.have===0){S.msg="invalid bit length repeat",m.mode=30;break}i=m.lens[m.have-1],J=3+(3&B),B>>>=2,R-=2}else if(ie===17){for(E=Z+3;R<E;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}R-=Z,i=0,J=3+(7&(B>>>=Z)),B>>>=3,R-=3}else{for(E=Z+7;R<E;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}R-=Z,i=0,J=11+(127&(B>>>=Z)),B>>>=7,R-=7}if(m.have+J>m.nlen+m.ndist){S.msg="invalid bit length repeat",m.mode=30;break}for(;J--;)m.lens[m.have++]=i}}if(m.mode===30)break;if(m.lens[256]===0){S.msg="invalid code -- missing end-of-block",m.mode=30;break}if(m.lenbits=9,M={bits:m.lenbits},U=h(p,m.lens,0,m.nlen,m.lencode,0,m.work,M),m.lenbits=M.bits,U){S.msg="invalid literal/lengths set",m.mode=30;break}if(m.distbits=6,m.distcode=m.distdyn,M={bits:m.distbits},U=h(f,m.lens,m.nlen,m.ndist,m.distcode,0,m.work,M),m.distbits=M.bits,U){S.msg="invalid distances set",m.mode=30;break}if(m.mode=20,j===6)break e;case 20:m.mode=21;case 21:if(6<=W&&258<=le){S.next_out=H,S.avail_out=le,S.next_in=F,S.avail_in=W,m.hold=B,m.bits=R,u(S,te),H=S.next_out,he=S.output,le=S.avail_out,F=S.next_in,$=S.input,W=S.avail_in,B=m.hold,R=m.bits,m.mode===12&&(m.back=-1);break}for(m.back=0;G=(k=m.lencode[B&(1<<m.lenbits)-1])>>>16&255,ie=65535&k,!((Z=k>>>24)<=R);){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if(G&&(240&G)==0){for(ce=Z,ve=G,pe=ie;G=(k=m.lencode[pe+((B&(1<<ce+ve)-1)>>ce)])>>>16&255,ie=65535&k,!(ce+(Z=k>>>24)<=R);){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}B>>>=ce,R-=ce,m.back+=ce}if(B>>>=Z,R-=Z,m.back+=Z,m.length=ie,G===0){m.mode=26;break}if(32&G){m.back=-1,m.mode=12;break}if(64&G){S.msg="invalid literal/length code",m.mode=30;break}m.extra=15&G,m.mode=22;case 22:if(m.extra){for(E=m.extra;R<E;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}m.length+=B&(1<<m.extra)-1,B>>>=m.extra,R-=m.extra,m.back+=m.extra}m.was=m.length,m.mode=23;case 23:for(;G=(k=m.distcode[B&(1<<m.distbits)-1])>>>16&255,ie=65535&k,!((Z=k>>>24)<=R);){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if((240&G)==0){for(ce=Z,ve=G,pe=ie;G=(k=m.distcode[pe+((B&(1<<ce+ve)-1)>>ce)])>>>16&255,ie=65535&k,!(ce+(Z=k>>>24)<=R);){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}B>>>=ce,R-=ce,m.back+=ce}if(B>>>=Z,R-=Z,m.back+=Z,64&G){S.msg="invalid distance code",m.mode=30;break}m.offset=ie,m.extra=15&G,m.mode=24;case 24:if(m.extra){for(E=m.extra;R<E;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}m.offset+=B&(1<<m.extra)-1,B>>>=m.extra,R-=m.extra,m.back+=m.extra}if(m.offset>m.dmax){S.msg="invalid distance too far back",m.mode=30;break}m.mode=25;case 25:if(le===0)break e;if(J=te-le,m.offset>J){if((J=m.offset-J)>m.whave&&m.sane){S.msg="invalid distance too far back",m.mode=30;break}xe=J>m.wnext?(J-=m.wnext,m.wsize-J):m.wnext-J,J>m.length&&(J=m.length),V=m.window}else V=he,xe=H-m.offset,J=m.length;for(le<J&&(J=le),le-=J,m.length-=J;he[H++]=V[xe++],--J;);m.length===0&&(m.mode=21);break;case 26:if(le===0)break e;he[H++]=m.length,le--,m.mode=21;break;case 27:if(m.wrap){for(;R<32;){if(W===0)break e;W--,B|=$[F++]<<R,R+=8}if(te-=le,S.total_out+=te,m.total+=te,te&&(S.adler=m.check=m.flags?o(m.check,he,te,H-te):r(m.check,he,te,H-te)),te=le,(m.flags?B:_(B))!==m.check){S.msg="incorrect data check",m.mode=30;break}R=B=0}m.mode=28;case 28:if(m.wrap&&m.flags){for(;R<32;){if(W===0)break e;W--,B+=$[F++]<<R,R+=8}if(B!==(4294967295&m.total)){S.msg="incorrect length check",m.mode=30;break}R=B=0}m.mode=29;case 29:U=1;break e;case 30:U=-3;break e;case 31:return-4;case 32:default:return s}return S.next_out=H,S.avail_out=le,S.next_in=F,S.avail_in=W,m.hold=B,m.bits=R,(m.wsize||te!==S.avail_out&&m.mode<30&&(m.mode<27||j!==4))&&se(S,S.output,S.next_out,te-S.avail_out)?(m.mode=31,-4):(ae-=S.avail_in,te-=S.avail_out,S.total_in+=ae,S.total_out+=te,m.total+=te,m.wrap&&te&&(S.adler=m.check=m.flags?o(m.check,he,te,S.next_out-te):r(m.check,he,te,S.next_out-te)),S.data_type=m.bits+(m.last?64:0)+(m.mode===12?128:0)+(m.mode===20||m.mode===15?256:0),(ae==0&&te===0||j===4)&&U===d&&(U=-5),U)},l.inflateEnd=function(S){if(!S||!S.state)return s;var j=S.state;return j.window&&(j.window=null),S.state=null,d},l.inflateGetHeader=function(S,j){var m;return S&&S.state?(2&(m=S.state).wrap)==0?s:((m.head=j).done=!1,d):s},l.inflateSetDictionary=function(S,j){var m,$=j.length;return S&&S.state?(m=S.state).wrap!==0&&m.mode!==11?s:m.mode===11&&r(1,j,$,0)!==m.check?-3:se(S,j,$,$)?(m.mode=31,-4):(m.havedict=1,d):s},l.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,c,l){var a=t("../utils/common"),r=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],o=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];c.exports=function(p,f,d,s,b,g,y,_){var v,w,A,C,I,x,T,N,P,se=_.bits,S=0,j=0,m=0,$=0,he=0,F=0,H=0,W=0,le=0,B=0,R=null,ae=0,te=new a.Buf16(16),J=new a.Buf16(16),xe=null,V=0;for(S=0;S<=15;S++)te[S]=0;for(j=0;j<s;j++)te[f[d+j]]++;for(he=se,$=15;1<=$&&te[$]===0;$--);if($<he&&(he=$),$===0)return b[g++]=20971520,b[g++]=20971520,_.bits=1,0;for(m=1;m<$&&te[m]===0;m++);for(he<m&&(he=m),S=W=1;S<=15;S++)if(W<<=1,(W-=te[S])<0)return-1;if(0<W&&(p===0||$!==1))return-1;for(J[1]=0,S=1;S<15;S++)J[S+1]=J[S]+te[S];for(j=0;j<s;j++)f[d+j]!==0&&(y[J[f[d+j]]++]=j);if(x=p===0?(R=xe=y,19):p===1?(R=r,ae-=257,xe=o,V-=257,256):(R=u,xe=h,-1),S=m,I=g,H=j=B=0,A=-1,C=(le=1<<(F=he))-1,p===1&&852<le||p===2&&592<le)return 1;for(;;){for(T=S-H,P=y[j]<x?(N=0,y[j]):y[j]>x?(N=xe[V+y[j]],R[ae+y[j]]):(N=96,0),v=1<<S-H,m=w=1<<F;b[I+(B>>H)+(w-=v)]=T<<24|N<<16|P|0,w!==0;);for(v=1<<S-1;B&v;)v>>=1;if(v!==0?(B&=v-1,B+=v):B=0,j++,--te[S]==0){if(S===$)break;S=f[d+y[j]]}if(he<S&&(B&C)!==A){for(H===0&&(H=he),I+=m,W=1<<(F=S-H);F+H<$&&!((W-=te[F+H])<=0);)F++,W<<=1;if(le+=1<<F,p===1&&852<le||p===2&&592<le)return 1;b[A=B&C]=he<<24|F<<16|I-g|0}}return B!==0&&(b[I+B]=S-H<<24|64<<16|0),_.bits=he,0}},{"../utils/common":41}],51:[function(t,c,l){c.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,c,l){var a=t("../utils/common"),r=0,o=1;function u(k){for(var L=k.length;0<=--L;)k[L]=0}var h=0,p=29,f=256,d=f+1+p,s=30,b=19,g=2*d+1,y=15,_=16,v=7,w=256,A=16,C=17,I=18,x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],T=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],N=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],P=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],se=new Array(2*(d+2));u(se);var S=new Array(2*s);u(S);var j=new Array(512);u(j);var m=new Array(256);u(m);var $=new Array(p);u($);var he,F,H,W=new Array(s);function le(k,L,q,Q,z){this.static_tree=k,this.extra_bits=L,this.extra_base=q,this.elems=Q,this.max_length=z,this.has_stree=k&&k.length}function B(k,L){this.dyn_tree=k,this.max_code=0,this.stat_desc=L}function R(k){return k<256?j[k]:j[256+(k>>>7)]}function ae(k,L){k.pending_buf[k.pending++]=255&L,k.pending_buf[k.pending++]=L>>>8&255}function te(k,L,q){k.bi_valid>_-q?(k.bi_buf|=L<<k.bi_valid&65535,ae(k,k.bi_buf),k.bi_buf=L>>_-k.bi_valid,k.bi_valid+=q-_):(k.bi_buf|=L<<k.bi_valid&65535,k.bi_valid+=q)}function J(k,L,q){te(k,q[2*L],q[2*L+1])}function xe(k,L){for(var q=0;q|=1&k,k>>>=1,q<<=1,0<--L;);return q>>>1}function V(k,L,q){var Q,z,Y=new Array(y+1),oe=0;for(Q=1;Q<=y;Q++)Y[Q]=oe=oe+q[Q-1]<<1;for(z=0;z<=L;z++){var ee=k[2*z+1];ee!==0&&(k[2*z]=xe(Y[ee]++,ee))}}function Z(k){var L;for(L=0;L<d;L++)k.dyn_ltree[2*L]=0;for(L=0;L<s;L++)k.dyn_dtree[2*L]=0;for(L=0;L<b;L++)k.bl_tree[2*L]=0;k.dyn_ltree[2*w]=1,k.opt_len=k.static_len=0,k.last_lit=k.matches=0}function G(k){8<k.bi_valid?ae(k,k.bi_buf):0<k.bi_valid&&(k.pending_buf[k.pending++]=k.bi_buf),k.bi_buf=0,k.bi_valid=0}function ie(k,L,q,Q){var z=2*L,Y=2*q;return k[z]<k[Y]||k[z]===k[Y]&&Q[L]<=Q[q]}function ce(k,L,q){for(var Q=k.heap[q],z=q<<1;z<=k.heap_len&&(z<k.heap_len&&ie(L,k.heap[z+1],k.heap[z],k.depth)&&z++,!ie(L,Q,k.heap[z],k.depth));)k.heap[q]=k.heap[z],q=z,z<<=1;k.heap[q]=Q}function ve(k,L,q){var Q,z,Y,oe,ee=0;if(k.last_lit!==0)for(;Q=k.pending_buf[k.d_buf+2*ee]<<8|k.pending_buf[k.d_buf+2*ee+1],z=k.pending_buf[k.l_buf+ee],ee++,Q===0?J(k,z,L):(J(k,(Y=m[z])+f+1,L),(oe=x[Y])!==0&&te(k,z-=$[Y],oe),J(k,Y=R(--Q),q),(oe=T[Y])!==0&&te(k,Q-=W[Y],oe)),ee<k.last_lit;);J(k,w,L)}function pe(k,L){var q,Q,z,Y=L.dyn_tree,oe=L.stat_desc.static_tree,ee=L.stat_desc.has_stree,fe=L.stat_desc.elems,ke=-1;for(k.heap_len=0,k.heap_max=g,q=0;q<fe;q++)Y[2*q]!==0?(k.heap[++k.heap_len]=ke=q,k.depth[q]=0):Y[2*q+1]=0;for(;k.heap_len<2;)Y[2*(z=k.heap[++k.heap_len]=ke<2?++ke:0)]=1,k.depth[z]=0,k.opt_len--,ee&&(k.static_len-=oe[2*z+1]);for(L.max_code=ke,q=k.heap_len>>1;1<=q;q--)ce(k,Y,q);for(z=fe;q=k.heap[1],k.heap[1]=k.heap[k.heap_len--],ce(k,Y,1),Q=k.heap[1],k.heap[--k.heap_max]=q,k.heap[--k.heap_max]=Q,Y[2*z]=Y[2*q]+Y[2*Q],k.depth[z]=(k.depth[q]>=k.depth[Q]?k.depth[q]:k.depth[Q])+1,Y[2*q+1]=Y[2*Q+1]=z,k.heap[1]=z++,ce(k,Y,1),2<=k.heap_len;);k.heap[--k.heap_max]=k.heap[1],(function(_e,Be){var ft,Ve,ht,Ce,Et,Ot,He=Be.dyn_tree,fn=Be.max_code,br=Be.stat_desc.static_tree,_r=Be.stat_desc.has_stree,vr=Be.stat_desc.extra_bits,hn=Be.stat_desc.extra_base,pt=Be.stat_desc.max_length,At=0;for(Ce=0;Ce<=y;Ce++)_e.bl_count[Ce]=0;for(He[2*_e.heap[_e.heap_max]+1]=0,ft=_e.heap_max+1;ft<g;ft++)pt<(Ce=He[2*He[2*(Ve=_e.heap[ft])+1]+1]+1)&&(Ce=pt,At++),He[2*Ve+1]=Ce,fn<Ve||(_e.bl_count[Ce]++,Et=0,hn<=Ve&&(Et=vr[Ve-hn]),Ot=He[2*Ve],_e.opt_len+=Ot*(Ce+Et),_r&&(_e.static_len+=Ot*(br[2*Ve+1]+Et)));if(At!==0){do{for(Ce=pt-1;_e.bl_count[Ce]===0;)Ce--;_e.bl_count[Ce]--,_e.bl_count[Ce+1]+=2,_e.bl_count[pt]--,At-=2}while(0<At);for(Ce=pt;Ce!==0;Ce--)for(Ve=_e.bl_count[Ce];Ve!==0;)fn<(ht=_e.heap[--ft])||(He[2*ht+1]!==Ce&&(_e.opt_len+=(Ce-He[2*ht+1])*He[2*ht],He[2*ht+1]=Ce),Ve--)}})(k,L),V(Y,ke,k.bl_count)}function i(k,L,q){var Q,z,Y=-1,oe=L[1],ee=0,fe=7,ke=4;for(oe===0&&(fe=138,ke=3),L[2*(q+1)+1]=65535,Q=0;Q<=q;Q++)z=oe,oe=L[2*(Q+1)+1],++ee<fe&&z===oe||(ee<ke?k.bl_tree[2*z]+=ee:z!==0?(z!==Y&&k.bl_tree[2*z]++,k.bl_tree[2*A]++):ee<=10?k.bl_tree[2*C]++:k.bl_tree[2*I]++,Y=z,ke=(ee=0)===oe?(fe=138,3):z===oe?(fe=6,3):(fe=7,4))}function U(k,L,q){var Q,z,Y=-1,oe=L[1],ee=0,fe=7,ke=4;for(oe===0&&(fe=138,ke=3),Q=0;Q<=q;Q++)if(z=oe,oe=L[2*(Q+1)+1],!(++ee<fe&&z===oe)){if(ee<ke)for(;J(k,z,k.bl_tree),--ee!=0;);else z!==0?(z!==Y&&(J(k,z,k.bl_tree),ee--),J(k,A,k.bl_tree),te(k,ee-3,2)):ee<=10?(J(k,C,k.bl_tree),te(k,ee-3,3)):(J(k,I,k.bl_tree),te(k,ee-11,7));Y=z,ke=(ee=0)===oe?(fe=138,3):z===oe?(fe=6,3):(fe=7,4)}}u(W);var M=!1;function E(k,L,q,Q){te(k,(h<<1)+(Q?1:0),3),(function(z,Y,oe,ee){G(z),ae(z,oe),ae(z,~oe),a.arraySet(z.pending_buf,z.window,Y,oe,z.pending),z.pending+=oe})(k,L,q)}l._tr_init=function(k){M||((function(){var L,q,Q,z,Y,oe=new Array(y+1);for(z=Q=0;z<p-1;z++)for($[z]=Q,L=0;L<1<<x[z];L++)m[Q++]=z;for(m[Q-1]=z,z=Y=0;z<16;z++)for(W[z]=Y,L=0;L<1<<T[z];L++)j[Y++]=z;for(Y>>=7;z<s;z++)for(W[z]=Y<<7,L=0;L<1<<T[z]-7;L++)j[256+Y++]=z;for(q=0;q<=y;q++)oe[q]=0;for(L=0;L<=143;)se[2*L+1]=8,L++,oe[8]++;for(;L<=255;)se[2*L+1]=9,L++,oe[9]++;for(;L<=279;)se[2*L+1]=7,L++,oe[7]++;for(;L<=287;)se[2*L+1]=8,L++,oe[8]++;for(V(se,d+1,oe),L=0;L<s;L++)S[2*L+1]=5,S[2*L]=xe(L,5);he=new le(se,x,f+1,d,y),F=new le(S,T,0,s,y),H=new le(new Array(0),N,0,b,v)})(),M=!0),k.l_desc=new B(k.dyn_ltree,he),k.d_desc=new B(k.dyn_dtree,F),k.bl_desc=new B(k.bl_tree,H),k.bi_buf=0,k.bi_valid=0,Z(k)},l._tr_stored_block=E,l._tr_flush_block=function(k,L,q,Q){var z,Y,oe=0;0<k.level?(k.strm.data_type===2&&(k.strm.data_type=(function(ee){var fe,ke=4093624447;for(fe=0;fe<=31;fe++,ke>>>=1)if(1&ke&&ee.dyn_ltree[2*fe]!==0)return r;if(ee.dyn_ltree[18]!==0||ee.dyn_ltree[20]!==0||ee.dyn_ltree[26]!==0)return o;for(fe=32;fe<f;fe++)if(ee.dyn_ltree[2*fe]!==0)return o;return r})(k)),pe(k,k.l_desc),pe(k,k.d_desc),oe=(function(ee){var fe;for(i(ee,ee.dyn_ltree,ee.l_desc.max_code),i(ee,ee.dyn_dtree,ee.d_desc.max_code),pe(ee,ee.bl_desc),fe=b-1;3<=fe&&ee.bl_tree[2*P[fe]+1]===0;fe--);return ee.opt_len+=3*(fe+1)+5+5+4,fe})(k),z=k.opt_len+3+7>>>3,(Y=k.static_len+3+7>>>3)<=z&&(z=Y)):z=Y=q+5,q+4<=z&&L!==-1?E(k,L,q,Q):k.strategy===4||Y===z?(te(k,2+(Q?1:0),3),ve(k,se,S)):(te(k,4+(Q?1:0),3),(function(ee,fe,ke,_e){var Be;for(te(ee,fe-257,5),te(ee,ke-1,5),te(ee,_e-4,4),Be=0;Be<_e;Be++)te(ee,ee.bl_tree[2*P[Be]+1],3);U(ee,ee.dyn_ltree,fe-1),U(ee,ee.dyn_dtree,ke-1)})(k,k.l_desc.max_code+1,k.d_desc.max_code+1,oe+1),ve(k,k.dyn_ltree,k.dyn_dtree)),Z(k),Q&&G(k)},l._tr_tally=function(k,L,q){return k.pending_buf[k.d_buf+2*k.last_lit]=L>>>8&255,k.pending_buf[k.d_buf+2*k.last_lit+1]=255&L,k.pending_buf[k.l_buf+k.last_lit]=255&q,k.last_lit++,L===0?k.dyn_ltree[2*q]++:(k.matches++,L--,k.dyn_ltree[2*(m[q]+f+1)]++,k.dyn_dtree[2*R(L)]++),k.last_lit===k.lit_bufsize-1},l._tr_align=function(k){te(k,2,3),J(k,w,se),(function(L){L.bi_valid===16?(ae(L,L.bi_buf),L.bi_buf=0,L.bi_valid=0):8<=L.bi_valid&&(L.pending_buf[L.pending++]=255&L.bi_buf,L.bi_buf>>=8,L.bi_valid-=8)})(k)}},{"../utils/common":41}],53:[function(t,c,l){c.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,c,l){(function(a){(function(r,o){if(!r.setImmediate){var u,h,p,f,d=1,s={},b=!1,g=r.document,y=Object.getPrototypeOf&&Object.getPrototypeOf(r);y=y&&y.setTimeout?y:r,u={}.toString.call(r.process)==="[object process]"?function(A){process.nextTick(function(){v(A)})}:(function(){if(r.postMessage&&!r.importScripts){var A=!0,C=r.onmessage;return r.onmessage=function(){A=!1},r.postMessage("","*"),r.onmessage=C,A}})()?(f="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",w,!1):r.attachEvent("onmessage",w),function(A){r.postMessage(f+A,"*")}):r.MessageChannel?((p=new MessageChannel).port1.onmessage=function(A){v(A.data)},function(A){p.port2.postMessage(A)}):g&&"onreadystatechange"in g.createElement("script")?(h=g.documentElement,function(A){var C=g.createElement("script");C.onreadystatechange=function(){v(A),C.onreadystatechange=null,h.removeChild(C),C=null},h.appendChild(C)}):function(A){setTimeout(v,0,A)},y.setImmediate=function(A){typeof A!="function"&&(A=new Function(""+A));for(var C=new Array(arguments.length-1),I=0;I<C.length;I++)C[I]=arguments[I+1];var x={callback:A,args:C};return s[d]=x,u(d),d++},y.clearImmediate=_}function _(A){delete s[A]}function v(A){if(b)setTimeout(v,0,A);else{var C=s[A];if(C){b=!0;try{(function(I){var x=I.callback,T=I.args;switch(T.length){case 0:x();break;case 1:x(T[0]);break;case 2:x(T[0],T[1]);break;case 3:x(T[0],T[1],T[2]);break;default:x.apply(o,T)}})(C)}finally{_(A),b=!1}}}}function w(A){A.source===r&&typeof A.data=="string"&&A.data.indexOf(f)===0&&v(+A.data.slice(f.length))}})(typeof self>"u"?a===void 0?this:a:self)}).call(this,typeof St<"u"?St:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(Ht)),Ht.exports}var jo=Mo();const Uo=Po(jo);async function Vo(e){const t=(await Uo.loadAsync(e)).file("word/document.xml");if(!t)throw new Error("无效的 Word 文件：缺少 word/document.xml");return await t.async("string")}function $o(e){const n=[],t={};let c;const l=/<w:bookmarkStart\b[^>]*\bw:name="([^"]+)"[^>]*\bw:id="(\d+)"([^>]*)>/g;for(;c=l.exec(e);){const a=c[1];/^_GoBack$/.test(a)||/^_Toc/.test(a)||t[a]||(t[a]=!0,n.push(a))}if(!n.length){const a=/<w:bookmarkStart\b[^>]*\bw:id="(\d+)"[^>]*\bw:name="([^"]+)"([^>]*)>/g;for(;c=a.exec(e);){const r=c[2];/^_GoBack$/.test(r)||/^_Toc/.test(r)||t[r]||(t[r]=!0,n.push(r))}}return n}function Ho(e,n){const t=e.indexOf('w:name="'+n+'"');if(t<0)return"";let c=-1,l;const a=/<w:(tc|p)\b[^>]*>/g;for(;(l=a.exec(e))&&l.index<t;)c=l.index;if(c<0)return"";const r=e.slice(c,t);let o="",u;const h=/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;for(;u=h.exec(r);)o+=u[1];return o.replace(/\s+/g," ").replace(/[：:，。、\s]+$/,"").trim()}function qo(e,n){const t=e.indexOf('w:name="'+n+'"');if(t<0)return[];let c=-1,l;const a=/<w:tbl\b[^>]*>/g;for(;(l=a.exec(e))&&l.index<t;)c=l.index;const r=e.indexOf("</w:tbl>",t);if(c<0||r<0)return[];const o=e.slice(c,r+8),u=/<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/.exec(o);if(!u)return[];const h=u[0],p=[];let f;const d=/<w:tc\b[^>]*>([\s\S]*?)<\/w:tc>/g;for(;f=d.exec(h);){let s="",b;const g=/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;for(;b=g.exec(f[1]);)s+=b[1];s=s.replace(/\s+/g," ").replace(/[：:，。、\s]+$/,"").trim(),s&&p.push({chinese:s})}return p}const Wo={form:{visible:!0,classNames:[],labelClassNames:[],events:[{event:"created",codeItem:{code:`module.exports = async function (params, ctx, block) {
  debugger;
  const gcmc = ctx.getValue("input_xjtc8vx7rddj4j8c9c"); // 项目名称
  const jlmc = ctx.getValue("input_mizfi5xjbxfxasd6dd"); // 监理名称

  if (!gcmc && !jlmc) {
    try {
      // 项目名称
      const resGcmc = await ctx.http.request(
        "POST",
        "/dynamic/function/api/table",
      )({
        tbName: "sys_web_config",
        fields: ["attribute_value"],
        queryMap: { attribute_name: "gcmc" },
      });

      if (resGcmc && resGcmc.length > 0) {
        ctx.setValue("input_xjtc8vx7rddj4j8c9c", resGcmc[0].attribute_value);
      }

      // 监理名称
      const resJlmc = await ctx.http.request(
        "POST",
        "/dynamic/function/api/table",
      )({
        tbName: "sys_web_config",
        fields: ["attribute_value"],
        queryMap: { attribute_name: "jlmc" },
      });

      if (resJlmc && resJlmc.length > 0) {
        ctx.setValue("input_mizfi5xjbxfxasd6dd", resJlmc[0].attribute_value);
      }
    } catch (error) {
      console.error("获取配置信息失败:", error);
    }
  }
};
`,utils:[]}}],labelPosition:"left",width:"100%",size:"middle",useLabelWidth:!0,labelWidth:"110px",labelSpan:3,colon:!0,useDefaultGrid:!0,defaultGridSize:4,disabled:!1,datasourcePool:[],stylesheets:[{title:"main",desc:"主样式",code:`.css-1ku1uke > label {
  white-space: normal;
}
.ant-form-item-required:before {
  margin-inline-end: 0px !important;
}
.input-number-plus {
  text-align: right;
}
.adm-form .row_kx00irvnjhc4lk795f {
  margin-top: 0px !important;
}
.adm-form .checkbox_yle4it5b6lz2nbcuz1-form-item .adm-space-horizontal {
  justify-content: flex-start !important;
}
.adm-form .input_ehx4jqd09ojg4pmpo2-form-item .adm-list-item-content-prefix {
  width: max-content !important;
}
`}],utilsJs:[],relations:[]},collapse:{visible:!1,classNames:[],labelClassNames:[],events:[],mobileHidden:!0,defaultActiveKey:["collapse-pane_dsaq1hvm8k3wkcgj1v"],accordion:!1,bordered:!0,ghost:!1,expandIconPosition:"start"},"collapse-pane":{visible:!0,classNames:[],labelClassNames:[],events:[],label:"基础字段",disabled:!1},row:{visible:!0,classNames:[],labelClassNames:[],events:[],flex:!0,gutter:12,align:"top",justify:"start",disabled:!1},col:{visible:!0,classNames:[],labelClassNames:[],events:[],flex:"1",responsive:!1,span:24,offset:0,push:0,pull:0,xs:24,sm:24,md:24,lg:24,xl:24},input:{visible:!0,classNames:[],labelClassNames:[],events:[],dataTableDisabled:!1,isInSubForm:!1,virtualField:!1,virtualBindingTable:"",virtualBindingField:"",dataTable:"tud_wdgcqdbsb",dataField:"id",fieldLength:32,dataBind:"input_0wfgafmrf95lb0mz46",label:"主键ID",labelHidden:!1,labelCustomWidth:!1,useLabelWidth:!0,labelWidth:"100px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!1,disabled:!1,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"submit",placeholder:"请输入",contentAlign:"left",defaultValue:null,isAutoComplete:!1,options:[],dataSourceFn:"",isPassword:!1,alertInput:!1,isSelectModal:!1,selectDataSource:{},selectField:"",modalbindFiled:"",currentSelectItems:[],selectMultiple:!1,selectDisabled:!1,selectLink:!1,selectModalHeight:null,conditionsStr:"",conditions:[],advanceConditions:[],advanceConditionsStr:"",linkSetting:"none",fixedLink:"",customModal:!1,textWrap:!0,modalCode:`import React from "react";
import { Input } from "antd";
import dayjs from "dayjs";
import _ from "lodash";

export default function Component({
  value,
  onChange,
  ctx,
  useWatch,
}) {
  return (
    <>
      <Input onChange={(e) => onChange(e.target.value)} />
    </>
  );
}
`,completedModalCode:`"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Component(_ref) {
  var value = _ref.value,
    _onChange = _ref.onChange,
    ctx = _ref.ctx,
    useWatch = _ref.useWatch;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    }
  }));
}`,mobileModalCode:`import React from "react";
import { Input } from "antd-mobile";
import dayjs from "dayjs";
import _ from "lodash";

export default function Component({ value, onChange, ctx, useWatch }) {
  return (
    <>
      <Input onChange={onChange} />
    </>
  );
}
`,mobileCompletedModalCode:`"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component;
var _react = _interopRequireDefault(require("react"));
var _antdMobile = require("antd-mobile");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Component(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    ctx = _ref.ctx,
    useWatch = _ref.useWatch;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antdMobile.Input, {
    onChange: onChange
  }));
}`},select:{visible:!0,classNames:[],labelClassNames:[],events:[],dataTableDisabled:!1,isInSubForm:!1,virtualField:!0,virtualBindingTable:"sys_dictionary_value",virtualBindingField:"label",dataTable:"tud_wdgcqdbsb",dataField:"flow_bizstate",fieldLength:64,dataBind:"select_75kfnh4s5b3fjok91m",label:"流程状态",labelHidden:!1,labelCustomWidth:!1,useLabelWidth:!0,labelWidth:"100px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!1,disabled:!1,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"submit",showLabel:!1,dataSourceType:"dictionary",options:[{code:"unstart",value:"FlowTemplateStates-flowstate-unstart",aySerial:1,soleNum:"FlowTemplateStates-flowstate-unstart",ovalue:"未启动",label:"未启动"},{code:"going",value:"FlowTemplateStates-flowstate-going",aySerial:2,soleNum:"FlowTemplateStates-flowstate-going",ovalue:"流程中",label:"流程中"},{code:"finish",value:"FlowTemplateStates-flowstate-finish",aySerial:3,soleNum:"FlowTemplateStates-flowstate-finish",ovalue:"已完成",label:"已完成"},{code:"reject",value:"FlowTemplateStates-flowstate-reject",aySerial:4,soleNum:"FlowTemplateStates-flowstate-reject",ovalue:"驳回",label:"驳回"},{code:"end",value:"FlowTemplateStates-flowstate-end",aySerial:5,soleNum:"FlowTemplateStates-flowstate-end",ovalue:"终止",label:"终止"}],dictionaryType:"FlowTemplateStates-flowstate",dataSourceFn:"",placeholder:"请选择",defaultValue:"FlowTemplateStates-flowstate-unstart",multiple:!1,filterable:!1},text:{visible:!0,classNames:[],labelClassNames:[],events:[],dataTableDisabled:!1,isInSubForm:!1,virtualField:!1,virtualBindingTable:"",virtualBindingField:"",dataTable:"tud_wdgcqdbsb",dataField:"bdh",fieldLength:null,dataBind:"text_7gvm6oopjaf8oe9nt0",label:"表单号",labelHidden:!0,labelCustomWidth:!1,useLabelWidth:!0,labelWidth:"100px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!1,disabled:!1,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"submit",defaultValue:"-B37-",fontSize:16,color:"#000",textAlign:"left",lineHeight:"16px",bold:!1,em:!1,underline:!1,del:!1,nowrap:!1},table:{visible:!0,classNames:[],labelClassNames:[],events:[],borderColor:"#000",borderWidth:1,disabled:!1},"list-row":{visible:!0,classNames:[],labelClassNames:[],events:[]},"table-cell":{visible:!0,classNames:[],labelClassNames:[],events:[],colSpan:1,rowSpan:1},office:{visible:!0,classNames:[],labelClassNames:[],events:[],dataTableDisabled:!1,isInSubForm:!1,virtualField:!1,virtualBindingTable:"",virtualBindingField:"",dataTable:"tud_wdgcqdbsb",dataField:"jbr",fieldLength:null,dataBind:"office_qyebk5yr7l9cei1ume",label:"项目技术负责人",labelHidden:!1,labelCustomWidth:!0,useLabelWidth:!0,labelWidth:"120px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!0,disabled:!1,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"submit",placeholder:"请选择人员",defaultValue:null,multiple:!0,filterable:!1,current:!1,manualInput:!1,valueRange:"currentCap",dataNameField:"jbr_name",currentOrg:null,customFilter:!1,customFilterFn:`module.exports=function(users, orgs, pos) {

}`,customFilterAdvanced:!1,customFilterFnAdvanced:`module.exports=function(params, ctx, block) {

}`,userGroupList:[],expandRange:"none",expandRangeName:""},date:{visible:!0,classNames:[],labelClassNames:[],events:[],dataTableDisabled:!1,isInSubForm:!1,virtualField:!1,virtualBindingTable:"",virtualBindingField:"",dataTable:"tud_wdgcqdbsb",dataField:"jbrrq",fieldLength:null,dataBind:"date_yf8n2y9t0mffuki22x",label:"日期",labelHidden:!1,labelCustomWidth:!1,useLabelWidth:!0,labelWidth:"100px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!1,disabled:!0,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"submit",defaultValue:"",placeholder:"请选择",timestamp:!1,format:"YYYY-MM-DD",range:[null,null],type:"date",inputReadOnly:!1,current:!1},textarea:{visible:!0,classNames:[],labelClassNames:[],events:[],dataTableDisabled:!1,isInSubForm:!1,virtualField:!1,virtualBindingTable:"",virtualBindingField:"",dataTable:"tud_wdgcqdbsb",dataField:"zyjlyj",fieldLength:null,dataBind:"textarea_0ikh1mcdj02ckfsvt0",label:"专业监理意见",labelHidden:!1,labelCustomWidth:!1,useLabelWidth:!0,labelWidth:"100px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!1,disabled:!0,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"submit",placeholder:"",defaultValue:"",autoSize:!0,minRows:1,maxRows:6,contentAlign:"left"},subtable:{visible:!0,classNames:[],labelClassNames:[],events:[],dataTableDisabled:!1,isInSubForm:!1,virtualField:!1,virtualBindingTable:"",virtualBindingField:"",dataTable:"tud_wdgcqdbsbzb",dataField:"",fieldLength:null,dataBind:"subtable_fl1vdy5p5qysqk6d35",label:"明细子表",labelHidden:!0,labelCustomWidth:!1,useLabelWidth:!0,labelWidth:"100px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!1,disabled:!1,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"submit",visibleIndexColumn:!0,visibleIndexColumnField:"ay_serial",formId:"",functionId:"",bindCode:"",viewBtnText:"查看",usePagination:!0,canRemove:!0,canAdd:!0,canWatch:!1,showOptions:!0,canSelect:!1,delAuth:`module.exports=function(ctx,records,index) {
 return true;
}`,selectType:"checkbox",summary:!1,summaryColumns:[],dragSort:!0,subTabAddMethod:"0",isDetailEdit:!1,briefDisplay:!1,briefCount:5,briefColumns:[],selectedRows:[],tableLabel:"",height:"200px",subtableFixedColumn:[],showType:"list",mobileContentCustomCode:`import React from "react";
import { Input } from "antd-mobile";
import dayjs from "dayjs";
import _ from "lodash";
export default function Component({ record, ctx, subtable, rowInfo }) {
  return (
    <div>
      {Object?.entries(record)?.map(([key, value], index) => {
        return (
          <div
            key={key}
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                color: "#000",
                fontSize: "16px",
                fontWight: 600,
              }}
            >
              {rowInfo?.[key]?.label}:
            </div>

            <div
              style={{
                color: "#000",
                fontSize: "16px",
              }}
            >
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
`,mobileCompletedContentCustomCode:`"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component;
var _react = _interopRequireDefault(require("react"));
var _antdMobile = require("antd-mobile");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function Component(_ref) {
  var record = _ref.record,
    ctx = _ref.ctx,
    subtable = _ref.subtable,
    rowInfo = _ref.rowInfo;
  return /*#__PURE__*/_react.default.createElement("div", null, Object?.entries(record)?.map(function (_ref2, index) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    return /*#__PURE__*/_react.default.createElement("div", {
      key: key,
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        color: "#000",
        fontSize: "16px",
        fontWight: 600
      }
    }, rowInfo?.[key]?.label, ":"), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        color: "#000",
        fontSize: "16px"
      }
    }, value));
  }));
}`},checkbox:{visible:!0,classNames:[],labelClassNames:[],events:[],dataTableDisabled:!1,isInSubForm:!0,virtualField:!1,virtualBindingTable:"",virtualBindingField:"",dataTable:"tud_wdgcqdbsbzb",dataField:"wxxjddfbfxgc",fieldLength:null,dataBind:"checkbox_0kwog3aq1b5o5ln7x1",label:"危险性较大的分部分项工程",labelHidden:!1,labelCustomWidth:!1,useLabelWidth:!0,labelWidth:"100px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!1,disabled:!1,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"change",showLabel:!1,dataSourceType:"dictionary",options:[{code:"1",value:" blank-1",aySerial:1,soleNum:" blank-1",ovalue:" ",label:" "}],dictionaryType:" blank",dataSourceFn:"",defaultValue:[" blank-true"],direction:"vertical",multiple:!0},radio:{visible:!0,classNames:[],labelClassNames:[],events:[{event:"change",codeItem:{code:`module.exports = function (params, ctx, block) {
  const wdgc = ctx.getValue("radio_mz2btbjy3anoknghat");
  debugger;
  if (wdgc == "Dangerous Construction Works-Large-scale High-risk Works") {
    ctx.message(
      "请上传附件《专项施工方案专家论证材料（签字盖章版）》",
      "warning",
    );
  }
};
`,utils:[]}}],dataTableDisabled:!1,isInSubForm:!1,virtualField:!1,virtualBindingTable:"",virtualBindingField:"",dataTable:"tud_wdgczxsgbsb",dataField:"sfcwd",fieldLength:null,dataBind:"radio_mz2btbjy3anoknghat",label:"是否超危大",labelHidden:!0,labelCustomWidth:!1,useLabelWidth:!0,labelWidth:"100px",labelSpan:2,labelAlign:"center",columnWidth:"200px",columnGroup:"",readonly:!1,required:!1,disabled:!0,allowClear:!1,validatorFunc:"",validatorScriptRefId:"",watches:[],actions:[],validateMode:"submit",showLabel:!1,dataSourceType:"dictionary",options:[{code:"High-risk Divisional",value:"Dangerous Construction Works-High-risk Divisional",soleNum:"Dangerous Construction Works-High-risk Divisional",ovalue:"危险性较大的分部分项工程",label:"危险性较大的分部分项工程"},{code:"Large-scale High-risk Works",value:"Dangerous Construction Works-Large-scale High-risk Works",soleNum:"Dangerous Construction Works-Large-scale High-risk Works",ovalue:"超过一定规模的危险性较大的分部分项工程",label:"超过一定规模的危险性较大的分部分项工程"}],dictionaryType:"Dangerous Construction Works",dataSourceFn:"",defaultValue:"Dangerous Construction Works-High-risk Divisional",direction:"vertical"}},Go={工程名称:"project_name",编号:"number",表单号:"bdh",致:"zhi",起草单位:"qcdw",单位名称:"organization_name",单位代码:"company_code",合同名称:"contract_name",合同编号:"contract_number",表单名称:"bdmc",是否超危大:"sfcwd",经办人:"jbr_name",项目经理:"xmjl_name",经办人日期:"jbrrq",专业监理工程师意见:"zyjlyj",专业监理工程师:"zyjlgcs_name",安全监理工程师:"aqjlgcs_name",总监理工程师:"fzjlgcs_name",总监理工程师日期:"fzjlgcsrq",项目监理机构审查意见:"xmjljgscyj",监理日期:"jlrq",工程部审核意见:"gcbshyj",工程部专业工程师:"gcbzygcs_name",工程部部门负责人:"gcbbmfzr_name",安健环部审核意见:"ajhbshyj",安健环部专业工程师:"ajhbzygcs_name",安健环部部门负责人:"ajhbbmfzr_name",安健环部日期:"ajhbrq",建设单位审批意见:"jsdwspyj",建设单位代表:"jsdwdb_name",建设单位日期:"jsdwrq",专业工程师:"zygcs",工程部主任:"gcbfzr",安质部专业工程师:"ajhbzygcs",安质部主任:"ajhbbmfzr"},Qo={危大工程专项施工方案报审表:"wdgczxsgbsb",危大工程清单报审表:"wdgcqdbsb"},Pn=10;function qt(e){const n=(e||"").trim();return n.length>Pn?n.slice(0,Pn):n}const Zo=[{english:"id",label:"主键ID",type:"input",length:32,lock:!0},{english:"sys_createtime",label:"创建时间",type:"input",length:null,lock:!0}],Ko=[{english:"_id",label:"_id",type:"input",length:200},{english:"specialty",label:"专业",type:"input",length:50},{english:"unit",label:"机组",type:"input",length:50},{english:"project_name",label:"工程名称",type:"input",length:200},{english:"number",label:"编号",type:"input",length:50},{english:"bdh",label:"表单号",type:"input",length:50},{english:"zhi",label:"致",type:"input",length:50},{english:"qcdw",label:"起草单位",type:"input",length:100},{english:"organization_name",label:"单位名称",type:"input",length:100},{english:"company_code",label:"单位代码",type:"input",length:100},{english:"contract_name",label:"合同名称",type:"input",length:100},{english:"contract_number",label:"合同编号",type:"input",length:100}],Xo={english:"bz",label:"备注",type:"textarea",length:null},Yo=[{english:"fdd_dzqz_file_id",label:"签章文件id",type:"input",length:null},{english:"fdd_dzqz_status",label:"签章状态",type:"input",length:null},{english:"flow_instance_id",label:"流程实例ID",type:"input",length:null},{english:"flow_id",label:"流程编号",type:"input",length:null},{english:"flow_startflag",label:"流程状态flag",type:"input",length:null},{english:"flow_bizstate",label:"流程业务状态",type:"select",length:null}],Jo=[...Zo,...Ko,Xo,...Yo];function Wt(e){return/^[a-z_][a-z0-9_]*$/i.test(e)}function Je(e){let n=String(e).toLowerCase().replace(/[^a-z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return/^\d/.test(n)&&(n="f_"+n),n||"field"}function Ke(e){const n="abcdefghijklmnopqrstuvwxyz0123456789";let t="";for(let c=0;c<17;c++)t+=n[Math.floor(Math.random()*n.length)];return`${e}_${t}`}function Xe(e){const n=Wo[e]||{};return JSON.parse(JSON.stringify(n))}function el(e,n){const c=Qo[e.trim()]||Dt(e)||"custom_table";return n.tablePrefix+c}function tl(e){const n=e.docXml||"",t=e.text||"",c=e.naming,l={...Go,...e.translationDict||{}};let r=el(e.tableNameCn,c);const o=n?$o(n):[],u=o.find(d=>/_child$/.test(d))||null;let h=r+"zb";if(u){const d=u.replace(/_child$/,"");h=d,/zb$/.test(d)&&d!==r&&(r=d.replace(/zb$/,""))}const p=new Set;for(const d of o){if(/_child$/.test(d))continue;const s=Wt(d)?Je(d):Je(nt(d,p,c,l,[]).name);p.add(s)}const f=[];for(const d of Jo)p.has(d.english)||(p.add(d.english),f.push({kind:"base",english:d.english,label:d.label,type:d.type,length:d.length,lock:d.lock}));for(const d of o){if(/_child$/.test(d))continue;const s=qt(Ho(n,d)||d);let b=Wt(d)?Je(d):Je(nt(d,p,c,l,[]).name);p.add(b);const g=wo(b);f.push({kind:"main",english:b,label:s,type:g.type,length:g.length})}for(const d of pr(t)){let s=Wt(d)?Je(d):Je(nt(d,p,c,l,[]).name);if(p.has(s)){let g=2;for(;p.has(`${s}_${g}`);)g++;s=`${s}_${g}`}p.add(s);const b=an(d);f.push({kind:"main",english:s,label:qt(d),type:b.type,length:b.length})}if(u){const d=qo(n,u);for(const s of d){if(yo.test(s.chinese.trim()))continue;const b=Je(nt(s.chinese,p,c,l,[]).name);p.add(b);const g=an(s.chinese);f.push({kind:"sub",english:b,label:qt(s.chinese),type:g.type,length:g.length})}}return{mainEn:r,subEn:h,fields:f,warnings:[]}}function Gt(e,n,t,c,l,a){const r=Xe(e);r.dataTable=n,r.dataField=t,r.label=c,l!==void 0&&(r.fieldLength=l);const o=Ke(e);return r.dataBind=o,a&&(r.isInSubForm=!0),{id:o,type:e,props:r,children:[]}}function Mn(e,n=3){const t=[];for(let c=0;c<e.length;c+=n){const l={id:Ke("row"),type:"row",props:Xe("row"),children:[]};e.slice(c,c+n).forEach(a=>{l.children.push({id:Ke("col"),type:"col",props:Xe("col"),children:[a]})}),t.push(l)}return t}function nl(e,n,t){const c=e.filter(p=>p.kind==="base").map(p=>Gt(p.type,n,p.english,p.label,p.length,!1)),l=e.filter(p=>p.kind==="main").map(p=>Gt(p.type,n,p.english,p.label,p.length,!1)),a=e.filter(p=>p.kind==="sub").map(p=>Gt(p.type,t,p.english,p.label,p.length,!0)),r={id:Ke("form"),type:"form",props:Xe("form"),children:[]},o={id:Ke("collapse"),type:"collapse",props:Xe("collapse"),children:[]},u={id:Ke("collapse-pane"),type:"collapse-pane",props:{...Xe("collapse-pane"),label:"基础字段"},children:[]};Mn(c,6).forEach(p=>u.children.push(p));const h={id:Ke("collapse-pane"),type:"collapse-pane",props:{...Xe("collapse-pane"),label:"表单字段"},children:[]};if(Mn(l,2).forEach(p=>h.children.push(p)),o.children.push(u,h),r.children.push(o),a.length){const p=Xe("subtable"),f=Ke("subtable");p.dataTable=t,p.dataField="",p.label="明细子表",p.dataBind=f,p.visibleIndexColumnField="ay_serial",r.children.push({id:f,type:"subtable",props:p,children:a})}return{json:r,mainCount:l.length,sysCount:c.length,subCount:a.length}}const rl={class:"page"},al={class:"hdr"},sl={class:"steps"},il={class:"step-dot"},ol={class:"step-label"},ll={key:0,class:"rise-in"},ul={class:"src-grid"},dl={class:"field-block"},cl={class:"drop-title"},fl={class:"field-block",style:{"margin-top":"var(--s-4)"}},hl={class:"actions"},pl={key:1,class:"rise-in"},ml={class:"stat-strip"},gl={class:"stat"},bl={class:"stat-n"},_l={class:"stat"},vl={class:"stat-n"},yl={class:"stat"},wl={class:"stat-n"},xl={class:"stat-flex"},kl={class:"mono dim"},El={class:"mono dim"},Al={key:0,class:"empty-hint"},Sl={class:"flist"},Il={class:"fidx"},Cl={class:"flist"},Tl={key:1,class:"flist"},Rl={class:"fidx"},Nl={class:"actions"},Ll={key:2,class:"rise-in"},Dl={class:"result-head"},Ol={class:"result-sub mono dim"},zl={class:"result-btns"},Fl={class:"code-wrap"},Bl={class:"actions"},Pl=Fe({__name:"index",setup(e){const n=kt(),t=or(),c=ye(""),l=ye(""),a=ye(null),r=ye(""),o=ye(null),u=ye([]),h=ye(""),p=ye(!1),f=ye("source"),d=ye(!1),s=ye(null),b=[{key:"source",label:"来源"},{key:"review",label:"复核"},{key:"export",label:"导出"}],g=ge(()=>b.findIndex(F=>F.key===f.value)),y={input:{label:"单行文本",color:"var(--accent-400)"},textarea:{label:"多行文本",color:"var(--info)"},date:{label:"日期",color:"var(--success)"},checkbox:{label:"勾选",color:"var(--warning)"},select:{label:"下拉",color:"var(--accent-500)"},radio:{label:"单选",color:"var(--accent-600)"}},_=Object.keys(y).map(F=>({label:y[F].label,value:F})),v=ge(()=>u.value.filter(F=>F.kind==="base")),w=ge(()=>u.value.filter(F=>F.kind==="main")),A=ge(()=>u.value.filter(F=>F.kind==="sub")),C=ge(()=>A.value.length>0&&"子表字段已完整包含在「设计器 JSON」中；加入生成器时仅导入主表字段。");function I(){var F;(F=s.value)==null||F.click()}async function x(F){p.value=!0;try{const H=await Vo(F);a.value=H,r.value=F.name,c.value=F.name.replace(/\.(docx?|DOCX?)$/i,""),n.success(`已读取 ${F.name}`)}catch(H){n.error("读取 Word 失败："+H.message)}finally{p.value=!1}}async function T(F){var W;const H=(W=F.target.files)==null?void 0:W[0];H&&await x(H),F.target.value=""}async function N(F){var W,le;F.preventDefault(),d.value=!1;const H=(le=(W=F.dataTransfer)==null?void 0:W.files)==null?void 0:le[0];H&&await x(H)}function P(){if(!c.value.trim()&&!a.value&&!l.value.trim()){n.warning("请填写表中文名，或上传已打书签的 Word，或粘贴文字字段");return}const F=tl({docXml:a.value||void 0,text:l.value||void 0,tableNameCn:c.value||"自定义表",naming:ze.value.naming,translationDict:ze.value.translationDict});o.value=F,u.value=F.fields,h.value="",f.value="review",n.success(`解析完成：主表 ${w.value.length} · 基础 ${v.value.length} · 子表 ${A.value.length}`)}function se(){if(!o.value)return;const F=nl(u.value,o.value.mainEn,o.value.subEn);h.value=JSON.stringify(F.json,null,2),f.value="export",n.success("已生成设计器 JSON")}function S(){if(!o.value)return;const F=ui(w.value.map(H=>({english:H.english,label:H.label,type:H.type})));if(!F.length){n.info("这些字段都已存在于主表，未重复导入");return}fr(F),n.success(`已加入 ${F.length} 个字段到主表，正在跳转到「字段生成器」…`),t.push("/field-generator")}function j(){var F;h.value&&((F=navigator.clipboard)!=null&&F.writeText?navigator.clipboard.writeText(h.value).then(()=>n.success("已复制 JSON"),()=>m()):m())}function m(){const F=document.createElement("textarea");F.value=h.value,document.body.appendChild(F),F.select();try{document.execCommand("copy"),n.success("已复制 JSON")}catch{n.error("复制失败，请手动选择文本")}document.body.removeChild(F)}function $(){if(!h.value||!o.value)return;const F=new Blob([h.value],{type:"application/json"}),H=document.createElement("a");H.href=URL.createObjectURL(F),H.download=`${o.value.mainEn}_designer.json`,H.click(),URL.revokeObjectURL(H.href)}function he(){a.value=null,r.value="",o.value=null,u.value=[],h.value="",f.value="source"}return(F,H)=>{var W,le,B;return K(),re("div",rl,[D("div",al,[H[6]||(H[6]=Qt('<div class="hdr-title" data-v-d6fbe819><span class="hdr-mark" aria-hidden="true" data-v-d6fbe819><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-d6fbe819><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-d6fbe819></path><path d="M14 2v6h6" data-v-d6fbe819></path><path d="M12 18v-6" data-v-d6fbe819></path><path d="M9 15h6" data-v-d6fbe819></path></svg></span><div data-v-d6fbe819><div class="hdr-name" data-v-d6fbe819>从 Word 导入</div><div class="hdr-sub" data-v-d6fbe819> 提取书签 → 复用你的命名规则 → 生成字段 / 设计器 JSON </div></div></div>',1)),o.value?(K(),Te(O(je),{key:0,size:"small",type:"info",bordered:!1,class:"mono"},{default:ne(()=>[de(ue(o.value.mainEn),1)]),_:1})):Ae("",!0)]),D("div",sl,[(K(),re(Ne,null,De(b,(R,ae)=>(K(),re(Ne,{key:R.key},[D("div",{class:Pe(["step",{active:ae===g.value,done:ae<g.value}])},[D("span",il,ue(ae<g.value?"✓":ae+1),1),D("span",ol,ue(R.label),1)],2),ae<b.length-1?(K(),re("div",{key:0,class:Pe(["step-line",{done:ae<g.value}])},null,2)):Ae("",!0)],64))),64))]),f.value==="source"?(K(),re("section",ll,[D("div",ul,[D("div",dl,[H[7]||(H[7]=D("label",{class:"lbl"},"表中文名",-1)),X(O(Le),{value:c.value,"onUpdate:value":H[0]||(H[0]=R=>c.value=R),placeholder:"tud_XXX",size:"medium"},null,8,["value"])]),D("div",{class:Pe(["drop",{over:d.value}]),onClick:I,onDragover:H[1]||(H[1]=Tt(R=>d.value=!0,["prevent"])),onDragleave:H[2]||(H[2]=Tt(R=>d.value=!1,["prevent"])),onDrop:N},[D("input",{ref_key:"fileInput",ref:s,type:"file",accept:".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",style:{display:"none"},onChange:T},null,544),H[9]||(H[9]=Qt('<div class="drop-ico" aria-hidden="true" data-v-d6fbe819><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" data-v-d6fbe819><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-d6fbe819></path><path d="M7 10l5-5 5 5" data-v-d6fbe819></path><path d="M12 5v12" data-v-d6fbe819></path></svg></div>',1)),D("div",cl,ue(r.value||"拖入或点击上传已打书签的 .docx"),1),r.value?(K(),Te(O(Ee),{key:0,size:"tiny",quaternary:"",class:"drop-clear",onClick:Tt(he,["stop"])},{default:ne(()=>[...H[8]||(H[8]=[de("移除",-1)])]),_:1})):Ae("",!0)],34)]),D("div",fl,[H[10]||(H[10]=D("label",{class:"lbl"},[de(" 文字字段 "),D("span",{class:"lbl-hint"},"（可选）逗号 / 、/ 换行分隔，自动判断类型")],-1)),X(O(Le),{value:l.value,"onUpdate:value":H[3]||(H[3]=R=>l.value=R),type:"textarea",size:"medium",placeholder:"如：工程名称，建设单位，开工日期，是否验收，合同金额，备注说明，项目经理",autosize:{minRows:3,maxRows:6}},null,8,["value"])]),X(O(Zt),{type:"info",bordered:!1,class:"tip"},{default:ne(()=>[...H[11]||(H[11]=[de(" 上传、粘贴二选一即可，也可",-1),D("strong",null,"两者合并",-1),de("。解析后会在下一步让你逐字段核对中文标签与类型。 ",-1)])]),_:1}),D("div",hl,[X(O(Ee),{size:"large",type:"primary",disabled:!c.value.trim()&&!a.value&&!l.value.trim(),onClick:P},{default:ne(()=>[...H[12]||(H[12]=[de(" 解析书签 ",-1),D("span",{class:"arr"},"→",-1)])]),_:1},8,["disabled"])])])):f.value==="review"?(K(),re("section",pl,[D("div",ml,[D("div",gl,[D("span",bl,ue(w.value.length),1),H[13]||(H[13]=D("span",{class:"stat-l"},"主表字段",-1))]),D("div",_l,[D("span",vl,ue(v.value.length),1),H[14]||(H[14]=D("span",{class:"stat-l"},"基础字段",-1))]),D("div",yl,[D("span",wl,ue(A.value.length),1),H[15]||(H[15]=D("span",{class:"stat-l"},"子表字段",-1))]),D("div",xl,[D("span",kl,"表名 "+ue((W=o.value)==null?void 0:W.mainEn),1),D("span",El,"子表 "+ue((le=o.value)==null?void 0:le.subEn),1)])]),X(O($r),{type:"line",animated:"",class:"review-tabs"},{default:ne(()=>[X(O(Ft),{name:"main",tab:`表单字段 (${w.value.length})`},{default:ne(()=>[w.value.length?Ae("",!0):(K(),re("div",Al," 主表无字段，检查书签或文字输入。 ")),D("div",Sl,[(K(!0),re(Ne,null,De(w.value,(R,ae)=>(K(),re("div",{key:R.english,class:"frow hoverable"},[D("span",Il,ue(ae+1),1),D("span",{class:"dot",style:Ye({background:y[R.type].color})},null,4),X(O(je),{size:"small",bordered:!1,class:"mono en"},{default:ne(()=>[de(ue(R.english),1)]),_:2},1024),X(O(Le),{value:R.label,"onUpdate:value":te=>R.label=te,size:"small",placeholder:"中文标签",class:"lbl-in"},null,8,["value","onUpdate:value"]),X(O(at),{value:R.type,"onUpdate:value":te=>R.type=te,options:O(_),size:"small",class:"type-in"},null,8,["value","onUpdate:value","options"])]))),128))])]),_:1},8,["tab"]),X(O(Ft),{name:"base",tab:`基础字段 (${v.value.length})`},{default:ne(()=>[D("div",Cl,[(K(!0),re(Ne,null,De(v.value,R=>(K(),re("div",{key:R.english,class:"frow hoverable base"},[D("span",{class:"dot",style:Ye({background:y[R.type].color})},null,4),X(O(je),{size:"small",bordered:!1,class:"mono en"},{default:ne(()=>[de(ue(R.english),1)]),_:2},1024),X(O(Le),{value:R.label,"onUpdate:value":ae=>R.label=ae,size:"small",disabled:R.lock,placeholder:"中文标签",class:"lbl-in"},null,8,["value","onUpdate:value","disabled"]),X(O(at),{value:R.type,"onUpdate:value":ae=>R.type=ae,options:O(_),size:"small",disabled:R.lock,class:"type-in"},null,8,["value","onUpdate:value","options","disabled"])]))),128))])]),_:1},8,["tab"]),X(O(Ft),{name:"sub",tab:`子表字段 (${A.value.length})`},{default:ne(()=>[A.value.length?(K(),re("div",Tl,[(K(!0),re(Ne,null,De(A.value,(R,ae)=>(K(),re("div",{key:R.english,class:"frow hoverable"},[D("span",Rl,ue(ae+1),1),D("span",{class:"dot",style:Ye({background:y[R.type].color})},null,4),X(O(je),{size:"small",bordered:!1,class:"mono en"},{default:ne(()=>[de(ue(R.english),1)]),_:2},1024),X(O(Le),{value:R.label,"onUpdate:value":te=>R.label=te,size:"small",placeholder:"中文标签",class:"lbl-in"},null,8,["value","onUpdate:value"]),X(O(at),{value:R.type,"onUpdate:value":te=>R.type=te,options:O(_),size:"small",class:"type-in"},null,8,["value","onUpdate:value","options"])]))),128))])):(K(),Te(O(qr),{key:0,depth:"3",class:"sub-empty"},{default:ne(()=>[...H[16]||(H[16]=[de(" 未检测到子表。在 Word 表头行最后一列打 ",-1),D("code",null,"xxx_child",-1),de(" 书签即可生成子表节点。 ",-1)])]),_:1}))]),_:1},8,["tab"])]),_:1}),C.value?(K(),Te(O(Zt),{key:0,type:"warning",bordered:!1,class:"tip"},{default:ne(()=>[de(ue(C.value),1)]),_:1})):Ae("",!0),D("div",Nl,[X(O(Ee),{size:"large",onClick:H[4]||(H[4]=R=>f.value="source")},{default:ne(()=>[...H[17]||(H[17]=[de("← 返回",-1)])]),_:1}),H[20]||(H[20]=D("div",{class:"spacer"},null,-1)),X(O(Ee),{size:"large",type:"primary",onClick:S},{default:ne(()=>[...H[18]||(H[18]=[de("加入生成器",-1)])]),_:1}),X(O(Ee),{size:"large",onClick:se},{default:ne(()=>[...H[19]||(H[19]=[de("生成设计器 JSON →",-1)])]),_:1})])])):(K(),re("section",Ll,[D("div",Dl,[D("div",null,[H[21]||(H[21]=D("div",{class:"result-title"},"表单设计器完整树 JSON",-1)),D("div",Ol,ue((B=o.value)==null?void 0:B.mainEn)+" · 主 "+ue(w.value.length)+" · 基 "+ue(v.value.length)+" · 子 "+ue(A.value.length),1)]),D("div",zl,[X(O(Ee),{size:"medium",onClick:j},{default:ne(()=>[...H[22]||(H[22]=[de("复制",-1)])]),_:1}),X(O(Ee),{size:"medium",type:"primary",onClick:$},{default:ne(()=>[...H[23]||(H[23]=[de("下载 .json",-1)])]),_:1})])]),D("div",Fl,[X(O(Hr),{code:h.value,language:"json","word-wrap":!0},null,8,["code"])]),D("div",Bl,[X(O(Ee),{size:"large",onClick:S},{default:ne(()=>[...H[24]||(H[24]=[de("也加入生成器主表",-1)])]),_:1}),H[26]||(H[26]=D("div",{class:"spacer"},null,-1)),X(O(Ee),{size:"large",onClick:H[5]||(H[5]=R=>f.value="review")},{default:ne(()=>[...H[25]||(H[25]=[de("← 返回复核",-1)])]),_:1})])]))])}}}),Ml=$e(Pl,[["__scopeId","data-v-d6fbe819"]]),jl={class:"page"},Ul={class:"head"},Vl={class:"counts"},$l={class:"cnt"},Hl={class:"grid"},ql=["onClick"],Wl={class:"card-top"},Gl={class:"name"},Ql={key:0,class:"desc"},Zl={class:"url"},Kl=Fe({__name:"index",setup(e){const n=[{name:"开发手册",to:"/handbook",hint:"新标签打开 · bestdt 低代码平台二次开发手册",desc:"表单事件代码、子表操作、平台扩展、踩坑与现场速查",internal:!0},{name:"字段生成器",to:"/field-generator",hint:"新标签打开 · 审批流建表",desc:"Excel 字段定义一键生成建表 SQL",internal:!0},{name:"书签生成表单",to:"/bookmark-form",hint:"新标签打开 · Word 书签提取",desc:"提取 Word 书签 → 复用编号规则 → 设计器 JSON",internal:!0},{name:"自定义表单代码示例",to:"/form-code",hint:"新标签打开 · 响应式表单代码",desc:"BestDT 响应式表单代码示例，在线查看 / 编辑 / 下载",internal:!0},{name:"新增字段 SQL",to:"/field-sql",hint:"新标签打开 · dy_table_field",desc:"批量生成字段插入 / 改表 / 注释 SQL",internal:!0},{name:"贝斯特自定义表单文档",url:"https://www.bestdt.com/formdeep/docs/responsive/function/basic-control/",hint:"https://www.bestdt.com/formdeep/docs/",desc:"官方控件文档：基础控件、数据源、事件"},{name:"JSON格式化",url:"https://www.json.cn/",hint:"https://www.json.cn/",desc:"JSON 格式化 / 校验 / 转义"},{name:"123apps 在线工具",url:"https://123apps.com/cn/",hint:"https://123apps.com/cn/",desc:"图片、文档、PDF 等一堆在线小工具"},{name:"PDF.io",url:"https://pdf.io/cn/merge/",hint:"https://pdf.io/cn/merge/",desc:"PDF 合并、拆分、压缩、转换"}];function t(a){const r="/zdscq_zyt/";if(a.to){window.open(r+"#"+a.to,"_blank","noopener,noreferrer");return}a.url&&window.open(a.url,"_blank","noopener,noreferrer")}const c=n.filter(a=>a.internal).length,l=n.length-c;return(a,r)=>(K(),re("div",jl,[D("div",Ul,[r[2]||(r[2]=D("h2",null,"工具箱",-1)),r[3]||(r[3]=D("p",null,"站内开发工具与常用第三方站点，全部收在这里，点击新标签打开。开发手册查 API，工具做活儿，第三方站点处理杂事。",-1)),D("div",Vl,[D("span",$l,[D("b",null,ue(O(c)),1),r[0]||(r[0]=de(" 个站内工具",-1))]),D("span",{class:"cnt"},[D("b",null,ue(l)),r[1]||(r[1]=de(" 个第三方站点",-1))])])]),D("div",Hl,[(K(),re(Ne,null,De(n,o=>D("button",{key:o.name,type:"button",class:Pe(["card",{"is-internal":!!o.internal}]),onClick:u=>t(o)},[D("span",Wl,[D("span",Gl,ue(o.name),1),r[4]||(r[4]=D("span",{class:"arrow","aria-hidden":"true"},"↗",-1))]),o.desc?(K(),re("span",Ql,ue(o.desc),1)):Ae("",!0),D("span",Zl,ue(o.hint),1)],10,ql)),64))])]))}}),Xl=$e(Kl,[["__scopeId","data-v-42e9f41b"]]),jn=`#### 弹窗带数据\r
\r
params?.instance?.props?.currentSelectItems?为选中的数据.控件名称就可以取到值，下面就直接赋值就行。\r
\r
\`\`\`\r
module.exports = function (params, ctx, block) {\r
  const isLargeScale = \r
        params.instance.props.currentSelectItems.[0]?.switch_4z8jsj16n0jlw09jp6 || false;\r
  \r
  ctx.setValue(\r
    "radio_mz2btbjy3anoknghat",\r
    isLargeScale\r
      ? "Dangerous Construction Works-Large-scale High-risk Works"\r
      : "Dangerous Construction Works-High-risk Divisional",\r
  );\r
};\r
\`\`\`\r
\r
#### 弹窗过滤条件\r
\r
- 根据当前登陆人岗位过滤数据，也可以设置数据权限实现。\r
\r
- 从本地获取登陆信息，需要解析出来json：value：JSON.parse(localStorage.userInfo).companyId\r
\r
 symbol筛选方式枚举值\r
\r
\`\`\`\r
  | EQ         | 等于     |\r
  | NE         | 不等于   |\r
  | GT         | 大于     |\r
  | GE         | 大于等于 |\r
  | LT         | 小于     |\r
  | LE         | 小于等于 |\r
  | ALL_LIKE   | 包含     |\r
  | LEFT_LIKE  | 左模糊   |\r
  | RIGHT_LIKE | 右模糊   |\r
\`\`\`\r
\`\`\`\r
[{\r
    tbName: "tud_wdgcqdbsbzb", \r
    field: "sys_org_id",\r
    value: JSON.parse(localStorage.userInfo).companyId,\r
    symbol: "EQ",\r
}]\r
\`\`\`\r
\r
- 也可以动态添加，这里的value就可以从当前表单里去获取动态值了。可以写在表单初始化时，但要确定初始化有值，没有值就写到某个值变化时。具体情况具体处理。\r
\r
  \`\`\`\r
  ctx.setInstance("input_s0ls1xxzdhvfvzl4pj","conditions",[{\r
      tbName: "tud_wdgcqdbsbzb", \r
      field: "sys_org_id",\r
      value: "8705eed4bf703101270cad1d9f8f4",\r
      symbol: "EQ",\r
  }])\r
  \`\`\`\r
\r
#### 消息提醒，有ctx的时候\r
\r
\`\`\`\r
    ctx.message(\r
      "请上传附件《专项施工方案专家论证材料（签字盖章版）》",\r
      "warning",//默认info  |’success’’warning'’error’’info’’loading'\r
    );\r
\`\`\`\r
\r
#### 批量删除子表\r
\r
\`\`\`\r
module.exports = function (subTable, ctx, btn) {\r
  debugger;\r
  const subArrayForm = ctx.getArrayInstance("subtable_qi3yhq74d5hjshugc7");\r
  const subTableData1 = ctx.getArrayValue("subtable_qi3yhq74d5hjshugc7"); // 子表数据\r
  const selectedRows = subArrayForm?.props?.selectedRows; // 选中的行\r
  const selectedData1 = []; // 选中的子表数据\r
  selectedRows.forEach((data, index) =>\r
    selectedData1.push(subTableData1[data.index]),\r
  );\r
  if (!selectedData1.length) {\r
    ctx.message("请先选择数据!", "warning");\r
    return;\r
  }\r
  const newSubArrayFormData = subTableData1.filter(\r
    (e, i) => !selectedRows.some((a) => a.index === i),\r
  );\r
  //ctx.batchDeleteSubTableRow("subtable_qi3yhq74d5hjshugc7");\r
  ctx.setArrayValue("subtable_qi3yhq74d5hjshugc7", newSubArrayFormData);\r
};\r
\`\`\`\r
\r
#### 通过数据库字段找属性id\r
\r
\`\`\`\r
   工具函数：getControlId\r
   module.exports = function (ctx, formInstance, fieldName) {\r
     const stack = [formInstance];\r
     while (stack.length > 0) {\r
       const node = stack.pop();\r
       if (node.props?.dataField === fieldName && node.id) {\r
         return node.id;\r
       }\r
       if (node.children) {\r
         for (const child of node.children) stack.push(child);\r
       }\r
     }\r
     return undefined;\r
   };\r
   \r
    // 通过字段名动态获取控件ID\r
     const gcmcId = ctx.utils.getControlId(params.instance, "gcmc");\r
     const jlmcId = ctx.utils.getControlId(params.instance, "jlmc");\r
     const flowStartflagId = ctx.utils.getControlId(params.instance, "flow_startflag");\r
   \r
     // 获取当前值\r
     const gcmc = gcmcId ? ctx.getValue(gcmcId) : undefined;\r
     const jlmc = jlmcId ? ctx.getValue(jlmcId) : undefined;\r
\`\`\`\r
\r
#### 禁用组件\r
\r
\`\`\`\r
      module.exports = function (params, ctx) {\r
        const value = params.value;\r
        if (value === "1") {\r
          ctx.setInstance("checkbox_v2lsdnjxuswwbgj4jk", "disabled", true);\r
        } \r
      };\r
      \r
\`\`\`\r
#### 取消所有必填\r
\r
\`\`\`\r
const fieldVos = ctx.getFormInfo().dyFormFieldVos || [];\r
fieldVos.forEach(f => f.code && ctx.setInstance(f.code, "required", false));\r
console.log('✅ 完成，共处理', fieldVos.length, '个控件');\r
\r
const fieldVos = ctx.getFormInfo().dyFormFieldVos || [];\r
fieldVos.forEach(f => f.code && ctx.setInstance(f.code, "disabled", false));\r
console.log('✅ 完成，共处理', fieldVos.length, '个控件');\r
\`\`\`\r
\r
#### 树结构导入数据\r
\r
\`\`\`\r
module.exports = function (request, ctx, params) {\r
  let id = params?.currentNode?.id;\r
  const fileInput = document.createElement("input");\r
  fileInput.type = "file";\r
  fileInput.style.display = "none";\r
  fileInput.accept = ".xlsx,.xls";\r
  fileInput.addEventListener("change", (event) => {\r
    const file = event.target.files[0];\r
    if (!file) return;\r
    const formData = new FormData();\r
    formData.append("file", file);\r
    formData.append("importType", "SUB_TABLE");\r
    formData.append("menuId", "0ba4bda6e81c0abd0ba14160ae8a7a8a");//要改这里为菜单id\r
    formData.append("relationValue", id);\r
    formData.append("time", new Date().getTime());\r
    request("POST", "/system/excel/import", {\r
      headers: {\r
        "Content-Type": "application/x-www-form-urlencoded",\r
      },\r
    })(formData)\r
      .then((response) => {\r
        // 成功提示\r
        if (params?.message?.success) {\r
          params.message.success("导入成功");\r
        } else {\r
          alert("导入成功");\r
        }\r
        // 刷新列表\r
        if (typeof params?.reload === "function") {\r
          params.reload();\r
        }\r
      })\r
      .catch((error) => {\r
        console.error("导入失败:", error);\r
        if (params?.message?.error) {\r
          params.message.error(\r
            "导入失败：" + (error.message || "请检查文件格式"),\r
          );\r
        } else {\r
          alert("导入失败");\r
        }\r
      })\r
      .finally(() => {\r
        // 清理 DOM 元素\r
        if (fileInput.parentNode) {\r
          fileInput.parentNode.removeChild(fileInput);\r
        }\r
      });\r
  });\r
\r
  // 触发文件选择\r
  document.body.appendChild(fileInput);\r
  fileInput.click();\r
};\r
\r
\`\`\`\r
\r
#### 渲染时过滤子表数据\r
\r
\`\`\`\r
// 2. 安全技术交底\r
const rows2 = ctx.getArrayValue("subtable_cki1e74l5km4iwvxco");\r
ctx.setArrayValue("subtable_cki1e74l5km4iwvxco", rows2.filter(r => r['input_o1ww8xhfym1t3iawxi'] == 2));\r
\`\`\`\r
\r
#### 按钮选表单带数据添加到子表\r
\r
\`\`\`\r
module.exports = async function (params, ctx, block) {\r
  // 步骤1: 获取弹窗选中的数据\r
  const selected = params.instance.props.currentSelectItems || [];\r
  \r
  // 步骤2: 获取子表现有数据ID列表，用于去重\r
  const existingIds = ctx.getArrayValue("subtable_qi3yhq74d5hjshugc7").map(row => row.input_fn9rvtd4dg1bn0r5lm);\r
  \r
  // 步骤3: 获取子表操作API\r
  const arrayFormApi = ctx.getArrayFormApi("subtable_qi3yhq74d5hjshugc7");\r
  let hasDuplicates = false;\r
\r
  // 步骤4: 遍历选中数据，去重后追加到子表\r
  if (selected.length > 0) {\r
    for (const item of selected) {\r
      if (!existingIds.includes(item.id)) {\r
        arrayFormApi.append({\r
          input_fn9rvtd4dg1bn0r5lm: item.id,\r
          input_azgeyz5kf4pyecrxwt: item.input_y4ft9j6yi4vepev9zh,\r
          textarea_gsqb90xockw76gdxqh: item.input_rpb9twgfvdnidb36d7\r
        });\r
      } else {\r
        hasDuplicates = true;\r
      }\r
    }\r
  }\r
\r
  // 步骤5: 提示重复信息\r
  if (hasDuplicates) {\r
    ctx.message("不能重复新增，将跳过重复项!", "info");\r
  }\r
\r
  // 步骤6: 延迟执行后续逻辑，确保子表数据已渲染\r
  setTimeout(async () => {\r
    try {\r
      // 步骤7: 获取完整的子表数据\r
      const allRows = ctx.getArrayValue("subtable_qi3yhq74d5hjshugc7") || [];\r
      if (allRows.length === 0) return;\r
\r
      // 步骤8: 提取所有物料ID\r
      const materialIds = allRows\r
        .map(row => row.input_fn9rvtd4dg1bn0r5lm)\r
        .filter(id => id);\r
      if (materialIds.length === 0) return;\r
\r
      // 步骤9: 可根据物料ID批量查询库存或其他数据（此处预留接口）\r
      \r
    } catch (error) {\r
      console.error("查询库存失败:", error);\r
    }\r
  }, 50);\r
};\r
\`\`\`\r
\r
#### A改B，B改A方法\r
\r
\`\`\`\r
module.exports = function (params, ctx, block) {\r
  const rowIndex = params.index;\r
  const m = params.value == " blank-1" ? "√" : " ";\r
  ctx.setArrayValue(\r
    "subtable_fl1vdy5p5qysqk6d35",\r
    rowIndex,\r
    "input_tlcp9ctupaugujzinh",\r
    m,\r
  );\r
  const currentValue = params.value;\r
  const targetSwitch = "checkbox_0kwog3aq1b5o5ln7x1";\r
  const oldTargetValue = ctx.getArrayValue(\r
    "subtable_fl1vdy5p5qysqk6d35",\r
    rowIndex,\r
    targetSwitch,\r
  );\r
  const newTargetValue = currentValue == " blank-1" ? null : " blank-1";\r
  if (oldTargetValue !== newTargetValue) {\r
    ctx.setArrayValue(\r
      "subtable_fl1vdy5p5qysqk6d35",\r
      rowIndex,\r
      targetSwitch,\r
      newTargetValue,\r
    );\r
  }\r
};\r
\r
\`\`\`\r
\r
#### 自定义接口传表名方法\r
\r
\`\`\`\r
例子为传不同的表名根据字段生成自动编号。\r
DELIMITER $$\r
DROP PROCEDURE IF EXISTS generate_project_code$$\r
CREATE PROCEDURE generate_project_code(\r
    IN p_table_name VARCHAR(64),\r
    IN p_xmbh VARCHAR(50),\r
    IN p_code_column VARCHAR(64),\r
    IN p_fixed_name VARCHAR(100)\r
)\r
BEGIN\r
    SET @sql = CONCAT(\r
        'SELECT CONCAT(',\r
        'LPAD(COALESCE(MAX(CAST(SUBSTRING(', p_code_column, ' FROM 1 FOR 3) AS UNSIGNED)), 0) + 1, 3, ''0''), ',\r
        '''-', p_fixed_name, ''' ',\r
        ') AS new_code ',\r
        'FROM ', p_table_name, ' ',\r
        'WHERE xmbh = ''', p_xmbh, ''' ',\r
        '  AND sys_deleteflag = 0'\r
    );\r
    PREPARE stmt FROM @sql;\r
    EXECUTE stmt;\r
    DEALLOCATE PREPARE stmt;\r
END$$\r
DELIMITER ;\r
自定义接口代码：\r
db.plant2x.select([ CALL generate_project_code(#{table_name}, #{xmbh},#{code_column}, #{fixed_name});])\r
\`\`\`\r
\r
\r
\r
`,Yl={class:"page"},Jl={class:"toolbar"},eu={class:"seg"},tu={class:"body"},nu={key:0,class:"toc"},ru=["onClick"],au=["innerHTML"],su=Fe({__name:"index",setup(e){const n=jn,t=ye(jn),c=ye("preview"),l=ge(()=>f(t.value)),a=ge(()=>l.value.html),r=ge(()=>l.value.toc);function o(v){return v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function u(v){let w=o(v);return w=w.replace(/`([^`]+)`/g,"<code>$1</code>"),w=w.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),w=w.replace(/\*([^*]+)\*/g,"<em>$1</em>"),w=w.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),w}function h(v){return v.replace(/`([^`]+)`/g,"$1").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/<[^>]+>/g,"").trim()}function p(v){return'<div class="code-block"><button type="button" class="copy-btn">复制</button><pre><code>'+o(v)+"</code></pre></div>"}function f(v){const w=v.replace(/\r\n/g,`
`).split(`
`),A=[],C=[];let I=0,x=!1,T=[],N=null,P=0;const se=[],S=()=>{se.length&&(A.push("<p>"+u(se.join(" "))+"</p>"),se.length=0)},j=()=>{N&&(A.push(`</${N}>`),N=null)};for(;I<w.length;){const m=w[I];if(/^```/.test(m)){x?(x=!1,A.push(p(T.join(`
`)))):(S(),j(),x=!0,T=[]),I++;continue}if(x){T.push(m),I++;continue}const $=m.match(/^(#{1,6})\s+(.*)$/);if($){S(),j();const W="sec-"+P++,le=$[1].length;C.push({id:W,level:le,text:h($[2])}),A.push(`<h${le} id="${W}">${u($[2])}</h${le}>`),I++;continue}if(/^(---+|\*\*\*+)\s*$/.test(m)){S(),j(),A.push("<hr/>"),I++;continue}const he=m.match(/^>\s?(.*)$/);if(he){S(),j(),A.push("<blockquote>"+u(he[1])+"</blockquote>"),I++;continue}const F=m.match(/^[-*]\s+(.*)$/);if(F){S(),N!=="ul"&&(j(),A.push("<ul>"),N="ul"),A.push("<li>"+u(F[1])+"</li>"),I++;continue}const H=m.match(/^\d+\.\s+(.*)$/);if(H){S(),N!=="ol"&&(j(),A.push("<ol>"),N="ol"),A.push("<li>"+u(H[1])+"</li>"),I++;continue}if(/^\s*$/.test(m)){S(),j(),I++;continue}se.push(m.trim()),I++}return S(),j(),x&&A.push(p(T.join(`
`))),{html:A.join(`
`),toc:C}}function d(){const v=new Blob([t.value],{type:"text/markdown;charset=utf-8"}),w=URL.createObjectURL(v),A=document.createElement("a");A.href=w,A.download="自定义表单代码.md",document.body.appendChild(A),A.click(),document.body.removeChild(A),URL.revokeObjectURL(w)}function s(){t.value=n}function b(v){const w=document.getElementById(v);w&&w.scrollIntoView({behavior:"smooth",block:"start"})}function g(v){const w=v.target,A=w==null?void 0:w.closest(".copy-btn");if(!A)return;const C=A.closest(".code-block"),I=C==null?void 0:C.querySelector("pre code");if(!I)return;y(I.textContent??"");const x=A.textContent??"复制";A.textContent="已复制 ✓",A.classList.add("copied"),window.setTimeout(()=>{A.textContent=x,A.classList.remove("copied")},1500)}function y(v){navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(v).catch(()=>_(v)):_(v)}function _(v){const w=document.createElement("textarea");w.value=v,w.style.position="fixed",w.style.top="-9999px",w.style.opacity="0",document.body.appendChild(w),w.select();try{document.execCommand("copy")}catch{}document.body.removeChild(w)}return(v,w)=>(K(),re("div",Yl,[D("div",Jl,[D("div",eu,[D("button",{class:Pe({active:c.value==="preview"}),type:"button",onClick:w[0]||(w[0]=A=>c.value="preview")}," 预览 ",2),D("button",{class:Pe({active:c.value==="edit"}),type:"button",onClick:w[1]||(w[1]=A=>c.value="edit")}," 编辑 ",2)]),w[5]||(w[5]=D("span",{class:"spacer"},null,-1)),X(O(Ee),{size:"small",tertiary:"",onClick:s},{default:ne(()=>[...w[3]||(w[3]=[de("重置",-1)])]),_:1}),X(O(Ee),{size:"small",type:"primary",onClick:d},{default:ne(()=>[...w[4]||(w[4]=[de("下载 MD",-1)])]),_:1})]),D("div",tu,[c.value==="preview"?(K(),re(Ne,{key:0},[r.value.length?(K(),re("aside",nu,[w[6]||(w[6]=D("div",{class:"toc-title"},"目录",-1)),D("ul",null,[(K(!0),re(Ne,null,De(r.value,A=>(K(),re("li",{key:A.id,class:Pe("lv"+A.level)},[D("a",{href:"#",onClick:Tt(C=>b(A.id),["prevent"])},ue(A.text),9,ru)],2))),128))])])):Ae("",!0),D("div",{class:"preview markdown",innerHTML:a.value,onClick:g},null,8,au)],64)):Wr((K(),re("textarea",{key:1,"onUpdate:modelValue":w[2]||(w[2]=A=>t.value=A),class:"editor",spellcheck:"false",placeholder:"在此编辑 Markdown…"},null,512)),[[Gr,t.value]])])]))}}),iu=$e(su,[["__scopeId","data-v-950a0d2e"]]),ou=`---\r
type: 导航\r
status: 可用\r
updated: 2026-11-06\r
tags: [配置方法, 导航, 交付]\r
---\r
\r
# 自定义表单配置方法 · 总入口\r
\r
> 一句话：**从建表到验收，七个阶段串成一条闭环**。每段一页，页里写清用哪个 skill、边界、前提、输入输出、上下游、验收、本次踩过的坑、交接注意。\r
> 交付对象只看本目录即可理解与复用，不需要口头补充。\r
\r
## 闭环顺序（不可跳步）\r
\r
\`\`\`\r
1 数据表创建 → 2 表单设计 → 3 表单发布 → 4 流程设计 → 5 流程发布 → 6 测试验收 → 7 实战与常见问题\r
      ↑ 物理表先存在，控件才有列可绑           ↑ 有 functionId 才能建数据/发起\r
\`\`\`\r
\r
| 阶段 | 页面 | 主 skill / 文档 |\r
| :--- | :--- | :--- |\r
| 1 数据表创建 | [[01-自定义表单配置方法/02-数据表创建]] | \`update-package\` + 达梦SQL交付规范 |\r
| 2 表单设计 | [[01-自定义表单配置方法/03-表单设计]] | 自定义表单开发实战 + \`dynamic-form-datasource\` |\r
| 3 表单发布 | [[01-自定义表单配置方法/04-表单发布]] | \`prp-function-publish\` + \`batch-api-switch\` |\r
| 4 流程设计 | [[01-自定义表单配置方法/05-流程设计]] | \`batch-flow-create\` |\r
| 5 流程发布 | [[01-自定义表单配置方法/06-流程发布]] | \`batch-flow-create\` + \`env-debug\` |\r
| 6 测试验收 | [[01-自定义表单配置方法/07-测试验收]] | \`web-form-regression\` |\r
| 7 实战与常见问题 | [[01-自定义表单配置方法/08-实战与常见问题处理]] | 实战手册 + [达梦SQL交付规范](../工具/达梦SQL交付规范.md) + 各 skill 坑清单 |\r
\r
## 场景 → skill 总表（本库全部技能都在这里）\r
\r
| 你想干什么 | 用哪个 | 属于阶段 |\r
| :--- | :--- | :--- |\r
| 打现场更新包、导出业务库建表 SQL | \`update-package\` | 1 |\r
| 达梦 SQL 交付前体检 | 达梦SQL交付规范 + \`工具/dm_sql_lint.py\` | 1 |\r
| 查表结构 / 环境路由核对 | \`env-debug\` | 1（也贯穿全程） |\r
| 写表单事件、ctx 方法、子表、控件 id | \`01-自定义表单配置方法/实战/自定义表单开发实战.md\` | 2 |\r
| 数据源批量注入、下拉树排障、子表带值 | \`dynamic-form-datasource\` | 2 |\r
| 抓线上表单定义回沉淀 | \`form-browser-capture\` | 2 |\r
| 批量注入事件 / 自动化配置 | \`batch-api-switch\` + \`update-package\`（方法在技能包） | 2 |\r
| 表单增删改查回归、留证据 | \`web-form-regression\` | 6（能力在 2 也可用） |\r
| 页面调试固定流程 | \`bsk-page-debug\` | 6 |\r
| 功能批量发布 / 重挂菜单 | \`prp-function-publish\` | 3 |\r
| 资源接口批量上/下线 | \`batch-api-switch\` | 3 |\r
| 批量给表单配流程、节点/权限/流程图 | \`batch-flow-create\` | 4、5 |\r
| 改了不生效排查、发布流程管理 | \`env-debug\` | 3、5 |\r
| WorkBuddy 本机免 token 调接口 | \`wbipc-api-automation\` | 全程辅助 |\r
| 文字去 AI 味 | \`humanizer\` | 文档辅助 |\r
| 手册站改造、重新发布、工具跳转修复、官方文档校订 | \`handbook-site-maintain\` | 交付辅助 |\r
\r
## 统一术语（本库所有阶段只用这套说法）\r
\r
| 术语 | 含义 | 易混点 |\r
| :--- | :--- | :--- |\r
| 环境 | host + access_token，每次由使用者提供 | **不写进任何文档/技能** |\r
| 表单设计（画布态） | \`formAttributeJson\`，控件 dataBind/dataField/dataTable | 改画布 ≠ 字段注册生效 |\r
| 字段注册（运行态） | \`dy_form_field\`，bindingField = 物理表真实列名 | \`input_xxx\` 是控件 id，不是列名 |\r
| 功能（functionId） | 表单发布页产生的业务入口 | 表单 id ≠ functionId |\r
| 表单发布 | 功能挂菜单：pushStatus / parentMenuId / 5 个核心权限 | ≠ 流程发布 |\r
| 流程模型（modelId/modelKey） | 设计态 | save 接口会忽略 modelKey |\r
| 部署定义（procdefId） | 发布后的运行态版本 | 删模型 ≠ 删部署 |\r
| 运行中实例 | 绑定发起时的 procdefId | 发布新版救不了旧实例 |\r
| 节点表单权限 | 每节点两条：PC(1)、移动端(2) | 只配 PC 移动端停在模板默认 |\r
| formFile | 附件控件标准 filedKey | 缺了审批页附件不显示 |\r
| 业务数据（dataId） | 实例绑定的那条数据 | 建数据带 dataId = 更新语义 |\r
| 测试数据 | 统一前缀 + cleanup 台账 | 与「建数据」是两件事，见第 6 段 |\r
| 撤回 | 我的发起页终止运行中实例 | 不是删流程定义 |\r
\r
## 三个核心 skill 的职责边界\r
\r
| Skill | 管什么 | 不管什么 |\r
| :--- | :--- | :--- |\r
| 表单类（实战手册 + \`prp-function-publish\` + \`dynamic-form-datasource\`） | 让表单能打开、能填、能存 | 不生成流程、不写测试用例 |\r
| 流程类（\`batch-flow-create\`） | 让流程能建、能发、能跑、能排障 | 不写表单事件代码、不管测试资产 |\r
| 测试类（\`web-form-regression\`） | 证明跑得对、留下可重放证据 | 不定义平台接口、不改平台配置 |\r
\r
## 主本与维护\r
\r
- 技能主本：\`../.claude/skills/<技能名>/SKILL.md\`（本库 12 个技能已集中）；\`../.trae/skills/\`、\`../.workbuddy/skills/\` 是完全同步副本，禁止单独改。\r
- 接口契约变更 → 改流程 skill → 测试 skill 适配层跟着改；测试规范变更 → 只改测试 skill。\r
- 实测 > 理论；数据库只读（查库走 MCP、仅 SELECT）；改前先备份 / 先试点 / dry-run。\r
- 新增文档前先想能不能并进既有文件；具体 id / 地址 / 表清单不落库。\r
- 自定义表单批量配置、表单打包导出 SQL、技能包打包/上传的方法只写在 \`update-package\` 技能包，本目录只作入口引用。\r
\r
## 开工自检\r
\r
- [ ] 拿到环境 host + 有效 token、确认库类型\r
- [ ] 拿到建表 SQL、表单设计 SQL、functionId 清单、procdefId 与版本号\r
- [ ] 有统一测试数据前缀与 cleanup 台账；做过批量临时改动要有回滚清单\r
- [ ] 按 1→7 顺序逐段核对验收标准，缺哪段补哪段，不跳步\r
`,lu=`---\r
type: 配置方法\r
stage: 1\r
status: 可用\r
tags: [建表, 交付, 达梦]\r
---\r
\r
# 1 · 数据表创建（链路起点）\r
\r
> **位置**：配置方法第 0 步，在表单设计之前。表单控件绑物理表字段，表不存在则字段注册、数据保存、流程发起全断。\r
\r
| 项 | 内容 |\r
| :--- | :--- |\r
| 涉及 skill | [\`update-package\`](../.claude/skills/update-package/SKILL.md)（建表 DDL / 更新包分段）；[\`env-debug\`](../.claude/skills/env-debug/SKILL.md)（只读查库）；[达梦SQL交付规范](../工具/达梦SQL交付规范.md)；工具 \`../工具/dm_sql_lint.py\` |\r
| 职责边界 | 只做**物理表与列**；不写控件、不建流程、不写用例 |\r
| 适用前提 | 库类型已确认（达梦/PG/MySQL）；有字段清单或 \`fieldByTable\` 可查 |\r
| 输入 | 字段清单（列名/类型/长度/可空）、库类型、只读连接、环境 |\r
| 交付物 | 业务库建表 SQL（幂等）、MongoDB 表单设计 SQL、更新说明（先备份 → 先 MongoDB 后业务库 → 执行后重新发布表单） |\r
| 上下游 | 上游：需求/旧系统表结构；下游：表单设计按 bindingField 绑列 |\r
| 验收标准 | 目标库能查到表与全部列；类型长度一致；交付前静态体检 0 问题；脚本重复执行不报错不重复插 |\r
| 本次问题与解决办法 | ① \`download_form_sql\` **只导表单设计段、不含建表** → 首次交付必须另出建表 DDL，用 \`fieldByTable\` 实际结构生成（达梦类型映射）。② 达梦 VARCHAR 按**字节**（汉字 3 字节），照抄 MySQL 窄列宽报 -6169 → 按字节放大 + 静态体检器。③ INSERT 列名凭猜 → 一律查真实表结构。④ 脚本被跑多次 → 第 0 步精确清理再插入 |\r
| 交接注意事项 | 环境地址/账号不落库；数据库只读，改数据走界面；**建表 SQL 与表单设计 SQL 必须一起交付**；SQL 分段数量对齐 |\r
`,uu="---\r\ntype: 配置方法\r\nstage: 2\r\nstatus: 可用\r\ntags: [表单设计, 事件, 数据源]\r\n---\r\n\r\n# 2 · 表单设计\r\n\r\n> 让表单**能打开、能填、能存**。上游是建表，下游是表单发布。\r\n\r\n| 项 | 内容 |\r\n| :--- | :--- |\r\n| 涉及 skill | [实战/自定义表单开发实战](实战/自定义表单开发实战.md)（主体：事件/ctx/子表/坑）；[`dynamic-form-datasource`](../.claude/skills/dynamic-form-datasource/SKILL.md)；[`form-browser-capture`](../.claude/skills/form-browser-capture/SKILL.md)；技能包 `update-package`（自定义表单批量配置） |\r\n| 职责边界 | 画布控件、事件代码、数据源、字段注册；**不做功能发布、不配流程** |\r\n| 适用前提 | 第 1 段物理表已建；已知 formId 与控件 dataBind |\r\n| 输入 | 物理表结构、字段清单、字典/接口契约、事件需求 |\r\n| 交付物 | `formAttributeJson`（画布）、`dy_form_field` 注册（运行态）、数据源配置、事件代码块、表单设计 SQL |\r\n| 上下游 | 上游：数据表创建；下游：表单发布要 formId，流程设计要 dataField/dataTable 生成节点权限与必填值 |\r\n| 验收标准 | 设计器能打开；`PUT /dynamic/form/attribute + dyFormFieldAddList` 后字段注册齐全（**全量替换语义**）；主/子表字段各归各表；必填控件能生成合法值；线上定义与交付 SQL 对拍一致 |\r\n| 本次问题与解决办法 | ① 拖控件直接保存才写 `dy_form_field`；`PUT /dynamic/form` **静默忽略 vos（假成功）** → 改走 attribute 接口，且 addList 只发新增行会把整表注册删光。② 子表必填值塞主表 → 报「列 X 不存在」，按 `props.dataTable`/`isInSubForm` 放进子表行。③ 表单 id 不是动态表单（如 `meetingMinutes`，attribute 失败）→ 判定表单本身异常，需在表单定义重建，不能硬绑流程。④ 改画布返回 200 但业务接口不变（运行态读另一份）→ 复测必须打业务接口 |\r\n| 交接注意事项 | 控件 id 每环境不同，示例只作占位；契约不明**先抓真实请求，不要连发探测写接口**（很多平台先落库再校验，500 也会写坏）；表单与流程同包更新时 formId 不变，无需重绑 |\r\n",du="---\r\ntype: 配置方法\r\nstage: 3\r\nstatus: 可用\r\ntags: [功能发布, 菜单, 权限]\r\n---\r\n\r\n# 3 · 表单发布\r\n\r\n> 把**未发布功能**挂到菜单、勾权限、配列表列。下游流程设计与测试验收都拿 functionId。\r\n\r\n| 项 | 内容 |\r\n| :--- | :--- |\r\n| 涉及 skill | [`prp-function-publish`](../.claude/skills/prp-function-publish/SKILL.md)（主）；[`batch-api-switch`](../.claude/skills/batch-api-switch/SKILL.md)（接口上下线，须「全下线→全上线」才生效）；[`env-debug`](../.claude/skills/env-debug/SKILL.md)（路由速查） |\r\n| 职责边界 | 发布功能、挂菜单、勾权限、配列表列；不改画布、不建流程 |\r\n| 适用前提 | 表单设计完成；有菜单树与目标上级菜单 id；有 token |\r\n| 输入 | 未发布功能清单、`formButtonId`（每表单各自生成）、上级菜单 id、5 个核心权限 |\r\n| 交付物 | 已发布功能（pushStatus）、菜单挂载、列表列配置、**functionId 清单** |\r\n| 上下游 | 上游：表单设计；下游：**没有 functionId，建数据与发起都失败** |\r\n| 验收标准 | 状态=已发布；菜单入口可见；新增/编辑/保存/查看/删除 5 权限齐全；列表能显示数据；每条功能有可用 functionId |\r\n| 本次问题与解决办法 | ① `PUT /dynamic/function` 会**清空按钮** → body 必须带 `dyFunctionButtonAddDtoList` 恢复 5 权限（踩过两次）。② `currentPage+size(≤20)` 翻页、`total` 不可信 → 按 id 去重。③ `formButtonId` 用错报 900 → 逐表单从 `/dynamic/form/button/{formId}` 取。④ TREE_SHOW 的 `treeFunctionId` 悬空需人工；TREE_MAINTENANCE 必须去掉 `menuColumnDtoList`。⑤ 本次 85878、60061 **缺功能入口** → 建数据/发起被卡。⑥ 列表列不勾 → 一条数据都不显示 |\r\n| 交接注意事项 | 发布是**整份详情回显再改 3 项**，别拼残缺 body；PUT 是集合路径 `/dynamic/function`；token 401/403 立即换新；发布完把 functionId 清单交给下游 |\r\n",cu="---\r\ntype: 配置方法\r\nstage: 4\r\nstatus: 可用\r\ntags: [流程设计, 节点权限, 选人]\r\n---\r\n\r\n# 4 · 流程设计\r\n\r\n> 让流程**能建、能配、能排障**。上游表单发布，下游流程发布。\r\n\r\n| 项 | 内容 |\r\n| :--- | :--- |\r\n| 涉及 skill | [`batch-flow-create`](../.claude/skills/batch-flow-create/SKILL.md)（主，含 `scripts/`、`references/diagram-layout.md`、`node-attr-spec.md`、`prp-migration-sop.md`）；[`env-debug`](../.claude/skills/env-debug/SKILL.md) |\r\n| 职责边界 | BPMN 生成/导入、节点/连线/审批人/节点权限/变量/编号规则/流程图布局；**不做表单发布、不写测试用例** |\r\n| 适用前提 | 表单设计与发布完成；审批节点清单已定；functionId 可用 |\r\n| 输入 | 表单设计（提取审批节点）、节点清单、审批人规则、旧配置（迁移场景）、目标分类 id |\r\n| 交付物 | 流程模型（modelId/modelKey + BPMN）、节点属性、节点表单权限（PC+移动端）、流程图 zip、配置结果清单、回滚清单 |\r\n| 上下游 | 上游：表单发布；下游：流程发布（deploy）；测试验收按节点权限与选人规则验证 |\r\n| 验收标准 | 节点数与清单一致；流程图五项体检 0 偏移；节点属性 8 字段齐全（否则「基础属性未填写」）；PC/移动端权限一致且含 `formFile`；无默认人残留；发布后显示节点 ID |\r\n| 本次问题与解决办法 | ① **重导会弄断 formauth 关联** → 重导后必须重跑字段权限并重新发布。② **附件不显示**：全量 PUT 只发业务字段、覆盖 `formFile` → 每节点 PC+移动端权限都补 formFile（view=1/edit=2）。③ **默认人**：迁移导入给每节点插「占位管理员」，36 张流程 182 节点残留 → 从 `design-node-user.list` 的 `data.bo` 清除（BPMN 无硬编码 assignee）。④ **选人口径**：`wfDesignAttribute.startUser=2`（启动时选人=全部人员）；节点 7 项开关按定稿；「全局选人」开/关按页面有无人员字段切换，不写死。⑤ 移动端权限 ≠ PC → 以 PC 为准全量对齐。⑥ 流程图渲染 90×60、waypoint 不吸附 → 平台尺寸 + 端点贴边 + 全正交 + 每行≤6 蛇形折行。⑦ 改节点参数走接口，别重导整包 |\r\n| 交接注意事项 | 包内 XML 文件名带目标分类 id；nodeForms 缺 createTime 会被丢弃；importModel 连发间隔 6~8s；改包必须从线上导出再改；批量临时改动必须留回滚快照 |\r\n",fu=`---\r
type: 配置方法\r
stage: 5\r
status: 可用\r
tags: [deploy, 发布, 版本]\r
---\r
\r
# 5 · 流程发布\r
\r
> 把设计态模型部署成运行态 procdefId。测试验收必须用**最新版本**。\r
\r
| 项 | 内容 |\r
| :--- | :--- |\r
| 涉及 skill | [\`batch-flow-create\`](../.claude/skills/batch-flow-create/SKILL.md)（发布/删历史部署/改名）；[\`env-debug\`](../.claude/skills/env-debug/SKILL.md)（发布流程管理路由） |\r
| 职责边界 | 部署 procdefId、清理历史部署；**不写业务数据** |\r
| 适用前提 | 第 4 段验收通过；无「基础属性未填写」类报错 |\r
| 输入 | modelId、BPMN、节点配置、目标环境 |\r
| 交付物 | 已部署 procdefId（带版本号）、发布记录、旧部署清理结果 |\r
| 上下游 | 上游：流程设计；下游：测试验收取 \`flowDefInfoList\` 中版本最高的 procdefId |\r
| 验收标准 | deploy 200；能查到最新版本；发起不会弹「手动二选一」；改配置发布后页面行为跟着变 |\r
| 本次问题与解决办法 | ① **改设计不发布 = 页面跑老版本快照** → 每轮改动后强制发布。② **删模型 ≠ 删部署**：同表单挂两个定义会让发起时手动二选一 → 去 \`#/flow/deploy\` 或 \`DELETE /workflow/deploy/{procdefId}\` 清理。③ 运行中实例绑旧定义 → 本次撤回 15 条运行中实例后重走，才验证到 formFile 与选人修复。④ modelKey 改名 \`save\` 锁死 → 导出副本法（生效口径是 BPMN process id）。⑤ 98 环境 Druid+达梦 \`INSERT ALL\` 解析属**环境级**，曾导致任何流程发起失败 → 运维工单（升级 Druid / 去掉 wall filter），与配置无关 |\r
| 交接注意事项 | 发布后记录 procdefId 与版本号；测试前确认最高版本；页面和 API 双路径都失败 = 环境问题，别往配置里找 |\r
`,hu='---\r\ntype: 配置方法\r\nstage: 6\r\nstatus: 可用\r\ntags: [回归测试, 验收, 清理]\r\n---\r\n\r\n# 6 · 测试验收\r\n\r\n> 证明**跑得对**，并留下可重放证据。\r\n\r\n| 项 | 内容 |\r\n| :--- | :--- |\r\n| 涉及 skill | [`web-form-regression`](../.claude/skills/web-form-regression/SKILL.md)（主：薄 CLI + 落盘 + story 用例）；[`bsk-page-debug`](../.claude/skills/bsk-page-debug/SKILL.md)（页面调试）；[`batch-flow-create`](../.claude/skills/batch-flow-create/SKILL.md) 提供**执行器与接口事实**（`real_test7.py` / `run_flow7.py`、建数据与发起接口）；[`env-debug`](../.claude/skills/env-debug/SKILL.md) |\r\n| 职责边界 | 测试 skill 管「怎么测、证据、用例、测试数据生命周期」；流程 skill 只提供「怎么把数据写进平台、怎么发起」的接口事实。**不写平台配置、不定义接口** |\r\n| 适用前提 | 流程已发布且有 procdefId；functionId 可用；登录态有效；有统一测试数据前缀 |\r\n| 输入 | 验收场景（停第一节点 / 走完全流程）、必填字段规则（表单段）、接口契约（流程段）、期望结果 |\r\n| 交付物 | `story-result.json`、`net.jsonl`、`snapshots/`、`shots/`（只截失败）、`stories/` 可重放用例、`cleanup.json`、验收结论 |\r\n| 上下游 | 上游：流程发布 + 表单发布；下游：交付上线，遗留问题回流各 skill 坑清单 |\r\n| 验收标准 | 能发起、停第一节点；选人弹窗有人员树且能选人；走完全流程后业务状态=完成；附件可见；PC/移动端权限一致；失败项写「未确认」不猜；清理后无残留；用例可重放 |\r\n| ★ 建数据 vs 测试数据准备 | **建数据**（流程 skill）= 单条业务数据写入契约：`POST /dynamic/form/scheme/data/{functionId}`（不带 dataId）、键用 bindingField 真实列名、子表必填值进子表行、必填控件合法值生成。**测试数据准备**（测试 skill）= 一次测试的数据生命周期：统一前缀标注、批量数量、建前查重、cleanup.json 台账、只删自己建的、残留告警、用例可重放。衔接点：测试 skill 适配层**引用**流程 skill 的接口事实，不复制 |\r\n| 本次问题与解决办法 | ① 发起报「请传入业务数据ID」：真实 body 是 `{"dictData":{主表:行,子表:[]}}`（与保存数据同构）→ 抓一次 UI 真实请求定契约，别猜键名。② 本次建 11 条测试数据、各发起一条实例，全标「测试流程」；旧实例撤回 15 条后重走验证。③ 选人器一度无法选人 → 核对为配置组合问题（页面缺人员字段时开全局选人），实测弹窗列出完整组织树、选人后发起成功。④ CGLX 走完 11 步（含单源分支）→ 业务状态完成。⑤ token 隔天失效 → 浏览器 `localStorage.access_token` 换新；urllib 读接口偶发空 → 读走 curl、大 body 写走 urllib。⑥ 测试数据清理台账缺失 → 归入 cleanup.json 口径 |\r\n| 交接注意事项 | 生产写操作先确认；只删自己建的；凭证不落盘；判定落库看详情接口或产物，别信列表条数；快照/请求日志即时落盘；只留最近 3 轮 run；失败表单截两张（列表页 + 表单本体） |\r\n',pu=`---\r
type: 配置方法\r
stage: 8\r
status: 可用\r
tags: [实战, 常见问题, 排障, FAQ]\r
---\r
\r
# 08 · 实战与常见问题处理\r
\r
> 详细分类见 [实战/自定义表单开发实战](实战/自定义表单开发实战.md)（表单代码类）与 [达梦SQL交付规范](../工具/达梦SQL交付规范.md)（SQL 类）。本页是配置方法专用速查。\r
\r
| 现象 | 根因 | 处理 | 阶段归属 |\r
| :--- | :--- | :--- | :--- |\r
| 执行后表单还是空的 | 只交表单设计 SQL，没交建表 DDL | 补业务库建表 SQL，先 MongoDB 后业务库 | 1 |\r
| 达梦 -6169 / 插入列数不匹配 | VARCHAR 按字节、列名凭猜 | 字节级静态体检 + 查真实列定义 | 1 |\r
| 改了表单不生效 / 字段注册丢失 | \`PUT /dynamic/form\` 假成功、addList 全量替换 | 改走 attribute 接口，每次发全量 | 2 |\r
| 保存报「列 X 不存在」 | 子表必填值塞进主表 | 按 dataTable/isInSubForm 放进子表行 | 2、6 |\r
| 表单 id 不是动态表单 | 表单本身异常 | 表单定义重建，不硬绑流程 | 2 |\r
| 发布后按钮全没了 | \`PUT /dynamic/function\` 清空按钮 | body 带 dyFunctionButtonAddDtoList 恢复 5 权限 | 3 |\r
| 列表一条数据都不显示 | 列表列未勾选 | 配 menuColumnDtoList 必勾清单 | 3 |\r
| 建数据/发起找不到功能 | 缺 functionId | 表单发布阶段补齐并交出清单 | 3 |\r
| 重导后字段权限失效 | 重导弄断 formauth 关联 | 重跑字段权限 + 重新发布 | 4 |\r
| 审批页附件不显示 | 节点权限缺 formFile | 每节点 PC+移动端都补 formFile | 4 |\r
| 移动端与 PC 权限不一致 | 只配了 formSourceType=1 | PUT 的 bo 同时发 1/2 两条 | 4 |\r
| 待办默认落管理员 | 节点残留「默认人」占位条目 | 从 design-node-user 的 data.bo 清除 | 4 |\r
| 人员选择器选不了人 | 配置组合（页面缺人员字段 / 全局选人口径） | 按页面字段有无切换；核对启动时选人=全部人员 | 4 |\r
| 流程图箭头悬空 | Bounds 宽高被忽略、waypoint 不吸附 | 90×60 + 端点贴边 + 全正交 | 4 |\r
| 发布报「基础属性未填写」 | nodeAttrs 缺 8 字段 | 从线上导出补齐 | 4 |\r
| 改了配置页面没变 | 没发布 / 运行中实例绑旧定义 | 发布 + 撤回旧实例重走 | 5 |\r
| 发起时让手动选流程 | 删模型但历史部署还在 | \`#/flow/deploy\` 或 DELETE procdefId | 5 |\r
| 任何流程都发不起（页面+API 都失败） | 环境级：达梦 + Druid INSERT ALL | 运维升级 Druid / 去掉 wall filter | 5 |\r
| 发起报「请传入业务数据ID」 | dictData 结构用错 | 用 \`{主表:行,子表:[]}\` 与保存同构的 body | 6 |\r
| 选人弹窗空 / 无人员树 | 选人接口取旧版本定义 | 取最高版本 procdefId，发布后重走 | 6 |\r
| 接口 200 但没生效 | 载荷形状/取值不对、派生数据未同步 | 抓真实请求对齐契约；复测打业务接口 | 6 |\r
| 测试数据残留 | 无统一前缀与清理台账 | cleanup.json + 只删自己建的 | 6 |\r
| token 401/403 | 隔天失效 | 浏览器 localStorage 换新 | 全程 |\r
\r
## 问题回流规则\r
\r
1. 新问题先判**阶段归属**，再写进该阶段页的「本次问题与解决办法」。\r
2. 通用方法（抓真实请求、dry-run、单点试点）只在测试 skill 写；平台特有接口/报错写进对应 skill 的坑清单。\r
3. 同一坑第二次出现 = 沉淀失败：当场把「成功那次的请求 / body 结构」记进 skill，别再猜第三次。\r
4. 环境级问题（页面 + API 双路径都失败）单列，不混进配置结论。\r
\r
\r
---\r
\r
## 附：按症状查（原《常见问题处理》全文并入）\r
\r
 | :--- | :--- |\r
| 改完事件代码 / 表单设计，页面还是老样子 | **刷新页面**（Ctrl+Shift+R）。框架已自动发布，**不需要手动“重新发布”** | 平台机制 |\r
| 保存了但完全没变化 | 确认改的是同一张表单（多环境容易改错库）；F12 看 console 有无报错 | 首页 |\r
| 报 405 / 401 | 405 = 接口路径错；401 = token 过期，重新登录 | 首页 |\r
\r
## 二、代码写了不执行\r
\r
| 症状 | 原因 | 解法 |\r
| :--- | :--- | :--- |\r
| 代码里写了函数，**不执行也不报错** | 平台脚本**禁止嵌套 function**（函数体内再定义 function，含 \`forEach(function(){})\` 回调） | 循环用 \`for\`，回调用**箭头函数** |\r
| console 里啥都没有 | 事件槽挂错位置：子表按钮代码在 \`actions[i].event\`，不是主表按钮槽 | 对照设计器的事件面板 |\r
| 取值拿到 undefined | 控件 id 不对（id 跨表单/跨环境全不同） | 三条路查 id，见实战 §1；或用 \`getControlIdByField\` 反查 |\r
\r
## 三、子表 / 控件操作\r
\r
| 症状 | 原因 | 解法 |\r
| :--- | :--- | :--- |\r
| 改一行子表，**整个子表行全没了** | \`setArrayValue(子表id, 数组)\` 是**整表替换** | 改单格必须 \`setArrayValue(子表id, 行号, 字段id, 值)\` |\r
| 子表加行后立刻读不到新行 | 加行是异步渲染 | \`setTimeout(100ms)\` 再读，或走 \`getArrayFormApi().append\` |\r
| 行内取主表字段取不到 | 不知道要不要传 instanceId | 行内直接 \`ctx.getValue(主表字段id)\`，会回落主表 |\r
| 想“只能弹窗选、不能手输” | 设计器勾 \`readonly\`/\`disabled\` 会把弹窗按钮一起禁掉 | created 里 DOM \`setAttribute("readonly", true)\`，见实战 §2.18 |\r
\r
## 四、选人控件（org）\r
\r
| 症状 | 原因 | 解法 |\r
| :--- | :--- | :--- |\r
| 人员白名单过滤**不生效** | 普通版 \`customFilterFn(users, orgs, pos)\` 是废的，\`users\` 恒为空 | 用**高级版** \`customFilterFnAdvanced(params, ctx, block)\`，白名单筛 \`params.users\`，见实战 §2.19 |\r
| 只想显示某个部门的人 | 默认全公司 | \`ctx.setInstance(控件id, "currentOrg", 部门id)\`，见实战 §2.20 |\r
| 部门清空后还锁在旧部门 | \`currentOrg\` 没跟着清 | 部门清空时把 \`currentOrg\` 置 \`""\` |\r
\r
## 五、交付 / 数据库\r
\r
| 症状 | 原因 | 解法 |\r
| :--- | :--- | :--- |\r
| 达梦建表后中文被截断 | 达梦 \`VARCHAR(n)\` 的 n 是**字节**，UTF-8 汉字占 3 字节 | 列宽按字符数 ×3 放大，详见 **达梦 SQL 交付规范（踩坑沉淀）** |\r
| 现场执行 SQL 报无效的列名 | 源库和目标库表结构不一致 | 迁移前先做列级对比，只对“两边都有”的表出补列语句 |\r
| 页面对了、库里数据不对 | 页面渲染 ≠ 落库 | 让 AI 走 dbx 查库核对（只读），别只看页面 |\r
\r
## 六、找东西\r
\r
| 想找 | 去哪 |\r
| :--- | :--- |\r
| 某个控件 id / 字段绑定 | 设计器复制、\`dy_form_field\` 查库、\`form_attribute\` 接口三选一（实战 §1） |\r
| 现成代码怎么写 | 自定义表单开发实战（API + 实例）/ 表单实测代码库 |\r
| 批量改几十张表单 | 技能包 update-package（批量配置，见 01-总览） |\r
`,mu=`---\r
type: 实战\r
status: 可用\r
created: 2026-09-08\r
updated: 2026-10-22\r
tags:\r
  - 自定义开发\r
  - 表单\r
  - API\r
  - 代码片段\r
  - 子表\r
---\r
\r
# 自定义表单开发实战（API + 实例）\r
\r
> **一篇讲完**：按 API 组织，每个 API 配一个线上实测的实例。来源 = 官方文档浓缩 + 491 张线上表单实抓\r
> + 项目实战定稿。原《表单API参考》《自定义表单开发实战》《子表带值与编号规则》三篇已合并为本篇。\r
>\r
> **权重声明**：与官方文档冲突时以本篇实测为准；框架文档的方法（\`formApiController.getApi()\` 类）\r
> 线上 **0 命中**，默认不可用，事件入口一律 \`module.exports = function (params, ctx, block) {}\` + \`ctx.xxx\`。\r
> **标记**：✅ = 用户确认可跑；📦 = 实抓未逐条验证。\r
> 全量线上代码（12,908 段）在 \`.workbuddy/form_code_inventory.json\`，让 AI 按需检索。\r
\r
## 0. 查任意表单字段 id 的三条路（先读这个）\r
\r
1. **查库**（最全）：\`plant.dy_form_field\`，控件 id 在 \`code\` 列、业务字段在 \`binding_field\`：\r
   \`\`\`sql\r
   SELECT sub_form, sub_form_code, code, title, binding_field, binding_table\r
   FROM plant.dy_form_field\r
   WHERE form_id = '<表单formId>' AND del = false\r
   ORDER BY sub_form, sort;\r
   \`\`\`\r
   （查库一律走 dbx MCP、只读；表单绑定哪张表看设计器或 attribute 接口的 \`mainTable\`）\r
2. **查接口**（含事件/按钮代码）：\`GET /apis/dynamic/form/attribute/{formId}\` → \`data.formAttributeJson\`（JSON 串）\r
3. **设计器复制**：控件属性面板最下方 \`type_随机串\` 就是 instanceId；\r
   代码里用 §3.5 的 \`getControlIdByField\` 按 dataField 反查，别硬编码。\r
\r
### 0.1 线上全量数据（491 张表单实抓，先记住三件事）\r
\r
1. **按钮的 click/beforeClick/afterClick 三槽存同一段代码**（3179 组同码 vs 637 异码）——改按钮只维护一份。\r
2. **框架方法生产代码 0 命中**，全部走 \`ctx.xxx\`。\r
3. **常用能力就十几个**（按使用次数）：\`getValue\` 2767 · \`setValue\` 1498 · \`params.instance\` 839 ·\r
   \`params.message\` 607 · \`message\` 309 · \`params.row\` 298 · \`setDatas\` 213 · \`getArrayValue\` 169 ·\r
   \`setArrayValue\` 156 · \`setInstance\` 152 · \`getInstance\` 142 · \`params.confirm\` 119 ·\r
   \`getArrayFormApi\` 82 · \`visibles\` 74 · \`disableds\` 21 —— 写代码前先看这里，**别发明新 API**。\r
   要找某个具体表单/某类功能的真实写法：对 AI 说「把所有做了编号生成的 change 事件捞出来」\r
   这类话，AI 从 \`.workbuddy/form_code_inventory.json\`（12,908 段，含表单来源与挂载点）检索。\r
\r
---\r
\r
## 1. 核心概念：instanceId vs dataBind（最重要）\r
\r
| 术语 | 是什么 | 示例 |\r
| :--- | :--- | :--- |\r
| **instanceId** | 系统生成的控件唯一 ID，**始终不变** | \`input_ah2wl95gdra4f\` |\r
| **dataBind** | 控件与后端字段的逻辑绑定标识 | \`flow_purchase.ID\`（主表顶层）/ \`flow_purchase_product.name\`（子表行内） |\r
| **Instance** | 控件运行时对象，含全部 \`props\` | \`ctx.getInstance(id)\` 获取 |\r
\r
**实测结论**：\`getValue/setValue/getInstance\` 等里 **instanceId 始终可靠**；dataBind 能否命中取决于查找链，\r
子表行内、特殊字符、嵌套 state 都会失配返回 \`undefined\`。\r
\r
\`\`\`js\r
// ✅ 推荐：instanceId（最稳）\r
const inst = ctx.getInstance('input_ah2wl95gdra4f');\r
const val  = ctx.getValue('input_ah2wl95gdra4f');\r
\r
// ⚠️ 可用但有局限：dataBind（仅主表顶层可靠）\r
const val2 = ctx.getValue('flow_purchase.ID');\r
\r
// 🔥 危险：子表行内字段用 getValue 必失败（真实路径带行号）\r
ctx.getValue('flow_purchase_product.name'); // => undefined\r
\`\`\`\r
\r
**判断规则**：主表顶层 → \`ctx.getValue / setValue / visibles / ...\`；子表行内 → 必须用\r
\`getArrayValue / setArrayValue / getArrayInstance / setArrayInstance\`（§5）。\r
\r
---\r
\r
## 2. 事件列表（全部 19 个）\r
\r
事件在控件 \`props.events\` 按 \`event\` key 注册，签名统一 \`module.exports = function (params, ctx, block) {...}\`。\r
\r
### 用户触发\r
\r
| 事件 | 触发时机 | params 关键字段 | 典型用途 |\r
| :--- | :--- | :--- | :--- |\r
| \`CLICK\` | 点击控件 | \`params.value\` | 提交、Tree 节点点击 |\r
| \`CHANGE\` | 值变化 | \`params.value\`（官方文档另写 \`params.oldValue\`，**实测不存在**） | 联动、动态校验 |\r
| \`FOCUS\` | 获焦 | \`params.value\` | 缓存旧值（见 §8）、帮助信息 |\r
| \`BLUR\` | 失焦 | \`params.value\` | 实时校验 |\r
\r
### 表单周期\r
\r
| 事件 | 触发时机 | params 关键字段 |\r
| :--- | :--- | :--- |\r
| \`CREATED\` | FormView 首次挂载完成 | — |\r
| \`BEFORE_SUBMIT\` | 提交时、校验通过后 | \`params.value\` = **提交数据对象**（取它，不要取 \`params.args[0]\`，✅ 实测） |\r
| \`AFTER_SUBMIT\` | 提交 callback resolve 后 | — |\r
\r
> \`BEFORE_SUBMIT\` 返回值：\`false\` = 阻断提交；返回对象 = 用它替代 submitValue；\`undefined\` = 正常提交。\r
> 校验失败 / \`BEFORE_SUBMIT\` 返回 false 时 \`AFTER_SUBMIT\` 不触发。\r
\r
### 子表（自增组件）事件\r
\r
| 事件 | 触发时机 | params |\r
| :--- | :--- | :--- |\r
| \`ADD_ROWS\` | 新增行 | \`params.args[0].list\` |\r
| \`REMOVE_ROWS\` | 删除行 | \`params.args[0].list\` |\r
| \`SELECT_ROWS\` | 行被选中 | \`params.args[0]\` |\r
\r
> 触发源含 \`append/prepend/insert/update/replace/rowAppend/remove\`；**swap/move/hidden 不触发**。\r
\r
### 组件生命周期 / 上传 / 按钮 / 视图\r
\r
| 事件 | 触发时机 | 备注 |\r
| :--- | :--- | :--- |\r
| \`MOUNTED\` | 控件挂载完成 | 取值时序比 CREATED 稳 |\r
| \`UNMOUNTED\` | 控件卸载 | params 不含 value/getValue 等 |\r
| \`BEFORE_UPLOAD\` | 上传前 | \`return false\` 阻断上传 |\r
| \`UPLOAD_SUCCESS\` / \`UPLOAD_FAIL\` / \`DELETE_FILE\` | 上传成功/失败/删除文件 | 典型：成功后写文件 id、删除时清值 |\r
| \`SELECTED\` | 多选按钮切换 | 仅切换型按钮有效 |\r
| \`TABCHANGED\` | 标签页切换 | \`params.value\` = 新 key |\r
| \`VIEW_MODE_CHANGE\` | 编辑态↔查看态 | \`params.value.isView\` |\r
\r
### 返回值规则\r
\r
- **仅 \`BEFORE_SUBMIT\` 和 \`BEFORE_UPLOAD\` 的返回值有意义**；其余 17 个事件返回值被丢弃\r
  —— 想在 \`ADD_ROWS\` 里 \`return false\` 拦新增？拦不住（§5.2 的正确做法是自己接管新增按钮）。\r
- 同一事件多个处理器按 \`props.events\` 数组顺序执行。\r
\r
### params（事件上下文）\r
\r
| 成员 | 说明 |\r
| :--- | :--- |\r
| \`params.value\` | 触发时刻的**快照值**（CHANGE = 新值；只读语义，赋值不写回） |\r
| \`params.oldValue\` | ⚠️ **实测不存在**。要旧值用 FOCUS 缓存法（§8） |\r
| \`params.getValue()\` / \`params.setValue(v)\` | 取/改**当前控件**最新值 |\r
| \`params.index\` / \`params.row\` | 仅子表内：当前行号 / 当前行数据（实时 getter） |\r
| \`params.instance\` / \`params.getInstance()\` | 当前组件实例（含 \`props\`） |\r
| \`params.parent\` | 父级实例（子表内 = 子表实例） |\r
| \`params.setInstance(prop, value)\` | 改当前组件属性 |\r
| \`params.disabled/required/options(v?)\` | 快捷读写（\`props\` 含该 key 才存在） |\r
| \`params.validate()\` | 校验当前组件（仅 FormControl/FormView） |\r
| \`params.deleteCurrentRow()\` 等 | 子表行级方法（见 §5.3） |\r
\r
### 2.18 选择弹窗 input 禁手输：DOM setAttribute("readonly")（✅ 实测 2026-10-28）\r
\r
场景：控件开了「选择弹窗」（\`isSelectModal\` + \`selectDataSource\`），要求**只能弹窗选、不能手输**。\r
\r
试过都**不行**的路子：\r
\r
- 设计器勾 \`readonly\` / \`disabled\`：平台把弹窗按钮（input 内部的 down 图标）**一起禁掉**，弹窗点不开；\r
- created 里 \`ctx.setInstance(id, "readonly", true)\`：同上，按钮一起死；\r
- CSS \`pointer-events: none\` + 把弹窗按钮铺满控件区：只挡鼠标、**键盘照样输**，手快的人在弹窗出来前就能敲进去；\r
- keydown 拦截 / blur 定时器驱逐焦点：能治但丑，还要防输入法上屏。\r
\r
**终解**：created（初始化）里直接用 DOM 给 input 设**原生 readonly** —— 绕过平台控件层，浏览器原生禁键盘；弹窗按钮（\`anticon-down\`）是 input 的**兄弟元素**，完全不受影响：\r
\r
\`\`\`js\r
module.exports = function (params, ctx, block) {\r
  var el = document.querySelector("span.input_<控件id> > input");\r
  if (el) el.setAttribute("readonly", true);\r
};\r
\`\`\`\r
\r
- 选择器：wrapper 是 \`span.input_<控件id>\`，input 是它的子元素（结构以 F12 实际为准）；\r
- \`if (el)\` 判空兜底：极端情况 created 时 DOM 未渲染完取不到，包一层 \`setTimeout(() => { … }, 200)\` 再取；\r
- 配套建议：保存点击前校验「弹窗 id 隐藏字段非空」，防历史脏值（手输过、没 id 的）入库。\r
\r
### 2.19 选人控件（org）按人员白名单过滤（✅ 实测 2026-10-29）\r
\r
场景：选人控件要**只允许选指定几个人**（白名单），其他人在弹窗里不显示。\r
\r
属性面板上的「自定义筛选」有**简单 / 高级两个页签**，关键坑：\r
\r
- **普通版 \`customFilterFn(users, orgs, pos)\` 是废的** —— 实测它会**被调用**（console 有输出），但\r
  \`users\` 恒为空数组（\`过滤前人数: 0 undefined\`），写什么过滤都不生效；\r
- **真正带数据的是高级版 \`customFilterFnAdvanced(params, ctx, block)\`** —— 实测 \`params\` 结构：\r
\r
\`\`\`js\r
params = {\r
  users: Array(370),   // ✅ 人员全量，带 id\r
  orgs: Array(19),     // 部门树\r
  pos: Array(0),       // 岗位\r
  instance: {...},     // 控件实例\r
  value: "<当前值>",\r
}\r
\`\`\`\r
\r
**可用写法**（双保险：原地改 \`params.users\` + 返回对象，框架认哪个都能生效）：\r
\r
\`\`\`js\r
module.exports = function (params, ctx, block) {\r
  var allow = ["<人员id1>", "<人员id2>", "<人员id3>"];  // 白名单：要放行的人员 id\r
  var filtered = (params.users || []).filter(function (u) {\r
    var uid = u.id || u.userId;              // 两种字段名都兼容\r
    return allow.indexOf(uid) !== -1;\r
  });\r
  params.users = filtered;                                        // 形态 A：原地改\r
  return { users: filtered, orgs: params.orgs, pos: params.pos }; // 形态 B：返回对象\r
};\r
\`\`\`\r
\r
配套：\r
\r
- 属性面板「自定义筛选」开关要**打开**（\`customFilter: true\`），否则函数不会被调用；\r
- 「简单」页签里的「编辑筛选条件」是**可视化条件编辑器**（配字段条件用，未与白名单混用实测）；\r
- 想再收窄部门范围：mounted 里 \`ctx.setInstance("<org控件id>", "currentOrg", "<部门id>")\`，与白名单**可叠加**（部门限定 + 人员白名单）；\r
- 调试口诀：先在两个函数里各打一行 \`console.log\`，看**谁有输出、谁有数据** —— 别在恒空的那个里死磕。\r
\r
### 2.20 选人控件按部门过滤：currentOrg（✅ 实测 2026-10-29）\r
\r
场景：选人弹窗只显示**指定部门**的人，或者跟着"部门"字段联动。\r
\r
**一句话**：\`ctx.setInstance("<控件id>", "currentOrg", "<部门id>")\` —— 给控件设"当前部门"，人员列表就限定在该部门下。\r
\r
**① 固定部门**（挂 mounted / created）：\r
\r
\`\`\`js\r
module.exports = function (params, ctx, block) {\r
  ctx.setInstance("org_<控件id>", "currentOrg", "<部门id>");\r
};\r
\`\`\`\r
\r
**② 部门联动**（经典用法）："接待人部门"选什么，"接待人"就只能选该部门的人 —— 挂在**部门控件的 change 事件**：\r
\r
\`\`\`js\r
module.exports = function (params, ctx, block) {\r
  ctx.setInstance("office_<选人控件id>", "currentOrg", params.value); // params.value = 部门 id\r
  // 选了部门后，顺带放开选人控件（可选）\r
  ctx.disableds("office_<选人控件id>", false);\r
};\r
\`\`\`\r
\r
要点：\r
\r
- \`currentOrg\` 收的是**部门 id**（不是部门名、不是控件 id）；部门控件 change 时 \`params.value\` 就是部门 id；\r
- 与 §2.19 的人员白名单**可叠加**：\`currentOrg\` 先把范围收到部门，\`customFilterFnAdvanced\` 再按人员白名单筛；\r
- **清空部门要同步清 currentOrg**（置 \`""\`），否则选人还锁在旧部门；\r
- props 里该字段默认 \`null\`，脚本里用 setInstance 设即可，不用改设计器。\r
\r
---\r
\r
## 3. ctx 普通控件方法（一个 API 一个实例）\r
\r
### 3.1 取值 / 改值 —— \`getValue / setValue / getValues / setDatas\`\r
\r
\`\`\`js\r
ctx.getValue('input_xxx');              // 按 instanceId\r
ctx.getValue('flow_purchase.ID');       // 按 dataBind（仅主表顶层）\r
ctx.getValue();                         // 整个表单数据\r
ctx.getValues('id1', 'id2');            // 批量取，按序返回数组\r
\r
ctx.setValue('input_xxx', '新值');      // 值真正变化才异步触发 CHANGE\r
ctx.setDatas({ 'k1': 'v1', 'k2': 10 }); // 批量改（内部循环 setValue）\r
\`\`\`\r
\r
**✅ 实例：弹窗选中后批量带值**（\`currentSelectItems\`，线上 800+ 处）\r
\r
\`\`\`js\r
// 弹窗选中事件\r
module.exports = function (params, ctx, block) {\r
  const row = params.instance.props.currentSelectItems?.[0];   // 单选；有的控件叫 currentSelects\r
  ctx.setDatas({\r
    "<控件id1>": row?.id,          // 字段名 = 弹框数据源的数据别名，不是表字段名\r
    "<控件id2>": row?.name,\r
  });\r
};\r
\`\`\`\r
> \`selected\` 事件里用 \`params.args[0]?.selected?.[0]\` 拿选中行。\r
\r
### 3.2 instance 操作与批量显隐 / 禁用 / 必填\r
\r
\`\`\`js\r
ctx.getInstance('input_xxx');\r
ctx.setInstance('input_xxx', 'placeholder', '新提示');\r
ctx.setInstance('input_xxx', 'visible', false);\r
ctx.setInstance('input_xxx', 'disabled', true);\r
ctx.setInstance('input_xxx', 'required', true);\r
ctx.setParam('input_xxx', { disabled: true, placeholder: '只读' });   // 合并单个\r
ctx.setParams({ 'input_a': { disabled: true }, 'input_b': { visible: false } }); // 批量\r
\r
ctx.visibles('id1', 'id2', true);     // 最后一位布尔：true 显示\r
ctx.disableds('id1', 'id2', true);\r
ctx.requireds('id1', 'id2', true);\r
ctx.readonlys('id1', 'id2', true);\r
\`\`\`\r
\r
**✅ 实例：弹窗动态过滤**（写在弹窗字段的「值变化时」事件，不要写初始化）\r
\r
\`\`\`js\r
ctx.setInstance("<弹窗字段id>", "conditions", [{\r
  tbName: "<表名>", field: "sys_org_id",\r
  value: JSON.parse(localStorage.userInfo).companyId,\r
  symbol: "EQ",\r
}]);\r
\`\`\`\r
\r
> **弹窗过滤三个实测坑**（详见 §10.4）：\r
> ① 布尔字段值传 \`1\` 不传 \`true\`（后端类型映射问题）；② 按钮动态过滤统一走 \`advanceConditions\`\r
> （\`conditions\` 会被后端丢掉）；③ 请求体键名是 \`conditionDtoList\`、字段名 \`tbName\`。\r
\r
**✅ 实例：批量取消所有必填**（\`getFormInfo\` 的实战用法）\r
\r
\`\`\`js\r
const fieldVos = ctx.getFormInfo().dyFormFieldVos || [];\r
fieldVos.forEach((f) => f.code && ctx.setInstance(f.code, "required", false));\r
// 禁用同理：setInstance(f.code, "disabled", false)\r
\`\`\`\r
\r
### 3.3 选项（下拉 / 级联 / 树）\r
\r
\`\`\`js\r
ctx.getOptions('select_xxx');                  // => [{label, value}]\r
ctx.getOptions('subtable_xxx.select_yyy', 0);  // 子表指定行\r
ctx.setOptions('select_xxx', [{ label: 'A', value: 'A' }]);  // 不自动清空 value\r
\`\`\`\r
\r
### 3.4 样式与校验\r
\r
\`\`\`js\r
ctx.addClassName('input_xxx', 'c-red', 'mt-12');   // 拼接\r
ctx.removeClassName('input_xxx', 'c-red');          // 差集\r
\r
const [isValid, errors] = await ctx.validate();              // 整表\r
const [ok2, errs2] = await ctx.validate('input_xxx');        // 单控件\r
const [ok3, errs3] = await ctx.validate('sub_xxx', 0);       // 子表指定行\r
// ValidateResult: { name, success, message?, index?, instance }\r
\`\`\`\r
\r
### 3.5 通过数据库字段名找控件 id —— \`getControlIdByField\`\r
\r
> 控件 id 跨环境可能不一致，**不要硬编码**，实时解析。\r
\r
\`\`\`js\r
function getControlIdByField(formInstance, fieldName) {\r
  const stack = [formInstance];\r
  while (stack.length > 0) {\r
    const node = stack.pop();\r
    if (node.props?.dataField === fieldName && node.id) return node.id;\r
    if (node.children) for (const c of node.children) stack.push(c);\r
  }\r
  return undefined;\r
}\r
\r
// 用法（可挂 ctx.utils 复用）\r
ctx.utils.getControlId = getControlIdByField;\r
const gcmcId = ctx.utils.getControlId(params.instance, "gcmc");\r
const gcmc = gcmcId ? ctx.getValue(gcmcId) : undefined;\r
\`\`\`\r
\r
---\r
\r
## 4. ctx 整体表单方法\r
\r
\`\`\`js\r
ctx.message('保存成功', 'success');   // success|warning|error|info|loading\r
const formId = ctx.getFormId();\r
\`\`\`\r
\r
> ⚠️ **框架方法清单一（别再踩）**：\`ctx.submit()\` / \`saveDraft()\` / \`reset()\` / \`loading()\` /\r
> \`buildSubmitData()\` / \`getViewMode()\` / \`getUserInfo()\` / \`getFormInfo()\` —— 是宿主页面在调的，\r
> 自定义脚本里拿不到或不起作用。\`getFormInfo()\` 例外：仅 §3.2 那种取 \`dyFormFieldVos\` 的用法实测可用。\r
\r
**✅ 实例：自定义表单怎么「保存」**（平台没给保存 API，三条实测路径）\r
\r
\`\`\`js\r
// 路径 1：DOM 点「保存」按钮（最通用，✅ 实测）\r
const btn = Array.from(document.querySelectorAll("button.ant-btn"))\r
  .find((b) => b.textContent.replace(/\\s+/g, "") === "保存");   // 文案是「保 存」带空格，去空格最稳\r
if (btn) btn.click();\r
// 改完子表后点保存前留一拍 setTimeout(300)，等 setArrayValue 刷到界面\r
\r
// 路径 2：编辑/新增态保存（📦 实测）\r
ctx.outInfo.editForm(ctx.buildSubmitData());   // 新增态用 ctx.outInfo.addForm(value)\r
\r
// 路径 3：自定义接口落库\r
\`\`\`\r
\r
> ⚠️ \`ctx.submit()\` 线上有 12 处在调，但实测**回调触发、主/子表什么都没存**（sys_updatetime 未变）——别用。\r
\r
---\r
\r
## 5. ctx 子表（ArrayForm）\r
\r
> 行自带不可见 \`$internal_id\`（用户代码不读写）。有隐藏行（\`hidden\`）时**可见行号 ≠ 底层索引**，行操作按可见行号。\r
\r
### 5.1 读 / 写：\`getArrayValue / setArrayValue\`\r
\r
\`\`\`js\r
ctx.getArrayValue('sub_xxx');                      // 全部行（key = 控件id）\r
ctx.getArrayValue('sub_xxx', 0);                   // 第 0 行\r
ctx.getArrayValue('sub_xxx', 0, 'sub_xxx.name');   // 第 0 行某字段\r
\r
ctx.setArrayValue('sub_xxx', [{...}, {...}]);                        // ③ 替换全部（等价 replace）\r
ctx.setArrayValue('sub_xxx', 0, 'sub_xxx.name', '新值');             // ① 改单格\r
ctx.setArrayValue('sub_xxx', 0, { 'sub_xxx.name': 'x', 'sub_xxx.num': 10 }); // ② 改整行多字段\r
ctx.deleteArrayRow('sub_xxx', 0);                                    // 删行\r
\`\`\`\r
\r
> ⚠️ ③ 会把**整个子表替换**、丢行——只用于全量重写/过滤。\r
> ①② 对每一行**异步触发 CHANGE**（值真变才触发）→ 先判 \`!==\` 再写。\r
> 行内读主表字段直接 \`ctx.getValue("<主表字段id>")\`（getValue 找不到会回落到全局）。\r
\r
**✅ 实例：A 改 B，B 联动改 A（子表行内联动）**\r
\r
\`\`\`js\r
module.exports = function (params, ctx, block) {\r
  const rowIndex = params.index;\r
  const m = params.value == " blank-1" ? "√" : " ";\r
  ctx.setArrayValue("<子表id>", rowIndex, "<子表字段idA>", m);\r
\r
  const oldVal = ctx.getArrayValue("<子表id>", rowIndex, "<子表字段idB>");\r
  const newVal = params.value == " blank-1" ? null : " blank-1";\r
  if (oldVal !== newVal) {\r
    ctx.setArrayValue("<子表id>", rowIndex, "<子表字段idB>", newVal);\r
  }\r
};\r
\`\`\`\r
\r
**✅ 实例：主表字段变化 → 整列同步给子表所有行**（挂主表字段的 CHANGE 事件）\r
\r
\`\`\`js\r
module.exports = function (params, ctx, block) {\r
  const SUB = "<子表id>"; const FIELD = "<子表字段id>";\r
  const rows = ctx.getArrayValue(SUB) || [];\r
  rows.forEach((row, index) => {\r
    if (row[FIELD] !== params.value) {          // 有变化才写，减少无谓 CHANGE\r
      ctx.setArrayValue(SUB, index, FIELD, params.value);\r
    }\r
  });\r
};\r
\`\`\`\r
\r
**✅ 实例：导入子表后，把主表字段值覆盖到所有行**（✅ 实测）\r
\r
\`\`\`js\r
// 基本版：写在「导入子表」按钮的点击后事件\r
module.exports = function (request, ctx, params) {\r
  const rows = ctx.getArrayValue("<子表id>") || [];\r
  rows.forEach((_, index) => {\r
    ctx.setArrayValue("<子表id>", index, "<子表字段id>", ctx.getValue("<主表来源字段id>"));\r
  });\r
};\r
\`\`\`\r
\r
> 两个实测坑：①「点击后事件」在点击那一刻就跑，而平台导入发生在点击**之后**——此刻读到的是旧子表\r
> → 用下面的轮询版；② 子表动作按钮的代码存在 **\`actions[i].event\`**（单个字段），不是 \`events\` 数组；\r
> 页面上"外面那个导入按钮"可能是页面级通用入口，不在 formAttributeJson 里，表单里挂事件不会被它触发。\r
\r
\`\`\`js\r
// 轮询版：等导入的行出现再覆盖\r
module.exports = function (request, ctx, params) {\r
  const SUB = "<子表id>"; const FIELD = "<子表字段id>";\r
  let tries = 0;\r
  const timer = setInterval(() => {\r
    const rows = ctx.getArrayValue(SUB) || [];\r
    if (rows.some((r) => !r[FIELD])) {          // 有行该字段还是空 = 刚导入进来的\r
      const val = ctx.getValue("<主表来源字段id>");\r
      rows.forEach((_, i) => ctx.setArrayValue(SUB, i, FIELD, val));\r
      clearInterval(timer);\r
    }\r
    if (++tries >= 40) clearInterval(timer);    // 最多等 20 秒\r
  }, 500);\r
};\r
\`\`\`\r
\r
### 5.2 加 / 删行：\`getArrayFormApi\`\r
\r
\`\`\`js\r
const api = ctx.getArrayFormApi('sub_xxx');   // name 可为 dataBind 或 instanceId\r
api.append({});                  // 末尾新增空行（追加行必须走 append，setArrayValue 会缺内部状态）\r
api.append([{}, {}]);            // 批量新增\r
api.prepend({});                 // 开头新增\r
api.insert(1, { name: '新' });   // 指定可见行位置插入\r
api.rowAppend(0, { name: 'x' }); // 在可见行 0 后追加\r
api.remove(1);                   // 删除（可见行）；支持 remove([1,3])\r
api.replace([]);                 // 替换全部 / 清空\r
api.update(1, { name: 'v2' });   // 更新指定行（保留 $internal_id）\r
api.swap(0, 1); api.move(2, 0);  // 交换 / 移动\r
api.hidden((row) => row.amount === 0);  // 按条件前端隐藏（不改数据）\r
\`\`\`\r
\r
**✅ 实例：新增行 —— 先校验主表字段，再带值 + 生成编码**（✅ 实测）\r
\r
> 前提认知：\`ADD_ROWS\` 的返回值被平台丢弃，\`return false\` 拦不住新增 → 必须自己接管新增动作。\r
\r
\`\`\`js\r
// 关闭子表自带「可新增」按钮，自定义动作按钮，签名 (subTable, ctx, btn)\r
module.exports = function (subTable, ctx, btn) {\r
  if (!ctx.getValue("<主表合同id>")) {\r
    ctx.message("请先选择合同", "error");\r
    return;                                        // 提前返回 → append 不执行 = 没新增\r
  }\r
  const SUB = "<子表id>";\r
  const rows = ctx.getArrayValue(SUB) || [];\r
  const prefix = ctx.getValue("<主表编号id>") || "";\r
  const row = {};\r
  row["<子表字段id>"] = ctx.getValue("<主表字段id>");          // 从主表带值\r
  if (prefix) row["<子表编码id>"] = prefix + "-" + ("00000" + (rows.length + 1)).slice(-5);\r
  ctx.getArrayFormApi(SUB).append(row);\r
};\r
\`\`\`\r
> \`append\` 后立刻 \`getArrayValue\` 会少一行 → \`setTimeout(100ms)\` 再读。\r
> \`ADD_ROWS\` 事件里写值可能再触发 \`ADD_ROWS\` → 以「该行已有值就不写」防递归。\r
\r
**✅ 实例：批量删除选中行**\r
\r
\`\`\`js\r
const tab = ctx.getInstance("<子表id>");\r
const idx = (tab.props.selectedRows || []).map((r) => r.index);   // item.index 是行号\r
if (!idx.length) { ctx.message("请先选择数据", "warning"); return; }\r
ctx.getArrayFormApi("<子表id>").remove(idx);\r
tab.props.selectedRows = [];\r
\`\`\`\r
\r
**✅ 实例：按钮选表单 → 追加到子表（去重）**\r
\r
\`\`\`js\r
module.exports = async function (params, ctx, block) {\r
  const selected = params.instance.props.currentSelectItems || [];\r
  const SUB = "<子表id>";\r
  const existingIds = (ctx.getArrayValue(SUB) || []).map((r) => r["<子表去重字段id>"]);\r
  const api = ctx.getArrayFormApi(SUB);\r
  let dup = false;\r
  for (const item of selected) {\r
    if (!existingIds.includes(item.id)) {\r
      api.append({ "<子表字段id1>": item.id, "<子表字段id2>": item["<来源字段id>"] });\r
    } else { dup = true; }\r
  }\r
  if (dup) ctx.message("不能重复新增，将跳过重复项!", "info");\r
};\r
\`\`\`\r
\r
### 5.3 行级实例 / 禁用 / 校验 / 样式\r
\r
\`\`\`js\r
ctx.getArrayInstance('sub_xxx', 0, 'sub_xxx.name');\r
ctx.setArrayInstance('sub_xxx', 0, 'sub_xxx.name', 'visible', false);\r
\r
ctx.disabledArrayRow('sub_xxx', 0, true);                  // 整行禁用\r
ctx.disabledArrayRow('sub_xxx', 0, 'sub_xxx.name', true);  // 行内指定组件\r
ctx.readonlyArrayRow('sub_xxx', 0, true);\r
ctx.requiredArrayRow('sub_xxx', 0, true);\r
ctx.updateArrayRowOptions('sub_xxx', 0, { select_id: [{label,value}] }); // 不改已选\r
await ctx.validateArray('sub_xxx');                        // 校验子表\r
ctx.addArrayFormClassName('sub_xxx', 0, 'sub_xxx.name', 'error-bg');\r
\`\`\`\r
\r
**params 行内方法**（仅子表内事件可用）：\r
\r
\`\`\`js\r
params.row;                                  // 当前行数据（实时 getter）\r
params.index;                                // 当前行号\r
params.arrayFormApi;                         // 当前子表句柄\r
params.deleteCurrentRow();\r
params.updateCurrentRowValues({ 'sub_xxx.name': '新' });\r
params.validateCurrentRow();\r
params.getCurrentRowInstance('sub_xxx.name');\r
params.setCurrentRowDisableds(true);          // 整行 / 指定组件\r
params.setCurrentRowRequireds('sub_xxx.name', false);\r
params.setCurrentRowOptions({ select_id: [{label,value}] });\r
params.addCurrentRowClassName('highlight');\r
\`\`\`\r
\r
### 5.4 子表按钮状态控制：\`setSubtableXxx\`\r
\r
> \`ctx\` 直接暴露，PC + 移动端都支持。控制的是**按钮展示状态**，与数据操作互不影响。\r
> 状态：\`hidden\` 隐藏 / \`disabled\` 禁用 / \`normal\` 正常。\r
\r
| 方法 | 作用 |\r
| :--- | :--- |\r
| \`setSubtableActionState(table, actionIdOrCode, state, rowIndex?)\` | 自定义按钮（topright / line）；行内按钮可精确到行 |\r
| \`setSubtableAddState(table, state)\` | 「新增」按钮 |\r
| \`setSubtableRemoveState(table, state, rowIndex?)\` | 「删除」按钮（全局 / 行级） |\r
| \`getSubtableButtonStates(table)\` | 读取当前覆盖配置 |\r
| \`clearSubtableButtonStates(table)\` | 清空覆盖，恢复 schema 原始状态 |\r
\r
\`\`\`js\r
const table = "<子表id>";\r
ctx.setSubtableActionState(table, 'code1', 'disabled');     // 右上方自定义按钮\r
ctx.setSubtableActionState(table, 'code1', 'hidden', 2);    // 行内按钮精确到第 3 行\r
ctx.setSubtableAddState(table, 'disabled');\r
ctx.setSubtableRemoveState(table, 'disabled', 0);           // 仅第 1 行禁用删除\r
\`\`\`\r
\r
> 行索引是**真实数据索引**不是页内序号；行级优先于全局；\`canRemove: false\` 等导致按钮不渲染时 API 无法使其出现。\r
\r
**✅ 实例：按查看态整体置灰**（✅ 用户确认可跑）\r
\r
\`\`\`js\r
module.exports = function (params, ctx, block) {\r
  const TABLE = "<子表id>";\r
  const state = ctx.outInfo.status === "view" ? "disabled" : "normal";\r
  ["download_template", "import_excel", "delete_detail", "add_"].forEach(\r
    (code) => { ctx.setSubtableActionState(TABLE, code, state); },\r
  );\r
  ctx.setSubtableRemoveState(TABLE, state);\r
};\r
\`\`\`\r
\r
**子表能力总览（一眼分清用哪个）**\r
\r
| 你想做的事 | 用谁 |\r
| :--- | :--- |\r
| 增删改子表行数据 | \`ctx\` / ArrayFormApi（§5.2） |\r
| 读 / 填子表字段值 | \`getArrayValue\` / \`setArrayValue\`（§5.1） |\r
| 行禁用/只读/必填/样式/选项 | \`disabledArrayRow\` / \`requiredArrayRow\` / \`updateArrayRowOptions\`（§5.3） |\r
| 前端隐藏某行 | \`api.hidden(...)\` |\r
| 控制新增/删除/自定义按钮 | \`setSubtableAddState / setSubtableRemoveState / setSubtableActionState\`（§5.4） |\r
\r
### 5.5 导入 Excel（完整链路，✅ 实测）\r
\r
**自建 fileInput 调导入接口：**\r
\r
\`\`\`js\r
const fileInput = document.createElement("input");\r
fileInput.type = "file"; fileInput.style.display = "none";\r
fileInput.accept = ".xlsx,.xls";\r
fileInput.addEventListener("change", (e) => {\r
  const file = e.target.files[0];\r
  if (!file) return;\r
  const fd = new FormData();\r
  fd.append("file", file);\r
  fd.append("importType", "SUB_TABLE");\r
  fd.append("menuId", "<菜单id>");\r
  fd.append("relationValue", id);            // ★ 必须传主表记录 id，删掉会 ReferenceError 静默卡死\r
  fd.append("time", new Date().getTime());\r
  ctx.http.request("POST", "/system/excel/import", {\r
    headers: { "Content-Type": "application/x-www-form-urlencoded" },\r
  })(fd).then(() => {\r
    ctx.outInfo.reload();                    // 子表刷新是异步的，等落地再读写入值\r
  });\r
});\r
document.body.appendChild(fileInput);\r
fileInput.click();\r
\`\`\`\r
\r
**导入成功回调里：等刷新落地 → 补编号 → 点保存**（✅ 完整链路）\r
\r
\`\`\`js\r
.then(() => {\r
  ctx.outInfo.reload();\r
  const waitForRows = (tries) => {\r
    const rows = ctx.getArrayValue(SUB) || [];\r
    if (rows.length === 0) {                        // 等 reload 落地\r
      if (tries <= 0) { ctx.message("子表未加载完成，请手动保存", "warning"); return; }\r
      setTimeout(() => waitForRows(tries - 1), 300);\r
      return;\r
    }\r
    let maxSeq = 0;                                 // 已有编号的最大号（别用行号，会撞号）\r
    rows.forEach((r) => {\r
      const m = (r[SUB_CODE] || "").match(/-(\\d+)$/);\r
      if (m) maxSeq = Math.max(maxSeq, parseInt(m[1], 10));\r
    });\r
    let next = maxSeq + 1;                          // 只给空编号行赋号，保留已编号行\r
    for (let i = 0; i < rows.length; i++) {\r
      if (!rows[i][SUB_CODE]) {\r
        ctx.setArrayValue(SUB, i, SUB_CODE, prefix + "-" + ("00000" + next).slice(-5));\r
        next++;\r
      }\r
    }\r
    setTimeout(() => {                              // 等界面刷新再点保存\r
      const saveBtn = Array.from(document.querySelectorAll("button.ant-btn"))\r
        .find((b) => b.textContent.replace(/\\s+/g, "") === "保存");\r
      if (saveBtn) saveBtn.click();\r
    }, 300);\r
  };\r
  waitForRows(20);\r
})\r
\`\`\`\r
\r
**导入后自动补值（dfBackfill 轮询，不依赖编号）**：导入走 \`ctx.outInfo.reload()\` 不经过 append，\r
新增逻辑不触发 → 在 \`.then\` 里 reload 后轮询补空值，天然幂等。**不要做"手动同步"按钮**（没人会点）。\r
\r
\`\`\`js\r
const before = (ctx.getArrayValue(SUB) || []).length;   // 点击那一刻的行数\r
let tries = 0, arrived = false, quiet = 0;\r
const timer = setInterval(() => {\r
  tries++;\r
  const r = ctx.utils.dfBackfill(false);                // 只补空字段\r
  if (r.rows !== before) arrived = true;                // 新行刷出来了\r
  if (arrived && r.filled === 0 && r.coded === 0) quiet++; else quiet = 0;\r
  if (quiet >= 2 || tries >= 60) clearInterval(timer);  // 30 秒兜底\r
}, 500);\r
\`\`\`\r
\r
> ⚠️ 停止条件不能只看"没东西可补"：导入前的老行本来有值，只判"补不动了"会在 1.5 秒误停。\r
> 正确条件 = 「行数相对导入前变化」+「连续 2 次无需再补」+ 总超时。\r
\r
### 5.6 公共逻辑放哪：工具函数 vs 代码块\r
\r
| 机制 | 存在哪 | 怎么调 | 谁可用 |\r
| :--- | :--- | :--- | :--- |\r
| 表单级工具函数 | \`props.utilsJs[]\` | \`ctx.utils.块名(...)\` | 任何脚本，含子表动作按钮 |\r
| 事件级代码块 | \`events[].codeItem.utils[]\` | \`block.块名(...)\` | 只有事件；**子表动作按钮拿不到 block** |\r
\r
- 块第一个形参固定写 \`ctx\`（平台自动注入），可写 \`async function (ctx)\` 用 await。\r
- 分工：**共用纯逻辑 → ctx.utils；只此一处 → block**。\r
\r
\`\`\`js\r
// 工具函数 dfPad（props.utilsJs 里一条）\r
module.exports = function (ctx, n, len) {\r
  let s = "" + n;\r
  while (s.length < len) s = "0" + s;\r
  return s;\r
};\r
// 事件里：ctx.utils.dfPad(2, 5)\r
\`\`\`\r
\r
> \`ctx.getArrayValue/setArrayValue/getArrayFormApi\` 的**第一个字符串字面量必须是控件 id**\r
> （编辑器 lint 校验白名单），传变量绕过校验但传错照样失败——配对表集中到工具函数里一处维护。\r
\r
---\r
\r
## 6. 辅助函数（utils 全集）\r
\r
\`\`\`js\r
// HTTP：request 返回函数，再传 data 才真正发请求；返回 axios 完整响应（含 .data/.status）\r
const res = await ctx.http.request('GET', '/api/list')({ page: 1 });\r
\r
// 数据源（设计器配置，每次调用重新执行，不缓存）\r
const list = await ctx.datasource.getProductList({ categoryId: 1 });\r
\r
// 工具函数（设计器配置，第一次执行后缓存）——适合纯计算\r
const r = ctx.utils.calcAmount({ price: 100, quantity: 2 });\r
\r
// 业务注入函数（BstFormDeepUtils.setFns 注入，无缓存）\r
ctx.fns.formatMoney(123.456);\r
\r
// 全局 Store（跨表单/页签共享；用 setStore 合并写入，勿直接赋值）\r
ctx.setStore({ global_user: { id: 1 } });\r
const theme = ctx.store.theme;\r
\r
// 外部挂载数据（outInfo 基础，见 §10.1）\r
ctx.setOutInfo({ businessKey: 'PO-001' });\r
\r
// 用户与组织\r
ctx.allUsers;  // [{id,name,deptId}]\r
ctx.allOrgs;   // [{id,name,code}]\r
\`\`\`\r
\r
> \`datasource\` 每次重新执行（适合最新数据）；\`utils\` 第一次后缓存（适合纯计算）。\r
\r
**✅ 实例：接口调用（按表名查库，194 处在用全库第一）**\r
\r
\`\`\`js\r
const res = await ctx.http.request("POST", "/dynamic/function/api/table")({\r
  tbName: "<表名>", fields: ["id", "name"],\r
  queryMap: { sys_deleteflag: false }, orderBy: { id: true },\r
});\r
const rows = Array.isArray(res.data) ? res.data : (res.data?.list ?? res.data?.records ?? []);\r
\`\`\`\r
> 路径不带 \`/apis\` 前缀（网关自动补）；返回形状不固定必须兼容。\r
> 按钮事件签名是 \`(request, ctx, params)\`，直接 \`request("POST", url)({...})\`。\r
\r
---\r
\r
## 7. 布局控件（Tab / 折叠 / 栅格 / 表格）\r
\r
\`\`\`js\r
ctx.setActiveKey('tab_xxx', 'tab-pane_a');                 // Tab：只取第 1 个 key\r
ctx.setActiveKey('collapse_xxx', 'pane_a', 'pane_b');      // 折叠（非手风琴）：多选\r
ctx.setInstance('gridcol_abc', 'visible', false);          // 栅格/表格格子显隐\r
ctx.setInstance('sheet_cell_abc', 'visible', false);\r
// 标签页/折叠自身事件里可直接 params.setActiveKey(...)\r
\`\`\`\r
\r
---\r
\r
## 8. 高频坑（FAQ）\r
\r
### 事件不执行\r
\r
1. 没用 \`module.exports = function (params, ctx) {...}\` 包裹；\r
2. 异步函数漏 \`await\`；\r
3. 绑错控件/事件类型（CHANGE 只对值变化控件，按钮用 CLICK）；\r
4. 被 \`return false\` 提前截断（BEFORE_SUBMIT 里）；\r
5. 语法错误（F12 Console 看红字）。\r
> 验证：脚本首行 \`console.log('触发了', params.instance.id, params.value)\`。\r
\r
### getValue 返回 undefined（top 1 高频）\r
\r
1. **用 dataBind 代替 instanceId**（最常见）→ 换 instanceId；\r
2. 用 \`getValue\` 读子表行内 → 改 \`getArrayValue(table, index, field)\`；\r
3. dataBind 与设计器实际填值不一致 → \`ctx.getInstance(id).props.dataBind\` 反查；\r
4. 字段本来就没值 → 先 setValue 再 getValue 验证；\r
5. **在 CREATED 里读**（时序问题）→ 改 MOUNTED/CHANGE 或 \`setTimeout(...,0)\`；\r
6. 传了 label 名；7. 子表 swap/hidden 后可见行号 ≠ 底层索引。\r
\r
### CHANGE 里怎么拿「改之前的数」（params.oldValue 实测不存在）\r
\r
用 **FOCUS + window 缓存**：FOCUS 在进入输入框时触发，那一刻值还是旧的；回写触发的第二轮\r
CHANGE 里新旧值相等天然跳过，不会死循环。\r
\r
\`\`\`js\r
// ① FOCUS 事件：进入编辑前记下当前值\r
module.exports = function (params, ctx, block) {\r
  if (!window.__prevValue) window.__prevValue = {};\r
  window.__prevValue[params.index] = params.value;   // 子表用行号做 key\r
};\r
\r
// ② CHANGE 事件：取缓存里的旧值\r
module.exports = function (params, ctx, block) {\r
  const prev = (window.__prevValue || {})[params.index];\r
  if (prev === undefined) return;\r
  if (Number(params.value) > 100) {\r
    ctx.message('超出上限，已还原为 ' + prev, 'error');\r
    params.setValue(prev == null ? '' : prev);   // 必须用 params.setValue，别写 params.value =\r
  }\r
};\r
\`\`\`\r
\r
---\r
\r
## 9. formAttributeJson 结构与代码存放位置\r
\r
\`\`\`jsonc\r
// 根节点 props：\r
"events": [\r
  { "event": "created",                 // 表单级事件挂根节点\r
    "scriptRefId": "",\r
    "codeItem": { "code": "module.exports = function (params, ctx, block) {...}", "utils": [] } }\r
],\r
"stylesheets": [ { "title": "main", "code": "/* css */" } ]\r
\`\`\`\r
\r
**三个代码存放位置必须分清**（排查"代码不执行"的钥匙）：\r
\r
| 代码挂在哪 | 实际存储字段 |\r
| :--- | :--- |\r
| 子表**动作按钮**（\`props.actions[]\`） | \`actions[i].event\`（单个字符串，**没有** before/after 三段） |\r
| **控件事件**（字段/表单级 \`props.events\`） | \`props.events[] = [{event, codeItem:{code}}]\` |\r
| 表单**按钮控件**（toolbar button） | \`props.events[]\` 里的 \`beforeClickEvent / clickEvent / afterClickEvent\` |\r
\r
> 子表动作按钮只有一个 event 槽——做不到"没编号时按钮置灰"（没有前置拦截点），只能点击后提示并 return。\r
> 事件代码写法铁律：\`module.exports\` 顶格；外壳内平铺直叙；**不要嵌套定义一堆命名函数**；\r
> 复用逻辑用数据映射表 + \`Object.keys().forEach\` 展开，或抽到 \`props.utilsJs\`。\r
> 控件级 \`props.events[]\` 结构同上；\`events: []\` = 没挂事件。\r
> 改 JSON 用程序整体读写（json load/dump），改完 \`PUT /apis/dynamic/form\` 全量保存。\r
\r
---\r
\r
## 10. 平台扩展 API（官方文档未覆盖）\r
\r
### 10.1 ctx.outInfo 全集\r
\r
\`outInfo\` 合并语义，必须 \`ctx.setOutInfo({...})\` 写入，勿直接赋值。\r
\r
| 属性 | 用途 |\r
| :--- | :--- |\r
| \`outInfo.status\` | \`add\` / \`edit\` / \`view\` / \`flow-*\`。✅ 高频：\`=== "view"\` 判断查看态（52 张表单在用） |\r
| \`outInfo.formId\` / \`formTitle\` / \`menuCode\` | 当前表单数据 id / 标题 / 菜单 code |\r
| \`outInfo.reload()\` / \`reLoad\` | 重新拉取表单数据 |\r
| \`outInfo.setButtonInitState(...)\` | 按钮初始状态（例见下） |\r
| \`outInfo.editForm(value)\` / \`addForm(value)\` | 编辑态 / 新增态保存（§4 保存路径 2） |\r
| \`outInfo.openFormModal / openSelectModal / openOrgModal\` | 弹窗（§10.2） |\r
| \`outInfo.dataMap\` | 外部传入的数据映射 |\r
\r
\`\`\`js\r
// setButtonInitState 示例\r
ctx.outInfo.setButtonInitState({\r
  number: { save: 2 },          // 按钮后数字\r
  disabled: ["view", "save"],   // 禁用\r
  hidden: ["view"],             // 隐藏\r
});\r
\`\`\`\r
\r
### 10.2 弹窗（openFormModal / openSelectModal / openOrgModal / confirm）\r
\r
\`\`\`js\r
// 打开表单弹窗\r
openFormModal({ formId: row.id, functionId: "<表单code>", instanceId: "12",\r
  disabled: false, formInitData: data, onClose: () => {}, showFile: false });\r
\r
// 打开选择弹窗（type：TREE_MAINTENANCE / TREE_SHOW / TREE_MULTI_TABLE_BINDING / LIST_FORM / FORM）\r
openSelectModal({ functionId: "abc", type: "LIST_FORM", multiple: false,\r
  onOk: (rows) => { setFormInitData(rows); },\r
  conditionList: [], advanceConditionList: [] });\r
\r
// 选人 / 组织 / 岗位\r
openOrgModal({ mode: 'user', multiple: false, max: 10, orgId: 'xxx',\r
  initValue: [], onOk: (value, onClose) => { onClose(); }, title: '选择人员' });\r
\r
// 确认框\r
confirm({ title: '确认', content: '确定要删除吗？',\r
  onOk: () => {}, onCancel: () => {} });\r
\`\`\`\r
\r
### 10.3 按钮事件与参数\r
\r
- 按钮事件签名是 **\`(request, ctx, params)\`**，区别于表单根事件的 \`(params, ctx, block)\`。\r
- 点击前 \`return false\` → 点击、点击后都不执行；点击后事件 \`params.selfEventRes: { success, data }\`\r
  判断原生保存是否成功；事件间传值：\`beforeClickEventRes / clickEventRes / selfEventRes\`。\r
\r
**✅ 实例：阻止「启动流程」按钮**（必须写在**点击前**；写在点击/点击后已晚了）\r
\r
\`\`\`js\r
module.exports = function (request, ctx, params) {\r
  const ok = ctx.getValue('input_xxx');\r
  if (!ok) {\r
    params.message?.error('不满足条件，不能启动流程');\r
    return false;                              // ★ 阻断 → 流程不启动\r
  }\r
};\r
\`\`\`\r
\r
**✅ 实例：启动流程时按条件自定义流程**（setFlow）\r
\r
\`\`\`js\r
module.exports = function (request, ctx, params) {\r
  return {\r
    setFlow: (formValues, flows) => {\r
      if (formValues.name === 111) return flows.find(e => e.id === 1)?.procdefId;\r
      if (formValues.name === 222) return flows.find(e => e.id === 2)?.procdefId;\r
    }\r
  };\r
};\r
\`\`\`\r
\r
**列表 / 树形列表里的按钮参数**：\`parentCtx\`（父实例）、\`selectedRows\`、\`setSelectedRows(rows)\`、\r
\`conditions / advanceConditions\`、\`row\`（行内按钮的行数据）、\`code\`（菜单 code）、\`currentNode\`（树节点）、\r
\`reload()\`、\`setFormInitData(data)\`。\r
\r
\`\`\`js\r
// setFormInitData 格式\r
const data = {\r
  mainData: [{ code: "number_0vyw...", value: null }],\r
  subTable: [{ subFormCode: "subtable_ki...",\r
    subData: [[{ code: "office_...Name", value: null }, { code: "number_...", value: null }]] }]\r
};\r
\`\`\`\r
\r
**✅ 实例：树点击 → 给表单初始化赋值**（✅ 实测：树形列表页，点节点把节点名带进表单）\r
\r
\`\`\`js\r
// 挂在「树点击」事件里；currentNode = 当前树节点，code 用主表控件的 id\r
module.exports = function (request, ctx, params) {\r
  const { currentNode, setFormInitData } = params;\r
  let typename = "";\r
  if (currentNode != undefined) {\r
    typename = currentNode.name;                       // 节点名称\r
  }\r
  const data = {\r
    mainData: [\r
      { code: "input_myangfefge70g6nuci", value: typename },   // code = 主表控件 id\r
    ],\r
  };\r
  setFormInitData(data);\r
};\r
\`\`\`\r
\r
**全局用户与通知**（列表页按钮）：\r
\r
\`\`\`js\r
const { userInfo, message, history } = params;\r
message.success('成功'); message.error('错误'); message.warning('警告');\r
history.push('/customform/1231313?id=12314&disabled=true&showFilter=true');\r
// id=数据id；disabled=true 仅查看；showFilter=true 列表过滤\r
\`\`\`\r
\r
### 10.4 筛选条件 symbol 枚举与实测坑\r
\r
| symbol | 含义 | symbol | 含义 |\r
|---|---|---|---|\r
| EQ | 等于 | GT / GE | 大于 / ≥ |\r
| NE | 不等于 | LT / LE | 小于 / ≤ |\r
| ALL_LIKE | 包含 | LEFT_LIKE / RIGHT_LIKE | 左/右模糊 |\r
\r
\`\`\`js\r
// conditionList\r
[{ tbName: "table_name", field: "field_name", value: "v", symbol: "EQ", otherValue: "" }]\r
// advanceConditionList（field 带表前缀）\r
[{ left: false, right: false, connectStr: ' and ', field: "table.field", symbol: "EQ", value: "v" }]\r
\`\`\`\r
\r
**三个实测坑（2026-09-20 弹窗过滤排查）**：\r
\r
1. **布尔（switch）字段值必须传 \`1\` 不能传 \`true\`**：同一份数据对照实验，\`major_tool_flag = true/"true"\` 都 0 条，\r
   \`= 1/"1"\` 才 1 条。数据库侧全部能匹配 ⇒ 问题在后端 JSON→SQL 类型映射。布尔一律传 \`1\` / \`"1"\`。\r
2. **请求体键名是 \`conditionDtoList\`、字段名 \`tbName\`**：用 \`table\` 作键名报「入参错误」。\r
3. **按钮上 \`setInstance(btn, "conditions", [...])\` 不一定带上**：实测 conditions 里的条件后端收到的是空；\r
   放 \`advanceConditions\` 才真正带上 ⇒ 按钮动态过滤统一走 advanceConditions。\r
\r
### 10.5 列表 / 树形渲染\r
\r
> 这些函数在「表单发布」代码区（与列表按钮同区）\`module.exports\` 返回对象；**签名无参**。\r
\r
\`\`\`js\r
// renderText：单元格文本渲染（★ 实战定稿：列表页改单元格的唯一正规通道）\r
module.exports = function () {\r
  return {\r
    renderText: (value, record, index, code) => {\r
      // value=该格字段值  record=行数据  index=行号  code=列表列绑定的控件id\r
      let style;\r
      if (code === "<列控件id>" && value === "未出库") style = "color:red";\r
      return \`<span class='bst-customTable-cellRender' style='\${style}'>\` + (value || "") + \`</span>\`;\r
    },\r
  };\r
};\r
\`\`\`\r
\r
> renderText 要点：① code 是**列绑定的控件 id**不是字段名；② 返回 HTML 字符串，匹配不到的 code 必须\r
> **原样返回** \`(value || "")\`，否则整列显示异常；③ 数值先 replace 再 Number（可能带 %/千分位）；\r
> ④ **不要在列表页用表单那套 DOM 补位**——列表是 div 虚拟表格（\`DIV.ant-table-cell\` 无 \`<td>\`）且表单\r
> stylesheets 不作用于列表页；⑤ 列表页拿不到表单控件值，固定阈值直接写死 bands 数组。\r
\r
\`\`\`js\r
// renderAction：操作列按钮控制\r
module.exports = function () {\r
  return { renderAction: (record, btns) => btns.filter(btn => record.id === 1) };\r
};\r
\r
// actionWidth：操作列宽\r
return { actionWidth: 200 };\r
\r
// renderTitle / onTreeSelect：树形\r
return { renderTitle: (nodeData) => nodeData.weight === 0\r
  ? '<span style="color:red;">' + nodeData.name + '</span>' : nodeData.name };\r
return { onTreeSelect: ({ setSelectConditions, setHeaderTitle, currentNode }) => {\r
  setHeaderTitle('测试测试');\r
  setSelectConditions({ conditions: [], advanceConditions: [] });\r
} };\r
\`\`\`\r
\r
---\r
\r
## 11. 附录：编号规则溯源（表单编号从哪来）\r
\r
表单编号由**数据库规则**生成，不在前端代码里。查库（只读）：\r
\r
| 表 | 用途 |\r
| :--- | :--- |\r
| \`plant.dy_number_table\` | 表名 → 规则：\`{number_rule_id, table_name}\` |\r
| \`plant.dy_number_rule\` | 规则头：\`{rule_number, name, table_field, autofill}\`（\`autofill=true\` = 保存时服务端自动填） |\r
| \`plant.dy_number_rule_definition\` | 规则组成，按 \`sort\` 拼接。\`type\`：\`1\`=流水号(\`placeholder_num\` 位数)、\`2\`=常量、\`4\`=日期字段、\`5\`=值表字段 |\r
\r
\`\`\`sql\r
select d.type, d.value_table_field, d.placeholder_num, d.constant_value, d.sort\r
from plant.dy_number_rule_definition d\r
where d.number_rule_id = (select number_rule_id from plant.dy_number_table where table_name = 'xxx')\r
order by d.sort;\r
\`\`\`\r
\r
**两个必须提前告知用户的点**：\r
1. \`type:5\` 的字段为空时编号**缺段**；编号落库后改字段**不会重编号** → 生成时机放在字段填完之后。\r
2. \`/dynamic/number/rule/generate\` 类接口可能不在前端产物里，验证契约别猜——抓一次真实请求，或\r
   \`curl http://<host>:<port>/web/umi.*.js\` 下载产物 grep（无需登录）。\r
\r
---\r
\r
## 12. 附录：自定义接口怎么写与怎么调\r
\r
> 原则（2026-10-21/22 实测定稿）：**一个接口 = 一条 SQL**，script 写成 \`db.plant2x.select([...])\` 形式。\r
> 前端事件代码的外壳 \`module.exports = function (params, ctx, block) {}\` 是**表单事件脚本**的写法，接口里**不认**——别混淆。\r
\r
**怎么写：**\r
\r
\`\`\`js\r
db.plant2x.select([select * from tae_weather_daily where id >= CURRENT_DATE order by id FETCH FIRST 3 ROWS ONLY;]);\r
\`\`\`\r
\r
- 方括号里是 SQL（以 \`;\` 结尾）；**script 写多行时第二行起被静默忽略**（返回 200 但不执行，实测）\r
  —— 需要多语句：拆成多个接口由前端按序调用，或写存储过程。\r
- **入参用占位符 \`#{name}\`**，平台做参数化，不要拼字符串（防注入）。\r
- **出参用 \`SELECT\` 起头**，平台把它当列表解析。\r
- 接口注册在 \`sys_api_info\`（请求方式、SQL、参数），分组在 \`sys_group_info\`。\r
\r
**怎么调用：**\r
\r
- 接口注册后有自己的 path（在平台「自定义接口」页配置），前端照普通接口调：\r
\r
\`\`\`js\r
// 表单/字段事件里\r
const res = await ctx.http.request("POST", "<自定义接口path>")({ p1: "v1" });\r
// 按钮事件里（签名 request, ctx, params）\r
request("POST", "<自定义接口path>")({ p1: "v1" }).then((res) => { /* res.data */ });\r
\`\`\`\r
\r
**存储过程**（跨表 / 事务 / 表名动态都往存储过程里放）：\r
\r
\`\`\`sql\r
db.plant2x.select([CALL generate_project_code(#{table_name}, #{xmbh}, #{code_column}, #{fixed_name});]);\r
\`\`\`\r
\r
<details><summary>存储过程模板：按表名生成项目编号（点开）</summary>\r
\r
\`\`\`sql\r
DELIMITER $$\r
DROP PROCEDURE IF EXISTS generate_project_code$$\r
CREATE PROCEDURE generate_project_code(\r
    IN p_table_name VARCHAR(64), IN p_xmbh VARCHAR(50),\r
    IN p_code_column VARCHAR(64), IN p_fixed_name VARCHAR(100)\r
)\r
BEGIN\r
    SET @sql = CONCAT(\r
        'SELECT CONCAT(',\r
        'LPAD(COALESCE(MAX(CAST(SUBSTRING(', p_code_column, ' FROM 1 FOR 3) AS UNSIGNED)), 0) + 1, 3, ''0''), ',\r
        '''-', p_fixed_name, ''' ',\r
        ') AS new_code ',\r
        'FROM ', p_table_name, ' ',\r
        'WHERE xmbh = ''', p_xmbh, ''' AND sys_deleteflag = false'\r
    );\r
    PREPARE stmt FROM @sql;\r
    EXECUTE stmt;\r
    DEALLOCATE PREPARE stmt;\r
END$$\r
DELIMITER ;\r
\`\`\`\r
\r
</details>\r
\r
**其他注意事项**：跨表/事务在存储过程里控制（一个调用 = 一条 SQL）；超 30 秒的大查询分页或加索引；\r
PG 日期 \`to_char(now() AT TIME ZONE 'Asia/Shanghai', 'YYYY-MM-DD HH24:MI:SS')\`；标识符 ≤ 63 字符；\r
**平台会把脚本里的 \`"\` → \`&quot;\`、\`&&\` → \`&amp;&amp;\`**，模板里提前规避；多环境库不同（GaussDB = PG 语法，\r
也有达梦 DM 环境，语法兼容 Oracle 风格）。调试：后台「自定义接口 → 测试」按钮；慢 SQL 看\r
\`sys_application_log\` / \`sys_business_log\`。\r
\r
---\r
\r
## 13. 官方文档索引\r
\r
- 整体表单：<https://www.bestdt.com/formdeep/docs/responsive/function/overall>\r
- 普通控件：<https://www.bestdt.com/formdeep/docs/responsive/function/basic-control>\r
- 自增控件（子表）：<https://www.bestdt.com/formdeep/docs/responsive/function/increment-control>\r
- 辅助函数：<https://www.bestdt.com/formdeep/docs/responsive/function/utils>\r
- 事件列表：<https://www.bestdt.com/formdeep/docs/responsive/event/list>\r
- FAQ：[事件不触发](https://www.bestdt.com/formdeep/docs/faq/event-not-firing) / [getValue undefined](https://www.bestdt.com/formdeep/docs/faq/getValue-undefined)\r
\r
## 14. 官方文档校订补充（2026-11-06）\r
\r
> 📦 本节是**官方文档摘录，尚未逐条线上实测**。按本库约定「实测 > 理论」：与前面各节的实测结论冲突时，**以前面为准**；本节只用于补齐官方文档改版后新增、但本库还没收录的 API。用之前先在目标环境验证一次。\r
\r
官方《普通控件》页已改版，对照后发现以下缺口：\r
\r
### 14.1 订阅 / 触发自定义事件（本库此前未收录）\r
\r
\`\`\`js\r
// 订阅：返回取消订阅函数\r
const off = ctx.listen('beforeSubmit', async (params, ctx) => {\r
  if (!ctx.getValue('flow_purchase.remark')) {\r
    ctx.message('请填写备注', 'error');\r
    return false;            // 返回 false 阻断提交\r
  }\r
});\r
\r
// 主动触发\r
ctx.trigger('change', { instance: myInst, args: [] });\r
off();                       // 不再需要时取消\r
\`\`\`\r
\r
- \`ctx.listen(event, callback)\` → \`IUnsubscriber\`；\`ctx.trigger(event, params)\` → \`unknown\`。\r
- 官方文档列出的 19 个事件枚举（camelCase）：\r
  \`click / change / focus / blur / beforeUpload / uploadSuccess / uploadFail / deleteFile / addRows / removeRows / selectRows / mounted / unmounted / created / beforeSubmit / afterSubmit / selected / tabchanged / viewModeChange\`。\r
\r
> ⚠️ **口径差异（别踩）**：官方枚举写 camelCase，本库 §2 事件表写的是控件 \`props.events\` 里实测到的**大写 key**（\`CLICK\` / \`CHANGE\` / \`FOCUS\` …）。注册事件时用实测的大写 key；camelCase 只用于 \`listen\` / \`trigger\` 这类运行时 API 的事件名，且仍建议先验证。\r
\r
### 14.2 表单级元数据\r
\r
\`\`\`js\r
ctx.setFormInfo({ schemaVersion: '2.0', createdAt: Date.now() });\r
const info = ctx.getFormInfo();\r
\`\`\`\r
\r
- \`setFormInfo\` 是**直接覆盖**（不是 merge），本库 §4 已写 \`getFormInfo\`，这里补上写入侧。\r
- 与 \`outInfo\` 区别：\`outInfo\` 是业务侧传入的外部数据（合并语义），\`formInfo\` 是运行时内部元数据（覆盖语义）。\r
\r
### 14.3 子表行级 className（本库此前未收录）\r
\r
\`\`\`js\r
params.addCurrentRowClassName('row-warn');\r
params.removeCurrentRowClassName('row-warn');\r
params.addCurrentRowItemClassName('input_xxx', 'cell-warn');\r
params.removeCurrentRowItemClassName(inst, 'cell-warn');\r
\`\`\`\r
\r
- 行级：\`addCurrentRowClassName(...classNames)\` / \`removeCurrentRowClassName(...classNames)\`。\r
- 行内控件级：\`addCurrentRowItemClassName(instance | id, ...classNames)\` / \`removeCurrentRowItemClassName(instance | id, ...classNames)\`。\r
- 与已有的 \`setCurrentRowDisableds\` / \`setCurrentRowRequireds\` / \`setCurrentRowOptions\` 同属「仅子表内事件可用」的一组。\r
\r
### 14.4 官方反复强调、本库已覆盖的两条\r
\r
- **优先用 \`instanceId\`（UUID）而非 \`dataBind\` 点路径**：多层查找链下 dataBind 常失配。本库 §1「查任意表单字段 id 的三条路」已按此写。\r
- **\`ctx.getValue\` 不适用于子表行内字段**：裸 dataBind 会落到 react-hook-form 兜底查找，真实路径带行号，返回 \`undefined\`；要改用 \`getArrayValue\`。本库 §5 与 FAQ「getValue 返回 undefined」已覆盖。\r
\r
## 关联\r
\r
- \`batch-api-switch\` / \`update-package\` 技能（批量注入事件、资源接口上下线；方法在技能包，知识库不再单独成篇）\r
- [[首页]]（分区导航）\r
`,gu=`# 工具（通用，交付前直接用）\r
\r
> 位置：知识库顶层 \`工具/\`，通用工具，不绑定任何项目，交付前直接用。\r
\r
| 文件 | 用途 | 使用对象 | 引用入口 |\r
| :--- | :--- | :--- | :--- |\r
| \`dm_sql_lint.py\` | 达梦 SQL 静态体检：逐值校验列名/字节长度/时间格式/类型/值个数，0 问题才交付 | 交付 SQL 的开发/实施 | [达梦SQL交付规范](达梦SQL交付规范.md)；[[01-自定义表单配置方法/02-数据表创建]] |\r
| \`dm_schema_snapshot.py\` | 导出现网表结构快照，给建表 DDL 提供真实列定义 | 建表/迁移阶段 | [[01-自定义表单配置方法/02-数据表创建]] |\r
| \`达梦SQL交付规范.md\` | SQL 交付规范原文（通用规则，不绑定项目） | 同上 | 本目录 |\r
\r
**约定**：环境地址与 token 不写进脚本；查库只 SELECT；交付前先跑体检器。\r
`,bu=`# 达梦 SQL 交付规范（踩坑沉淀）

> 来源：2026-10-27 达梦库现场交付时连续踩的 4 个坑（已脱敏，只保留通用规律）。
> 目的：**在写交付 SQL 之前就避开**，不要等现场执行报错再改。

---

## 一、达梦 VARCHAR 是「字节」不是「字符」（最容易踩）

达梦实例参数 \`LENGTH_IN_CHAR = 0\` → \`VARCHAR(n)\` 的 **n 是字节数**。UTF-8 汉字占 **3 字节**。

老库 MySQL 的 \`varchar(2)\` 是**字符**语义，能存"进场"2 个字；照抄到达梦变成 \`VARCHAR(2)\` = 2 字节，
塞不下"进场"（6 字节）→ 报错：

\`\`\`
-6169 列[zt]长度超出定义
\`\`\`

### 规则

| 场景 | 做法 |
| :--- | :--- |
| 从 MySQL 迁 DDL | 中文列宽 **至少按 字符数 × 3** 给。\`varchar(2)\` → \`VARCHAR(10)\` |
| 新建中文列 | 直接 \`VARCHAR(50)\`（≈16 汉字）起步，不要照抄老库窄列宽 |
| 表已建好要改宽 | \`ALTER TABLE 表名 MODIFY 列名 VARCHAR(10);\` |
| 纯数字/编码列 | \`VARCHAR(10)\` 足够（\`DW001\`、\`NO00000\` 都是 ASCII） |

**校验方式**：拿真实列定义（\`ALL_TAB_COLUMNS.DATA_LENGTH\`）算 \`len(value.encode('utf-8'))\`，
不能只数字符数。字符数对了字节数也会超。

---

## 二、ALTER 语法：达梦用 \`MODIFY\`，且要放在建表之后

\`\`\`sql
-- ✅ 达梦写法
ALTER TABLE VIEW_ZHGD_RYJCSJ MODIFY zt VARCHAR(10);

-- ❌ MySQL 的 ALTER COLUMN ... TYPE 达梦不认
\`\`\`

**顺序要求**：ALTER 必须在 \`CREATE TABLE\` 之后。表还不存在时执行 ALTER 会失败中断整个脚本。

**建表幂等写法**：达梦 8.1+ 支持 \`CREATE TABLE IF NOT EXISTS\`（本环境 DM8 0x7000c 已验证）：

\`\`\`sql
CREATE TABLE IF NOT EXISTS 表名 (
  列名 类型,
  ...
);
\`\`\`

表已存在时自动跳过，脚本可以从头到尾一次跑通，不用让现场"跳过第 1 步"。

---

## 三、INSERT 的列名必须查真实表结构，不能凭猜

老系统表名带 \`_V\` 后缀的是视图，迁到达梦建成普通表后，**列名跟老库可能不一致**。

实例：\`SG_RYXX_M\` 主键列真实叫 \`id\`，脚本里写成 \`sg_ryxx_MOID\` → 20 条 INSERT 全报：

\`\`\`
-2111 无效的列名[sg_ryxx_MOID]
\`\`\`

### 查真实列定义（达梦）

\`\`\`sql
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, DATA_LENGTH
FROM ALL_TAB_COLUMNS
WHERE OWNER='PRPNEW' AND TABLE_NAME IN ('表1','表2')
ORDER BY TABLE_NAME, COLUMN_ID;
\`\`\`

⚠️ 别把 \`sys_api_info\` 的列清单和 \`sys_menu\` 混：
- \`sys_api_info\`：\`id, path, name, create_time, update_time, script, group_id, method, parameters, is_release, api_version\`
- **没有** \`create_by\` / \`update_by\` / \`parent_id\`

---

## 四、时间列：格式必须与列类型严格对应

| 列类型 | 可接受的字符串 | 踩坑 |
| :--- | :--- | :--- |
| TIMESTAMP | \`'2026-10-27 09:00:00'\` 或 \`'2026-10-27'\` | 给 \`'测试'\` → -6118 |
| DATE | \`'2026-10-27'\` | 给 \`'2026-10-27 09:00:00'\` → -6118 |
| VARCHAR(8) | \`'06:00'\` | 给 \`'2026-10-27'\`（10 字节）→ -6169 |

\`\`\`
-6118 第2 行附近出现错误: 非法的时间日期类型数据
\`\`\`

**坑位错位比类型错更隐蔽**：如果 format 模板手写，值会串位（车牌收到时间列、状态收到车牌列），
报错信息还很难懂。→ **不要手写 format 模板**，要么按列顺序逐个拼，要么用校验器逐值查。

---

## 五、布尔列：BIT 只收 0/1

反推表结构时容易把布尔列当 VARCHAR，给了 \`'测试'\`、\`'是'\` 这类字符串。

- BIT 列 → 只能是 \`0\` / \`1\`
- VARCHAR 化的布尔标记列 → 也要显式给 \`'0'\` / \`'1'\`

---

## 六、★ 防复发工具：字节级 SQL 静态体检器

**位置**：\`C:\\Users\\Administrator\\WorkBuddy\\2026-09-29-16-18-43\\dm_sql_lint.py\`
（配套 \`dm_schema_snapshot.py\` 存真实列定义快照）

\`\`\`bash
cd /c/Users/<账号> / <密码>/2026-09-29-16-18-43
python dm_sql_lint.py /c/Users/<账号> / <密码>/prp/你的脚本.sql
\`\`\`

校验项（每条 INSERT 逐值查）：

| 校验 | 对应达梦报错 |
| :--- | :--- |
| 列名必须存在于表 | -2111 无效的列名 |
| **列名不得重复** | **-4024 个数不匹配** |
| **值个数 == 列个数** | **-4024 个数不匹配** |
| 字符串 UTF-8 **字节**长度 ≤ DATA_LENGTH | -6169 列长度超出定义 |
| TIMESTAMP/DATE 值可解析 | -6118 非法的时间日期类型 |
| BIT 只收 0/1、INT 只收整数 | 类型错配 |
| DDL 列宽不得比真实表窄 | 建表后必然 -6169 |

**用法纪律**：交付 SQL **必须**先过一遍这个校验器，报"0 问题"再发出去。
（本例：老脚本一次扫出 80 个问题——60 个 zt/rinout 超长 + 20 个无效列名，
纯靠肉眼一个都看不出来。）

### ★ -4024「个数不匹配」的经典成因：sys_org_number 拼了两次

生成器里列定义**本来就带** \`sys_org_number\`，输出时又习惯性在 VALUES 末尾多拼一个：

\`\`\`sql
-- ❌ 列清单里已有 sys_org_number，末尾又多一个 → 列名重复 → -4024
INSERT INTO T (id, gz, cnrs, rs, sys_org_number, create_time, sys_org_number)
VALUES ('...', '木工', 26, 37, 'DW001', '2026-10-28 18:58:00', 'DW001');

-- ✅ 列清单与值严格一一对应
INSERT INTO T (id, gz, cnrs, rs, sys_org_number, create_time)
VALUES ('...', '木工', 26, 37, 'DW001', '2026-10-28 18:58:00');
\`\`\`

**预防**：生成器里加断言，列数与值数不一致直接抛错，别等交付出去才发现。

\`\`\`python
assert len(collist.split(",")) == len(values)
\`\`\`

**排查手法**：把 INSERT 的列清单和值列表分别切出来，数个数、看有没有重复列名。
⚠️ 切 SQL 字符串时 \`''\` 会被当成一对转义引号吃掉，检查脚本要正确处理引号。

---

## 七、交付脚本必须幂等（脚本会被跑不止一次）

现场/开发常把同一个脚本跑多遍（调试、换环境重跑）。**uuid 造 id 不是幂等**，
主键不冲突会照插第二份。

### 正确做法：脚本第 0 步先清理再插入

\`\`\`sql
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
\`\`\`

⚠️ 达梦支持 \`ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)\`，可以直接用来去重。
⚠️ 不要用 \`MAX(id)\` 判"最新"——id 是随机 uuid，字典序 ≠ 时间序。

### 删除范围要精确

\`WHERE sys_org_number='DW001'\` 精确；**不要**用 \`sys_createtime >= '某天'\` 这种粗条件，
会误删别人的正式数据。

---

## 七之二、sys_api_info 的 script 字段：单引号必须转义

\`sys_api_info.script\` 里存的是 SQL 片段，里面的字符串常量用单引号。
**整个 script 又被包在 INSERT 的单引号字符串里** → 里面的单引号必须写成两个：

\`\`\`sql
-- script 内容: select * from t where sys_deleteflag = '0' and ...
INSERT INTO sys_api_info (..., script, ...) VALUES (
  '...',
  'db.plant2x.select([select * from t where sys_deleteflag = ''0'' and ...;])',  -- ★ '' 两个
  ...);
\`\`\`

**不转义的后果**：SQL 字符串提前截断 → 语法错误或写入脏数据。
生成脚本时统一 \`script.replace("'", "''")\`。

**验证方式**：生成后把 INSERT 的 script 字段解引号（\`''\` → \`'\`），
跟原始 script 逐字符比对，必须完全一致。

---

## 七之三、模板引擎的「参数为空」怎么判断

\`db.plant2x.select([...])\` 里 \`#{参数}\` 由模板引擎替换。**参数不传时塞进去的到底是
SQL NULL 还是空字符串，不确定** —— 实测三种写法：

| 写法 | 参数=NULL | 参数='' | 结论 |
| :--- | :--- | :--- | :--- |
| \`#{p} is null\` | ✅ 30 条 | ❌ 0 条 | 不可靠 |
| \`#{p} = ''\` | ❌ | ✅ | 要转义双单引号，易踩坑 |
| **\`LENGTH(#{p}) IS NULL or LENGTH(#{p}) = 0\`** | ✅ | ✅ | **推荐** |

**可选参数的通用写法**（不传 = 不过滤）：

\`\`\`sql
and (LENGTH(#{posttype}) IS NULL or LENGTH(#{posttype}) = 0 or posttype = #{posttype})
\`\`\`

\`LENGTH\` 版不用单引号，绕开了 \`''\` 在 INSERT 字符串里的转义坑。**写可选参数一律用这个。**

---

## 七之四、接口 404 的三种典型原因（按排查顺序查）

前端报 404，先分清是哪一种，别一律当成"接口没建"：

1. **method 不匹配** —— 接口存在但 method 是 POST，前端发 GET → 网关匹配不上 → 404。
   查 \`sys_api_info.method\` 和前端实际请求方法。
2. **path 写错** —— 前端凭命名写死了路径，库里压根没有这个 path。
   查老系统配置库有没有同类功能，或者前端是不是把别的接口名字写错了。
3. **确实没建** —— 新增端点，需要建表 + 注册。

**怎么快速定位**：接口路径在老系统配置表（\`xt_gn_m\` 等）里查得到 → 说明是老功能，查老库数据源；
查不到 → 多半是前端新加的。

**同 path 不同 method 可以共存**：网关按 path + method 匹配，
所以"给前端补一个 GET 版"是保留原接口不动、只加一条的最省事做法。

---

## 七之五、接口返回字段必须跟前端契约逐字段比对

前端给字段契约后，**逐字段、逐顺序**比对生成的 \`select ... as "别名"\` 和契约列表，
不能只看"字段大概对"。少一个字段前端照样白屏。

**比对脚本**：

\`\`\`python
aliases = re.findall(r'as\\s+"(\\w+)"', script)   # 实际返回
want = ['gz', 'cnrs', 'rs']                     # 前端契约
assert aliases == want
\`\`\`

⚠️ 解析 INSERT 的字段值时，**字符串要用 \`''\` 解引号**（\`''\` → \`'\`），
直接看原始 token 会误判（\`''\` 会被当成一对转义引号吃掉）。

---

## 八、达梦常用语法备忘

| 场景 | 语法 |
| :--- | :--- |
| 建表（幂等） | \`CREATE TABLE IF NOT EXISTS t (...);\` |
| 改列宽 | \`ALTER TABLE t MODIFY c VARCHAR(10);\` |
| 去重 | \`ROW_NUMBER() OVER (PARTITION BY k ORDER BY t DESC)\` |
| 层级查询 | \`START WITH ... CONNECT BY PRIOR ...\`（**不要**用 \`WITH RECURSIVE\`，版本兼容性差） |
| 类型映射 | \`datetime→TIMESTAMP\`、\`bit→BIT\`、\`time→VARCHAR(20)\`、\`bool→BIT\` |
| 注释 | \`COMMENT ON TABLE/COLUMN ... IS '...';\` 保留 |
| DROP 幂等 | 匿名块 \`EXECUTE IMMEDIATE\` + \`EXCEPTION WHEN OTHERS THEN NULL\` |
| 唯一约束冲突 | -6602 常见原因是**脚本重复执行** |

---

## 九、交付前自检清单

- [ ] 真实列定义拉过了吗？（\`ALL_TAB_COLUMNS\`，不是凭印象）
- [ ] 中文列宽够吗？（字节数，不是字符数）
- [ ] 列名全部对得上吗？（老系统 \`_V\` 视图尤其容易错）
- [ ] 时间格式与列类型匹配吗？
- [ ] BIT 列给的是 0/1 吗？
- [ ] 跑了 \`dm_sql_lint.py\` 吗？必须是 0 问题。
- [ ] 脚本能重复执行吗？（第 0 步幂等清理）
- [ ] 建表用了 \`IF NOT EXISTS\` 吗？
- [ ] ALTER 放在建表之后吗？
`,_u='---\r\ntype: 导航\r\nstatus: 可用\r\ncreated: 2026-10-10\r\nupdated: 2026-11-06\r\ntags:\r\n  - 导航\r\n  - 首页\r\n---\r\n\r\n# 个人知识库 · 首页\r\n\r\n本库只保留**所有项目通用**的标准流程：《自定义表单配置方法》七段闭环 + 实战手册 + 技能包。项目专属的数据、表清单、接口地址一律不入库。\r\n\r\n约定四条：以实测为准（和官方文档冲突时信实测）；环境地址和 token 每次单独提供，不写进文档；数据库只读，查库核对走 MCP，改数据走平台界面；控件 id 每个环境不一样，示例里的 id 只是占位。\r\n\r\n## 自定义表单配置方法（先读这个）\r\n\r\n- [[01-自定义表单配置方法/01-总览|自定义表单配置方法 · 总览]] —— **数据表创建 → 表单设计 → 表单发布 → 流程设计 → 流程发布 → 测试验收 → 实战与常见问题处理** 七段闭环。每段写清用哪个 skill、职责边界、前提、输入交付物、上下游、验收标准、踩过的坑、交接注意。\r\n- 交付 / 交接 / 新人接手，从总览进；只查某个 API 或事件写法，才按下面手册进。\r\n- [[01-自定义表单配置方法/08-实战与常见问题处理|实战与常见问题处理]] —— 按「现象」查的速查表，含流程、权限、发布、选人等本次踩过的坑及解法。\r\n\r\n## 手册与工具\r\n\r\n- [[01-自定义表单配置方法/实战/自定义表单开发实战|自定义表单开发实战]]（配置方法 · 实战节） —— 查字段 id 的三条路、事件列表、ctx 全部方法（每个 API 配一个线上实例）、子表、平台扩展、常见坑，附录里还有自定义接口怎么写。\r\n- [达梦SQL交付规范](工具/达梦SQL交付规范.md) —— 往达梦库交付 SQL 前必读：VARCHAR 按**字节**算（汉字 3 字节，照抄 MySQL 窄列宽必报 -6169）、ALTER/CREATE 幂等写法、时间列格式、幂等去重。\r\n- [工具/](工具/README.md) —— `dm_sql_lint.py`（交付前字节级静态体检，0 问题再发）、`dm_schema_snapshot.py`（导现网表结构快照）。用途、使用对象、引用入口见 README。\r\n\r\n测试、自定义表单批量配置、表单打包导出 SQL、技能包打包/上传、环境排查这些能力**只写在技能包**（`.claude/skills/<技能名>/SKILL.md` 自带方法说明）；按交付阶段串起来的说明统一走 `01-自定义表单配置方法/`，知识库不再单列《批量配置与自动化》《表单打包导出SQL》。\r\n\r\n## 技能（`.claude/skills/`，对 AI 说需求即可命中）\r\n\r\n| 你想干什么 | 技能 | 对 AI 说 |\r\n| :--- | :--- | :--- |\r\n| 表单增删改查回归、打印验证、页面排障 | `web-form-regression` | 「给 XX 表单做一轮增删改查回归，出证据截图」 |\r\n| 数据源批量注入/替换、下拉树层级排障 | `dynamic-form-datasource` | 「把 XX 数据源批量注入到名称带"报审"的表单」 |\r\n| 子表从主表带值、编号规则溯源 | 不用技能，查实战 §5.2/5.5 + §11 | 「XX 表单导入 Excel 后子表要自动带主表合同编号」 |\r\n| 资源接口批量上/下线（先全下线再全上线才生效） | `batch-api-switch` | 「把这个分组的接口重新发布一遍」 |\r\n| 功能批量发布到菜单 | `prp-function-publish` | 「把未发布的功能批量发布到菜单」 |\r\n| 路由速查、数据库只读核对、改了不生效排查 | `env-debug` | 「XX 环境的表单改了不生效，帮我排查」 |\r\n| 批量给表单配流程（生成/发布/改名/测试/清历史部署） | `batch-flow-create` | 「给这几张表批量配流程并测试」 |\r\n| 开发完打现场更新包（SQL 分段 + Word 更新说明） | `update-package` | 「开发完了，打包 POSTGRESQL 更新包，表单是 XX」 |\r\n| 自定义表单批量配置、表单打包导出 SQL、技能包打包/上传 | `update-package`（`references/`） | 「把批量配置和打包上传的方法给我」 |\r\n| WorkBuddy 本机自动化 / 免 token 调本机接口 | `wbipc-api-automation` | 「用 WBIPC 帮我自动签到」 |\r\n| 表单抓取：把线上表单定义沉淀回知识库 | `form-browser-capture` | 「抓一下 XX 表单的 created 和按钮事件」 |\r\n| 页面调试固定流程（浏览器自动化） | `bsk-page-debug` | 「按固定流程调试这个页面」 |\r\n| 文档去 AI 味 | `humanizer` | 「把这段说明改得像人写的」 |\r\n| 手册站改造、重新发布、工具跳转修复、官方文档校订 | `handbook-site-maintain` | 「把知识库改动重新发布到在线手册」 |\r\n\r\n## 环境准备\r\n\r\n- 环境地址 + token 每次由使用者单独提供，本库不预置。\r\n- token 取法：登录后 F12 → `localStorage.access_token`，请求头 `Authorization: Bearer <token>`。\r\n- 在本目录起 Claude Code 会话会自动加载 `CLAUDE.md`（技能路由和约定都在里面）。\r\n\r\n## 使用约定（原「配套能力」并入）\r\n\r\n- **环境地址和 token 都不落库**：每次单独提供，AI 只在当前会话用。\r\n- **数据库只读**：技能查库只 `SELECT` 核对，不在库里改数据。\r\n- **改前先备份 / 先试点**：批量操作类技能都遵循 dry → one → all，别一上来全量；批量临时改动要留回滚清单。\r\n- **技能是仓库**：更细的接口契约、脚本参数、坑位都在技能 `SKILL.md` 里，这份只是入口。\r\n- **技能三处同步**：`.claude/skills/` 是唯一主本，`.trae/skills/`、`.workbuddy/skills/` 为完全同步副本，改技能只改主本再同步。\r\n\r\n## 目录用途（避免重复内容）\r\n\r\n| 目录 / 文件 | 用途 | 谁维护 |\r\n| :--- | :--- | :--- |\r\n| `首页.md` | 全局入口：场景→技能对照、环境准备、使用约定、目录用途 | 手工 |\r\n| `01-自定义表单配置方法/` | 七段闭环正文（`01-总览` + `02`~`08`）+ `实战/` 手册 | 手工 |\r\n| `工具/` | 通用 Python 工具与达梦 SQL 交付规范，交付前直接用 | 手工 |\r\n| `培训/` | 通用培训材料（PPT / 字段生成器） | 手工 |\r\n| `.claude/skills/` | **技能唯一主本**（12 个）；Claude Code 引用 | 手工 |\r\n| `.trae/skills/` | 技能完全同步副本（Trae 引用）；`.trae/rules/` 是 Trae 独有规则，不与主本合并 | 由主本同步 |\r\n| `.workbuddy/skills/` | 技能完全同步副本（WorkBuddy 引用）；`.workbuddy/` 另含构建脚本、应用配置、项目记忆 | 由主本同步 |\r\n| `开发手册.html` | 构建器生成的自包含离线阅读器 | 由 `build-viewer.mjs` 生成 |\r\n| `dist/` | 发布产物：`index.html`（= 离线手册）、`skills.zip`（技能包）、`tools/` | 由构建脚本 + 打包脚本生成 |\r\n| `.wbapp_*.genie` | 发布应用标识（复用既有 locator，不重复发布） | 工具 |\r\n\r\n> 旧版重复手册副本已删除；需要离线手册用 `开发手册.html`，需要发布产物用 `dist/`。整理前的分散章节与项目专属内容已全部并入上表对应位置或移入技能包，不再独立保留；本次变更明细见交付时的《整理变更清单》。\r\n',vu=["const","let","var","function","return","if","else","for","while","do","switch","case","break","continue","new","class","extends","import","export","from","default","async","await","try","catch","finally","throw","typeof","instanceof","of","in","this","null","undefined","true","false","module","exports","require"],yu=["select","from","where","insert","into","values","update","set","delete","join","left","right","inner","outer","on","as","and","or","not","null","group","order","by","limit","offset","having","distinct","count","sum","max","min","create","table","alter","drop","index","union","case","when","then","end","like","in","exists","with","returning"],wu=["cd","ls","echo","cat","grep","find","cp","mv","rm","mkdir","sudo","npm","node","git","curl","docker","psql","export","source","if","then","fi","for","do","done","ssh","scp","tar","which"];function ot(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function xu(e,n){const t=n.toLowerCase(),c=t.includes("sql"),l=/^(bash|sh|shell|zsh|console)$/.test(t),a=c?yu:l?wu:vu,r=c?"--[^\\n]*":l?"#[^\\n]*":"\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/",o=new RegExp(`(${r})|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)|\\b(${a.join("|")})\\b|(\\b\\d+(?:\\.\\d+)?\\b)`,"gi");return e.replace(o,(u,h,p,f,d)=>h?`<span class="tok-c">${h}</span>`:p?`<span class="tok-s">${p}</span>`:f?`<span class="tok-k">${f}</span>`:`<span class="tok-n">${d}</span>`)}function ku(e,n){return e.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(t,c,l)=>{const a=n(c.trim()),r=l||c.split("/").pop()||c;return a?`<span class="wikilink" data-link="${ot(a)}">${ot(r)}</span>`:`<span class="wikilink is-dead" title="未收录">${ot(r)}</span>`})}function rt(e,n){const t=[];let c=ot(e);return c=c.replace(/`([^`]+)`/g,(l,a)=>(t.push(`<code>${a}</code>`),`@@C${t.length-1}@@`)),c=ku(c,n),c=c.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(l,a,r)=>/^(https?:|mailto:)/i.test(r)||r.startsWith("#")?`<a href="${r}" target="_blank" rel="noopener noreferrer">${a}</a>`:`<span class="wikilink is-dead">${a}</span>`),c=c.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),c=c.replace(/(^|[^*])\*([^*\n]+)\*/g,"$1<em>$2</em>"),c=c.replace(/~~([^~]+)~~/g,"<del>$1</del>"),c.replace(/@@C(\d+)@@/g,(l,a)=>t[Number(a)]??l)}const Un=e=>e.replace(/^\s*\|/,"").replace(/\|\s*$/,"").split("|").map(n=>n.trim());function Eu(e,n,t){const c=n?"ol":"ul";let l=`<${c}>`,a=!1;for(const r of e){const o=/^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(r);if(o){a&&(l+="</li>");const u=/^\[( |x|X)\]\s+/.exec(o[3]);l+="<li>",a=!0,l+=u?`<input type="checkbox" disabled${u[1]!==" "?" checked":""} /> `+rt(o[3].replace(/^\[( |x|X)\]\s+/,""),t):rt(o[3],t)}else a&&(l+=" "+rt(r.trim(),t))}return a&&(l+="</li>"),l+`</${c}>`}function mr(e,n){const t=e.replace(/\r\n/g,`
`).split(`
`),c=[],l=[];let a=0;for(;a<t.length;){const r=t[a];if(!r.trim()){a++;continue}const o=/^\s*```\s*([\w+-]*)\s*$/.exec(r);if(o){const p=o[1]||"",f=[];for(a++;a<t.length&&!/^\s*```\s*$/.test(t[a]);)f.push(t[a]),a++;a++;const d=f.join(`
`),s=l.length;l.push(d),c.push(`<div class="code-block"><div class="code-bar"><span class="code-lang">${ot(p||"text")}</span><button type="button" class="copy-btn" data-code="${s}">复制</button></div><pre><code>${xu(ot(d),p)}</code></pre></div>`);continue}const u=/^(#{1,6})\s+(.*)$/.exec(r);if(u){const p=u[1].length;c.push(`<h${p}>${rt(u[2].replace(/#+\s*$/,""),n)}</h${p}>`),a++;continue}if(/^\s*(---|\*\*\*|___)\s*$/.test(r)){c.push("<hr />"),a++;continue}if(r.includes("|")&&a+1<t.length&&/^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(t[a+1])){const p=Un(r);a+=2;const f=[];for(;a<t.length&&t[a].includes("|")&&t[a].trim();)f.push(Un(t[a])),a++;c.push('<div class="table-wrap"><table><thead><tr>'+p.map(d=>`<th>${rt(d,n)}</th>`).join("")+"</tr></thead><tbody>"+f.map(d=>"<tr>"+d.map(s=>`<td>${rt(s,n)}</td>`).join("")+"</tr>").join("")+"</tbody></table></div>");continue}if(/^\s*>\s?/.test(r)){const p=[];for(;a<t.length&&/^\s*>\s?/.test(t[a]);)p.push(t[a].replace(/^\s*>\s?/,"")),a++;c.push(`<blockquote>${mr(p.join(`
`),n).html}</blockquote>`);continue}if(/^\s*([-*+]|\d+\.)\s+/.test(r)){const p=/^\s*\d+\.\s/.test(r),f=[];for(;a<t.length&&(/^\s*([-*+]|\d+\.)\s+/.test(t[a])||/^\s{2,}\S/.test(t[a]));)f.push(t[a]),a++;c.push(Eu(f,p,n));continue}const h=[];for(;a<t.length&&t[a].trim()&&!/^\s*```/.test(t[a])&&!/^(#{1,6})\s/.test(t[a])&&!/^\s*>\s?/.test(t[a])&&!/^\s*([-*+]|\d+\.)\s+/.test(t[a])&&!/^\s*(---|\*\*\*|___)\s*$/.test(t[a]);)h.push(t[a]),a++;h.length?c.push(`<p>${rt(h.join(`
`),n).replace(/\n/g,"<br />")}</p>`):a++}return{html:c.join(`
`),codes:l}}function Au(e){const n=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!n)return{meta:{},body:e};const t={};let c=null;for(const l of n[1].split(/\r?\n/)){const a=/^([A-Za-z_\u4e00-\u9fa5][\w\u4e00-\u9fa5-]*)\s*:\s*(.*)$/.exec(l);if(a){const o=a[1],u=a[2].trim().replace(/^['"]|['"]$/g,"");u===""?(c=o,t[o]=[]):(c=null,t[o]=u);continue}const r=/^\s*-\s+(.*)$/.exec(l);r&&c&&t[c].push(r[1].trim().replace(/^['"]|['"]$/g,""))}return{meta:t,body:e.slice(n[0].length)}}const Su=new Set(["127.0.0.1","0.0.0.0","255.255.255.255","localhost"]),Iu=[{name:"ssh-user-host",re:/\b[A-Za-z0-9_.-]+@\d{1,3}(?:\.\d{1,3}){3}\b/g,to:"<用户>@<内网地址>"},{name:"bearer-token",re:/(Bearer\s+)[A-Za-z0-9._-]{8,}/gi,to:"$1<你的Token>"},{name:"ipv4",re:/\b\d{1,3}(?:\.\d{1,3}){3}(?::\d{2,5})?\b/g,to:e=>Su.has(e)?e:"<内网地址>"},{name:"port",re:/\b(port)\s*([=:])\s*\d{2,5}/gi,to:e=>e.replace(/\d{2,5}\s*$/,"<端口>")},{name:"password",re:/(-p\s+)'[^']*'/g,to:"$1'<密码>'"},{name:"ssh-port",re:/(ssh\s+-p\s+)\d{2,5}\b/gi,to:"$1<端口>"},{name:"credential-pair",re:/\b(?:admin|administrator|root|omm|sa|user|test|guest)\b\s*\/\s*[A-Za-z0-9_!@#$%^&*]{6,}\b/gi,to:"<账号> / <密码>"}];function Cu(e){if(!e)return e;let n=e;for(const t of Iu)n=n.replace(t.re,(...c)=>typeof t.to=="function"?t.to(...c):t.to.replace(/\$(\d)/g,(l,a)=>c[Number(a)]??""));return n}const Tu=Object.assign({"./notes/01-自定义表单配置方法/01-总览.md":ou,"./notes/01-自定义表单配置方法/02-数据表创建.md":lu,"./notes/01-自定义表单配置方法/03-表单设计.md":uu,"./notes/01-自定义表单配置方法/04-表单发布.md":du,"./notes/01-自定义表单配置方法/05-流程设计.md":cu,"./notes/01-自定义表单配置方法/06-流程发布.md":fu,"./notes/01-自定义表单配置方法/07-测试验收.md":hu,"./notes/01-自定义表单配置方法/08-实战与常见问题处理.md":pu,"./notes/01-自定义表单配置方法/实战/自定义表单开发实战.md":mu,"./notes/工具/README.md":gu,"./notes/工具/达梦SQL交付规范.md":bu,"./notes/首页.md":_u});function Ru(e){const n=e.split("/"),t=n.length>1?n[0]:"";if(!t)return{index:"00",name:"入口"};const c=/^(\d+)[-–—\s]*(.*)$/.exec(t);return c?{index:c[1].padStart(2,"0"),name:c[2]||t}:{index:"99",name:t}}function Nu(e,n){const t=/^#\s+(.+)$/m.exec(e);return t?t[1].replace(/\s*\{[^}]*\}\s*$/,"").trim():n.split("/").pop()??n}const gr=Object.entries(Tu).map(([e,n])=>{const t=e.replace(/^\.\/notes\//,"").replace(/\.md$/i,""),{meta:c,body:l}=Au(Cu(n)),a=Ru(t);return{id:t,title:Nu(l,t),file:t+".md",group:a.name,groupIndex:a.index,meta:c,content:l.trim()}}).sort((e,n)=>e.groupIndex===n.groupIndex?e.file.localeCompare(n.file,"zh-Hans-CN"):e.groupIndex.localeCompare(n.groupIndex)),qu=(()=>{const e=[];for(const n of gr){let t=e.find(c=>c.index===n.groupIndex);t||(t={index:n.groupIndex,name:n.group,notes:[]},e.push(t)),t.notes.push(n.id)}return e})(),sn=new Map(gr.map(e=>[e.id,e]));function Lu(e){const n=e.trim().replace(/\.md$/i,"");if(!n)return null;if(sn.has(n))return n;const t=n.split("/").pop();for(const c of sn.keys())if(c.split("/").pop()===t)return c;return null}const Du={class:"home"},Ou={key:0,class:"doc"},zu=["innerHTML"],Fu={key:1,class:"empty"},Bu=Fe({__name:"index",setup(e){const n=sn.get("首页")??null,t=ge(()=>n?mr(n.content,Lu).html:"");return(c,l)=>(K(),re("div",Du,[O(n)?(K(),re("article",Ou,[D("div",{class:"markdown",innerHTML:t.value},null,8,zu)])):(K(),re("div",Fu,[...l[0]||(l[0]=[D("b",null,"首页内容缺失",-1),de(" 未找到「首页」笔记，请在 src/tools/handbook/notes/ 下补回 首页.md。 ",-1)])]))]))}}),Pu=$e(Bu,[["__scopeId","data-v-12b1d696"]]),Mu=()=>Fs(()=>import("./index-D-ZMwtYx.js"),__vite__mapDeps([0,1,2,3,4])),ju=[{path:"/",name:"home",component:Pu,meta:{tool:{title:"知识库首页",desc:"bestdt 低代码平台二次开发手册 · 首页",icon:"M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 21V12h6v9",hideTopbar:!0}}},{path:"/field-generator",name:"field-generator",component:vo,meta:{tool:{title:"字段生成器",desc:"审批流建表 · Excel 字段定义一键生成",icon:"M3 5h18v14H3zM3 9h18M3 14h18M9 5v14M15 5v14",hideTopbar:!0}}},{path:"/bookmark-form",name:"bookmark-form",component:Ml,meta:{tool:{title:"书签生成表单",desc:"提取 Word 书签 → 复用命名规则 → 设计器 JSON",icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5"}}},{path:"/form-code",name:"form-code",component:iu,meta:{tool:{title:"自定义表单代码示例",desc:"BestDT 响应式表单代码示例（在线查看 / 编辑 / 下载）",icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13h-4M16 17h-4"}}},{path:"/handbook",name:"handbook",component:Mu,meta:{tool:{title:"开发手册",desc:"bestdt 低代码平台二次开发手册 · 笔记速查",icon:"M4 5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM7 3v6h9M7 13h7M7 17h5",hiddenInNav:!0,hideChrome:!0,hideTopbar:!0}}},{path:"/field-sql",name:"field-sql",component:Bo,meta:{tool:{title:"新增字段 SQL",desc:"批量生成 dy_table_field 插入 / 改表 / 注释 SQL",icon:"M4 7h16M4 12h10M4 17h16M17 10l3 2-3 2"}}},{path:"/toolbox",name:"toolbox",component:Xl,meta:{tool:{title:"工具箱",desc:"站内开发工具 + 第三方在线工具",icon:"M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z",hideTopbar:!0}}},{path:"/:pathMatch(.*)*",redirect:"/"}],Uu=ns({history:Oa("/zdscq_zyt/"),routes:ju,scrollBehavior:()=>({top:0})});Qr(Ds).use(Uu).mount("#app");export{ss as M,$e as _,sn as a,Lu as b,ot as e,qu as g,gr as n,mr as r,ls as u};
