/**
 * Angular Directive for speakerListItem
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('speakerListItem', function(){
        return {
            restrict: 'EA',
            scope: {
                person: '='
            },
            templateUrl: 'views/speakerListItem.tmpl.html',
            controller: 'SpeakerItemController'
        }
    });

})();