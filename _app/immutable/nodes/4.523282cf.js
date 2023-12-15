import{s as W,D as R,G as _e,H as de,I as ve,h as B,J as ue,d as m,K as te,i as S,y as J,E as X,f as C,a as T,l as I,g as k,c as P,m as L,j as F,k as z,x as d,n as $,Q as ee,B as be,X as De,e as le,r as Fe,F as we,u as Ce,v as ke,w as Ee,C as se}from"../chunks/scheduler.017f5698.js";import{S as Y,i as G,a as V,g as me,t as O,c as ge,b as M,d as Z,m as q,e as K}from"../chunks/index.421f4cc9.js";import{g as Be,e as ne}from"../chunks/spread.73038926.js";import{c as N,g as xe}from"../chunks/contexts.0a110b5d.js";import{b as Ae}from"../chunks/paths.f2717af1.js";function He(a){let e,t,l='<path fill="currentColor" d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7ZM5.002 8L5 20h10V8H5.002ZM9 6h8v10h2V4H9v2Z"/>',n=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},a[0]],i={};for(let s=0;s<n.length;s+=1)i=R(i,n[s]);return{c(){e=_e("svg"),t=new de(!0),this.h()},l(s){e=ve(s,"svg",{viewBox:!0,width:!0,height:!0});var o=B(e);t=ue(o,!0),o.forEach(m),this.h()},h(){t.a=null,te(e,i)},m(s,o){S(s,e,o),t.m(l,e)},p(s,[o]){te(e,i=Be(n,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},o&1&&s[0]]))},i:J,o:J,d(s){s&&m(e)}}}function Ie(a,e,t){return a.$$set=l=>{t(0,e=R(R({},e),X(l)))},e=X(e),[e]}class Le extends Y{constructor(e){super(),G(this,e,Ie,He,W,{})}}function oe(a,e,t){const l=a.slice();return l[23]=e[t],l}function ae(a){let e,t,l,n,i,s=a[6]&&ie(a),o=a[3]&&re(a);return{c(){e=C("div"),s&&s.c(),t=T(),l=C("div"),n=T(),o&&o.c(),this.h()},l(r){e=k(r,"DIV",{class:!0,style:!0});var g=B(e);s&&s.l(g),t=P(g),l=k(g,"DIV",{class:!0}),B(l).forEach(m),n=P(g),o&&o.l(g),g.forEach(m),this.h()},h(){F(l,"class","flex-1"),F(e,"class","code-fence-top-bar sticky top-0 left-0 z-10 flex items-center py-1 pt-2 backdrop-blur backdrop-filter"),z(e,"background-color","var(--kd-code-fence-top-bar-bg)")},m(r,g){S(r,e,g),s&&s.m(e,null),d(e,t),d(e,l),d(e,n),o&&o.m(e,null),i=!0},p(r,g){r[6]?s?s.p(r,g):(s=ie(r),s.c(),s.m(e,t)):s&&(s.d(1),s=null),r[3]?o?(o.p(r,g),g&8&&V(o,1)):(o=re(r),o.c(),V(o,1),o.m(e,null)):o&&(me(),O(o,1,1,()=>{o=null}),ge())},i(r){i||(V(o),i=!0)},o(r){O(o),i=!1},d(r){r&&m(e),s&&s.d(),o&&o.d()}}}function ie(a){let e,t;return{c(){e=C("span"),t=I(a[5]),this.h()},l(l){e=k(l,"SPAN",{class:!0});var n=B(e);t=L(n,a[5]),n.forEach(m),this.h()},h(){F(e,"class","code-fence-title ml-3.5 font-mono text-sm text-soft")},m(l,n){S(l,e,n),d(e,t)},p(l,n){n&32&&$(t,l[5])},d(l){l&&m(e)}}}function re(a){let e,t,l,n,i,s,o,r,g="Copy",u,w,x;return s=new Le({props:{width:"24",height:"24",class:N(a[4]?"opacity-0":"duration-600 opacity-100 transition-opacity ease-in")}}),{c(){e=C("button"),t=C("div"),l=I("Copied"),i=T(),M(s.$$.fragment),o=T(),r=C("span"),r.textContent=g,this.h()},l(b){e=k(b,"BUTTON",{type:!0,class:!0});var y=B(e);t=k(y,"DIV",{class:!0,"aria-hidden":!0,style:!0});var E=B(t);l=L(E,"Copied"),E.forEach(m),i=P(y),Z(s.$$.fragment,y),o=P(y),r=k(y,"SPAN",{class:!0,"data-svelte-h":!0}),ee(r)!=="svelte-1cbrti2"&&(r.textContent=g),y.forEach(m),this.h()},h(){F(t,"class",n=N("absolute top-2.5 right-4 z-10 rounded-md px-2 py-1 font-mono text-sm transition-opacity duration-300 ease-out",a[4]?"opacity-100":"hidden opacity-0")),F(t,"aria-hidden","true"),z(t,"background-color","var(--kd-code-copied-bg-color)"),F(r,"class","sr-only"),F(e,"type","button"),F(e,"class","mr-2 px-2 py-1 text-soft hover:text-inverse")},m(b,y){S(b,e,y),d(e,t),d(t,l),d(e,i),q(s,e,null),d(e,o),d(e,r),u=!0,w||(x=be(e,"click",a[11]),w=!0)},p(b,y){(!u||y&16&&n!==(n=N("absolute top-2.5 right-4 z-10 rounded-md px-2 py-1 font-mono text-sm transition-opacity duration-300 ease-out",b[4]?"opacity-100":"hidden opacity-0")))&&F(t,"class",n);const E={};y&16&&(E.class=N(b[4]?"opacity-0":"duration-600 opacity-100 transition-opacity ease-in")),s.$set(E)},i(b){u||(V(s.$$.fragment,b),u=!0)},o(b){O(s.$$.fragment,b),u=!1},d(b){b&&m(e),K(s),w=!1,x()}}}function ce(a){let e,t,l,n=a[8].join(`
`)+"",i,s;return{c(){e=C("pre"),t=I("			  "),l=C("div"),i=I(n),s=I(`
		  `),this.h()},l(o){e=k(o,"PRE",{class:!0,style:!0});var r=B(e);t=L(r,"			  "),l=k(r,"DIV",{class:!0,"aria-hidden":!0});var g=B(l);i=L(g,n),g.forEach(m),s=L(r,`
		  `),r.forEach(m),this.h()},h(){F(l,"class","992:block hidden flex-none select-none text-right text-soft"),F(l,"aria-hidden","true"),F(e,"class","992:flex absolute top-3.5 left-0 m-0 hidden flex-col text-sm leading-[27px]"),z(e,"border-radius","0"),z(e,"padding-top","0")},m(o,r){S(o,e,r),d(e,t),d(e,l),d(l,i),d(e,s)},p(o,r){r&256&&n!==(n=o[8].join(`
`)+"")&&$(i,n)},d(o){o&&m(e)}}}function fe(a){let e,t=ne(a[8]),l=[];for(let n=0;n<t.length;n+=1)l[n]=pe(oe(a,t,n));return{c(){e=C("div");for(let n=0;n<l.length;n+=1)l[n].c();this.h()},l(n){e=k(n,"DIV",{class:!0,"aria-hidden":!0});var i=B(e);for(let s=0;s<l.length;s+=1)l[s].l(i);i.forEach(m),this.h()},h(){F(e,"class","pointer-events-none absolute inset-0 mt-[0.7em] h-full w-full leading-[27px]"),F(e,"aria-hidden","true")},m(n,i){S(n,e,i);for(let s=0;s<l.length;s+=1)l[s]&&l[s].m(e,null)},p(n,i){if(i&1792){t=ne(n[8]);let s;for(s=0;s<t.length;s+=1){const o=oe(n,t,s);l[s]?l[s].p(o,i):(l[s]=pe(o),l[s].c(),l[s].m(e,null))}for(;s<l.length;s+=1)l[s].d(1);l.length=t.length}},d(n){n&&m(e),De(l,n)}}}function Se(a){let e;return{c(){e=C("br")},l(t){e=k(t,"BR",{})},m(t,l){S(t,e,l)},d(t){t&&m(e)}}}function Ve(a){let e,t=` 
            `;return{c(){e=C("div"),e.textContent=t,this.h()},l(l){e=k(l,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),ee(e)!=="svelte-15qbw1l"&&(e.textContent=t),this.h()},h(){F(e,"class","w-full border-l-[5px] font-mono text-transparent"),z(e,"border-color","var(--kd-code-highlight-border)"),z(e,"background-color","var(--kd-code-highlight-color)")},m(l,n){S(l,e,n)},d(l){l&&m(e)}}}function pe(a){let e,t;function l(s,o){return o&768&&(e=null),e==null&&(e=!!s[10](s[23],s[9])),e?Ve:Se}let n=l(a,-1),i=n(a);return{c(){i.c(),t=le()},l(s){i.l(s),t=le()},m(s,o){i.m(s,o),S(s,t,o)},p(s,o){n!==(n=l(s,o))&&(i.d(1),i=n(s),i&&(i.c(),i.m(t.parentNode,t)))},d(s){s&&m(t),i.d(s)}}}function Te(a){var H;let e,t,l,n,i,s,o,r=((H=a[1])==null?void 0:H.replace(/^<pre(.*?)>/,"").replace(/<\/pre(.*?)>$/,"").trim())+"",g,u,w,x,b,y,E,p=a[7]&&ae(a),D=a[2]&&ce(a),_=a[9].length>0&&fe(a);return{c(){e=C("div"),p&&p.c(),t=T(),l=C("div"),n=C("div"),i=C("pre"),s=I("        "),o=new de(!1),g=I(`
      `),x=T(),D&&D.c(),b=T(),_&&_.c(),this.h()},l(h){e=k(h,"DIV",{class:!0,style:!0});var f=B(e);p&&p.l(f),t=P(f),l=k(f,"DIV",{class:!0});var v=B(l);n=k(v,"DIV",{class:!0});var A=B(n);i=k(A,"PRE",{class:!0});var j=B(i);s=L(j,"        "),o=ue(j,!1),g=L(j,`
      `),j.forEach(m),A.forEach(m),x=P(v),D&&D.l(v),b=P(v),_&&_.l(v),v.forEach(m),f.forEach(m),this.h()},h(){o.a=g,F(i,"class",u=N("relative scrollbar overflow-scroll",a[2]&&a[8].length>=100?"pl-6":"pl-3")),F(n,"class",w=N(a[2]&&"992:pl-10")),F(l,"class","code relative z-0 overflow-hidden"),F(e,"class",y=N("code-fence 576:max-h-[32rem] relative my-8 mx-auto max-h-[60vh] overflow-y-auto rounded-md","prefers-dark-scheme scrollbar scroll-contain shadow-xl border-border border",a[0]&&`lang-${a[0]}`)),z(e,"background-color","var(--kd-code-fence-bg)")},m(h,f){S(h,e,f),p&&p.m(e,null),d(e,t),d(e,l),d(l,n),d(n,i),d(i,s),o.m(r,i),d(i,g),d(l,x),D&&D.m(l,null),d(l,b),_&&_.m(l,null),E=!0},p(h,[f]){var v;h[7]?p?(p.p(h,f),f&128&&V(p,1)):(p=ae(h),p.c(),V(p,1),p.m(e,t)):p&&(me(),O(p,1,1,()=>{p=null}),ge()),(!E||f&2)&&r!==(r=((v=h[1])==null?void 0:v.replace(/^<pre(.*?)>/,"").replace(/<\/pre(.*?)>$/,"").trim())+"")&&o.p(r),(!E||f&260&&u!==(u=N("relative scrollbar overflow-scroll",h[2]&&h[8].length>=100?"pl-6":"pl-3")))&&F(i,"class",u),(!E||f&4&&w!==(w=N(h[2]&&"992:pl-10")))&&F(n,"class",w),h[2]?D?D.p(h,f):(D=ce(h),D.c(),D.m(l,b)):D&&(D.d(1),D=null),h[9].length>0?_?_.p(h,f):(_=fe(h),_.c(),_.m(l,null)):_&&(_.d(1),_=null),(!E||f&1&&y!==(y=N("code-fence 576:max-h-[32rem] relative my-8 mx-auto max-h-[60vh] overflow-y-auto rounded-md","prefers-dark-scheme scrollbar scroll-contain shadow-xl border-border border",h[0]&&`lang-${h[0]}`)))&&F(e,"class",y)},i(h){E||(V(p),E=!0)},o(h){O(p),E=!1},d(h){h&&m(e),p&&p.d(),D&&D.d(),_&&_.d()}}}function Pe(a,e,t){let l,n,i,s,o,r,{lang:g=null}=e,{ext:u=null}=e,{code:w=null}=e,{rawCode:x=null}=e,{title:b=null}=e,{linesCount:y=((w==null?void 0:w.match(/"line"/g))||[]).length}=e,{showLineNumbers:E=!1}=e,{highlightLines:p=[]}=e,{copyHighlightOnly:D=!1}=e,{copySteps:_=!1}=e,{showCopyCode:H=_||D}=e;xe();let h=1,f=[];const v=(c,Q)=>l.some(([U,ye])=>c>=U&&c<=ye);let A=!1;async function j(){try{const c=l.length>0&&(D||_)?i==null?void 0:i.split(`
`).filter((Q,U)=>v(U+1)).join(`
`):i;await navigator.clipboard.writeText(c||"")}catch{}if(t(4,A=!0),_){const c=h+1,Q=p.length>0?p.length:n.length;t(19,h=c>Q?1:c)}}return a.$$set=c=>{"lang"in c&&t(0,g=c.lang),"ext"in c&&t(12,u=c.ext),"code"in c&&t(1,w=c.code),"rawCode"in c&&t(13,x=c.rawCode),"title"in c&&t(14,b=c.title),"linesCount"in c&&t(15,y=c.linesCount),"showLineNumbers"in c&&t(2,E=c.showLineNumbers),"highlightLines"in c&&t(16,p=c.highlightLines),"copyHighlightOnly"in c&&t(17,D=c.copyHighlightOnly),"copySteps"in c&&t(18,_=c.copySteps),"showCopyCode"in c&&t(3,H=c.showCopyCode)},a.$$.update=()=>{a.$$.dirty&851968&&_&&t(20,f=[p[h-1]??[h,h]]),a.$$.dirty&1376256&&t(9,l=_?f:p),a.$$.dirty&32768&&t(8,n=[...Array(y-1).keys()].map(c=>c+1)),a.$$.dirty&8192&&(i=x==null?void 0:x.replace(/&#8203/g,"")),a.$$.dirty&16&&A&&setTimeout(()=>{t(4,A=!1)},400),a.$$.dirty&16392&&t(7,s=b||H),a.$$.dirty&20480&&t(6,o=b||u),a.$$.dirty&20480&&t(5,r=b??(u==="sh"?"terminal":u))},[g,w,E,H,A,r,o,s,n,l,v,j,u,x,b,y,p,D,_,h,f]}class je extends Y{constructor(e){super(),G(this,e,Pe,Te,W,{lang:0,ext:12,code:1,rawCode:13,title:14,linesCount:15,showLineNumbers:2,highlightLines:16,copyHighlightOnly:17,copySteps:18,showCopyCode:3})}}function Ne(a){let e,t;return{c(){e=C("code"),t=I(a[0])},l(l){e=k(l,"CODE",{});var n=B(e);t=L(n,a[0]),n.forEach(m)},m(l,n){S(l,e,n),d(e,t)},p(l,[n]){n&1&&$(t,l[0])},i:J,o:J,d(l){l&&m(e)}}}function Oe(a,e,t){let{code:l}=e;return a.$$set=n=>{"code"in n&&t(0,l=n.code)},[l]}class he extends Y{constructor(e){super(),G(this,e,Oe,Ne,W,{code:0})}}function ze(a){let e,t;const l=a[4].default,n=Fe(l,a,a[3],null);let i=[{href:a[2](a[0])},a[1]],s={};for(let o=0;o<i.length;o+=1)s=R(s,i[o]);return{c(){e=C("a"),n&&n.c(),this.h()},l(o){e=k(o,"A",{href:!0});var r=B(e);n&&n.l(r),r.forEach(m),this.h()},h(){we(e,s)},m(o,r){S(o,e,r),n&&n.m(e,null),t=!0},p(o,[r]){n&&n.p&&(!t||r&8)&&Ce(n,l,o,o[3],t?Ee(l,o[3],r,null):ke(o[3]),null)},i(o){t||(V(n,o),t=!0)},o(o){O(n,o),t=!1},d(o){o&&m(e),n&&n.d(o)}}}function Re(a,e,t){const l=[];let n=se(e,l),{$$slots:i={},$$scope:s}=e;const{href:o,...r}=n;function g(u){return u.startsWith("/")?Ae+u:u}return a.$$set=u=>{e=R(R({},e),X(u)),t(5,n=se(e,l)),"$$scope"in u&&t(3,s=u.$$scope)},[o,r,g,s,i]}class Me extends Y{constructor(e){super(),G(this,e,Re,ze,W,{})}}function Ze(a){let e;return{c(){e=I("#")},l(t){e=L(t,"#")},m(t,l){S(t,e,l)},d(t){t&&m(e)}}}function qe(a){let e,t,l="Welcome to KitDocs",n,i,s,o,r,g,u,w,x,b,y,E,p,D,_,H,h;return o=new he({props:{code:"+page.svelte"}}),w=new Me({props:{class:"header-anchor",href:"#redirecting","aria-hidden":"true",$$slots:{default:[Ze]},$$scope:{ctx:a}}}),p=new he({props:{code:"+page.js"}}),H=new je({props:{lang:"javascript",ext:"js",linesCount:9,rawCode:`import { redirect } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load() {
  throw redirect(307, '/docs');
}
`,showCopyCode:!0,code:`<pre class="shiki " style="background-color: #fff" tabindex="0"><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #BABED8"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #BABED8">redirect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #BABED8"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #BABED8"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@sveltejs/kit</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #BABED8"> </span><span style="color: #C792EA">const</span><span style="color: #BABED8"> prerender </span><span style="color: #89DDFF">=</span><span style="color: #BABED8"> </span><span style="color: #FF9CAC">true</span><span style="color: #89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #676E95; font-style: italic">/** </span><span style="color: #89DDFF; font-style: italic">@</span><span style="color: #C792EA; font-style: italic">type</span><span style="color: #676E95; font-style: italic"> </span><span style="color: #89DDFF; font-style: italic">{</span><span style="color: #FFCB6B; font-style: italic">import(&#39;./$types&#39;).PageLoad</span><span style="color: #89DDFF; font-style: italic">}</span><span style="color: #676E95; font-style: italic"> */</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #BABED8"> </span><span style="color: #C792EA">function</span><span style="color: #BABED8"> </span><span style="color: #82AAFF">load</span><span style="color: #89DDFF">()</span><span style="color: #BABED8"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF; font-style: italic">throw</span><span style="color: #F07178"> </span><span style="color: #82AAFF">redirect</span><span style="color: #F07178">(</span><span style="color: #F78C6C">307</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">/docs</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178">)</span><span style="color: #89DDFF">;</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),{c(){e=C("div"),t=C("h1"),t.textContent=l,n=T(),i=C("p"),s=I("This your home page. Feel free to change it to a Svelte file by renaming it to "),M(o.$$.fragment),r=I("."),g=T(),u=C("h2"),M(w.$$.fragment),x=I(" Redirecting"),b=T(),y=C("p"),E=I(`You might want the home page to be the first page of your documentation. If this is the case,
rename this file to `),M(p.$$.fragment),D=I(" and replace the content of this file with the following:"),_=T(),M(H.$$.fragment),this.h()},l(f){e=k(f,"DIV",{style:!0});var v=B(e);t=k(v,"H1",{"data-svelte-h":!0}),ee(t)!=="svelte-vwzmce"&&(t.textContent=l),n=P(v),i=k(v,"P",{});var A=B(i);s=L(A,"This your home page. Feel free to change it to a Svelte file by renaming it to "),Z(o.$$.fragment,A),r=L(A,"."),A.forEach(m),g=P(v),u=k(v,"H2",{id:!0,tabindex:!0});var j=B(u);Z(w.$$.fragment,j),x=L(j," Redirecting"),j.forEach(m),b=P(v),y=k(v,"P",{});var c=B(y);E=L(c,`You might want the home page to be the first page of your documentation. If this is the case,
rename this file to `),Z(p.$$.fragment,c),D=L(c," and replace the content of this file with the following:"),c.forEach(m),_=P(v),Z(H.$$.fragment,v),v.forEach(m),this.h()},h(){F(u,"id","redirecting"),F(u,"tabindex","-1"),z(e,"max-width","992px"),z(e,"margin","0 auto")},m(f,v){S(f,e,v),d(e,t),d(e,n),d(e,i),d(i,s),q(o,i,null),d(i,r),d(e,g),d(e,u),q(w,u,null),d(u,x),d(e,b),d(e,y),d(y,E),q(p,y,null),d(y,D),d(e,_),q(H,e,null),h=!0},p(f,[v]){const A={};v&1&&(A.$$scope={dirty:v,ctx:f}),w.$set(A)},i(f){h||(V(o.$$.fragment,f),V(w.$$.fragment,f),V(p.$$.fragment,f),V(H.$$.fragment,f),h=!0)},o(f){O(o.$$.fragment,f),O(w.$$.fragment,f),O(p.$$.fragment,f),O(H.$$.fragment,f),h=!1},d(f){f&&m(e),K(o),K(w),K(p),K(H)}}}class Qe extends Y{constructor(e){super(),G(this,e,null,qe,W,{})}}export{Qe as component};