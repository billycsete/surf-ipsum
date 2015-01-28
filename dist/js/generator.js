(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

var proto;

var IpsumGenerator = function() {
	this.inputs = {}

	this.init();
};

proto = IpsumGenerator.prototype;



proto.init = function() {
	// headlines
	this.inputs.headlines = new InputConfigurator('headlines');
	// paragraphs
	this.inputs.paragraphs = new InputConfigurator('paragraphs');
	// lists
	this.inputs.lists = new InputConfigurator('lists');


	document.addEventListener('build-headlines', function (evt) {
		this._generateHeadlines(evt);
	}.bind(this));

	document.addEventListener('build-paragraphs', function (evt) {
		this._generateParagraphs(evt);
	}.bind(this));

	document.addEventListener('build-lists', function (evt) {
		this._generateLists(evt);
	}.bind(this));
};



proto._generateHeadlines = function(evt) {
	console.log('headlines: ', evt.detail.value);

	for (var i = 0; i < evt.detail.value; i++) {
		console.log(this._getHeadline());
	};
};



proto._generateParagraphs = function(evt) {
	console.log('paragraphs: ', evt.detail.value);
};



proto._generateLists = function(evt) {
	console.log('lists: ', evt.detail.value);
};



proto._getHeadline = function() {
	var randomIndex = this._getRandomInt(0, phrases.length - 1);

	return phrases[randomIndex];
};



proto._getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};







// each SENTENCE consists of 10 - 20 words.
// each SENTENCE insert a period/exclamation/question mark. Periods more heavily weighted.
// each SENTENCE insert a comma 50% of the time between word 2 and word.last - 2.

// each PARAGRAPH consists of 5-10 SENTENCES

// each HEADLINE consists of


module.exports = IpsumGenerator;


},{}],2:[function(require,module,exports){
'use strict'

// Require statements
var generator = require('./generator');
var numberInput = require('./numberInput');

var Main = {

	initialize : function() {
		// Initialize modules for page behavior here

		return this;
	}

};

},{"./generator":1,"./numberInput":3}],3:[function(require,module,exports){

'use strict';

var proto;

var InputConfigurator = function(element) {
	this.formElement = document.getElementById(element);
	this.inputElement = this.formElement.querySelector('.input');
	this.submitButton = this.formElement.querySelector('.submit');
	this.inputValue = this._getInputValue();

	// custom event to pass along the input value information
	this.submitEvent = new CustomEvent('build-' + element, {
		detail: { value: this.inputValue }
	});

	this.init();
};

proto = InputConfigurator.prototype;



proto.init = function() {
	// update the input value when the input changes
	this.inputElement.addEventListener('input', function () {
		this._updateInputValue()
		console.log(this.inputValue);
	}.bind(this));
	// submit event that will generate the surf ipsum
	this.submitButton.addEventListener('click', function (evt) {
		this.submitForm(evt);
	}.bind(this));
};



proto.submitForm = function (evt) {
	// stop default submit event
	evt.preventDefault();
	// fire custom event that will trigger the generation of surf ipsum
	document.dispatchEvent(this.submitEvent);
};



proto._getInputValue = function() {
	return this.inputElement.value;
};



proto._updateInputValue = function() {
	this.inputValue = this._getInputValue();
	this.submitEvent.detail.value = this._getInputValue();
};



module.exports = InputConfigurator;

},{}]},{},[2]);
