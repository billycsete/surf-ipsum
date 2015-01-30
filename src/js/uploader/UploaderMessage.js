'use strict';

var $ = require('../../../lib/jquery/jquery');

var proto;

/**
 * UploaderMessage
 * @constructor
 */
var UploaderMessage = function ( ) {
	this.$element = $('#uploader-message');
	this.$messageText = $('#message-text');
	this.isHidden = true;
};

proto = UploaderMessage.prototype;


/**
 * Show an error message
 * @param {string} message - message to be displayed
 */
proto.showErrorMessage = function ( message ) {
	this.isHidden = false;
	// set message text
	this.$messageText.html(message);
	// show message
	this.$element.addClass('show-message show-message-error');
	// fade in message text
	this.$messageText.fadeIn();
};


/**
 * Show a success message
 * @param {string} message - message to be displayed
 */
proto.showSucessMessage = function ( message ) {
	this.isHidden = false;
	// set message text
	this.$messageText.html(message);
	// show message
	this.$element.addClass('show-message show-message-success');
	// fade in message text
	this.$messageText.fadeIn();
};


/**
 * Hide an active message if there is one
 */
proto.hideMessage = function () {
	// do nothing if the message is already hidden
	if ( this.isHidden ) {
		return;
	}

	this.isHidden = true;
	this.$element.removeClass('show-message show-message-error show-message-success');
};


module.exports = UploaderMessage;
