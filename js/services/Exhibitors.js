/**
 * Angular Factory for Exhibitors
 */
(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Exhibitors', ['$http', '$q', Exhibitors]);

    function Exhibitors($http, $q){
        var cache = {};
        return {
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get an exhibitor."));

                if(cache[id]){
                    return $q.resolve(cache[id]);
                } else {
                    return $http.get('https://api.shingo.org/salesforce/events/exhibitors/' + id)
                    .then(function(response){
                        if(!response.data.success) return $q.reject(response.data.error);
                        return $q.resolve(response.data.exhibitor);
                    });
                }
            }
        }
    };

})();