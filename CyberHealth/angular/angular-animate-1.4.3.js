!function(n,t,e){"use strict";function a(n,t,e){if(!n)throw ngMinErr("areq","Argument '{0}' is {1}",t||"?",e||"required");return n}function r(n,t){return n||t?n?t?(E(n)&&(n=n.join(" ")),E(t)&&(t=t.join(" ")),n+" "+t):n:t:""}function i(n){var t={};return n&&(n.to||n.from)&&(t.to=n.to,t.from=n.from),t}function o(n,t,e){var a="";return n=E(n)?n:n&&N(n)&&n.length?n.split(/\s+/):[],q(n,function(n,r){n&&n.length>0&&(a+=r>0?" ":"",a+=e?t+n:n+t)}),a}function s(n,t){var e=n.indexOf(t);t>=0&&n.splice(e,1)}function u(n){if(n instanceof R)switch(n.length){case 0:return[];case 1:if(n[0].nodeType===K)return n;break;default:return R(l(n))}return n.nodeType===K?R(n):void 0}function l(n){if(!n[0])return n;for(var t=0;t<n.length;t++){var e=n[t];if(e.nodeType==K)return e}}function c(n,t,e){q(t,function(t){n.addClass(t,e)})}function f(n,t,e){q(t,function(t){n.removeClass(t,e)})}function m(n){return function(t,e){e.addClass&&(c(n,t,e.addClass),e.addClass=null),e.removeClass&&(f(n,t,e.removeClass),e.removeClass=null)}}function v(n){if(n=n||{},!n.$$prepared){var t=n.domOperation||M;n.domOperation=function(){n.$$domOperationFired=!0,t(),t=M},n.$$prepared=!0}return n}function d(n,t){p(n,t),h(n,t)}function p(n,t){t.from&&(n.css(t.from),t.from=null)}function h(n,t){t.to&&(n.css(t.to),t.to=null)}function g(n,t,e){var a=(t.addClass||"")+" "+(e.addClass||""),r=(t.removeClass||"")+" "+(e.removeClass||""),i=$(n.attr("class"),a,r);return _(t,e),i.addClass?t.addClass=i.addClass:t.addClass=null,i.removeClass?t.removeClass=i.removeClass:t.removeClass=null,t}function $(n,t,e){function a(n){N(n)&&(n=n.split(" "));var t={};return q(n,function(n){n.length&&(t[n]=!0)}),t}var r=1,i=-1,o={};n=a(n),t=a(t),q(t,function(n,t){o[t]=r}),e=a(e),q(e,function(n,t){o[t]=o[t]===r?null:i});var s={addClass:"",removeClass:""};return q(o,function(t,e){var a,o;t===r?(a="addClass",o=!n[e]):t===i&&(a="removeClass",o=n[e]),o&&(s[a].length&&(s[a]+=" "),s[a]+=e)}),s}function C(n){return n instanceof t.element?n[0]:n}function y(n,t,e){var a=Object.create(null),r=n.getComputedStyle(t)||{};return q(e,function(n,t){var e=r[n];if(e){var i=e.charAt(0);("-"===i||"+"===i||i>=0)&&(e=D(e)),0===e&&(e=null),a[t]=e}}),a}function D(n){var t=0,e=n.split(/\s*,\s*/);return q(e,function(n){"s"==n.charAt(n.length-1)&&(n=n.substring(0,n.length-1)),n=parseFloat(n)||0,t=t?Math.max(n,t):n}),t}function A(n){return 0===n||null!=n}function b(n,t){var e=F,a=n+"s";return t?e+=X:a+=" linear all",[e,a]}function k(n){return[ln,n+"s"]}function w(n,t){var e=t?un:cn;return[e,n+"s"]}function T(n,t){var e=t?"-"+t+"s":"";return x(n,[cn,e]),[cn,e]}function S(n,t){var e=t?"paused":"",a=I+en;return x(n,[a,e]),[a,e]}function x(n,t){var e=t[0],a=t[1];n.style[e]=a}function j(){var n=Object.create(null);return{flush:function(){n=Object.create(null)},count:function(t){var e=n[t];return e?e.total:0},get:function(t){var e=n[t];return e&&e.value},put:function(t,e){n[t]?n[t].total++:n[t]={total:1,value:e}}}}var F,O,I,P,M=t.noop,_=t.extend,R=t.element,q=t.forEach,E=t.isArray,N=t.isString,L=t.isObject,H=t.isUndefined,B=t.isDefined,J=t.isFunction,U=t.isElement,K=1,Q="ng-animate",W="$$ngAnimateChildren",z=["$$rAF",function(n){function t(n){i.push([].concat(n)),e()}function e(){if(i.length){for(var t=[],o=0;o<i.length;o++){var s=i[o];a(s),s.length&&t.push(s)}i=t,r||n(function(){r||e()})}}function a(n){var t=n.shift();t()}var r,i=[];return t.waitUntilQuiet=function(t){r&&r(),r=n(function(){r=null,t(),e()})},t}],G=[function(){return function(n,e,a){var r=a.ngAnimateChildren;t.isString(r)&&0===r.length?e.data(W,!0):a.$observe("ngAnimateChildren",function(n){n="on"===n||"true"===n,e.data(W,n)})}}],V="";n.ontransitionend===e&&n.onwebkittransitionend!==e?(V="-webkit-",F="WebkitTransition",O="webkitTransitionEnd transitionend"):(F="transition",O="transitionend"),n.onanimationend===e&&n.onwebkitanimationend!==e?(V="-webkit-",I="WebkitAnimation",P="webkitAnimationEnd animationend"):(I="animation",P="animationend");var X="Duration",Y="Property",Z="Delay",nn="TimingFunction",tn="IterationCount",en="PlayState",an=3,rn=1.5,on=1e3,sn=9999,un=I+Z,ln=I+X,cn=F+Z,fn=F+X,mn={transitionDuration:fn,transitionDelay:cn,transitionProperty:F+Y,animationDuration:ln,animationDelay:un,animationIterationCount:I+tn},vn={transitionDuration:fn,transitionDelay:cn,animationDuration:ln,animationDelay:un},dn=["$animateProvider",function(){var n=j(),t=j();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$document","$sniffer","$$rAFScheduler",function(e,a,r,u,l,c,f){function g(n,t){var e="$$ngAnimateParentKey",a=n.parentNode,r=a[e]||(a[e]=++N);return r+"-"+n.getAttribute("class")+"-"+t}function $(t,a,r,i){var o=n.get(r);return o||(o=y(e,t,i),"infinite"===o.animationIterationCount&&(o.animationIterationCount=1)),n.put(r,o),o}function D(r,i,s,u){var l;if(n.count(s)>0&&(l=t.get(s),!l)){var c=o(i,"-stagger");a.addClass(r,c),l=y(e,r,u),l.animationDuration=Math.max(l.animationDuration,0),l.transitionDuration=Math.max(l.transitionDuration,0),a.removeClass(r,c),t.put(s,l)}return l||{}}function j(e){H.push(e),f.waitUntilQuiet(function(){n.flush(),t.flush();for(var e=L.offsetWidth+1,a=0;a<H.length;a++)H[a](e);H.length=0})}function M(n,t,e){var a=$(n,t,e,mn),r=a.animationDelay,i=a.transitionDelay;return a.maxDelay=r&&i?Math.max(r,i):r||i,a.maxDuration=Math.max(a.animationDuration*a.animationIterationCount,a.transitionDuration),a}function _(t,e){function l(){m()}function f(){m(!0)}function m(n){L||B&&H||(L=!0,H=!1,a.removeClass(t,ln),a.removeClass(t,fn),S(N,!1),T(N,!1),q(G,function(n){N.style[n[0]]=""}),R(t,e),d(t,e),e.onDone&&e.onDone(),J&&J.complete(!n))}function $(n){Tn.blockTransition&&T(N,n),Tn.blockKeyframeAnimation&&S(N,!!n)}function y(){return J=new r({end:l,cancel:f}),m(),{$$willAnimate:!1,start:function(){return J},end:l}}function _(){function n(){if(!L){if($(!1),q(G,function(n){var t=n[0],e=n[1];N.style[t]=e}),R(t,e),a.addClass(t,fn),Tn.recalculateTimingStyles){if(cn=N.className+" "+ln,pn=g(N,cn),kn=M(N,cn,pn),wn=kn.maxDelay,K=Math.max(wn,0),W=kn.maxDuration,0===W)return void m();Tn.hasTransitions=kn.transitionDuration>0,Tn.hasAnimations=kn.animationDuration>0}if(Tn.applyTransitionDelay||Tn.applyAnimationDelay){wn="boolean"!=typeof e.delay&&A(e.delay)?parseFloat(e.delay):wn,K=Math.max(wn,0);var n;Tn.applyTransitionDelay&&(kn.transitionDelay=wn,n=w(wn),G.push(n),N.style[n[0]]=n[1]),Tn.applyAnimationDelay&&(kn.animationDelay=wn,n=w(wn,!0),G.push(n),N.style[n[0]]=n[1])}if(Q=K*on,z=W*on,e.easing){var s,c=e.easing;Tn.hasTransitions&&(s=F+nn,G.push([s,c]),N.style[s]=c),Tn.hasAnimations&&(s=I+nn,G.push([s,c]),N.style[s]=c)}kn.transitionDuration&&l.push(O),kn.animationDuration&&l.push(P),o=Date.now(),t.on(l.join(" "),i),u(r,Q+rn*z),h(t,e)}}function r(){m()}function i(n){n.stopPropagation();var t=n.originalEvent||n,e=t.$manualTimeStamp||t.timeStamp||Date.now(),a=parseFloat(t.elapsedTime.toFixed(an));Math.max(e-o,0)>=Q&&a>=W&&(B=!0,m())}if(!L){if(!N.parentNode)return void m();var o,l=[],c=function(n){if(B)H&&n&&(H=!1,m());else if(H=!n,kn.animationDuration){var t=S(N,H);H?G.push(t):s(G,t)}},f=An>0&&(kn.transitionDuration&&0===hn.transitionDuration||kn.animationDuration&&0===hn.animationDuration)&&Math.max(hn.animationDelay,hn.transitionDelay);f?u(n,Math.floor(f*An*on),!1):n(),U.resume=function(){c(!0)},U.pause=function(){c(!1)}}}var N=C(t);if(!N||!N.parentNode)return y();e=v(e);var L,H,B,J,U,K,Q,W,z,G=[],V=t.attr("class"),X=i(e);if(0===e.duration||!c.animations&&!c.transitions)return y();var Z=e.event&&E(e.event)?e.event.join(" "):e.event,tn=Z&&e.structural,en="",un="";tn?en=o(Z,"ng-",!0):Z&&(en=Z),e.addClass&&(un+=o(e.addClass,"-add")),e.removeClass&&(un.length&&(un+=" "),un+=o(e.removeClass,"-remove")),e.applyClassesEarly&&un.length&&(R(t,e),un="");var ln=[en,un].join(" ").trim(),cn=V+" "+ln,fn=o(ln,"-active"),mn=X.to&&Object.keys(X.to).length>0,dn=(e.keyframeStyle||"").length>0;if(!dn&&!mn&&!ln)return y();var pn,hn;if(e.stagger>0){var gn=parseFloat(e.stagger);hn={transitionDelay:gn,animationDelay:gn,transitionDuration:0,animationDuration:0}}else pn=g(N,cn),hn=D(N,ln,pn,vn);a.addClass(t,ln);var $n;if(e.transitionStyle){var Cn=[F,e.transitionStyle];x(N,Cn),G.push(Cn)}if(e.duration>=0){$n=N.style[F].length>0;var yn=b(e.duration,$n);x(N,yn),G.push(yn)}if(e.keyframeStyle){var Dn=[I,e.keyframeStyle];x(N,Dn),G.push(Dn)}var An=hn?e.staggerIndex>=0?e.staggerIndex:n.count(pn):0,bn=0===An;bn&&T(N,sn);var kn=M(N,cn,pn),wn=kn.maxDelay;K=Math.max(wn,0),W=kn.maxDuration;var Tn={};return Tn.hasTransitions=kn.transitionDuration>0,Tn.hasAnimations=kn.animationDuration>0,Tn.hasTransitionAll=Tn.hasTransitions&&"all"==kn.transitionProperty,Tn.applyTransitionDuration=mn&&(Tn.hasTransitions&&!Tn.hasTransitionAll||Tn.hasAnimations&&!Tn.hasTransitions),Tn.applyAnimationDuration=e.duration&&Tn.hasAnimations,Tn.applyTransitionDelay=A(e.delay)&&(Tn.applyTransitionDuration||Tn.hasTransitions),Tn.applyAnimationDelay=A(e.delay)&&Tn.hasAnimations,Tn.recalculateTimingStyles=un.length>0,(Tn.applyTransitionDuration||Tn.applyAnimationDuration)&&(W=e.duration?parseFloat(e.duration):W,Tn.applyTransitionDuration&&(Tn.hasTransitions=!0,kn.transitionDuration=W,$n=N.style[F+Y].length>0,G.push(b(W,$n))),Tn.applyAnimationDuration&&(Tn.hasAnimations=!0,kn.animationDuration=W,G.push(k(W)))),0!==W||Tn.recalculateTimingStyles?(null==e.duration&&kn.transitionDuration>0&&(Tn.recalculateTimingStyles=Tn.recalculateTimingStyles||bn),Q=K*on,z=W*on,e.skipBlocking||(Tn.blockTransition=kn.transitionDuration>0,Tn.blockKeyframeAnimation=kn.animationDuration>0&&hn.animationDelay>0&&0===hn.animationDuration),p(t,e),Tn.blockTransition||T(N,!1),$(W),{$$willAnimate:!0,end:l,start:function(){return L?void 0:(U={end:l,cancel:f,resume:null,pause:null},J=new r(U),j(_),J)}}):y()}var R=m(a),N=0,L=C(l).body,H=[];return _}]}],pn=["$$animationProvider",function(n){n.drivers.push("$$animateCssDriver");var t="ng-animate-shim",e="ng-anchor",a="ng-anchor-out",r="ng-anchor-in";this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$document","$sniffer",function(n,i,o,s,u,l){function c(n){return n.replace(/\bng-\S+\b/g,"")}function f(n,t){return N(n)&&(n=n.split(" ")),N(t)&&(t=t.split(" ")),n.filter(function(n){return-1===t.indexOf(n)}).join(" ")}function m(i,s,u){function l(n){var t={},e=C(n).getBoundingClientRect();return q(["width","height","top","left"],function(n){var a=e[n];switch(n){case"top":a+=p.scrollTop;break;case"left":a+=p.scrollLeft}t[n]=Math.floor(a)+"px"}),t}function m(){var t=n($,{addClass:a,delay:!0,from:l(s)});return t.$$willAnimate?t:null}function v(n){return n.attr("class")||""}function d(){var t=c(v(u)),e=f(t,y),i=f(y,t),o=n($,{to:l(u),addClass:r+" "+e,removeClass:a+" "+i,delay:!0});return o.$$willAnimate?o:null}function h(){$.remove(),s.removeClass(t),u.removeClass(t)}var $=R(C(s).cloneNode(!0)),y=c(v($));s.addClass(t),u.addClass(t),$.addClass(e),g.append($);var D,A=m();if(!A&&(D=d(),!D))return h();var b=A||D;return{start:function(){function n(){e&&e.end()}var t,e=b.start();return e.done(function(){return e=null,!D&&(D=d())?(e=D.start(),e.done(function(){e=null,h(),t.complete()}),e):(h(),void t.complete())}),t=new o({end:n,cancel:n})}}}function v(n,t,e,a){var r=d(n),i=d(t),s=[];return q(a,function(n){var t=n.out,a=n["in"],r=m(e,t,a);r&&s.push(r)}),r||i||0!==s.length?{start:function(){function n(){q(t,function(n){n.end()})}var t=[];r&&t.push(r.start()),i&&t.push(i.start()),q(s,function(n){t.push(n.start())});var e=new o({end:n,cancel:n});return o.all(t,function(n){e.complete(n)}),e}}:void 0}function d(t){var e=t.element,a=t.options||{};t.structural?(a.structural=a.applyClassesEarly=!0,a.event=t.event,"leave"===a.event&&(a.onDone=a.domOperation)):a.event=null;var r=n(e,a);return r.$$willAnimate?r:null}if(!l.animations&&!l.transitions)return M;var p=C(u).body,h=C(s),g=R(p.parentNode===h?p:h);return function(n){return n.from&&n.to?v(n.from,n.to,n.classes,n.anchors):d(n)}}]}],hn=["$animateProvider",function(n){this.$get=["$injector","$$AnimateRunner","$$rAFMutex","$$jqLite",function(t,e,a,r){function i(e){e=E(e)?e:e.split(" ");for(var a=[],r={},i=0;i<e.length;i++){var o=e[i],s=n.$$registeredAnimations[o];s&&!r[o]&&(a.push(t.get(s)),r[o]=!0)}return a}var o=m(r);return function(n,t,a,r){function s(){r.domOperation(),o(n,r)}function u(n,t,a,r,i){var o;switch(a){case"animate":o=[t,r.from,r.to,i];break;case"setClass":o=[t,p,h,i];break;case"addClass":o=[t,p,i];break;case"removeClass":o=[t,h,i];break;default:o=[t,i]}o.push(r);var s=n.apply(n,o);if(s)if(J(s.start)&&(s=s.start()),s instanceof e)s.done(i);else if(J(s))return s;return M}function l(n,t,a,r,i){var o=[];return q(r,function(r){var s=r[i];s&&o.push(function(){var r,i,o=!1,l=function(n){o||(o=!0,(i||M)(n),r.complete(!n))};return r=new e({end:function(){l()},cancel:function(){l(!0)}}),i=u(s,n,t,a,function(n){var t=n===!1;l(t)}),r})}),o}function c(n,t,a,r,i){var o=l(n,t,a,r,i);if(0===o.length){var s,u;"beforeSetClass"===i?(s=l(n,"removeClass",a,r,"beforeRemoveClass"),u=l(n,"addClass",a,r,"beforeAddClass")):"setClass"===i&&(s=l(n,"removeClass",a,r,"removeClass"),u=l(n,"addClass",a,r,"addClass")),s&&(o=o.concat(s)),u&&(o=o.concat(u))}if(0!==o.length)return function(n){var t=[];return o.length&&q(o,function(n){t.push(n())}),t.length?e.all(t,n):n(),function(n){q(t,function(t){n?t.cancel():t.end()})}}}3===arguments.length&&L(a)&&(r=a,a=null),r=v(r),a||(a=n.attr("class")||"",r.addClass&&(a+=" "+r.addClass),r.removeClass&&(a+=" "+r.removeClass));var f,m,p=r.addClass,h=r.removeClass,g=i(a);if(g.length){var $,C;"leave"==t?(C="leave",$="afterLeave"):(C="before"+t.charAt(0).toUpperCase()+t.substr(1),$=t),"enter"!==t&&"move"!==t&&(f=c(n,t,r,g,C)),m=c(n,t,r,g,$)}return f||m?{start:function(){function t(t){u=!0,s(),d(n,r),l.complete(t)}function a(n){u||((i||M)(n),t(n))}var i,o=[];f&&o.push(function(n){i=f(n)}),o.length?o.push(function(n){s(),n(!0)}):s(),m&&o.push(function(n){i=m(n)});var u=!1,l=new e({end:function(){a()},cancel:function(){a(!0)}});return e.chain(o,t),l}}:void 0}}]}],gn=["$$animationProvider",function(n){n.drivers.push("$$animateJsDriver"),this.$get=["$$animateJs","$$AnimateRunner",function(n,t){function e(t){var e=t.element,a=t.event,r=t.options,i=t.classes;return n(e,a,i,r)}return function(n){if(n.from&&n.to){var a=e(n.from),r=e(n.to);if(!a&&!r)return;return{start:function(){function n(){return function(){q(i,function(n){n.end()})}}function e(n){o.complete(n)}var i=[];a&&i.push(a.start()),r&&i.push(r.start()),t.all(i,e);var o=new t({end:n(),cancel:n()});return o}}}return e(n)}}]}],$n="data-ng-animate",Cn="$ngAnimatePin",yn=["$animateProvider",function(n){function t(n,t,e,a){return o[n].some(function(n){return n(t,e,a)})}function e(n,t){n=n||{};var e=(n.addClass||"").length>0,a=(n.removeClass||"").length>0;return t?e&&a:e||a}var r=1,i=2,o=this.rules={skip:[],cancel:[],join:[]};o.join.push(function(n,t){return!t.structural&&e(t.options)}),o.skip.push(function(n,t){return!t.structural&&!e(t.options)}),o.skip.push(function(n,t,e){return"leave"==e.event&&t.structural}),o.skip.push(function(n,t,e){return e.structural&&!t.structural}),o.cancel.push(function(n,t,e){return e.structural&&t.structural}),o.cancel.push(function(n,t,e){return e.state===i&&t.structural}),o.cancel.push(function(n,t,e){var a=t.options,r=e.options;return a.addClass&&a.addClass===r.removeClass||a.removeClass&&a.removeClass===r.addClass}),this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite",function(o,s,c,f,p,h,$,y,D){function A(n,t){return g(n,t,{})}function b(n,t){var e=C(n),a=[],r=Q[t];return r&&q(r,function(n){n.node.contains(e)&&a.push(n.callback)}),a}function k(n,t,e,a){o(function(){q(b(t,n),function(n){n(t,e,a)})})}function w(n,a,o){function l(t,e,a,r){k(e,n,a,r),t.progress(e,a,r)}function c(t){V(n,o),d(n,o),o.domOperation(),p.complete(!t)}var f,m;n=u(n),n&&(f=C(n),m=n.parent()),o=v(o);var p=new $;if(!f)return c(),p;E(o.addClass)&&(o.addClass=o.addClass.join(" ")),E(o.removeClass)&&(o.removeClass=o.removeClass.join(" ")),o.from&&!L(o.from)&&(o.from=null),o.to&&!L(o.to)&&(o.to=null);var y=[f.className,o.addClass,o.removeClass].join(" ");if(!G(y))return c(),p;var D=["enter","move","leave"].indexOf(a)>=0,b=!M||P.get(f),w=!b&&I.get(f)||{},x=!!w.state;if(b||x&&w.state==r||(b=!F(n,m,a)),b)return c(),p;D&&T(n);var _={structural:D,element:n,event:a,close:c,options:o,runner:p};if(x){var R=t("skip",n,_,w);if(R)return w.state===i?(c(),p):(g(n,w.options,o),w.runner);var q=t("cancel",n,_,w);if(q)w.state===i?w.runner.end():w.structural?w.close():g(n,_.options,w.options);else{var N=t("join",n,_,w);if(N){if(w.state!==i)return a=_.event=w.event,o=g(n,w.options,_.options),p;A(n,o)}}}else A(n,o);var H=_.structural;if(H||(H="animate"===_.event&&Object.keys(_.options.to||{}).length>0||e(_.options)),!H)return c(),S(n),p;D&&j(m);var B=(w.counter||0)+1;return _.counter=B,O(n,r,_),s.$$postDigest(function(){var t=I.get(f),r=!t;t=t||{};var s=n.parent()||[],u=s.length>0&&("animate"===t.event||t.structural||e(t.options));if(r||t.counter!==B||!u)return r&&(V(n,o),d(n,o)),(r||D&&t.event!==a)&&(o.domOperation(),p.end()),void(u||S(n));a=!t.structural&&e(t.options,!0)?"setClass":t.event,t.structural&&j(s),O(n,i);var m=h(n,a,t.options);m.done(function(t){c(!t);var e=I.get(f);e&&e.counter===B&&S(C(n)),l(p,a,"close",{})}),p.setHost(m),l(p,a,"start",{})}),p}function T(n){var t=C(n),e=t.querySelectorAll("["+$n+"]");q(e,function(n){var t=parseInt(n.getAttribute($n)),e=I.get(n);switch(t){case i:e.runner.end();case r:e&&I.remove(n)}})}function S(n){var t=C(n);t.removeAttribute($n),I.remove(t)}function x(n,t){return C(n)===C(t)}function j(n){function t(n,t){!t.structural&&e(t.options)&&(t.state===i&&t.runner.end(),S(n))}for(var a=C(n);;){if(!a||a.nodeType!==K)break;var r=I.get(a);r&&t(a,r),a=a.parentNode}}function F(n,t){var e,a=!1,r=!1,i=!1,o=n.data(Cn);for(o&&(t=o);t&&t.length;){r||(r=x(t,c));var s=t[0];if(s.nodeType!==K)break;var u=I.get(s)||{};if(i||(i=u.structural||P.get(s)),H(e)||e===!0){var l=t.data(W);B(l)&&(e=l)}if(i&&e===!1)break;r||(r=x(t,c),r||(o=t.data(Cn),o&&(t=o))),a||(a=x(t,J)),t=t.parent()}var f=!i||e;return f&&r&&a}function O(n,t,e){e=e||{},e.state=t;var a=C(n);a.setAttribute($n,t);var r=I.get(a),i=r?_(r,e):e;I.put(a,i)}var I=new p,P=new p,M=null,N=s.$watch(function(){return 0===y.totalPendingRequests},function(n){n&&(N(),s.$$postDigest(function(){s.$$postDigest(function(){null===M&&(M=!0)})}))}),J=R(f[0].body),Q={},z=n.classNameFilter(),G=z?function(n){return z.test(n)}:function(){return!0},V=m(D);return{on:function(n,t,e){var a=l(t);Q[n]=Q[n]||[],Q[n].push({node:a,callback:e})},off:function(n,t,e){function a(n,t,e){var a=l(t);return n.filter(function(n){var t=n.node===a&&(!e||n.callback===e);return!t})}var r=Q[n];r&&(Q[n]=1===arguments.length?null:a(r,t,e))},pin:function(n,t){a(U(n),"element","not an element"),a(U(t),"parentElement","not an element"),n.data(Cn,t)},push:function(n,t,e,a){return e=e||{},e.domOperation=a,w(n,t,e)},enabled:function(n,t){var e=arguments.length;if(0===e)t=!!M;else{var a=U(n);if(a){var r=C(n),i=P.get(r);1===e?t=!i:(t=!!t,t?i&&P.remove(r):P.put(r,!0))}else t=M=!!n}return t}}}]}],Dn=["$$rAF",function(n){return function(){var t=!1;return n(function(){t=!0}),function(e){t?e():n(e)}}}],An=["$q","$$rAFMutex",function(n,t){function e(n){this.setHost(n),this._doneCallbacks=[],this._runInAnimationFrame=t(),this._state=0}var a=0,r=1,i=2;return e.chain=function(n,t){function e(){return a===n.length?void t(!0):void n[a](function(n){return n===!1?void t(!1):(a++,void e())})}var a=0;e()},e.all=function(n,t){function e(e){r=r&&e,++a===n.length&&t(r)}var a=0,r=!0;q(n,function(n){n.done(e)})},e.prototype={setHost:function(n){this.host=n||{}},done:function(n){this._state===i?n():this._doneCallbacks.push(n)},progress:M,getPromise:function(){if(!this.promise){var t=this;this.promise=n(function(n,e){t.done(function(t){t===!1?e():n()})})}return this.promise},then:function(n,t){return this.getPromise().then(n,t)},"catch":function(n){return this.getPromise()["catch"](n)},"finally":function(n){return this.getPromise()["finally"](n)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end(),this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel(),this._resolve(!1)},complete:function(n){var t=this;t._state===a&&(t._state=r,t._runInAnimationFrame(function(){t._resolve(n)}))},_resolve:function(n){this._state!==i&&(q(this._doneCallbacks,function(t){t(n)}),this._doneCallbacks.length=0,this._state=i)}},e}],bn=["$animateProvider",function(){function n(n,t){n.data(o,t)}function t(n){n.removeData(o)}function e(n){return n.data(o)}var a="ng-animate-ref",i=this.drivers=[],o="$$animationRunner";this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$rAFScheduler",function(o,s,u,l,c){var f=[],p=m(o),h=0,g=0,$=[];return function(m,y,D){function A(n){var t="["+a+"]",e=n.hasAttribute(a)?[n]:n.querySelectorAll(t),r=[];return q(e,function(n){var t=n.getAttribute(a);t&&t.length&&r.push(n)}),r}function b(n){var t=[],e={};q(n,function(n,r){var i=n.element,o=C(i),s=n.event,u=["enter","move"].indexOf(s)>=0,l=n.structural?A(o):[];if(l.length){var c=u?"to":"from";q(l,function(n){var t=n.getAttribute(a);e[t]=e[t]||{},e[t][c]={animationID:r,element:R(n)}})}else t.push(n)});var r={},i={};return q(e,function(e){var a=e.from,o=e.to;if(!a||!o){var s=a?a.animationID:o.animationID,u=s.toString();return void(r[u]||(r[u]=!0,t.push(n[s])))}var l=n[a.animationID],c=n[o.animationID],f=a.animationID.toString();if(!i[f]){var m=i[f]={structural:!0,beforeStart:function(){l.beforeStart(),c.beforeStart()},close:function(){l.close(),c.close()},classes:k(l.classes,c.classes),from:l,to:c,anchors:[]};m.classes.length?t.push(m):(t.push(l),t.push(c))}i[f].anchors.push({out:a.element,"in":o.element})}),t}function k(n,t){n=n.split(" "),t=t.split(" ");for(var e=[],a=0;a<n.length;a++){var r=n[a];if("ng-"!==r.substring(0,3))for(var i=0;i<t.length;i++)if(r===t[i]){e.push(r);break}}return e.join(" ")}function w(n){for(var t=i.length-1;t>=0;t--){var e=i[t];if(u.has(e)){var a=u.get(e),r=a(n);if(r)return r}}}function T(){m.addClass(Q),P&&o.addClass(m,P)}function S(n,t){function a(n){e(n).setHost(t)}n.from&&n.to?(a(n.from.element),a(n.to.element)):a(n.element)}function x(){var n=e(m);!n||"leave"===y&&D.$$domOperationFired||n.end()}function j(n){m.off("$destroy",x),t(m),p(m,D),d(m,D),D.domOperation(),P&&o.removeClass(m,P),m.removeClass(Q),O.complete(!n)}D=v(D);var F=["enter","move","leave"].indexOf(y)>=0,O=new l({end:function(){j()},cancel:function(){j(!0)}});if(!i.length)return j(),O;n(m,O);var I=r(m.attr("class"),r(D.addClass,D.removeClass)),P=D.tempClasses;P&&(I+=" "+P,D.tempClasses=null);var M;return F||(M=h,h+=1),f.push({element:m,classes:I,event:y,classBasedIndex:M,structural:F,options:D,beforeStart:T,close:j}),m.on("$destroy",x),f.length>1?O:(s.$$postDigest(function(){g=h,h=0,$.length=0;var n=[];q(f,function(t){e(t.element)&&n.push(t)}),f.length=0,q(b(n),function(n){function t(){n.beforeStart();var t,a=n.close,r=n.anchors?n.from.element||n.to.element:n.element;if(e(r)&&C(r).parentNode){var i=w(n);i&&(t=i.start)}if(t){var o=t();o.done(function(n){a(!n)}),S(n,o)}else a()}n.structural?t():($.push({node:C(n.element),fn:t}),n.classBasedIndex===g-1&&($=$.sort(function(n,t){return t.node.contains(n.node)}).map(function(n){return n.fn}),c($)))})}),O)}}]}];t.module("ngAnimate",[]).directive("ngAnimateChildren",G).factory("$$rAFMutex",Dn).factory("$$rAFScheduler",z).factory("$$AnimateRunner",An).provider("$$animateQueue",yn).provider("$$animation",bn).provider("$animateCss",dn).provider("$$animateCssDriver",pn).provider("$$animateJs",hn).provider("$$animateJsDriver",gn)}(window,window.angular);