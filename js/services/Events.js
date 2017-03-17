(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Events', ['$http', '$q', Events]);

    function Events($http, $q){

        return {
            listUpcoming: function(){
                return $http.get('http://api.shingo.org/salesforce/events?force_refresh=true')
                .then(function(response){
                    if(!response.data.success) throw response.data.error;
                    var events = new Array();
                    var now = new Date();
                    now.setDate(now.getDate() - 1);
                    response.data.events.forEach(function(ev){
                        if(new Date(ev.Start_Date__c) >= now || ev.Publish_to_Web_App__c)
                            events.push(ev);
                    });
                    return $q.resolve(events);
                });
            },
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get an event."));

                return $http.get('https://api.shingo.org/salesforce/events/' + id + '?force_refresh=true')
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.event);
                });
            },
            speakers: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get speakers for an event."));

                return $http.get('https://api.shingo.org/salesforce/events/speakers?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.speakers);
                });
            },
            sessions: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get sessions for an event."));

                return $http.get('https://api.shingo.org/salesforce/events/sessions?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.sessions);
                });
            },
            agenda: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get the agenda for an event."));
                
                return $http.get('https://api.shingo.org/salesforce/events/days?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.days);
                })
            }
        }
    }
})();