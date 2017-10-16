(function(){

  'use strict';

  var geekmoxApp = angular.module('geekmoxApp',
  ['ngRoute','infinite-scroll','ngSanitize','ngResource','ngTouch','angularMoment','updateMeta','ngAnimate','ngLocale',
  'dirDisqus','angular-google-adsense','ngAria','ngMessages','ngMaterial']).value('THROTTLE_MILLISECONDS', 250);

  /*
  ----------------------------------------------------------------------------------------------------
  AngularJS configs
  ----------------------------------------------------------------------------------------------------
  */

  // routeProvider
  geekmoxApp.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider.eagerInstantiationEnabled(true)
      .when('/',{
        redirectTo: '/news',
        title: 'Espera...'
      })
      .when('/news',{
        templateUrl: 'html/news.html',
        controller: 'newsCtrl',
        controllerAs: 'news',
        title: 'Noticias',
        resolve: {
          delay: function($q,$timeout){
            var delay = $q.defer();
            $timeout(delay.resolve, 250);
            return delay.promise;
          }
        }
      })
      .when('/news/:id',{
        templateUrl: 'html/article.html',
        controller: 'articleCtrl',
        controllerAs: 'article',
        title: 'Artículo',
        resolve: {
          delay: function($q,$timeout){
            var delay = $q.defer();
            $timeout(delay.resolve, 250);
            return delay.promise;
          }
        }
      })
      .when('/news/:id/sponsor',{
        templateUrl: 'html/sponsor.html',
        controller: 'sponsorCtrl',
        controllerAs: 'sponsor',
        title: 'Publicidad',
        resolve: {
          delay: function($q,$timeout){
            var delay = $q.defer();
            $timeout(delay.resolve, 250);
            return delay.promise;
          }
        }
      })
      .when('/services',{
        templateUrl: 'html/services.html',
        controller: 'servicesCtrl',
        controllerAs: 'services',
        title: 'Servicios',
        resolve: {
          delay: function($q,$timeout){
            var delay = $q.defer();
            $timeout(delay.resolve, 250);
            return delay.promise;
          }
        }
      })
      .when('/about',{
        templateUrl: 'html/about.html',
        controller: 'aboutCtrl',
        controllerAs: 'about',
        title: 'Hacerca de...',
        resolve: {
          delay: function($q,$timeout){
            var delay = $q.defer();
            $timeout(delay.resolve, 250);
            return delay.promise;
          }
        }
      })
      .when('/error404',{
        templateUrl: 'html/error404.html',
        controller: 'error404Ctrl',
        controllerAs: 'error404',
        title: 'Error 404',
        resolve: {
          delay: function($q,$timeout){
            var delay = $q.defer();
            $timeout(delay.resolve, 250);
            return delay.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/error404',
        resolve: {
          delay: function($q,$timeout){
            var delay = $q.defer();
            $timeout(delay.resolve, 250);
            return delay.promise;
          }
        }
      });
      $locationProvider.html5Mode(true).hashPrefix('!');
  }]);

  /*
  ----------------------------------------------------------------------------------------------------
  AngularJS controllers
  ----------------------------------------------------------------------------------------------------
  */

  // error404Ctrl
  geekmoxApp.controller('error404Ctrl', ['$scope', function($scope){

  }]);

  // aboutCtrl
  geekmoxApp.controller('aboutCtrl', ['$scope', function($scope){

  }]);

  // servicesCtrl
  geekmoxApp.controller('servicesCtrl', ['$scope', function($scope){

  }]);

  // newsCtrl
  geekmoxApp.controller('newsCtrl', ['$scope','$window','$rootScope','DataSource', function($scope,$window,$rootScope,DataSource){
    DataSource.get('../json/news.json', function(data){
      $scope.itemData = data.slice(0,11);
      $scope.itemsData = data;
      $scope.selected = data[0];
      $scope.$emit('filter:itemData');
    });
    $scope.loadMore = function(){
      if($scope.itemData === undefined || $scope.itemsData === undefined){
        return;
      }
      var last = $scope.itemData.length-1;
      for(var i=1; i<=6; i++){
        if($scope.itemData.length >= $scope.itemsData.length){
          break;
        }
        $scope.itemData.push($scope.itemsData[last+i]);
      }
    };
  }]).factory('DataSource', ['$http', function($http){
    return{
      get: function(fileName,callback){
        $http.get(fileName).then(function(response){
          callback(response.data);
        },function(){
          console.log('error');
        });
      }
    };
  }]);

  // sponsorCtrl
  geekmoxApp.controller('sponsorCtrl', ['$scope','$interval','$location','$routeParams',
  function($scope, $interval, $location, $routeParams){
    var promise;
    $scope.time = 5;
    promise = $interval(function(){
      $scope.time = $scope.time - 1;
      if ($scope.time === 0) {
        $location.url('/news/' + $routeParams.id).replace();
      }
    }, 1000, $scope.time);
    $scope.$on('$destroy', function(){
      $interval.cancel(promise);
    });
  }]);

  // articleCtrl
  geekmoxApp.controller('articleCtrl', ['$scope','$routeParams','$http','$location',
  function($scope,$routeParams,$http,$location){
    $http({
      method: 'GET',
      encode: 'UTF-8',
      headers: {
        'Accept': 'application/json, text/javascript',
        'Content-Type': 'application/json; charset=utf-8'
      },
      url: 'http://geekmox.com/json/news/' + $routeParams.id + '.json'
    }).then(function successCallback(response){
        $scope.item = response.data;
    },function errorCallback(response){
        $location.path('/error404').replace();
    });
  }]);
  
  // dirDisqusCtrl
  geekmoxApp.controller('dirDisqusCtrl', ['$scope', function($scope){
    $scope.disqusConfig = {
      disqus_shortname: 'geekmox',
      disqus_identifier: window.location.href,
      disqus_url: window.location.href
    };
  }]);

  // activeNavCtrl
  geekmoxApp.controller('activeNavCtrl', ['$scope','$location', function($scope,$location){
    $scope.isActive = function(destination){
      return destination === $location.path();
    };
  }]);

  // titleCtrl
  geekmoxApp.controller('titleCtrl', ['$scope', function($scope){
    $scope.$on('$routeChangeSuccess', function(event,data){
      $scope.pageTitle = data.title;
    });
  }]);

  // addressCtrl
  geekmoxApp.controller('addressCtrl', ['$scope', function($scope){
    $scope.address = 'team@geekmox.com';
  }]);

  /*
  ----------------------------------------------------------------------------------------------------
  AngularJS filters
  ----------------------------------------------------------------------------------------------------
  */

  //filterHTML
  geekmoxApp.filter('filterHtml', ['$sce',
  function($sce){
    return function(content){
      return $sce.trustAsHtml(content);
    };
  }]);

  /*
  ----------------------------------------------------------------------------------------------------
  AngularJS components
  ----------------------------------------------------------------------------------------------------
  */

  // reloadComponent
  geekmoxApp.component('reloadComponent', {
    template: '<a id="reload" ng-class="{reloading: changeClass == true}" ng-click="refresh()"></a>',
    controller: ['$scope','$route', function reloadComponentCtrl($scope,$route){
      $scope.changeClass = false;
      $scope.refresh = function(){
        $route.reload();
        $scope.changeClass = true;
      };
      $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
          $scope.changeClass = false;
      });
    }]
  });

  // backbuttonComponent
  geekmoxApp.component('newsbuttonComponent', {
    template: `<a class="news-button"
                  ng-class="{inactive: isInactive('/news')}"
                  ng-href="/news">
               </a>`,
    controller: ['$scope','$location',
    function newsbuttonComponentCtrl ($scope,$location){
      $scope.isInactive = function(direction){
        return direction === $location.path();
      };
    }]
  });

})();
