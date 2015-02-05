'use strict';

var $               = require('../../../lib/jquery/jquery');

var proto;

// <select class="item-select">
// 	<option value="paragraph" selected>paragraphs</option>
// 	<option value="titles">titles</option>
// 	<option value="lists">lists</option>
// 	<option value="words">words</option>
// </select>


// <div class="select-element">
//   <span class="select-selected">paragraphs</span>
//   <ul class="select-list">
//     <li class="select-option selected">paragraphs</li>
//     <li class="select-option">titles</li>
//     <li class="select-option">lists</li>
//     <li class="select-option">words</li>
//   </ul>
// </div>

var SelectElement = function( ) {
	this.$element = $('<div class="select-element"></div>');
	this.selectOptions = [ 'paragraphs', 'titles', 'lists', 'words' ];

	this.init();

	return this.$element;
};

proto = SelectElement.prototype;



proto.init = function( ) {
	this._buildSelectElement();

	this._attachEvents();
};



proto._attachEvents = function( ) {

};



proto._buildSelectElement = function( ) {
	// add span for the currently selected item
	this.$element.append($('<span class="select-selected">paragraphs</span>'));

	// create the options list element
	var optionsList = document.createElement( 'ul' );
	optionsList.className = 'select-list';
	optionsList.tabIndex = 0;

	// add an option to the list for each item in this.selectOptions
	for (var i = 0; i < this.selectOptions.length; i++) {
		$(optionsList).append($('<li class="select-option">' + this.selectOptions[i] + '</li>'));
	};

	this.$element.append(optionsList);
};



module.exports = SelectElement;
