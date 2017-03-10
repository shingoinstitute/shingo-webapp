(function () {
    'use strict';

    angular.module('interface')
        .directive('eventGridItem', function () {
            return {
                restrict: 'EA',
                scope: {
                    event: '=',
                    isLarge: '='
                },
                templateUrl: 'views/eventGridItem.tmpl.html',
                controller: 'EventGridItemController'
            }
        });

})();