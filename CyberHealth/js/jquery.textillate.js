!function(a){"use strict";function b(b){return/In/.test(b)||a.inArray(b,a.fn.textillate.defaults.inEffects)>=0}function c(b){return/Out/.test(b)||a.inArray(b,a.fn.textillate.defaults.outEffects)>=0}function d(b){var c=b.attributes||[],d={};return c.length?(a.each(c,function(a,b){/^data-in-*/.test(b.nodeName)?(d["in"]=d["in"]||{},d["in"][b.nodeName.replace(/data-in-/,"")]=b.nodeValue):/^data-out-*/.test(b.nodeName)?(d.out=d.out||{},d.out[b.nodeName.replace(/data-out-/,"")]=b.nodeValue):/^data-*/.test(b.nodeName)&&(d[b.nodeName]=b.nodeValue)}),d):d}function e(a){for(var b,c,d=a.length;d;b=parseInt(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a}function f(a,b,c){a.addClass("animated "+b).css("visibility","visible").show(),a.one("animationend webkitAnimationEnd oAnimationEnd",function(){a.removeClass("animated "+b),c&&c()})}function g(d,g,h){var i=d.length;return i?(g.shuffle&&(d=e(d)),g.reverse&&(d=d.toArray().reverse()),void a.each(d,function(d,e){function j(){b(g.effect)?k.css("visibility","visible"):c(g.effect)&&k.css("visibility","hidden"),i-=1,!i&&h&&h()}var k=a(e),l=g.sync?g.delay:g.delay*d*g.delayScale;k.text()?setTimeout(function(){f(k,g.effect,j)},l):j()})):void(h&&h())}var h=function(e,f){var h=this,i=a(e);h.init=function(){h.$texts=i.find(f.selector),h.$texts.length||(h.$texts=a('<ul class="texts"><li>'+i.html()+"</li></ul>"),i.html(h.$texts)),h.$texts.hide(),h.$current=a("<span>").text(h.$texts.find(":first-child").html()).prependTo(i),b(f.effect)?h.$current.css("visibility","hidden"):c(f.effect)&&h.$current.css("visibility","visible"),h.setOptions(f),setTimeout(function(){h.options.autoStart&&h.start()},h.options.initialDelay)},h.setOptions=function(a){h.options=a},h.triggerEvent=function(b){var c=a.Event(b+".tlt");return i.trigger(c,h),c},h["in"]=function(e,f){e=e||0;var i,j=h.$texts.find(":nth-child("+(e+1)+")"),k=a.extend({},h.options,d(j));j.addClass("current"),h.triggerEvent("inAnimationBegin"),h.$current.text(j.html()).lettering("words"),h.$current.find('[class^="word"]').css({display:"inline-block","-webkit-transform":"translate3d(0,0,0)","-moz-transform":"translate3d(0,0,0)","-o-transform":"translate3d(0,0,0)",transform:"translate3d(0,0,0)"}).each(function(){a(this).lettering()}),i=h.$current.find('[class^="char"]').css("display","inline-block"),b(k["in"].effect)?i.css("visibility","hidden"):c(k["in"].effect)&&i.css("visibility","visible"),h.currentIndex=e,g(i,k["in"],function(){h.triggerEvent("inAnimationEnd"),k["in"].callback&&k["in"].callback(),f&&f(h)})},h.out=function(b){var c=h.$texts.find(":nth-child("+(h.currentIndex+1)+")"),e=h.$current.find('[class^="char"]'),f=a.extend({},h.options,d(c));h.triggerEvent("outAnimationBegin"),g(e,f.out,function(){c.removeClass("current"),h.triggerEvent("outAnimationEnd"),f.out.callback&&f.out.callback(),b&&b(h)})},h.start=function(a){h.triggerEvent("start"),function b(a){h["in"](a,function(){var c=h.$texts.children().length;a+=1,!h.options.loop&&a>=c?(h.options.callback&&h.options.callback(),h.triggerEvent("end")):(a%=c,setTimeout(function(){h.out(function(){b(a)})},h.options.minDisplayTime))})}(a||0)},h.init()};a.fn.textillate=function(b,c){return this.each(function(){var e=a(this),f=e.data("textillate"),g=a.extend(!0,{},a.fn.textillate.defaults,d(this),"object"==typeof b&&b);f?"string"==typeof b?f[b].apply(f,[].concat(c)):f.setOptions.call(f,g):e.data("textillate",f=new h(this,g))})},a.fn.textillate.defaults={selector:".texts",loop:!1,minDisplayTime:2e3,initialDelay:0,"in":{effect:"fadeInLeftBig",delayScale:1.5,delay:50,sync:!1,reverse:!1,shuffle:!1,callback:function(){}},out:{effect:"hinge",delayScale:1.5,delay:50,sync:!1,reverse:!1,shuffle:!1,callback:function(){}},autoStart:!0,inEffects:[],outEffects:["hinge"],callback:function(){}}}(jQuery);