var adminApp=angular.module('exerciseServiceModule',['requestModule']);

adminApp.factory("ExerciseService",function(requestHandler){

    var exerciseServiceObj={};

    //Get Tags
    exerciseServiceObj.doGetTags= function () {
         return requestHandler.getRequest("admin/listofExercisetags/","").then(function(response){
            $.each(response.data.Exercise_Tag_Data, function(index,tag){
               delete tag.status;
            });  
            return response.data.Exercise_Tag_Data;
        },function(response){
            alert("Not able to pull Food Tag");
        })
    };
    //End Get Food Tags

    //Exercise Type By id
    exerciseServiceObj.getSelectedLevel = function(typeObj){
        var levelnames = "";

        $.each(typeObj.levels, function(index,value){
            if(index<typeObj.levels.length-1)
            levelnames = levelnames+value.levelname+', ';
            levelnames = levelnames+value.levelname;
        });

        var returnObj={};

        returnObj.typeid=typeObj.typeid;
        returnObj.type=typeObj.typename;
        returnObj.levelnames=levelnames;

        return returnObj;
    };
    //End Exercise Type By id

    //Exercise Type List
    exerciseServiceObj.getTypeList = function(typeList){
        var returnTypeListArray=new Array();
        $.each(typeList, function(index,value){
            var TypeListObj = {};

            TypeListObj.typeid=value.typeid;
            TypeListObj.type=value.typename;
            var levelnames = "";
            $.each(value.levels, function(index,levelValues){
                if(index<value.levels.length-1)
                levelnames = levelnames+levelValues.levelname+', ';
                levelnames = levelnames+levelValues.levelname;
            });

            TypeListObj.levelnames=levelnames;

            returnTypeListArray.push(TypeListObj);

        });

        return returnTypeListArray;
    };
    //End Exercise Type List

    //Insert New Tags
    exerciseServiceObj.insertTag=function(tagname){
        return requestHandler.postRequest("admin/insertexerciseTag/",{'tagname':tagname}).then(function(response){
         if(response.data.Response_status==1){
            return response.data.Exercise_Tag_Data.tagid;
         }
         });
    };

    //Get Tag array to update
    exerciseServiceObj.getTagArray=function(tags){
        var tagArray=new Array();
        var tagPromise;
        $.each(tags, function(index,value) {
            if(value.tagid!=null){
                tagArray.push(parseInt(value.tagid));
            }else{
               tagPromise=exerciseServiceObj.insertTag(value.tagname);
               tagPromise.then(function(result){
                   tagArray.push(result);
               });
            }
        });

        return tagArray;

    };

    // Function to convert image url to base64
    exerciseServiceObj.convertImgToBase64=function(url, callback, outputFormat){
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

    return exerciseServiceObj;

});








