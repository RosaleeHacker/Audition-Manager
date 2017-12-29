// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

// inject $cordovaSQLite
.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
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
 
 // This will create an empty database when the app runs the first time
 // and create the table 'auditionee'.
 // for a browser:
 $rootScope.db = window.openDatabase("dbjokes.db", '1.0', 'App Demo', 65536);
 // for the device:
 //$cordovaSQLite.execute($rootScope.db, "DROP TABLE auditionee");
 $cordovaSQLite.execute($rootScope.db, "CREATE TABLE auditionee (num integer, name text, age integer, gender text, vocals text, role text, notes text, score integer)");

  });
})

.config(function($stateProvider, $urlRouterProvider) {

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

  .state('tab.select', {
      url: '/select',
      views: {
        'tab-select': {
          templateUrl: 'templates/tab-select.html',
          controller: 'DBCtrl'
        }
      }
    })

  .state('tab.detail', {
      url: '/auditionee/:num',
      views: {
        'tab-select': {
          templateUrl: 'templates/select-detail.html',
          controller: 'DetailCtrl'
        }
      }
    })

  .state('tab.insert', {
    url: '/insert',
    views: {
      'tab-insert': {
        templateUrl: 'templates/tab-insert.html',
        controller: 'DBCtrl'
      }
    }
  })

  .state('tab.help', {
    url: '/help',
    views: {
      'tab-help': {
        templateUrl: 'templates/tab-help.html',
        controller: 'HelpCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
