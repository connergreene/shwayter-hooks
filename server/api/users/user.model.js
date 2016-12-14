'use strict'; 

var mongoose = require('mongoose'),
	shortid = require('shortid'),
	_ = require('lodash');

var db = require('../../db');

var User = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	name: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('User', User);