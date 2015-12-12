'use strict';

//Schools service used for communicating with the schools REST endpoints
angular.module('users').factory('Caller', ['$http',
	function($http) {
		var caller = {};
	    var callerInfo = {};

        caller.storeCallerInfo = function(info, callback){
            callerInfo = info;
            callback(callerInfo);
        };

        caller.getCallerInfo = function(callback){
            callback(callerInfo);
        };

        caller.getCallRecords = function(callback){
            $http.get('/callRecords').success(function(records) {
                callback(records);
            }).error(function(response) {
                callback(records.message);
            });
        }
        return caller;
	}
]);