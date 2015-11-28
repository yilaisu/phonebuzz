'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * event Schema
 */
var eventSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	link: {
		type: String,
		required: 'Link cannot be blank'
	},
	price: {
		type: Number,
		default: '0'
	},
	totalTickets: {
		type: Number,
		required: 'Total tickets cannot be blank'
	},
	soldTickers: {
		type: Number,
		default: '0'
	},
	imageLink: {
		type: String,
		required: 'Image link cannot be empty'
	},
	eventDate: {
		type: Date,
		required: 'Event date cannot be empty'
	},
	location: {
		type: String,
		required: 'Location cannot be empty'
	},
	fontColor: {
		type: String
	}
});

mongoose.model('event', eventSchema);