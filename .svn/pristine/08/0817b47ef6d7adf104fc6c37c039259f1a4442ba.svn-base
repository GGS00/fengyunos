angular
    .module('cloudshop')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    })
    
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
	
    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/home/home");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $stateProvider
    	//商品区域
    	.state('home', {
	        abstract: false,
            url: "/home",
            templateUrl: "view/home/index.html",
        })
    	.state('home.home', {
            url: "/home",
            templateUrl: "view/home/home.php",
        })
    	.state('home.center', {
            url: "/center",
            templateUrl: "view/home/center.html",
        })
    	.state('home.custom', {
            url: "/custom",
            templateUrl: "view/home/custom.html",
        })
    	.state('home.shop', {
            url: "/shop",
            templateUrl: "view/home/shop.html",
        })
    	
    	
    	
    	
    	
    	.state('code', {
	        abstract: false,
            url: "/code?:aid?:alias",
            templateUrl: "view/home/shopercode.php",
        })
    	
    	.state('order', {
	        abstract: false,
            url: "/order",
            templateUrl: "view/order/order.html",
        })
    	
    	
    	.state('store', {
	        abstract: false,
            url: "/store",
            templateUrl: "view/store/index.html",
        })
    	.state('store.store', {
	        abstract: false,
            url: "/store",
            templateUrl: "view/store/store.html",
        })
    	.state('store.edit', {
	        abstract: false,
            url: "/edit?:baseid?:litpic?:goods_name",
            templateUrl: "view/store/edit.html",
        })
    	
    	
    	.state('shop', {
            abstract: false,
            url: "/shop?:aid?:alias?:shopid?:selltype?:shoptype?:isshare",
            templateUrl: "view/shop/index.php",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files:  ['http://cdn.bootcss.com/jquery.lazyload/1.9.1/jquery.lazyload.min.js','http://cdn.bootcss.com/Swiper/3.0.8/js/swiper.min.js']
                        }
                    ]);
                }
            }
        })
        .state('detail', {
            abstract: false,
            url: "/detail",
            templateUrl: "view/shop/detail.php",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files:  ['http://cdn.bootcss.com/jquery.lazyload/1.9.1/jquery.lazyload.min.js','http://cdn.bootcss.com/Swiper/3.0.8/js/swiper.min.js']
                        }
                    ]);
                }
            }
        })

        .state('goodsList', {
            abstract: false,
            url: "/goodsList",
            templateUrl: "view/shop/goodsList.php",
        })

        .state('search', {
            abstract: false,
            url: "/search",
            templateUrl: "view/shop/search.html",
        })

    	
}