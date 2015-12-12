'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	phoneBuzz = require('../../app/controllers/phoneBuzz.server.controller');

module.exports = function(app) {
	// event Routes
	app.route('/phaseOne')
		.post(phoneBuzz.callInstructions);//phaseTwo.validation,

	app.route('/phaseOneResponse')
		.post(phoneBuzz.fizzBuzz);

	app.route('/phaseThree')
		.post(phoneBuzz.saveCallRecord, phoneBuzz.delay, phoneBuzz.customOutNum);

	app.route('/callRecords')
		.get(phoneBuzz.getCallRecords);
};