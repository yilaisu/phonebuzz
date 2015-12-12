'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * call record Schema
 */
var CallRecordSchema = new Schema({
	time: {
		type: Date,
		default: Date.now
	},
	delay: {
		type: Number,
		default: 0,
		trim: true,
	},
	to: {
		type: String,
		trim: true,
		required: 'Need to know who we called'
	},
	from: {
		type: String,
		trim: true,
		required: 'Need to know who called'
	}
});

mongoose.model('CallRecord', CallRecordSchema);