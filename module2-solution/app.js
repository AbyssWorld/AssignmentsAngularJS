(function initializeFunction() {

'use strict';

var angularModule = angular.module("ShoppingListCheckOff",[]);

var toBuyController = angularModule.controller("ToBuyController", buyController);

toBuyController.$inject=['ShoppingListCheckOffService'];

var alreadyBoughtController = angularModule.controller("AlreadyBoughtController", boughtController);

alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

var commonShoppingListService = angularModule.service("ShoppingListCheckOffService", shoppingListService);


function buyController(ShoppingListCheckOffService) {
  var ctrl1 = this;

  var errorMessage = '';
  ctrl1.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
  ctrl1.errorMessage = errorMessage;

  ctrl1.removeItem = function(index) {
    ShoppingListCheckOffService.removeItem(index);
    if(ctrl1.itemsToBuy.length == 0){
      ctrl1.errorMessage='Everything is bought!';
    }
  }

}

function boughtController(ShoppingListCheckOffService) {
  var ctrl2 = this;
  ctrl2.itemsBought = ShoppingListCheckOffService.getItemsBought();
}

function shoppingListService() {
   var commonService = this;

   var toBuy = [{name: "cookies", quantity: 10}, {name: "cakes", quantity: 10},
   {name: "Shirts", quantity: 10}, {name: "Trousers", quantity: 10}, {name: "ToothPastes", quantity: 10}];

   var bought = [];

   commonService.getItemsToBuy = function () {
     return toBuy;
   }

   commonService.removeItem = function (index) {
        var removedItem = toBuy.splice(index, 1);
        bought.push(removedItem[0]);
   }

   commonService.getItemsBought = function () {
     return bought;
   }

}



})();
