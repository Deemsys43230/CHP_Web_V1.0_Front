!function(t){"use strict";function e(e,n){this.itemsArray=[],this.$element=t(e),this.$element.hide(),this.isSelect="SELECT"===e.tagName,this.multiple=this.isSelect&&e.hasAttribute("multiple"),this.objectItems=n&&n.itemValue,this.placeholderText=e.hasAttribute("placeholder")?this.$element.attr("placeholder"):"",this.inputSize=Math.max(1,this.placeholderText.length),this.$container=t('<div class="bootstrap-tagsinput"></div>'),this.$input=t('<input type="text" placeholder="'+this.placeholderText+'"/>').appendTo(this.$container),this.$element.after(this.$container);var i=(this.inputSize<3?3:this.inputSize)+"em";this.$input.get(0).style.cssText="width: "+i+" !important;",this.build(n)}function n(t,e){if("function"!=typeof t[e]){var n=t[e];t[e]=function(t){return t[n]}}}function i(t,e){if("function"!=typeof t[e]){var n=t[e];t[e]=function(){return n}}}function a(t){return t?u.text(t).html():""}function r(t){var e=0;if(document.selection){t.focus();var n=document.selection.createRange();n.moveStart("character",-t.value.length),e=n.text.length}else(t.selectionStart||"0"==t.selectionStart)&&(e=t.selectionStart);return e}function o(e,n){var i=!1;return t.each(n,function(t,n){if("number"==typeof n&&e.which===n)return i=!0,!1;if(e.which===n.which){var a=!n.hasOwnProperty("altKey")||e.altKey===n.altKey,r=!n.hasOwnProperty("shiftKey")||e.shiftKey===n.shiftKey,o=!n.hasOwnProperty("ctrlKey")||e.ctrlKey===n.ctrlKey;if(a&&r&&o)return i=!0,!1}}),i}var s={tagClass:function(){return"label label-info"},itemValue:function(t){return t?t.toString():t},itemText:function(t){return this.itemValue(t)},freeInput:!0,addOnBlur:!0,maxTags:void 0,maxChars:void 0,confirmKeys:[13,44],onTagExists:function(t,e){e.hide().fadeIn()},trimValue:!1,allowDuplicates:!1};e.prototype={constructor:e,add:function(e,n){var i=this;if(!(i.options.maxTags&&i.itemsArray.length>=i.options.maxTags)&&(e===!1||e)){if("string"==typeof e&&i.options.trimValue&&(e=t.trim(e)),"object"==typeof e&&!i.objectItems)throw"Can't add objects when itemValue option is not set";if(!e.toString().match(/^\s*$/)){if(i.isSelect&&!i.multiple&&i.itemsArray.length>0&&i.remove(i.itemsArray[0]),"string"==typeof e&&"INPUT"===this.$element[0].tagName){var r=e.split(",");if(r.length>1){for(var o=0;o<r.length;o++)this.add(r[o],!0);return void(n||i.pushVal())}}var s=i.options.itemValue(e),u=i.options.itemText(e),l=i.options.tagClass(e),p=t.grep(i.itemsArray,function(t){return i.options.itemValue(t)===s})[0];if(!p||i.options.allowDuplicates){if(!(i.items().toString().length+e.length+1>i.options.maxInputLength)){var c=t.Event("beforeItemAdd",{item:e,cancel:!1});if(i.$element.trigger(c),!c.cancel){i.itemsArray.push(e);var h=t('<span class="tag '+a(l)+'">'+a(u)+'<span data-role="remove"></span></span>');if(h.data("item",e),i.findInputWrapper().before(h),h.after(" "),i.isSelect&&!t('option[value="'+encodeURIComponent(s)+'"]',i.$element)[0]){var m=t("<option selected>"+a(u)+"</option>");m.data("item",e),m.attr("value",s),i.$element.append(m)}n||i.pushVal(),(i.options.maxTags===i.itemsArray.length||i.items().toString().length===i.options.maxInputLength)&&i.$container.addClass("bootstrap-tagsinput-max"),i.$element.trigger(t.Event("itemAdded",{item:e}))}}}else if(i.options.onTagExists){var f=t(".tag",i.$container).filter(function(){return t(this).data("item")===p});i.options.onTagExists(e,f)}}}},remove:function(e,n){var i=this;if(i.objectItems&&(e="object"==typeof e?t.grep(i.itemsArray,function(t){return i.options.itemValue(t)==i.options.itemValue(e)}):t.grep(i.itemsArray,function(t){return i.options.itemValue(t)==e}),e=e[e.length-1]),e){var a=t.Event("beforeItemRemove",{item:e,cancel:!1});if(i.$element.trigger(a),a.cancel)return;t(".tag",i.$container).filter(function(){return t(this).data("item")===e}).remove(),t("option",i.$element).filter(function(){return t(this).data("item")===e}).remove(),-1!==t.inArray(e,i.itemsArray)&&i.itemsArray.splice(t.inArray(e,i.itemsArray),1)}n||i.pushVal(),i.options.maxTags>i.itemsArray.length&&i.$container.removeClass("bootstrap-tagsinput-max"),i.$element.trigger(t.Event("itemRemoved",{item:e}))},removeAll:function(){var e=this;for(t(".tag",e.$container).remove(),t("option",e.$element).remove();e.itemsArray.length>0;)e.itemsArray.pop();e.pushVal()},refresh:function(){var e=this;t(".tag",e.$container).each(function(){var n=t(this),i=n.data("item"),r=e.options.itemValue(i),o=e.options.itemText(i),s=e.options.tagClass(i);if(n.attr("class",null),n.addClass("tag "+a(s)),n.contents().filter(function(){return 3==this.nodeType})[0].nodeValue=a(o),e.isSelect){var u=t("option",e.$element).filter(function(){return t(this).data("item")===i});u.attr("value",r)}})},items:function(){return this.itemsArray},pushVal:function(){var e=this,n=t.map(e.items(),function(t){return e.options.itemValue(t).toString()});e.$element.val(n,!0).trigger("change")},build:function(e){var a=this;if(a.options=t.extend({},s,e),a.objectItems&&(a.options.freeInput=!1),n(a.options,"itemValue"),n(a.options,"itemText"),i(a.options,"tagClass"),a.options.typeahead){var u=a.options.typeahead||{};i(u,"source"),a.$input.typeahead(t.extend({},u,{source:function(e,n){function i(t){for(var e=[],i=0;i<t.length;i++){var o=a.options.itemText(t[i]);r[o]=t[i],e.push(o)}n(e)}this.map={};var r=this.map,o=u.source(e);t.isFunction(o.success)?o.success(i):t.isFunction(o.then)?o.then(i):t.when(o).then(i)},updater:function(t){a.add(this.map[t])},matcher:function(t){return-1!==t.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(t){return t.sort()},highlighter:function(t){var e=new RegExp("("+this.query+")","gi");return t.replace(e,"<strong>$1</strong>")}}))}if(a.options.typeaheadjs){var l=a.options.typeaheadjs||{};a.$input.typeahead(null,l).on("typeahead:selected",t.proxy(function(t,e){l.valueKey?a.add(e[l.valueKey]):a.add(e),a.$input.typeahead("val","")},a))}a.$container.on("click",t.proxy(function(){a.$element.attr("disabled")||a.$input.removeAttr("disabled"),a.$input.focus()},a)),a.options.addOnBlur&&a.options.freeInput&&a.$input.on("focusout",t.proxy(function(){0===t(".typeahead, .twitter-typeahead",a.$container).length&&(a.add(a.$input.val()),a.$input.val(""))},a)),a.$container.on("keydown","input",t.proxy(function(e){var n=t(e.target),i=a.findInputWrapper();if(a.$element.attr("disabled"))return void a.$input.attr("disabled","disabled");switch(e.which){case 8:if(0===r(n[0])){var o=i.prev();o&&a.remove(o.data("item"))}break;case 46:if(0===r(n[0])){var s=i.next();s&&a.remove(s.data("item"))}break;case 37:var u=i.prev();0===n.val().length&&u[0]&&(u.before(i),n.focus());break;case 39:var l=i.next();0===n.val().length&&l[0]&&(l.after(i),n.focus())}var p=n.val().length;Math.ceil(p/5);n.attr("size",Math.max(this.inputSize,n.val().length))},a)),a.$container.on("keypress","input",t.proxy(function(e){var n=t(e.target);if(a.$element.attr("disabled"))return void a.$input.attr("disabled","disabled");var i=n.val(),r=a.options.maxChars&&i.length>=a.options.maxChars;a.options.freeInput&&(o(e,a.options.confirmKeys)||r)&&(a.add(r?i.substr(0,a.options.maxChars):i),n.val(""),e.preventDefault());var s=n.val().length;Math.ceil(s/5);n.attr("size",Math.max(this.inputSize,n.val().length))},a)),a.$container.on("click","[data-role=remove]",t.proxy(function(e){a.$element.attr("disabled")||a.remove(t(e.target).closest(".tag").data("item"))},a)),a.options.itemValue===s.itemValue&&("INPUT"===a.$element[0].tagName?a.add(a.$element.val()):t("option",a.$element).each(function(){a.add(t(this).attr("value"),!0)}))},destroy:function(){var t=this;t.$container.off("keypress","input"),t.$container.off("click","[role=remove]"),t.$container.remove(),t.$element.removeData("tagsinput"),t.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var e=this.$input[0],n=this.$container[0];e&&e.parentNode!==n;)e=e.parentNode;return t(e)}},t.fn.tagsinput=function(n,i){var a=[];return this.each(function(){var r=t(this).data("tagsinput");if(r)if(n||i){if(void 0!==r[n]){var o=r[n](i);void 0!==o&&a.push(o)}}else a.push(r);else r=new e(this,n),t(this).data("tagsinput",r),a.push(r),"SELECT"===this.tagName&&t("option",t(this)).attr("selected","selected"),t(this).val(t(this).val())}),"string"==typeof n?a.length>1?a:a[0]:a},t.fn.tagsinput.Constructor=e;var u=t("<div />");t(function(){t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})}(window.jQuery);