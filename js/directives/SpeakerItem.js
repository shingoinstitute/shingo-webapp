(function () {
    'use strict';

    angular.module('interface')
        .directive('speakerItem', function () {
            return {
                restrict: 'EA',
                scope: {
                    person: '='
                },
                templateUrl: 'views/speakerItem.tmpl.html',
                controller: 'SpeakerItemController'
            }
        });

})();