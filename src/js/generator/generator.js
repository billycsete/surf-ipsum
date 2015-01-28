
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

