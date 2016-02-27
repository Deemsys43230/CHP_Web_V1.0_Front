!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?exports.cropit=b(require("jquery")):a.cropit=b(a.jQuery)}(this,function(a){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){function d(a){return a&&a.__esModule?a:{"default":a}}var e=c(1),f=d(e),g=c(2),h=d(g),i=c(4),j=c(6),k=function(a,b){return a.each(function(){var a=f["default"].data(this,i.PLUGIN_KEY);a&&b(a)})},l=function(a,b,c){var d=a.first().data(i.PLUGIN_KEY);return d&&f["default"].isFunction(d[b])?d[b](c):null},m={init:function(a){return this.each(function(){if(!f["default"].data(this,i.PLUGIN_KEY)){var b=new h["default"](f["default"],this,a);f["default"].data(this,i.PLUGIN_KEY,b)}})},destroy:function(){return this.each(function(){f["default"].removeData(this,i.PLUGIN_KEY)})},isZoomable:function(){return l(this,"isZoomable")},"export":function(a){return l(this,"getCroppedImageData",a)},imageState:function(){return l(this,"getImageState")},imageSrc:function(a){return(0,j.exists)(a)?k(this,function(b){b.loadImage(a)}):l(this,"getImageSrc")},offset:function(a){return a&&(0,j.exists)(a.x)&&(0,j.exists)(a.y)?k(this,function(b){b.setOffset(a)}):l(this,"getOffset")},zoom:function(a){return(0,j.exists)(a)?k(this,function(b){b.setZoom(a)}):l(this,"getZoom")},imageSize:function(){return l(this,"getImageSize")},previewSize:function(a){return a?k(this,function(b){b.setPreviewSize(a)}):l(this,"getPreviewSize")},disable:function(){return k(this,function(a){a.disable()})},reenable:function(){return k(this,function(a){a.reenable()})}};f["default"].fn.cropit=function(a){return m[a]?m[a].apply(this,Array.prototype.slice.call(arguments,1)):m.init.apply(this,arguments)}},function(b,c){b.exports=a},function(a,b,c){function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(1),h=d(g),i=c(3),j=d(i),k=c(4),l=c(5),m=c(6),n=function(){function a(b,c,d){e(this,a),this.$el=(0,h["default"])(c);var f=(0,l.loadDefaults)(this.$el);this.options=h["default"].extend({},f,d),this.init()}return f(a,[{key:"init",value:function(){var a=this;if(this.image=new Image,this.preImage=new Image,this.image.onload=this.onImageLoaded.bind(this),this.preImage.onload=this.onPreImageLoaded.bind(this),this.image.onerror=this.preImage.onerror=function(){a.onImageError.call(a,k.ERRORS.IMAGE_FAILED_TO_LOAD)},this.$fileInput=this.options.$fileInput.attr({accept:"image/*"}),this.$preview=this.options.$preview.css({backgroundRepeat:"no-repeat"}),this.$zoomSlider=this.options.$zoomSlider.attr({min:0,max:1,step:.01}),this.previewSize={w:this.options.width||this.$preview.width(),h:this.options.height||this.$preview.height()},this.options.width&&this.$preview.width(this.previewSize.w),this.options.height&&this.$preview.height(this.previewSize.h),this.options.imageBackground){h["default"].isArray(this.options.imageBackgroundBorderWidth)?this.imageBgBorderWidthArray=this.options.imageBackgroundBorderWidth:(this.imageBgBorderWidthArray=[],[0,1,2,3].forEach(function(b){a.imageBgBorderWidthArray[b]=a.options.imageBackgroundBorderWidth}));var b=this.options.$previewContainer;this.$imageBg=(0,h["default"])("<img />").addClass(k.CLASS_NAMES.IMAGE_BACKGROUND).attr("alt","").css("position","absolute"),this.$imageBgContainer=(0,h["default"])("<div />").addClass(k.CLASS_NAMES.IMAGE_BACKGROUND_CONTAINER).css({position:"absolute",zIndex:0,left:-this.imageBgBorderWidthArray[3]+window.parseInt(this.$preview.css("border-left-width")||0),top:-this.imageBgBorderWidthArray[0]+window.parseInt(this.$preview.css("border-top-width")||0),width:this.previewSize.w+this.imageBgBorderWidthArray[1]+this.imageBgBorderWidthArray[3],height:this.previewSize.h+this.imageBgBorderWidthArray[0]+this.imageBgBorderWidthArray[2]}).append(this.$imageBg),this.imageBgBorderWidthArray[0]>0&&this.$imageBgContainer.css("overflow","hidden"),b.css("position","relative").prepend(this.$imageBgContainer),this.$preview.css("position","relative"),this.$preview.hover(function(){a.$imageBg.addClass(k.CLASS_NAMES.PREVIEW_HOVERED)},function(){a.$imageBg.removeClass(k.CLASS_NAMES.PREVIEW_HOVERED)})}"min"===this.options.initialZoom?this.initialZoom=0:"image"===this.options.initialZoom?this.initialZoom=1:this.initialZoom=0,this.imageLoaded=!1,this.moveContinue=!1,this.zoomer=new j["default"],this.options.allowDragNDrop&&h["default"].event.props.push("dataTransfer"),this.bindListeners(),this.options.imageState&&this.options.imageState.src&&this.loadImage(this.options.imageState.src)}},{key:"bindListeners",value:function(){this.$fileInput.on("change.cropit",this.onFileChange.bind(this)),this.$preview.on(k.EVENTS.PREVIEW,this.onPreviewEvent.bind(this)),this.$zoomSlider.on(k.EVENTS.ZOOM_INPUT,this.onZoomSliderChange.bind(this)),this.options.allowDragNDrop&&(this.$preview.on("dragover.cropit dragleave.cropit",this.onDragOver.bind(this)),this.$preview.on("drop.cropit",this.onDrop.bind(this)))}},{key:"unbindListeners",value:function(){this.$fileInput.off("change.cropit"),this.$preview.off(k.EVENTS.PREVIEW),this.$preview.off("dragover.cropit dragleave.cropit drop.cropit"),this.$zoomSlider.off(k.EVENTS.ZOOM_INPUT)}},{key:"onFileChange",value:function(){this.options.onFileChange(),this.$fileInput.get(0).files&&this.loadFileReader(this.$fileInput.get(0).files[0])}},{key:"loadFileReader",value:function(a){var b=new FileReader;a&&a.type.match("image")?(b.readAsDataURL(a),b.onload=this.onFileReaderLoaded.bind(this),b.onerror=this.onFileReaderError.bind(this)):a&&this.onFileReaderError()}},{key:"onFileReaderLoaded",value:function(a){this.loadImage(a.target.result)}},{key:"onFileReaderError",value:function(){this.options.onFileReaderError()}},{key:"onDragOver",value:function(a){a.preventDefault(),a.dataTransfer.dropEffect="copy",this.$preview.toggleClass(k.CLASS_NAMES.DRAG_HOVERED,"dragover"===a.type)}},{key:"onDrop",value:function(a){var b=this;a.preventDefault(),a.stopPropagation();var c=Array.prototype.slice.call(a.dataTransfer.files,0);c.some(function(a){return a.type.match("image")?(b.loadFileReader(a),!0):!1}),this.$preview.removeClass(k.CLASS_NAMES.DRAG_HOVERED)}},{key:"loadImage",value:function(a){a&&(this.options.onImageLoading(),this.setImageLoadingClass(),this.preImage.src=a)}},{key:"onPreImageLoaded",value:function(){return"reject"===this.options.smallImage&&(this.preImage.width*this.options.maxZoom<this.previewSize.w*this.options.exportZoom||this.preImage.height*this.options.maxZoom<this.previewSize.h*this.options.exportZoom)?void this.onImageError(k.ERRORS.SMALL_IMAGE):(this.options.allowCrossOrigin&&(this.image.crossOrigin=0===this.preImage.src.indexOf("data:")?null:"Anonymous"),void(this.image.src=this.imageSrc=this.preImage.src))}},{key:"onImageLoaded",value:function(){this.imageSize={w:this.image.width,h:this.image.height},this.setupZoomer(this.options.imageState&&this.options.imageState.zoom||this.initialZoom),this.options.imageState&&this.options.imageState.offset?this.setOffset(this.options.imageState.offset):this.centerImage(),this.options.imageState={},this.$preview.css("background-image","url("+this.imageSrc+")"),this.options.imageBackground&&this.$imageBg.attr("src",this.imageSrc),this.setImageLoadedClass(),this.imageLoaded=!0,this.options.onImageLoaded()}},{key:"onImageError",value:function(){this.options.onImageError.apply(this,arguments),this.removeImageLoadingClass()}},{key:"setImageLoadingClass",value:function(){this.$preview.removeClass(k.CLASS_NAMES.IMAGE_LOADED).addClass(k.CLASS_NAMES.IMAGE_LOADING)}},{key:"setImageLoadedClass",value:function(){this.$preview.removeClass(k.CLASS_NAMES.IMAGE_LOADING).addClass(k.CLASS_NAMES.IMAGE_LOADED)}},{key:"removeImageLoadingClass",value:function(){this.$preview.removeClass(k.CLASS_NAMES.IMAGE_LOADING)}},{key:"getEventPosition",value:function(a){return a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches[0]&&(a=a.originalEvent.touches[0]),a.clientX&&a.clientY?{x:a.clientX,y:a.clientY}:void 0}},{key:"onPreviewEvent",value:function(a){return this.imageLoaded?(this.moveContinue=!1,this.$preview.off(k.EVENTS.PREVIEW_MOVE),"mousedown"===a.type||"touchstart"===a.type?(this.origin=this.getEventPosition(a),this.moveContinue=!0,this.$preview.on(k.EVENTS.PREVIEW_MOVE,this.onMove.bind(this))):(0,h["default"])(document.body).focus(),a.stopPropagation(),!1):void 0}},{key:"onMove",value:function(a){var b=this.getEventPosition(a);return this.moveContinue&&b&&this.setOffset({x:this.offset.x+b.x-this.origin.x,y:this.offset.y+b.y-this.origin.y}),this.origin=b,a.stopPropagation(),!1}},{key:"setOffset",value:function(a){this.offset=this.fixOffset(a),this.$preview.css("background-position",""+this.offset.x+"px "+this.offset.y+"px"),this.options.imageBackground&&this.$imageBg.css({left:this.offset.x+this.imageBgBorderWidthArray[3],top:this.offset.y+this.imageBgBorderWidthArray[0]})}},{key:"fixOffset",value:function(a){if(!this.imageLoaded)return a;var b={x:a.x,y:a.y};return this.options.freeMove||(this.imageSize.w*this.zoom>=this.previewSize.w?b.x=Math.min(0,Math.max(b.x,this.previewSize.w-this.imageSize.w*this.zoom)):b.x=Math.max(0,Math.min(b.x,this.previewSize.w-this.imageSize.w*this.zoom)),this.imageSize.h*this.zoom>=this.previewSize.h?b.y=Math.min(0,Math.max(b.y,this.previewSize.h-this.imageSize.h*this.zoom)):b.y=Math.max(0,Math.min(b.y,this.previewSize.h-this.imageSize.h*this.zoom))),b.x=(0,m.round)(b.x),b.y=(0,m.round)(b.y),b}},{key:"centerImage",value:function(){this.imageSize&&this.zoom&&this.setOffset({x:(this.previewSize.w-this.imageSize.w*this.zoom)/2,y:(this.previewSize.h-this.imageSize.h*this.zoom)/2})}},{key:"onZoomSliderChange",value:function(){if(this.imageLoaded){this.zoomSliderPos=Number(this.$zoomSlider.val());var a=this.zoomer.getZoom(this.zoomSliderPos);this.setZoom(a)}}},{key:"enableZoomSlider",value:function(){this.$zoomSlider.removeAttr("disabled"),this.options.onZoomEnabled()}},{key:"disableZoomSlider",value:function(){this.$zoomSlider.attr("disabled",!0),this.options.onZoomDisabled()}},{key:"setupZoomer",value:function(a){this.zoomer.setup({imageSize:this.imageSize,previewSize:this.previewSize,exportZoom:this.options.exportZoom,maxZoom:this.options.maxZoom,minZoom:this.options.minZoom,smallImage:this.options.smallImage}),this.setZoom((0,m.exists)(a)?a:this.zoom),this.isZoomable()?this.enableZoomSlider():this.disableZoomSlider()}},{key:"setZoom",value:function(a){a=this.fixZoom(a);var b=(0,m.round)(this.imageSize.w*a),c=(0,m.round)(this.imageSize.h*a);if(this.imageLoaded){var d=this.zoom,e=this.previewSize.w/2-(this.previewSize.w/2-this.offset.x)*a/d,f=this.previewSize.h/2-(this.previewSize.h/2-this.offset.y)*a/d;this.zoom=a,this.setOffset({x:e,y:f})}else this.zoom=a;this.zoomSliderPos=this.zoomer.getSliderPos(this.zoom),this.$zoomSlider.val(this.zoomSliderPos),this.$preview.css("background-size",""+b+"px "+c+"px"),this.options.imageBackground&&this.$imageBg.css({width:b,height:c})}},{key:"fixZoom",value:function(a){return this.zoomer.fixZoom(a)}},{key:"isZoomable",value:function(){return this.zoomer.isZoomable()}},{key:"getCroppedImageData",value:function(a){if(this.imageSrc){var b={type:"image/png",quality:.75,originalSize:!1,fillBg:"#fff"};a=h["default"].extend({},b,a);var c=a.originalSize?1/this.zoom:this.options.exportZoom,d={w:this.zoom*c*this.imageSize.w,h:this.zoom*c*this.imageSize.h},e=(0,h["default"])("<canvas />").attr({width:this.previewSize.w*c,height:this.previewSize.h*c}).get(0),f=e.getContext("2d");"image/jpeg"===a.type&&(f.fillStyle=a.fillBg,f.fillRect(0,0,e.width,e.height));var g=this.preresizeImage(this.image,d.w,d.h);return f.drawImage(g,this.offset.x*c,this.offset.y*c,d.w,d.h),e.toDataURL(a.type,a.quality)}}},{key:"preresizeImage",value:function(a,b,c){var d=new Image;d.src=a.src;for(var e=document.createElement("canvas"),f=e.getContext("2d"),g=d.width,h=d.height;;){if(g/=2,h/=2,b>g||c>h)break;e.width=g,e.height=h,f.drawImage(d,0,0,g,h),d.src=e.toDataURL()}return d}},{key:"getImageState",value:function(){return{src:this.imageSrc,offset:this.offset,zoom:this.zoom}}},{key:"getImageSrc",value:function(){return this.imageSrc}},{key:"getOffset",value:function(){return this.offset}},{key:"getZoom",value:function(){return this.zoom}},{key:"getImageSize",value:function(){return this.imageSize?{width:this.imageSize.w,height:this.imageSize.h}:null}},{key:"getPreviewSize",value:function(){return{width:this.previewSize.w,height:this.previewSize.h}}},{key:"setPreviewSize",value:function(a){!a||a.width<=0||a.height<=0,this.previewSize={w:a.width,h:a.height},this.$preview.css({width:this.previewSize.w,height:this.previewSize.h}),this.options.imageBackground&&this.$imageBgContainer.css({width:this.previewSize.w+this.imageBgBorderWidthArray[1]+this.imageBgBorderWidthArray[3],height:this.previewSize.h+this.imageBgBorderWidthArray[0]+this.imageBgBorderWidthArray[2]}),this.imageLoaded&&this.setupZoomer()}},{key:"disable",value:function(){this.unbindListeners(),this.disableZoomSlider(),this.$el.addClass(k.CLASS_NAMES.DISABLED)}},{key:"reenable",value:function(){this.bindListeners(),this.enableZoomSlider(),this.$el.removeClass(k.CLASS_NAMES.DISABLED)}},{key:"$",value:function(a){return this.$el?this.$el.find(a):null}}]),a}();b["default"]=n,a.exports=b["default"]},function(a,b){function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),e=function(){function a(){c(this,a),this.minZoom=this.maxZoom=1}return d(a,[{key:"setup",value:function(a){var b=a.imageSize,c=a.previewSize,d=a.exportZoom,e=a.maxZoom,f=a.minZoom,g=a.smallImage,h=c.w/b.w,i=c.h/b.h;"fit"===f?this.minZoom=Math.min(h,i):this.minZoom=Math.max(h,i),"allow"===g&&(this.minZoom=Math.min(this.minZoom,1)),this.maxZoom=Math.max(this.minZoom,e/d)}},{key:"getZoom",value:function(a){return this.minZoom&&this.maxZoom?a*(this.maxZoom-this.minZoom)+this.minZoom:null}},{key:"getSliderPos",value:function(a){return this.minZoom&&this.maxZoom?this.minZoom===this.maxZoom?0:(a-this.minZoom)/(this.maxZoom-this.minZoom):null}},{key:"isZoomable",value:function(){return this.minZoom&&this.maxZoom?this.minZoom!==this.maxZoom:null}},{key:"fixZoom",value:function(a){return Math.max(this.minZoom,Math.min(this.maxZoom,a))}}]),a}();b["default"]=e,a.exports=b["default"]},function(a,b){Object.defineProperty(b,"__esModule",{value:!0});var c="cropit";b.PLUGIN_KEY=c;var d={PREVIEW:"cropit-image-preview",PREVIEW_CONTAINER:"cropit-image-preview-container",FILE_INPUT:"cropit-image-input",ZOOM_SLIDER:"cropit-image-zoom-input",IMAGE_BACKGROUND:"cropit-image-background",IMAGE_BACKGROUND_CONTAINER:"cropit-image-background-container",PREVIEW_HOVERED:"cropit-preview-hovered",DRAG_HOVERED:"cropit-drag-hovered",IMAGE_LOADING:"cropit-image-loading",IMAGE_LOADED:"cropit-image-loaded",DISABLED:"cropit-disabled"};b.CLASS_NAMES=d;var e={IMAGE_FAILED_TO_LOAD:{code:0,message:"Image failed to load."},SMALL_IMAGE:{code:1,message:"Image is too small."}};b.ERRORS=e;var f=function(a){return a.map(function(a){return""+a+".cropit"}).join(" ")},g={PREVIEW:f(["mousedown","mouseup","mouseleave","touchstart","touchend","touchcancel","touchleave"]),PREVIEW_MOVE:f(["mousemove","touchmove"]),ZOOM_INPUT:f(["mousemove","touchmove","change"])};b.EVENTS=g},function(a,b,c){Object.defineProperty(b,"__esModule",{value:!0});var d=c(4),e={elements:[{name:"$preview",description:"The HTML element that displays image preview.",defaultSelector:"."+d.CLASS_NAMES.PREVIEW},{name:"$fileInput",description:"File input element.",defaultSelector:"input."+d.CLASS_NAMES.FILE_INPUT},{name:"$zoomSlider",description:"Range input element that controls image zoom.",defaultSelector:"input."+d.CLASS_NAMES.ZOOM_SLIDER},{name:"$previewContainer",description:"Preview container. Only needed when `imageBackground` is true.",defaultSelector:"."+d.CLASS_NAMES.PREVIEW_CONTAINER}].map(function(a){return a.type="jQuery element",a["default"]="$imageCropper.find('"+a.defaultSelector+"')",a}),values:[{name:"width",type:"number",description:"Width of image preview in pixels. If set, it will override the CSS property.","default":null},{name:"height",type:"number",description:"Height of image preview in pixels. If set, it will override the CSS property.","default":null},{name:"imageBackground",type:"boolean",description:"Whether or not to display the background image beyond the preview area.","default":!1},{name:"imageBackgroundBorderWidth",type:"array or number",description:"Width of background image border in pixels.\n        The four array elements specify the width of background image width on the top, right, bottom, left side respectively.\n        The background image beyond the width will be hidden.\n        If specified as a number, border with uniform width on all sides will be applied.","default":[0,0,0,0]},{name:"exportZoom",type:"number",description:"The ratio between the desired image size to export and the preview size.\n        For example, if the preview size is `300px * 200px`, and `exportZoom = 2`, then\n        the exported image size will be `600px * 400px`.\n        This also affects the maximum zoom level, since the exported image cannot be zoomed to larger than its original size.","default":1},{name:"allowDragNDrop",type:"boolean",description:"When set to true, you can load an image by dragging it from local file browser onto the preview area.","default":!0},{name:"minZoom",type:"string",description:"This options decides the minimal zoom level of the image.\n        If set to `'fill'`, the image has to fill the preview area, i.e. both width and height must not go smaller than the preview area.\n        If set to `'fit'`, the image can shrink further to fit the preview area, i.e. at least one of its edges must not go smaller than the preview area.","default":"fill"},{name:"maxZoom",type:"string",description:"Determines how big the image can be zoomed. E.g. if set to 1.5, the image can be zoomed to 150% of its original size.","default":1},{name:"initialZoom",type:"string",description:"Determines the zoom when an image is loaded.\n        When set to `'min'`, image is zoomed to the smallest when loaded.\n        When set to `'image'`, image is zoomed to 100% when loaded.","default":"min"},{name:"freeMove",type:"boolean",description:"When set to true, you can freely move the image instead of being bound to the container borders","default":!1},{name:"smallImage",type:"string",description:"When set to `'reject'`, `onImageError` would be called when cropit loads an image that is smaller than the container.\n        When set to `'allow'`, images smaller than the container can be zoomed down to its original size, overiding `minZoom` option.\n        When set to `'stretch'`, the minimum zoom of small images would follow `minZoom` option.","default":"reject"},{name:"allowCrossOrigin",type:"boolean",description:"Set to true if you need to crop image served from other domains.","default":!1}],callbacks:[{name:"onFileChange",description:"Called when user selects a file in the select file input."},{name:"onFileReaderError",description:"Called when `FileReader` encounters an error while loading the image file."},{name:"onImageLoading",description:"Called when image starts to be loaded."},{name:"onImageLoaded",description:"Called when image is loaded."},{name:"onImageError",description:"Called when image cannot be loaded."},{name:"onZoomEnabled",description:"Called when image the zoom slider is enabled."},{name:"onZoomDisabled",description:"Called when image the zoom slider is disabled."}].map(function(a){return a.type="function",a})},f=function(a){var b={};return a&&e.elements.forEach(function(c){b[c.name]=a.find(c.defaultSelector)}),e.values.forEach(function(a){b[a.name]=a["default"]}),e.callbacks.forEach(function(a){b[a.name]=function(){}}),b};b.loadDefaults=f,b["default"]=e},function(a,b){Object.defineProperty(b,"__esModule",{value:!0});var c=function(a){return"undefined"!=typeof a};b.exists=c;var d=function(a){return+(Math.round(100*a)+"e-2")};b.round=d}])});