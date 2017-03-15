/**
 * Angular Factory for Days
 */
(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Days', ['$http', '$q', Days]);

    function Days($http, $q){
        var cache = {};
        return {
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get an agenda day."));

                if(cache[id]){
                    return $q.resolve(cache[id]);
                } else {
                    return $http.get('https://api.shingo.org/salesforce/events/days/' + id)
                    .then(function(response){
                        if(!response.data.success) return $q.reject(response.data.error);
                        return $q.resolve(response.data.day);
                    });
                }
            }
        }
    };

})();