(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function( global ) {
	'use strict';

	var IpsumGenerator = function() {
		this.inputs = {}

		this.init();
	};


	IpsumGenerator.prototype.init = function() {
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


	IpsumGenerator.prototype._generateHeadlines = function(evt) {
		console.log('headlines: ', evt.detail.value);

		for (var i = 0; i < evt.detail.value; i++) {
			console.log(this._getHeadline());
		};
	};


	IpsumGenerator.prototype._generateParagraphs = function(evt) {
		console.log('paragraphs: ', evt.detail.value);
	};


	IpsumGenerator.prototype._generateLists = function(evt) {
		console.log('lists: ', evt.detail.value);
	};


	IpsumGenerator.prototype._getHeadline = function() {
		var randomIndex = this._getRandomInt(0, phrases.length - 1);

		return phrases[randomIndex];
	};


	IpsumGenerator.prototype._getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};


	global.IpsumGenerator = IpsumGenerator;

})( window );





// each SENTENCE consists of 10 - 20 words.
// each SENTENCE insert a period/exclamation/question mark. Periods more heavily weighted.
// each SENTENCE insert a comma 50% of the time between word 2 and word.last - 2.

// each PARAGRAPH consists of 5-10 SENTENCES

// each HEADLINE consists of

},{}],2:[function(require,module,exports){

var Sidebar = require('./generator.js');
},{"./generator.js":1}]},{},[2]);
