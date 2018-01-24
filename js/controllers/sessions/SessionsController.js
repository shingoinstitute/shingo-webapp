/**
 * Angular Controller for SessionsController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('SessionsController', ['$scope', 'sessions', SessionsController]);

    function SessionsController($scope, sessions){
        var vm = this;
        vm.sessions = sessions;
        $scope.$emit('toggle filter', true);
        $scope.$on('$destroy', function() {
            $scope.$emit('toggle filter', false);
        });
    };

})();