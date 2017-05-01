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
            templateUrl: 'views/speakers/speakerDetail.tmpl.html',
            controller: 'SpeakerDetailController'
        }
    });

})();