!function(a){a.fn.tipuedrop=function(b){var c=a.extend({show:3,speed:300,newWindow:!1,mode:"static",contentLocation:"search/tipuedrop_content.json"},b);return this.each(function(){function b(b){if(b.val()){for(var e=0,f=0;f<d.pages.length;f++){var g=new RegExp(b.val(),"i");if((d.pages[f].title.search(g)!=-1||d.pages[f].text.search(g)!=-1)&&e<c.show){if(0==e)var h='<div class="tipue_drop_box"><div id="tipue_drop_wrapper">';h+='<a href="'+d.pages[f].url+'"',c.newWindow&&(h+=' target="_blank"'),h+='><div class="tipue_drop_item"><div class="tipue_drop_left"><img src="'+d.pages[f].thumb+'" class="tipue_drop_image"></div><div class="tipue_drop_right">'+d.pages[f].title+"</div></div></a>",e++}}0!=e&&(h+="</div></div>",a("#tipue_drop_content").html(h),a("#tipue_drop_content").fadeIn(c.speed))}else a("#tipue_drop_content").fadeOut(c.speed)}var d={pages:[]};a.ajaxSetup({async:!1}),"json"==c.mode&&a.getJSON(c.contentLocation).done(function(b){d=a.extend({},b)}),"static"==c.mode&&(d=a.extend({},tipuedrop)),a(this).keyup(function(c){b(a(this))}),a("html").click(function(){a("#tipue_drop_content").fadeOut(c.speed)})})}}(jQuery),function(a){a.fn.tipuedrop1=function(b){var c=a.extend({show:3,speed:300,newWindow:!1,mode:"static",contentLocation:"search/tipuedrop_content.json"},b);return this.each(function(){function b(b){if(b.val()){for(var e=0,f=0;f<d.pages.length;f++){var g=new RegExp(b.val(),"i");if((d.pages[f].title.search(g)!=-1||d.pages[f].text.search(g)!=-1)&&e<c.show){if(0==e)var h='<div class="tipue_drop_box"><div id="tipue_drop_wrapper1">';h+='<a href="'+d.pages[f].url+'"',c.newWindow&&(h+=' target="_blank"'),h+='><div class="tipue_drop_item"><div class="tipue_drop_left"><img src="'+d.pages[f].thumb+'" class="tipue_drop_image"></div><div class="tipue_drop_right">'+d.pages[f].title+"</div></div></a>",e++}}0!=e&&(h+="</div></div>",a("#tipue_drop_content1").html(h),a("#tipue_drop_content1").fadeIn(c.speed))}else a("#tipue_drop_content1").fadeOut(c.speed)}var d={pages:[]};a.ajaxSetup({async:!1}),"json"==c.mode&&a.getJSON(c.contentLocation).done(function(b){d=a.extend({},b)}),"static"==c.mode&&(d=a.extend({},tipuedrop)),a(this).keyup(function(c){b(a(this))}),a("html").click(function(){a("#tipue_drop_content1").fadeOut(c.speed)})})}}(jQuery),function(a){a.fn.tipuedrop2=function(b){var c=a.extend({show:3,speed:300,newWindow:!1,mode:"static",contentLocation:"search/tipuedrop_content.json"},b);return this.each(function(){function b(b){if(b.val()){for(var e=0,f=0;f<d.pages.length;f++){var g=new RegExp(b.val(),"i");if((d.pages[f].title.search(g)!=-1||d.pages[f].text.search(g)!=-1)&&e<c.show){if(0==e)var h='<div class="tipue_drop_box"><div id="tipue_drop_wrapper2">';h+='<a href="'+d.pages[f].url+'"',c.newWindow&&(h+=' target="_blank"'),h+='><div class="tipue_drop_item"><div class="tipue_drop_left"><img src="'+d.pages[f].thumb+'" class="tipue_drop_image"></div><div class="tipue_drop_right">'+d.pages[f].title+"</div></div></a>",e++}}0!=e&&(h+="</div></div>",a("#tipue_drop_content2").html(h),a("#tipue_drop_content2").fadeIn(c.speed))}else a("#tipue_drop_content2").fadeOut(c.speed)}var d={pages:[]};a.ajaxSetup({async:!1}),"json"==c.mode&&a.getJSON(c.contentLocation).done(function(b){d=a.extend({},b)}),"static"==c.mode&&(d=a.extend({},tipuedrop)),a(this).keyup(function(c){b(a(this))}),a("html").click(function(){a("#tipue_drop_content2").fadeOut(c.speed)})})}}(jQuery),function(a){a.fn.tipuedrop3=function(b){var c=a.extend({show:3,speed:300,newWindow:!1,mode:"static",contentLocation:"search/tipuedrop_content.json"},b);return this.each(function(){function b(b){if(b.val()){for(var e=0,f=0;f<d.pages.length;f++){var g=new RegExp(b.val(),"i");if((d.pages[f].title.search(g)!=-1||d.pages[f].text.search(g)!=-1)&&e<c.show){if(0==e)var h='<div class="tipue_drop_box"><div id="tipue_drop_wrapper3">';h+='<a href="'+d.pages[f].url+'"',c.newWindow&&(h+=' target="_blank"'),h+='><div class="tipue_drop_item"><div class="tipue_drop_left"><img src="'+d.pages[f].thumb+'" class="tipue_drop_image"></div><div class="tipue_drop_right">'+d.pages[f].title+"</div></div></a>",e++}}0!=e&&(h+="</div></div>",a("#tipue_drop_content3").html(h),a("#tipue_drop_content3").fadeIn(c.speed))}else a("#tipue_drop_content3").fadeOut(c.speed)}var d={pages:[]};a.ajaxSetup({async:!1}),"json"==c.mode&&a.getJSON(c.contentLocation).done(function(b){d=a.extend({},b)}),"static"==c.mode&&(d=a.extend({},tipuedrop)),a(this).keyup(function(c){b(a(this))}),a("html").click(function(){a("#tipue_drop_content3").fadeOut(c.speed)})})}}(jQuery),function(a){a.fn.tipuedrop4=function(b){var c=a.extend({show:4,speed:300,newWindow:!1,mode:"static",contentLocation:"search/tipuedrop_content.json"},b);return this.each(function(){function b(b){if(b.val()){for(var e=0,f=0;f<d.pages.length;f++){var g=new RegExp(b.val(),"i");if((d.pages[f].title.search(g)!=-1||d.pages[f].text.search(g)!=-1)&&e<c.show){if(0==e)var h='<div class="tipue_drop_box"><div id="tipue_drop_wrapper4">';h+='<a href="'+d.pages[f].url+'"',c.newWindow&&(h+=' target="_blank"'),h+='><div class="tipue_drop_item"><div class="tipue_drop_left"><img src="'+d.pages[f].thumb+'" class="tipue_drop_image"></div><div class="tipue_drop_right">'+d.pages[f].title+"</div></div></a>",e++}}0!=e&&(h+="</div></div>",a("#tipue_drop_content4").html(h),a("#tipue_drop_content4").fadeIn(c.speed))}else a("#tipue_drop_content4").fadeOut(c.speed)}var d={pages:[]};a.ajaxSetup({async:!1}),"json"==c.mode&&a.getJSON(c.contentLocation).done(function(b){d=a.extend({},b)}),"static"==c.mode&&(d=a.extend({},tipuedrop)),a(this).keyup(function(c){b(a(this))}),a("html").click(function(){a("#tipue_drop_content4").fadeOut(c.speed)})})}}(jQuery);