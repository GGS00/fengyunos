angular
    .module('cloudshop')
    .directive('loadSwiper', loadSwiper)



function loadSwiper($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            if(scope.$last == true){
                $timeout(function(){
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop: true,
                        lazyLoading : true,
                        autoplay: 3000
                    });         
                });
            }
        }
    };
};

