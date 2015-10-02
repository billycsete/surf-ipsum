'use strict';

var proto;



/**
 * Ipsum Item
 * @constructor
 *
 * An individual element of generated ipsum.
 * Either a paragraph, headline, or list.
 *
 * Each IpsumItem should generate the markup wrapping a peice of ipsum,
 * in addition to a refresh button. When the refresh button is clicked,
 * new ipsum of the same type should replace the contents of the IpsumItem.
 *
 * Generated markup for an IpsumItem looks like:
 *
 * <div class="ipsum-item ipsum-item-{ipsumType}">
 *     <div class="ipsum-item-inner">
 *         <button class="refresh-button"><i clas="icon-refresh"></i></button>
 *         <p> || <ul> || <h1>
 *     </div>
 * </div>
 *
 *
 * @param {Object} ipsumOutput - instance of IpsumOutput to generate the ipsum
 * @param {String} ipsumType - type of ipsum to be generated [ paragraph, headline, list, words ]
 *
 */

var IpsumItem = function( IpsumOutput, ipsumType ) {
	// store the reference to the IpsumOutput generator
	this.IpsumOutput = IpsumOutput;
	// type of ipsum we are generating
	this.ipsumType = ipsumType;
	// create the wrapping element that we will add the ipsum and the refresh button to
	this.$row = $('<div class="ipsum-row"></div>');
	this.$element = $('<div class="ipsum-item ipsum-item-' + this.ipsumType + '"></div>');

	this._init();

	return this.$row;
};

proto = IpsumItem.prototype;


proto._init = function() {
	var ipsum = this._generateIpsum();
	// add the ipsum to our element
	this.$element.append( ipsum );

	this.$row.append( this.$element );

	// add a button that will refresh the ipsum contents when clicked
	this._addRefreshButton();
};


proto._addRefreshButton = function( ) {
	var refreshButtonElement = $('<button class="refresh-button"><i class="icon icon-arrows-ccw"></i><span class="arrow"></span></button>');

	refreshButtonElement.on('click', function() {
		// generate new ipsum
		var newIpsum = this._generateIpsum();
		// replace the existing ipsum with the new ipsum
		this.$element.children(':not(.refresh-button)').replaceWith( newIpsum );
	}.bind(this));

	this.$element.append( refreshButtonElement );
};


proto.destroy = function() {
	// remove event listeners from the button
	this.$row.remove();
};


/**
 * Generate the correct type of ipsum and add it to the IpusmItem element
 */
proto._generateIpsum = function( ) {

	var newIpsumElement;

	switch ( this.ipsumType ) {

		case 'paragraphs':
			newIpsumElement = this.IpsumOutput.generateParagraphElement();
			break;

		case 'headlines':
			newIpsumElement = this.IpsumOutput.generateHeadlineElement();
			break;

		case 'lists':
			newIpsumElement = this.IpsumOutput.generateListElement();
			break;

		case 'words':
			newIpsumElement = this.IpsumOutput.generateParagraphElement();
			break;
	}

	return newIpsumElement;
};



module.exports = IpsumItem;
