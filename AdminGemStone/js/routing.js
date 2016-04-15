angular.module('loginApp').config(['$stateProvider', '$urlRouterProvider','$compileProvider', 'USER_ROLES',
function($stateProvider, $urlRouterProvider,$compileProvider, USER_ROLES) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  
  // Now set up the states
  $stateProvider
  	.state('home', {
      url: "/",
      templateUrl: "templates/home.html",
      data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
      }
    })
      .state('viewitem', {
          url: "/items",
          templateUrl: "templates/viewitems.html",
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
          }
      })
      .state('viewagents', {
      url: "/viewagent",
      templateUrl: "templates/viewagents.html",
	  data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
      }      	  
    })
      .state('editStone', {
          url: "/edit",
          templateUrl: "templates/editStone.html",
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
      })
      .state('stonerequest', {
      url: "/stonereq",
      templateUrl: "templates/stonerequest.html",
	  data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
      }
    })
      .state('demandRequest', {
          url: "/demandRequest",
          templateUrl: "templates/demandRequests.html",
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
      })

    .state('adminState', {
        url: "/adminState",
        templateUrl: "templates/adminState.html",
  	  data: {
            authorizedRoles: [USER_ROLES.admin]
        }
      })
      .state('viewrequest', {
          url: "/viewreq",
          templateUrl: "templates/viewrequest.html",
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
          }
      })

      .state('modalView', {
          url: "/modalView",
          templateUrl: "templates/modalExample.html",
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
          }
      })
      .state('solditems', {
          url: "/sold",
          templateUrl: "templates/soldItems.html",
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
          }
      })
      .state('viewinv', {
          url: "/inventory",
          templateUrl: "templates/viewinventory.html",
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
          }
      })
      .state('changepass', {
          url: "/change",
          templateUrl: "templates/changepassword.html",
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
          }
      })
    ;
}]);