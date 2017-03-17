/**
 * Angular Controller for SpeakersController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('SpeakersController', ['$scope', '$state', '$location', SpeakersController]);

    function SpeakersController($scope, $state, $location){
        var vm = this;

       $scope.$on('$stateChangeSuccess', function(ev, toState){
            var path = $location.path().split('speakers/');
            if(path.length == 2) path = path[1].split('/')[0];
            else path = 'keynote';
            
            console.log('path', path);
            vm.currentNavItem = path;
            if(toState.url == '/events/:id/speakers') $state.go('speakers.type', {type: vm.currentNavItem});
        })
        
        $scope.$watch('vm.currentNavItem', function(newVal, oldVal){
            if(newVal != oldVal) $state.go('speakers.type', {type: newVal});
        });

        // $state.go('speakers.type', {type: 'keynote'})

        $scope.$emit('toggle filter', true);
    };

})();