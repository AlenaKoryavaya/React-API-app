(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[8],{218:function(e,t,c){},231:function(e,t,c){"use strict";c.r(t);var n=c(44),r=c(97),a=c(35),i=c(4),s=c(0),o=c(6),u=c(36),j=c(10),b=c(30),l=(c(218),c(2)),m=function(e,t,c){switch(e){case"waiting":return Object(l.jsx)(j.a,{});case"loading":return c?Object(l.jsx)(t,{}):Object(l.jsx)(j.a,{});case"confirmed":return Object(l.jsx)(t,{});case"error":return Object(l.jsx)(b.a,{});default:throw new Error("Unexpected process state")}},d=function(){var e=Object(s.useState)([]),t=Object(i.a)(e,2),c=t[0],n=t[1],r=Object(s.useState)(!1),j=Object(i.a)(r,2),b=j[0],d=j[1],O=Object(s.useState)(200),f=Object(i.a)(O,2),h=f[0],x=f[1],p=Object(s.useState)(!1),v=Object(i.a)(p,2),_=v[0],g=v[1],y=Object(u.a)(),w=y.process,N=y.setProcess,S=y.clearError,k=y.getAllComics;Object(s.useEffect)((function(){A(h,!0)}),[]);var A=function(e,t){S(),d(!t),k(e).then(E).then((function(){return N("confirmed")}))},E=function(e){var t=e.length<8;n((function(t){return[].concat(Object(a.a)(t),Object(a.a)(e))})),d(!1),x((function(e){return e+8})),g(t)};return Object(l.jsxs)("div",{className:"comics__list",children:[m(w,(function(){return function(e){var t=e.map((function(e){var t=e.id,c=e.name,n=e.price,r=e.thumbnail;return Object(l.jsx)("li",{className:"comics__item",title:"More details",children:Object(l.jsxs)(o.b,{to:"/comics/".concat(t),children:[Object(l.jsx)("img",{src:r,alt:"ultimate war",className:"comics__item-img"}),Object(l.jsx)("div",{className:"comics__item-name",children:c}),Object(l.jsx)("div",{className:"comics__item-price",children:n})]})},t)}));return Object(l.jsx)("ul",{className:"comics__grid",children:t})}(c)}),b),Object(l.jsx)("button",{className:"button button__main button__long",disabled:b,style:{display:_?"none":"block"},onClick:function(){return A(h)},children:Object(l.jsx)("div",{className:"inner",children:"load more"})})]})};t.default=function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)(n.a,{children:[Object(l.jsx)("meta",{name:"description",content:"\u0421omics main page"}),Object(l.jsx)("title",{children:"Comics page"})]}),Object(l.jsx)(r.a,{}),Object(l.jsx)(d,{})]})}},35:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var n=c(8);var r=c(7);function a(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=8.c51fed5d.chunk.js.map