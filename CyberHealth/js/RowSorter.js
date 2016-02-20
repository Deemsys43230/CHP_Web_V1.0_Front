!function(t,o){"use strict";"function"==typeof define&&define.amd?define("RowSorter",o):"object"==typeof exports?module.exports=o():t.RowSorter=o()}(this,function(){"use strict";function t(o,s){if(!(this instanceof t))return new t(o,s);if("string"==typeof o&&(o=e(o)),i(o,"table")===!1)throw new Error("Table not found.");return o[m]instanceof t?o[m]:(this._options=_(b,s),this._table=o,this._tbody=o,this._rows=[],this._lastY=!1,this._draggingRow=null,this._firstTouch=!0,this._lastSort=null,this._ended=!0,this._b_mousedown=this._mousedown.bind(this),this._b_mousemove=this._mousemove.bind(this),this._b_mouseup=this._mouseup.bind(this),this._b_touchstart=this._touchstart.bind(this),this._b_touchmove=this._touchmove.bind(this),this._b_touchend=this._touchend.bind(this),this._touchId=null,this._table[m]=this,void this.init())}function o(o){return o instanceof t?o:("string"==typeof o&&(o=e(o)),i(o,"table")&&m in o&&o[m]instanceof t?o[m]:null)}function e(t){var o=c(document,t);return o.length>0&&i(o[0],"table")?o[0]:null}function i(t,o){return t&&"object"==typeof t&&"nodeName"in t&&t.nodeName===o.toUpperCase()}function s(t,o,e){var i=t.parentNode;1===e?o.nextSibling?i.insertBefore(t,o.nextSibling):i.appendChild(t):-1===e&&i.insertBefore(t,o)}function n(t,o){for(var e=t.rows,i=e.length,s=0;i>s;s++)if(o===e[s])return s;return-1}function r(t,o,e){t.attachEvent?t.attachEvent("on"+o,e):t.addEventListener(o,e,!1)}function h(t,o,e){t.detachEvent?t.detachEvent("on"+o,e):t.removeEventListener(o,e,!1)}function a(t,o){if(o=o.trim(),""===o)return!1;if(-1!==o.indexOf(" ")){for(var e=o.replace(/\s+/g," ").split(" "),i=0,s=e.length;s>i;i++)if(a(t,e[i])===!1)return!1;return!0}return t.classList?!!t.classList.contains(o):!!t.className.match(new RegExp("(\\s|^)"+o+"(\\s|$)"))}function u(t,o){if(o=o.trim(),""!==o)if(-1===o.indexOf(" "))a(t,o)===!1&&(t.classList?t.classList.add(o):t.className+=" "+o);else for(var e=o.replace(/\s+/g," ").split(" "),i=0,s=e.length;s>i;i++)u(t,e[i])}function l(t,o){if(o=o.trim(),""!==o)if(-1===o.indexOf(" "))a(t,o)&&(t.classList?t.classList.remove(o):t.className=t.className.replace(new RegExp("(\\s|^)"+o+"(\\s|$)")," "));else for(var e=o.replace(/\s+/g," ").split(" "),i=0,s=e.length;s>i;i++)l(t,e[i])}function _(t,o){if(f)return f.extend({},t,o);var e,i={};for(e in t)t.hasOwnProperty(e)&&(i[e]=t[e]);if(o&&"[object Object]"===Object.prototype.toString.call(o))for(e in o)o.hasOwnProperty(e)&&(i[e]=o[e]);return i}function c(t,o){return f?f.makeArray(f(t).find(o)):t.querySelectorAll(o)}function p(t,o){var e=0,i=20,s=t;for(o=o.toLowerCase();s.tagName&&s.tagName.toLowerCase()!==o;){if(e>i||!s.parentNode)return null;s=s.parentNode,e++}return s}function d(t,o){for(var e=0,i=o.length;i>e;e++)if(t===o[e])return e;return-1}String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var o=Array.prototype.slice.call(arguments,1),e=this,i=function(){},s=function(){return e.apply(this instanceof i?this:t,o.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(i.prototype=this.prototype),s.prototype=new i,s});var f=window.jQuery||!1,g=!!("ontouchstart"in document),m="data-rowsorter",b={handler:null,tbody:!0,tableClass:"sorting-table",dragClass:"sorting-row",stickTopRows:0,stickBottomRows:0,onDragStart:null,onDrop:null};return t.prototype.init=function(){if(this._options.tbody){var t=this._table.getElementsByTagName("tbody");t.length>0&&(this._tbody=t[0])}if("function"!=typeof this._options.onDragStart&&(this._options.onDragStart=null),"function"!=typeof this._options.onDrop&&(this._options.onDrop=null),("number"!=typeof this._options.stickTopRows||this._options.stickTopRows<0)&&(this._options.stickTopRows=0),("number"!=typeof this._options.stickBottomRows||this._options.stickBottomRows<0)&&(this._options.stickBottomRows=0),r(this._table,"mousedown",this._b_mousedown),r(document,"mouseup",this._b_mouseup),g&&(r(this._table,"touchstart",this._b_touchstart),r(this._table,"touchend",this._b_touchend)),"onselectstart"in document){var o=this;r(document,"selectstart",function(t){var e=t||window.event;return null!==o._draggingRow?(e.preventDefault?e.preventDefault():e.returnValue=!1,!1):void 0})}},t.prototype._mousedown=function(t){var o=t||window.event;return this._start(o.target||o.srcElement,o.clientY)?(o.preventDefault?o.preventDefault():o.returnValue=!1,!1):!0},t.prototype._touchstart=function(t){if(1===t.touches.length){var o=t.touches[0],e=document.elementFromPoint(o.clientX,o.clientY);if(this._touchId=o.identifier,this._start(e,o.clientY))return t.preventDefault?t.preventDefault():t.returnValue=!1,!1}return!0},t.prototype._start=function(t,o){if(this._draggingRow&&this._end(),this._rows=this._tbody.rows,this._rows.length<2)return!1;if(this._options.handler){var e=c(this._table,this._options.handler);if(!e||-1===d(t,e))return!1}var i=p(t,"tr"),s=n(this._tbody,i);return-1===s||this._options.stickTopRows>0&&s<this._options.stickTopRows||this._options.stickBottomRows>0&&s>=this._rows.length-this._options.stickBottomRows?!1:(this._draggingRow=i,this._options.tableClass&&u(this._table,this._options.tableClass),this._options.dragClass&&u(this._draggingRow,this._options.dragClass),this._oldIndex=s,this._options.onDragStart&&this._options.onDragStart(this._tbody,this._draggingRow,this._oldIndex),this._lastY=o,this._ended=!1,r(this._table,"mousemove",this._b_mousemove),g&&r(this._table,"touchmove",this._b_touchmove),!0)},t.prototype._mousemove=function(t){var o=t||window.event;return this._move(o.target||o.srcElement,o.clientY),!0},t.prototype._touchmove=function(t){if(1===t.touches.length){var o=t.touches[0],e=document.elementFromPoint(o.clientX,o.clientY);this._touchId===o.identifier&&this._move(e,o.clientY)}return!0},t.prototype._move=function(t,o){if(this._draggingRow){var e=o>this._lastY?1:o<this._lastY?-1:0;if(0!==e){var i=p(t,"tr");if(i&&i!==this._draggingRow&&-1!==d(i,this._rows)){var r=!0;if(this._options.stickTopRows>0||this._options.stickBottomRows>0){var h=n(this._tbody,i);(this._options.stickTopRows>0&&h<this._options.stickTopRows||this._options.stickBottomRows>0&&h>=this._rows.length-this._options.stickBottomRows)&&(r=!1)}r&&s(this._draggingRow,i,e),this._lastY=o}}}},t.prototype._mouseup=function(){this._end()},t.prototype._touchend=function(t){t.changedTouches.length>0&&this._touchId===t.changedTouches[0].identifier&&this._end()},t.prototype._end=function(){if(!this._draggingRow)return!0;this._options.tableClass&&l(this._table,this._options.tableClass),this._options.dragClass&&l(this._draggingRow,this._options.dragClass);var t=n(this._tbody,this._draggingRow);if(t!==this._oldIndex){var o=this._lastSort;this._lastSort={previous:o,newIndex:t,oldIndex:this._oldIndex},this._options.onDrop&&this._options.onDrop(this._tbody,this._draggingRow,t,this._oldIndex)}this._draggingRow=null,this._lastY=!1,this._touchId=null,this._ended=!0,h(this._table,"mousemove",this._b_mousemove),g&&h(this._table,"touchmove",this._b_touchmove)},t.prototype.revert=function(){if(null!==this._lastSort){var t=this._lastSort,o=t.oldIndex,e=t.newIndex,i=this._tbody.rows,s=i.length-1;i.length>1&&(s>o?this._tbody.insertBefore(i[e],i[o+(e>o?0:1)]):this._tbody.appendChild(i[e])),this._lastSort=t.previous}},t.prototype.destroy=function(){this._table[m]=null,this._ended===!1&&this._end(),h(this._table,"mousedown",this._b_mousedown),h(document,"mouseup",this._b_mouseup),g&&(h(this._table,"touchstart",this._b_touchstart),h(this._table,"touchend",this._b_touchend))},t.revert=function(t,e){var i=o(t);if(null===i&&e===!1)throw new Error("Table not found.");i&&i.revert()},t.destroy=function(t,e){var i=o(t);if(null===i&&e===!1)throw new Error("Table not found.");i&&i.destroy()},f&&(f.fn.extend({rowSorter:function(o){var e=[];return this.each(function(i,s){e.push(new t(s,o))}),1===e.length?e[0]:e}}),f.rowSorter={revert:t.revert,destroy:t.destroy}),t});