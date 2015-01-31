'use strict';

var $              = require('../../../lib/jquery/jquery');
var FirebaseObject = require('../shared/FirebaseObject');

var proto;



var IpsumOutput = function( outputContainer ) {
	// IpsumOutput elements
	this.$outputElement = outputContainer;
	// access to database of words
	this.firebaseObject = new FirebaseObject();
};

proto = IpsumOutput.prototype;


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
		headlineLength = this._getRandomInt(2, 4);
		// get strings from the firebase database
		headline = this.firebaseObject.getRandomStrings(headlineLength);
		// replace commas with spaces
		headline = headline.toString().replace(/,/g, ' ');
		// print a new headline to the output element
		this.$outputElement.append('<h1>' + headline + '</h1>');
	}
};


proto.printLists = function ( numberOfLists ) {
	var listItemTextLength;
	var listItemText;
	var listLength;
	var listElement;
	var listItem;

	for (var i = 0; i < numberOfLists; i++) {
		listLength = this._getRandomInt(4, 8);
		listElement = document.createElement('ul');

		for (var j = 0; j < listLength; j++) {
			listItem = document.createElement('li');

			listItemTextLength = this._getRandomInt(2, 4);
			// get strings from the firebase database
			listItemText = this.firebaseObject.getRandomStrings(listItemTextLength);
			// replace commas with spaces
			listItemText = listItemText.toString().replace(/,/g, ' ');
			// add the random text to the new list item
			$(listItem).html(listItemText);
			// add the new list item element to the list element
			$(listElement).append(listItem);
		};

		this.$outputElement.append(listElement);
	};
};


proto.printWords = function ( numberOfWords ) {

	var words = this.firebaseObject.getRandomStrings(numberOfWords);
	// replace commas with spaces
	words = words.toString().replace(/,/g, ' ');
	// print words to the output element
	this.$outputElement.append('<p>' + words + '</p>');
};


proto._getRandomInt = function( min, max ) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


module.exports = IpsumOutput;

