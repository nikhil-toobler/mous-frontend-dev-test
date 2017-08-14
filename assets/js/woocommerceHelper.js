var basketApp = angular.module('woocommerceService');

basketApp.service('woocommerceHelper', function () {
    this.findMataAttribute = function (metaData, key) {
        var metaAttribute = _.find(metaData, function (metaAttribute) {
            return metaAttribute.key == key;
        });

        if (metaAttribute == null) {
            return null;
        }

        return metaAttribute.value;
    };

    this.getProductRegularPrice = function (product, currency) {

        return this.getProductPrice(product, currency, 'regular');
    };

    this.getProductSalePrice = function (product, currency) {

        return this.getProductPrice(product, currency, 'sale');
    };

    this.getProductPrice = function (product, currency, priceType) {

        var price = null;

        if (product.type == "simple") {
            console.log("simple");
            price = this.multiCurrencyTypeSimple(currency, priceType, product);
        } else if (product.type == "variable") {
            console.log("variable");
            price = this.multiCurrencyTypeVariation(currency, priceType, product);
        }

        if (price == null) {
            price = product[priceType + '_price'];
            console.log(product.name + " " +  priceType + " " + currency + " " + price)
            return;
        } else {
            console.log(product.name + " " +  priceType + " " + currency + " " + price)
            return price;
        }

        //price = this.multiCurrencyTypeOne(currency, priceType, variation);
        // if (price == null) {
        //     price = this.multiCurrencyTypeTwo(priceType, variation);
        // }

        // if (price == null) {
        //     price = this.multiCurrencyTypeThree(currency, priceType, variation);
        // }

        // if (price == null) {
        //     switch (currency) {
        //         case 'GBP':
        //             price = this.multiCurrencyTypeFour('uk', priceType, variation);
        //             break;
        //
        //         case 'USD':
        //             price = this.multiCurrencyTypeFour('us', priceType, variation);
        //             break;
        //     }
        // }

    };

    this.multiCurrencyTypeSimple = function (currency, priceType, product) {
        var price = this.findMataAttribute(product.meta_data, '_' + priceType + '_currency_prices');
        if (price != null) {
            return JSON.parse(price)[currency];
        }
    };

    // this.multiCurrencyTypeTwo = function (priceType, variation) {
    //     console.log("looked up max");
    //     return this.findMataAttribute(variation.meta_data, '_max_variation' + priceType + '_price');
    // };

    this.multiCurrencyTypeVariation = function (currency, priceType, variation) {
        var price = this.findMataAttribute(variation.meta_data, 'variable_' + priceType + '_currency_prices');
        if (price != null) {
            return JSON.parse(price)[currency];
        }
    };

    // this.multiCurrencyTypeFour = function (country, priceType, variation) {
    //     console.log("looked up max");
    //     return this.findMataAttribute(variation.meta_data, '_' + country + '_max_variation_' + priceType + '_price');
    // };


});