/**
 * Angular Factory for Speakers
 */
(function(){
    'use strict';

    angular.module('interface')
    .factory('Speakers',['$http', '$q',Speakers]);

    function Speakers($http, $q){
        return {
            list: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get speakers for an event."));

                return $http.get('https://api.shingo.org/salesforce/events/speakers?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.speakers);
                });
            }
        }
    };

})();