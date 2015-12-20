'use strict';

// Add twitter button
var FirebaseObject = require('../shared/FirebaseObject');

var firebase = new FirebaseObject();


console.log(firebase.getRandomStrings(4));

//
twttr.widgets.createShareButton(
	'http://surfipsum.com/',
	document.getElementById('tweet'),
	{
		text: 'tweetText'
	}
);
