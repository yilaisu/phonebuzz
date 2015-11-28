'use strict';

(function() {
	// events Controller Spec
	describe('eventsController', function() {
		// Initialize global variables
		var eventsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the events controller.
			eventsController = $controller('eventsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one event object fetched from XHR', inject(function(events) {
			// Create sample event using the events service
			var sampleevent = new events({
				title: 'An event about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample events array that includes the new event
			var sampleevents = [sampleevent];

			// Set GET response
			$httpBackend.expectGET('events').respond(sampleevents);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.events).toEqualData(sampleevents);
		}));

		it('$scope.findOne() should create an array with one event object fetched from XHR using a eventId URL parameter', inject(function(events) {
			// Define a sample event object
			var sampleevent = new events({
				title: 'An event about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.eventId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/events\/([0-9a-fA-F]{24})$/).respond(sampleevent);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.event).toEqualData(sampleevent);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(events) {
			// Create a sample event object
			var sampleeventPostData = new events({
				title: 'An event about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample event response
			var sampleeventResponse = new events({
				_id: '525cf20451979dea2c000001',
				title: 'An event about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An event about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('events', sampleeventPostData).respond(sampleeventResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the event was created
			expect($location.path()).toBe('/events/' + sampleeventResponse._id);
		}));

		it('$scope.update() should update a valid event', inject(function(events) {
			// Define a sample event put data
			var sampleeventPutData = new events({
				_id: '525cf20451979dea2c000001',
				title: 'An event about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock event in scope
			scope.event = sampleeventPutData;

			// Set PUT response
			$httpBackend.expectPUT(/events\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/events/' + sampleeventPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid eventId and remove the event from the scope', inject(function(events) {
			// Create new event object
			var sampleevent = new events({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new events array and include the event
			scope.events = [sampleevent];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/events\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleevent);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.events.length).toBe(0);
		}));
	});
}());