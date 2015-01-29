'use strict';

var $        = require('../../../lib/jquery/jquery');
var Firebase = require('Firebase');

var proto;

var Suploader = function(uploaderElement) {
	this.$uploaderElement = uploaderElement;
	this.$formElement = uploaderElement.find('form');
	this.$inputElement = uploaderElement.find('input');
	this.$submitButton = uploaderElement.find('button');

	this.firebase = new Firebase('https://surf-ipsum.firebaseio.com/surf-strings');
	this.wordsArray = [];

	this.init();
};

proto = Suploader.prototype;



proto.init = function() {
	// start with the input element focused
	this.$inputElement.focus();
	// attach events to input element and to firebase
	this._attachEvents();
};



proto._attachEvents = function() {

	this.firebase.on('value', function ( dataSnapshot ) {
		this._onFirebaseUpdate(dataSnapshot);
	}.bind(this));

	this.$inputElement.on('focus', this._onFocus.bind(this));
	this.$inputElement.on('blur', this._onBlur.bind(this));
	this.$inputElement.on('input', this._onValueChange.bind(this));
	this.$submitButton.on('click', this._onSubmit.bind(this));
};



proto._onFirebaseUpdate = function ( dataSnapshot ) {
	var updatedWordsArray = [];

	dataSnapshot.forEach(function(childSnapshot) {
		var childData = childSnapshot.val();
		updatedWordsArray.push(childData);
	});

	this.wordsArray = updatedWordsArray;

	console.log(this.wordsArray);
};



proto._onFocus = function( evt ) {
	this.$uploaderElement.addClass('input-focused');
	console.log('focused on input');
};



proto._onBlur = function( evt ) {
	this.$uploaderElement.removeClass('input-focused');
	console.log('focus left the input');
};



proto._onValueChange = function( evt ) {
	var inputValue = this.$inputElement.val();

	if (inputValue === '') {
		this.$uploaderElement.removeClass('input-has-value');
		console.log('input is empty');
	} else {
		this.$uploaderElement.addClass('input-has-value');
		console.log('value changed to: ' + inputValue);
	}
};



proto._onSubmit = function ( evt ) {
	evt.preventDefault();
	console.log('submitted form');

	var inputValue = this.$inputElement.val();

	if(this._isDuplicate(inputValue)) {
		console.log('ALREADY EXISTS BISH!');
		return;
	};

	// Push the value from the input to firebase
	this.firebase.push(inputValue);
};



proto._validateString = function() {

};



proto._isDuplicate = function( string ) {
	return $.inArray(string, this.wordsArray) !== -1;
};



module.exports = Suploader;

