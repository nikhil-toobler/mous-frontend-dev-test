var caseApp = angular.module('caseApp', ['woocommerceService', 'thatisuday.ng-image-gallery', 'ngSanitize', 'basketApp']);

caseApp.controller('caseController', function ($scope, WC, basketService) {

    var getdefaultVariation = function (id, variationModels) {
        return _.find(variationModels, function (variationModel) {
            return variationModel.id == id;
        });
    };

    $scope.case = JSON.parse(angular.element('#caseModel')[0].innerHTML);

    $scope.currencies = JSON.parse(angular.element('#currencytModel')[0].innerHTML);
    $scope.selectedCurrency = 'GBP';
    $scope.selectedQuantity = 0;

    $scope.selectedVariation = getdefaultVariation($scope.case.defaultVariationId, $scope.case.variations);

    $scope.nextImg = function () {
        $scope.galleryMethods.next();
    };

    $scope.prevImg = function () {
        $scope.galleryMethods.prev();
    };

    $scope.materials = _.uniq(_.map($scope.case.variations, function (variation) {
        return variation.material;
    }));

    $scope.phoneModels = _.uniq(_.map($scope.case.variations, function (variation) {
        return variation.phoneModel;
    }));

    $scope.changeMaterial = function (material) {
        $scope.selectNewVariation({
            material: material,
            phoneModel: $scope.selectedVariation.phoneModel
        });
    };

    $scope.changeModel = function (phoneModel) {
        $scope.selectNewVariation({
            material: $scope.selectedVariation.material,
            phoneModel: phoneModel
        });
    };

    $scope.selectNewVariation = function (newVariation) {
        var selectedVariation = _.find($scope.case.variations, function (variation) {
            return (variation.material.toLowerCase() == newVariation.material.toLowerCase()) &&
                (variation.phoneModel.toLowerCase() == newVariation.phoneModel.toLowerCase())
        });
        $scope.selectedVariation = selectedVariation;
    };

    $scope.$$postDigest(function () {
        $scope.galleryMethods.open();
    });

    $scope.increaseQuantity = function () {
        $scope.selectedQuantity++;
    };

    $scope.decreaseQuantity = function () {
        if ($scope.selectedQuantity > 0) {
            $scope.selectedQuantity--;
        }
    };

    $scope.addVariationToBasket = function () {
        if ($scope.selectedQuantity > 0) {
            basketService.addCaseVariationToBasket(
                $scope.case.id,
                $scope.selectedQuantity,
                $scope.selectedVariation
            );
        }
    };
});