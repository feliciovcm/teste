(this["webpackJsonpaxios-training"]=this["webpackJsonpaxios-training"]||[]).push([[0],{201:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(72),c=a.n(s),o=a(6),r=a(12),l=a(3),d=a(1);function b(){return Object(d.jsxs)("div",{className:"messageContainer",children:[Object(d.jsx)("img",{src:"images/smiling.svg",alt:"emoji"}),Object(d.jsx)("div",{className:"bubble bubble-bottom-left",children:"Ol\xe1, eu sou Chatnilson, tudo bem? Para come\xe7armos, preciso saber seu nome."})]})}function u(e){return Object(d.jsxs)("div",{className:"messageContainer",children:[Object(d.jsx)("img",{src:"images/happy.svg",alt:"emoji"}),Object(d.jsxs)("div",{className:"bubble bubble-bottom-left",children:["Que satisfa\xe7\xe3o, ",e.personName,". Agora que sei seu nome, qual a cidade e estado que voc\xea mora?"]})]})}function m(){return Object(d.jsxs)("div",{className:"messageContainer",children:[Object(d.jsx)("img",{src:"images/grinning.svg",alt:"emoji"}),Object(d.jsx)("div",{className:"bubble bubble-bottom-left",children:"Legal, agora que sabemos sua cidade e estado. Quando foi que voc\xea nasceu?"})]})}function j(){return Object(d.jsxs)("div",{className:"messageContainer",children:[Object(d.jsx)("img",{src:"images/happier.svg",alt:"emoji"}),Object(d.jsx)("div",{className:"bubble bubble-bottom-left",children:"Agora me fala teu email, por gentileza."})]})}function p(){return Object(d.jsxs)("div",{className:"messageContainer",children:[Object(d.jsx)("img",{src:"images/party.svg",alt:"emoji"}),Object(d.jsx)("div",{className:"bubble bubble-bottom-left",children:"Voc\xea finalizou. Fa\xe7a uma valia\xe7\xe3o:"})]})}var f=a(5),v=a(29),h=a.n(v);function g(){var e=document.getElementById("uf"),t=document.getElementById("city");h.a.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then((function(e){return e.data})).catch((function(e){console.log(e)})).then((function(a){a.map((function(t){var a=document.createElement("option");return a.setAttribute("value",t.sigla),a.textContent=t.sigla,e.appendChild(a),""})),e.addEventListener("change",(function(){var n=t.childNodes;Object(f.a)(n).map((function(e){return e.remove()}));var i=e.options[e.selectedIndex].value;if(i){var s=a.filter((function(e){return e.sigla===i}));h.a.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/".concat(s[0].id,"/municipios")).then((function(e){return e.data})).catch((function(e){console.log(e)})).then((function(e){t.removeAttribute("disabled"),e.map((function(e){var a=document.createElement("option");return a.textContent=e.nome,t.appendChild(a),""}))}))}}))}))}function x(e){var t=e.fill,a=void 0===t?"none":t;return Object(d.jsx)("svg",{className:"star",xmlns:"http://www.w3.org/2000/svg",height:"511pt",viewBox:"0 -10 511.98685 511",width:"511pt",children:Object(d.jsx)("path",{d:"m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0",fill:a})})}function O(e){var t=e.index,a=e.rating,n=e.hoverRating,s=e.onMouseEnter,c=e.onMouseLeave,o=e.onSaveRating,r=i.a.useMemo((function(){return n>=t||!n&&a>=t?"yellow":"lightgrey"}),[a,n,t]);return Object(d.jsx)("div",{className:"cursor-pointer",onMouseEnter:function(){return s(t)},onMouseLeave:function(){return c()},onClick:function(){return o(t)},children:Object(d.jsx)(x,{fill:r})})}function N(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],i=t[1],s=Object(n.useState)(!1),c=Object(o.a)(s,2),f=c[0],v=c[1],x=Object(n.useState)(!1),N=Object(o.a)(x,2),y=N[0],C=N[1],k=Object(n.useState)(!1),E=Object(o.a)(k,2),w=E[0],S=E[1];function q(){i(!0)}function D(){v(!0)}function M(){C(!0)}function F(){S(!0)}Object(n.useEffect)((function(){document.addEventListener("keydown",(function(e){"Enter"===e.key&&"Nome e sobrenome"===e.target.placeholder&&e.target.value.length>=8&&!a?q():"Enter"===e.key&&"city"===e.target.name&&e.target.value.length>=3?D():"Enter"===e.key&&"INPUT"===e.target.nodeName&&"date"===e.target.type&&e.target.value?M():"Enter"===e.key&&"INPUT"===e.target.nodeName&&"email"===e.target.type&&e.target.value&&F()}))}),[a,w,y,f]);var I=[{id:1},{id:2},{id:3},{id:4},{id:5}],L=Object(n.useState)(0),B=Object(o.a)(L,2),R=B[0],A=B[1],P=Object(n.useState)(0),U=Object(o.a)(P,2),z=U[0],T=U[1],J=function(e){T(e)},Q=function(){T(0)},V=function(e){A(e)};Object(n.useEffect)(g);var H=r.c().shape({name:r.d().min(8,"Deve ter no m\xednimo 8 caracteres").required("Nome do usuario \xe9 necess\xe1rio"),uf:r.d().required("Necess\xe1rio"),city:r.d().required("Necess\xe1rio"),bornDate:r.a().required("Necess\xe1rio"),email:r.d().email("Email inv\xe1lido").required("Necess\xe1rio"),rating:r.b().min(1,"Por favor, deixe uma avalia\xe7\xe3o!").required("Necess\xe1rio")});return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("header",{children:Object(d.jsx)("img",{src:"https://workalove.com/wp-content/uploads/2021/02/capa-workalove-ok.webp",alt:"workalove"})}),Object(d.jsx)("section",{children:Object(d.jsx)(l.d,{initialValues:{name:"",uf:"",city:"",bornDate:"",email:"",rating:0},validationSchema:H,onSubmit:function(e,t){var a=t.setSubmitting;a(!0),function(e){h.a.post("https://60415a34f34cf600173c9cf5.mockapi.io/api/vitorfelicio/users",e).then((function(e){console.log(e.data)})).catch((function(e){console.log(e),alert("Ops, ocorrou algum problema, tente novamente!")})).then((function(){document.getElementById("root").innerHTML="<header><img src='https://workalove.com/wp-content/uploads/2021/02/capa-workalove-ok.webp' alt='workalove' /></header><h1> Muito obrigado pela sua participa\xe7\xe3o <img src='images/smiling.svg' alt='emoji' /></h1>"}))}(e),a(!1)},children:function(e){var t=e.values,n=e.isSubmitting,i=e.errors,s=e.touched;return Object(d.jsxs)(l.c,{children:[Object(d.jsx)(b,{}),Object(d.jsx)("div",{className:"inputContainer",children:Object(d.jsxs)("div",{className:"bubble bubble-bottom-right",children:[Object(d.jsx)(l.b,{"data-testid":"form-fieldName",placeholder:"Nome e sobrenome",type:"input",name:"name",className:"inputComponent ".concat(i.name&&s.name&&"errorField")}),Object(d.jsx)("button",{"data-testid":"form-btnName",type:"button",onClick:!i.name&&t.name?q:null,children:Object(d.jsx)("i",{className:"fas fa-play fa-2x"})}),Object(d.jsxs)("div",{className:"error",children:[" ",Object(d.jsx)(l.a,{name:"name"})]})]})}),Object(d.jsxs)("div",{className:"stepContainer","data-testid":"form-nextStepCity",style:a?{opacity:1}:null,children:[Object(d.jsx)(u,{personName:t.name}),Object(d.jsx)("div",{className:"inputContainer",children:Object(d.jsxs)("div",{className:"bubble bubble-bottom-right",children:[Object(d.jsx)(l.b,{"data-testid":"form-fieldUf",id:"uf",as:"select",name:"uf",className:"inputComponent ".concat(i.uf&&s.uf&&"errorField"),children:Object(d.jsx)("option",{value:"",children:"UF"})}),Object(d.jsx)(l.b,{"data-testid":"form-fieldCity",disabled:!0,id:"city",as:"select",name:"city",className:"inputComponent ".concat(i.city&&s.city&&"errorField"),children:Object(d.jsx)("option",{value:"",children:"Cidade"})}),Object(d.jsx)("button",{"data-testid":"form-btnCity",type:"button",onClick:!i.uf&&t.uf?D:null,children:Object(d.jsx)("i",{className:"fas fa-play fa-2x"})}),Object(d.jsxs)("div",{className:"error",children:[" ",Object(d.jsx)(l.a,{name:"uf"})]})]})})]}),Object(d.jsxs)("div",{className:"stepContainer","data-testid":"form-nextStepBorn",style:f?{opacity:1}:null,children:[Object(d.jsx)(m,{}),Object(d.jsx)("div",{className:"inputContainer",children:Object(d.jsxs)("div",{className:"bubble bubble-bottom-right",children:[Object(d.jsx)(l.b,{"data-testid":"form-fieldDate",placeholder:"00/00/0000",type:"date",name:"bornDate",className:"inputComponent ".concat(i.bornDate&&s.bornDate&&"errorField")}),Object(d.jsx)("button",{"data-testid":"form-btnDate",type:"button",onClick:!i.bornDate&&t.bornDate?M:null,children:Object(d.jsx)("i",{className:"fas fa-play fa-2x"})}),Object(d.jsxs)("div",{className:"error",children:[" ",Object(d.jsx)(l.a,{name:"bornDate"})]})]})})]}),Object(d.jsxs)("div",{className:"stepContainer","data-testid":"form-nextStepEmail",style:y?{opacity:1}:null,children:[Object(d.jsx)(j,{}),Object(d.jsx)("div",{className:"inputContainer",children:Object(d.jsxs)("div",{className:"bubble bubble-bottom-right",children:[Object(d.jsx)(l.b,{"data-testid":"form-fieldEmail",placeholder:"email",type:"email",name:"email",className:"inputComponent ".concat(i.email&&s.email&&"errorField")}),Object(d.jsx)("button",{"data-testid":"form-btnEmail",type:"button",onClick:!i.email&&t.email?F:null,children:Object(d.jsx)("i",{className:"fas fa-play fa-2x"})}),Object(d.jsxs)("div",{className:"error",children:[" ",Object(d.jsx)(l.a,{name:"email"})]})]})})]}),Object(d.jsxs)("div",{className:"stepContainer","data-testid":"form-nextStepRating",style:w?{opacity:1}:null,children:[Object(d.jsx)(p,{}),Object(d.jsxs)("div",{className:"inputContainer",children:[Object(d.jsxs)("div",{className:"bubble bubble-bottom-right",children:[I.map((function(e){return Object(d.jsx)(O,{index:e.id,rating:R,hoverRating:z,onMouseEnter:J,onMouseLeave:Q,onSaveRating:V},e.id)})),Object(d.jsxs)("div",{className:"error",children:[" ",Object(d.jsx)(l.a,{name:"rating"})]})]}),Object(d.jsx)(l.b,{type:"input",name:"rating",value:t.rating=R,style:{display:"none"}})]}),w&&Object(d.jsx)("button",{disabled:n,type:"submit",children:"Salvar"})]})]})}})})]})}c.a.render(Object(d.jsx)(N,{}),document.getElementById("root"))}},[[201,1,2]]]);
//# sourceMappingURL=main.6d1fa623.chunk.js.map