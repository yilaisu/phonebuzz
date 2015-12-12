'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	twilio = require('twilio'),//(accountSid, authToken),
	CallRecord = mongoose.model('CallRecord'),
	jsonfile = require('jsonfile'),
	fs = require('fs'),
	qs = require('querystring'),
	_ = require('lodash');

/**
 * Create a event
 */
/*
exports.validation = function(req,res){

	console.log("HELLO WORK");

	var body = '';

	jsonfile.writeFile('debug_req_params.txt',req.params, function (err) {
        ;
	});

	jsonfile.writeFile('debug_req_body.txt',req.body, function (err) {
        ;
	});

	jsonfile.writeFile('debug_req_header.txt',req.headers, function (err) {
        ;
	});

	jsonfile.writeFile('debug_req_baseUrl.txt',req.baseUrl, function (err) {
        ;
	});

	fs.writeFile('debug_test.txt', 'TESTING IF THIS WORKS', function (err) {
        ;
	});

	var express = twilio.validateExpressRequest(req, 'ccc3480511a631bd54c4942679d33ba0');

	fs.writeFile('debug_valid.txt', express, function (err) {
        ;
	});

	var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
	fs.writeFile('debug_url.txt', requestedUrl, function (err) {
        ;
	});

	var data = req.body;
	var reqBody ＝ {};
	data.forEach(function (item) {
       reqbody = item;
   	});
	fs.writeFile('debug_bodyString.txt', reqBody, function (err) {
        ;
	});

	if (twilio.validateExpressRequest(req, 'ccc3480511a631bd54c4942679d33ba0')) {
        fs.writeFile('debug_valid.txt', 'ExpressValidWorkds', function (err) {
        	;
		});
    }

	    req.on('data', function (data) {
            body += data;

            fs.writeFile('debug_body.txt', data, function (err) {
            	;
			});

        });

        var header = req.headers['x-twilio-signature'];
        fs.writeFile('debug_header.txt', header, function (err) {
            ;
		});

        req.on('end', function () {

            var POST = qs.parse(body);

            fs.writeFile('debug_POST.txt', POST, function (err) {
            	;
			});

            //validate incoming request is from twilio using your auth token and the header from Twilio
            var token = 'ccc3480511a631bd54c4942679d33ba0',
                header = req.headers['x-twilio-signature'];

            fs.writeFile('debug_header.txt', header, function (err) {
            	;
			});

            //validateRequest returns true if the request originated from Twilio
            if (twilio.validateRequest(token, header, 'https://0d2ff84a.ngrok.io', POST)) {
                //generate a TwiML response
                next();
            }
            else {
                res.send("NOT A VALID TWILIO REQUEST");
            }
        });
}*/

exports.getCallRecords = function(req, res){

	var query = {};
    CallRecord.find(query, function(err, records) {
        if (err){
        	return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
        }else{
        	res.json(records);
        }
    });
}

exports.saveCallRecord = function(req, res, next){
	
	if(req.body.saveRecord){
		var callRecord = new CallRecord();

		callRecord.to = req.body.to;
		callRecord.delay = req.body.sec;
		callRecord.from = req.body.from;

		callRecord.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				CallRecord.find({}, function(err, records) {
			        if (err){
			        	return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
			        }else{
			        	next();
			        }
		    	});
			}
		});
	}else{
		next();
	}
}

exports.delay = function(req, res, next){

	if(req.body.sec){
		var sec = req.body.sec;
		var timeMil = sec * 1000;

		setTimeout(function() {
	    	next();
		}, timeMil);
	}else{
		next();
	}
}

exports.customOutNum = function(req, res) {
	 
	var toNum = req.body.to;
	var fromNum = req.body.from;
	var accountSid = req.body.accountSID;
	var authToken = req.body.authToken;
	var twilioClient = twilio(accountSid, authToken);
	 
	twilioClient.makeCall({
	  to: toNum,
	  from: fromNum,
	  url: 'https://0d2ff84a.ngrok.io/phaseOne'
	}, function(err, call) {
		;
	});

	res.send(req.body);
};

exports.callInstructions = function(req, res) {

	var twiml = new twilio.TwimlResponse();

	// Play Guile's theme over the phone.
	twiml.say('Please enter a number. Press star when you are done', {
	    voice:'woman',
	    language:'en-gb'
	}).gather({
        action:'/phaseOneResponse',
        finishOnKey:'*'
    });

	// Set the response type as XML.
	res.header('Content-Type', 'text/xml');

	// Send the TwiML as the response.
	res.send(twiml.toString());
};

/**
 * Show the current event
 */
exports.fizzBuzz = function(req, res) {
	// Generate a TwiML response
	var num = req.body.Digits;
	var twiml = new twilio.TwimlResponse();

	var response = " ";

	for(var i=1; i <= num; i++){
		
		if( i%3 == 0 && i%5 == 0){
			response += " Fizz Buzz";
		}else if(i%3 == 0){
			response += " Fizz";
		}else if(i%5 == 0){
			response += " Buzz";
		}else{
			response += " " + i;
		}
	}

	// Play Guile's theme over the phone.
	twiml.say(response, {
	    voice:'woman',
	    language:'en-gb',
	    speed: '0.2'
	});

	// Set the response type as XML.
	res.header('Content-Type', 'text/xml');

	// Send the TwiML as the response.
	res.send(twiml.toString());
};

