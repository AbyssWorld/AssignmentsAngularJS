(function initialize() {
  'use strict';

  var angularModule = angular.module('NarrowItDownApp',[]);

  var controllerDef = angularModule.controller('NarrowItDownController', narrowSearhCtrl);

  var searchServiceDef = angularModule.service('MenuSearchService', searchService);

  var foundItemsDirDef = angularModule.directive('foundItems', FoundItems);

  controllerDef.$inject = ['MenuSearchService'];

  searchServiceDef.$inject = ['$http'];

  // foundItemsDirDef.$inject = [];


  function FoundItems(){
    var ddo = {
      templateUrl: 'showItems.html',
      restrict: 'E',
      controller: DisplayItemsController,
      bindToController: true,
      controllerAs : 'Ctrl2',
      scope: {
        itemsArray: '<',
        removeItem : '&method1'
      }

    };

    return ddo;
  }

  function DisplayItemsController(){
    var Ctrl2 = this;

  }

  function narrowSearhCtrl( MenuSearchService) {
    var ctrl1 = this;

    ctrl1.narrowIt = function(){
      ctrl1.nothingfound = false;
      if(ctrl1.searchWord === "" || !ctrl1.searchWord){
        ctrl1.nothingfound = true;
        if(ctrl1.found){
          ctrl1.found.length=0;
        }
        return;
      }
      MenuSearchService.getMatchedMenuItems(ctrl1);


    }

    ctrl1.removeItem = function(indx){
      MenuSearchService.removeItem(ctrl1, indx);
    }
  }

  function searchService($http) {
    var service = this;


    service.getMatchedMenuItems = function (ctrl1) {


        $http({
          method: "GET",
          url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        }).then(function(response){

          ctrl1.found = response.data.menu_items.filter(filterBySearch);

          if(ctrl1.found.length == 0){
            ctrl1.nothingfound = true;
          }

          function filterBySearch(item) {
            if(item.description.toLowerCase().indexOf(ctrl1.searchWord.toLowerCase()) > -1){
              return true;
            }
            return false;
          }


          console.log('response data'+ response.data);
          console.log("Attached to controller instance" + ctrl1.found);
          // console.log($scope);


        }, function(error) {
           console.log("Failed to get menu items from server: " + error);

        });

    }

    service.removeItem = function(ctrl1, indx){
        ctrl1.found.splice(indx, 1);
    }

  }










})();
