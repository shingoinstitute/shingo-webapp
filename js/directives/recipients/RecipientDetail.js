/**
 * Angular Directive for recipientDetail
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('recipientDetail', function(){
        return {
            restrict: 'EA',
            scope: {
                recipient: '='
            },
            templateUrl: 'views/recipients/recipientDetail.tmpl.html',
            controller: 'RecipientDetailController'
        }
    });

})();