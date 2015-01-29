'use strict';

var $ = require('../../../lib/jquery/jquery');

var proto;

var UploaderMessage = function ( ) {
	this.$element = $('#uploader-message');
	this.$messageIcon = $('#message-icon');
	this.$messageText = $('#message-text');
	this.isHidden = true;
};

proto = UploaderMessage.prototype;


proto.showErrorMessage = function ( message ) {
	this.isHidden = false;
	// set message text
	this.$messageText.html(message);
	// thumbs down icon for error message
	this.$messageIcon[0].className = 'icon-thumbs-down';
	// show message
	this.$element.addClass('show-message show-message-error');
};


proto.showSucessMessage = function ( message ) {
	this.isHidden = false;
	// set message text
	this.$messageText.html(message);
	// thumbs up icon for success message
	this.$messageIcon[0].className = 'icon-thumbs-up';
	// show message
	this.$element.addClass('show-message show-message-success');
};


proto.hideMessage = function () {
	// do nothing if the message is already hidden
	if ( this.isHidden ) {
		return;
	}

	this.isHidden = true;
	this.$element.removeClass('show-message show-message-error show-message-success');
};


module.exports = UploaderMessage;
