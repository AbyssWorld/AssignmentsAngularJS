(function initializeFunction() {
  'use strict';

  var lunchCheckApp = angular.module("LunchCheck", []);

  lunchCheckApp.controller("LunchCheckController", controllerFunction );

  controllerFunction.$inject = ['$scope'];

  function controllerFunction($scope) {
        $scope.messageToUser = "";
        $scope.checkItems = function () {
          var stringLunchItems = $scope.lunchItems;
          if(stringLunchItems == "" || stringLunchItems === undefined){
            $scope.messageToUser = "Please enter data first";
          }else {
            var arrayOfItems = stringLunchItems.split(',');

            var noOfItems = arrayOfItems.length;

            if (noOfItems <= 3) {
              $scope.messageToUser = "Enjoy!";
            }else {
              $scope.messageToUser = "Too much!";
            }
          }
        }


  }

})();
