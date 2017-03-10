(function(){
    'use strict';

    angular.module('interface')
    .controller('MainController', ['$scope', '$mdSidenav', MainController]);

    function MainController($scope, $mdSidenav){
        var vm = this;

        vm.toggle = function(id){
            $mdSidenav(id).toggle();
        }
    }
})();