/**
 * Angular Controller for RecipientsController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('RecipientsController', ['$scope', '$state', '$location', '_', RecipientsController]);

    function RecipientsController($scope, $state, $location, _){
        var vm = this;

        var awards = ['prize', 'silver', 'bronze', 'research', 'publication'];

       $scope.$on('$stateChangeSuccess', function(ev, toState){
            var path = $location.path().split('recipients/');
            if(path.length == 2) path = path[1].split('/')[0];
            else path = 'prize';
            
            console.log('path', path);
            vm.currentNavItem = _.findIndex(awards, function(o){ return o == path });
            if(toState.url == '/events/:id/recipients') $state.go('recipients.type', {type: awards[vm.currentNavItem]});
        });

        $scope.$watch('vm.currentNavItem', function(newVal, oldVal){
            if(newVal != oldVal) $state.go('recipients.type', {type: awards[newVal]});
        });

        vm.onSwipeRight = function(){
            vm.currentNavItem = vm.currentNavItem - 1;
            if(vm.currentNavItem === -1) vm.currentNavItem = awards.length - 1;
        }

        vm.onSwipeLeft = function(){
            vm.currentNavItem = (vm.currentNavItem + 1) % awards.length;
        }
        

        $scope.$emit('toggle filter', true);
        $scope.$on('$destroy', function() {
            $scope.$emit('toggle filter', false);
        });
    };

})();