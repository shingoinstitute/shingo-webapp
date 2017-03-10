(function(){
    'use strict';

    angular.module('interface')
    .directive('backgroundImg', function(){
        return {
            restrict: 'EA',
            link: function(scope, element, attrs){
                scope.$watch(attrs.backgroundWatch, function(newVal){
                    if(newVal){
                        var url = attrs.backgroundImg;
                        var color = attrs.backgroundColor;
                        var height = attrs.backgroundHeight;
                        var css = {};

                        if(url){
                            css['background-image'] = 'url(' + url + ')';
                            css['background-size'] = 'cover';
                            css['background-repeat'] = 'no-repeat';
                            css['background-position'] = 'center';
                        }
                        if(color) css['background-color'] = color;
                        if(height) css['height'] = height;

                        element.css(css);
                    }
                }, true)
            }
        };
    })
})();