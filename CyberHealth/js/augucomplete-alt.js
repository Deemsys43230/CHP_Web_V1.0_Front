"use strict";!function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("angular")):"function"==typeof define&&define.amd?define(["angular"],t):t(e.angular)}(window,function(e){e.module("angucomplete-alt",[]).directive("angucompleteAlt",["$q","$parse","$http","$sce","$timeout","$templateCache","$interpolate",function(e,t,n,r,l,i,o){function s(t,i,o,s){function y(e,n){e&&("object"==typeof e?(t.searchStr=F(e),b({originalObject:e})):"string"==typeof e&&e.length>0?t.searchStr=e:console&&console.error&&console.error("Tried to set "+(n?"initial":"")+" value of angucomplete to",e,"which is an invalid value"),U(!0))}function R(e){pe=null,t.hideResults(e),document.body.removeEventListener("click",R)}function I(e){return e.which?e.which:e.keyCode}function b(e){"function"==typeof t.selectedObject?t.selectedObject(e):t.selectedObject=e,U(e?!0:!1)}function $(e){return function(n){return t[e]?t[e](n):n}}function D(e){b({originalObject:e}),t.clearSelected&&(t.searchStr=null),Y()}function F(e){return t.titleField.split(",").map(function(t){return q(e,t)}).join(" ")}function q(e,t){var n,r;if(t){n=t.split("."),r=e;for(var l=0;l<n.length;l++)r=r[n[l]]}else r=e;return r}function O(e,n){var l,i,o;return o=new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),e?(e.match&&e.replace||(e=e.toString()),i=e.match(o),l=i?e.replace(o,'<span class="'+t.matchClass+'">'+i[0]+"</span>"):e,r.trustAsHtml(l)):void 0}function U(e){t.notEmpty=e,ae=t.searchStr,t.fieldRequired&&s&&t.inputName&&s[t.inputName].$setValidity(se,e)}function j(e){var n=I(e);if(n!==d&&n!==c)if(n===u||n===g)e.preventDefault();else if(n===a)e.preventDefault(),!t.showDropdown&&t.searchStr&&t.searchStr.length>=ie&&(G(),t.searching=!0,P(t.searchStr));else if(n===p)Y(),t.$apply(function(){le.val(t.searchStr)});else{if(0===ie&&!t.searchStr)return;t.searchStr&&""!==t.searchStr?t.searchStr.length>=ie&&(G(),oe&&l.cancel(oe),t.searching=!0,oe=l(function(){P(t.searchStr)},t.pause)):t.showDropdown=!1,ae&&ae!==t.searchStr&&!t.clearSelected&&t.$apply(function(){b()})}}function H(e){!t.overrideSuggestions||t.selectedObject&&t.selectedObject.originalObject===t.searchStr||(e&&e.preventDefault(),l.cancel(oe),M(),D(t.searchStr))}function N(e){var t=getComputedStyle(e);return e.offsetHeight+parseInt(t.marginTop,10)+parseInt(t.marginBottom,10)}function k(){return ue.getBoundingClientRect().top+parseInt(getComputedStyle(ue).maxHeight,10)}function E(){return i[0].querySelectorAll(".angucomplete-row")[t.currentIndex]}function A(){return E().getBoundingClientRect().top-(ue.getBoundingClientRect().top+parseInt(getComputedStyle(ue).paddingTop,10))}function T(e){ue.scrollTop=ue.scrollTop+e}function L(){var e=t.results[t.currentIndex];t.matchClass?le.val(F(e.originalObject)):le.val(e.title)}function B(e){var n=I(e),r=null,l=null;n===g&&t.results?(t.currentIndex>=0&&t.currentIndex<t.results.length?(e.preventDefault(),t.selectResult(t.results[t.currentIndex])):(H(e),Y()),t.$apply()):n===a&&t.results?(e.preventDefault(),t.currentIndex+1<t.results.length&&t.showDropdown&&(t.$apply(function(){t.currentIndex++,L()}),de&&(r=E(),k()<r.getBoundingClientRect().bottom&&T(N(r))))):n===u&&t.results?(e.preventDefault(),t.currentIndex>=1?(t.$apply(function(){t.currentIndex--,L()}),de&&(l=A(),0>l&&T(l-1))):0===t.currentIndex&&t.$apply(function(){t.currentIndex=-1,le.val(t.searchStr)})):n===h&&(t.results&&t.results.length>0&&t.showDropdown?-1===t.currentIndex&&t.overrideSuggestions?H():(-1===t.currentIndex&&(t.currentIndex=0),t.selectResult(t.results[t.currentIndex]),t.$digest()):t.searchStr&&t.searchStr.length>0&&H())}function V(e){return function(n,r,l,i){r||l||i||(n=n.data),t.searching=!1,Q(q(ee(n),t.remoteUrlDataField),e)}}function _(e,n,r,l){0!==n&&-1!==n&&(n||r||l||(n=e.status),t.remoteUrlErrorCallback?t.remoteUrlErrorCallback(e,n,r,l):console&&console.error&&console.error("http error"))}function M(){ce&&ce.resolve()}function W(r){var l={},i=t.remoteUrl+encodeURIComponent(r);t.remoteUrlRequestFormatter&&(l={params:t.remoteUrlRequestFormatter(r)},i=t.remoteUrl),t.remoteUrlRequestWithCredentials&&(l.withCredentials=!0),M(),ce=e.defer(),l.timeout=ce.promise,n.get(i,l).success(V(r)).error(_)}function z(n){M(),ce=e.defer(),t.remoteApiHandler(n,ce.promise).then(V(n))["catch"](_)}function Y(){t.showDropdown=!1,t.results=[],ue&&(ue.scrollTop=0)}function G(){t.showDropdown=ne,t.currentIndex=t.focusFirst?0:-1,t.results=[]}function J(e){var n,r,l,i,o=t.searchFields.split(","),s=[];for(n=0;n<t.localData.length;n++){for(r=!1,l=0;l<o.length;l++)i=q(t.localData[n],o[l])||"",r=r||i.toString().toLowerCase().indexOf(e.toString().toLowerCase())>=0;r&&(s[s.length]=t.localData[n])}t.searching=!1,Q(s,e)}function K(e,n,r){if(!r)return!1;for(var l in n)if(n[l].toLowerCase()===r.toLowerCase())return t.selectResult(e),!0;return!1}function P(e){!e||e.length<ie||(t.localData?t.$apply(function(){J(e)}):t.remoteApiHandler?z(e):W(e))}function Q(e,n){var r,l,i,o,s,a;if(e&&e.length>0)for(t.results=[],r=0;r<e.length;r++)t.titleField&&""!==t.titleField&&(o=s=F(e[r])),l="",t.descriptionField&&(l=a=q(e[r],t.descriptionField)),i="",t.imageField&&(i=q(e[r],t.imageField)),t.matchClass&&(s=O(o,n),a=O(l,n)),t.results[t.results.length]={title:s,description:a,image:i,originalObject:e[r]};else t.results=[];t.autoMatch&&1===t.results.length&&K(t.results[0],{title:o,desc:l||""},t.searchStr)?t.showDropdown=!1:0!==t.results.length||re?t.showDropdown=!0:t.showDropdown=!1}function X(){t.localData?Q(t.localData,""):t.remoteApiHandler?z(""):W("")}var Z,ee,te,ne,re,le=i.find("input"),ie=f,oe=null,se=w,ae=null,ce=null,ue=i[0].querySelector(".angucomplete-dropdown"),de=!1,pe=null;i.on("mousedown",function(e){e.target.id?(pe=e.target.id,pe===t.id+"_dropdown"&&document.body.addEventListener("click",R)):pe=e.target.className}),t.currentIndex=t.focusFirst?0:null,t.searching=!1,te=t.$watch("initialValue",function(e){e&&(te(),y(e,!0))}),t.$watch("fieldRequired",function(e,n){e!==n&&(e?U(ae&&-1!==t.currentIndex?!0:!1):s[t.inputName].$setValidity(se,!0))}),t.$on("angucomplete-alt:clearInput",function(e,n){n&&n!==t.id||(t.searchStr=null,b(),U(!1),Y())}),t.$on("angucomplete-alt:changeInput",function(e,n,r){n&&n===t.id&&y(r)}),t.onFocusHandler=function(){t.focusIn&&t.focusIn(),0!==ie||t.searchStr&&0!==t.searchStr.length||(t.currentIndex=t.focusFirst?0:t.currentIndex,t.showDropdown=!0,X())},t.hideResults=function(){pe&&(pe===t.id+"_dropdown"||pe.indexOf("angucomplete")>=0)?pe=null:(Z=l(function(){Y(),t.$apply(function(){t.searchStr&&t.searchStr.length>0&&le.val(t.searchStr)})},S),M(),t.focusOut&&t.focusOut(),t.overrideSuggestions&&t.searchStr&&t.searchStr.length>0&&-1===t.currentIndex&&H())},t.resetHideResults=function(){Z&&l.cancel(Z)},t.hoverRow=function(e){t.currentIndex=e},t.selectResult=function(e){t.matchClass&&(e.title=F(e.originalObject),e.description=q(e.originalObject,t.descriptionField)),t.clearSelected?t.searchStr=null:t.searchStr=e.title,b(e),Y()},t.inputChangeHandler=function(e){return e.length<ie?(M(),Y()):0===e.length&&0===ie&&(t.searching=!1,X()),t.inputChanged&&(e=t.inputChanged(e)),e},t.fieldRequiredClass&&""!==t.fieldRequiredClass&&(se=t.fieldRequiredClass),t.minlength&&""!==t.minlength&&(ie=parseInt(t.minlength,10)),t.pause||(t.pause=v),t.clearSelected||(t.clearSelected=!1),t.overrideSuggestions||(t.overrideSuggestions=!1),t.fieldRequired&&s&&U(t.initialValue?!0:!1),t.inputType=o.type?o.type:"text",t.textSearching=o.textSearching?o.textSearching:x,t.textNoResults=o.textNoResults?o.textNoResults:C,ne="false"===t.textSearching?!1:!0,re="false"===t.textNoResults?!1:!0,t.maxlength=o.maxlength?o.maxlength:m,le.on("keydown",B),le.on("keyup",j),ee=$("remoteUrlResponseFormatter"),t.$on("$destroy",function(){U(!0)}),l(function(){var e=getComputedStyle(ue);de=e.maxHeight&&"auto"===e.overflowY})}var a=40,c=39,u=38,d=37,p=27,g=13,h=9,f=3,m=524288,v=500,S=200,w="autocomplete-required",x="Searching...",C="No results found",y="/angucomplete-alt/index.html";return i.put(y,'<div class="angucomplete-holder" ng-class="{\'angucomplete-dropdown-visible\': showDropdown}">  <input id="{{id}}_value" name="{{inputName}}" ng-class="{\'angucomplete-input-not-empty\': notEmpty}" ng-model="searchStr" ng-disabled="disableInput" type="{{inputType}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" ng-focus="onFocusHandler()" class="{{inputClass}}" ng-focus="resetHideResults()" ng-blur="hideResults($event)" autocapitalize="off" autocorrect="off" autocomplete="off" ng-change="inputChangeHandler(searchStr)"/>  <div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-show="showDropdown">    <div class="angucomplete-searching" ng-show="searching" ng-bind="textSearching"></div>    <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" ng-bind="textNoResults"></div>    <div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseenter="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">      <div ng-if="imageField" class="angucomplete-image-holder">        <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>        <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>      </div>      <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>      <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>      <div ng-if="matchClass && result.description && result.description != \'\'" class="angucomplete-description" ng-bind-html="result.description"></div>      <div ng-if="!matchClass && result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>    </div>  </div></div>'),{restrict:"EA",require:"^?form",scope:{selectedObject:"=",disableInput:"=",initialValue:"=",localData:"=",remoteUrlRequestFormatter:"=",remoteUrlRequestWithCredentials:"@",remoteUrlResponseFormatter:"=",remoteUrlErrorCallback:"=",remoteApiHandler:"=",id:"@",type:"@",placeholder:"@",remoteUrl:"@",remoteUrlDataField:"@",titleField:"@",descriptionField:"@",imageField:"@",inputClass:"@",pause:"@",searchFields:"@",minlength:"@",matchClass:"@",clearSelected:"@",overrideSuggestions:"@",fieldRequired:"=",fieldRequiredClass:"@",inputChanged:"=",autoMatch:"@",focusOut:"&",focusIn:"&",inputName:"@",focusFirst:"@"},templateUrl:function(e,t){return t.templateUrl||y},compile:function(e){var t=o.startSymbol(),n=o.endSymbol();if("{{"!==t||"}}"!==n){var r=e.html().replace(/\{\{/g,t).replace(/\}\}/g,n);e.html(r)}return s}}}])});