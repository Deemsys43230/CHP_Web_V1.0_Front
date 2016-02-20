var userApp=angular.module("friendsServiceModule",["requestModule"]);userApp.factory("FriendsService",function(e,r){var n={};return n.doGetMyFriends=function(){return e.getRequest("user/getMyFriendsList/","").then(function(e){return e.data.Friends_List},function(){errorMessage(r,"Please try again later")})},n.doGetFriendRequest=function(){return e.getRequest("user/getFriendsRequestList/","").then(function(e){return e.data.Friends_List},function(){errorMessage(r,"Please try again later")})},n.doSearchFriends=function(n){return e.postRequest("user/searchFriends/",{name:n}).then(function(e){return e.data.Friends_List},function(){errorMessage(r,"Please try again later")})},n.doInviteFriends=function(n){return e.postRequest("user/sendFriendRequest/",{friends_friendid:n}).then(function(e){return e},function(){errorMessage(r,"Please try again later")})},n.doAcceptFriends=function(n){return e.postRequest("user/acceptFriendRequest/",{friends_friendid:n}).then(function(e){return e},function(){errorMessage(r,"Please try again later")})},n.doDenyFriends=function(n){return e.postRequest("user/denyorCancelFriendRequest/",{friends_friendid:n}).then(function(e){return e},function(){errorMessage(r,"Please try again later")})},n});