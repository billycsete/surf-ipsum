'use strict';

var $               = require('../../../lib/jquery/jquery');

var proto;

// Markup for generated select element:
// 
// <div class="select-element">
//   <span class="select-value">paragraphs</span>
//   <ul class="select-list">
//     <li class="select-option selected">paragraphs</li>
//     <li class="select-option">titles</li>
//     <li class="select-option">lists</li>
//     <li class="select-option">words</li>
//   </ul>
// </div>

var SelectElement = function( ) {
	this.$element = $('<div class="select-element"></div>');
	this.$selectValue = $('<span class="select-value">paragraphs</span>');
	this.$optionsList = $('<ul class="select-list" tabindex="0"></ul>');
	this.$options;
	this.selectOptions = [ 'paragraphs', 'titles', 'lists', 'words' ];

	this._init();

	return this.$element;
};

proto = SelectElement.prototype;



proto._init = function( ) {
	this._buildSelectElement();

	this._attachEvents();
};



proto._attachEvents = function( ) {
	this.$selectValue.on( 'click', this._toggleSelect.bind(this) );

	// TODO: if the select element is focused, toggle some stuffs

	// TODO: keyboard events


	// do sutffs when the select options are clicked
	this.$options.each( function( index ) {
		$(this).on('click', function( evt ) {
			console.log(evt);

			// change the $select value to what was clicked

			// toggle select closed

		});
	});

};



proto._toggleSelect = function( evt ) {
	this.$element.toggleClass('focused');
	console.log('open up!');
};



proto._buildSelectElement = function( ) {
	// add span for the currently selected item
	this.$element.append(this.$selectValue);

	// add an option to the list for each item in this.selectOptions
	for (var i = 0; i < this.selectOptions.length; i++) {
		this.$optionsList.append($('<li class="select-option">' + this.selectOptions[i] + '</li>'));
	};

	// make the first li in the options list selected
	$('li:first', this.$optionsList).addClass('selected');

	// save the select options to use later
	this.$options = $('li', this.$optionsList);

	// TODO: need a way to find the curently selected option
	// this.currentOption = this.options.indexOf( $('li.selected') );
	// console.log(this.currentOption);

	// add the list of options to the select element
	this.$element.append(this.$optionsList);
};



proto._getCurrentValue = function( ) {
	var currentOption = 
};



proto._isOpen = function( ) {
	return this.$element.hasClass('focused');
};



module.exports = SelectElement;
