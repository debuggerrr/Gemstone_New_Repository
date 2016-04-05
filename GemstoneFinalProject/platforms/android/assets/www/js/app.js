
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$timeout,$state,$ionicHistory) {

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

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
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
