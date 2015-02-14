'use strict';

var $     = require('../../../lib/jquery/jquery');
var utils = require('../shared/utils');


// ======================================================
// Markup for generated select element:
// ------------------------------------------------------
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
//
// ======================================================


var proto;

var SelectElement = function( ) {
	this.$element = $('<div class="select-element"></div>');
	this.$selectValue = $('<span class="select-value" tabindex="0">paragraphs</span>');
	this.$optionsList = $('<ul class="select-list"></ul>');
	this.$optionElements = [ ];
	this.selectOptions = [ 'paragraphs', 'headlines', 'lists', 'words' ];

	this._init();
};

proto = SelectElement.prototype;



proto._init = function( ) {
	this._buildSelectElement();
	this._attachEvents();
};



proto._attachEvents = function( ) {
	var self = this;

	this.$selectValue.on( 'click', this._openSelect.bind(this) );
	this.$selectValue.on( 'focus', this._openSelect.bind(this) );
	this.$selectValue.on( 'blur', this._closeSelect.bind(this) );
	$(document).on( 'click', this._closeOnClickOutsideSelect.bind(this) );

	// TODO: keyboard events

	// update selected when an option is clicked
	this.$optionElements.each( function( index ) {
		$(this).on( 'click', function( evt ) {
			// grab innerHTML from the option that was clicked
			var newValue = $(this).html();

			// update the selected value and close
			self._setSelectValue( newValue );
			self._closeSelect();

		});
	});

};



proto._buildSelectElement = function( ) {
	// add span for the currently selected item
	this.$element.append( this.$selectValue );

	// add an option to the list for each item in this.selectOptions
	for ( var i = 0; i < this.selectOptions.length; i++ ) {
		this.$optionsList.append( $('<li class="select-option">' + this.selectOptions[i] + '</li>') );
	};

	// make the first li in the options list selected
	$('li:first', this.$optionsList).addClass( 'selected' );

	// save the select options to use later
	this.$optionElements = $('li', this.$optionsList);

	// add the list of options to the select element
	this.$element.append( this.$optionsList );
};



proto._closeOnClickOutsideSelect = function( evt ) {
	var targetElement = evt.target;

	if( this._isOpen() && !this._selectClicked( targetElement ) ) {
		this._closeSelect();
	}
};



proto._selectClicked = function( targetElement ) {
	var selectElement = this.$element[0];
	// ensure the select element wasn't clicked
	var isSelectElement = targetElement === selectElement;
	// ensure none of the children of the select element were clicked
	var isChildofSelectElement = utils.hasParent( targetElement, selectElement );

	return isSelectElement || isChildofSelectElement;
}



proto._openSelect = function( evt ) {
	if( this._isOpen() ) {
		return;
	}

	this.$element.addClass( 'focused' );
};



proto._closeSelect = function( evt ) {
	if( this._isOpen() ) {
		this.$element.removeClass( 'focused' );
	}
};



proto._isOpen = function( ) {
	return this.$element.hasClass( 'focused' );
};



proto._setSelectValue = function( value ) {
	this.$selectValue.html( value );
};



proto.getElement = function( ) {
	return this.$element;
};


proto.getValue = function( ) {
	return this.$selectValue.html();
};



module.exports = SelectElement;
