var accessoryApp = angular.module('accessoryApp', ['woocommerceService', 'ngSanitize', 'basketApp']);

accessoryApp.controller('accessoryController', function ($scope, basketService) {

    var basketChanged = function(){
        $scope.basket = {
            totalValue: basketService.getBasketTotal(),
            itemCount: basketService.getNumberOfItemsInBasket()
        };
    };

    basketService.subscribeToBasketChanges(basketChanged);

    basketChanged();

    $scope.selectedCurrency = 'GBP';

    $scope.accessories = JSON.parse(angular.element('#accessoryModel')[0].innerHTML);
    $scope.currencies = JSON.parse(angular.element('#currencytModel')[0].innerHTML);

    $scope.simpleAccessories = _.filter($scope.accessories, function(accessory){
        return accessory.isVariable == false;
    });
    $scope.variableAccessories = _.filter($scope.accessories, function(accessory){
      if(accessory.isVariable)
      {
        accessory.selectedVariation = accessory.variations[0];
        return accessory.isVariable == true;
      }
    });

    $scope.addProductToBasket = function (accessory) {
        basketService.addProductToBasket(
            accessory.id,
            1
        );
    };

    $scope.addVariationToBasket = function (accessory) {
        basketService.addAccessoryVariationToBasket(
            accessory.id,
            1,
            accessory.selectedVariation
        );
    };
});
