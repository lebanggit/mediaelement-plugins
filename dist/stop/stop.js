(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Stop button
 *
 * This feature enables the displaying of a Stop button in the control bar, which basically pauses the media and rewinds
 * it to the initial position.
 */

// Translations (English required)

mejs.i18n.en["mejs.stop"] = "Stop";

// Feature configuration
Object.assign(mejs.MepDefaults, {
	/**
  * @type {?String}
  */
	stopText: null
});

Object.assign(MediaElementPlayer.prototype, {

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {HTMLElement} controls
  * @param {HTMLElement} layers
  * @param {HTMLElement} media
  */
	buildstop: function buildstop(player, controls, layers, media) {
		var t = this,
		    stopTitle = mejs.Utils.isString(t.options.stopText) ? t.options.stopText : mejs.i18n.t('mejs.stop'),
		    button = document.createElement('div');

		button.className = t.options.classPrefix + "button " + t.options.classPrefix + "stop-button " + t.options.classPrefix + "stop";
		button.innerHTML = "<button type=\"button\" aria-controls=\"" + t.id + "\" title=\"" + stopTitle + "\" aria-label=\"" + stopTitle + "\" tabindex=\"0\"></button>";

		t.addControlElement(button, 'stop');

		button.addEventListener('click', function () {
			if (typeof media.stop === 'function') {
				media.stop();
			} else if (media.readyState > 0) {
				if (!media.paused) {
					media.pause();
				}
				media.setSrc('');
				media.load();

				var playButton = controls.querySelector("." + t.options.classPrefix + "playpause-button");
				mejs.Utils.removeClass(playButton, t.options.classPrefix + "pause");
				mejs.Utils.addClass(playButton, t.options.classPrefix + "play");

				// It will throw an error trying to load an empty source, so remove it since it's expected
				t.container.querySelector('.me_cannotplay').remove();
				layers.querySelector("." + t.options.classPrefix + "overlay-error").parentNode.style.display = 'none';
				layers.querySelector("." + t.options.classPrefix + "overlay-error").remove();
			}

			var event = mejs.Utils.createEvent('timeupdate', media);
			media.dispatchEvent(event);
		});
	}
});

},{}]},{},[1]);
