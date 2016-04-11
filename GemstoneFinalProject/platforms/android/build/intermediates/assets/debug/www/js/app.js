
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$timeout,$state,$ionicHistory,$ionicPopup) {

  var backbutton=0;
  $ionicPlatform.registerBackButtonAction(function() {
    if ( ($state.$current.name=="login") ||
      ($state.$current.name=="tab.dash") || ($state.$current.name=="tab.chats") || ($state.$current.name=="tab.account")
    ){
      // H/W BACK button is disabled for these states (these views)
      // Do not go to the previous state (or view) for these states.
      // Do nothing here to disable H/W back button.
      if(backbutton==0){
        backbutton++;
        window.plugins.toast.showShortBottom('Press again to exit');
        $timeout(function(){backbutton=0;},5000);
      }else{
        navigator.app.exitApp();
      }
    } else {
      // For all other states, the H/W BACK button is enabled
      $ionicHistory.goBack();
    }
  }, 100);


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
              title: 'No Internet Connection',
              content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
            })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
      }
    }


    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })


      .state('tab1', {
        url: '/tab1',
        abstract: true,
        templateUrl: 'templates/tabs1.html'
      })
  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

      .state('tab1.dash1', {
        url: '/dash1',
        views: {
          'tab-dash1': {
            templateUrl: 'templates/tab-dash1.html',
            controller: 'DashCtrl'
          }
        }
      })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

      .state('tab1.View1', {
        url: '/View1',
        views: {
          'tab-view': {
            templateUrl: 'templates/ViewItems.html',
            controller: 'ChatsCtrl'
          }
        }
      })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'DashCtrl'
    })

    .state('signup', {
      url: '/signUp',
      templateUrl: 'templates/signUp.html',
      controller: 'DashCtrl'
    })


      .state('tab1.demand1', {
        url: '/demand1',
        views: {
          'tab-demand': {
            templateUrl: 'templates/tab-demand.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
