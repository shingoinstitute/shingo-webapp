(function(){
    'use strict';

    angular.module('interface')
    .directive('sidenav', function(){
        return {
            restrict: 'EA',
            templateUrl: 'views/sidenav.tmpl.html',
            controller: 'NavController'
        }
    })
})();