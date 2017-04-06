/**
 * Angular Directive for recipientItem
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('recipientItem', function(){
        return {
            restrict: 'EA',
            scope: {
                recipient: '='
            },
            templateUrl: 'views/recipients/recipientItem.tmpl.html',
            controller: 'RecipientItemController'
        }
    });

})();