"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b}),function(a,b,c,d){var e={init:function(b,c){var d=this;if(d.elem=c,d.$elem=a(c),d.newsTagName=d.$elem.find(":first-child").prop("tagName"),d.newsClassName=d.$elem.find(":first-child").attr("class"),d.timer=null,d.resizeTimer=null,d.animationStarted=!1,d.isHovered=!1,"string"==typeof b)throw console&&console.error("String property override is not supported"),"String property override is not supported";d.options=a.extend({},a.fn.bootstrapNews.options,b),d.prepareLayout(),d.options.autoplay&&d.animate(),d.options.navigation&&d.buildNavigation(),"function"==typeof d.options.onToDo&&d.options.onToDo.apply(d,arguments)},prepareLayout:function(){var c=this;a(c.elem).find("."+c.newsClassName).on("mouseenter",function(){c.onReset(!0)}),a(c.elem).find("."+c.newsClassName).on("mouseout",function(){c.onReset(!1)}),a.map(c.$elem.find(c.newsTagName),function(b,d){d>c.options.newsPerPage-1?a(b).hide():a(b).show()});var d=0;a.map(c.$elem.find(c.newsTagName),function(b,e){e<c.options.newsPerPage&&(d=parseInt(d)+parseInt(a(b).height())+10)}),a(c.elem).css({"overflow-y":"hidden",height:c.options.heightOnPage}),a(b).resize(function(){null!==c.resizeTimer&&clearTimeout(c.resizeTimer),c.resizeTimer=setTimeout(function(){c.prepareLayout()},200)})},findPanelObject:function(){for(var a=this.$elem;a.parent()!==d;)if(a=a.parent(),a.parent().hasClass("panel"))return a.parent();return d},buildNavigation:function(){var b=this.findPanelObject();if(b){var c=this;a(b).find(".prev").on("click",function(a){a.preventDefault(),c.onPrev()}),a(b).find(".next").on("click",function(a){a.preventDefault(),c.onNext()})}},onStop:function(){},onPause:function(){var a=this;a.isHovered=!0,this.options.autoplay&&a.timer&&clearTimeout(a.timer)},onReset:function(a){var b=this;b.timer&&clearTimeout(b.timer),b.options.autoplay&&(b.isHovered=a,b.animate())},animate:function(){var a=this;a.timer=setTimeout(function(){a.options.pauseOnHover||(a.isHovered=!1),a.isHovered||("up"===a.options.direction?a.onNext():a.onPrev())},a.options.newsTickerInterval)},onPrev:function(){var b=this;if(b.animationStarted)return!1;b.animationStarted=!0;var c="<"+b.newsTagName+' style="display:none;" class="'+b.newsClassName+'">'+a(b.$elem).find(b.newsTagName).last().html()+"</"+b.newsTagName+">";a(b.$elem).prepend(c),a(b.$elem).find(b.newsTagName).first().slideDown(b.options.animationSpeed,function(){a(b.$elem).find(b.newsTagName).last().remove()}),a(b.$elem).find(b.newsTagName+":nth-child("+parseInt(b.options.newsPerPage+1)+")").slideUp(b.options.animationSpeed,function(){b.animationStarted=!1,b.onReset(b.isHovered)}),a(b.elem).find("."+b.newsClassName).on("mouseenter",function(){b.onReset(!0)}),a(b.elem).find("."+b.newsClassName).on("mouseout",function(){b.onReset(!1)})},onNext:function(){var b=this;if(b.animationStarted)return!1;b.animationStarted=!0;var c="<"+b.newsTagName+' style="display:none;" class="'+b.newsClassName+'">'+a(b.$elem).find(b.newsTagName).first().html()+"</"+b.newsTagName+">";a(b.$elem).append(c),a(b.$elem).find(b.newsTagName).first().slideUp(b.options.animationSpeed,function(){a(this).remove()}),a(b.$elem).find(b.newsTagName+":nth-child("+parseInt(b.options.newsPerPage+1)+")").slideDown(b.options.animationSpeed,function(){b.animationStarted=!1,b.onReset(b.isHovered)}),a(b.elem).find("."+b.newsClassName).on("mouseenter",function(){b.onReset(!0)}),a(b.elem).find("."+b.newsClassName).on("mouseout",function(){b.onReset(!1)})}};a.fn.bootstrapNews=function(a){return this.each(function(){var b=Object.create(e);b.init(a,this)})},a.fn.bootstrapNews.options={newsPerPage:4,navigation:!0,autoplay:!0,direction:"up",animationSpeed:"normal",newsTickerInterval:4e3,heightOnPage:400,pauseOnHover:!0,onStop:null,onPause:null,onReset:null,onPrev:null,onNext:null,onToDo:null}}(jQuery,window,document);