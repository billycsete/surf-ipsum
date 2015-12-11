'use strict';

var proto;



/**
 * Modal
 * @constructor
 *
 * Opens a modal that fills the whole viewport.
 *
 */
var Modal = function( triggerElement, modalElement ) {
	this.body = document.body;

	// modal elements
	this.openTriggerElement  = triggerElement;
	this.modalElement        = modalElement;
	this.closeTriggerElement = modalElement.querySelector('.close-button');

	// bound functions
	this.openModal   = this.openModal.bind(this);
	this.closeModal  = this.closeModal.bind(this);
	this._onKeypress = this._onKeypress.bind(this);

	this._setupEvents();
};

proto = Modal.prototype;



/**
 * Set up events
 */
proto._setupEvents = function() {
	// buttons of action
	this.openTriggerElement.addEventListener( 'click', this.openModal );
	this.closeTriggerElement.addEventListener( 'click', this.closeModal );

	// handle keyboard events
	$(document).on( 'keydown', this._onKeypress );
};



/**
 * Set up events
 */
proto._onKeypress = function( evt ) {
	var keycode = evt.keyCode ? evt.keyCode : evt.which;

	// If the 'Esc' key is pressed
	if( keycode === 27 ) {
		this.closeModal();
	}
};



/**
 * Open Modal
 */
proto.openModal = function() {
	this.body.classList.remove('will-show-results');
	this.modalElement.classList.add('modal-open');
};



/**
 * Close Modal
 */
proto.closeModal = function() {
	// only add the will show class back is the results were visible
	// when the modal was opened
	if ( this.body.classList.contains('show-results') ) {
		this.body.classList.add('will-show-results');
	}

	this.modalElement.classList.remove('modal-open');
};



/**
 * Is the modal open?
 */
proto.isOpen = function() {
	return this.modalElement.classList.contains('modal-open');
};


module.exports = Modal;
