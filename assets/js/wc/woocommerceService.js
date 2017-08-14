angular.module('woocommerceService',[])
.service('WC', function(){
    return {
        WC: function(){
            var Woocommerce = new WoocommerceAPI({
                url: 'http://localhost:8080',
                consumerKey: 'ck_2a43f1fe97f7b37619f6553fa5e3013d807a37c7',
                consumerSecret: 'cs_272b86c179e31a05202c99fae8881c9960affdf9',
		wpAPI: true, //or false if you want to use the legacy API v3
  		version: 'wc/v2' //or wc/v1
            });
            return Woocommerce;
        }
}});
