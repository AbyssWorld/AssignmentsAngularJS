(function () {
  angular.module('module1').config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home',{
      url: '/home',
      templateUrl: '../templates/home.html'
    });
  }
})();
