/*! surf-ipsum 28-01-2015 */
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){"use strict";var c,d=function(){this.inputs={},this.init()};c=d.prototype,c.init=function(){this.inputs.headlines=new InputConfigurator("headlines"),this.inputs.paragraphs=new InputConfigurator("paragraphs"),this.inputs.lists=new InputConfigurator("lists"),document.addEventListener("build-headlines",function(a){this._generateHeadlines(a)}.bind(this)),document.addEventListener("build-paragraphs",function(a){this._generateParagraphs(a)}.bind(this)),document.addEventListener("build-lists",function(a){this._generateLists(a)}.bind(this))},c._generateHeadlines=function(a){console.log("headlines: ",a.detail.value);for(var b=0;b<a.detail.value;b++)console.log(this._getHeadline())},c._generateParagraphs=function(a){console.log("paragraphs: ",a.detail.value)},c._generateLists=function(a){console.log("lists: ",a.detail.value)},c._getHeadline=function(){var a=this._getRandomInt(0,phrases.length-1);return phrases[a]},c._getRandomInt=function(a,b){return Math.floor(Math.random()*(b-a+1))+a},b.exports=d},{}],2:[function(a){"use strict";a("./generator"),a("./numberInput")},{"./generator":1,"./numberInput":3}],3:[function(a,b){"use strict";var c,d=function(a){this.formElement=document.getElementById(a),this.inputElement=this.formElement.querySelector(".input"),this.submitButton=this.formElement.querySelector(".submit"),this.inputValue=this._getInputValue(),this.submitEvent=new CustomEvent("build-"+a,{detail:{value:this.inputValue}}),this.init()};c=d.prototype,c.init=function(){this.inputElement.addEventListener("input",function(){this._updateInputValue(),console.log(this.inputValue)}.bind(this)),this.submitButton.addEventListener("click",function(a){this.submitForm(a)}.bind(this))},c.submitForm=function(a){a.preventDefault(),document.dispatchEvent(this.submitEvent)},c._getInputValue=function(){return this.inputElement.value},c._updateInputValue=function(){this.inputValue=this._getInputValue(),this.submitEvent.detail.value=this._getInputValue()},b.exports=d},{}]},{},[2]);