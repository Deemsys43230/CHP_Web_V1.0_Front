var roleApp=angular.module("roleModule",['ngCookies','authModule']);

roleApp.factory('roleFactory',["authFactory","$http", function (authFactory,$http) {
 var userRole=[];
 //assign userRole
if(authFactory.getRole() == undefined){
  userRole = ['ROLE_COMMON'];
}
else if(authFactory.getRole().userRole == "1"){
 userRole = ['ROLE_ADMIN'];   
}
else{
userRole = ['ROLE_USER'];
}
//Set Role urls
    var userRoleRouteMap = {
        'ROLE_ADMIN': [ 'superadmin/dashboard', 'superadmin/about-us', 'superadmin/index','superadmin/','superadmin/login','superadmin/logout' ],
        'ROLE_USER': [ 'users/usersettings', 'users/personal', 'users/authError','users/index','users/','users/login','users/logout'],
        'ROLE_COMMON':['/index','/','/login','/logout','/authError','/register','/create_account']
    };

    return {
        userHasRole: function (role) {
            for (var j = 0; j < userRole.length; j++) {
                if (role == userRole[j]) {
                    return true;
                }
            }
            return false;
        },

        isUrlAccessibleForUser: function (route) {
            if(route == 'undefined' || route == 'superadminundefined' || route == 'usersundefined'  ){
                route = "/";
            }
            
                if(authFactory.getRole() == undefined){
                  userRole = ['ROLE_COMMON'];
                }
                else if(authFactory.getRole().userRole == "1"){
                 userRole = ['ROLE_ADMIN'];   
                }
                else{
                userRole = ['ROLE_USER'];
                }
            for (var i = 0; i < userRole.length; i++) {
                var role = userRole[i];
                var validUrlsForRole = userRoleRouteMap[role];

                if (validUrlsForRole) {
                    for (var j = 0; j < validUrlsForRole.length; j++) {
                        if (validUrlsForRole[j] == route)
                            return true;
                    }
                }
            }
            return false;
        }
    };
}]);