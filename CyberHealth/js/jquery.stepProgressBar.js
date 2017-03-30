!function(a){function b(b,c){this.el=b,this.$el=a(b),this.instanceId=Math.round((new Date).getTime()+100*Math.random()),this.settings=a.extend({},a.fn[d].defaults,c),this.stepFields=["value","topLabel","bottomLabel","mouseOver","click"],this.init()}function c(a,b){return a.value-b.value}var d="stepProgressBar";b.prototype={init:function(){this._buildBar(),this.settings.steps&&this.settings.steps.length>0&&(this._buildStepsWrapper(),this._updateSteps())},destroy:function(){},getCurrentValue:function(){return this.settings.currentValue},setCurrentValue:function(a){this.settings.currentValue=a,this._updateProgress(),this._findNextStep(),this._updateNextStepElm()},findStep:function(a){if(!e(a)&&!e(this.settings.steps)&&this.settings.steps.length>0)for(var b=0;b<this.settings.steps.length;b++)if(this.settings.steps[b].value==a)return this.settings.steps[b]},addStep:function(a){e(a)||e(a.value)||(this.settings.steps.push(a),this._updateSteps())},removeStep:function(a){if(!e(a)&&!e(this.settings.steps)&&this.settings.steps.length>0){for(var b=0;b<this.settings.steps.length;b++)if(this.settings.steps[b].value==a)return void this._deleteStep(this.settings.steps[b],b);this._updateSteps()}},_buildBar:function(){this.$el.addClass("step-progressbar-container"),this.settings.rounded&&this.$el.addClass("step-progressbar-rounded"),this.topLabelContainer=a("<div>"),this.topLabelContainer.addClass("step-progressbar-toplabels"),this.$el.append(this.topLabelContainer),this.barContainer=a("<div>"),this.barContainer.addClass("step-progressbar-bar-wrapper"),this.$el.append(this.barContainer),this.barElm=a("<span>"),this.barElm.addClass("step-progressbar-bar"),this.barContainer.append(this.barElm),this.progressElm=a("<span>"),this.progressElm.addClass("step-progressbar-progress"),this.barElm.append(this.progressElm),this.bottomLabelContainer=a("<div>"),this.bottomLabelContainer.addClass("step-progressbar-bottomlabels"),this.$el.append(this.bottomLabelContainer)},_buildStepsWrapper:function(){this.stepsWrapper=a("<span>"),this.stepsWrapper.addClass("step-progressbar-steps-wrapper"),this.barElm.append(this.stepsWrapper),this.stepsContainer=a("<span>"),this.stepsContainer.addClass("step-progressbar-steps"),this.stepsWrapper.append(this.stepsContainer),this.toplabelWrapper=a("<span>"),this.toplabelWrapper.addClass("step-progressbar-labels-wrapper"),this.topLabelContainer.append(this.toplabelWrapper),this.bottomlabelWrapper=a("<span>"),this.bottomlabelWrapper.addClass("step-progressbar-labels-wrapper"),this.bottomLabelContainer.append(this.bottomlabelWrapper)},_calcCurrentProgressValue:function(){if(e(this.settings.steps)||this.settings.steps&&this.settings.steps.length<=0)this.progressValue=100;else{var a=this._retrieveMinAndMaxSteps(),b=a.minValue,c=a.maxValue;this.progressValue=f(this.settings.currentValue,b,c)}return this.progressValue},_calcStepsProgressValues:function(){if(!(e(this.settings.steps)||this.settings.steps&&this.settings.steps.length<=0)){for(var a=this._retrieveMinAndMaxSteps(),b=a.minValue,c=a.maxValue,d=0;d<this.settings.steps.length;d++){var g=this.settings.steps[d];g.progressValue=f(g.value,b,c)}return this.settings.steps}},_retrieveMinAndMaxSteps:function(){if(!(e(this.settings.steps)||this.settings.steps&&this.settings.steps.length<=0)){for(var a,b,c,d,f=0;f<this.settings.steps.length;f++)e(c)&&(a=this.settings.steps[f].value,c=this.settings.steps[f]),e(d)&&(b=this.settings.steps[f].value,d=this.settings.steps[f]),this.settings.steps[f].value<a&&(a=this.settings.steps[f].value,c=this.settings.steps[f]),this.settings.steps[f].value>b&&(b=this.settings.steps[f].value,d=this.settings.steps[f]);return{minValue:a,minStep:c,maxValue:b,maxStep:d}}},_findNextStep:function(){if(!(e(this.settings.steps)||this.settings.steps&&this.settings.steps.length<=0)){if(e(this.settings.currentValue)){var a=this._retrieveMinAndMaxSteps();return a.maxStep?(this._setNextStep(a.maxStep),a.maxStep):a.minStep?(this._setNextStep(a.minStep),a.minStep):void 0}for(var b,c=0;c<this.settings.steps.length;c++)e(b)&&!e(this.settings.steps[c].value)&&this.settings.steps[c].value>this.settings.currentValue?b=this.settings.steps[c]:!e(b)&&!e(this.settings.steps[c].value)&&this.settings.steps[c].value>this.settings.currentValue&&this.settings.steps[c].value<b.value&&(b=this.settings.steps[c]);return e(b)||this._setNextStep(b),b}},_setNextStep:function(a){if(!(e(this.settings.steps)||this.settings.steps&&this.settings.steps.length<=0)){for(var b=0;b<this.settings.steps.length;b++)this.settings.steps[b].isNextStep=!1;a.isNextStep=!0}},_updateNextStepElm:function(){if(!(e(this.settings.steps)||this.settings.steps&&this.settings.steps.length<=0))for(var a=0;a<this.settings.steps.length;a++)1!=this.settings.steps[a].isNextStep||e(this.settings.steps[a].stepElement)?0!=this.settings.steps[a].isNextStep&&!e(this.settings.steps[a].isNextStep)||e(this.settings.steps[a].stepElement)||(this.settings.steps[a].stepElement.removeClass("step-progressbar-nextstep"),this.settings.steps[a].topLabelElement.removeClass("step-progressbar-nextstep"),this.settings.steps[a].bottomLabelElement.removeClass("step-progressbar-nextstep")):(this.settings.steps[a].stepElement.addClass("step-progressbar-nextstep"),this.settings.steps[a].topLabelElement.addClass("step-progressbar-nextstep"),this.settings.steps[a].bottomLabelElement.addClass("step-progressbar-nextstep"))},_updateSteps:function(){this.settings.steps.sort(c),this._mergeDuplicatedSteps(),this._updateProgress(),this._calcStepsProgressValues(),this._findNextStep();for(var a=0;a<this.settings.steps.length;a++)this._buildStep(this.settings.steps[a],a),this._buildTopLabel(this.settings.steps[a],a),this._buildBottomLabel(this.settings.steps[a],a);this._updateNextStepElm()},_updateProgress:function(){this.progressElm&&this.progressElm.css("width",this._calcCurrentProgressValue()+"%")},_buildStep:function(b,c){if(!(e(b)||!e(b)&&e(b.progressValue))){if(e(b.stepElement)){var d=a("<span>");d.addClass("step-progressbar-step"),this.stepsContainer.append(d),b.stepElement=d}b.stepElement.removeClass("step-progressbar-firststep"),b.stepElement.removeClass("step-progressbar-laststep"),0==c&&b.stepElement.addClass("step-progressbar-firststep"),c==this.settings.steps.length-1&&b.stepElement.addClass("step-progressbar-laststep"),b.stepElement.css("left",b.progressValue+"%")}},_deleteStep:function(a,b){e(a)||(a.stepElement&&a.stepElement.remove(),a.topLabelElement&&a.topLabelElement.remove(),a.bottomLabelElement&&a.bottomLabelElement.remove(),this.settings.steps.splice(b,1),delete a)},_mergeDuplicatedSteps:function(){var a=[];this.settings.steps.sort(c);for(var b=0;b<this.settings.steps.length-1;b++)if(this.settings.steps[b].value==this.settings.steps[b+1].value){var d=this._mergeSteps(this.settings.steps[b],this.settings.steps[b+1]);this.settings.steps[b]=d,this.settings.steps[b+1]=d,a.push(b+1)}if(!e(a)&&a.length>0){a.sort(),a.reverse();for(var f=0;f<a.length;f++)this.settings.steps.splice(a[f],1)}},_mergeSteps:function(a,b){if(!e(a)||!e(b)){if(e(a)&&!e(b))return b;if(!e(a)&&e(b))return a;var c={};if(!e(this.stepFields)&&this.stepFields.length>=0)for(var d=0;d<this.stepFields.length;d++){var f=this.stepFields[d];c[f]=a[f]?a[f]:b[f]}return c}},_buildTopLabel:function(b,c){if(!(e(b)||!e(b)&&e(b.progressValue))){if(e(b.topLabelElement)){var d=a("<span>");d.addClass("step-progressbar-steplabel"),this.toplabelWrapper.append(d),b.topLabelElement=d}b.topLabelElement.removeClass("step-progressbar-firststep"),b.topLabelElement.removeClass("step-progressbar-laststep"),0==c&&b.topLabelElement.addClass("step-progressbar-firststep"),c==this.settings.steps.length-1&&b.topLabelElement.addClass("step-progressbar-laststep"),b.topLabelElement.css("left",b.progressValue+"%");var f=b.topLabel?b.topLabel:e(b.value)?"":b.value+this.settings.unit;b.topLabelElement.html(f)}},_buildBottomLabel:function(b,c){if(!(e(b)||!e(b)&&e(b.progressValue))){if(e(b.bottomLabelElement)){var d=a("<span>");d.addClass("step-progressbar-steplabel"),this.bottomlabelWrapper.append(d),b.bottomLabelElement=d}b.bottomLabelElement.removeClass("step-progressbar-firststep"),b.bottomLabelElement.removeClass("step-progressbar-laststep"),0==c&&b.bottomLabelElement.addClass("step-progressbar-firststep"),c==this.settings.steps.length-1&&b.bottomLabelElement.addClass("step-progressbar-laststep"),b.bottomLabelElement.css("left",b.progressValue+"%"),b.bottomLabelElement.html(b.bottomLabel)}}};var e=function(a){return null===a||void 0===a},f=function(a,b,c){if(!e(a))return e(b)&&e(c)?100:e(b)&&!e(c)?a<c?0:100:e(c)&&!e(b)?a<b?0:100:e(b)||e(c)?void 0:a<b?0:a>c?100:(a-b)/(c-b)*100};a.fn[d]=function(c){var e=arguments;if(void 0===c||"object"==typeof c)return this.each(function(){a.data(this,"plugin_"+d)||a.data(this,"plugin_"+d,new b(this,c))});if("string"==typeof c&&"_"!==c[0]&&"init"!==c){if(a.inArray(c,a.fn[d].getters)!==-1){var f=a.data(this[0],"plugin_"+d);return f[c].apply(f,Array.prototype.slice.call(e,1))}return this.each(function(){var f=a.data(this,"plugin_"+d);f instanceof b&&"function"==typeof f[c]&&f[c].apply(f,Array.prototype.slice.call(e,1))})}},a.fn[d].getters=["getCurrentValue","findStep"],a.fn[d].defaults={currentValue:0,steps:[],rounded:!0,unit:"",responsiveLimit:480,progressLabel:function(a,b,c,d){return d+"%"},progressFill:void 0}}(jQuery);