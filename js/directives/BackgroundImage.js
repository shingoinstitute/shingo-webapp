(function() {
    'use strict';

    angular.module('interface')
    .directive('background', function() {
        return {
            restrict: 'A',
            scope: {
                background: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('background', function(val) {
                    var obj = {};
                    if (val) {
                        obj['background-image'] = scope.background.image && 'url(' + scope.background.image + ')';
                        obj['background-size'] = scope.background.size || 'cover';
                        obj['background-repeat'] = scope.background.repeat || 'no-repeat';
                        obj['background-position'] = scope.background.position || 'center';
                        obj['background-color'] = scope.background.color;
                        obj['height'] = scope.background.height;
                        obj['background-attachment'] = scope.background.attachment;
                        obj['background-origin'] = scope.background.origin;
                        obj['background-clip'] = scope.background.clip;

                        if (scope.background.position && typeof scope.background.position === 'object') {
                            obj['background-position'] = null;
                            obj['background-position-x'] = scope.background.position.x && scope.background.position.x;
                            obj['background-position-y'] = scope.background.position.y && scope.background.position.y;
                        }

                        // remove nulls and undefined
                        for (var i in obj) {
                            if (obj.hasOwnProperty(i) && !obj[i]) {
                                delete obj[i];
                            }
                        }

                        element.css(obj);
                    }
                }, true);
            }
        };
    })
})();