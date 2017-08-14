var basketApp = angular.module('basketApp', []);

var basket = new Array();
var subscribers = new Array();

basketApp.service('basketService',function($http){

    var processRawBasket = function(rawBasket)
    {
        for (var property in rawBasket) {
            if (rawBasket.hasOwnProperty(property)) {
                basket.push(rawBasket[property]);
            }
        }
    }

    if(basket.length == 0)
    {
        processRawBasket(JSON.parse(angular.element('#cartModel')[0].innerHTML));
    }

    this.addCaseVariationToBasket = function(productId, quantity, variation){
        $http({
            method: 'POST',
            url: '/',
            params: {
                'add-to-cart': productId,
                'quantity': quantity,
                'variation_id': variation.id,
                'attribute_pa_material': variation.material,
                'attribute_phone-model': variation.phoneModel
            }
        }).then(function successCallback(response) {

            updateBasket();
        }, function errorCallback(response) {

        });
    };

    this.addAccessoryVariationToBasket = function(productId, quantity, variation){
        $http({
            method: 'POST',
            url: '/',
            params: {
                'add-to-cart': productId,
                'quantity': quantity,
                'variation_id': variation.id,
                'attribute_phone-model': variation.phoneModel
            }
        }).then(function successCallback(response) {

            updateBasket();
        }, function errorCallback(response) {

        });
    };

    this.addProductToBasket = function(productId, quantity){
        $http({
            method: 'POST',
            url: '/',
            params: {
                'add-to-cart': productId,
                'quantity': quantity,
            }
        }).then(function successCallback(response) {

            updateBasket();
        }, function errorCallback(response) {

        });
    };

    this.subscribeToBasketChanges = function(callback){
        subscribers.push(callback);
    };

    var getBasket = function(callback){
        $http({
            method: 'GET',
            url: '/basket-api'
        }).then(function successCallback(response) {

            basket = new Array();
            processRawBasket(response.data);

            callback();
        }, function errorCallback(response) {

        });
    };

    var updateBasket = function(){

        getBasket(function(){
            _.each(subscribers,function(subscriber){
                subscriber();
            })
        });

    };

    this.getBasketTotal = function()
    {
        var total = 0;

        _.each(basket,function(item){
            total += parseFloat(item.data.sale_price * item.quantity);
        });

        return total;
    };

    this.getNumberOfItemsInBasket = function()
    {
        var total = 0;

        _.each(basket,function(item){
            total += item.quantity;
        });

        return total;
    };

    this.getBasketItems = function(){
        return _.clone(basket);
    }
});