(function(){
    'use strict';

    angular.module('dataLayer')
    .factory('Events', ['$http', '$q', Events]);

    function Events($http, $q){

        var cache = {};

        return {
            listUpcoming: function(){
                return $http.get('https://api.shingo.org/salesforce/events?publish_to_web=true')
                .then(function(response){
                    if(!response.data.success) throw response.data.error;
                    var events = new Array();
                    var now = new Date();
                    now.setDate(now.getDate() - 1);
                    response.data.events.forEach(function(ev){
                        if(new Date(ev.Start_Date__c) >= now)
                            events.push(ev);
                    });
                    return $q.resolve(events);
                });
            },
            listPast: function(){
                return $http.get('https://api.shingo.org/salesforce/events?publish_to_web=true')
                .then(function(response){
                    if(!response.data.success) throw response.data.error;
                    var events = new Array();
                    var now = new Date();
                    now.setDate(now.getDate() - 1);
                    response.data.events.forEach(function(ev){
                        if(new Date(ev.Start_Date__c) < now)
                            events.push(ev);
                    });
                    return $q.resolve(events);
                });
            },
            get: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get an event."));
                
                if(cache[id]) return $q.resolve(cache[id]);
                return $http.get('https://api.shingo.org/salesforce/events/' + id + '?force_refresh=true')
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    cache[id] = response.data.event;
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
                });
            },
            exhibitors: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get exhibitors for an event."));

                return $http.get('https://api.shingo.org/salesforce/events/exhibitors?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.exhibitors);
                });
            },
            sponsors: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get sponsors for an event."));

                return $http.get('https://api.shingo.org/salesforce/events/sponsors?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.sponsors);
                });
            },
            recipients: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get recipients for an event."));

                return $http.get('https://api.shingo.org/salesforce/events/recipients?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.recipients);
                });
            },
            venues: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get venues for an event."));

                return $http.get('https://api.shingo.org/salesforce/events/venues?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.venues);
                });
            },
            hotels: function(id){
                if(!id) return $q.reject(Error("Must pass an id to get hotels for an event."));

                return $http.get('https://api.shingo.org/salesforce/events/hotels?event_id=' + id)
                .then(function(response){
                    if(!response.data.success) return $q.reject(response.data.error);
                    return $q.resolve(response.data.hotels);
                });
            }
        }
    }
})();