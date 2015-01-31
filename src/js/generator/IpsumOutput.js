'use strict';

var $              = require('../../../lib/jquery/jquery');
var FirebaseObject = require('../shared/FirebaseObject');

var proto;



var IpsumOutput = function() {
	// IpsumOutput elements
	this.$outputElement = $('#output');
	// access to database of words
	this.firebaseObject = new FirebaseObject();

	this.init();
};

proto = IpsumOutput.prototype;



proto.init = function() {
	console.log('new ipsum list');
};


proto.printParagraphs = function ( numberOfParagraphs ) {

	var paragraphLength;
	var paragraph;

	for (var i = 0; i < numberOfParagraphs; i++) {
		paragraphLength = this._getRandomInt(40, 60);
		// get strings from the firebase database
		paragraph = this.firebaseObject.getRandomStrings(paragraphLength);
		// replace commas with spaces
		paragraph = paragraph.toString().replace(/,/g, ' ');

		this.$outputElement.append('<p>' + paragraph + '</p>');
	}
};


proto.printHeadlines = function ( numberOfHeadlines ) {
	var headlineLength;
	var headline;

	for (var i = 0; i < numberOfHeadlines; i++) {
		headlineLength = this._getRandomInt(4, 6);
		// get strings from the firebase database
		headline = this.firebaseObject.getRandomStrings(headlineLength);
		// replace commas with spaces
		headline = headline.toString().replace(/,/g, ' ');

		this.$outputElement.append('<h1>' + headline + '</h1>');
	}
};


proto.printWords = function ( numberOfWords ) {

	var words = this.firebaseObject.getRandomStrings(numberOfWords);
	// replace commas with spaces
	words = words.toString().replace(/,/g, ' ');
	// print words to output
	this.$outputElement.append('<p>' + words + '</p>');
};


proto._getRandomInt = function( min, max ) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


module.exports = IpsumOutput;

