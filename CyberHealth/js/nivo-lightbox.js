!function(i,t,o){function e(t,o){this.el=t,this.$el=i(this.el),this.options=i.extend({},l,o),this._defaults=l,this._name=n,this.init()}var n="nivoLightbox",l={effect:"fade",theme:"default",keyboardNav:!0,clickOverlayToClose:!0,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(){},beforeHideLightbox:function(){},afterHideLightbox:function(){},onPrev:function(){},onNext:function(){},errorMessage:"The requested content cannot be loaded. Please try again later."};e.prototype={init:function(){var t=this;i("html").hasClass("nivo-lightbox-notouch")||i("html").addClass("nivo-lightbox-notouch"),"ontouchstart"in o&&i("html").removeClass("nivo-lightbox-notouch"),this.$el.on("click",function(i){i.preventDefault(),t.showLightbox()}),this.options.keyboardNav&&i("body").off("keyup").on("keyup",function(o){var e=o.keyCode?o.keyCode:o.which;27==e&&t.destructLightbox(),37==e&&i(".nivo-lightbox-prev").trigger("click"),39==e&&i(".nivo-lightbox-next").trigger("click")}),this.options.onInit.call(this)},showLightbox:function(){var t=this;this.options.beforeShowLightbox.call(this);var o=this.constructLightbox();if(o){var e=o.find(".nivo-lightbox-content");if(e){var n=this.$el;if(i("body").addClass("nivo-lightbox-body-effect-"+this.options.effect),this.processContent(e,n),this.$el.attr("data-lightbox-gallery")){var t=this,l=i('[data-lightbox-gallery="'+this.$el.attr("data-lightbox-gallery")+'"]');i(".nivo-lightbox-nav").show(),i(".nivo-lightbox-prev").off("click").on("click",function(o){o.preventDefault();var a=l.index(n);n=l.eq(a-1),i(n).length||(n=l.last()),t.processContent(e,n),t.options.onPrev.call(this,[n])}),i(".nivo-lightbox-next").off("click").on("click",function(o){o.preventDefault();var a=l.index(n);n=l.eq(a+1),i(n).length||(n=l.first()),t.processContent(e,n),t.options.onNext.call(this,[n])})}setTimeout(function(){o.addClass("nivo-lightbox-open"),t.options.afterShowLightbox.call(this,[o])},1)}}},processContent:function(o,e){var n=this,l=e.attr("href");if(o.html("").addClass("nivo-lightbox-loading"),this.isHidpi()&&e.attr("data-lightbox-hidpi")&&(l=e.attr("data-lightbox-hidpi")),null!=l.match(/\.(jpeg|jpg|gif|png)$/i)){var a=i("<img>",{src:l});a.one("load",function(){var e=i('<div class="nivo-lightbox-image" />');e.append(a),o.html(e).removeClass("nivo-lightbox-loading"),e.css({"line-height":i(".nivo-lightbox-content").height()+"px",height:i(".nivo-lightbox-content").height()+"px"}),i(t).resize(function(){e.css({"line-height":i(".nivo-lightbox-content").height()+"px",height:i(".nivo-lightbox-content").height()+"px"})})}).each(function(){this.complete&&i(this).load()}),a.error(function(){var t=i('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(t).removeClass("nivo-lightbox-loading")})}else if(video=l.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/)){var h="",s="nivo-lightbox-video";if("youtube"==video[1]&&(h="http://www.youtube.com/v/"+video[4],s="nivo-lightbox-youtube"),"youtu"==video[1]&&(h="http://www.youtube.com/v/"+video[3],s="nivo-lightbox-youtube"),"vimeo"==video[1]&&(h="http://player.vimeo.com/video/"+video[3],s="nivo-lightbox-vimeo"),h){var r=i("<iframe>",{src:h,"class":s,frameborder:0,vspace:0,hspace:0,scrolling:"auto"});o.html(r),r.load(function(){o.removeClass("nivo-lightbox-loading")})}}else if("ajax"==e.attr("data-lightbox-type")){var n=this;i.ajax({url:l,cache:!1,success:function(e){var n=i('<div class="nivo-lightbox-ajax" />');n.append(e),o.html(n).removeClass("nivo-lightbox-loading"),n.outerHeight()<o.height()&&n.css({position:"relative",top:"50%","margin-top":-(n.outerHeight()/2)+"px"}),i(t).resize(function(){n.outerHeight()<o.height()&&n.css({position:"relative",top:"50%","margin-top":-(n.outerHeight()/2)+"px"})})},error:function(){var t=i('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(t).removeClass("nivo-lightbox-loading")}})}else if("#"==l.substring(0,1))if(i(l).length){var v=i('<div class="nivo-lightbox-inline" />');v.append(i(l).clone().show()),o.html(v).removeClass("nivo-lightbox-loading"),v.outerHeight()<o.height()&&v.css({position:"relative",top:"50%","margin-top":-(v.outerHeight()/2)+"px"}),i(t).resize(function(){v.outerHeight()<o.height()&&v.css({position:"relative",top:"50%","margin-top":-(v.outerHeight()/2)+"px"})})}else{var v=i('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(v).removeClass("nivo-lightbox-loading")}else{var r=i("<iframe>",{src:l,"class":"nivo-lightbox-item",frameborder:0,vspace:0,hspace:0,scrolling:"auto"});o.html(r),r.load(function(){o.removeClass("nivo-lightbox-loading")})}if(e.attr("title")){var c=i("<span>",{"class":"nivo-lightbox-title"});c.text(e.attr("title")),i(".nivo-lightbox-title-wrap").html(c)}else i(".nivo-lightbox-title-wrap").html("")},constructLightbox:function(){if(i(".nivo-lightbox-overlay").length)return i(".nivo-lightbox-overlay");var t=i("<div>",{"class":"nivo-lightbox-overlay nivo-lightbox-theme-"+this.options.theme+" nivo-lightbox-effect-"+this.options.effect}),o=i("<div>",{"class":"nivo-lightbox-wrap"}),e=i("<div>",{"class":"nivo-lightbox-content"}),n=i('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),l=i('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),a=i("<div>",{"class":"nivo-lightbox-title-wrap"}),h=0;h&&t.addClass("nivo-lightbox-ie"),o.append(e),o.append(a),t.append(o),t.append(n),t.append(l),i("body").append(t);var s=this;return s.options.clickOverlayToClose&&t.on("click",function(t){(t.target===this||i(t.target).hasClass("nivo-lightbox-content")||i(t.target).hasClass("nivo-lightbox-image"))&&s.destructLightbox()}),l.on("click",function(i){i.preventDefault(),s.destructLightbox()}),t},destructLightbox:function(){var t=this;this.options.beforeHideLightbox.call(this),i(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"),i(".nivo-lightbox-nav").hide(),i("body").removeClass("nivo-lightbox-body-effect-"+t.options.effect);var o=0;o&&(i(".nivo-lightbox-overlay iframe").attr("src"," "),i(".nivo-lightbox-overlay iframe").remove()),i(".nivo-lightbox-prev").off("click"),i(".nivo-lightbox-next").off("click"),i(".nivo-lightbox-content").empty(),this.options.afterHideLightbox.call(this)},isHidpi:function(){var i="(-webkit-min-device-pixel-ratio: 1.5),							  (min--moz-device-pixel-ratio: 1.5),							  (-o-min-device-pixel-ratio: 3/2),							  (min-resolution: 1.5dppx)";return t.devicePixelRatio>1?!0:t.matchMedia&&t.matchMedia(i).matches?!0:!1}},i.fn[n]=function(t){return this.each(function(){i.data(this,n)||i.data(this,n,new e(this,t))})}}(jQuery,window,document);