/**
 * Angular Factory for Sponsors
 */
(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Sponsors', ['$http', '$q', Sponsors]);

    function Sponsors($http, $q){
        var cache = {};
        return {
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get an Sponsor."));

                if(cache[id]){
                    return $q.resolve(cache[id]);
                } else {
                    return $http.get('https://api.shingo.org/salesforce/events/sponsors/' + id)
                    .then(function(response){
                        if(!response.data.success) return $q.reject(response.data.error);
                        return $q.resolve(response.data.sponsor);
                    });
                }
            }
        }
    };

})();