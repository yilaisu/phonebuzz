'use strict';

// Configuring the events module
angular.module('events').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'events', 'events', 'dropdown', '/events(/create)?');
		Menus.addSubMenuItem('topbar', 'events', 'List events', 'events');
		Menus.addSubMenuItem('topbar', 'events', 'New event', 'events/create');
	}
]);