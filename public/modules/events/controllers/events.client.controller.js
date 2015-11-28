'use strict';

angular.module('events').controller('eventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'events',
	function($scope, $stateParams, $location, Authentication, events) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var event = new events({
				title: this.title,
				content: this.content
			});
			event.$save(function(response) {
				$location.path('events/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(event) {
			if (event) {
				event.$remove();

				for (var i in $scope.events) {
					if ($scope.events[i] === event) {
						$scope.events.splice(i, 1);
					}
				}
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};

		$scope.update = function() {
			var event = $scope.event;

			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.events = events.query();
		};

		$scope.findOne = function() {
			$scope.event = events.get({
				eventId: $stateParams.eventId
			});
		};
	}
]);