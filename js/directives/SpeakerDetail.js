/**
 * Angular Directive for speakerDetail
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('speakerDetail', function(){
        return {
            restrict: 'EA',
            scope: {
                person: '='
            },
            templateUrl: 'views/speakerDetail.tmpl.html',
            controller: 'SpeakerDetailController'
        }
    });

})();