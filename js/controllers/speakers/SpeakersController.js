/**
 * Angular Controller for SpeakersController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('SpeakersController', ['$scope', '$state', '$location', SpeakersController]);

    function SpeakersController($scope, $state, $location){
        var vm = this;

        var types = ['keynote', 'concurrent'];

       $scope.$on('$stateChangeSuccess', function(ev, toState){
            var path = $location.path().split('speakers/');
            if(path.length == 2) path = path[1].split('/')[0];
            else path = 'keynote';
            
            console.log('path', path);
            vm.currentNavItem = _.findIndex(types, function(o){ return o == path });
            if(toState.url == '/events/:id/speakers') $state.go('speakers.type', {type: types[vm.currentNavItem]});
        })
        
        $scope.$watch('vm.currentNavItem', function(newVal, oldVal){
            if(newVal != oldVal) $state.go('speakers.type', {type: types[newVal]});
        });

        vm.onSwipeRight = function(){
            vm.currentNavItem = vm.currentNavItem - 1;
            if(vm.currentNavItem === -1) vm.currentNavItem = types.length - 1;
        }

        vm.onSwipeLeft = function(){
            vm.currentNavItem = (vm.currentNavItem + 1) % types.length;
        }

        $scope.$emit('toggle filter', true);
    };

})();