'use strict';

var $               = require('../../../lib/jquery/jquery');
var Firebase        = require('Firebase');
var UploaderMessage = require('./UploaderMessage');

var proto;

/**
 * Uploader
 * @constructor
 * @param {element} uploaderElement - reference to the uploader element
 */
var Uploader = function(uploaderElement) {
	// uploader elements
	this.$uploaderElement = uploaderElement;
	this.$formElement = uploaderElement.find('form');
	this.$inputElement = uploaderElement.find('input');
	this.$submitButton = uploaderElement.find('button');
	// error/success message manager
	this.message = new UploaderMessage();
	// word database
	this.firebase = new Firebase('https://surf-ipsum.firebaseio.com/surf-strings');
	this.wordsArray = [];

	this.init();
};

proto = Uploader.prototype;


/**
 * Initialize uploader
 */
proto.init = function() {
	// start with the input element focused
	this.$inputElement.focus();
	// attach events to input element and to firebase
	this._attachEvents();
};


/**
 * Attach events
 */
proto._attachEvents = function() {

	this.firebase.on('value', function ( dataSnapshot ) {
		this._onFirebaseUpdate(dataSnapshot);
	}.bind(this));

	this.$inputElement.on('focus', this._onFocus.bind(this));
	this.$inputElement.on('blur', this._onBlur.bind(this));
	this.$inputElement.on('input', this._onValueChange.bind(this));
	this.$submitButton.on('click', this._onSubmit.bind(this));
};


/**
 * Update the array of words whenever the firebase data changes
 * @param {object} dataSnapshot - firebase data object
 */
proto._onFirebaseUpdate = function ( dataSnapshot ) {
	var updatedWordsArray = [];

	dataSnapshot.forEach(function(childSnapshot) {
		var childData = childSnapshot.val();
		updatedWordsArray.push(childData);
	});

	this.wordsArray = updatedWordsArray;
};


/**
 * Called when the uploader input is focused
 */
proto._onFocus = function( evt ) {
	this.$uploaderElement.addClass('input-focused');
};


/**
 * Called when the uploader input loses focus
 */
proto._onBlur = function( evt ) {
	this.$uploaderElement.removeClass('input-focused');
};


/**
 * Called when the input value changes
 */
proto._onValueChange = function( evt ) {
	var inputValue = this.$inputElement.val();

	// hide the error message if someone starts typing again
	this.message.hideMessage();

	if ( inputValue === '' ) {
		this.$uploaderElement.removeClass('input-has-value');
	} else {
		this.$uploaderElement.addClass('input-has-value');
	}
};


/**
 * Called when the submit button is clicked
 */
proto._onSubmit = function ( evt ) {
	// stop submit event
	evt.preventDefault();
	// store input value
	var inputValue = this.$inputElement.val();
	// return if its not a valid input
	if( !this._isValidInput(inputValue) ) {
		return;
	}
	// push the value from the input to firebase
	this.firebase.push(inputValue);
	this._onSuccess(inputValue);
};


/**
 * Called when a word was successfully uploaded to firebase
 * @param {string} inputValue - string that was uploaded to firebase
 */
proto._onSuccess = function ( inputValue ) {
	this.message.showSucessMessage('Great success! Uploaded: <strong>' + inputValue + '</strong>');
	// reset input
	this.$inputElement.val('');
	this.$uploaderElement.removeClass('input-has-value');
};


/**
 * Check to see if an input is a valid entry
 * @param {string} inputValue - string to validate
 * @return {boolean}
 */
proto._isValidInput = function( inputValue ) {
	// check for duplicate value
	if ( this._isDuplicate(inputValue) ) {
		this.message.showErrorMessage('Already exists, bish!');
		return false;
	}
	// check for empty input
	if ( inputValue === '' ) {
		this.message.showErrorMessage('The input is empty, silly!');
		return false;
	}

	// return true if the input is a valid string entry
	return true;
};


/**
 * Check to see if a string already exists in the firebase database
 * @param {string} string - string to test for duplicate
 * @return {boolean}
 */
proto._isDuplicate = function( string ) {
	return $.inArray(string, this.wordsArray) !== -1;
};



module.exports = Uploader;

