var navApp = angular.module('navApp', ['basketApp']);

navApp.controller('navController', function ($scope, basketService) {

    var basketChanged = function(){
        $scope.basket = {
            totalValue: basketService.getBasketTotal(),
            itemCount: basketService.getNumberOfItemsInBasket(),
            items: basketService.getBasketItems()
        };
    };

    basketService.subscribeToBasketChanges(basketChanged);

    basketChanged();

    $scope.toggleMobileNav = function () {
        if ($scope.showNavClass == "show") {
            $scope.showNavClass = "hide";
        } else {
            $scope.showNavClass = "show";
        }
    };

    $scope.closeMobileNav = function () {
        $scope.showNavClass = "hide";
    };

    $scope.toggleCart = function () {
        if ($scope.showCartClass == "show") {
            $scope.showCartClass = "hide";
        } else {
            $scope.showCartClass = "show";
        }
    };

    $scope.closeCart = function () {
        $scope.showCartClass = "hide";
    };

    $scope.showCart = function () {
        $scope.showCartClass = "show";
    };
});