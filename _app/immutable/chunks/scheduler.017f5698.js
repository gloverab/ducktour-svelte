var I=Object.defineProperty;var G=(t,e,n)=>e in t?I(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(G(t,typeof e!="symbol"?e+"":e,n),n);function M(){}function R(t,e){for(const n in e)t[n]=e[n];return t}function F(t){return t()}function at(){return Object.create(null)}function U(t){t.forEach(F)}function J(t){return typeof t=="function"}function ut(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function ft(t){return Object.keys(t).length===0}function L(t,...e){if(t==null){for(const i of e)i(void 0);return M}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t){let e;return L(t,n=>e=n)(),e}function dt(t,e,n){t.$$.on_destroy.push(L(e,n))}function ht(t,e,n,i){if(t){const s=j(t,e,n,i);return t[0](s)}}function j(t,e,n,i){return t[1]&&i?R(n.ctx.slice(),t[1](i(e))):n.ctx}function mt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function pt(t,e,n,i,s,c){if(s){const r=j(e,n,i,c);t.p(r,s)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function gt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function bt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function xt(t,e,n){return t.set(n),e}function wt(t){return t&&J(t.destroy)?t.destroy:M}let b=!1;function vt(){b=!0}function Et(){b=!1}function K(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&o.push(u)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const a=e[o].claim_order,u=(s>0&&e[n[s]].claim_order<=a?s+1:K(1,s,q=>e[n[q]].claim_order,a))-1;i[o]=n[u]+1;const k=u+1;n[k]=o,s=Math.max(k,s)}const c=[],r=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);c.reverse(),r.sort((o,a)=>o.claim_order-a.claim_order);for(let o=0,a=0;o<r.length;o++){for(;a<c.length&&r[o].claim_order>=c[a].claim_order;)a++;const u=a<c.length?c[a]:null;t.insertBefore(r[o],u)}}function V(t,e){t.appendChild(e)}function X(t,e){if(b){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Y(t,e,n){t.insertBefore(e,n||null)}function Z(t,e,n){b&&!n?X(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function Tt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function A(t){return document.createElement(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function N(t){return document.createTextNode(t)}function At(){return N(" ")}function Nt(){return N("")}function S(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function P(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const $=["width","height"];function kt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&$.indexOf(i)===-1?t[i]=e[i]:P(t,i,e[i])}function St(t,e){for(const n in e)P(t,n,e[n])}function Ct(t,e,n){t.setAttributeNS("http://www.w3.org/1999/xlink",e,n)}function Ht(t){return t.dataset.svelteH}function Mt(t){return Array.from(t.childNodes)}function O(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function z(t,e,n,i,s=!1){O(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function B(t,e,n,i){return z(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||c.push(l.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Lt(t,e,n){return B(t,e,n,A)}function jt(t,e,n){return B(t,e,n,D)}function tt(t,e){return z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>N(e),!0)}function Dt(t){return tt(t," ")}function C(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Pt(t,e){const n=C(t,"HTML_TAG_START",0),i=C(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new x(e);O(t);const s=t.splice(n,i-n+1);y(s[0]),y(s[s.length-1]);const c=s.slice(1,s.length-1);if(c.length===0)return new x(e);for(const r of c)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new x(e,c)}function Ot(t,e){e=""+e,t.data!==e&&(t.data=e)}function zt(t,e){t.value=e??""}function Bt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Wt(t,e,n){for(let i=0;i<t.options.length;i+=1){const s=t.options[i];if(s.__value===e){s.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function qt(t){const e=t.querySelector(":checked");return e&&e.__value}let p;function et(){if(p===void 0){p=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{p=!0}}return p}function It(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=A("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=et();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=S(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=S(i.contentWindow,"resize",e),e()}),V(t,i),()=>{(s||c&&i.contentWindow)&&c(),y(i)}}function Gt(t,e,n){t.classList.toggle(e,!!n)}function nt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Rt(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(s)):c===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class it{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=D(n.nodeName):this.e=A(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Y(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(y)}}class x extends it{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)Z(this.t,this.n[i],n)}}function Ft(t,e){return new t(e)}let g;function w(t){g=t}function h(){if(!g)throw new Error("Function called outside component initialization");return g}function Ut(t){h().$$.on_mount.push(t)}function Jt(t){h().$$.after_update.push(t)}function Kt(t){h().$$.on_destroy.push(t)}function Qt(){const t=h();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=nt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function Vt(t,e){return h().$$.context.set(t,e),e}function Xt(t){return h().$$.context.get(t)}const m=[],H=[];let d=[];const E=[],W=Promise.resolve();let T=!1;function st(){T||(T=!0,W.then(ct))}function Yt(){return st(),W}function rt(t){d.push(t)}function Zt(t){E.push(t)}const v=new Set;let _=0;function ct(){if(_!==0)return;const t=g;do{try{for(;_<m.length;){const e=m[_];_++,w(e),ot(e.$$)}}catch(e){throw m.length=0,_=0,e}for(w(null),m.length=0,_=0;H.length;)H.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];v.has(n)||(v.add(n),n())}d.length=0}while(m.length);for(;E.length;)E.pop()();T=!1,v.clear(),w(t)}function ot(t){if(t.fragment!==null){t.update(),U(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(rt)}}function $t(t){const e=[],n=[];d.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),d=e}export{Gt as $,Kt as A,S as B,bt as C,R as D,gt as E,kt as F,D as G,x as H,jt as I,Pt as J,St as K,_t as L,xt as M,wt as N,J as O,Qt as P,Ht as Q,U as R,zt as S,rt as T,Wt as U,qt as V,Rt as W,Tt as X,Xt as Y,Vt as Z,Ct as _,At as a,It as a0,Zt as a1,L as a2,at as a3,ct as a4,ft as a5,$t as a6,g as a7,w as a8,F as a9,m as aa,st as ab,vt as ac,Et as ad,Jt as b,Dt as c,y as d,Nt as e,A as f,Lt as g,Mt as h,Z as i,P as j,Bt as k,N as l,tt as m,Ot as n,Ut as o,H as p,Ft as q,ht as r,ut as s,Yt as t,pt as u,yt as v,mt as w,X as x,M as y,dt as z};