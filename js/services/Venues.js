/**
 * Angular Factory for Venues
 */
(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Venues', ['$http', '$q', Venues]);

    function Venues($http, $q){
        var cache = {};
        return {
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get an Venue."));

                if(cache[id]){
                    return $q.resolve(cache[id]);
                } else {
                    return $http.get('https://api.shingo.org/salesforce/events/venues/' + id)
                    .then(function(response){
                        if(!response.data.success) return $q.reject(response.data.error);
                        return $q.resolve(response.data.venue);
                    });
                }
            }
        }
    };

})();