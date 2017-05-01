(function () {
    'use strict';

    angular.module('interface')
        .directive('speakerItem', function () {
            return {
                restrict: 'EA',
                scope: {
                    person: '='
                },
                templateUrl: 'views/speakers/speakerItem.tmpl.html',
                controller: 'SpeakerItemController'
            }
        });

})();