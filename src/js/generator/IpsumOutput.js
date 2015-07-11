'use strict';

var $              = require('../../../lib/jquery/jquery');
var Utils          = require('../shared/Utils.js').Utils;
var FirebaseObject = require('../shared/FirebaseObject');

var proto;



var IpsumOutput = function( outputContainer ) {
	// IpsumOutput elements
	this.$outputElement = outputContainer;
	// access to database of words
	this.firebaseObject = new FirebaseObject();
};

proto = IpsumOutput.prototype;


proto.printSentence = function ( ) {
	var sentenceLength = Utils.getRandomInt( 5, 10 );
	// get strings from the firebase database
	var sentence = this.firebaseObject.getRandomStrings( sentenceLength );
	// replace commas with spaces
	sentence = sentence.toString().replace( /,/g, ' ' );
	// capitalize sentence and add a period
	sentence = this._capitalizeString( sentence ) + '.';

	return sentence;
};


proto.printParagraphs = function ( numberOfParagraphs ) {

	for (var i = 0; i < numberOfParagraphs; i++) {
		var sentencesPerParagraph = Utils.getRandomInt( 5, 8 );
		var paragraph = '';

		for ( var j = 0; j < sentencesPerParagraph; j++ ) {
			paragraph += this.printSentence() + ' ';
		};

		// trim off the trailing space on the last sentence
		paragraph = paragraph.slice( 0, - 1 );
		// print paragraph to the output element
		this.$outputElement.append( '<p>' + paragraph + '</p>' );
	}
};


proto.printHeadlines = function ( numberOfHeadlines ) {

	for ( var i = 0; i < numberOfHeadlines; i++ ) {
		var headlineLength = Utils.getRandomInt( 2, 4 );
		// get strings from the firebase database
		var headline = this.firebaseObject.getRandomStrings( headlineLength );
		// capitalize headline
		headline = this._capitalizeString( headline );
		// print a new headline to the output element
		this.$outputElement.append( '<h1>' + headline + '</h1>' );
	}
};


proto.printLists = function ( numberOfLists ) {

	for ( var i = 0; i < numberOfLists; i++ ) {
		var listLength = Utils.getRandomInt( 4, 8 );
		var listElement = document.createElement( 'ul' );

		for (var j = 0; j < listLength; j++) {
			var listItem = document.createElement( 'li' );

			var listItemTextLength = Utils.getRandomInt( 2, 4 );
			// get strings from the firebase database
			var listItemText = this.firebaseObject.getRandomStrings( listItemTextLength );
			// add the random text to the new list item
			$(listItem).html( listItemText );
			// add the new list item element to the list element
			$(listElement).append( listItem );
		};

		this.$outputElement.append( listElement );
	};
};


proto.printWords = function ( numberOfWords ) {
	// get strings from the firebase database
	var words = this.firebaseObject.getRandomStrings( numberOfWords );
	// print words to the output element
	this.$outputElement.append( '<p>' + words + '</p>' );
};


proto._capitalizeString = function( string ) {
	return string.substring(0, 1).toUpperCase() + string.substring(1);
};


module.exports = IpsumOutput;
