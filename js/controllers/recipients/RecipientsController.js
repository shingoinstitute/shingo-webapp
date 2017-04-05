/**
 * Angular Controller for RecipientsController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('RecipientsController', ['$scope', '$state', '$location', RecipientsController]);

    function RecipientsController($scope, $state, $location){
        var vm = this;

       $scope.$on('$stateChangeSuccess', function(ev, toState){
            var path = $location.path().split('recipients/');
            if(path.length == 2) path = path[1].split('/')[0];
            else path = 'keynote';
            
            console.log('path', path);
            vm.currentNavItem = path;
            if(toState.url == '/events/:id/recipients') $state.go('recipients.type', {type: vm.currentNavItem});
        })
        
        $scope.$watch('vm.currentNavItem', function(newVal, oldVal){
            if(newVal != oldVal) $state.go('recipients.type', {type: newVal});
        });

        $scope.$emit('toggle filter', true);
    };

})();