var feedbackApp=angular.module('feedbackServiceModule',['requestModule']);

feedbackApp.factory("FeedbackService",['requestHandler',function(requestHandler){

    var feedbackServiceObj={};

    //Add User feedback
    feedbackServiceObj.addUserFeedback= function (feedback) {

        return requestHandler.postRequest("addFeedback/",feedback).then(function(response){
           return response;
        });

    };

    return feedbackServiceObj;
}]);
