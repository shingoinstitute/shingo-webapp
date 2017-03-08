(function () {
    'use strict';

    angular.module('interface')
        .directive('eventGridItem', function () {
            return {
                restrict: 'EA',
                scope: {
                    event: '='
                },
                templateUrl: 'views/eventGridItem.tmpl.html',
                controller: 'EventGridItemController'
            }
        });

})();