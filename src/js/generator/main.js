'use strict';

var TweenMax       = require('../../../node_modules/gsap/src/uncompressed/TweenMax.js');
var ScrollToPlugin = require('../../../node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin.js');
var EasePack       = require('../../../node_modules/gsap/src/uncompressed/easing/EasePack.js');
var Trianglify     = require('../../../node_modules/trianglify/lib/trianglify.js');
var SelectElement  = require('./SelectElement');
var IpsumOutput    = require('./IpsumOutput');


var Main = {

	/**
	 * Set up generator page
	 */
	initialize : function( ) {
		this.$body              = $(document.body);
		this.$oceanWrapper      = $('#ocean-wrapper');
		this.$ocean             = $('#ocean');
		this.$inputElement      = $('#input-number');
		this.$generateButton    = $('#input-generate');
		this.$outputResults     = $('#output-results');
		this.$closeOutputButton = $('#output-button-clear');

		// store the viewport height
		this.viewportHeight     = $(window).height();

		// Build custom select element
		this.selectElement = new SelectElement();

		// Create the ipsum output generator
		this.output = new IpsumOutput( this.$outputResults );

		// Bound functions
		this._onKeypress          = this._onKeypress.bind(this);
		this._onResize            = this._onResize.bind(this);
		this._onOrientationChange = this._onOrientationChange.bind(this);
		this._generateIpsum       = this._generateIpsum.bind(this);
		this._closeIpsum          = this._closeIpsum.bind(this);
		this._printIpsumToOutput  = this._printIpsumToOutput.bind(this);
		this._clearIpsum          = this._clearIpsum.bind(this);

		// generate the low poly ocean texture svg
		this._generateBackgroundPattern();

		// attach events
		this._setupEvents();

	},


	/**
	 * Set up events
	 */
	_setupEvents : function( ) {
		this.$generateButton.on( 'click', this._generateIpsum );
		this.$closeOutputButton.on( 'click', this._closeIpsum );
		$(document).on( 'keydown', this._onKeypress );

		if ( $('html').hasClass('touch') ) {
			$(window).on( 'orientationchange', this._onOrientationChange );
		} else {
			$(window).on( 'resize', this._onResize );
		}
	},


	/**
	 * Generate Background Pattern
	 */
	_generateBackgroundPattern : function( ) {
		var oceanBackgroundHeight = 400;

		var oceanPattern = new Trianglify({
			height    : oceanBackgroundHeight,
			width     : window.innerWidth,
			variance  : 0.5,
			x_colors  : ['#081d58', '#253494', '#225ea8', '#1d91c0', '#41b6c4', '#7fcdbb'],
			cell_size : 40
		});

		// make sure the ocean background container is empty first
		this.$ocean.empty();
		// generate an ocean pattern and add it to the DOM
		this.$ocean.append( oceanPattern.svg() );
	},


	/**
	 * Handle page resize
	 */
	_onResize : function( ) {
		// recalculate viewport height
		this.viewportHeight = $(window).height();
		// generate a new background ocean pattern that matches the width on the new viewport size
		this._generateBackgroundPattern();
	},


	/**
	 * Handle orientation change
	 */
	_onOrientationChange : function( ) {
		// recalculate viewport height
		this.viewportHeight = $(window).height();
		// generate a new background ocean pattern that matches the width on the new viewport size
		this._generateBackgroundPattern();
	},


	/**
	 * Handle keypress events
	 * `Enter` should generate ipsum
	 * `Esc should clear ipsum
	 */
	_onKeypress : function( evt ) {
		// cross browser keycode
		var keycode = (evt.keyCode ? evt.keyCode : evt.which);
		// If the 'Enter' key is pressed
		if( keycode === 13 ) {
			this._generateIpsum();
		}
		// If the 'Esc' key is pressed
		if( keycode === 27 ) {
			this._closeIpsum();
		}
	},



	/**
	 * Animate to the generated ipsum
	 */
	_generateIpsum : function( ) {

		// body hook to remove the overflow hidden
		this.$body.addClass('unlock-the-swag');

		this._printIpsumToOutput();

		TweenMax.to( window, 1, {
			scrollTo: {
				y: $(window).height()
			},
			ease: Quart.easeInOut,
			onComplete : this.$body.addClass('show-results')
		});
	},



	/**
	 * Print the ipsum to the DOM
	 */
	_printIpsumToOutput : function( ) {

		var inputValue = this.$inputElement.val();
		var selectValue = this.selectElement.getValue();

		switch ( selectValue ) {
			case 'paragraphs':
				this.output.printParagraphsToOutputElement( inputValue );
				break;

			case 'headlines':
				this.output.printHeadlinesToOutputElement( inputValue );
				break;

			case 'lists':
				this.output.printListsToOutputElement( inputValue );
				break;

			case 'words':
				this.output.printWordsToOutputElement( inputValue );
				break;
		}
	},



	/**
	 * Animate back to the ipsum input state
	 */
	_closeIpsum : function( ) {

		TweenMax.to( window, 1, {
			scrollTo: { y: 0 },
			ease: Power2.easeInOut,
			onComplete : this._clearIpsum
		});

		// TweenMax.to( this.$outputElement, 1, {
		// 	top: '100%',
		// 	ease: Quart.easeInOut,
		// });
	},



	/**
	 * Clear any ipsum from the DOM
	 */
	_clearIpsum : function( ) {
		this.$body.removeClass('show-results');
		this.$outputResults.empty();
	}

};



Main.initialize();
