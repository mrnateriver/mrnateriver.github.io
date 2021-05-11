!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((function(t){var r=e[t];"object"!=typeof r||Object.isFrozen(r)||n(r)})),e}var r=n,i=n;r.default=i;class a{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function o(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function s(e,...t){const n=Object.create(null);for(const t in e)n[t]=e[t];return t.forEach((function(e){for(const t in e)n[t]=e[t]})),n}const l=e=>!!e.kind;class c{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=o(e)}openNode(e){if(!l(e))return;let t=e.kind;e.sublanguage||(t=`${this.classPrefix}${t}`),this.span(t)}closeNode(e){l(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}class u{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t={kind:e,children:[]};this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach(t=>this._walk(e,t)),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every(e=>"string"==typeof e)?e.children=[e.children.join("")]:e.children.forEach(e=>{u._collapse(e)}))}}class d extends u{constructor(e){super(),this.options=e}addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const n=e.root;n.kind=t,n.sublanguage=!0,this.add(n)}toHTML(){return new c(this,this.options).value()}finalize(){return!0}}function g(e){return e?"string"==typeof e?e:e.source:null}const h=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;const f="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",m={begin:"\\\\[\\s\\S]",relevance:0},p={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[m]},b={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[m]},_={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},y=function(e,t,n={}){const r=s({className:"comment",begin:e,end:t,contains:[]},n);return r.contains.push(_),r.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",relevance:0}),r},w=y("//","$"),E=y("/\\*","\\*/"),x=y("#","$"),v={className:"number",begin:"\\b\\d+(\\.\\d+)?",relevance:0},N={className:"number",begin:f,relevance:0},k={className:"number",begin:"\\b(0b[01]+)",relevance:0},M={className:"number",begin:"\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},O={begin:/(?=\/[^/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[m,{begin:/\[/,end:/\]/,relevance:0,contains:[m]}]}]},A={className:"title",begin:"[a-zA-Z]\\w*",relevance:0},R={className:"title",begin:"[a-zA-Z_]\\w*",relevance:0},L={begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0};var T=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:"[a-zA-Z]\\w*",UNDERSCORE_IDENT_RE:"[a-zA-Z_]\\w*",NUMBER_RE:"\\b\\d+(\\.\\d+)?",C_NUMBER_RE:f,BINARY_NUMBER_RE:"\\b(0b[01]+)",RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=function(...e){return e.map(e=>g(e)).join("")}(t,/.*\b/,e.binary,/\b.*/)),s({className:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},BACKSLASH_ESCAPE:m,APOS_STRING_MODE:p,QUOTE_STRING_MODE:b,PHRASAL_WORDS_MODE:_,COMMENT:y,C_LINE_COMMENT_MODE:w,C_BLOCK_COMMENT_MODE:E,HASH_COMMENT_MODE:x,NUMBER_MODE:v,C_NUMBER_MODE:N,BINARY_NUMBER_MODE:k,CSS_NUMBER_MODE:M,REGEXP_MODE:O,TITLE_MODE:A,UNDERSCORE_TITLE_MODE:R,METHOD_GUARD:L,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})}});function B(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function S(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=B,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function I(e,t){Array.isArray(e.illegal)&&(e.illegal=function(...e){return"("+e.map(e=>g(e)).join("|")+")"}(...e.illegal))}function C(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function j(e,t){void 0===e.relevance&&(e.relevance=1)}const D=["of","and","for","in","not","or","if","then","parent","list","value"];function P(e,t){return t?Number(t):function(e){return D.includes(e.toLowerCase())}(e)?0:1}function H(e,{plugins:t}){function n(t,n){return new RegExp(g(t),"m"+(e.case_insensitive?"i":"")+(n?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=function(e){return new RegExp(e.toString()+"|").exec("").length-1}(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map(e=>e[1]);this.matcherRe=n(function(e,t="|"){let n=0;return e.map(e=>{n+=1;const t=n;let r=g(e),i="";for(;r.length>0;){const e=h.exec(r);if(!e){i+=r;break}i+=r.substring(0,e.index),r=r.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?i+="\\"+String(Number(e[1])+t):(i+=e[0],"("===e[0]&&n++)}return i}).map(e=>`(${e})`).join(t)}(e),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const n=t.findIndex((e,t)=>t>0&&void 0!==e),r=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,r)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new r;return this.rules.slice(e).forEach(([e,n])=>t.addRule(e,n)),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=s(e.classNameAliases||{}),function t(r,a){const o=r;if(r.isCompiled)return o;[C].forEach(e=>e(r,a)),e.compilerExtensions.forEach(e=>e(r,a)),r.__beforeBegin=null,[S,I,j].forEach(e=>e(r,a)),r.isCompiled=!0;let l=null;if("object"==typeof r.keywords&&(l=r.keywords.$pattern,delete r.keywords.$pattern),r.keywords&&(r.keywords=function e(t,n,r="keyword"){const i={};return"string"==typeof t?a(r,t.split(" ")):Array.isArray(t)?a(r,t):Object.keys(t).forEach((function(r){Object.assign(i,e(t[r],n,r))})),i;function a(e,t){n&&(t=t.map(e=>e.toLowerCase())),t.forEach((function(t){const n=t.split("|");i[n[0]]=[e,P(n[0],n[1])]}))}}(r.keywords,e.case_insensitive)),r.lexemes&&l)throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");return l=l||r.lexemes||/\w+/,o.keywordPatternRe=n(l,!0),a&&(r.begin||(r.begin=/\B|\b/),o.beginRe=n(r.begin),r.endSameAsBegin&&(r.end=r.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),r.end&&(o.endRe=n(r.end)),o.terminatorEnd=g(r.end)||"",r.endsWithParent&&a.terminatorEnd&&(o.terminatorEnd+=(r.end?"|":"")+a.terminatorEnd)),r.illegal&&(o.illegalRe=n(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((function(e){return function(e){e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return s(e,{variants:null},t)})));if(e.cachedVariants)return e.cachedVariants;if(function e(t){return!!t&&(t.endsWithParent||e(t.starts))}(e))return s(e,{starts:e.starts?s(e.starts):null});if(Object.isFrozen(e))return s(e);return e}("self"===e?r:e)}))),r.contains.forEach((function(e){t(e,o)})),r.starts&&t(r.starts,a),o.matcher=function(e){const t=new i;return e.contains.forEach(e=>t.addRule(e.begin,{rule:e,type:"begin"})),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(o),o}(e)}function q(e){const t={props:["language","code","autodetect"],data:function(){return{detectedLanguage:"",unknownLanguage:!1}},computed:{className(){return this.unknownLanguage?"":"hljs "+this.detectedLanguage},highlighted(){if(!this.autoDetect&&!e.getLanguage(this.language))return console.warn(`The language "${this.language}" you specified could not be found.`),this.unknownLanguage=!0,o(this.code);let t={};return this.autoDetect?(t=e.highlightAuto(this.code),this.detectedLanguage=t.language):(t=e.highlight(this.language,this.code,this.ignoreIllegals),this.detectedLanguage=this.language),t.value},autoDetect(){return!this.language||(e=this.autodetect,Boolean(e||""===e));var e},ignoreIllegals:()=>!0},render(e){return e("pre",{},[e("code",{class:this.className,domProps:{innerHTML:this.highlighted}})])}};return{Component:t,VuePlugin:{install(e){e.component("highlightjs",t)}}}}const $={"after:highlightElement":({el:e,result:t,text:n})=>{const r=z(e);if(!r.length)return;const i=document.createElement("div");i.innerHTML=t.value,t.value=function(e,t,n){let r=0,i="";const a=[];function s(){return e.length&&t.length?e[0].offset!==t[0].offset?e[0].offset<t[0].offset?e:t:"start"===t[0].event?e:t:e.length?e:t}function l(e){i+="<"+U(e)+[].map.call(e.attributes,(function(e){return" "+e.nodeName+'="'+o(e.value)+'"'})).join("")+">"}function c(e){i+="</"+U(e)+">"}function u(e){("start"===e.event?l:c)(e.node)}for(;e.length||t.length;){let t=s();if(i+=o(n.substring(r,t[0].offset)),r=t[0].offset,t===e){a.reverse().forEach(c);do{u(t.splice(0,1)[0]),t=s()}while(t===e&&t.length&&t[0].offset===r);a.reverse().forEach(l)}else"start"===t[0].event?a.push(t[0].node):a.pop(),u(t.splice(0,1)[0])}return i+o(n.substr(r))}(r,z(i),n)}};function U(e){return e.nodeName.toLowerCase()}function z(e){const t=[];return function e(n,r){for(let i=n.firstChild;i;i=i.nextSibling)3===i.nodeType?r+=i.nodeValue.length:1===i.nodeType&&(t.push({event:"start",offset:r,node:i}),r=e(i,r),U(i).match(/br|hr|img|input/)||t.push({event:"stop",offset:r,node:i}));return r}(e,0),t}const K=e=>{console.error(e)},F=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Z=(e,t)=>{console.log(`Deprecated as of ${e}. ${t}`)},G=o,W=s,V=Symbol("nomatch");var X=function(e){const t=Object.create(null),n=Object.create(null),i=[];let o=!0;const s=/(^(<[^>]+>|\t|)+|\n)/gm,l="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let u={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:null,__emitter:d};function g(e){return u.noHighlightRe.test(e)}function h(e,t,n,r){let i="",a="";"object"==typeof t?(i=e,n=t.ignoreIllegals,a=t.language,r=void 0):(Z("10.7.0","highlight(lang, code, ...args) has been deprecated."),Z("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),a=e,i=t);const o={code:i,language:a};M("before:highlight",o);const s=o.result?o.result:f(o.language,o.code,n,r);return s.code=o.code,M("after:highlight",s),s}function f(e,n,r,s){function c(e,t){const n=w.case_insensitive?t[0].toLowerCase():t[0];return Object.prototype.hasOwnProperty.call(e.keywords,n)&&e.keywords[n]}function d(){null!=N.subLanguage?function(){if(""===O)return;let e=null;if("string"==typeof N.subLanguage){if(!t[N.subLanguage])return void M.addText(O);e=f(N.subLanguage,O,!0,k[N.subLanguage]),k[N.subLanguage]=e.top}else e=m(O,N.subLanguage.length?N.subLanguage:null);N.relevance>0&&(A+=e.relevance),M.addSublanguage(e.emitter,e.language)}():function(){if(!N.keywords)return void M.addText(O);let e=0;N.keywordPatternRe.lastIndex=0;let t=N.keywordPatternRe.exec(O),n="";for(;t;){n+=O.substring(e,t.index);const r=c(N,t);if(r){const[e,i]=r;if(M.addText(n),n="",A+=i,e.startsWith("_"))n+=t[0];else{const n=w.classNameAliases[e]||e;M.addKeyword(t[0],n)}}else n+=t[0];e=N.keywordPatternRe.lastIndex,t=N.keywordPatternRe.exec(O)}n+=O.substr(e),M.addText(n)}(),O=""}function g(e){return e.className&&M.openNode(w.classNameAliases[e.className]||e.className),N=Object.create(e,{parent:{value:N}}),N}function h(e){return 0===N.matcher.regexIndex?(O+=e[0],1):(T=!0,0)}function p(e){const t=e[0],n=e.rule,r=new a(n),i=[n.__beforeBegin,n["on:begin"]];for(const n of i)if(n&&(n(e,r),r.isMatchIgnored))return h(t);return n&&n.endSameAsBegin&&(n.endRe=new RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),n.skip?O+=t:(n.excludeBegin&&(O+=t),d(),n.returnBegin||n.excludeBegin||(O=t)),g(n),n.returnBegin?0:t.length}function b(e){const t=e[0],r=n.substr(e.index),i=function e(t,n,r){let i=function(e,t){const n=e&&e.exec(t);return n&&0===n.index}(t.endRe,r);if(i){if(t["on:end"]){const e=new a(t);t["on:end"](n,e),e.isMatchIgnored&&(i=!1)}if(i){for(;t.endsParent&&t.parent;)t=t.parent;return t}}if(t.endsWithParent)return e(t.parent,n,r)}(N,e,r);if(!i)return V;const o=N;o.skip?O+=t:(o.returnEnd||o.excludeEnd||(O+=t),d(),o.excludeEnd&&(O=t));do{N.className&&M.closeNode(),N.skip||N.subLanguage||(A+=N.relevance),N=N.parent}while(N!==i.parent);return i.starts&&(i.endSameAsBegin&&(i.starts.endRe=i.endRe),g(i.starts)),o.returnEnd?0:t.length}let _={};function y(t,i){const a=i&&i[0];if(O+=t,null==a)return d(),0;if("begin"===_.type&&"end"===i.type&&_.index===i.index&&""===a){if(O+=n.slice(i.index,i.index+1),!o){const t=new Error("0 width match regex");throw t.languageName=e,t.badRule=_.rule,t}return 1}if(_=i,"begin"===i.type)return p(i);if("illegal"===i.type&&!r){const e=new Error('Illegal lexeme "'+a+'" for mode "'+(N.className||"<unnamed>")+'"');throw e.mode=N,e}if("end"===i.type){const e=b(i);if(e!==V)return e}if("illegal"===i.type&&""===a)return 1;if(L>1e5&&L>3*i.index){throw new Error("potential infinite loop, way more iterations than matches")}return O+=a,a.length}const w=v(e);if(!w)throw K(l.replace("{}",e)),new Error('Unknown language: "'+e+'"');const E=H(w,{plugins:i});let x="",N=s||E;const k={},M=new u.__emitter(u);!function(){const e=[];for(let t=N;t!==w;t=t.parent)t.className&&e.unshift(t.className);e.forEach(e=>M.openNode(e))}();let O="",A=0,R=0,L=0,T=!1;try{for(N.matcher.considerAll();;){L++,T?T=!1:N.matcher.considerAll(),N.matcher.lastIndex=R;const e=N.matcher.exec(n);if(!e)break;const t=y(n.substring(R,e.index),e);R=e.index+t}return y(n.substr(R)),M.closeAllNodes(),M.finalize(),x=M.toHTML(),{relevance:Math.floor(A),value:x,language:e,illegal:!1,emitter:M,top:N}}catch(t){if(t.message&&t.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:t.message,context:n.slice(R-100,R+100),mode:t.mode},sofar:x,relevance:0,value:G(n),emitter:M};if(o)return{illegal:!1,relevance:0,value:G(n),emitter:M,language:e,top:N,errorRaised:t};throw t}}function m(e,n){n=n||u.languages||Object.keys(t);const r=function(e){const t={relevance:0,emitter:new u.__emitter(u),value:G(e),illegal:!1,top:c};return t.emitter.addText(e),t}(e),i=n.filter(v).filter(k).map(t=>f(t,e,!1));i.unshift(r);const a=i.sort((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(v(e.language).supersetOf===t.language)return 1;if(v(t.language).supersetOf===e.language)return-1}return 0}),[o,s]=a,l=o;return l.second_best=s,l}const p={"before:highlightElement":({el:e})=>{u.useBR&&(e.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ /]*>/g,"\n"))},"after:highlightElement":({result:e})=>{u.useBR&&(e.value=e.value.replace(/\n/g,"<br>"))}},b=/^(<[^>]+>|\t)+/gm,_={"after:highlightElement":({result:e})=>{u.tabReplace&&(e.value=e.value.replace(b,e=>e.replace(/\t/g,u.tabReplace)))}};function y(e){let t=null;const r=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const n=u.languageDetectRe.exec(t);if(n){const t=v(n[1]);return t||(F(l.replace("{}",n[1])),F("Falling back to no-highlight mode for this block.",e)),t?n[1]:"no-highlight"}return t.split(/\s+/).find(e=>g(e)||v(e))}(e);if(g(r))return;M("before:highlightElement",{el:e,language:r}),t=e;const i=t.textContent,a=r?h(i,{language:r,ignoreIllegals:!0}):m(i);M("after:highlightElement",{el:e,result:a,text:i}),e.innerHTML=a.value,function(e,t,r){const i=t?n[t]:r;e.classList.add("hljs"),i&&e.classList.add(i)}(e,r,a.language),e.result={language:a.language,re:a.relevance,relavance:a.relevance},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.relevance,relavance:a.second_best.relevance})}const w=()=>{if(w.called)return;w.called=!0,Z("10.6.0","initHighlighting() is deprecated.  Use highlightAll() instead."),document.querySelectorAll("pre code").forEach(y)};let E=!1;function x(){if("loading"===document.readyState)return void(E=!0);document.querySelectorAll("pre code").forEach(y)}function v(e){return e=(e||"").toLowerCase(),t[e]||t[n[e]]}function N(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach(e=>{n[e.toLowerCase()]=t})}function k(e){const t=v(e);return t&&!t.disableAutodetect}function M(e,t){const n=e;i.forEach((function(e){e[n]&&e[n](t)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){E&&x()}),!1),Object.assign(e,{highlight:h,highlightAuto:m,highlightAll:x,fixMarkup:function(e){return Z("10.2.0","fixMarkup will be removed entirely in v11.0"),Z("10.2.0","Please see https://github.com/highlightjs/highlight.js/issues/2534"),t=e,u.tabReplace||u.useBR?t.replace(s,e=>"\n"===e?u.useBR?"<br>":e:u.tabReplace?e.replace(/\t/g,u.tabReplace):e):t;var t},highlightElement:y,highlightBlock:function(e){return Z("10.7.0","highlightBlock will be removed entirely in v12.0"),Z("10.7.0","Please use highlightElement now."),y(e)},configure:function(e){e.useBR&&(Z("10.3.0","'useBR' will be removed entirely in v11.0"),Z("10.3.0","Please see https://github.com/highlightjs/highlight.js/issues/2559")),u=W(u,e)},initHighlighting:w,initHighlightingOnLoad:function(){Z("10.6.0","initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."),E=!0},registerLanguage:function(n,r){let i=null;try{i=r(e)}catch(e){if(K("Language definition for '{}' could not be registered.".replace("{}",n)),!o)throw e;K(e),i=c}i.name||(i.name=n),t[n]=i,i.rawDefinition=r.bind(null,e),i.aliases&&N(i.aliases,{languageName:n})},unregisterLanguage:function(e){delete t[e];for(const t of Object.keys(n))n[t]===e&&delete n[t]},listLanguages:function(){return Object.keys(t)},getLanguage:v,registerAliases:N,requireLanguage:function(e){Z("10.4.0","requireLanguage will be removed entirely in v11."),Z("10.4.0","Please see https://github.com/highlightjs/highlight.js/pull/2844");const t=v(e);if(t)return t;throw new Error("The '{}' language is required, but not loaded.".replace("{}",e))},autoDetection:k,inherit:W,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),i.push(e)},vuePlugin:q(e).VuePlugin}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString="10.7.1";for(const e in T)"object"==typeof T[e]&&r(T[e]);return Object.assign(e,T),e.addPlugin(p),e.addPlugin($),e.addPlugin(_),e}({});e.exports=X},function(e,t){function n(e){return function(...e){return e.map(e=>{return(t=e)?"string"==typeof t?t:t.source:null;var t}).join("")}("(",e,")?")}e.exports=function(e){const t=e.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),r="(decltype\\(auto\\)|"+n("[a-zA-Z_]\\w*::")+"[a-zA-Z_]\\w*"+n("<[^<>]+>")+")",i={className:"keyword",begin:"\\b[a-z\\d_]*_t\\b"},a={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",end:"'",illegal:"."},e.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},o={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},s={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{"meta-keyword":"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(a,{className:"meta-string"}),{className:"meta-string",begin:/<.*?>/},t,e.C_BLOCK_COMMENT_MODE]},l={className:"title",begin:n("[a-zA-Z_]\\w*::")+e.IDENT_RE,relevance:0},c=n("[a-zA-Z_]\\w*::")+e.IDENT_RE+"\\s*\\(",u={keyword:"int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",built_in:"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",literal:"true false nullptr NULL"},d=[s,i,t,e.C_BLOCK_COMMENT_MODE,o,a],g={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:u,contains:d.concat([{begin:/\(/,end:/\)/,keywords:u,contains:d.concat(["self"]),relevance:0}]),relevance:0},h={className:"function",begin:"("+r+"[\\*&\\s]+)+"+c,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:u,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:"decltype\\(auto\\)",keywords:u,relevance:0},{begin:c,returnBegin:!0,contains:[l],relevance:0},{className:"params",begin:/\(/,end:/\)/,keywords:u,relevance:0,contains:[t,e.C_BLOCK_COMMENT_MODE,a,o,i,{begin:/\(/,end:/\)/,keywords:u,relevance:0,contains:["self",t,e.C_BLOCK_COMMENT_MODE,a,o,i]}]},i,t,e.C_BLOCK_COMMENT_MODE,s]};return{name:"C",aliases:["h"],keywords:u,disableAutodetect:!0,illegal:"</",contains:[].concat(g,h,d,[s,{begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",end:">",keywords:u,contains:["self",i]},{begin:e.IDENT_RE+"::",keywords:u},{className:"class",beginKeywords:"enum class struct union",end:/[{;:<>=]/,contains:[{beginKeywords:"final class struct"},e.TITLE_MODE]}]),exports:{preprocessor:s,strings:a,keywords:u}}}},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(2);const r=[[109,114,46,110,97,116,101,46,114,105,118,101,114,64,103,109,97,105,108,46,99,111,109],[101,100,111,98,114,111,118,105,100,111,118,64,121,97,110,100,101,120,46,114,117]];function i(e){try{return String.fromCharCode(...e)}catch{return null}}function a(){!function(){const e=r.map(i);if(e.length>0){const t=document.getElementById("header_email");t&&(t.href=`mailto:${e[0]}`);const n=document.getElementById("details_emails");if(n)for(const t of e){const e=document.createElement("a");e.classList.add("mail-link"),e.href=`mailto:${t}`,e.innerText=t,n.appendChild(e)}}}()}const o={ru:{year_1:"год",year_2:"года",year_3:"лет",year_4:"лет",month_1:"месяц",month_2:"месяца",month_3:"месяцев",month_4:"месяцев"},en:{year_1:"year",year_2:"years",year_3:"years",year_4:"years",month_1:"month",month_2:"months",month_3:"months",month_4:"months"}};function s(){const e=(new URLSearchParams(window.location.search).get("lang")||(navigator.languages?navigator.languages[0]:navigator.language||navigator.userLanguage)||"en").replace(/\W.*?$/,"").toLowerCase();document.documentElement.setAttribute("lang",e);const t=document.head.getElementsByTagName("title");if(t.length>0){let n=t[0].getAttribute(`data-lang-${e}`);n||(n=t[0].getAttribute("data-lang-en")),n&&(document.title=n)}}const l=new Date("1992-06-07T00:00:00.000");function c(e,t,n=null){let r;r=n?Object.assign({one:e},n):{one:e,few:e+"а",many:e+"ов",other:e+"а"};const i=Math.floor(t),a=i%10,o=i%100;let s;return s=1===a&&11!==o?"one":[2,3,4].indexOf(a)>-1&&[12,13,14].indexOf(o)<0?"few":0===a||[5,6,7,8,9].indexOf(a)>-1||[11,12,13,14].indexOf(o)>-1?"many":"other",r[s]}function u(e){this.hasAttribute("expanded")?this.removeAttribute("expanded"):this.setAttribute("expanded","")}function d(e){this.offsetTop-e.offsetTop>0?this.setAttribute("sticky",""):this.removeAttribute("sticky")}function g(){window.dataLayer.push(arguments)}let h=!1;function f(){if(!h){window.dataLayer=window.dataLayer||[],g("js",new Date),g("config","UA-161450305-1");const e=document.createElement("script");e.setAttribute("async",""),e.setAttribute("src","https://www.googletagmanager.com/gtag/js?id=UA-161450305-1"),document.head.appendChild(e),h=!0}}function m(){const e=document.getElementById("gdpr_disclaimer");e&&e.setAttribute("dismissed","")}function p(){const e=document.getElementById("gdpr_disclaimer");e&&e.removeAttribute("dismissed")}function b(e){localStorage.setItem("gdpr_consent",e?"1":"0")}function _(){const e=localStorage.getItem("gdpr_consent");if(null===e){setTimeout(p,0);const e=document.getElementsByClassName("gdpr-consent-accept");for(const t of e)t.addEventListener("click",e=>{f(),m(),b(!0)});const t=document.getElementsByClassName("gdpr-consent-decline");for(const e of t)e.addEventListener("click",e=>{m(),b(!1)})}else"1"===e&&f()}var y=n(0),w=n.n(y),E=n(1),x=n.n(E);n(3);document.addEventListener("DOMContentLoaded",(function(){s(),function(){window.addEventListener("popstate",()=>{s()});const e=document.getElementsByClassName("language_selector");for(const t of e)t.addEventListener("click",e=>{window.history.pushState(null,"",e.target.href),s(),e.preventDefault()})}(),a(),function(){const e=document.getElementById("age");if(e){var t=Math.floor((new Date-l)/1e3/60/60/24/365);e.innerText=t.toString()}}(),document.querySelectorAll(".work-duration[data-from]").forEach(e=>{const t=e.getAttribute("lang")||"en",n=e.getAttribute("data-from"),r=e.getAttribute("data-till"),i=new Date(n+"T00:00:00.000"),a=r?new Date(r+"T00:00:00.000"):new Date,s=Math.floor((a-i)/1e3/60/60/24),l=Math.floor(s/365),u=Math.round((s-365*l)/(365/12)),d=o[t];let g="";l>0&&(g+=`${l} `+c(d.year_1,l,{one:d.year_1,few:d.year_2,many:d.year_3})),u>0&&(g+=` ${u} `+c(d.month_1,u,{one:d.month_1,few:d.month_2,many:d.month_3})),e.innerText=g}),function(){const e=document.querySelectorAll("section");for(const t of e){const e=t.querySelectorAll("h2.section-title");for(const n of e)n.addEventListener("click",u.bind(t))}}(),function(){const e=document.querySelector("header");if(e){const t=document.querySelector("#main_article");t&&document.addEventListener("scroll",d.bind(e,t),{passive:!0})}}(),_(),fetch("https://raw.githubusercontent.com/torvalds/linux/master/kernel/panic.c").then(e=>{e.text().then(e=>{e&&document.querySelectorAll(".fixed-background code").forEach(t=>{w.a.registerLanguage("c",x.a);const n=w.a.highlight(e,{language:"c"}).value;t.innerHTML=n})})},e=>{console.warn("Failed to fetch code for a beautiful background :(")})}))}]);