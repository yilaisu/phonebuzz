'use strict';

//events service used for communicating with the events REST endpoints
angular.module('events').factory('events', ['$resource',
	function($resource) {
		return $resource('events/:eventId', {
			eventId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);