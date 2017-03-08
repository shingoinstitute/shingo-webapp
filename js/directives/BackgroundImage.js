(function(){
    'use strict';

    angular.module('interface')
    .directive('backgroundImg', function(){
        return {
            restrict: 'EA',
            link: function(scope, element, attrs){
                var url = attrs.backgroundImg;
                var color = attrs.backgroundColor;
                element.css({
                    'background-image': 'url(' + url + ')',
                    'background-color': color
                });
            }
        };
    })
})();