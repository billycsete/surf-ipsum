'use strict';

var Utils          = require('../shared/Utils.js').Utils;
var FirebaseObject = require('../shared/FirebaseObject');

var proto;



/**
 * Ipsum Output
 * @constructor
 *
 * Responsible for interacting with the Firebase database
 * to return randomly generated words, sentences, paragraphs,
 * lists, or headlines.
 *
 */
var IpsumOutput = function() {
	// access to database of words
	this.firebaseObject = new FirebaseObject();
	// store arrays of special punctuation characters
	this.specialPunctuation = ['?', '!'];
};

proto = IpsumOutput.prototype;



/**
 * Generate a random sentence
 * @return {String} - random sentence of surf words
 */
proto.generateSentence = function() {
	var sentenceLength = Utils.getRandomInt( 5, 10 );
	// get strings from the firebase database
	var sentence = this.firebaseObject.getRandomStrings( sentenceLength );
	// turn array of results into one long string with random commas
	sentence = this._stringifyIpsumResults( sentence, true );
	// capitalize sentence and add a period
	sentence = this._capitalizeString( sentence ) + this._generatePunctuationEnding();

	return sentence;
};



/**
 * Generate random words
 * @param {Number} numberOfWords - number of words to generate
 * @param {String} - string of words
 */
proto.generateWords = function( numberOfWords ) {
	// get strings from the firebase database
	var words = this.firebaseObject.getRandomStrings( numberOfWords );
	// turn array of results into one long string and remove commas
	words = this._stringifyIpsumResults( words );
	// print words to the output element
	return words;
};



/**
 * Generate a new paragraph element
 * @return {Element} - <p>
 */
proto.generateParagraphElement = function() {
	var paragraph = '';
	var sentencesPerParagraph = Utils.getRandomInt( 5, 8 );

	for ( var j = 0; j < sentencesPerParagraph; j++ ) {
		paragraph += this.generateSentence() + ' ';
	}

	// trim off the trailing space on the last sentence
	paragraph = paragraph.slice( 0, - 1 );

	return $( '<p>' + paragraph + '</p>' );
};



/**
 * Generate a new list element
 * @return {Element} - <ul>
 */
proto.generateListElement = function() {
	var listLength = Utils.getRandomInt( 4, 8 );
	var listElement = document.createElement( 'ul' );

	for (var j = 0; j < listLength; j++) {
		var listItem = document.createElement( 'li' );

		var listItemTextLength = Utils.getRandomInt( 2, 4 );
		// get strings from the firebase database
		var listItemText = this.firebaseObject.getRandomStrings( listItemTextLength );
		// turn array of results into one long string and remove commas
		listItemText = this._stringifyIpsumResults( listItemText );
		// add the random text to the new list item
		$(listItem).html( listItemText );
		// add the new list item element to the list element
		$(listElement).append( listItem );
	}

	return $( listElement );
};



/**
 * Generate a new headline element
 * @return {Element} - <h1>
 */
proto.generateHeadlineElement = function() {
	var headlineLength = Utils.getRandomInt( 2, 4 );
	// get strings from the firebase database
	console.log(this.firebaseObject);
	var headline = this.firebaseObject.getRandomStrings( headlineLength );
	// turn array of results into one long string and remove commas
	headline = this._stringifyIpsumResults( headline );
	// capitalize headline
	headline = this._capitalizeString( headline );

	return ( '<h1>' + headline + this._generatePunctuationEnding() + '</h1>' );
};



/**
 * Returns a randomized punctuation mark for ending a sentence
 * Periods are weighted heavier than other types of sentence ending punctuation marks
 * @private
 * @return {String} - punctuation mark
 */
proto._generatePunctuationEnding = function() {
	// TODO: add some sort of UI checkbox to enable special punctuation??
	var randomNumber = Utils.getRandomInt( 0, 10 );
	// if the random number is not a 5 return a period
	// TODO: more clear way of setting a flag for 1/10 odds
	if ( randomNumber !== 5 ) {
		return '.';
	}
	// If our 1 in 10 random number matched, randomly select a special punctuation mark
	var punctuationMark = this.specialPunctuation[ Utils.getRandomInt( 0, this.specialPunctuation.length - 1 ) ];

	return punctuationMark;
};



/**
 * Converts the array of strings returned from firebase into one long string
 * @private
 * @param {Array} resultsArray - array of strings
 * @param {Boolean} shouldHaveCommas - option to generate a sentence with random commas
 * @return {String} - database results as one long string
 */
proto._stringifyIpsumResults = function( resultsArray, shouldHaveCommas ) {

	var character = resultsArray.toString().replace( /,/g, function( ) {
		// return a space if the comma option is false
		if ( !shouldHaveCommas ) {
			return ' ';
		}
		// otherwise there is a 1 in 10 odds that a comma will not be replaced by a space
		var randomNumber = Utils.getRandomInt( 0, 10 );
		return randomNumber !== 5 ? ' ' : ', ';
	});

	return character;
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
