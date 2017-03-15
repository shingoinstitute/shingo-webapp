/**
 * Angular Factory for Speakers
 */
(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Speakers', ['$http', '$q', Speakers]);

    function Speakers($http, $q){
        return {
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get a speaker."));

                return $http.get('https://api.shingo.org/salesforce/events/speakers/' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.speaker);
                });
            }
        }
    };

})();