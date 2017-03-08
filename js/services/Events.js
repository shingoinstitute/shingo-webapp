(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Events', ['$http', '$q', Events]);

    function Events($http, $q){

        return {
            listUpcoming: function(){
                console.log('Getting upcoming events');
                return $http.get('https://api.shingo.org/salesforce/events')
                .then(function(response){
                    console.log('Got response', response);
                    if(!response.data.success) throw response.data.error;
                    var events = new Array();
                    var now = new Date();
                    now.setDate(now.getDate() - 1);
                    response.data.events.forEach(function(ev){
                        if(new Date(ev.Start_Date__c) >= now || ev.Publish_to_Web_App__c)
                            events.push(ev);
                    });
                    console.log('Returning events', events);
                    return $q.resolve(events);
                });
            },
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get an event."));
                return $http.get('https://api.shingo.org/salesforce/events/' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.event);
                });
            }
        }
    }
})();