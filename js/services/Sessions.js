/**
 * Angular Factory for Sessions
 */
(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Sessions', ['$http', '$q', Sessions]);

    function Sessions($http, $q){
        var cache = {};
        return {
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get a session."));

                if(cache[id]){
                    return $q.resolve(cache[id]);
                } else {
                    return $http.get('https://api.shingo.org/salesforce/events/sessions/' + id)
                    .then(function(response){
                        if(!response.data.success) return $q.reject(response.data.error);
                        return $q.resolve(response.data.session);
                    });
                }
            },
            speakers: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get speakers for a session."));

                return $http.get('https://api.shingo.org/salesforce/events/speakers?session_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.speakers);
                });
            }
        }
    };

})();