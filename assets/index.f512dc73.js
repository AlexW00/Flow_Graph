var st=Object.defineProperty;var at=(n,t,e)=>t in n?st(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(at(n,typeof t!="symbol"?t+"":t,e),e);import{o as lt,c as ct,s as ht,d as U,z as ut,S as C,_ as z,A as T,a as _,T as dt}from"./vendor.1351731c.js";const pt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const h of s.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}};pt();class l{constructor(){r(this,"$root")}html(){var t;return(t=this.$root)!=null?t:this._render()}static cloneTemplate(t){const e=document.querySelector(`#${t}`);return e.classList.remove("hidden"),e}}const a={colorScale:lt(ct),particle:{travelTime:1e3,radius:7,fill:"#000",textColor:"white",colors:{plus:"#009900",minus:"#ff3300",divide:"#cc0000",multiply:"#336600"}},link:{strokeWidth:1,strokeColor:"#808080",arrow:{width:10,height:10}},node:{weightToRadiusCoefficient:.5,fillColor:"#0284C7"},website:{startInput:`"Photosynthesis"--(+10)-->"Energy"
"Photosynthesis"--(-3)-->"CO2"
"Photosynthesis"--(+3)-->"O2"
"Energy"---->"Growth"
"Growth"---->"Size"
"Size"---->"Photosynthesis"
        `,helpLink:"https://github.com/AlexW00/Flow_Graph"}};class N{constructor(t,e){r(this,"type");r(this,"data");this.type=t,this.data=e,Object.freeze(this)}}class b{constructor(){r(this,"listener",{});this.listener={}}addEventListener(t,e){this.listener[t]===void 0&&(this.listener[t]=[]),this.listener[t].push(e)}removeEventListener(t,e){if(this.listener[t]!==void 0){for(let i=0;i<this.listener[t].length;i++)if(this.listener[t][i]===e){this.listener[t].splice(i,1);return}}}notifyAll(t){if(this.listener[t.type]!==void 0)for(let e=0;e<this.listener[t.type].length;e++)this.listener[t.type][e](t)}clear(){this.listener={}}}const K=class extends b{constructor(t){super();r(this,"_value");this._value=t}get value(){return this._value}set value(t){this._value=t,this.notifyAll(new N(K.EVENT_DATA_CHANGED,t))}};let g=K;r(g,"EVENT_DATA_CHANGED","dataChanged");const y=new b;new b;const q=()=>{const n=new URL(window.location.href),t=n.searchParams.get("settings"),e={nodeColor:void 0,linkColor:void 0};if(!t)return e;try{const i=JSON.parse(t);e.nodeColor=i.nodeColor,e.linkColor=i.linkColor}catch(i){console.error(i)}return e};var X,Y;const R=class{static exportString(){const t={nodeColor:R.nodeColor.value,linkColor:R.linkColor.value};return JSON.stringify(t)}};let d=R;r(d,"nodeColor",new g((X=q().nodeColor)!=null?X:a.node.fillColor)),r(d,"linkColor",new g((Y=q().linkColor)!=null?Y:a.link.strokeColor));class gt extends l{constructor(){super(...arguments);r(this,"_nodeColorPickerController",t=>{t.value=d.nodeColor.value,t.addEventListener("change",e=>{const i=e.target.value;d.nodeColor.value=i})});r(this,"_linkColorPickerController",t=>{t.value=d.linkColor.value,t.addEventListener("change",e=>{const i=e.target.value;d.linkColor.value=i})});r(this,"_settingsButtonController",(t,e)=>{t.addEventListener("click",()=>i());function i(){e.classList.toggle("invisible")}return t})}_render(){return this.$root=l.cloneTemplate("settings-template"),this.$root.classList.remove("hidden"),this._nodeColorPickerController(this.$root.querySelector("#node_color")),this._linkColorPickerController(this.$root.querySelector("#link_color")),this._settingsButtonController(this.$root.querySelector("#settings_button"),this.$root.querySelector("#settings_container")),this.$root}}class J{constructor(t=[]){r(this,"relationships");this.relationships=t}addRelationship(t){this.relationships.push(t)}removeRelationshipById(t){this.relationships=this.relationships.filter(e=>e.id()!==t)}getRelationshipById(t){return this.relationships.find(e=>e.id()===t)}getNodeList(){return this.relationships.map(t=>t.getNodes()).reduce((t,e)=>t.concat(e),[])}getLinkList(){return this.relationships.map(t=>t.link)}getNodeConnections(){return this.relationships.map(t=>({source:t.source,target:t.target}))}}const m=class{static updateChargeForceStrength(){var t,e;(e=(t=m.simulation)==null?void 0:t.force("charge"))==null||e.strength(m.chargeForceStrength)}static chargeForceStrength(t){return-Math.pow(t.weightToRadius(),2)*.2}static create(t){return m.simulation||(m.simulation=t.forceSimulation().force("x",t.forceX().x(function(){return I.width/2})).force("y",t.forceY().y(function(){return I.height/2})).force("charge",t.forceManyBody().strength(this.chargeForceStrength))),m.simulation}};let c=m;r(c,"simulation",null),r(c,"TICK_EVENT","d3_tick"),r(c,"isActive",!1);class Z{constructor(t,e,i){r(this,"link");r(this,"source");r(this,"target");this.link=t,this.source=e,this.target=i}id(){return this.source.name+"-"+this.target.name}getNodes(){return[this.source,this.target]}getNodeConnection(){return{source:this.source,target:this.target}}}class Q{constructor(t,e){r(this,"linkDirection");r(this,"linkOptions");this.linkDirection=t,this.linkOptions=e}}class tt{constructor(t=new et,e=H.speed){r(this,"linkStrength");r(this,"linkSpeed");this.linkStrength=t,this.linkSpeed=rt(e)}}class et{constructor(t=H.strength,e=H.strengthType){r(this,"type");r(this,"strength");this.type=e,this.strength=rt(t)}}function rt(n){return typeof n==typeof String()?parseInt(n):n}function _t(n){switch(n){case"+":return 0;case"-":return 1;case"*":return 2;case"/":return 3;default:return 0}}function mt(n){switch(n){case 0:return"+";case 1:return"-";case 2:return"*";case 3:return"/";default:return"+"}}function ft(n){switch(n){case 0:return a.particle.colors.plus;case 1:return a.particle.colors.minus;case 2:return a.particle.colors.multiply;case 3:return a.particle.colors.divide;default:return"black"}}function Ct(n,t,e){switch(e){case 0:return n+t;case 1:return n-t;case 2:return n*t;case 3:return n/t;default:return n+t}}var O=(n=>(n.LEFT="LEFT",n.RIGHT="RIGHT",n.LEFT_RIGHT="LEFT_RIGHT",n))(O||{});let H={strength:5,strengthType:0,speed:1};function W(n){return{position:{x:n.x,y:n.y},radius:n.weightToRadius()}}function Tt(n,t){const e=nt(n.position,t.position),i=vt(e),o=n.radius/i,s=t.radius/i,h={x:n.position.x+e.x*o,y:n.position.y+e.y*o},u={x:t.position.x-e.x*s,y:t.position.y-e.y*s};return[h,u]}function vt(n){return Math.sqrt(Math.pow(n.x,2)+Math.pow(n.y,2))}function nt(n,t){return{x:t.x-n.x,y:t.y-n.y}}const V=class extends Q{constructor(t,e,i){super(e.linkDirection,e.linkOptions);r(this,"$selection");r(this,"$arrowHead");r(this,"nodeConnection");r(this,"path",{source:{x:0,y:0},target:{x:0,y:0}});r(this,"_onUpdateLinks",t=>{t.data.updatedNodeId===this.nodeConnection.target.id&&this.onTicked()});r(this,"onTicked",()=>{this._updatePath();try{this.$selection.attr("x1",t=>t.source.x).attr("y1",t=>t.source.y).attr("x2",t=>t.target.x).attr("y2",t=>t.target.y)}catch(t){console.trace(t),console.log(t,"SHIT")}});this.nodeConnection=i,this._append(t),y.addEventListener(c.TICK_EVENT,this.onTicked),y.addEventListener(V.UPDATE_LINKS_EVENT,this._onUpdateLinks),d.linkColor.addEventListener(g.EVENT_DATA_CHANGED,o=>this._changeColor(o.data))}_changeColor(t){this.$selection.style("stroke",t),this.$arrowHead.style("fill",t)}_append(t){this.$arrowHead=this._appendArrowHead(t),this.$selection=t.append("g").attr("class","links").selectAll("line").data([this.path]).enter().append("line").style("stroke",a.link.strokeColor).style("stroke-width",a.link.strokeWidth).attr("marker-end",()=>"url(#arrow)")}_appendArrowHead(t){return t.append("svg:defs").append("svg:marker").attr("id","arrow").attr("viewBox","0 -5 10 10").attr("refX",a.link.arrow.height).attr("markerWidth",a.link.arrow.width).attr("markerHeight",a.link.arrow.height).attr("orient","auto").style("fill",d.linkColor.value).append("svg:path").attr("d","M0,-5L10,0L0,5")}_updatePath(){const t=Tt(W(this.nodeConnection.source),W(this.nodeConnection.target));this.path.source=t[0],this.path.target=t[1]}};let G=V;r(G,"UPDATE_LINKS_EVENT","updateLinks");const w=class extends b{constructor(t,e){const i=w.findNodeById(w._generateId(t,e));if(i)return i;super();r(this,"name");r(this,"nodeType");r(this,"weight",100);this.name=t.replace(/['"]+/g,""),this.nodeType=e}id(){return w._generateId(this.name,this.nodeType)}static _generateId(t,e){return t+"-"+e}static findNodeById(t){return w.nodes.find(e=>e.id()===t)}};let L=w;r(L,"nodes",[]);var A=(n=>(n.TEXT_NODE="TEXT_NODE",n.REFERENCE_NODE="REFERENCE_NODE",n))(A||{});class Et{constructor(t,e){r(this,"$selection");r(this,"radius");this.radius=e,this.$selection=this._append(t),d.nodeColor.addEventListener(g.EVENT_DATA_CHANGED,i=>this._changeColor(i.data))}_changeColor(t){this.$selection.attr("fill",t)}updateRadius(t){this.radius=t,this.$selection.attr("r",this.radius)}_append(t){return t.append("circle").attr("r",this.radius).attr("fill",d.nodeColor.value)}}class yt{constructor(t,e){r(this,"$selection");r(this,"radius");this.radius=e,this.$selection=this._append(t)}updateTextSize(t){this.$selection.attr("font-size",this._calculateFontSizeFromRadius(t))}_calculateFontSizeFromRadius(t){return t/4}_append(t){return t.append("text").text(function(e){return e.name}).attr("font-size",this._calculateFontSizeFromRadius(this.radius)).attr("text-anchor","middle").attr("dy",".35em").attr("x",0).attr("y",0)}}const k=class{static create(t,e){const i=(h,u)=>{h.active||e.alphaTarget(.3).restart(),u.fx=u.x,u.fy=u.y},o=(h,u)=>{u.fx=h.x,u.fy=h.y},s=(h,u)=>{h.active||e.alphaTarget(0),u.fx=null,u.fy=null};return k.dragHandler=t.drag().on("start",i).on("drag",o).on("end",s),k.dragHandler}static applyDragHandler(t){k.dragHandler(t)}};let P=k;r(P,"dragHandler",null);const v=class extends L{constructor(t,e){const i=v.findNodeById(t.id());if(i)return i;super(t.name,t.nodeType);r(this,"$selection");r(this,"d3_Circle");r(this,"d3_Label");r(this,"index");r(this,"x");r(this,"y");r(this,"vx");r(this,"vy");r(this,"fx");r(this,"fy");r(this,"_append",t=>t.append("g").attr("class","nodes").selectAll("g").data([this]).enter().append("g").style("cursor","grab"));r(this,"onTicked",()=>{this.$selection.attr("transform",`translate(${this.x}, ${this.y})`)});this.$selection=this._append(e),this.d3_Circle=new Et(this.$selection,this.weightToRadius()),this.d3_Label=new yt(this.$selection,this.weightToRadius()),y.addEventListener(c.TICK_EVENT,this.onTicked),P.applyDragHandler(this.$selection),this.$selection.on("click",()=>this.notifyAll(new N(v.EMIT_PARTICLE_EVENT,this))),v.d3Nodes.push(this)}weightToRadius(){return this.weight*a.node.weightToRadiusCoefficient}updateWeight(t){this.weight=Ct(this.weight,t.strength,t.type),this.d3_Circle.updateRadius(this.weightToRadius()),this.d3_Label.updateTextSize(this.weightToRadius()),this.notifyAll(new N(v.EMIT_PARTICLE_EVENT,this)),c.updateChargeForceStrength()}static findNodeById(t){return v.d3Nodes.find(e=>e.id()===t)}};let E=v;r(E,"d3Nodes",[]),r(E,"EMIT_PARTICLE_EVENT","emitParticle");const $=class extends b{constructor(t){super();r(this,"d3Relationship");r(this,"$selection");r(this,"$circle");r(this,"$text");r(this,"id");r(this,"radius",a.particle.radius);r(this,"creationTime",new Date().getTime());r(this,"travelTime");r(this,"travelVector");r(this,"index");r(this,"x");r(this,"y");r(this,"vx");r(this,"vy");r(this,"fx");r(this,"fy");r(this,"_update",()=>{const t=this._calcProgress();t>=1&&this._destroy();const e=this._calcPosition(t,this.d3Relationship.d3Link);this._updatePosition(e.x,e.y)});this.d3Relationship=t,this.id=t.id()+"-"+this.creationTime,this.travelTime=this._calcTravelTime(),this._setInitialPosition(t.d3Link),this.$selection=this._append(t.$selection),this.$circle=this._appendCircle(this.$selection,t.link.linkOptions.linkStrength.type),this.$text=this._appendText(this.$selection,t.link.linkOptions.linkStrength.type),y.addEventListener(c.TICK_EVENT,this._update),$.particles.push(this)}_appendText(t,e){return t.append("text").text(()=>mt(e)).attr("dy",".35em").attr("text-anchor","middle").attr("font-size","10px").attr("fill",a.particle.textColor).attr("x",i=>i.x).attr("y",i=>i.y)}_appendCircle(t,e){return t.append("circle").attr("cx",i=>i.x).attr("cy",i=>i.y).attr("r",a.particle.radius).attr("fill",ft(e))}_append(t){return t.append("g").attr("class","particles").selectAll(".particles").data([this],e=>e.d3Relationship.id()).enter().append("g")}_calcTravelTime(){return a.particle.travelTime/this.d3Relationship.link.linkOptions.linkSpeed}_setInitialPosition(t){this.x=t.path.source.x,this.y=t.path.source.y}_calcProgress(){return(new Date().getTime()-this.creationTime)/this.travelTime}_updatePosition(t,e){this.x=t,this.y=e,this.$circle.transition().duration(0).attr("cx",this.x).attr("cy",this.y),this.$text.transition().duration(0).attr("x",this.x).attr("y",this.y)}_calcPosition(t,e){return this.travelVector=this._calcTravelVector(e),{x:e.path.source.x+this.travelVector.x*t,y:e.path.source.y+this.travelVector.y*t}}_calcTravelVector(t){return nt(t.path.source,t.path.target)}_destroy(){y.removeEventListener(c.TICK_EVENT,this._update),this._remove(),this.notifyAll(new N($.PARTICLE_DESTROYED_EVENT,this)),$.particles.splice($.particles.indexOf(this),1)}_remove(){this.$selection.remove()}};let x=$;r(x,"PARTICLE_DESTROYED_EVENT","particleDestroyed"),r(x,"PARTICLE_TICK_EVENT","particleTick"),r(x,"particles",[]);class xt extends Z{constructor(t,e){super(t.link,t.source,t.target);r(this,"$selection");r(this,"d3Source");r(this,"d3Target");r(this,"d3Link");r(this,"d3Particles",[]);this.$selection=this._append(e),this.d3Source=new E(this.source,this.$selection),this.d3Source.addEventListener(E.EMIT_PARTICLE_EVENT,()=>this._emitParticle()),this.d3Target=new E(this.target,this.$selection),this.d3Link=new G(this.$selection,this.link,this.getD3NodeConnection())}_emitParticle(){const t=new x(this);t.addEventListener(x.PARTICLE_DESTROYED_EVENT,()=>this._onParticleDestroyed()),this.d3Particles.push(t)}_onParticleDestroyed(){this._removeOldestParticle(),this.d3Target.updateWeight(this.link.linkOptions.linkStrength)}_removeOldestParticle(){this.d3Particles.shift()}_append(t){return t.append("g").attr("class","relationship").selectAll("g").data([this]).enter().append("g")}getD3Nodes(){return[this.d3Source,this.d3Target]}getD3NodeConnection(){return{source:this.d3Source,target:this.d3Target}}}const B=class extends J{constructor(t,e){super(t.relationships);r(this,"$svg");r(this,"d3_color",a.colorScale);r(this,"d3Simulation");r(this,"d3DragHandler");r(this,"d3Relationships");r(this,"$selection");r(this,"zoomed",t=>{this.$svg.attr("transform",()=>t.transform)});var s,h,u,F;this.$svg=ht(e),B.width=(h=(s=this.$svg.node())==null?void 0:s.getBoundingClientRect().width)!=null?h:0,B.height=(F=(u=this.$svg.node())==null?void 0:u.getBoundingClientRect().height)!=null?F:0,this.d3Simulation=c.create(U),this.d3DragHandler=P.create(U,this.d3Simulation),this.$selection=this._append(this.$svg),this.d3Relationships=this.relationships.map(S=>new xt(S,this.$selection));const i=this.d3Relationships.reduce((S,ot)=>[...S,...ot.getD3Nodes()],[]);c.simulation.nodes(i).on("tick",()=>{c.isActive=!0,y.notifyAll(new N(c.TICK_EVENT,{}))}),c.simulation.nodes(i).on("end",()=>{c.simulation.alphaTarget(.01).restart()});const o=ut().on("zoom",S=>this._onZoom(S));this.$svg.call(o).on("dblclick.zoom",null)}_onZoom(t){this.$selection.attr("transform",t.transform)}delete(){this.$svg.selectAll("*").remove(),c.simulation=null,P.dragHandler=null,y.clear(),E.d3Nodes=[],L.nodes=[]}_append(t){return t.append("g").attr("class","graph")}};let I=B;r(I,"width"),r(I,"height");const wt={whitespace:{regex:/([\s\r\n])/},text_node:{regex:/"[^"]+"/},reference_node:{regex:/\[\[[^\[^\]]+\]\]/},link_body:{regex:/--/},link_direction_left:{regex:/</},link_direction_right:{regex:/>/},link_options_start:{regex:/\(/},link_options_end:{regex:/\)/},link_option_delimiter:{regex:/,/},number:{regex:/[0-9]+/},math_operator:{regex:/[\+\-\/\*]/}},D=(n,t)=>{const e=new C("LINK"),i=_("LINK_OPTIONS",n,!0),o=[];return i&&o.push(i.getAttribute("val")),e.addAttribute(new T("val",o,(...s)=>new Q(t,s[0]?s[0].value():new tt))),e},M=(n,t)=>{const e=new C("NODE"),i=t===A.TEXT_NODE?_("text_node",n):_("reference_node",n);return e.addAttribute(new T("val",[i.getAttribute("lex")],(...o)=>new L(o[0].value(),t))),e},$t={GRAPH:{_:(...n)=>{const t=new C("GRAPH"),e=z("RELATIONSHIP",n).map(i=>i.getAttribute("val"));return t.addAttribute(new T("val",e,(...i)=>new J(i.map(o=>o.value())))),t}},RELATIONSHIP:{_:(...n)=>{const t=new C("RELATIONSHIP"),e=z("NODE",n),i=_("LINK",n);return t.addAttribute(new T("val",[i.getAttribute("val"),e[0].getAttribute("val"),e[1].getAttribute("val")],(...o)=>new Z(o[0].value(),o[1].value(),o[2].value()))),t}},NODE:{text_node:(...n)=>M(n,A.TEXT_NODE),reference_node:(...n)=>M(n,A.REFERENCE_NODE)},LINK:{right:(...n)=>D(n,O.RIGHT),left:(...n)=>D(n,O.LEFT),left_right:(...n)=>D(n,O.LEFT_RIGHT)},LINK_OPTIONS:{_:(...n)=>{const t=new C("LINK_OPTIONS"),e=_("LINK_OPTION_STRENGTH",n),i=_("LINK_OPTION_SPEED",n,!0),o=[];return o.push(e.getAttribute("val")),i&&o.push(i.getAttribute("val")),t.addAttribute(new T("val",o,(...s)=>new tt(s[0].value(),s.length>1?s[1].value():void 0))),t}},LINK_OPTION_STRENGTH:{_:(...n)=>{const t=new C("LINK_OPTION_STRENGTH"),e=_("math_operator",n),i=_("number",n);return t.addAttribute(new T("val",[e.getAttribute("lex"),i.getAttribute("lex")],(...o)=>new et(o[1].value(),_t(o[0].value())))),t}},LINK_OPTION_SPEED:{_:(...n)=>{const t=new C("LINK_OPTION_SPEED"),e=_("number",n);return t.addAttribute(new T("val",[e.getAttribute("lex")],(...i)=>i[0].value())),t}}},It={GRAPH:{_:["RELATIONSHIP+"]},RELATIONSHIP:{_:["NODE","LINK","NODE"]},NODE:{text_node:["text_node"],reference_node:["reference_node"]},LINK:{right:["link_body","LINK_OPTIONS?","link_body","link_direction_right"],left:["link_direction_left","link_body","LINK_OPTIONS?","link_body"],left_right:["link_direction_left","link_body","LINK_OPTIONS?","link_body","link_direction_right"]},LINK_OPTIONS:{_:["link_options_start","LINK_OPTION_STRENGTH","LINK_OPTION_SPEED?","link_options_end"]},LINK_OPTION_STRENGTH:{_:["math_operator","number"]},LINK_OPTION_SPEED:{_:["link_option_delimiter","number"]}},Nt={lexicalRuleset:wt,semanticRuleset:$t,syntaxRuleset:It},St={startSymbol:"GRAPH",ignoreTokensNamed:["whitespace"]};class p{}r(p,"compiler",new dt(Nt,St)),r(p,"graph",new g(null));const kt=()=>new URL(window.location.href).searchParams.get("input");var j;class f{}r(f,"inputString",new g((j=kt())!=null?j:a.website.startInput));class Lt extends l{constructor(){super();r(this,"d3Graph");p.graph.addEventListener(g.EVENT_DATA_CHANGED,()=>this._renderGraph()),this._tryCompileGraph()}_render(){return this.$root=l.cloneTemplate("svg-template"),this.$root}_tryCompileGraph(){try{const t=f.inputString.value,e=p.compiler.compile(t);p.graph.value=e}catch(t){console.log(t)}}_renderGraph(){this.d3Graph!==void 0&&this.d3Graph.delete(),p.graph.value!==void 0&&(this.d3Graph=new I(p.graph.value,this.$root))}}class it extends l{constructor(t){super();r(this,"settingsComponent");r(this,"svgComponent");r(this,"isIframe");this.isIframe=t,this.settingsComponent=new gt,this.svgComponent=new Lt}_render(){return this.$root=l.cloneTemplate("preview-template"),this.$root.classList.add(...this._getSizeClasses(this.isIframe)),this.$root.appendChild(this.settingsComponent.html()),this.$root.appendChild(this.svgComponent.html()),this.$root}_getSizeClasses(t){return t?["w-full","h-full"]:["w-3/4","right-0","m-1"]}}class Pt extends l{constructor(){super();r(this,"previewComponent");this.previewComponent=new it(!0)}_render(){return this.$root=document.createElement("div"),this.$root.classList.add("w-screen","h-screen"),this.$root.appendChild(this.previewComponent.html()),this.$root}}class bt extends l{constructor(t){super();r(this,"$shareButton");r(this,"$sharePopupUrlInput");r(this,"$sharePopupIframeInput");r(this,"toggle",()=>{this._positionSharePopup(),this.$root.classList.toggle("invisible")||this._setExportTexts()});this.$shareButton=t}_render(){return this.$root=l.cloneTemplate("share-popup-template"),this.$sharePopupUrlInput=document.querySelector("#export_url_field"),this.$sharePopupIframeInput=document.querySelector("#export_iframe_field"),this._sharePopupCopyUrlButtonController(document.querySelector("#export_url_copy_button")),this._sharePopupCopyIframeController(document.querySelector("#export_iframe_copy_button")),this.$root}_setExportTexts(){this._setExportUrl(),this._setExportIframe()}_getWindowUrl(){return window.location.origin+window.location.pathname}_setExportUrl(){const t=`${this._getWindowUrl()}?input=${encodeURIComponent(f.inputString.value)}&settings=${encodeURIComponent(d.exportString())}`;this.$sharePopupUrlInput.value=t}_setExportIframe(){const t=`${this._getWindowUrl()}?input=${encodeURIComponent(f.inputString.value)}&settings=${encodeURIComponent(d.exportString())}&iframe=true`;this.$sharePopupIframeInput.value=`<iframe src="${t}" width="500px" height="500px" frameborder="0"></iframe>`}_positionSharePopup(){const{left:t,top:e}=this.$shareButton.getBoundingClientRect(),i=this.$shareButton.offsetWidth,o=this.$root.offsetHeight,s=this.$root.offsetWidth;this.$root.style.left=`${t-s/2+i/2}px`,this.$root.style.top=`${e-o-10}px`}_sharePopupCopyIframeController(t){t.addEventListener("click",()=>{const e=this.$sharePopupIframeInput.value;navigator.clipboard.writeText(e),this.closeSharePopup()})}_sharePopupCopyUrlButtonController(t){t.addEventListener("click",()=>{const e=this.$sharePopupUrlInput.value;navigator.clipboard.writeText(e),this.closeSharePopup()})}closeSharePopup(){this.$root.classList.add("invisible")}}class Ot extends l{constructor(){super(...arguments);r(this,"sharePopupComponent")}_render(){var t;return this.$root=l.cloneTemplate("share-button-template"),this.sharePopupComponent=new bt(this.$root),(t=this.$root.parentElement)==null||t.appendChild(this.sharePopupComponent.html()),this.shareButtonController(this.$root),this.$root}shareButtonController(t){t.addEventListener("click",()=>{var e;(e=this.sharePopupComponent)==null||e.toggle()})}}class At extends l{constructor(){super();r(this,"$renderButton");r(this,"$errorBox");r(this,"$errorMessage");r(this,"$shareButton");r(this,"shareButtonComponent");r(this,"_helpButtonController",t=>{t.addEventListener("click",()=>{window.open(a.website.helpLink)})});r(this,"_inputController",t=>{t.addEventListener("input",e=>this._onInput(e.target.value)),t.value=f.inputString.value,this._onInput(t.value)});this.shareButtonComponent=new Ot}_render(){var t;return this.$root=l.cloneTemplate("inputSidebar-template"),this.$renderButton=this.$root.querySelector("#submit_button"),this.$errorBox=this.$root.querySelector("#error_box"),this.$errorMessage=this.$root.querySelector("#error_message"),this._helpButtonController(this.$root.querySelector("#help_button")),this.$renderButton.addEventListener("click",()=>{const e=f.inputString.value;p.graph.value=p.compiler.compile(e)}),this.$shareButton=this.shareButtonComponent.html(),(t=this.$root.querySelector("#input-button-bar"))==null||t.appendChild(this.$shareButton),this._inputController(this.$root.querySelector("#input")),this.$root}_onInput(t){f.inputString.value=t;try{p.compiler.compile(f.inputString.value),this._toggleErrorBox(!1,null),this._toggleBlueButton(!0,this.$renderButton),this._toggleBlueButton(!0,this.$shareButton)}catch(e){this._toggleErrorBox(!0,e.message),this._toggleBlueButton(!1,this.$renderButton),this._toggleBlueButton(!1,this.$shareButton)}}_toggleErrorBox(t,e){e&&(this.$errorMessage.innerText=e),this.$errorBox.classList.toggle("hidden",!t)}_toggleBlueButton(t,e){const i=["bg-gray-500","hover:bg-gray-400","border-gray-700","hover:border-gray-500"],o=["bg-blue-500","hover:bg-blue-400","border-blue-700","hover:border-blue-500"];e.disabled=!t,t?(e.classList.remove(...i),e.classList.add(...o)):(e.classList.remove(...o),e.classList.add(...i))}}class Rt extends l{constructor(){super();r(this,"previewComponent");r(this,"inputSidebarComponent");this.inputSidebarComponent=new At,this.previewComponent=new it(!1)}_render(){return this.$root=l.cloneTemplate("content-template"),this.$root.appendChild(this.inputSidebarComponent.html()),this.$root.appendChild(this.previewComponent.html()),this.$root}}class Bt extends l{_render(){return this.$root=l.cloneTemplate("navbar-template"),this.$root}}class Dt extends l{constructor(){super();r(this,"navbarComponent");r(this,"contentComponent");this.navbarComponent=new Bt,this.contentComponent=new Rt}_render(){return this.$root=document.createElement("div"),this.$root.appendChild(this.navbarComponent.html()),this.$root.appendChild(this.contentComponent.html()),this.$root}}const Ht=new URL(window.location.href),Gt=Ht.searchParams.get("iframe")==="true",Kt=Gt?new Pt:new Dt;document.body.appendChild(Kt.html());p.graph.notifyAll(new N(g.EVENT_DATA_CHANGED,{}));