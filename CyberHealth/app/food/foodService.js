var adminApp=angular.module("foodServiceModule",["requestModule"]);adminApp.factory("FoodService",["requestHandler",function(a){var b={};return b.doGetCategories=function(){return a.getRequest("admin/getFoodCategoryByStatus","").then(function(a){return a.data.Food_Category},function(a){alert("Not able to pull Food Measure List")})},b.doGetTags=function(){return a.getRequest("admin/getFoodTag","").then(function(a){return a.data.Food_Tag_Data},function(a){alert("Not able to pull Food Tag")})},b.getMeasureSet=function(){var a={polyunsaturatedfat:"",folicacid:"",vitaminE:"",vitaminC:"",zinc:"",vitaminA:"",protein:"",vitaminK:"",saturatedfat:"",niacin:"",fibre:"",measureid:"",sodium:"",thiamin:"",sugar:"",potassium:"",fat:"",vitaminB12:"",vitaminB6:"",calories:"",value:"",phosphorous:"",calcium:"",riboflavin:"",iron:"",monounsaturatedfat:"",measurename:"",carbo:""};return a},b.doAddMeasureMinerals=function(a,c,d){var e=b.getMeasureSet();e.measureid=a,e.measurename=c;var f=!1,g=0;return $.each(d,function(b,c){c.measureid==a&&(f=!0,g=b)}),f?d.splice(g,1):d.push(e),d},b.setSessionValues=function(a){var b={breakfast:!1,brunch:!1,lunch:!1,eveningsnacks:!1,dinner:!1};return $.each(a,function(a,c){switch(c.sessionid){case 1:b.breakfast=!0;break;case 2:b.brunch=!0;break;case 3:b.lunch=!0;break;case 4:b.eveningsnacks=!0;break;case 5:b.dinner=!0}}),b},b.getSessionArray=function(a){var b=new Array;return a.breakfast&&b.push(1),a.brunch&&b.push(2),a.lunch&&b.push(3),a.eveningsnacks&&b.push(4),a.dinner&&b.push(5),b},b.getCategoryArray=function(a){var b=new Array;return $.each(a,function(a,c){b.push(parseInt(c.categoryid))}),b},b.insertTag=function(b){return a.postRequest("admin/insertFoodTag/",{tagname:b}).then(function(a){return 1==a.data.Response_status?a.data.Food_Tag_Data.tagid:void 0})},b.convertImgToBase64=function(b,c,d){var e=a.convertUrl(b),f=new Image;f.crossOrigin="Anonymous",f.onload=function(){var a=document.createElement("CANVAS"),b=a.getContext("2d");a.height=this.height,a.width=this.width,b.drawImage(this,0,0);var e=a.toDataURL(d||"image/jpg");c(e),a=null},f.src=e},b.doGetMeasures=function(b){return a.getRequest("admin/viewfoodMeasure","").then(function(a){var c=a.data.viewfoodMeasure;return $.each(c,function(a,c){c.checked=!1,$.each(b,function(a,b){b.measureid==c.measureid&&(c.checked=!0)})}),c},function(a){alert("Not able to pull Food Measure List")})},b}]);