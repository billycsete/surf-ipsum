'use strict';

var $              = require('../../../lib/jquery/jquery');
var Utils          = require('../shared/Utils.js').Utils;
var FirebaseObject = require('../shared/FirebaseObject');

var proto;



/**
 * Ipsum Output
 * @constructor
 */
var IpsumOutput = function( outputContainer ) {
	// IpsumOutput elements
	this.$outputElement = outputContainer;
	// access to database of words
	this.firebaseObject = new FirebaseObject();
	// store arrays of special punctuation characters
	this.endingPunctuation = ['?', '!'];
	this.decorativePunctuation = [ ',', ';', ':' ];
};

proto = IpsumOutput.prototype;



/**
 * Generate a random sentence
 * @return {String} - random sentence of surf words
 */
proto.generateSentence = function ( ) {
	var sentenceLength = Utils.getRandomInt( 5, 10 );
	// get strings from the firebase database
	var sentence = this.firebaseObject.getRandomStrings( sentenceLength );
	// replace commas with spaces
	sentence = sentence.toString().replace( /,/g, ' ' );
	// capitalize sentence and add a period
	sentence = this._capitalizeString( sentence ) + this._generatePunctuationMark();

	return sentence;
};



/**
 * Print paragraphs to the output element
 * @param {Number} numberOfParagraphs - number of paragraphs to generate
 */
proto.printParagraphsToOutputElement = function ( numberOfParagraphs ) {

	for (var i = 0; i < numberOfParagraphs; i++) {
		var sentencesPerParagraph = Utils.getRandomInt( 5, 8 );
		var paragraph = '';

		for ( var j = 0; j < sentencesPerParagraph; j++ ) {
			paragraph += this.generateSentence() + ' ';
		};

		// trim off the trailing space on the last sentence
		paragraph = paragraph.slice( 0, - 1 );
		// print paragraph to the output element
		this.$outputElement.append( '<p>' + paragraph + '</p>' );
	}
};



/**
 * Print headlines to the output element
 * @param {Number} numberOfHeadlines - number of headlines to generate
 */
proto.printHeadlinesToOutputElement = function ( numberOfHeadlines ) {

	for ( var i = 0; i < numberOfHeadlines; i++ ) {
		var headlineLength = Utils.getRandomInt( 2, 4 );
		// get strings from the firebase database
		var headline = this.firebaseObject.getRandomStrings( headlineLength );
		// capitalize headline
		headline = this._capitalizeString( headline );
		// print a new headline to the output element
		this.$outputElement.append( '<h2>' + headline + this._generatePunctuationMark() + '</h2>' );
	}
};



/**
 * Print lists to the output element
 * @param {Number} numberOfLists - number of lists to generate
 */
proto.printListsToOutputElement = function ( numberOfLists ) {

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



/**
 * Print lists to the output element
 * @param {Number} numberOfWords - number of lists to generate
 */
proto.printWordsToOutputElement = function ( numberOfWords ) {
	// get strings from the firebase database
	var words = this.firebaseObject.getRandomStrings( numberOfWords );
	// print words to the output element
	this.$outputElement.append( '<p>' + words + '</p>' );
};



/**
 * Returns a randomized punctuation mark
 * Periods are weighted heavier than other types of punctuation
 * @private
 * @return {String} - punctuation mark
 */
proto._generatePunctuationMark = function( ) {
	// TODO: add some sort of UI checkbox to enable special punctuation??
	var randomNumber = Utils.getRandomInt( 0, 10 );

	// if the random number is not a 5 return a period
	// TODO: more clear way of setting a flag for 1/10 odds
	if ( randomNumber !== 5 ) {
		return '.';
	}

	// If our 1 in 10 random number matched, randomly select a special punctuation mark
	var specialPunctuationMark = this.endingPunctuation[ Utils.getRandomInt( 0, this.endingPunctuation.length - 1 ) ];

	return specialPunctuationMark;
};



/**
 * Capitalize a string
 * @private
 * @param {String} string - string to capitalize
 * @return {String} - capitalized string
 */
proto._capitalizeString = function( string ) {
	return string.substring(0, 1).toUpperCase() + string.substring(1);
};


module.exports = IpsumOutput;
