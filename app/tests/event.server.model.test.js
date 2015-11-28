'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	event = mongoose.model('event');

/**
 * Globals
 */
var user, event;

/**
 * Unit tests
 */
describe('event Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			event = new event({
				title: 'event Title',
				content: 'event Content',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return event.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			event.title = '';

			return event.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		event.remove().exec();
		User.remove().exec();
		done();
	});
});