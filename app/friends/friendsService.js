var userApp=angular.module('friendsServiceModule',['requestModule']);

userApp.factory("FriendsService",function(requestHandler){

    var userFriendsServiceObj={};

    //Get My friends list
    userFriendsServiceObj.doGetMyFriends= function () {
        return requestHandler.getRequest("user/getMyFriendsList/","").then(function(response){
            return response.data.Friends_List;
        },function(response){
            alert("Please try again later");
        })
    };

    //Get friend request received
    userFriendsServiceObj.doGetFriendRequest= function () {
        return requestHandler.getRequest("user/getFriendsRequestList/","").then(function(response){
            return response.data.Friends_List;
        },function(response){
            alert("Please try again later");
        })
    };

   //Search friends
    userFriendsServiceObj.doSearchFriends= function (name) {
        return requestHandler.postRequest("user/searchFriends/",{"name":name}).then(function(response){
            return response.data.Friends_List;
        },function(response){
            alert("Please try again later");
        })
    };

    //Search friends
    userFriendsServiceObj.doInviteFriends= function (id) {
        return requestHandler.postRequest("user/sendFriendRequest/",{"friends_friendid":id}).then(function(response){
            return response;
        },function(response){
            alert("Please try again later");
        })
    };

    return userFriendsServiceObj;

});