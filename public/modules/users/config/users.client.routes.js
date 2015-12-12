'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('phaseOne', {
			url: '/phaseOne',
			templateUrl: 'modules/users/views/phaseOne.client.view.html'
		}).
		state('phaseTwo', {
			url: '/phaseTwo',
			templateUrl: 'modules/users/views/phaseTwo.client.view.html'
		}).
		state('phaseThree', {
			url: '/phaseThree', 
			templateUrl: 'modules/users/views/phaseThree.client.view.html'
		}).
		state('phaseFour', {
			url: '/phaseFour',
			templateUrl: 'modules/users/views/phaseFour.client.view.html'
		});
	}
]);