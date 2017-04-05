/**
 * Angular Factory for Recipients
 */
(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Recipients', ['$http', '$q', Recipients]);

    function Recipients($http, $q){
        var cache = {};
        return {
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get an Recipient."));

                if(cache[id]){
                    return $q.resolve(cache[id]);
                } else {
                    return $http.get('https://api.shingo.org/salesforce/events/recipients/' + id)
                    .then(function(response){
                        if(!response.data.success) return $q.reject(response.data.error);
                        return $q.resolve(response.data.recipient);
                    });
                }
            }
        }
    };

})();