'use strict';

var $        = require('../../../lib/jquery/jquery');
var Firebase = require('Firebase');

var proto;

/**
 * FirebaseObject
 * @constructor
 */
var FirebaseObject = function( ) {
	// get link to the firebase database
	this.firebase = new Firebase('https://surf-ipsum.firebaseio.com/surf-strings');
	// store the current array of words from the database
	this.strings = [];
	// update array when the database is changed
	this.firebase.on('value', function( dataSnapshot ) {
		this._onFirebaseUpdate(dataSnapshot);
	}.bind(this));
};

proto = FirebaseObject.prototype;


/**
 * Update the array of words whenever the firebase data changes
 * @param {object} dataSnapshot - firebase data object
 */
proto._onFirebaseUpdate = function( dataSnapshot ) {
	var updatedStrings = [];

	dataSnapshot.forEach(function(childSnapshot) {
		var childData = childSnapshot.val();
		updatedStrings.push(childData);
	});

	this.strings = updatedStrings;
};


/**
 * Check to see if a string already exists in the firebase database
 * @param {string} string - string to test for duplicate in firebase
 * @return {boolean}
 */
proto.isDuplicate = function( string ) {
	return $.inArray(string, this.strings) !== -1;
};


/**
 * Return an array of random strings from the firebase database
 * @param {number} numberOfItems - the number of random strings to be added to the array
 * @return {array}
 */
proto.getRandomStrings = function( numberOfItems ) {
	var stringsLength = this.strings.length;
	var results = [];

	for (var i = 0; i < numberOfItems; i++) {
		var randomString = this.strings[Math.floor(Math.random() * stringsLength)];
		results.push(randomString);
	}

	return results;
};


/**
 * Push a string to the firebase database
 * @param {string} string
 */
proto.addString = function( string ) {
	this.firebase.push(string);
};


module.exports = FirebaseObject;

