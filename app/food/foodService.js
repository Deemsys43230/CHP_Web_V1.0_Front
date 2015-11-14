var adminApp=angular.module('foodServiceModule',['requestModule']);

adminApp.factory("FoodService",function(requestHandler){

    var foodServiceObj={};
    
    //Get Categories
    foodServiceObj.doGetCategories= function () {
       return requestHandler.getRequest("admin/getFoodCategoryByStatus","").then(function(response){
          return response.data.Food_Category;
        },function(response){
            alert("Not able to pull Food Measure List");
        })
    };
    //End Get Food Categories

    //Get Tags
    foodServiceObj.doGetTags= function () {
         return requestHandler.getRequest("admin/getFoodTag","").then(function(response){
            return response.data.Food_Tag_Data;
        },function(response){
            alert("Not able to pull Food Tag");
        })
    };
    //End Get Food Tags

    //Measure Object
    foodServiceObj.getMeasureSet=function(){
        //Create Measure set object
        var measureSet={"polyunsaturatedfat": "",
            "folicacid": "",
            "vitaminE": "",
            "vitaminC": "",
            "zinc": "",
            "vitaminA": "",
            "protein": "",
            "vitaminK": "",
            "saturatedfat":"",
            "niacin": "",
            "fibre": "",
            "measureid": "",
            "sodium": "",
            "thiamin": "",
            "sugar": "",
            "potassium": "",
            "fat": "",
            "vitaminB12": "",
            "vitaminB6": "",
            "calories": "",
            "value": "",
            "phosphorous": "",
            "calcium": "",
            "riboflavin": "",
            "iron": "",
            "monounsaturatedfat": "",
            "measurename": "",
            "carbo": ""
        };
        return measureSet;
    };
    //End Measure Object

    //Add New Measure
    foodServiceObj.doAddMeasureMinerals=function(id,name,measureid){
        var addMeasureSet=foodServiceObj.getMeasureSet();
        addMeasureSet.measureid=id;
        addMeasureSet.measurename=name;
        var isExist=false;
        var removeIndex=0;
        $.each(measureid, function(index,value){
            if(value.measureid==id){
                isExist=true;
                removeIndex=index;
            }
        });
        if(isExist){
            measureid.splice(removeIndex,1);
        }
        else{
            measureid.push(addMeasureSet);
        }
        return measureid;
    };
    //End Add Measure

    //SetGet Session Values Basically SessionSet
    foodServiceObj.setSessionValues=function(sessionid){

        var sessionSet={
            breakfast:false,
            brunch:false,
            lunch:false,
            eveningsnacks:false,
            dinner:false
        };

        $.each(sessionid, function(index,value) {
            switch(value.sessionid) {
                case 1:
                    sessionSet.breakfast=true;
                    break;
                case 2:
                    sessionSet.brunch=true;
                    break;
                case 3:
                    sessionSet.lunch=true;
                    break;
                case 4:
                    sessionSet.eveningsnacks=true;
                    break;
                case 5:
                    sessionSet.dinner=true;
                    break;
                default:
                    break;
            }
        });

        return sessionSet;
    };

    //Get session array to update
    foodServiceObj.getSessionArray=function(sessionSet){

        //Set Session Array
        var sessionArray=new Array();

        if(sessionSet.breakfast){
            sessionArray.push(1);
        }
        if(sessionSet.brunch){
            sessionArray.push(2);
        }
        if(sessionSet.lunch){
            sessionArray.push(3);
        }
        if(sessionSet.eveningsnacks){
            sessionArray.push(4);
        }
        if(sessionSet.dinner){
            sessionArray.push(5);
        }
        return sessionArray;
    };

    //Get category array to update
    foodServiceObj.getCategoryArray=function(categoryid){

        var categoryArray=new Array();

        $.each(categoryid, function(index,value) {
            categoryArray.push(parseInt(value.categoryid));
        });

        return categoryArray;

    };

    //Insert New Tags
    foodServiceObj.insertTag=function(tagname){
        return requestHandler.postRequest("admin/insertFoodTag/",{'tagname':tagname}).then(function(response){
         if(response.data.Response_status==1){
            return response.data.Food_Tag_Data.tagid;
         }
         });
    };

    // Function to convert image url to base64
    foodServiceObj.convertImgToBase64=function(url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/jpg');
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    };

    //Get Measures
    foodServiceObj.doGetMeasures= function (measureid) {
        return requestHandler.getRequest("admin/viewfoodMeasure","").then(function(response){
            var foodMeasureListAll=response.data.viewfoodMeasure;
            $.each(foodMeasureListAll, function(index,listValue) {
                listValue.checked=false;
                $.each(measureid, function(index,messureValue) {
                    if(messureValue.measureid==listValue.measureid){
                        listValue.checked=true;
                    }
                });
            });

            return foodMeasureListAll;

        },function(response){
            alert("Not able to pull Food Measure List");
        })
    };
    //End Get Food Measures


    return foodServiceObj;

    });








