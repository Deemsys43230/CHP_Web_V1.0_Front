var userApp=angular.module('friendsServiceModule',['requestModule']);

userApp.factory("FriendsService",['requestHandler','Flash',function(requestHandler,Flash){

    var userFriendsServiceObj={};

    //Get My friends list
    userFriendsServiceObj.doGetMyFriends= function () {
        return requestHandler.getRequest("user/getMyFriendsList/","").then(function(response){
            return response.data.Friends_List;
        },function(response){
            errorMessage(Flash,"Please try again later");
        })
    };

    //Get friend request received
    userFriendsServiceObj.doGetFriendRequest= function () {
        return requestHandler.getRequest("user/getFriendsRequestList/","").then(function(response){
            return response.data.Friends_List;
        },function(response){
            errorMessage(Flash,"Please try again later");
        })
    };

   //Search friends
    userFriendsServiceObj.doSearchFriends= function (name) {

        return requestHandler.postRequest("user/searchFriends/",{"name":name}).then(function(response){
            return response.data.Friends_List;
        } ,function(response){
            errorMessage(Flash,"Please try again later");
        })

    };

    //Invite friends
    userFriendsServiceObj.doInviteFriends= function (id) {
        return requestHandler.postRequest("user/sendFriendRequest/",{"friends_friendid":id}).then(function(response){
            return response;
        },function(response){
            errorMessage(Flash,"Please try again later");
        })
    };

    //Accept friends
    userFriendsServiceObj.doAcceptFriends= function (id) {
        return requestHandler.postRequest("user/acceptFriendRequest/",{"friends_friendid":id}).then(function(response){
            return response;
        },function(response){
            errorMessage(Flash,"Please try again later");
        })
    };

    //Deny friends
    userFriendsServiceObj.doDenyFriends= function (id) {
        return requestHandler.postRequest("user/denyorCancelFriendRequest/",{"friends_friendid":id}).then(function(response){
            return response;
        },function(response){
            errorMessage(Flash,"Please try again later");
        })
    };

    return userFriendsServiceObj;

}]);